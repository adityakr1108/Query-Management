
import { supabase } from '@/lib/supabase';
import { toast } from 'sonner';

export interface TeamMember {
  id: string;
  name: string;
  email: string;
  role: string;        // role_title e.g. "Sales Rep"
  active: boolean;
  assignedLeads: string[];
}

// Map DB profile row → TeamMember
const mapProfile = (row: any, assignedLeads: string[] = []): TeamMember => ({
  id: row.id,
  name: row.name,
  email: row.email,
  role: row.role_title ?? 'Employee',
  active: row.active ?? true,
  assignedLeads,
});

export const teamService = {
  // ── Get all employees ────────────────────────────────────────
  getTeamMembers: async (): Promise<TeamMember[]> => {
    const { data: profiles, error } = await supabase
      .from('profiles')
      .select('*')
      .eq('role', 'employee')
      .order('created_at', { ascending: false });

    if (error) { console.error(error); return []; }

    // Fetch assigned query IDs for each employee
    const members = await Promise.all(
      (profiles ?? []).map(async (p) => {
        const { data: queries } = await supabase
          .from('queries')
          .select('id')
          .eq('assigned_to_id', p.id);
        return mapProfile(p, (queries ?? []).map((q: any) => q.id));
      })
    );
    return members;
  },

  // ── Get employee by ID ───────────────────────────────────────
  getTeamMemberById: async (id: string): Promise<TeamMember | undefined> => {
    const { data, error } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', id)
      .eq('role', 'employee')
      .single();

    if (error || !data) return undefined;

    const { data: queries } = await supabase
      .from('queries').select('id').eq('assigned_to_id', id);

    return mapProfile(data, (queries ?? []).map((q: any) => q.id));
  },

  // ── Promote a user to employee by email ──────────────────────
  addTeamMember: async (member: { email: string; name: string; role: string; active: boolean }): Promise<TeamMember | undefined> => {
    // Promote the user with this email to 'employee' role
    const { error } = await supabase.rpc('promote_to_employee', { target_email: member.email });
    if (error) {
      toast.error(`Could not promote: ${error.message}`);
      return undefined;
    }

    // Fetch the newly promoted profile
    const { data } = await supabase.from('profiles').select('*').eq('email', member.email).maybeSingle();
    if (!data) return undefined;

    toast.success(`${data.name} added as employee`);
    return mapProfile(data, []);
  },

  // ── Update employee profile ───────────────────────────────────
  updateTeamMember: async (id: string, updates: Partial<TeamMember>): Promise<TeamMember | undefined> => {
    const { data, error } = await supabase
      .from('profiles')
      .update({ name: updates.name, active: updates.active })
      .eq('id', id)
      .select()
      .single();

    if (error) { toast.error('Failed to update'); return undefined; }
    toast.success('Updated successfully');
    return mapProfile(data);
  },

  // ── Remove employee (demote back to business_user) ───────────
  deleteTeamMember: async (id: string): Promise<boolean> => {
    const { error } = await supabase
      .from('profiles')
      .update({ role: 'business_user' })
      .eq('id', id);

    if (error) { toast.error('Failed to remove employee'); return false; }
    toast.success('Employee removed');
    return true;
  },

  // ── Assign lead to employee (delegates to leadsService) ──────
  assignLeadToTeamMember: async (teamMemberId: string, leadId: string): Promise<TeamMember | undefined> => {
    // Actual assignment is in leadsService; this just returns the updated member
    return teamService.getTeamMemberById(teamMemberId);
  },

  // ── Remove lead assignment ───────────────────────────────────
  removeLeadAssignment: async (teamMemberId: string, leadId: string): Promise<TeamMember | undefined> => {
    const { error } = await supabase
      .from('queries')
      .update({ assigned_to_id: null })
      .eq('id', leadId)
      .eq('assigned_to_id', teamMemberId);

    if (error) { toast.error('Failed to remove assignment'); return undefined; }
    return teamService.getTeamMemberById(teamMemberId);
  },

  // ── Get team member with fewest active leads ──────────────────
  getNextAvailableTeamMember: async (): Promise<TeamMember | undefined> => {
    const members = await teamService.getTeamMembers();
    if (members.length === 0) return undefined;
    return members.reduce((prev, curr) =>
      prev.assignedLeads.length <= curr.assignedLeads.length ? prev : curr
    );
  },

  // ── Get team members for a lead ───────────────────────────────
  getTeamMembersForLead: async (leadId: string): Promise<TeamMember[]> => {
    const { data } = await supabase.from('queries').select('assigned_to_id').eq('id', leadId).single();
    if (!data?.assigned_to_id) return [];
    const member = await teamService.getTeamMemberById(data.assigned_to_id);
    return member ? [member] : [];
  },
};

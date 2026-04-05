
import { supabase } from '@/lib/supabase';
import { toast } from 'sonner';

export type LeadStatus = 'new' | 'contacted' | 'qualified' | 'converted' | 'lost';

export interface Lead {
  id: string;
  name: string;
  email: string;
  score: number;
  status: LeadStatus;
  lastActivity: string;
  requestType: string;
  message: string;
  interactions: number;
  isGuest: boolean;
  assignedTeamMemberId?: string;
  createdById?: string;
  assignedToName?: string;
}

// Map DB row (snake_case) → Lead (camelCase)
const mapRow = (row: any): Lead => ({
  id: row.id,
  name: row.name,
  email: row.email,
  score: row.score ?? 50,
  status: row.status as LeadStatus,
  lastActivity: row.last_activity
    ? new Date(row.last_activity).toLocaleDateString()
    : 'Just now',
  requestType: row.request_type,
  message: row.message,
  interactions: row.message_count ?? 0,
  isGuest: row.is_guest,
  assignedTeamMemberId: row.assigned_to_id ?? undefined,
  createdById: row.created_by_id ?? undefined,
  assignedToName: row.profiles?.name ?? undefined,
});

const calcScore = (message: string, requestType: string): number => {
  let score = Math.floor(Math.random() * 40) + 30;
  if (message.length > 100) score += 15;
  if (requestType === 'Demo Request') score += 20;
  if (requestType === 'Product Inquiry') score += 10;
  return Math.min(score, 99);
};

export const leadsService = {
  // ── Get all leads (admin / employee view) ───────────────────
  getLeads: async (): Promise<Lead[]> => {
    const { data, error } = await supabase
      .from('queries')
      .select('*, profiles!queries_assigned_to_id_fkey(name)')
      .order('created_at', { ascending: false });

    if (error) { console.error(error); return []; }
    return (data ?? []).map(mapRow);
  },

  // ── Get leads for a specific logged-in business user ────────
  getUserLeads: async (userId: string): Promise<Lead[]> => {
    const { data, error } = await supabase
      .from('queries')
      .select('*, profiles!queries_assigned_to_id_fkey(name)')
      .eq('created_by_id', userId)
      .order('created_at', { ascending: false });

    if (error) { console.error(error); return []; }
    return (data ?? []).map(mapRow);
  },

  // ── Get leads assigned to an employee ───────────────────────
  getLeadsForTeamMember: async (employeeId: string): Promise<Lead[]> => {
    const { data, error } = await supabase
      .from('queries')
      .select('*')
      .eq('assigned_to_id', employeeId)
      .order('created_at', { ascending: false });

    if (error) { console.error(error); return []; }
    return (data ?? []).map(mapRow);
  },

  // ── Get unassigned leads ─────────────────────────────────────
  getUnassignedLeads: async (): Promise<Lead[]> => {
    const { data, error } = await supabase
      .from('queries')
      .select('*')
      .is('assigned_to_id', null)
      .order('created_at', { ascending: false });

    if (error) { console.error(error); return []; }
    return (data ?? []).map(mapRow);
  },

  // ── Get a single lead ────────────────────────────────────────
  getLead: async (id: string): Promise<Lead | undefined> => {
    const { data, error } = await supabase
      .from('queries')
      .select('*, profiles!queries_assigned_to_id_fkey(name)')
      .eq('id', id)
      .single();

    if (error) { console.error(error); return undefined; }
    return data ? mapRow(data) : undefined;
  },

  // ── Realtime Subscriptions ──────────────────────────────────
  subscribeToQueries: (callback: () => void) => {
    return supabase
      .channel('queries_changes')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'queries' }, callback)
      .subscribe();
  },

  subscribeToTeamMembers: (callback: () => void) => {
    return supabase
      .channel('profiles_changes')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'profiles' }, callback)
      .subscribe();
  },

  // ── Add a new lead ───────────────────────────────────────────
  addLead: async (
    lead: { name: string; email: string; requestType: string; message: string; status: LeadStatus; isGuest: boolean },
    isGuest: boolean = true,
    createdById?: string
  ): Promise<Lead> => {
    const score = calcScore(lead.message, lead.requestType);

    const { data, error } = await supabase
      .from('queries')
      .insert({
        name: lead.name || 'Anonymous',
        email: lead.email,
        request_type: lead.requestType,
        message: lead.message,
        status: lead.status || 'new',
        is_guest: isGuest,
        score,
        created_by_id: createdById ?? null,
        last_activity: new Date().toISOString(),
      })
      .select()
      .single();

    if (error) {
      console.error(error);
      toast.error('Failed to submit request');
      throw error;
    }

    toast.success('Request submitted successfully!');
    return mapRow(data);
  },

  // ── Update lead status ───────────────────────────────────────
  updateLeadStatus: async (leadId: string, status: LeadStatus): Promise<Lead | undefined> => {
    const { data, error } = await supabase
      .from('queries')
      .update({ status, last_activity: new Date().toISOString() })
      .eq('id', leadId)
      .select()
      .single();

    if (error) { toast.error('Failed to update status'); return undefined; }
    toast.success('Status updated');
    return mapRow(data);
  },

  // ── Assign lead to team member ───────────────────────────────
  assignLeadToTeamMember: async (leadId: string, teamMemberId: string): Promise<Lead | undefined> => {
    const { data, error } = await supabase
      .from('queries')
      .update({ assigned_to_id: teamMemberId, last_activity: new Date().toISOString() })
      .eq('id', leadId)
      .select('*, profiles!queries_assigned_to_id_fkey(name)')
      .single();

    if (error) { toast.error('Failed to assign lead'); return undefined; }
    toast.success('Lead assigned to team member');
    return mapRow(data);
  },

  // ── Delete a lead ────────────────────────────────────────────
  deleteLead: async (id: string): Promise<boolean> => {
    const { error } = await supabase.from('queries').delete().eq('id', id);
    if (error) { toast.error('Failed to delete'); return false; }
    toast.success('Deleted successfully');
    return true;
  },

  // ── Legacy shim ──────────────────────────────────────────────
  getGuestLeads: async (): Promise<Lead[]> => {
    const { data, error } = await supabase
      .from('queries').select('*').eq('is_guest', true).order('created_at', { ascending: false });
    if (error) return [];
    return (data ?? []).map(mapRow);
  },

  getRegisteredUserLeads: async (): Promise<Lead[]> => {
    const { data, error } = await supabase
      .from('queries').select('*').eq('is_guest', false).order('created_at', { ascending: false });
    if (error) return [];
    return (data ?? []).map(mapRow);
  },

  addInteraction: async (id: string, _message: string): Promise<Lead | undefined> => {
    // Interactions are now handled by messageService; update last_activity only
    const { data, error } = await supabase
      .from('queries')
      .update({ last_activity: new Date().toISOString() })
      .eq('id', id)
      .select()
      .single();
    if (error) return undefined;
    return mapRow(data);
  },
};

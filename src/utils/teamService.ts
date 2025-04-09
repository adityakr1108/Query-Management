
// Team management service to handle team members and assignments

import { toast } from "sonner";

export interface TeamMember {
  id: string;
  name: string;
  email: string;
  role: string;
  active: boolean;
  assignedLeads: string[]; // Array of lead IDs assigned to this team member
}

// Get initial team members from localStorage or use empty array
const getStoredTeamMembers = (): TeamMember[] => {
  const storedTeamMembers = localStorage.getItem('leadflow_team_members');
  if (storedTeamMembers) {
    try {
      return JSON.parse(storedTeamMembers);
    } catch (error) {
      console.error('Error parsing stored team members:', error);
      return [];
    }
  }
  return [];
};

// Save team members to localStorage
const saveTeamMembers = (teamMembers: TeamMember[]) => {
  localStorage.setItem('leadflow_team_members', JSON.stringify(teamMembers));
};

// Initialize with stored data
let teamMembers = getStoredTeamMembers();

// Simulate API delay
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export const teamService = {
  // Get all team members
  getTeamMembers: async (): Promise<TeamMember[]> => {
    await delay(500);
    return [...teamMembers];
  },

  // Get team member by ID
  getTeamMemberById: async (id: string): Promise<TeamMember | undefined> => {
    await delay(300);
    return teamMembers.find(member => member.id === id);
  },

  // Add new team member
  addTeamMember: async (member: Omit<TeamMember, 'id' | 'assignedLeads'>): Promise<TeamMember> => {
    await delay(600);
    const id = Math.random().toString(36).substring(2, 9);
    
    const newMember: TeamMember = {
      id,
      name: member.name,
      email: member.email,
      role: member.role,
      active: member.active,
      assignedLeads: []
    };
    
    teamMembers = [...teamMembers, newMember];
    saveTeamMembers(teamMembers);
    toast.success("Team member added successfully");
    return newMember;
  },

  // Update team member
  updateTeamMember: async (id: string, updates: Partial<Omit<TeamMember, 'id'>>): Promise<TeamMember | undefined> => {
    await delay(500);
    const index = teamMembers.findIndex(member => member.id === id);
    
    if (index !== -1) {
      teamMembers[index] = { ...teamMembers[index], ...updates };
      saveTeamMembers(teamMembers);
      toast.success("Team member updated successfully");
      return teamMembers[index];
    }
    
    toast.error("Failed to update team member");
    return undefined;
  },

  // Delete team member
  deleteTeamMember: async (id: string): Promise<boolean> => {
    await delay(500);
    const initialLength = teamMembers.length;
    teamMembers = teamMembers.filter(member => member.id !== id);
    
    if (teamMembers.length < initialLength) {
      saveTeamMembers(teamMembers);
      toast.success("Team member deleted successfully");
      return true;
    }
    
    toast.error("Failed to delete team member");
    return false;
  },

  // Assign lead to team member
  assignLeadToTeamMember: async (teamMemberId: string, leadId: string): Promise<TeamMember | undefined> => {
    await delay(400);
    const index = teamMembers.findIndex(member => member.id === teamMemberId);
    
    if (index !== -1) {
      if (!teamMembers[index].assignedLeads.includes(leadId)) {
        teamMembers[index].assignedLeads = [...teamMembers[index].assignedLeads, leadId];
        saveTeamMembers(teamMembers);
        toast.success(`Lead assigned to ${teamMembers[index].name}`);
      }
      return teamMembers[index];
    }
    
    toast.error("Failed to assign lead to team member");
    return undefined;
  },

  // Remove lead assignment from team member
  removeLeadAssignment: async (teamMemberId: string, leadId: string): Promise<TeamMember | undefined> => {
    await delay(400);
    const index = teamMembers.findIndex(member => member.id === teamMemberId);
    
    if (index !== -1) {
      teamMembers[index].assignedLeads = teamMembers[index].assignedLeads.filter(id => id !== leadId);
      saveTeamMembers(teamMembers);
      toast.success("Lead assignment removed");
      return teamMembers[index];
    }
    
    toast.error("Failed to remove lead assignment");
    return undefined;
  },

  // Get team members assigned to a specific lead
  getTeamMembersForLead: async (leadId: string): Promise<TeamMember[]> => {
    await delay(300);
    return teamMembers.filter(member => member.assignedLeads.includes(leadId));
  },

  // Find team member with the least number of assigned leads
  getNextAvailableTeamMember: async (): Promise<TeamMember | undefined> => {
    await delay(300);
    const activeMembers = teamMembers.filter(member => member.active);
    
    if (activeMembers.length === 0) return undefined;
    
    return activeMembers.reduce((prev, current) => {
      return prev.assignedLeads.length <= current.assignedLeads.length ? prev : current;
    });
  }
};

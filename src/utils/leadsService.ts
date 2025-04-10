
import { toast } from "sonner";
import { teamService } from "./teamService";
import { emailService } from "./emailService";

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
  interactions: number | { message: string; isAdmin: boolean; timestamp: string }[];
  isGuest?: boolean; // Property to identify guest vs logged-in user leads
  assignedTeamMemberId?: string; // ID of the team member assigned to this lead
  createdById?: string; // ID of the user who created this lead
}

// Initial mock data
const initialLeads: Lead[] = [
  {
    id: '1',
    name: 'John Smith',
    email: 'john@example.com',
    score: 85,
    status: 'qualified',
    lastActivity: '2 days ago',
    requestType: 'Product Inquiry',
    message: 'I\'m interested in your AI lead scoring system. Can you tell me more about the pricing?',
    interactions: 8,
    isGuest: false
  },
  {
    id: '2',
    name: 'Emily Johnson',
    email: 'emily@example.com',
    score: 72,
    status: 'contacted',
    lastActivity: '5 days ago',
    requestType: 'Demo Request',
    message: 'We\'re looking for a lead management system for our sales team of 15 people. Would like to see how your platform works.',
    interactions: 3,
    isGuest: true
  },
  {
    id: '3',
    name: 'Michael Brown',
    email: 'michael@example.com',
    score: 45,
    status: 'new',
    lastActivity: '1 week ago',
    requestType: 'Support',
    message: 'Having some questions about the WhatsApp integration. How does it work with our existing system?',
    interactions: 1,
    isGuest: true
  },
  {
    id: '4',
    name: 'Sarah Wilson',
    email: 'sarah@example.com',
    score: 92,
    status: 'qualified',
    lastActivity: '1 day ago',
    requestType: 'Demo Request',
    message: 'Our marketing team is looking for a new lead management solution that integrates with our CRM. Would like to see a demo.',
    interactions: 5,
    isGuest: false
  },
  {
    id: '5',
    name: 'David Lee',
    email: 'david@example.com',
    score: 31,
    status: 'new',
    lastActivity: '3 days ago',
    requestType: 'Pricing',
    message: 'How much does your basic plan cost? We\'re a small business with about 5 sales reps.',
    interactions: 2,
    isGuest: true
  },
  {
    id: '6',
    name: 'Jessica Chen',
    email: 'jessica@example.com',
    score: 78,
    status: 'contacted',
    lastActivity: '4 days ago',
    requestType: 'Product Inquiry',
    message: 'Does your platform integrate with Salesforce? We need a solution that works with our existing tech stack.',
    interactions: 4,
    isGuest: false
  },
];

// Use localStorage to persist leads data
const getStoredLeads = (): Lead[] => {
  const storedLeads = localStorage.getItem('leadflow_leads');
  if (storedLeads) {
    try {
      return JSON.parse(storedLeads);
    } catch (error) {
      console.error('Error parsing stored leads:', error);
      return [...initialLeads];
    }
  }
  return [...initialLeads];
};

// Save leads to localStorage
const saveLeads = (leads: Lead[]) => {
  localStorage.setItem('leadflow_leads', JSON.stringify(leads));
};

// Generate a unique ID that includes user info
const generateUniqueId = (userEmail?: string): string => {
  const timestamp = Date.now();
  const random = Math.floor(Math.random() * 10000);
  const userPart = userEmail ? userEmail.substring(0, 4).replace(/[@.]/g, '') : 'guest';
  return `${userPart}-${timestamp}-${random}`;
};

// Initialize with stored or initial data
let leads = getStoredLeads();

// Simulate API delay
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

// API simulation functions
export const leadsService = {
  // Get all leads
  getLeads: async (): Promise<Lead[]> => {
    await delay(600); // Simulate network delay
    return [...leads];
  },

  // Get leads for a specific user by email
  getUserLeads: async (email: string): Promise<Lead[]> => {
    await delay(600);
    // Return leads that match the user's email AND have isGuest set to false
    return leads.filter(lead => lead.email === email && lead.isGuest === false);
  },

  // Get guest leads (for admin dashboard)
  getGuestLeads: async (): Promise<Lead[]> => {
    await delay(600);
    return leads.filter(lead => lead.isGuest === true);
  },

  // Get user leads (for admin dashboard)
  getRegisteredUserLeads: async (): Promise<Lead[]> => {
    await delay(600);
    return leads.filter(lead => lead.isGuest === false);
  },

  // Get leads for a user (used by components)
  getLeadsForUser: async (userId?: string): Promise<Lead[]> => {
    await delay(600);
    return leads.filter(lead => lead.email === userId && !lead.isGuest);
  },

  // Get leads for a business (used by components)
  getLeadsForBusiness: async (businessId?: string): Promise<Lead[]> => {
    await delay(600);
    // Placeholder implementation - in a real app would filter by business ID
    return leads;
  },

  // Get leads for a team (used by components)
  getLeadsForTeam: async (teamId?: string): Promise<Lead[]> => {
    await delay(600);
    // Placeholder implementation - in a real app would filter by team ID
    return leads;
  },
  
  // Get leads assigned to a specific team member
  getLeadsForTeamMember: async (teamMemberId: string): Promise<Lead[]> => {
    await delay(600);
    return leads.filter(lead => lead.assignedTeamMemberId === teamMemberId);
  },

  // Get unassigned leads
  getUnassignedLeads: async (): Promise<Lead[]> => {
    await delay(600);
    return leads.filter(lead => !lead.assignedTeamMemberId);
  },

  // Get lead by ID
  getLead: async (id: string): Promise<Lead | undefined> => {
    await delay(300);
    return leads.find(lead => lead.id === id);
  },

  // Update lead status
  updateLeadStatus: async (leadId: string | number, status: LeadStatus): Promise<Lead | undefined> => {
    await delay(500);
    const id = typeof leadId === 'number' ? String(leadId) : leadId;
    const index = leads.findIndex(lead => lead.id === id);
    
    if (index !== -1) {
      const oldStatus = leads[index].status;
      leads[index] = { ...leads[index], status };
      saveLeads(leads);
      
      // Send email notification about status update
      await emailService.sendStatusUpdateNotification(leads[index], status);
      
      // If the lead is converted or lost, and it's assigned to a team member,
      // automatically assign a new lead to that team member
      if ((status === 'converted' || status === 'lost') && 
          leads[index].assignedTeamMemberId && 
          (oldStatus !== 'converted' && oldStatus !== 'lost')) {
        
        const teamMemberId = leads[index].assignedTeamMemberId;
        
        // Check if the team member has less than 10 leads before assigning a new one
        const teamMemberLeads = await leadsService.getLeadsForTeamMember(teamMemberId);
        
        // Remove the current lead (which is now converted/lost) from the count
        const activeLeadCount = teamMemberLeads.filter(l => 
          l.id !== id && l.status !== 'converted' && l.status !== 'lost'
        ).length;
        
        // Only assign a new lead if the team member has less than 10 active leads
        if (activeLeadCount < 9) { // 9 because we're removing one and adding one
          // Find a new lead to assign
          const newLeadsForAssignment = await leadsService.getUnassignedLeads();
          const newLeadToAssign = newLeadsForAssignment.find(l => 
            l.status !== 'converted' && 
            l.status !== 'lost'
          );
          
          if (newLeadToAssign) {
            await leadsService.assignLeadToTeamMember(newLeadToAssign.id, teamMemberId);
            toast.success(`A new lead has been automatically assigned to replace the ${status} lead`);
          }
        }
      }
      
      toast.success("Lead status updated successfully");
      return leads[index];
    }
    
    toast.error("Failed to update lead status");
    return undefined;
  },

  // Add a new lead
  addLead: async (lead: Omit<Lead, 'id' | 'score' | 'lastActivity' | 'interactions'>, isGuest: boolean = true): Promise<Lead> => {
    await delay(800);
    
    // Generate unique ID using the user's email if available
    const id = generateUniqueId(lead.email);
    
    // Calculate an AI score based on message length and requestType
    let score = Math.floor(Math.random() * 40) + 30; // Base score 30-70
    if (lead.message.length > 100) score += 15;
    if (lead.requestType === 'Demo Request') score += 20;
    if (lead.requestType === 'Product Inquiry') score += 10;
    score = Math.min(score, 99); // Cap at 99
    
    // Make sure isGuest is properly set
    // The type already requires isGuest to be present, but we'll ensure the value is correct based on the function param
    
    const newLead: Lead = {
      id,
      ...lead,
      name: lead.name || 'Anonymous User', // Ensure name is never empty
      score,
      lastActivity: 'Just now',
      interactions: 1,
      // isGuest is required by the type and should be passed in the lead object
      // but we'll ensure it matches the function parameter
      isGuest: typeof lead.isGuest !== 'undefined' ? lead.isGuest : isGuest,
      createdById: isGuest ? undefined : lead.email // Store the creator's ID (email) for registered users
    };
    
    leads = [newLead, ...leads];
    saveLeads(leads);
    
    // If this is a new lead and there are team members, try to assign it automatically
    if (lead.status === 'new') {
      const availableTeamMember = await teamService.getNextAvailableTeamMember();
      
      if (availableTeamMember) {
        await leadsService.assignLeadToTeamMember(newLead.id, availableTeamMember.id);
      }
    }
    
    // If it's a guest lead, send welcome email
    if (isGuest) {
      await emailService.sendWelcomeEmail(newLead.name, newLead.email);
    }
    
    toast.success("New request added successfully");
    return newLead;
  },

  // Add interaction to a lead
  addInteraction: async (id: string, message: string): Promise<Lead | undefined> => {
    await delay(400);
    const index = leads.findIndex(lead => lead.id === id);
    if (index !== -1) {
      // Handle different interaction types (number or array)
      if (typeof leads[index].interactions === 'number') {
        // If interactions is a number, increment it
        leads[index] = { 
          ...leads[index], 
          interactions: (leads[index].interactions as number) + 1,
          lastActivity: 'Just now'
        };
      } else if (Array.isArray(leads[index].interactions)) {
        // If interactions is an array, push new interaction
        (leads[index].interactions as Array<{message: string; isAdmin: boolean; timestamp: string}>).push({
          message,
          isAdmin: true,
          timestamp: new Date().toLocaleTimeString()
        });
        leads[index] = {
          ...leads[index],
          lastActivity: 'Just now'
        };
      }
      
      saveLeads(leads);
      toast.success("Interaction recorded");
      return leads[index];
    }
    toast.error("Failed to record interaction");
    return undefined;
  },

  // Assign lead to team member
  assignLeadToTeamMember: async (leadId: string, teamMemberId: string): Promise<Lead | undefined> => {
    await delay(600);
    
    // Check if team member already has 10 leads
    const currentAssignedLeads = await leadsService.getLeadsForTeamMember(teamMemberId);
    const activeAssignedLeads = currentAssignedLeads.filter(lead => 
      lead.status !== 'converted' && lead.status !== 'lost'
    );
    
    if (activeAssignedLeads.length >= 10) {
      toast.error("Team member already has the maximum allowed leads (10)");
      return undefined;
    }
    
    const index = leads.findIndex(lead => lead.id === leadId);
    
    if (index !== -1) {
      leads[index] = { ...leads[index], assignedTeamMemberId: teamMemberId };
      saveLeads(leads);
      
      // Add the lead ID to the team member's assigned leads
      await teamService.assignLeadToTeamMember(teamMemberId, leadId);
      
      // Get team member name for notification
      const teamMember = await teamService.getTeamMemberById(teamMemberId);
      
      if (teamMember) {
        // Send email notification about team assignment
        await emailService.sendTeamAssignmentNotification(leads[index], teamMember.name);
      }
      
      toast.success("Lead assigned to team member");
      return leads[index];
    }
    
    toast.error("Failed to assign lead");
    return undefined;
  },

  // Delete a lead
  deleteLead: async (id: string): Promise<boolean> => {
    await delay(500);
    const initialLength = leads.length;
    leads = leads.filter(lead => lead.id !== id);
    if (leads.length < initialLength) {
      saveLeads(leads);
      toast.success("Lead deleted successfully");
      return true;
    }
    toast.error("Failed to delete lead");
    return false;
  }
};

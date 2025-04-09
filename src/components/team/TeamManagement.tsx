
import { useState, useEffect } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import TeamMemberList from './TeamMemberList';
import { Lead, leadsService } from '@/utils/leadsService';
import { TeamMember, teamService } from '@/utils/teamService';
import { toast } from 'sonner';
import LeadCard from '@/components/LeadCard';
import { Button } from '@/components/ui/button';
import { BarChart, Users, RefreshCcw, UserPlus } from 'lucide-react';

const TeamManagement = () => {
  const [activeTab, setActiveTab] = useState('team');
  const [unassignedLeads, setUnassignedLeads] = useState<Lead[]>([]);
  const [isLoadingLeads, setIsLoadingLeads] = useState(true);
  const [selectedTeamMember, setSelectedTeamMember] = useState<TeamMember | null>(null);
  const [assignedLeads, setAssignedLeads] = useState<Lead[]>([]);
  const [isLoadingAssigned, setIsLoadingAssigned] = useState(false);
  
  const fetchUnassignedLeads = async () => {
    setIsLoadingLeads(true);
    try {
      const leads = await leadsService.getUnassignedLeads();
      // Filter to only show active leads (not converted or lost)
      const activeLeads = leads.filter(lead => 
        lead.status !== 'converted' && lead.status !== 'lost'
      );
      setUnassignedLeads(activeLeads);
    } catch (error) {
      console.error('Error fetching unassigned leads:', error);
      toast.error('Failed to load unassigned leads');
    } finally {
      setIsLoadingLeads(false);
    }
  };
  
  const fetchAssignedLeads = async (teamMemberId: string) => {
    setIsLoadingAssigned(true);
    try {
      const leads = await leadsService.getLeadsForTeamMember(teamMemberId);
      setAssignedLeads(leads);
    } catch (error) {
      console.error('Error fetching assigned leads:', error);
      toast.error('Failed to load assigned leads');
    } finally {
      setIsLoadingAssigned(false);
    }
  };
  
  useEffect(() => {
    fetchUnassignedLeads();
  }, []);
  
  useEffect(() => {
    if (selectedTeamMember) {
      fetchAssignedLeads(selectedTeamMember.id);
    } else {
      setAssignedLeads([]);
    }
  }, [selectedTeamMember]);
  
  const handleTeamMemberSelected = (member: TeamMember) => {
    setSelectedTeamMember(member);
    setActiveTab('assigned');
  };
  
  const handleAssignLead = async (leadId: string) => {
    if (!selectedTeamMember) {
      toast.error('Please select a team member first');
      return;
    }
    
    try {
      await leadsService.assignLeadToTeamMember(leadId, selectedTeamMember.id);
      // Refresh both lead lists
      fetchUnassignedLeads();
      fetchAssignedLeads(selectedTeamMember.id);
    } catch (error) {
      console.error('Error assigning lead:', error);
      toast.error('Failed to assign lead');
    }
  };
  
  const handleLeadUpdated = () => {
    fetchUnassignedLeads();
    if (selectedTeamMember) {
      fetchAssignedLeads(selectedTeamMember.id);
    }
  };
  
  const autoAssignLeads = async () => {
    if (unassignedLeads.length === 0) {
      toast.info('No unassigned leads to distribute');
      return;
    }
    
    const teamMembers = await teamService.getTeamMembers();
    const activeTeamMembers = teamMembers.filter(member => member.active);
    
    if (activeTeamMembers.length === 0) {
      toast.error('No active team members available for assignment');
      return;
    }
    
    let assignedCount = 0;
    
    for (const lead of unassignedLeads) {
      // Find team member with least assigned leads
      let leastBusyMember = activeTeamMembers[0];
      
      for (const member of activeTeamMembers) {
        if (member.assignedLeads.length < leastBusyMember.assignedLeads.length) {
          leastBusyMember = member;
        }
      }
      
      await leadsService.assignLeadToTeamMember(lead.id, leastBusyMember.id);
      
      // Update the member's assigned leads count for the next iteration
      leastBusyMember.assignedLeads.push(lead.id);
      assignedCount++;
    }
    
    toast.success(`Successfully assigned ${assignedCount} leads to team members`);
    
    // Refresh data
    fetchUnassignedLeads();
    if (selectedTeamMember) {
      fetchAssignedLeads(selectedTeamMember.id);
    }
  };
  
  // The main content to display based on active tab
  const renderTabContent = () => {
    if (activeTab === 'team') {
      return (
        <div>
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-medium">Unassigned Leads</h3>
            <div className="flex space-x-2">
              <Button size="sm" variant="outline" onClick={fetchUnassignedLeads}>
                <RefreshCcw className="h-4 w-4 mr-1" />
                Refresh
              </Button>
              <Button size="sm" onClick={autoAssignLeads}>
                <BarChart className="h-4 w-4 mr-1" />
                Auto-Assign All
              </Button>
            </div>
          </div>
          
          {isLoadingLeads ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {[1, 2].map((i) => (
                <Card key={i} className="animate-pulse">
                  <CardContent className="p-4">
                    <div className="flex items-center space-x-4">
                      <div className="rounded-full bg-gray-200 h-10 w-10"></div>
                      <div className="space-y-2 flex-1">
                        <div className="h-4 bg-gray-200 rounded w-24"></div>
                        <div className="h-3 bg-gray-200 rounded w-32"></div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : unassignedLeads.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {unassignedLeads.map(lead => (
                <Card key={lead.id} className="border-dashed hover:border-primary transition-colors">
                  <CardContent className="p-0">
                    <LeadCard 
                      lead={lead}
                      isAdmin={true}
                      onLeadUpdated={handleLeadUpdated}
                    />
                    
                    {selectedTeamMember && (
                      <div className="p-3 pt-0 border-t">
                        <Button 
                          onClick={() => handleAssignLead(lead.id)}
                          className="w-full"
                          size="sm"
                        >
                          <UserPlus className="h-4 w-4 mr-2" />
                          Assign to {selectedTeamMember.name}
                        </Button>
                      </div>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <div className="text-center py-12 border rounded-lg bg-gray-50">
              <p className="text-gray-500 mb-2">No unassigned leads</p>
              <p className="text-sm text-gray-400">
                All leads have been assigned to team members
              </p>
            </div>
          )}
        </div>
      );
    } else if (activeTab === 'assigned' && selectedTeamMember) {
      return (
        <div>
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-medium">{selectedTeamMember.name}'s Leads</h3>
            <Button size="sm" variant="outline" onClick={() => {
              if (selectedTeamMember) fetchAssignedLeads(selectedTeamMember.id);
            }}>
              <RefreshCcw className="h-4 w-4 mr-1" />
              Refresh
            </Button>
          </div>
          
          {isLoadingAssigned ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {[1, 2].map((i) => (
                <Card key={i} className="animate-pulse">
                  <CardContent className="p-4">
                    <div className="flex items-center space-x-4">
                      <div className="rounded-full bg-gray-200 h-10 w-10"></div>
                      <div className="space-y-2 flex-1">
                        <div className="h-4 bg-gray-200 rounded w-24"></div>
                        <div className="h-3 bg-gray-200 rounded w-32"></div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : assignedLeads.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {assignedLeads.map(lead => (
                <Card key={lead.id}>
                  <CardContent className="p-0">
                    <LeadCard 
                      lead={lead}
                      isAdmin={true}
                      onLeadUpdated={handleLeadUpdated}
                    />
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <div className="text-center py-12 border rounded-lg bg-gray-50">
              <p className="text-gray-500 mb-2">No assigned leads for this team member</p>
              <p className="text-sm text-gray-400">
                Use the Unassigned Leads tab to assign leads
              </p>
            </div>
          )}
        </div>
      );
    } else {
      return (
        <div className="text-center py-12 border rounded-lg bg-gray-50">
          <p className="text-gray-500">Select a team member to view their assigned leads</p>
        </div>
      );
    }
  };
  
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold mb-1">Team Management</h2>
        <p className="text-gray-500">Manage your team and assign leads to team members</p>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-1">
          <Card className="h-full">
            <CardHeader>
              <CardTitle className="flex items-center">
                <Users className="h-5 w-5 mr-2 text-primary" />
                Team Members
              </CardTitle>
            </CardHeader>
            <CardContent>
              <TeamMemberList onMemberSelected={handleTeamMemberSelected} />
            </CardContent>
          </Card>
        </div>
        
        <div className="lg:col-span-2">
          <Card className="h-full">
            <CardHeader className="border-b pb-3">
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg">Lead Assignments</CardTitle>
                
                {selectedTeamMember && (
                  <div className="text-sm text-gray-500">
                    Selected: <span className="font-medium">{selectedTeamMember.name}</span>
                  </div>
                )}
              </div>
              
              <Tabs value={activeTab} onValueChange={setActiveTab} className="mt-2">
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="team">Unassigned Leads</TabsTrigger>
                  <TabsTrigger value="assigned" disabled={!selectedTeamMember}>
                    {selectedTeamMember ? `${selectedTeamMember.name}'s Leads` : 'Assigned Leads'}
                  </TabsTrigger>
                </TabsList>

                <TabsContent value="team" className="mt-4">
                  {activeTab === 'team' && renderTabContent()}
                </TabsContent>
                
                <TabsContent value="assigned" className="mt-4">
                  {activeTab === 'assigned' && renderTabContent()}
                </TabsContent>
              </Tabs>
            </CardHeader>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default TeamManagement;

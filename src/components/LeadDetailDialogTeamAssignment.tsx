
import { useState, useEffect } from 'react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { teamService, TeamMember } from '@/utils/teamService';
import { leadsService } from '@/utils/leadsService';
import { toast } from 'sonner';
import { UserPlus, Users } from 'lucide-react';

interface LeadDetailDialogTeamAssignmentProps {
  leadId: string;
  teamMemberId?: string;
  onAssigned?: () => void;
}

const LeadDetailDialogTeamAssignment = ({
  leadId,
  teamMemberId,
  onAssigned
}: LeadDetailDialogTeamAssignmentProps) => {
  const [teamMembers, setTeamMembers] = useState<TeamMember[]>([]);
  const [selectedTeamMember, setSelectedTeamMember] = useState<string>(teamMemberId || '');
  const [isLoading, setIsLoading] = useState(false);
  const [isAssigning, setIsAssigning] = useState(false);

  useEffect(() => {
    const fetchTeamMembers = async () => {
      setIsLoading(true);
      try {
        const members = await teamService.getTeamMembers();
        setTeamMembers(members.filter(member => member.active));
      } catch (error) {
        console.error('Error fetching team members:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchTeamMembers();
  }, []);

  useEffect(() => {
    setSelectedTeamMember(teamMemberId || '');
  }, [teamMemberId]);

  const handleAssign = async () => {
    if (!selectedTeamMember) {
      toast.error('Please select a team member');
      return;
    }

    setIsAssigning(true);
    try {
      await leadsService.assignLeadToTeamMember(leadId, selectedTeamMember);
      onAssigned && onAssigned();
    } catch (error) {
      console.error('Error assigning lead:', error);
      toast.error('Failed to assign lead');
    } finally {
      setIsAssigning(false);
    }
  };

  return (
    <div className="space-y-4 border-t pt-4">
      <div className="flex items-center">
        <Users className="h-4 w-4 mr-2 text-primary" />
        <h4 className="text-sm font-medium">Team Assignment</h4>
      </div>

      <div className="flex items-center gap-2">
        <Select
          disabled={isLoading || isAssigning}
          value={selectedTeamMember}
          onValueChange={setSelectedTeamMember}
        >
          <SelectTrigger className="flex-1">
            <SelectValue placeholder="Select team member" />
          </SelectTrigger>
          <SelectContent>
            {teamMembers.length > 0 ? (
              teamMembers.map((member) => (
                <SelectItem key={member.id} value={member.id}>
                  {member.name} - {member.role}
                </SelectItem>
              ))
            ) : (
              <SelectItem value="none" disabled>
                No team members available
              </SelectItem>
            )}
          </SelectContent>
        </Select>

        <Button
          onClick={handleAssign}
          disabled={!selectedTeamMember || isAssigning || selectedTeamMember === teamMemberId}
          size="sm"
        >
          <UserPlus className="h-4 w-4 mr-1" />
          {isAssigning ? 'Assigning...' : 'Assign'}
        </Button>
      </div>

      {teamMembers.length === 0 && !isLoading && (
        <p className="text-sm text-gray-500">
          No team members available. Add team members in Team Management.
        </p>
      )}
    </div>
  );
};

export default LeadDetailDialogTeamAssignment;

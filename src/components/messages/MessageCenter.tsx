
import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { leadsService, Lead } from '@/utils/leadsService';
import { messageService } from '@/utils/messageService';
import { useUser } from '@/context/UserContext';
import {
  Search, MessagesSquare, User, UserCheck, Inbox, RefreshCcw
} from 'lucide-react';
import MessageList from './MessageList';
import MessagePreview from './MessagePreview';

interface MessageCenterProps {
  isUserDashboard?: boolean;
  isEmployeeDashboard?: boolean;
  userEmail?: string;
  employeeId?: string;
}

const filterLeads = (leads: Lead[], type: string) => {
  if (type === 'registered') return leads.filter(l => !l.isGuest);
  if (type === 'guest') return leads.filter(l => l.isGuest);
  return leads;
};

const MessageCenter = ({
  isUserDashboard = false,
  isEmployeeDashboard = false,
  userEmail,
  employeeId,
}: MessageCenterProps) => {
  const { user } = useUser();
  const [leads, setLeads] = useState<Lead[]>([]);
  const [filteredLeads, setFilteredLeads] = useState<Lead[]>([]);
  const [selectedLead, setSelectedLead] = useState<Lead | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [messageType, setMessageType] = useState('all');
  const [unreadCounts, setUnreadCounts] = useState<Record<string, number>>({});

  const fetchLeads = async () => {
    setIsLoading(true);
    try {
      let allLeads: Lead[];

      if (isUserDashboard && user) {
        allLeads = await leadsService.getUserLeads(user.id);
      } else if (isEmployeeDashboard && employeeId) {
        allLeads = await leadsService.getLeadsForTeamMember(employeeId);
      } else {
        allLeads = await leadsService.getLeads();
      }

      setLeads(allLeads);
      setFilteredLeads(allLeads);
      if (allLeads.length > 0 && !selectedLead) {
        setSelectedLead(allLeads[0]);
      }

      // Fetch unread counts
      if (user) {
        const counts: Record<string, number> = {};
        await Promise.all(
          allLeads.map(async (lead) => {
            counts[lead.id] = await messageService.getUnreadCount(lead.id, user.id);
          })
        );
        setUnreadCounts(counts);
      }
    } catch (error) {
      console.error('Error fetching messages:', error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchLeads();
  }, [isUserDashboard, isEmployeeDashboard, user?.id, employeeId]);

  useEffect(() => {
    const typeFiltered = filterLeads(leads, messageType);
    const filtered = typeFiltered.filter(lead =>
      lead.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      lead.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      lead.message.toLowerCase().includes(searchQuery.toLowerCase()) ||
      lead.requestType.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredLeads(filtered);
    if (selectedLead && !filtered.some(l => l.id === selectedLead.id)) {
      setSelectedLead(filtered[0] ?? null);
    }
  }, [searchQuery, leads, messageType]);

  const handleLeadSelect = (lead: Lead) => {
    setSelectedLead(lead);
    // Clear unread count when opening
    if (user) {
      messageService.markRead(lead.id, user.id);
      setUnreadCounts(prev => ({ ...prev, [lead.id]: 0 }));
    }
  };

  const isAdmin = !isUserDashboard && !isEmployeeDashboard;

  return (
    <div className="space-y-4">
      <div>
        <h2 className="text-2xl font-bold mb-1">Message Center</h2>
        <p className="text-gray-500 text-sm">
          {isUserDashboard ? 'Chat with the team handling your queries' :
           isEmployeeDashboard ? 'Respond to your assigned queries' :
           'Manage all query conversations'}
        </p>
      </div>

      <div className="flex flex-col space-y-4 h-[calc(100vh-280px)] min-h-[550px]">
        {/* Toolbar */}
        <div className="flex items-center space-x-3 flex-wrap gap-2">
          <div className="relative flex-1 min-w-[200px]">
            <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search conversations..."
              className="pl-9"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          {isAdmin && (
            <Tabs value={messageType} onValueChange={setMessageType} className="w-auto">
              <TabsList>
                <TabsTrigger value="all"><Inbox size={14} className="mr-1.5" />All</TabsTrigger>
                <TabsTrigger value="registered"><UserCheck size={14} className="mr-1.5" />Registered</TabsTrigger>
                <TabsTrigger value="guest"><User size={14} className="mr-1.5" />Guest</TabsTrigger>
              </TabsList>
            </Tabs>
          )}

          <Button variant="outline" size="icon" onClick={fetchLeads}>
            <RefreshCcw size={14} />
          </Button>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 flex-1 overflow-hidden">
          {/* Left: conversation list */}
          <Card className="md:col-span-1 overflow-hidden flex flex-col">
            <CardHeader className="p-3 pb-2 flex-shrink-0">
              <CardTitle className="text-base flex items-center gap-2">
                <MessagesSquare size={16} />
                Conversations
                <span className="ml-auto px-2 py-0.5 text-xs rounded-full bg-primary/10 text-primary">
                  {filteredLeads.length}
                </span>
              </CardTitle>
            </CardHeader>
            <CardContent className="p-0 flex-1 overflow-auto">
              <MessageList
                leads={filteredLeads}
                selectedLead={selectedLead}
                onSelectLead={handleLeadSelect}
                isLoading={isLoading}
                unreadCounts={unreadCounts}
              />
            </CardContent>
          </Card>

          {/* Right: chat */}
          <Card className="md:col-span-2 overflow-hidden flex flex-col">
            <MessagePreview
              lead={selectedLead}
              isLoading={isLoading}
            />
          </Card>
        </div>
      </div>
    </div>
  );
};

export default MessageCenter;

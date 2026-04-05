
import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { useNavigate } from 'react-router-dom';
import { useUser } from '@/context/UserContext';
import { leadsService, Lead } from '@/utils/leadsService';
import { useToast } from '@/hooks/use-toast';
import {
  LayoutDashboard, MessagesSquare, UserCircle, LogOut,
  CheckCircle2, Clock, Bell, ChevronRight, RefreshCcw
} from 'lucide-react';
import MessageCenter from '@/components/messages/MessageCenter';
import LeadCard from '@/components/LeadCard';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

const EmployeeDashboard = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { user, logout } = useUser();
  const [activeTab, setActiveTab] = useState('dashboard');
  const [leads, setLeads] = useState<Lead[]>([]);
  const [isLoadingLeads, setIsLoadingLeads] = useState(true);

  const fetchLeads = async () => {
    if (!user) return;
    setIsLoadingLeads(true);
    try {
      const data = await leadsService.getLeadsForTeamMember(user.id);
      setLeads(data);
    } catch {
      toast({ title: 'Error', description: 'Failed to load queries', variant: 'destructive' });
    } finally {
      setIsLoadingLeads(false);
    }
  };

  useEffect(() => { fetchLeads(); }, [user?.id]);

  const handleLogout = async () => {
    await logout();
    navigate('/login');
  };

  const active = leads.filter(l => l.status !== 'converted' && l.status !== 'lost');
  const completed = leads.filter(l => l.status === 'converted');

  return (
    <div className="min-h-screen flex flex-col bg-background page-transition">
      {/* Navbar */}
      <nav className="bg-white border-b sticky top-0 z-10">
        <div className="container mx-auto py-4 px-6 flex items-center justify-between">
          <div className="text-xl font-semibold">
            <span className="bg-gradient-to-r from-primary to-blue-600 bg-clip-text text-transparent">LeadFlow</span>
            <Badge variant="outline" className="ml-2 text-xs">Employee</Badge>
          </div>
          <div className="flex items-center gap-4">
            <Avatar className="h-8 w-8">
              <AvatarFallback className="bg-primary text-white text-sm">
                {user?.name?.split(' ').map(n => n[0]).join('').toUpperCase() || 'EM'}
              </AvatarFallback>
            </Avatar>
            <span className="text-sm font-medium">{user?.name}</span>
          </div>
        </div>
      </nav>

      <div className="flex-1 container mx-auto p-6">
        <div className="flex flex-col md:flex-row gap-6">
          {/* Sidebar */}
          <div className="md:w-56">
            <Card>
              <CardContent className="p-0">
                <nav className="flex flex-col p-2">
                  {[
                    { key: 'dashboard', icon: <LayoutDashboard className="h-4 w-4 mr-2" />, label: 'Dashboard' },
                    { key: 'queries', icon: <Bell className="h-4 w-4 mr-2" />, label: 'My Queries' },
                    { key: 'messages', icon: <MessagesSquare className="h-4 w-4 mr-2" />, label: 'Messages' },
                    { key: 'profile', icon: <UserCircle className="h-4 w-4 mr-2" />, label: 'Profile' },
                  ].map(item => (
                    <Button
                      key={item.key}
                      variant={activeTab === item.key ? 'default' : 'ghost'}
                      className="justify-start mb-1"
                      onClick={() => setActiveTab(item.key)}
                    >
                      {item.icon}{item.label}
                    </Button>
                  ))}
                  <Button
                    variant="ghost"
                    className="justify-start text-red-500 hover:text-red-600 hover:bg-red-50 mt-4"
                    onClick={handleLogout}
                  >
                    <LogOut className="mr-2 h-4 w-4" />Logout
                  </Button>
                </nav>
              </CardContent>
            </Card>
          </div>

          {/* Main content */}
          <div className="flex-1">
            {activeTab === 'dashboard' && (
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <h1 className="text-2xl font-bold">Welcome, {user?.name}</h1>
                  <Button variant="outline" size="sm" onClick={fetchLeads}>
                    <RefreshCcw className="h-4 w-4 mr-2" />Refresh
                  </Button>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <Card className="bg-blue-50">
                    <CardContent className="pt-6">
                      <div className="flex items-center justify-between">
                        <div>
                          <h3 className="text-2xl font-bold">{leads.length}</h3>
                          <p className="text-sm text-muted-foreground">Total Assigned</p>
                        </div>
                        <Bell className="h-8 w-8 text-blue-400" />
                      </div>
                    </CardContent>
                  </Card>
                  <Card className="bg-amber-50">
                    <CardContent className="pt-6">
                      <div className="flex items-center justify-between">
                        <div>
                          <h3 className="text-2xl font-bold">{active.length}</h3>
                          <p className="text-sm text-muted-foreground">Active</p>
                        </div>
                        <Clock className="h-8 w-8 text-amber-400" />
                      </div>
                    </CardContent>
                  </Card>
                  <Card className="bg-green-50">
                    <CardContent className="pt-6">
                      <div className="flex items-center justify-between">
                        <div>
                          <h3 className="text-2xl font-bold">{completed.length}</h3>
                          <p className="text-sm text-muted-foreground">Completed</p>
                        </div>
                        <CheckCircle2 className="h-8 w-8 text-green-400" />
                      </div>
                    </CardContent>
                  </Card>
                </div>

                {/* Recent */}
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg flex items-center justify-between">
                      Recent Assigned Queries
                      <Button variant="ghost" size="sm" className="text-xs" onClick={() => setActiveTab('queries')}>
                        View All <ChevronRight className="h-3 w-3 ml-1" />
                      </Button>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    {isLoadingLeads ? (
                      <div className="space-y-3">
                        {[1,2,3].map(i => (
                          <div key={i} className="flex items-center space-x-4 animate-pulse">
                            <div className="rounded-full bg-gray-200 h-10 w-10" />
                            <div className="space-y-2 flex-1">
                              <div className="h-4 bg-gray-200 rounded w-3/4" />
                              <div className="h-3 bg-gray-200 rounded w-1/2" />
                            </div>
                          </div>
                        ))}
                      </div>
                    ) : leads.length > 0 ? (
                      <div className="space-y-3">
                        {leads.slice(0, 4).map(lead => (
                          <div key={lead.id} className="flex items-center space-x-4 p-2 hover:bg-gray-50 rounded-md transition-all cursor-pointer" onClick={() => setActiveTab('messages')}>
                            <Avatar className="h-10 w-10">
                              <AvatarFallback className="bg-primary/10 text-primary text-sm">
                                {lead.name.charAt(0).toUpperCase()}
                              </AvatarFallback>
                            </Avatar>
                            <div className="flex-1">
                              <div className="font-medium text-sm">{lead.name}</div>
                              <div className="text-xs text-gray-500">{lead.requestType}</div>
                            </div>
                            <Badge variant={lead.status === 'new' ? 'default' : 'secondary'}>
                              {lead.status}
                            </Badge>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <p className="text-center text-muted-foreground py-6 text-sm">No queries assigned yet</p>
                    )}
                  </CardContent>
                </Card>
              </div>
            )}

            {activeTab === 'queries' && (
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h2 className="text-2xl font-bold">My Assigned Queries</h2>
                  <Button variant="outline" size="sm" onClick={fetchLeads}>
                    <RefreshCcw className="h-4 w-4 mr-2" />Refresh
                  </Button>
                </div>
                <Tabs defaultValue="active">
                  <TabsList>
                    <TabsTrigger value="active">Active ({active.length})</TabsTrigger>
                    <TabsTrigger value="completed">Completed ({completed.length})</TabsTrigger>
                  </TabsList>
                  <TabsContent value="active" className="mt-4">
                    {isLoadingLeads ? (
                      <div className="flex justify-center py-8"><div className="animate-spin w-6 h-6 border-2 border-primary border-t-transparent rounded-full" /></div>
                    ) : active.length > 0 ? (
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {active.map(lead => <LeadCard key={lead.id} lead={lead} isAdmin={true} onLeadUpdated={fetchLeads} />)}
                      </div>
                    ) : (
                      <div className="text-center py-12 text-muted-foreground">No active queries</div>
                    )}
                  </TabsContent>
                  <TabsContent value="completed" className="mt-4">
                    {completed.length > 0 ? (
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {completed.map(lead => <LeadCard key={lead.id} lead={lead} isAdmin={false} onLeadUpdated={fetchLeads} />)}
                      </div>
                    ) : (
                      <div className="text-center py-12 text-muted-foreground">No completed queries</div>
                    )}
                  </TabsContent>
                </Tabs>
              </div>
            )}

            {activeTab === 'messages' && (
              <MessageCenter isEmployeeDashboard={true} employeeId={user?.id} />
            )}

            {activeTab === 'profile' && (
              <Card>
                <CardHeader>
                  <CardTitle>Profile</CardTitle>
                  <CardDescription>Your employee account details</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-col md:flex-row gap-8">
                    <Avatar className="h-24 w-24">
                      <AvatarFallback className="bg-primary text-white text-2xl">
                        {user?.name?.split(' ').map(n => n[0]).join('').toUpperCase() || 'EM'}
                      </AvatarFallback>
                    </Avatar>
                    <div className="space-y-4">
                      {[
                        { label: 'Name', value: user?.name },
                        { label: 'Email', value: user?.email },
                        { label: 'Role', value: 'Employee' },
                      ].map(item => (
                        <div key={item.label} className="space-y-1">
                          <p className="text-sm text-muted-foreground">{item.label}</p>
                          <p className="font-medium">{item.value}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmployeeDashboard;

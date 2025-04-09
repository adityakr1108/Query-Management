import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { SidebarProvider, Sidebar, SidebarContent, SidebarTrigger } from '@/components/ui/sidebar';
import { Link, useNavigate } from 'react-router-dom';
import {
  BarChartBig,
  Users,
  Settings,
  LogOut,
  Bell,
  Filter,
  Search,
  LayoutDashboard,
  MessagesSquare,
  Mail,
  UserCog,
  LifeBuoy,
  ChevronUp,
  ChevronDown,
  Calendar,
  CheckCircle,
  AlertCircle
} from 'lucide-react';
import { Input } from '@/components/ui/input';
import { useToast } from "@/hooks/use-toast";
import AdminProfile from '@/components/AdminProfile';
import LeadStats from '@/components/LeadStats';
import AnalyticsDashboard from '@/components/analytics/AnalyticsDashboard';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { LeadStatus, leadsService } from '@/utils/leadsService';
import { Badge } from '@/components/ui/badge';
import LeadCard from '@/components/LeadCard';
import MessageCenter from '@/components/messages/MessageCenter';
import AIInsights from '@/components/ai/AIInsights';
import TeamManagement from '@/components/team/TeamManagement';
import { Progress } from '@/components/ui/progress';

const statusOptions: { value: LeadStatus | 'all'; label: string }[] = [
  { value: 'all', label: 'All Statuses' },
  { value: 'new', label: 'New' },
  { value: 'contacted', label: 'Contacted' },
  { value: 'qualified', label: 'Qualified' },
  { value: 'converted', label: 'Converted' },
  { value: 'lost', label: 'Lost' },
];

const AdminDashboard = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [activeMenuTab, setActiveMenuTab] = useState<string>('dashboard');
  
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<LeadStatus | 'all'>('all');
  const [guestFilter, setGuestFilter] = useState<boolean | null>(null);
  const [leads, setLeads] = useState<any[]>([]);
  const [filteredLeads, setFilteredLeads] = useState<any[]>([]);
  const [isLoadingLeads, setIsLoadingLeads] = useState(true);
  
  const [notifications, setNotifications] = useState([
    { id: 1, text: "New lead assigned to your team", time: "5 min ago", read: false },
    { id: 2, text: "Team meeting scheduled for tomorrow", time: "2 hours ago", read: false },
    { id: 3, text: "Monthly report is ready for review", time: "Yesterday", read: true },
  ]);
  
  const [unreadNotifications, setUnreadNotifications] = useState(2);
  const [showNotifications, setShowNotifications] = useState(false);
  const [tasksCompleted, setTasksCompleted] = useState(0);
  const [taskProgress, setTaskProgress] = useState(0);
  
  const [showCalendar, setShowCalendar] = useState(false);
  const [events, setEvents] = useState([
    { id: 1, title: "Team Meeting", date: "Today, 2:00 PM", priority: "high" },
    { id: 2, title: "Client Call", date: "Tomorrow, 10:30 AM", priority: "medium" },
    { id: 3, title: "Strategy Review", date: "Sept 16, 9:00 AM", priority: "low" },
  ]);

  const fetchLeads = async () => {
    setIsLoadingLeads(true);
    try {
      const allLeads = await leadsService.getLeads();
      setLeads(allLeads);
      setFilteredLeads(allLeads);
      
      const completed = allLeads.filter(lead => lead.status === 'converted').length;
      setTasksCompleted(completed);
      
      const progress = Math.floor((completed / allLeads.length) * 100) || 0;
      setTaskProgress(progress);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to fetch leads data",
        variant: "destructive",
      });
      console.error("Error fetching leads:", error);
    } finally {
      setIsLoadingLeads(false);
    }
  };

  useEffect(() => {
    fetchLeads();
  }, []);

  useEffect(() => {
    let filtered = [...leads];
    
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(lead => 
        lead.name.toLowerCase().includes(query) ||
        lead.email.toLowerCase().includes(query) ||
        lead.message.toLowerCase().includes(query) ||
        lead.requestType.toLowerCase().includes(query)
      );
    }
    
    if (statusFilter !== 'all') {
      filtered = filtered.filter(lead => lead.status === statusFilter);
    }
    
    if (guestFilter !== null) {
      filtered = filtered.filter(lead => lead.isGuest === guestFilter);
    }
    
    setFilteredLeads(filtered);
  }, [searchQuery, statusFilter, guestFilter, leads]);

  const handleLogout = () => {
    toast({
      title: "Logged out",
      description: "You have been logged out successfully",
    });
    navigate('/login');
  };
  
  const handleLeadUpdated = () => {
    fetchLeads();
  };

  const markNotificationAsRead = (id: number) => {
    const updatedNotifications = notifications.map(notification => 
      notification.id === id ? { ...notification, read: true } : notification
    );
    setNotifications(updatedNotifications);
    setUnreadNotifications(updatedNotifications.filter(n => !n.read).length);
  };

  const markAllNotificationsAsRead = () => {
    const updatedNotifications = notifications.map(notification => ({ ...notification, read: true }));
    setNotifications(updatedNotifications);
    setUnreadNotifications(0);
  };

  return (
    <SidebarProvider>
      <div className="min-h-screen flex flex-col md:flex-row page-transition">
        <Sidebar className="border-r">
          <div className="p-4 border-b">
            <Link to="/" className="flex items-center text-2xl font-semibold gap-2">
              <span className="bg-gradient-to-r from-primary to-blue-600 bg-clip-text text-transparent">
                LeadFlow
              </span>
              <Badge variant="outline" className="text-xs font-normal">Admin</Badge>
            </Link>
          </div>

          <SidebarContent className="px-2 py-4">
            <div className="space-y-1">
              <Button
                variant={activeMenuTab === 'dashboard' ? "default" : "ghost"}
                className="w-full justify-start"
                onClick={() => setActiveMenuTab('dashboard')}
              >
                <LayoutDashboard className="mr-2 h-4 w-4" />
                Dashboard
              </Button>
              
              <Button
                variant={activeMenuTab === 'analytics' ? "default" : "ghost"} 
                className="w-full justify-start" 
                onClick={() => setActiveMenuTab('analytics')}
              >
                <BarChartBig className="mr-2 h-4 w-4" />
                Analytics
              </Button>
              
              <Button
                variant={activeMenuTab === 'leads' ? "default" : "ghost"} 
                className="w-full justify-start" 
                onClick={() => setActiveMenuTab('leads')}
              >
                <Users className="mr-2 h-4 w-4" />
                All Leads
              </Button>
              
              <Button
                variant={activeMenuTab === 'messages' ? "default" : "ghost"} 
                className="w-full justify-start" 
                onClick={() => setActiveMenuTab('messages')}
              >
                <MessagesSquare className="mr-2 h-4 w-4" />
                Messages
              </Button>

              <Button
                variant={activeMenuTab === 'team' ? "default" : "ghost"} 
                className="w-full justify-start" 
                onClick={() => setActiveMenuTab('team')}
              >
                <UserCog className="mr-2 h-4 w-4" />
                Team Management
              </Button>
              
              <Button
                variant={activeMenuTab === 'ai' ? "default" : "ghost"} 
                className="w-full justify-start" 
                onClick={() => setActiveMenuTab('ai')}
              >
                <LifeBuoy className="mr-2 h-4 w-4" />
                AI Insights
              </Button>

              <Button
                variant={activeMenuTab === 'settings' ? "default" : "ghost"} 
                className="w-full justify-start" 
                onClick={() => setActiveMenuTab('settings')}
              >
                <Settings className="mr-2 h-4 w-4" />
                Settings
              </Button>
            </div>

            <div className="absolute bottom-4 left-4 right-4">
              <Button
                variant="ghost" 
                className="w-full justify-start text-red-500 hover:text-red-600 hover:bg-red-50" 
                onClick={handleLogout}
              >
                <LogOut className="mr-2 h-4 w-4" />
                Logout
              </Button>
            </div>
          </SidebarContent>
        </Sidebar>

        <div className="flex-1 flex flex-col max-h-screen overflow-hidden">
          <header className="border-b py-3 px-4 bg-white sticky top-0 z-10">
            <div className="flex justify-between items-center">
              <div className="flex items-center">
                <SidebarTrigger />
                <h1 className="text-xl font-semibold ml-4">{
                  activeMenuTab === 'dashboard' ? 'Admin Dashboard' :
                  activeMenuTab === 'analytics' ? 'Analytics' :
                  activeMenuTab === 'leads' ? 'All Leads' :
                  activeMenuTab === 'messages' ? 'Message Center' :
                  activeMenuTab === 'team' ? 'Team Management' :
                  activeMenuTab === 'ai' ? 'AI Insights' :
                  activeMenuTab === 'settings' ? 'Settings' : 'Admin Dashboard'
                }</h1>
              </div>

              <div className="flex items-center gap-4">
                <div className="relative">
                  <Button 
                    variant="outline" 
                    size="icon" 
                    onClick={() => setShowCalendar(!showCalendar)}
                  >
                    <Calendar className="h-4 w-4" />
                  </Button>
                  
                  {showCalendar && (
                    <Card className="absolute right-0 mt-2 w-80 z-50">
                      <CardHeader className="pb-2">
                        <CardTitle className="text-sm">Upcoming Events</CardTitle>
                      </CardHeader>
                      <CardContent className="p-2">
                        <ul className="space-y-2">
                          {events.map(event => (
                            <li key={event.id} className="p-2 hover:bg-gray-50 rounded-md cursor-pointer">
                              <div className="flex items-start">
                                <div className={`h-3 w-3 rounded-full mt-1.5 mr-2 ${
                                  event.priority === 'high' ? 'bg-red-500' :
                                  event.priority === 'medium' ? 'bg-amber-500' :
                                  'bg-green-500'
                                }`}></div>
                                <div className="flex-1">
                                  <p className="text-sm font-medium">{event.title}</p>
                                  <p className="text-xs text-gray-500">{event.date}</p>
                                </div>
                              </div>
                            </li>
                          ))}
                        </ul>
                      </CardContent>
                      <CardFooter className="py-2 px-2">
                        <Button variant="ghost" size="sm" className="w-full text-xs">
                          View Calendar
                        </Button>
                      </CardFooter>
                    </Card>
                  )}
                </div>
                
                <div className="relative">
                  <Button 
                    variant="outline" 
                    size="icon"
                    onClick={() => setShowNotifications(!showNotifications)}
                  >
                    <Bell className="h-4 w-4" />
                    {unreadNotifications > 0 && (
                      <span className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center text-xs bg-red-500 text-white rounded-full">
                        {unreadNotifications}
                      </span>
                    )}
                  </Button>
                  
                  {showNotifications && (
                    <Card className="absolute right-0 mt-2 w-80 z-50">
                      <CardHeader className="pb-2 flex flex-row items-center justify-between">
                        <CardTitle className="text-sm">Notifications</CardTitle>
                        <Button variant="ghost" size="sm" onClick={markAllNotificationsAsRead}>
                          Mark all read
                        </Button>
                      </CardHeader>
                      <CardContent className="p-2">
                        <ul className="space-y-2">
                          {notifications.map(notification => (
                            <li 
                              key={notification.id} 
                              className={`p-2 ${notification.read ? 'bg-white' : 'bg-blue-50'} hover:bg-gray-50 rounded-md cursor-pointer`}
                              onClick={() => markNotificationAsRead(notification.id)}
                            >
                              <div className="flex items-start">
                                <div className={`h-2 w-2 rounded-full mt-1.5 mr-2 ${notification.read ? 'bg-gray-300' : 'bg-blue-500'}`}></div>
                                <div className="flex-1">
                                  <p className="text-sm">{notification.text}</p>
                                  <p className="text-xs text-gray-500">{notification.time}</p>
                                </div>
                              </div>
                            </li>
                          ))}
                        </ul>
                      </CardContent>
                      <CardFooter className="py-2 px-2">
                        <Button variant="ghost" size="sm" className="w-full text-xs">
                          View All Notifications
                        </Button>
                      </CardFooter>
                    </Card>
                  )}
                </div>
                
                <Avatar className="h-8 w-8">
                  <AvatarImage src="/placeholder.svg" />
                  <AvatarFallback className="bg-primary text-white">AD</AvatarFallback>
                </Avatar>
              </div>
            </div>
          </header>

          <main className="flex-1 overflow-auto p-6">
            {activeMenuTab === 'dashboard' && (
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                  <Card className="bg-gradient-to-br from-blue-500 to-blue-600 text-white">
                    <CardContent className="pt-6">
                      <div className="flex flex-col">
                        <div className="flex justify-between items-center mb-2">
                          <Users className="h-5 w-5 opacity-70" />
                          <ChevronUp className="h-4 w-4" />
                        </div>
                        <div className="text-2xl font-bold">
                          {leads.length}
                        </div>
                        <div className="text-sm opacity-80">
                          Total Requests
                        </div>
                        <div className="text-xs mt-2 flex items-center opacity-80">
                          <ChevronUp className="h-3 w-3 mr-1" />
                          <span>12% from last week</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                  
                  <Card className="bg-gradient-to-br from-green-500 to-emerald-600 text-white">
                    <CardContent className="pt-6">
                      <div className="flex flex-col">
                        <div className="flex justify-between items-center mb-2">
                          <CheckCircle className="h-5 w-5 opacity-70" />
                          <ChevronUp className="h-4 w-4" />
                        </div>
                        <div className="text-2xl font-bold">
                          {leads.filter(lead => lead.status === 'converted').length}
                        </div>
                        <div className="text-sm opacity-80">
                          Completed
                        </div>
                        <div className="text-xs mt-2 flex items-center opacity-80">
                          <ChevronUp className="h-3 w-3 mr-1" />
                          <span>8% from last month</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                  
                  <Card className="bg-gradient-to-br from-amber-500 to-orange-600 text-white">
                    <CardContent className="pt-6">
                      <div className="flex flex-col">
                        <div className="flex justify-between items-center mb-2">
                          <AlertCircle className="h-5 w-5 opacity-70" />
                          <ChevronDown className="h-4 w-4" />
                        </div>
                        <div className="text-2xl font-bold">
                          {leads.filter(lead => lead.status === 'new').length}
                        </div>
                        <div className="text-sm opacity-80">
                          New Requests
                        </div>
                        <div className="text-xs mt-2 flex items-center opacity-80">
                          <ChevronDown className="h-3 w-3 mr-1" />
                          <span>3% from yesterday</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                  
                  <Card>
                    <CardContent className="pt-6">
                      <div className="flex flex-col">
                        <div className="flex justify-between mb-2">
                          <span className="text-sm font-medium">Completion Rate</span>
                          <span className="font-bold text-green-600">{taskProgress}%</span>
                        </div>
                        <Progress value={taskProgress} className="h-2 mb-4" />
                        <div className="grid grid-cols-2 gap-2 text-sm">
                          <div className="flex flex-col">
                            <span className="text-gray-500">Completed</span>
                            <span className="font-bold">{tasksCompleted}</span>
                          </div>
                          <div className="flex flex-col">
                            <span className="text-gray-500">Total</span>
                            <span className="font-bold">{leads.length}</span>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
                
                <LeadStats />
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-lg">Recent Leads</CardTitle>
                    </CardHeader>
                    <CardContent>
                      {isLoadingLeads ? (
                        <div className="space-y-4">
                          {Array(3).fill(0).map((_, i) => (
                            <div key={i} className="flex items-center space-x-4 animate-pulse">
                              <div className="rounded-full bg-gray-200 h-10 w-10"></div>
                              <div className="space-y-2 flex-1">
                                <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                                <div className="h-3 bg-gray-200 rounded w-1/2"></div>
                              </div>
                            </div>
                          ))}
                        </div>
                      ) : (
                        <div className="space-y-4">
                          {leads.slice(0, 3).map(lead => (
                            <div key={lead.id} className="flex items-center space-x-4 p-2 hover:bg-gray-50 rounded-md transition-colors cursor-pointer">
                              <Avatar className="h-10 w-10">
                                <AvatarFallback className={`${
                                  lead.status === 'new' ? 'bg-blue-100 text-blue-600' :
                                  lead.status === 'contacted' ? 'bg-purple-100 text-purple-600' :
                                  lead.status === 'qualified' ? 'bg-amber-100 text-amber-600' :
                                  lead.status === 'converted' ? 'bg-green-100 text-green-600' :
                                  'bg-red-100 text-red-600'
                                }`}>
                                  {lead.name.split(' ').map((n: string) => n[0]).join('').toUpperCase()}
                                </AvatarFallback>
                              </Avatar>
                              <div className="flex-1">
                                <div className="font-medium">{lead.name}</div>
                                <div className="text-sm text-gray-500">{lead.email}</div>
                              </div>
                              <Badge>{lead.status}</Badge>
                            </div>
                          ))}
                          
                          <Button 
                            variant="outline" 
                            className="w-full" 
                            onClick={() => setActiveMenuTab('leads')}
                          >
                            View All Leads
                          </Button>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                  
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-lg">Quick Actions</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <Button className="w-full" onClick={() => setActiveMenuTab('team')}>
                          <UserCog className="mr-2 h-4 w-4" />
                          Manage Team
                        </Button>
                        <Button className="w-full" variant="outline" onClick={() => setActiveMenuTab('messages')}>
                          <Mail className="mr-2 h-4 w-4" />
                          View Messages
                        </Button>
                        <Button className="w-full" variant="outline" onClick={() => setActiveMenuTab('analytics')}>
                          <BarChartBig className="mr-2 h-4 w-4" />
                          View Analytics
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            )}

            {activeMenuTab === 'analytics' && <AnalyticsDashboard />}
            
            {activeMenuTab === 'leads' && (
              <div className="space-y-6">
                <div className="flex flex-col md:flex-row gap-4">
                  <div className="relative flex-1">
                    <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input
                      className="pl-9"
                      placeholder="Search leads..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                    />
                  </div>
                  
                  <div className="flex gap-2">
                    <Tabs value={statusFilter} onValueChange={(value) => setStatusFilter(value as LeadStatus | 'all')}>
                      <TabsList>
                        {statusOptions.map((option) => (
                          <TabsTrigger key={option.value} value={option.value}>
                            {option.label}
                          </TabsTrigger>
                        ))}
                      </TabsList>
                    </Tabs>
                    
                    <Button 
                      variant={guestFilter === true ? "default" : "outline"} 
                      onClick={() => setGuestFilter(guestFilter === true ? null : true)}
                    >
                      Guest
                    </Button>
                    
                    <Button 
                      variant={guestFilter === false ? "default" : "outline"} 
                      onClick={() => setGuestFilter(guestFilter === false ? null : false)}
                    >
                      Registered
                    </Button>
                    
                    <Button 
                      variant="ghost" 
                      size="icon" 
                      onClick={() => {
                        setSearchQuery('');
                        setStatusFilter('all');
                        setGuestFilter(null);
                      }}
                    >
                      <Filter className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
                
                {isLoadingLeads ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {Array(6).fill(0).map((_, i) => (
                      <Card key={i} className="animate-pulse">
                        <CardHeader className="p-4">
                          <div className="flex items-center space-x-4">
                            <div className="rounded-full bg-gray-200 h-10 w-10"></div>
                            <div className="space-y-2">
                              <div className="h-4 bg-gray-200 rounded w-24"></div>
                              <div className="h-3 bg-gray-200 rounded w-32"></div>
                            </div>
                          </div>
                        </CardHeader>
                        <CardContent className="p-4">
                          <div className="space-y-3">
                            <div className="h-3 bg-gray-200 rounded"></div>
                            <div className="h-3 bg-gray-200 rounded"></div>
                            <div className="h-3 bg-gray-200 rounded w-3/4"></div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                ) : filteredLeads.length > 0 ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredLeads.map(lead => (
                      <LeadCard
                        key={lead.id}
                        lead={lead}
                        isAdmin={true}
                        onLeadUpdated={handleLeadUpdated}
                      />
                    ))}
                  </div>
                ) : (
                  <div className="border rounded-md p-8 text-center">
                    <div className="mx-auto h-12 w-12 rounded-full bg-gray-100 flex items-center justify-center mb-4">
                      <Users className="h-6 w-6 text-gray-500" />
                    </div>
                    <h3 className="text-lg font-medium mb-2">No leads found</h3>
                    <p className="text-gray-500 mb-4 max-w-md mx-auto">
                      No leads match your current search and filter criteria. Try adjusting your filters or create new leads.
                    </p>
                    <div className="flex justify-center gap-4">
                      <Button 
                        variant="outline" 
                        onClick={() => {
                          setSearchQuery('');
                          setStatusFilter('all');
                          setGuestFilter(null);
                        }}
                      >
                        Clear Filters
                      </Button>
                    </div>
                  </div>
                )}
              </div>
            )}

            {activeMenuTab === 'messages' && (
              <MessageCenter />
            )}

            {activeMenuTab === 'team' && (
              <TeamManagement />
            )}
            
            {activeMenuTab === 'ai' && (
              <AIInsights />
            )}
            
            {activeMenuTab === 'settings' && (
              <AdminProfile />
            )}
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
};

export default AdminDashboard;

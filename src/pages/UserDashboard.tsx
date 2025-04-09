import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useToast } from "@/hooks/use-toast";
import { useNavigate } from 'react-router-dom';
import {
  LayoutDashboard,
  Users,
  MessagesSquare,
  UserCircle,
  LogOut,
  BarChartBig,
  Mail,
  Settings,
  PlusCircle,
  Calendar,
  Bell,
  ChevronRight,
  TrendingUp,
  CheckCircle2,
  Clock
} from 'lucide-react';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { LeadStatus, leadsService } from '@/utils/leadsService';
import LeadCard from '@/components/LeadCard';
import MessageCenter from '@/components/messages/MessageCenter';
import { useUser } from '@/context/UserContext';
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import NewLeadForm from '@/components/NewLeadForm';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

const UserDashboard = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { user, logout } = useUser();
  const [activeTab, setActiveTab] = useState<string>('dashboard');
  const [leads, setLeads] = useState<any[]>([]);
  const [isLoadingLeads, setIsLoadingLeads] = useState(true);
  const userEmail = user?.email || '';
  const [completedTasks, setCompletedTasks] = useState(0);
  const [progressValue, setProgressValue] = useState(0);
  const [showNewRequestForm, setShowNewRequestForm] = useState(false);
  const [notifications, setNotifications] = useState([
    { id: 1, message: "Your request has been reviewed", time: "1 hour ago", read: false },
    { id: 2, message: "New message from support team", time: "3 hours ago", read: false },
    { id: 3, message: "Request status changed to 'Qualified'", time: "Yesterday", read: true }
  ]);

  useEffect(() => {
    // Simulate progress animation
    const timer = setTimeout(() => setProgressValue(75), 500);
    return () => clearTimeout(timer);
  }, []);

  const fetchLeads = async () => {
    setIsLoadingLeads(true);
    try {
      const userLeads = await leadsService.getUserLeads(userEmail);
      setLeads(userLeads);
      
      // Calculate completed tasks based on converted leads
      const completed = userLeads.filter(lead => lead.status === 'converted').length;
      setCompletedTasks(completed);
      
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to fetch requests data",
        variant: "destructive",
      });
      console.error("Error fetching requests:", error);
    } finally {
      setIsLoadingLeads(false);
    }
  };

  useEffect(() => {
    fetchLeads();
  }, [userEmail]);

  const handleLogout = () => {
    logout();
    toast({
      title: "Logged out",
      description: "You have been logged out successfully",
    });
    navigate('/login');
  };

  const handleLeadUpdated = () => {
    fetchLeads();
  };

  const handleLeadAdded = async (data: any) => {
    try {
      // Create a new lead with the form data and ensure user's name is used
      await leadsService.addLead({
        name: user?.name || 'User',
        email: userEmail,
        requestType: data.requestType,
        message: data.message,
        status: 'new',
        isGuest: false
      }, false); // false means it's a registered user's lead, not a guest
      
      toast({
        title: "Success",
        description: "Your request has been submitted successfully",
      });
      
      // Refresh leads data and close the form
      fetchLeads();
      setShowNewRequestForm(false);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to submit your request",
        variant: "destructive",
      });
      console.error("Error submitting request:", error);
    }
  };

  const markNotificationAsRead = (id: number) => {
    setNotifications(
      notifications.map(notification => 
        notification.id === id ? { ...notification, read: true } : notification
      )
    );
  };

  return (
    <div className="min-h-screen flex flex-col bg-background page-transition">
      <nav className="bg-white border-b sticky top-0 z-10">
        <div className="container mx-auto py-4 px-6 flex items-center justify-between">
          <div className="text-xl font-semibold">
            <span className="bg-gradient-to-r from-primary to-blue-600 bg-clip-text text-transparent">
              LeadFlow
            </span>
          </div>
          <div className="flex items-center gap-4">
            <div className="relative">
              <Button variant="ghost" size="icon" className="relative">
                <Bell className="h-5 w-5" />
                <span className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full"></span>
              </Button>
            </div>
            <Avatar className="h-8 w-8">
              <AvatarImage src="/placeholder.svg" />
              <AvatarFallback className="bg-primary text-white">
                {user?.name?.split(' ').map(n => n[0]).join('').toUpperCase() || 'US'}
              </AvatarFallback>
            </Avatar>
            <span className="text-sm">{user?.name}</span>
          </div>
        </div>
      </nav>
      
      <div className="flex-1">
        <div className="container mx-auto p-6">
          <div className="flex flex-col md:flex-row gap-6">
            <div className="md:w-64">
              <Card>
                <CardContent className="p-0">
                  <nav className="flex flex-col p-2">
                    <Button
                      variant={activeTab === 'dashboard' ? "default" : "ghost"}
                      className="justify-start mb-1"
                      onClick={() => setActiveTab('dashboard')}
                    >
                      <LayoutDashboard className="mr-2 h-4 w-4" />
                      Dashboard
                    </Button>
                    
                    <Button
                      variant={activeTab === 'leads' ? "default" : "ghost"}
                      className="justify-start mb-1"
                      onClick={() => setActiveTab('leads')}
                    >
                      <Users className="mr-2 h-4 w-4" />
                      My Requests
                    </Button>
                    
                    <Button
                      variant={activeTab === 'messages' ? "default" : "ghost"}
                      className="justify-start mb-1"
                      onClick={() => setActiveTab('messages')}
                    >
                      <MessagesSquare className="mr-2 h-4 w-4" />
                      Messages
                    </Button>
                    
                    <Button
                      variant={activeTab === 'profile' ? "default" : "ghost"}
                      className="justify-start mb-1"
                      onClick={() => setActiveTab('profile')}
                    >
                      <UserCircle className="mr-2 h-4 w-4" />
                      Profile
                    </Button>
                    
                    <Button 
                      variant="ghost" 
                      className="justify-start text-red-500 hover:text-red-600 hover:bg-red-50 mt-4"
                      onClick={handleLogout}
                    >
                      <LogOut className="mr-2 h-4 w-4" />
                      Logout
                    </Button>
                  </nav>
                </CardContent>
              </Card>
              
              <Card className="mt-6">
                <CardHeader>
                  <CardTitle>Quick Actions</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  <Button 
                    variant="default" 
                    className="w-full justify-start bg-blue-500 hover:bg-blue-600"
                    onClick={() => {
                      setActiveTab('dashboard');
                      setShowNewRequestForm(true);
                    }}
                  >
                    <PlusCircle className="mr-2 h-4 w-4" />
                    New Request
                  </Button>
                  <Button variant="outline" className="w-full justify-start">
                    <Calendar className="mr-2 h-4 w-4" />
                    Schedule Meeting
                  </Button>
                  <Button variant="outline" className="w-full justify-start">
                    <Mail className="mr-2 h-4 w-4" />
                    Contact Support
                  </Button>
                  <Button variant="outline" className="w-full justify-start">
                    <Settings className="mr-2 h-4 w-4" />
                    Account Settings
                  </Button>
                </CardContent>
              </Card>

              {/* Activity Card */}
              <Card className="mt-6 overflow-hidden">
                <CardHeader className="bg-gradient-to-r from-indigo-500 to-purple-600 text-white">
                  <CardTitle className="text-white text-lg">Activity Summary</CardTitle>
                </CardHeader>
                <CardContent className="pt-6">
                  <div className="mb-4">
                    <div className="flex justify-between mb-1">
                      <span className="text-sm text-gray-500">Request Progress</span>
                      <span className="text-sm font-medium">{progressValue}%</span>
                    </div>
                    <Progress value={progressValue} className="h-2" />
                  </div>
                  
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <div className="flex items-center">
                        <CheckCircle2 className="h-4 w-4 mr-2 text-green-500" />
                        <span className="text-sm">Completed</span>
                      </div>
                      <span className="font-medium">{completedTasks}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <div className="flex items-center">
                        <Clock className="h-4 w-4 mr-2 text-amber-500" />
                        <span className="text-sm">In Progress</span>
                      </div>
                      <span className="font-medium">{leads.length - completedTasks}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <div className="flex items-center">
                        <TrendingUp className="h-4 w-4 mr-2 text-blue-500" />
                        <span className="text-sm">Total Requests</span>
                      </div>
                      <span className="font-medium">{leads.length}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
            
            <div className="flex-1">
              {activeTab === 'dashboard' && (
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <h1 className="text-2xl font-bold">Welcome, {user?.name || 'User'}</h1>
                    <Button 
                      variant="default"
                      onClick={() => setShowNewRequestForm(true)}
                      className="bg-blue-500 hover:bg-blue-600"
                    >
                      <PlusCircle className="mr-2 h-4 w-4" />
                      New Request
                    </Button>
                  </div>

                  {showNewRequestForm ? (
                    <Card>
                      <CardHeader>
                        <CardTitle>Create New Request</CardTitle>
                        <CardDescription>Fill in the details for your new request</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <NewLeadForm onLeadAdded={handleLeadAdded} />
                      </CardContent>
                    </Card>
                  ) : (
                    <>
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                        <Card className="bg-blue-50 hover:shadow-md transition-all duration-200 cursor-pointer" onClick={() => setActiveTab('leads')}>
                          <CardContent className="pt-6">
                            <div className="flex items-center justify-between">
                              <div>
                                <h3 className="text-lg font-medium">{leads.length}</h3>
                                <p className="text-sm text-muted-foreground">Active Requests</p>
                              </div>
                              <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center">
                                <Users className="h-5 w-5 text-blue-500" />
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                        
                        <Card className="bg-green-50 hover:shadow-md transition-all duration-200 cursor-pointer">
                          <CardContent className="pt-6">
                            <div className="flex items-center justify-between">
                              <div>
                                <h3 className="text-lg font-medium">
                                  {leads.filter(lead => lead.status === 'converted').length}
                                </h3>
                                <p className="text-sm text-muted-foreground">Completed Requests</p>
                              </div>
                              <div className="h-10 w-10 rounded-full bg-green-100 flex items-center justify-center">
                                <CheckCircle2 className="h-5 w-5 text-green-500" />
                              </div>
                            </div>
                          </CardContent>
                        </Card>

                        <Card className="bg-amber-50 hover:shadow-md transition-all duration-200 cursor-pointer" onClick={() => setActiveTab('messages')}>
                          <CardContent className="pt-6">
                            <div className="flex items-center justify-between">
                              <div>
                                <h3 className="text-lg font-medium">{notifications.filter(n => !n.read).length}</h3>
                                <p className="text-sm text-muted-foreground">New Notifications</p>
                              </div>
                              <div className="h-10 w-10 rounded-full bg-amber-100 flex items-center justify-center">
                                <Bell className="h-5 w-5 text-amber-500" />
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
                        <Card>
                          <CardHeader className="pb-2">
                            <CardTitle className="text-lg flex items-center justify-between">
                              Recent Requests
                              <Button
                                variant="ghost"
                                size="sm"
                                className="text-xs"
                                onClick={() => setActiveTab('leads')}
                              >
                                View All <ChevronRight className="h-3 w-3 ml-1" />
                              </Button>
                            </CardTitle>
                          </CardHeader>
                          <CardContent>
                            {isLoadingLeads ? (
                              <div className="space-y-3">
                                {Array(3).fill(0).map((_, i) => (
                                  <div key={i} className="flex items-center space-x-4 animate-pulse">
                                    <div className="h-10 w-10 rounded-full bg-gray-200"></div>
                                    <div className="space-y-2 flex-1">
                                      <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                                      <div className="h-3 bg-gray-200 rounded w-1/2"></div>
                                    </div>
                                  </div>
                                ))}
                              </div>
                            ) : leads.length > 0 ? (
                              <div className="space-y-3">
                                {leads.slice(0, 3).map(lead => (
                                  <div key={lead.id} className="flex items-center space-x-4 p-2 hover:bg-gray-50 rounded-md transition-all duration-200 cursor-pointer">
                                    <Avatar className="h-10 w-10">
                                      <AvatarFallback className={`${
                                        lead.status === 'new' ? 'bg-blue-100 text-blue-600' :
                                        lead.status === 'contacted' ? 'bg-purple-100 text-purple-600' :
                                        lead.status === 'qualified' ? 'bg-amber-100 text-amber-600' :
                                        lead.status === 'converted' ? 'bg-green-100 text-green-600' :
                                        'bg-red-100 text-red-600'
                                      }`}>
                                        {lead.requestType.slice(0, 2).toUpperCase()}
                                      </AvatarFallback>
                                    </Avatar>
                                    <div className="flex-1">
                                      <div className="font-medium">{lead.requestType}</div>
                                      <div className="text-sm text-gray-500">Status: {lead.status}</div>
                                    </div>
                                    <div className="text-xs text-gray-400">{lead.lastActivity}</div>
                                  </div>
                                ))}
                              </div>
                            ) : (
                              <div className="text-center py-6">
                                <p className="text-muted-foreground">No requests found.</p>
                                <Button 
                                  onClick={() => setShowNewRequestForm(true)} 
                                  variant="outline" 
                                  size="sm" 
                                  className="mt-2"
                                >
                                  Create your first request
                                </Button>
                              </div>
                            )}
                          </CardContent>
                        </Card>
                        
                        <Card>
                          <CardHeader className="pb-2">
                            <CardTitle className="text-lg">Notifications</CardTitle>
                          </CardHeader>
                          <CardContent>
                            <div className="space-y-3">
                              {notifications.length > 0 ? (
                                notifications.map(notification => (
                                  <div 
                                    key={notification.id}
                                    className={`p-3 rounded-md flex items-start space-x-3 cursor-pointer transition-colors ${notification.read ? 'bg-white' : 'bg-blue-50'}`}
                                    onClick={() => markNotificationAsRead(notification.id)}
                                  >
                                    <div className={`h-2 w-2 mt-2 rounded-full ${notification.read ? 'bg-gray-200' : 'bg-blue-500'}`}></div>
                                    <div className="flex-1">
                                      <p className="text-sm">{notification.message}</p>
                                      <p className="text-xs text-gray-500 mt-1">{notification.time}</p>
                                    </div>
                                  </div>
                                ))
                              ) : (
                                <p className="text-center text-sm text-gray-500 py-4">No new notifications</p>
                              )}
                            </div>
                          </CardContent>
                        </Card>
                      </div>
                    </>
                  )}
                </div>
              )}
              
              {activeTab === 'leads' && (
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <h2 className="text-2xl font-bold">My Requests</h2>
                    <Button 
                      onClick={() => {
                        setActiveTab('dashboard');
                        setShowNewRequestForm(true);
                      }}
                    >
                      <PlusCircle className="mr-2 h-4 w-4" />
                      New Request
                    </Button>
                  </div>
                  
                  <Tabs defaultValue="all" className="w-full">
                    <TabsList className="w-full md:w-auto">
                      <TabsTrigger value="all">All Requests</TabsTrigger>
                      <TabsTrigger value="new">New</TabsTrigger>
                      <TabsTrigger value="inprogress">In Progress</TabsTrigger>
                      <TabsTrigger value="completed">Completed</TabsTrigger>
                    </TabsList>
                    
                    <TabsContent value="all" className="mt-4">
                      <Card>
                        <CardContent className="pt-6">
                          {isLoadingLeads ? (
                            <div className="flex justify-center py-8">
                              <div className="animate-spin w-6 h-6 border-2 border-primary border-t-transparent rounded-full" />
                            </div>
                          ) : leads.length > 0 ? (
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                              {leads.map(lead => (
                                <LeadCard
                                  key={lead.id}
                                  lead={lead}
                                  isAdmin={false}
                                  onLeadUpdated={handleLeadUpdated}
                                />
                              ))}
                            </div>
                          ) : (
                            <div className="text-center py-8">
                              <p className="text-muted-foreground">No requests found. Create your first request!</p>
                              <Button 
                                className="mt-4" 
                                onClick={() => {
                                  setActiveTab('dashboard');
                                  setShowNewRequestForm(true);
                                }}
                              >
                                <PlusCircle className="mr-2 h-4 w-4" />
                                New Request
                              </Button>
                            </div>
                          )}
                        </CardContent>
                      </Card>
                    </TabsContent>
                    
                    <TabsContent value="new" className="mt-4">
                      <Card>
                        <CardContent className="pt-6">
                          {isLoadingLeads ? (
                            <div className="flex justify-center py-8">
                              <div className="animate-spin w-6 h-6 border-2 border-primary border-t-transparent rounded-full" />
                            </div>
                          ) : leads.filter(lead => lead.status === 'new').length > 0 ? (
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                              {leads
                                .filter(lead => lead.status === 'new')
                                .map(lead => (
                                  <LeadCard
                                    key={lead.id}
                                    lead={lead}
                                    isAdmin={false}
                                    onLeadUpdated={handleLeadUpdated}
                                  />
                                ))}
                            </div>
                          ) : (
                            <div className="text-center py-8">
                              <p className="text-muted-foreground">No new requests found.</p>
                            </div>
                          )}
                        </CardContent>
                      </Card>
                    </TabsContent>
                    
                    <TabsContent value="inprogress" className="mt-4">
                      <Card>
                        <CardContent className="pt-6">
                          {isLoadingLeads ? (
                            <div className="flex justify-center py-8">
                              <div className="animate-spin w-6 h-6 border-2 border-primary border-t-transparent rounded-full" />
                            </div>
                          ) : leads.filter(lead => lead.status === 'contacted' || lead.status === 'qualified').length > 0 ? (
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                              {leads
                                .filter(lead => lead.status === 'contacted' || lead.status === 'qualified')
                                .map(lead => (
                                  <LeadCard
                                    key={lead.id}
                                    lead={lead}
                                    isAdmin={false}
                                    onLeadUpdated={handleLeadUpdated}
                                  />
                                ))}
                            </div>
                          ) : (
                            <div className="text-center py-8">
                              <p className="text-muted-foreground">No in-progress requests found.</p>
                            </div>
                          )}
                        </CardContent>
                      </Card>
                    </TabsContent>
                    
                    <TabsContent value="completed" className="mt-4">
                      <Card>
                        <CardContent className="pt-6">
                          {isLoadingLeads ? (
                            <div className="flex justify-center py-8">
                              <div className="animate-spin w-6 h-6 border-2 border-primary border-t-transparent rounded-full" />
                            </div>
                          ) : leads.filter(lead => lead.status === 'converted').length > 0 ? (
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                              {leads
                                .filter(lead => lead.status === 'converted')
                                .map(lead => (
                                  <LeadCard
                                    key={lead.id}
                                    lead={lead}
                                    isAdmin={false}
                                    onLeadUpdated={handleLeadUpdated}
                                  />
                                ))}
                            </div>
                          ) : (
                            <div className="text-center py-8">
                              <p className="text-muted-foreground">No completed requests found.</p>
                            </div>
                          )}
                        </CardContent>
                      </Card>
                    </TabsContent>
                  </Tabs>
                </div>
              )}
              
              {activeTab === 'messages' && (
                <MessageCenter isUserDashboard={true} userEmail={userEmail} />
              )}
              
              {activeTab === 'profile' && (
                <Card>
                  <CardHeader>
                    <CardTitle>Profile</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex flex-col md:flex-row gap-8">
                      <div className="flex flex-col items-center justify-center">
                        <Avatar className="h-24 w-24">
                          <AvatarFallback className="bg-primary text-white text-2xl">
                            {user?.name?.split(' ').map(n => n[0]).join('').toUpperCase() || 'US'}
                          </AvatarFallback>
                        </Avatar>
                        <Button variant="outline" size="sm" className="mt-4">
                          Change Photo
                        </Button>
                      </div>
                      
                      <div className="flex-1 space-y-4">
                        <div className="space-y-1.5">
                          <h3 className="text-sm font-medium text-muted-foreground">Name</h3>
                          <p className="font-medium">{user?.name || 'Not provided'}</p>
                        </div>
                        <div className="space-y-1.5">
                          <h3 className="text-sm font-medium text-muted-foreground">Email</h3>
                          <p className="font-medium">{user?.email || 'Not provided'}</p>
                        </div>
                        <div className="space-y-1.5">
                          <h3 className="text-sm font-medium text-muted-foreground">Role</h3>
                          <p className="font-medium">{user?.role || 'User'}</p>
                        </div>
                        <div className="space-y-1.5">
                          <h3 className="text-sm font-medium text-muted-foreground">Account Status</h3>
                          <div className="flex items-center">
                            <div className="h-2.5 w-2.5 rounded-full bg-green-500 mr-2"></div>
                            <p className="font-medium">Active</p>
                          </div>
                        </div>
                        
                        <div className="pt-4 flex gap-4">
                          <Button>Update Profile</Button>
                          <Button variant="outline">Change Password</Button>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )}
            </div>
          </div>
        </div>
      </div>
      
      <Toaster />
      <Sonner />
    </div>
  );
};

export default UserDashboard;

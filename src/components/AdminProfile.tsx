
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  User, Shield, Bell, Calendar, Mail, 
  Settings, HelpCircle
} from 'lucide-react';
import { toast } from 'sonner';

const AdminProfile = () => {
  const [notifications, setNotifications] = useState(true);
  
  const toggleNotifications = () => {
    setNotifications(!notifications);
    toast.success(`Notifications ${notifications ? 'disabled' : 'enabled'}`);
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Admin Profile</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col md:flex-row gap-6">
            <div className="flex flex-col items-center space-y-4">
              <Avatar className="h-24 w-24">
                <AvatarImage src="/placeholder.svg" alt="Admin" />
                <AvatarFallback className="bg-primary text-white text-xl">AD</AvatarFallback>
              </Avatar>
              <div className="text-center">
                <h3 className="text-lg font-semibold">Admin User</h3>
                <p className="text-sm text-gray-500">admin@leadflow.com</p>
                <Badge className="mt-2">Administrator</Badge>
              </div>
              <Button variant="outline" size="sm" className="w-full">
                <User size={14} className="mr-2" />
                Edit Profile
              </Button>
            </div>
            
            <div className="flex-1 space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 border rounded-lg">
                  <div className="flex items-center space-x-2 mb-2">
                    <Shield size={18} className="text-primary" />
                    <h4 className="font-medium">Role</h4>
                  </div>
                  <p className="text-sm">System Administrator</p>
                </div>
                
                <div className="p-4 border rounded-lg">
                  <div className="flex items-center space-x-2 mb-2">
                    <Calendar size={18} className="text-primary" />
                    <h4 className="font-medium">Joined</h4>
                  </div>
                  <p className="text-sm">March 15, 2024</p>
                </div>
                
                <div className="p-4 border rounded-lg">
                  <div className="flex items-center space-x-2 mb-2">
                    <Mail size={18} className="text-primary" />
                    <h4 className="font-medium">Email Notifications</h4>
                  </div>
                  <div className="flex items-center justify-between">
                    <p className="text-sm">{notifications ? 'Enabled' : 'Disabled'}</p>
                    <Button variant="ghost" size="sm" onClick={toggleNotifications}>
                      <Bell size={14} className={notifications ? 'text-green-500' : 'text-gray-400'} />
                    </Button>
                  </div>
                </div>
                
                <div className="p-4 border rounded-lg">
                  <div className="flex items-center space-x-2 mb-2">
                    <Settings size={18} className="text-primary" />
                    <h4 className="font-medium">Account Settings</h4>
                  </div>
                  <div className="flex space-x-2">
                    <Button variant="outline" size="sm">
                      Security
                    </Button>
                    <Button variant="outline" size="sm">
                      Preferences
                    </Button>
                  </div>
                </div>
              </div>
              
              <div className="p-4 border rounded-lg">
                <div className="flex items-center space-x-2 mb-2">
                  <HelpCircle size={18} className="text-primary" />
                  <h4 className="font-medium">Support</h4>
                </div>
                <p className="text-sm mb-2">
                  Need help with your admin dashboard? Contact our support team.
                </p>
                <Button variant="outline" size="sm">
                  Contact Support
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminProfile;

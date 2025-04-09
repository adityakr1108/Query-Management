
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowRight, Mail, Lock, User } from 'lucide-react';
import { useUser } from '@/context/UserContext';

// Define admin credentials
const ADMIN_EMAIL = "admin@leadflow.com";
const ADMIN_PASSWORD = "admin123";

interface AuthFormProps {
  type: 'login' | 'signup';
}

const AuthForm = ({ type }: AuthFormProps) => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { login } = useUser();
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validation
    if (type === 'signup') {
      if (formData.password !== formData.confirmPassword) {
        toast({
          title: "Passwords don't match",
          description: "Please make sure your passwords match",
          variant: "destructive",
        });
        return;
      }
      
      if (formData.password.length < 8) {
        toast({
          title: "Password too short",
          description: "Password must be at least 8 characters long",
          variant: "destructive",
        });
        return;
      }
    }
    
    setIsLoading(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      if (type === 'signup') {
        // Save user data to localStorage on signup
        localStorage.setItem('userName', formData.name);
        localStorage.setItem('userEmail', formData.email);
        localStorage.setItem('userPassword', formData.password);
        
        // Success handling
        toast({
          title: "Account created",
          description: "Your account has been created successfully",
        });
        
        // Redirect to login page after signup
        navigate('/login');
      } else {
        // Check if admin credentials
        if (formData.email === ADMIN_EMAIL && formData.password === ADMIN_PASSWORD) {
          // Store user data in UserContext
          login({
            id: 'admin',
            name: 'Admin',
            email: formData.email,
            role: 'admin'
          });
          
          // Admin login successful
          toast({
            title: "Admin logged in successfully",
            description: "Welcome to the admin dashboard",
          });
          
          // Navigate to admin dashboard
          navigate('/admin-dashboard');
        }
        // Regular user login process
        else {
          const storedEmail = localStorage.getItem('userEmail');
          const storedPassword = localStorage.getItem('userPassword');
          const userName = localStorage.getItem('userName');
          
          if (storedEmail === formData.email && storedPassword === formData.password) {
            // Store user data in UserContext
            login({
              id: formData.email,
              name: userName || 'User',
              email: formData.email,
              role: 'user'
            });
            
            // Success handling
            toast({
              title: "Logged in successfully",
              description: "Welcome back to LeadFlow",
            });
            
            // Navigate to user dashboard
            navigate('/user-dashboard');
          } else {
            throw new Error('Invalid credentials');
          }
        }
      }
    } catch (error) {
      toast({
        title: "Authentication failed",
        description: "Please check your credentials and try again",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full max-w-md px-6 sm:px-8 py-8 sm:py-10 bg-white rounded-xl shadow-soft border border-gray-100">
      <h2 className="text-2xl sm:text-3xl font-bold text-center mb-6">
        {type === 'login' ? 'Welcome Back' : 'Create Your Account'}
      </h2>
      
      <p className="text-gray-600 text-center mb-8">
        {type === 'login' 
          ? 'Sign in to access your LeadFlow dashboard' 
          : 'Join LeadFlow to manage your leads effectively'}
      </p>
      
      <form onSubmit={handleSubmit} className="space-y-6">
        {type === 'signup' && (
          <div className="space-y-2">
            <Label htmlFor="name" className="text-sm font-medium">
              Full Name
            </Label>
            <div className="relative">
              <User className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
              <Input
                id="name"
                name="name"
                placeholder="John Doe"
                value={formData.name}
                onChange={handleChange}
                required
                className="pl-10"
              />
            </div>
          </div>
        )}
        
        <div className="space-y-2">
          <Label htmlFor="email" className="text-sm font-medium">
            Email Address
          </Label>
          <div className="relative">
            <Mail className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
            <Input
              id="email"
              name="email"
              type="email"
              placeholder="john@example.com"
              value={formData.email}
              onChange={handleChange}
              required
              className="pl-10"
            />
          </div>
        </div>
        
        <div className="space-y-2">
          <div className="flex justify-between">
            <Label htmlFor="password" className="text-sm font-medium">
              Password
            </Label>
            {type === 'login' && (
              <Link to="/forgot-password" className="text-xs text-primary hover:underline">
                Forgot password?
              </Link>
            )}
          </div>
          <div className="relative">
            <Lock className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
            <Input
              id="password"
              name="password"
              type="password"
              placeholder="••••••••"
              value={formData.password}
              onChange={handleChange}
              required
              className="pl-10"
            />
          </div>
        </div>
        
        {type === 'signup' && (
          <div className="space-y-2">
            <Label htmlFor="confirmPassword" className="text-sm font-medium">
              Confirm Password
            </Label>
            <div className="relative">
              <Lock className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
              <Input
                id="confirmPassword"
                name="confirmPassword"
                type="password"
                placeholder="••••••••"
                value={formData.confirmPassword}
                onChange={handleChange}
                required
                className="pl-10"
              />
            </div>
          </div>
        )}
        
        <Button type="submit" className="w-full" disabled={isLoading}>
          {isLoading ? (
            <span className="flex items-center">
              <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              {type === 'login' ? 'Signing in...' : 'Creating account...'}
            </span>
          ) : (
            <span className="flex items-center">
              {type === 'login' ? 'Sign in' : 'Create account'} <ArrowRight size={16} className="ml-2" />
            </span>
          )}
        </Button>
      </form>
      
      <div className="mt-8 text-center">
        <p className="text-sm text-gray-600">
          {type === 'login' ? "Don't have an account? " : "Already have an account? "}
          <Link 
            to={type === 'login' ? '/signup' : '/login'} 
            className="text-primary font-medium hover:underline"
          >
            {type === 'login' ? 'Sign up' : 'Sign in'}
          </Link>
        </p>
      </div>
    </div>
  );
};

export default AuthForm;

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowRight, Mail, Lock, User, Building2 } from 'lucide-react';
import { supabase } from '@/lib/supabase';
import { useUser } from '@/context/UserContext';

interface AuthFormProps {
  type: 'login' | 'signup';
}

const AuthForm = ({ type }: AuthFormProps) => {
  const { user } = useUser();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    companyName: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  // Automatically redirect if user is already logged in 
  // (Crucial for OAuth redirects back to /login)
  useEffect(() => {
    if (user) {
      if (user.role === 'admin') navigate('/admin-dashboard');
      else if (user.role === 'employee') navigate('/employee-dashboard');
      else navigate('/user-dashboard');
    }
  }, [user, navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (type === 'signup') {
      if (formData.password !== formData.confirmPassword) {
        toast({ title: "Passwords don't match", variant: 'destructive' });
        return;
      }
      if (formData.password.length < 8) {
        toast({ title: 'Password too short', description: 'Minimum 8 characters', variant: 'destructive' });
        return;
      }
    }

    setIsLoading(true);
    try {
      if (type === 'signup') {
        const { error } = await supabase.auth.signUp({
          email: formData.email,
          password: formData.password,
          options: {
            data: {
              name: formData.name,
              role: 'business_user',
              company_name: formData.companyName || null,
            },
          },
        });

        if (error) throw error;

        toast({
          title: 'Account created!',
          description: 'Please check your email to confirm your account, then log in.',
        });
        navigate('/login');
      } else {
        // Login
        const { data, error } = await supabase.auth.signInWithPassword({
          email: formData.email,
          password: formData.password,
        });

        if (error) throw error;

        // Fetch profile to get role
        const { data: profile, error: profileError } = await supabase
          .from('profiles')
          .select('role')
          .eq('id', data.user.id)
          .single();

        if (profileError || !profile) throw new Error('Profile not found');

        toast({ title: 'Welcome back!', description: 'Logged in successfully.' });

        // Route by role
        if (profile.role === 'admin') {
          navigate('/admin-dashboard');
        } else if (profile.role === 'employee') {
          navigate('/employee-dashboard');
        } else {
          navigate('/user-dashboard');
        }
      }
    } catch (error: any) {
      toast({
        title: type === 'signup' ? 'Sign up failed' : 'Login failed',
        description: error?.message || 'Please check your details and try again.',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    setIsLoading(true);
    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: `${window.location.origin}/login`, // will redirect here after
        }
      });
      if (error) throw error;
      // Note: Page redirects, so this toast might not show long
    } catch (error: any) {
      toast({
        title: 'Google log in failed',
        description: error?.message || 'Please try again.',
        variant: 'destructive',
      });
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full max-w-md px-6 sm:px-8 py-8 sm:py-10 bg-white rounded-xl shadow-soft border border-gray-100">
      <h2 className="text-2xl sm:text-3xl font-bold text-center mb-2">
        {type === 'login' ? 'Welcome Back' : 'Create Your Account'}
      </h2>
      <p className="text-gray-500 text-center text-sm mb-8">
        {type === 'login'
          ? 'Sign in to access your dashboard'
          : 'Register as a business user to manage your queries'}
      </p>

      <form onSubmit={handleSubmit} className="space-y-5">
        {type === 'signup' && (
          <div className="space-y-2">
            <Label htmlFor="name">Full Name</Label>
            <div className="relative">
              <User className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
              <Input id="name" name="name" placeholder="John Doe" value={formData.name} onChange={handleChange} required className="pl-10" />
            </div>
          </div>
        )}

        <div className="space-y-2">
          <Label htmlFor="email">Email Address</Label>
          <div className="relative">
            <Mail className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
            <Input id="email" name="email" type="email" placeholder="john@company.com" value={formData.email} onChange={handleChange} required className="pl-10" />
          </div>
        </div>

        {type === 'signup' && (
          <div className="space-y-2">
            <Label htmlFor="companyName">Company Name <span className="text-gray-400 text-xs">(optional)</span></Label>
            <div className="relative">
              <Building2 className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
              <Input id="companyName" name="companyName" placeholder="Acme Corp" value={formData.companyName} onChange={handleChange} className="pl-10" />
            </div>
          </div>
        )}

        <div className="space-y-2">
          <div className="flex justify-between">
            <Label htmlFor="password">Password</Label>
            {type === 'login' && (
              <span className="text-xs text-primary cursor-pointer hover:underline">Forgot password?</span>
            )}
          </div>
          <div className="relative">
            <Lock className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
            <Input id="password" name="password" type="password" placeholder="••••••••" value={formData.password} onChange={handleChange} required className="pl-10" />
          </div>
        </div>

        {type === 'signup' && (
          <div className="space-y-2">
            <Label htmlFor="confirmPassword">Confirm Password</Label>
            <div className="relative">
              <Lock className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
              <Input id="confirmPassword" name="confirmPassword" type="password" placeholder="••••••••" value={formData.confirmPassword} onChange={handleChange} required className="pl-10" />
            </div>
          </div>
        )}

        <Button type="submit" className="w-full" disabled={isLoading}>
          {isLoading ? (
            <span className="flex items-center">
              <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
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

      <div className="mt-4">
        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <span className="w-full border-t" />
          </div>
          <div className="relative flex justify-center text-xs uppercase">
            <span className="bg-white px-2 text-gray-500">Or continue with</span>
          </div>
        </div>
        
        <Button 
          type="button" 
          variant="outline" 
          className="w-full mt-4 bg-white hover:bg-gray-50 flex items-center justify-center gap-2"
          onClick={handleGoogleLogin}
          disabled={isLoading}
        >
          <svg viewBox="0 0 24 24" width="24" height="24" xmlns="http://www.w3.org/2000/svg">
            <g transform="matrix(1, 0, 0, 1, 27.009001, -39.238998)">
              <path fill="#4285F4" d="M -3.264 51.509 C -3.264 50.719 -3.334 49.969 -3.454 49.239 L -14.754 49.239 L -14.754 53.749 L -8.284 53.749 C -8.574 55.229 -9.424 56.479 -10.684 57.329 L -10.684 60.329 L -6.824 60.329 C -4.564 58.239 -3.264 55.159 -3.264 51.509 Z"/>
              <path fill="#34A853" d="M -14.754 63.239 C -11.514 63.239 -8.804 62.159 -6.824 60.329 L -10.684 57.329 C -11.764 58.049 -13.134 58.489 -14.754 58.489 C -17.884 58.489 -20.534 56.379 -21.484 53.529 L -25.464 53.529 L -25.464 56.619 C -23.494 60.539 -19.444 63.239 -14.754 63.239 Z"/>
              <path fill="#FBBC05" d="M -21.484 53.529 C -21.734 52.809 -21.864 52.039 -21.864 51.239 C -21.864 50.439 -21.724 49.669 -21.484 48.949 L -21.484 45.859 L -25.464 45.859 C -26.284 47.479 -26.754 49.299 -26.754 51.239 C -26.754 53.179 -26.284 54.999 -25.464 56.619 L -21.484 53.529 Z"/>
              <path fill="#EA4335" d="M -14.754 43.989 C -12.984 43.989 -11.404 44.599 -10.154 45.789 L -6.734 42.369 C -8.804 40.429 -11.514 39.239 -14.754 39.239 C -19.444 39.239 -23.494 41.939 -25.464 45.859 L -21.484 48.949 C -20.534 46.099 -17.884 43.989 -14.754 43.989 Z"/>
            </g>
          </svg>
          Google
        </Button>
      </div>

      <div className="mt-6 text-center">
        <p className="text-sm text-gray-600">
          {type === 'login' ? "Don't have an account? " : 'Already have an account? '}
          <Link to={type === 'login' ? '/signup' : '/login'} className="text-primary font-medium hover:underline">
            {type === 'login' ? 'Sign up' : 'Sign in'}
          </Link>
        </p>
        {type === 'login' && (
          <p className="text-xs text-gray-400 mt-3">
            Submitting a general query?{' '}
            <Link to="/#contact" className="text-primary hover:underline">Use the home page form</Link>
          </p>
        )}
      </div>
    </div>
  );
};

export default AuthForm;

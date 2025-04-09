
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowRight, BarChart, Zap, MessagesSquare } from 'lucide-react';

const HeroSection = () => {
  return (
    <div className="relative overflow-hidden bg-white pt-16 pb-12 sm:pb-16 lg:pb-20">
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-b from-blue-50 to-white"></div>
        <div className="absolute top-0 right-0 w-1/2 h-1/2 bg-primary/5 blur-3xl rounded-full transform translate-x-1/3 -translate-y-1/4"></div>
        <div className="absolute bottom-0 left-0 w-1/2 h-1/2 bg-blue-100/40 blur-3xl rounded-full transform -translate-x-1/4 translate-y-1/4"></div>
      </div>
      
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 sm:pt-20 lg:pt-24">
        <div className="lg:grid lg:grid-cols-12 lg:gap-12 items-center">
          <div className="lg:col-span-6 animate-fade-up">
            <div className="text-center lg:text-left">
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight mb-8">
                <span className="animated-gradient-text">AI-Powered</span> Lead Management System
              </h1>
              <p className="text-lg text-gray-600 mb-10 max-w-2xl mx-auto lg:mx-0">
                Capture, analyze, and convert leads with cutting-edge AI technology. Track user behavior, score leads intelligently, and send personalized communications.
              </p>
              
              <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start space-y-4 sm:space-y-0 sm:space-x-4">
                <Button size="lg" asChild className="rounded-full px-8 py-6">
                  <Link to="/signup">
                    Get Started <ArrowRight size={18} className="ml-2" />
                  </Link>
                </Button>
                <Button variant="outline" size="lg" asChild className="rounded-full px-8 py-6">
                  <Link to="#features">See Features</Link>
                </Button>
              </div>
            </div>
            
            <div className="mt-12 grid grid-cols-3 gap-6">
              {[
                { icon: <BarChart size={24} className="text-blue-500" />, label: 'Smart Analytics' },
                { icon: <Zap size={24} className="text-blue-500" />, label: 'AI Scoring' },
                { icon: <MessagesSquare size={24} className="text-blue-500" />, label: 'WhatsApp Integration' }
              ].map((item, index) => (
                <div key={index} className="flex flex-col items-center text-center p-4 rounded-lg bg-white/80 shadow-soft border border-gray-100 transition-all duration-300 hover:shadow-md">
                  <div className="mb-3">{item.icon}</div>
                  <span className="text-sm font-medium text-gray-800">{item.label}</span>
                </div>
              ))}
            </div>
          </div>
          
          <div className="lg:col-span-6 mt-12 lg:mt-0 animate-fade-up" style={{ animationDelay: '0.2s' }}>
            <div className="relative">
              <div className="w-full h-full absolute -top-2 -right-2 bg-primary/10 rounded-xl"></div>
              <div className="w-full h-full absolute -bottom-2 -left-2 bg-blue-100 rounded-xl"></div>
              <div className="relative p-6 bg-white rounded-xl shadow-soft border border-gray-100 glass-card">
                <div className="aspect-w-16 aspect-h-9 mb-6 rounded-lg overflow-hidden bg-gray-100">
                  <div className="flex items-center justify-center h-full">
                    <div className="w-full h-64 bg-gradient-to-br from-blue-50 to-white rounded-lg flex items-center justify-center">
                      <img src="https://placehold.co/600x400/EEF2FF/3B82F6?text=Dashboard+Preview&font=source-sans-pro" 
                           alt="Dashboard Preview" 
                           className="w-full h-full object-cover rounded-lg"
                           loading="lazy" />
                    </div>
                  </div>
                </div>
                <div className="space-y-4">
                  <div className="h-8 bg-gray-100 rounded-md w-3/4"></div>
                  <div className="h-24 bg-gray-50 rounded-md"></div>
                  <div className="grid grid-cols-2 gap-2">
                    <div className="h-10 bg-primary/10 rounded-md"></div>
                    <div className="h-10 bg-blue-50 rounded-md"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;

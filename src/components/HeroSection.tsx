
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowRight, BarChart, Zap, MessagesSquare, TrendingUp, Users, CheckCircle } from 'lucide-react';
import { useEffect, useState } from 'react';

// Animated counter hook
const useCounter = (end: number, duration: number = 2000) => {
  const [count, setCount] = useState(0);
  useEffect(() => {
    let start = 0;
    const step = end / (duration / 16);
    const timer = setInterval(() => {
      start += step;
      if (start >= end) { setCount(end); clearInterval(timer); }
      else setCount(Math.floor(start));
    }, 16);
    return () => clearInterval(timer);
  }, [end, duration]);
  return count;
};

const HeroSection = () => {
  const leadsCount = useCounter(12847, 2500);
  const conversionRate = useCounter(94, 2000);
  const responseTime = useCounter(30, 1800);

  return (
    <div className="relative overflow-hidden bg-white pt-16 pb-12 sm:pb-16 lg:pb-20">
      {/* Animated background */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-white to-indigo-50"></div>
        <div className="absolute top-20 right-20 w-72 h-72 bg-blue-400/10 rounded-full blur-3xl float-slow"></div>
        <div className="absolute bottom-20 left-10 w-96 h-96 bg-indigo-300/10 rounded-full blur-3xl float-medium"></div>
        <div className="absolute top-1/2 left-1/2 w-64 h-64 bg-primary/5 rounded-full blur-2xl pulse-glow"></div>
      </div>
      
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 sm:pt-20 lg:pt-24">
        <div className="lg:grid lg:grid-cols-12 lg:gap-12 items-center">
          <div className="lg:col-span-6 animate-fade-up">
            <div className="text-center lg:text-left">
              <div className="inline-flex items-center gap-2 py-1.5 px-4 rounded-full bg-blue-100/80 text-primary text-sm font-medium mb-6">
                <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
                Now with Real-Time Messaging
              </div>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight mb-8 leading-tight">
                <span className="animated-gradient-text">AI-Powered</span> Lead<br />Management System
              </h1>
              <p className="text-lg text-gray-600 mb-10 max-w-2xl mx-auto lg:mx-0">
                Capture, analyze, and convert leads with cutting-edge AI technology. Track user behavior, score leads intelligently, and communicate in real-time.
              </p>
              
              <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start space-y-4 sm:space-y-0 sm:space-x-4">
                <Button size="lg" asChild className="rounded-full px-8 py-6 shadow-lg shadow-primary/25 hover:shadow-xl hover:shadow-primary/30 transition-all duration-300">
                  <Link to="/signup">
                    Get Started Free <ArrowRight size={18} className="ml-2" />
                  </Link>
                </Button>
                <Button variant="outline" size="lg" asChild className="rounded-full px-8 py-6 hover:bg-gray-50 transition-all duration-300">
                  <Link to="#features">See Features</Link>
                </Button>
              </div>
            </div>
            
            {/* Animated Stats */}
            <div className="mt-14 grid grid-cols-3 gap-4">
              {[
                { value: `${leadsCount.toLocaleString()}+`, label: 'Leads Managed', icon: <TrendingUp size={18} className="text-blue-500" /> },
                { value: `${conversionRate}%`, label: 'Satisfaction', icon: <CheckCircle size={18} className="text-emerald-500" /> },
                { value: `<${responseTime}s`, label: 'Response Time', icon: <Zap size={18} className="text-amber-500" /> }
              ].map((stat, index) => (
                <div key={index} className="relative group count-reveal" style={{ animationDelay: `${index * 0.15}s` }}>
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-blue-500/5 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <div className="relative flex flex-col items-center text-center p-4 rounded-xl bg-white/80 shadow-soft border border-gray-100/80 backdrop-blur-sm transition-all duration-300 hover:shadow-md hover:-translate-y-0.5">
                    <div className="mb-2 p-2 rounded-lg bg-gray-50">{stat.icon}</div>
                    <span className="text-xl font-bold text-gray-900">{stat.value}</span>
                    <span className="text-xs font-medium text-gray-500 mt-0.5">{stat.label}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          {/* Animated Dashboard Mockup */}
          <div className="lg:col-span-6 mt-12 lg:mt-0 animate-fade-up" style={{ animationDelay: '0.2s' }}>
            <div className="relative">
              {/* Decorative elements */}
              <div className="absolute -top-4 -right-4 w-full h-full bg-gradient-to-br from-primary/10 to-indigo-500/10 rounded-2xl transform rotate-2"></div>
              <div className="absolute -bottom-4 -left-4 w-full h-full bg-gradient-to-tr from-blue-100 to-indigo-50 rounded-2xl transform -rotate-1"></div>
              
              {/* Main dashboard card */}
              <div className="relative bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
                {/* Title bar */}
                <div className="flex items-center gap-2 px-4 py-3 bg-gray-50 border-b">
                  <div className="flex gap-1.5">
                    <div className="w-3 h-3 rounded-full bg-red-400"></div>
                    <div className="w-3 h-3 rounded-full bg-yellow-400"></div>
                    <div className="w-3 h-3 rounded-full bg-green-400"></div>
                  </div>
                  <div className="flex-1 text-center">
                    <div className="inline-block bg-white rounded-md px-4 py-1 text-xs text-gray-400 border">
                      query-management.vercel.app/admin-dashboard
                    </div>
                  </div>
                </div>
                
                {/* Dashboard content */}
                <div className="p-5">
                  {/* Mini stat cards */}
                  <div className="grid grid-cols-3 gap-3 mb-5">
                    <div className="p-3 rounded-xl bg-gradient-to-br from-blue-500 to-blue-600 text-white">
                      <div className="text-xs opacity-80">Total Leads</div>
                      <div className="text-xl font-bold mt-1">248</div>
                      <div className="text-xs opacity-70 mt-1 flex items-center gap-1">
                        <TrendingUp size={10} /> +12%
                      </div>
                    </div>
                    <div className="p-3 rounded-xl bg-gradient-to-br from-emerald-500 to-emerald-600 text-white">
                      <div className="text-xs opacity-80">Converted</div>
                      <div className="text-xl font-bold mt-1">64</div>
                      <div className="text-xs opacity-70 mt-1 flex items-center gap-1">
                        <TrendingUp size={10} /> +8%
                      </div>
                    </div>
                    <div className="p-3 rounded-xl bg-gradient-to-br from-violet-500 to-violet-600 text-white">
                      <div className="text-xs opacity-80">Active</div>
                      <div className="text-xl font-bold mt-1">137</div>
                      <div className="text-xs opacity-70 mt-1 flex items-center gap-1">
                        <TrendingUp size={10} /> +5%
                      </div>
                    </div>
                  </div>
                  
                  {/* Chart area */}
                  <div className="rounded-xl bg-gray-50 p-4 mb-4">
                    <div className="flex justify-between items-center mb-3">
                      <span className="text-xs font-medium text-gray-600">Lead Activity</span>
                      <span className="text-xs text-gray-400">Last 7 days</span>
                    </div>
                    <div className="flex items-end gap-1.5 h-20">
                      {[35, 50, 45, 70, 55, 80, 65].map((h, i) => (
                        <div key={i} className="flex-1 rounded-t-md bg-gradient-to-t from-primary/80 to-primary/40 transition-all duration-500 hover:from-primary hover:to-primary/60"
                             style={{ height: `${h}%`, animationDelay: `${i * 0.1}s` }}></div>
                      ))}
                    </div>
                  </div>
                  
                  {/* Recent leads */}
                  <div className="space-y-2">
                    <div className="text-xs font-medium text-gray-600 mb-2">Recent Leads</div>
                    {[
                      { name: 'Sarah Johnson', type: 'Demo Request', score: 87, status: 'Qualified' },
                      { name: 'Mike Chen', type: 'Product Inquiry', score: 72, status: 'New' },
                      { name: 'Emma Wilson', type: 'Pricing', score: 95, status: 'Converted' },
                    ].map((lead, i) => (
                      <div key={i} className="flex items-center justify-between p-2.5 rounded-lg hover:bg-gray-50 transition-colors duration-200 border border-transparent hover:border-gray-100">
                        <div className="flex items-center gap-2.5">
                          <div className="w-7 h-7 rounded-full bg-primary/10 flex items-center justify-center text-xs font-medium text-primary">
                            {lead.name.charAt(0)}
                          </div>
                          <div>
                            <div className="text-xs font-medium text-gray-800">{lead.name}</div>
                            <div className="text-[10px] text-gray-400">{lead.type}</div>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="text-[10px] font-medium text-primary">Score: {lead.score}</span>
                          <span className={`text-[10px] px-1.5 py-0.5 rounded-full font-medium ${
                            lead.status === 'Converted' ? 'bg-emerald-100 text-emerald-700' :
                            lead.status === 'Qualified' ? 'bg-blue-100 text-blue-700' :
                            'bg-gray-100 text-gray-600'
                          }`}>{lead.status}</span>
                        </div>
                      </div>
                    ))}
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

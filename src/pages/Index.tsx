
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import HeroSection from '@/components/HeroSection';
import FeatureSection from '@/components/FeatureSection';
import LeadForm from '@/components/LeadForm';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { ArrowRight, MessageSquare, ArrowUpRight, Zap, BarChart2, Users, CheckCircle, Star, ArrowDown } from 'lucide-react';

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col page-transition">
      <Navbar />
      
      <main className="flex-1">
        <HeroSection />
        
        {/* Trusted By Section */}
        <section className="py-12 bg-white border-y border-gray-100">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <p className="text-center text-sm font-medium text-gray-400 uppercase tracking-wider mb-8">
              Trusted by teams worldwide
            </p>
            <div className="flex flex-wrap justify-center items-center gap-x-12 gap-y-6">
              {['Acme Corp', 'TechVentures', 'DataSync', 'CloudBase', 'NextGen AI'].map((name, i) => (
                <span key={i} className="text-lg font-semibold text-gray-300 hover:text-gray-500 transition-colors duration-300 cursor-default">
                  {name}
                </span>
              ))}
            </div>
          </div>
        </section>

        <FeatureSection />

        {/* How It Works Section */}
        <section className="py-24 bg-gradient-to-b from-gray-50 to-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <span className="inline-block py-1.5 px-4 rounded-full text-xs font-medium bg-indigo-100 text-indigo-700 mb-4">
                How It Works
              </span>
              <h2 className="text-3xl sm:text-4xl font-bold mb-6">Get started in three simple steps</h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                From signup to your first converted lead — it only takes minutes.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
              {/* Connecting line (hidden on mobile) */}
              <div className="hidden md:block absolute top-16 left-[20%] right-[20%] h-0.5 bg-gradient-to-r from-primary/20 via-primary/40 to-primary/20"></div>
              
              {[
                {
                  step: '01',
                  title: 'Create Your Account',
                  description: 'Sign up with Google or email in seconds. Set up your team and roles.',
                  color: 'from-blue-500 to-blue-600',
                  bg: 'bg-blue-50',
                },
                {
                  step: '02',
                  title: 'Capture & Score Leads',
                  description: 'Users submit queries through your form. Our AI instantly scores and categorizes them.',
                  color: 'from-indigo-500 to-indigo-600',
                  bg: 'bg-indigo-50',
                },
                {
                  step: '03',
                  title: 'Engage & Convert',
                  description: 'Chat in real-time, assign leads to your team, and track everything from your dashboard.',
                  color: 'from-violet-500 to-violet-600',
                  bg: 'bg-violet-50',
                },
              ].map((item, i) => (
                <div key={i} className="relative group">
                  <div className="text-center">
                    <div className={`w-14 h-14 mx-auto rounded-2xl bg-gradient-to-br ${item.color} text-white flex items-center justify-center text-lg font-bold shadow-lg mb-6 group-hover:scale-110 transition-transform duration-300`}>
                      {item.step}
                    </div>
                    <h3 className="text-xl font-semibold mb-3">{item.title}</h3>
                    <p className="text-gray-600 max-w-xs mx-auto">{item.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
        
        {/* WhatsApp Integration Section */}
        <section className="py-24 bg-blue-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="lg:grid lg:grid-cols-2 lg:gap-16 items-center">
              <div className="animate-fade-up lg:pr-8">
                <span className="inline-block py-1 px-3 rounded-full text-xs font-medium bg-blue-100 text-primary mb-4">
                  WhatsApp Integration
                </span>
                <h2 className="text-3xl sm:text-4xl font-bold mb-6">Connect with your leads instantly via WhatsApp</h2>
                <p className="text-lg text-gray-600 mb-8">
                  Engage directly with your customers through our seamless WhatsApp integration. Capture chat interactions and let our AI analyze them for lead scoring and personalized follow-ups.
                </p>
                
                <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4 mb-10">
                  <Button asChild className="rounded-full px-6">
                    <Link to="/signup">
                      Start Chatting <MessageSquare size={16} className="ml-2" />
                    </Link>
                  </Button>
                  <Button variant="outline" asChild className="rounded-full px-6">
                    <Link to="/whatsapp-integration">
                      Learn More <ArrowUpRight size={16} className="ml-2" />
                    </Link>
                  </Button>
                </div>
                
                <div className="grid grid-cols-2 gap-6">
                  <div className="p-4 bg-white shadow-soft rounded-lg">
                    <h3 className="text-lg font-semibold mb-2">24/7 Availability</h3>
                    <p className="text-gray-600 text-sm">Engage with leads anytime, anywhere through automated responses.</p>
                  </div>
                  <div className="p-4 bg-white shadow-soft rounded-lg">
                    <h3 className="text-lg font-semibold mb-2">Personalized Chats</h3>
                    <p className="text-gray-600 text-sm">AI-powered conversations tailored to each lead's interests.</p>
                  </div>
                </div>
              </div>
              
              <div className="mt-12 lg:mt-0 flex justify-center">
                <div className="relative animate-fade-up" style={{ animationDelay: '0.3s' }}>
                  <div className="absolute inset-0 bg-primary/10 rounded-xl transform rotate-6"></div>
                  <div className="relative bg-white p-6 rounded-xl shadow-soft border border-gray-100 max-w-sm">
                    <div className="flex items-center border-b pb-4 mb-4">
                      <div className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center mr-3">
                        <MessageSquare size={20} className="text-white" />
                      </div>
                      <div>
                        <h3 className="font-medium">LeadFlow Bot</h3>
                        <p className="text-xs text-gray-500">Online</p>
                      </div>
                    </div>
                    
                    <div className="space-y-3 min-h-[280px]">
                      <div className="bg-gray-100 rounded-lg p-3 max-w-[80%]">
                        <p className="text-sm">Hello! How can I help you with our AI lead management system today?</p>
                        <span className="text-xs text-gray-500 mt-1 block">10:32 AM</span>
                      </div>
                      
                      <div className="bg-primary/10 rounded-lg p-3 max-w-[80%] ml-auto">
                        <p className="text-sm">I'd like to know more about the lead scoring feature.</p>
                        <span className="text-xs text-gray-500 mt-1 block">10:33 AM</span>
                      </div>
                      
                      <div className="bg-gray-100 rounded-lg p-3 max-w-[80%]">
                        <p className="text-sm">Our AI-powered lead scoring analyzes user behavior, interactions, and interests to assign a 1-100 score. Higher scores indicate more qualified leads.</p>
                        <span className="text-xs text-gray-500 mt-1 block">10:34 AM</span>
                      </div>
                      
                      <div className="bg-gray-100 rounded-lg p-3 max-w-[80%]">
                        <p className="text-sm">Would you like me to arrange a demo for you?</p>
                        <span className="text-xs text-gray-500 mt-1 block">10:34 AM</span>
                      </div>
                    </div>
                    
                    <div className="border-t mt-4 pt-4 flex items-center">
                      <input
                        type="text"
                        placeholder="Type a message..."
                        className="flex-1 bg-gray-100 rounded-full py-2 px-4 focus:outline-none text-sm"
                      />
                      <Button size="icon" className="ml-2 rounded-full h-8 w-8">
                        <ArrowRight size={16} />
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Testimonials Section */}
        <section className="py-24 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <span className="inline-block py-1.5 px-4 rounded-full text-xs font-medium bg-amber-100 text-amber-700 mb-4">
                Testimonials
              </span>
              <h2 className="text-3xl sm:text-4xl font-bold mb-6">What our users say</h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Teams across the globe trust LeadFlow to manage and convert their leads.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                {
                  name: 'Priya Sharma',
                  role: 'Sales Manager, TechVentures',
                  review: 'LeadFlow completely changed our sales pipeline. The real-time messaging makes follow-ups instant and the AI scoring saves us hours of manual work.',
                  rating: 5,
                },
                {
                  name: 'Rahul Mehta',
                  role: 'CEO, DataSync Solutions',
                  review: 'The team management features let me assign leads to employees and track everything from one dashboard. Conversion rates went up 40% in the first month.',
                  rating: 5,
                },
                {
                  name: 'Ananya Gupta',
                  role: 'Marketing Lead, CloudBase',
                  review: 'Beautiful, intuitive interface with zero learning curve. Our entire team was onboarded in under 10 minutes. The WhatsApp integration is a game-changer.',
                  rating: 5,
                },
              ].map((testimonial, i) => (
                <div key={i} className="group relative">
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-indigo-500/5 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 -m-1"></div>
                  <div className="relative p-6 bg-white rounded-2xl border border-gray-100 shadow-soft hover:shadow-md transition-all duration-300">
                    <div className="flex gap-1 mb-4">
                      {Array.from({ length: testimonial.rating }).map((_, j) => (
                        <Star key={j} size={16} className="text-amber-400 fill-amber-400" />
                      ))}
                    </div>
                    <p className="text-gray-600 mb-6 leading-relaxed">"{testimonial.review}"</p>
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-indigo-500 flex items-center justify-center text-white font-medium text-sm">
                        {testimonial.name.charAt(0)}
                      </div>
                      <div>
                        <div className="font-medium text-sm text-gray-800">{testimonial.name}</div>
                        <div className="text-xs text-gray-500">{testimonial.role}</div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
        
        {/* Lead Capture Section */}
        <section id="contact" className="py-24 bg-gradient-to-b from-gray-50 to-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <span className="inline-block py-1.5 px-4 rounded-full text-xs font-medium bg-blue-100 text-primary mb-4">
                Get Started
              </span>
              <h2 className="text-3xl sm:text-4xl font-bold mb-6">Ready to transform your lead management?</h2>
              <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                Send us a request and our team will help you get started right away.
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div className="space-y-8">
                <div className="flex space-x-4 group">
                  <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-blue-100 flex items-center justify-center group-hover:bg-primary group-hover:text-white transition-all duration-300">
                    <Zap size={24} className="text-primary group-hover:text-white transition-colors duration-300" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-3">Fast Implementation</h3>
                    <p className="text-gray-600">Get up and running in minutes with our simple setup process.</p>
                  </div>
                </div>
                
                <div className="flex space-x-4 group">
                  <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-blue-100 flex items-center justify-center group-hover:bg-primary group-hover:text-white transition-all duration-300">
                    <BarChart2 size={24} className="text-primary group-hover:text-white transition-colors duration-300" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-3">Actionable Insights</h3>
                    <p className="text-gray-600">Make data-driven decisions with our comprehensive analytics.</p>
                  </div>
                </div>
                
                <div className="flex space-x-4 group">
                  <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-blue-100 flex items-center justify-center group-hover:bg-primary group-hover:text-white transition-all duration-300">
                    <Users size={24} className="text-primary group-hover:text-white transition-colors duration-300" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-3">Team Collaboration</h3>
                    <p className="text-gray-600">Work together with your team to nurture and convert leads.</p>
                  </div>
                </div>
              </div>
              
              <div>
                <LeadForm />
              </div>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default Index;

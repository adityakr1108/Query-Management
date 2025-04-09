
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import HeroSection from '@/components/HeroSection';
import FeatureSection from '@/components/FeatureSection';
import LeadForm from '@/components/LeadForm';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { ArrowRight, MessageSquare, ArrowUpRight, Zap, BarChart2, Users } from 'lucide-react';

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col page-transition">
      <Navbar />
      
      <main className="flex-1">
        <HeroSection />
        
        <FeatureSection />
        
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
        
        {/* Lead Capture Section */}
        <section id="contact" className="py-24 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <span className="inline-block py-1 px-3 rounded-full text-xs font-medium bg-blue-100 text-primary mb-4">
                Contact Us
              </span>
              <h2 className="text-3xl sm:text-4xl font-bold mb-6">Get started with LeadFlow today</h2>
              <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                Ready to transform your lead management process? Send us a request and our team will help you get started right away.
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div className="space-y-8">
                <div className="flex space-x-4">
                  <div className="flex-shrink-0 w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center">
                    <Zap size={24} className="text-primary" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-3">Fast Implementation</h3>
                    <p className="text-gray-600">Get up and running in minutes with our simple setup process.</p>
                  </div>
                </div>
                
                <div className="flex space-x-4">
                  <div className="flex-shrink-0 w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center">
                    <BarChart2 size={24} className="text-primary" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-3">Actionable Insights</h3>
                    <p className="text-gray-600">Make data-driven decisions with our comprehensive analytics.</p>
                  </div>
                </div>
                
                <div className="flex space-x-4">
                  <div className="flex-shrink-0 w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center">
                    <Users size={24} className="text-primary" />
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

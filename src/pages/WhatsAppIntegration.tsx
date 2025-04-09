
import { Link } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { MessageSquare, ArrowRight, Check, MessageCircle, BarChart2, Brain } from 'lucide-react';

const WhatsAppIntegration = () => {
  return (
    <div className="min-h-screen flex flex-col page-transition">
      <Navbar />
      
      <main className="flex-1 pt-24">
        <section className="py-16 md:py-24">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="md:grid md:grid-cols-2 md:gap-12 items-center mb-20">
              <div>
                <span className="inline-block py-1 px-3 rounded-full text-xs font-medium bg-blue-100 text-primary mb-4">
                  WhatsApp Integration
                </span>
                <h1 className="text-3xl sm:text-4xl font-bold mb-6">Connect with your leads where they already are</h1>
                <p className="text-lg text-gray-600 mb-8">
                  LeadFlow's WhatsApp integration lets you engage with potential customers on their preferred messaging platform while our AI analyzes conversations to provide valuable insights.
                </p>
                <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
                  <Button asChild>
                    <Link to="/signup">Get Started <ArrowRight size={16} className="ml-2" /></Link>
                  </Button>
                  <Button variant="outline" asChild>
                    <a href="#how-it-works">Learn More</a>
                  </Button>
                </div>
              </div>
              <div className="mt-12 md:mt-0 relative">
                <div className="absolute inset-0 bg-primary/10 rounded-xl transform rotate-3"></div>
                <div className="relative bg-white p-6 rounded-xl shadow-soft border border-gray-100">
                  <div className="flex items-center border-b pb-4 mb-4">
                    <div className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center mr-3">
                      <MessageSquare size={20} className="text-white" />
                    </div>
                    <div>
                      <h3 className="font-medium">LeadFlow Assistant</h3>
                      <p className="text-xs text-gray-500">Online</p>
                    </div>
                  </div>
                  
                  <div className="space-y-3 min-h-[300px]">
                    <div className="bg-gray-100 rounded-lg p-3 max-w-[80%]">
                      <p className="text-sm">Hello! I'd like to learn more about your AI lead management system.</p>
                      <span className="text-xs text-gray-500 mt-1 block">10:32 AM</span>
                    </div>
                    
                    <div className="bg-primary/10 rounded-lg p-3 max-w-[80%] ml-auto">
                      <p className="text-sm">Hi there! I'd be happy to tell you about our AI lead management. What specific aspects are you interested in?</p>
                      <span className="text-xs text-gray-500 mt-1 block">10:33 AM</span>
                    </div>
                    
                    <div className="bg-gray-100 rounded-lg p-3 max-w-[80%]">
                      <p className="text-sm">I run a small business and want to improve our conversion rates. How does the lead scoring work?</p>
                      <span className="text-xs text-gray-500 mt-1 block">10:34 AM</span>
                    </div>
                    
                    <div className="bg-primary/10 rounded-lg p-3 max-w-[80%] ml-auto">
                      <p className="text-sm">Our AI analyzes customer interactions, engagement levels, and message content to assign a score from 1-100. Higher scores indicate qualified leads ready for follow-up. Would you like to see a demo?</p>
                      <span className="text-xs text-gray-500 mt-1 block">10:35 AM</span>
                    </div>
                  </div>
                  
                  <div className="mt-4 pt-4 border-t flex">
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
            
            <div id="how-it-works" className="mb-20">
              <div className="text-center mb-12">
                <h2 className="text-2xl font-bold mb-4">How It Works</h2>
                <p className="text-gray-600 max-w-3xl mx-auto">
                  Our WhatsApp integration connects seamlessly with your existing workflow to capture, analyze, and convert leads.
                </p>
              </div>
              
              <div className="grid md:grid-cols-3 gap-8">
                <div className="bg-white p-6 rounded-xl shadow-soft border border-gray-100">
                  <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center mb-4">
                    <MessageCircle size={24} className="text-primary" />
                  </div>
                  <h3 className="text-lg font-semibold mb-2">Connect & Engage</h3>
                  <p className="text-gray-600">
                    Connect your WhatsApp Business account to LeadFlow and start engaging with customers through automated or manual conversations.
                  </p>
                </div>
                <div className="bg-white p-6 rounded-xl shadow-soft border border-gray-100">
                  <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center mb-4">
                    <Brain size={24} className="text-primary" />
                  </div>
                  <h3 className="text-lg font-semibold mb-2">AI Analysis</h3>
                  <p className="text-gray-600">
                    Our AI analyzes conversation content, sentiment, and engagement patterns to score leads and identify sales opportunities.
                  </p>
                </div>
                <div className="bg-white p-6 rounded-xl shadow-soft border border-gray-100">
                  <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center mb-4">
                    <BarChart2 size={24} className="text-primary" />
                  </div>
                  <h3 className="text-lg font-semibold mb-2">Insights & Action</h3>
                  <p className="text-gray-600">
                    Review detailed analytics and take action based on lead scores, with automated workflows for follow-ups and conversions.
                  </p>
                </div>
              </div>
            </div>
            
            <div className="mb-20">
              <div className="text-center mb-12">
                <h2 className="text-2xl font-bold mb-4">Key Benefits</h2>
              </div>
              
              <div className="grid md:grid-cols-2 gap-8">
                <div className="bg-white p-6 rounded-xl shadow-soft border border-gray-100">
                  <h3 className="text-lg font-semibold mb-4">For Businesses</h3>
                  <ul className="space-y-3">
                    <li className="flex">
                      <div className="flex-shrink-0 w-5 h-5 rounded-full bg-green-100 flex items-center justify-center mr-3 mt-0.5">
                        <Check size={12} className="text-green-600" />
                      </div>
                      <span className="text-gray-700">Meet customers on their preferred platform</span>
                    </li>
                    <li className="flex">
                      <div className="flex-shrink-0 w-5 h-5 rounded-full bg-green-100 flex items-center justify-center mr-3 mt-0.5">
                        <Check size={12} className="text-green-600" />
                      </div>
                      <span className="text-gray-700">Automated responses for 24/7 availability</span>
                    </li>
                    <li className="flex">
                      <div className="flex-shrink-0 w-5 h-5 rounded-full bg-green-100 flex items-center justify-center mr-3 mt-0.5">
                        <Check size={12} className="text-green-600" />
                      </div>
                      <span className="text-gray-700">Higher conversion rates with personalized engagement</span>
                    </li>
                    <li className="flex">
                      <div className="flex-shrink-0 w-5 h-5 rounded-full bg-green-100 flex items-center justify-center mr-3 mt-0.5">
                        <Check size={12} className="text-green-600" />
                      </div>
                      <span className="text-gray-700">Detailed analytics on conversation performance</span>
                    </li>
                  </ul>
                </div>
                <div className="bg-white p-6 rounded-xl shadow-soft border border-gray-100">
                  <h3 className="text-lg font-semibold mb-4">For Customers</h3>
                  <ul className="space-y-3">
                    <li className="flex">
                      <div className="flex-shrink-0 w-5 h-5 rounded-full bg-green-100 flex items-center justify-center mr-3 mt-0.5">
                        <Check size={12} className="text-green-600" />
                      </div>
                      <span className="text-gray-700">Quick responses to inquiries</span>
                    </li>
                    <li className="flex">
                      <div className="flex-shrink-0 w-5 h-5 rounded-full bg-green-100 flex items-center justify-center mr-3 mt-0.5">
                        <Check size={12} className="text-green-600" />
                      </div>
                      <span className="text-gray-700">Personalized product recommendations</span>
                    </li>
                    <li className="flex">
                      <div className="flex-shrink-0 w-5 h-5 rounded-full bg-green-100 flex items-center justify-center mr-3 mt-0.5">
                        <Check size={12} className="text-green-600" />
                      </div>
                      <span className="text-gray-700">Convenience of using familiar messaging platform</span>
                    </li>
                    <li className="flex">
                      <div className="flex-shrink-0 w-5 h-5 rounded-full bg-green-100 flex items-center justify-center mr-3 mt-0.5">
                        <Check size={12} className="text-green-600" />
                      </div>
                      <span className="text-gray-700">Seamless transition between automated and human support</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            
            <div className="bg-blue-50 rounded-xl p-8 text-center">
              <h2 className="text-xl font-bold mb-4">Ready to integrate WhatsApp with your lead management?</h2>
              <p className="text-gray-600 mb-6">
                Start converting more leads today with our powerful WhatsApp integration.
              </p>
              <Button asChild>
                <Link to="/signup">Get Started Now</Link>
              </Button>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default WhatsAppIntegration;

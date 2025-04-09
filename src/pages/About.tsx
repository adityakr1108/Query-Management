
import { Link } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Users, Brain, Shield, Zap } from 'lucide-react';

const About = () => {
  return (
    <div className="min-h-screen flex flex-col page-transition">
      <Navbar />
      
      <main className="flex-1 pt-24">
        <section className="py-16 md:py-24">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <span className="inline-block py-1 px-3 rounded-full text-xs font-medium bg-blue-100 text-primary mb-4">
                About Us
              </span>
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-6">Transforming Lead Management with AI</h1>
              <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                LeadFlow combines cutting-edge artificial intelligence with intuitive design to help businesses convert more leads.
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 gap-12 items-center mb-20">
              <div>
                <h2 className="text-2xl font-bold mb-4">Our Mission</h2>
                <p className="text-gray-600 mb-6">
                  At LeadFlow, we believe that every interaction with a potential customer matters. Our mission is to empower businesses with the tools they need to understand, engage, and convert their leads more effectively.
                </p>
                <p className="text-gray-600">
                  Founded in 2023, we've already helped hundreds of businesses increase their conversion rates by an average of 37% through our AI-powered lead management platform.
                </p>
              </div>
              <div className="rounded-xl overflow-hidden shadow-soft">
                <img 
                  src="https://images.unsplash.com/photo-1461749280684-dccba630e2f6" 
                  alt="Team collaborating" 
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
            
            <div className="mb-20">
              <h2 className="text-2xl font-bold mb-8 text-center">Why Choose LeadFlow</h2>
              <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-8">
                <div className="bg-white p-6 rounded-xl shadow-soft border border-gray-100">
                  <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center mb-4">
                    <Brain size={24} className="text-primary" />
                  </div>
                  <h3 className="text-lg font-semibold mb-2">AI-Powered Insights</h3>
                  <p className="text-gray-600 text-sm">
                    Our advanced AI analyzes lead behavior to provide actionable insights and accurate scoring.
                  </p>
                </div>
                <div className="bg-white p-6 rounded-xl shadow-soft border border-gray-100">
                  <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center mb-4">
                    <Zap size={24} className="text-primary" />
                  </div>
                  <h3 className="text-lg font-semibold mb-2">Fast Implementation</h3>
                  <p className="text-gray-600 text-sm">
                    Get up and running in minutes with our simple setup process and intuitive interface.
                  </p>
                </div>
                <div className="bg-white p-6 rounded-xl shadow-soft border border-gray-100">
                  <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center mb-4">
                    <Users size={24} className="text-primary" />
                  </div>
                  <h3 className="text-lg font-semibold mb-2">Team Collaboration</h3>
                  <p className="text-gray-600 text-sm">
                    Work together seamlessly with your team to nurture and convert leads efficiently.
                  </p>
                </div>
                <div className="bg-white p-6 rounded-xl shadow-soft border border-gray-100">
                  <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center mb-4">
                    <Shield size={24} className="text-primary" />
                  </div>
                  <h3 className="text-lg font-semibold mb-2">Data Security</h3>
                  <p className="text-gray-600 text-sm">
                    Enterprise-grade security ensures your lead data remains private and protected.
                  </p>
                </div>
              </div>
            </div>
            
            <div className="text-center mb-12">
              <h2 className="text-2xl font-bold mb-6">Our Leadership Team</h2>
              <p className="text-gray-600 max-w-3xl mx-auto mb-10">
                LeadFlow was founded by industry experts with decades of experience in AI, sales, and customer relationship management.
              </p>
              
              <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-8">
                <div>
                  <div className="w-32 h-32 rounded-full overflow-hidden mx-auto mb-4">
                    <img 
                      src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=300&h=300&q=80" 
                      alt="CEO" 
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <h3 className="font-semibold">Alex Chen</h3>
                  <p className="text-gray-600 text-sm">CEO & Co-Founder</p>
                </div>
                <div>
                  <div className="w-32 h-32 rounded-full overflow-hidden mx-auto mb-4">
                    <img 
                      src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=300&h=300&q=80" 
                      alt="CTO" 
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <h3 className="font-semibold">Sophia Rodriguez</h3>
                  <p className="text-gray-600 text-sm">CTO & Co-Founder</p>
                </div>
                <div>
                  <div className="w-32 h-32 rounded-full overflow-hidden mx-auto mb-4">
                    <img 
                      src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=300&h=300&q=80" 
                      alt="Head of AI" 
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <h3 className="font-semibold">Marcus Johnson</h3>
                  <p className="text-gray-600 text-sm">Head of AI Research</p>
                </div>
              </div>
            </div>
            
            <div className="bg-blue-50 rounded-xl p-8 text-center">
              <h2 className="text-xl font-bold mb-4">Ready to transform your lead management?</h2>
              <p className="text-gray-600 mb-6">
                Join thousands of businesses already using LeadFlow to increase their conversion rates.
              </p>
              <Button asChild>
                <Link to="/signup">Get Started Today</Link>
              </Button>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default About;

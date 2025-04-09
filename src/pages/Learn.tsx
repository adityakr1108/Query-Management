
import { Link } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { BookOpen, Calendar, Clock, ArrowRight } from 'lucide-react';

const blogPosts = [
  {
    id: 1,
    title: "How AI is Transforming Lead Scoring",
    excerpt: "Discover how artificial intelligence is revolutionizing the way businesses identify and prioritize their most promising leads.",
    image: "https://images.unsplash.com/photo-1518770660439-4636190af475",
    category: "AI Insights",
    readTime: "5 min read",
    date: "May 15, 2023"
  },
  {
    id: 2,
    title: "5 Ways to Improve Your WhatsApp Lead Generation",
    excerpt: "Learn practical strategies to effectively use WhatsApp as a powerful channel for generating and nurturing high-quality leads.",
    image: "https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7",
    category: "WhatsApp Marketing",
    readTime: "7 min read",
    date: "June 3, 2023"
  },
  {
    id: 3,
    title: "The Psychology of Lead Conversion",
    excerpt: "Understanding the psychological factors that influence decision-making can significantly improve your lead conversion rates.",
    image: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40",
    category: "Conversion Strategies",
    readTime: "8 min read",
    date: "June 22, 2023"
  },
  {
    id: 4,
    title: "Data-Driven Lead Qualification: A Complete Guide",
    excerpt: "How to use data analytics to qualify leads more effectively and focus your sales efforts on the prospects most likely to convert.",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71",
    category: "Data Analytics",
    readTime: "10 min read",
    date: "July 8, 2023"
  },
  {
    id: 5,
    title: "Automated Email Sequences That Convert",
    excerpt: "Design email workflows that nurture leads through the sales funnel and drive conversions with minimal manual intervention.",
    image: "https://images.unsplash.com/photo-1596526131083-e8c633c948d2",
    category: "Email Marketing",
    readTime: "6 min read",
    date: "July 19, 2023"
  },
  {
    id: 6,
    title: "Integrating CRM with Your Lead Management Strategy",
    excerpt: "Best practices for seamlessly connecting your CRM system with your lead management processes for maximum efficiency.",
    image: "https://images.unsplash.com/photo-1552664730-d307ca884978",
    category: "CRM Integration",
    readTime: "9 min read",
    date: "August 5, 2023"
  }
];

const resources = [
  {
    title: "Lead Scoring Calculator",
    description: "A free tool to help you develop a customized lead scoring model based on your business criteria",
    icon: BarChart2
  },
  {
    title: "Lead Management Playbook",
    description: "A comprehensive guide to implementing an effective lead management strategy",
    icon: BookOpen
  },
  {
    title: "Monthly Webinars",
    description: "Join our expert-led webinars on the latest lead management best practices",
    icon: Calendar
  }
];

// Importing this icon here since it was used above but not imported
import { BarChart2 } from 'lucide-react';

const LearnPage = () => {
  return (
    <div className="min-h-screen flex flex-col page-transition">
      <Navbar />
      
      <main className="flex-1 pt-24">
        <section className="py-16 md:py-24">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <span className="inline-block py-1 px-3 rounded-full text-xs font-medium bg-blue-100 text-primary mb-4">
                Resources
              </span>
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-6">Lead Management Insights</h1>
              <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                Explore our collection of articles, guides, and resources to help you master lead management and increase conversions.
              </p>
            </div>
            
            <div className="mb-20">
              <h2 className="text-2xl font-bold mb-8">Featured Resources</h2>
              <div className="grid md:grid-cols-3 gap-8">
                {resources.map((resource, index) => (
                  <Card key={index} className="hover:shadow-md transition-shadow">
                    <CardContent className="p-6">
                      <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center mb-4">
                        <resource.icon size={24} className="text-primary" />
                      </div>
                      <h3 className="text-lg font-semibold mb-2">{resource.title}</h3>
                      <p className="text-gray-600 mb-4">{resource.description}</p>
                      <Button variant="outline" asChild className="mt-2">
                        <Link to="#">Access Resource <ArrowRight size={16} className="ml-2" /></Link>
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
            
            <div>
              <h2 className="text-2xl font-bold mb-8">Latest Articles</h2>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {blogPosts.map(post => (
                  <Card key={post.id} className="overflow-hidden hover:shadow-md transition-shadow">
                    <div className="h-48 overflow-hidden">
                      <img 
                        src={post.image} 
                        alt={post.title} 
                        className="w-full h-full object-cover transition-transform hover:scale-105"
                      />
                    </div>
                    <CardContent className="p-6">
                      <div className="flex items-center text-sm text-gray-500 mb-3">
                        <span className="bg-blue-100 text-primary px-2 py-1 rounded text-xs font-medium">
                          {post.category}
                        </span>
                        <span className="mx-2">•</span>
                        <div className="flex items-center">
                          <Clock size={14} className="mr-1" />
                          {post.readTime}
                        </div>
                        <span className="mx-2">•</span>
                        <span>{post.date}</span>
                      </div>
                      <h3 className="text-lg font-semibold mb-2">{post.title}</h3>
                      <p className="text-gray-600 mb-4 line-clamp-3">{post.excerpt}</p>
                      <Button variant="link" className="p-0 h-auto font-medium" asChild>
                        <Link to="#">
                          Read Article <ArrowRight size={16} className="ml-1" />
                        </Link>
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
              
              <div className="text-center mt-12">
                <Button variant="outline" asChild>
                  <Link to="#">View All Articles</Link>
                </Button>
              </div>
            </div>
            
            <div className="mt-24 bg-blue-50 rounded-xl p-8 flex flex-col md:flex-row md:items-center justify-between">
              <div className="mb-6 md:mb-0 md:mr-8">
                <h2 className="text-xl font-bold mb-2">Subscribe to our newsletter</h2>
                <p className="text-gray-600">
                  Get the latest lead management insights delivered to your inbox monthly.
                </p>
              </div>
              <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                />
                <Button>Subscribe</Button>
              </div>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default LearnPage;

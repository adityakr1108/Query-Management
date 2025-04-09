
import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { LineChart, BarChartBig, Users, Zap } from 'lucide-react';
import { leadsService, Lead } from '@/utils/leadsService';

interface StatsCardProps {
  title: string;
  value: string;
  description: string;
  icon: React.ReactNode;
  trend?: {
    value: string;
    positive: boolean;
  };
}

const StatsCard = ({ title, value, description, icon, trend }: StatsCardProps) => (
  <Card className="overflow-hidden">
    <CardHeader className="flex flex-row items-center justify-between p-4 pb-2 space-y-0">
      <CardTitle className="text-sm font-medium text-gray-500">{title}</CardTitle>
      <div className="p-2 bg-primary/10 rounded-full">{icon}</div>
    </CardHeader>
    <CardContent className="p-4 pt-0">
      <div className="flex items-baseline">
        <p className="text-2xl font-bold">{value}</p>
        {trend && (
          <span className={`ml-2 text-xs font-medium ${trend.positive ? 'text-green-600' : 'text-red-600'}`}>
            {trend.positive ? '+' : ''}{trend.value}
          </span>
        )}
      </div>
      <p className="text-xs text-gray-500 mt-1">{description}</p>
    </CardContent>
  </Card>
);

const LeadStats = () => {
  const [stats, setStats] = useState({
    totalLeads: 0,
    qualifiedLeads: 0,
    conversionRate: 0,
    avgLeadScore: 0
  });
  const [loading, setLoading] = useState(true);

  const calculateStats = (leads: Lead[]) => {
    const totalLeads = leads.length;
    const qualifiedLeads = leads.filter(lead => lead.score > 70).length;
    const convertedLeads = leads.filter(lead => lead.status === 'converted').length;
    const conversionRate = totalLeads > 0 ? (convertedLeads / totalLeads) * 100 : 0;
    const avgLeadScore = totalLeads > 0 
      ? leads.reduce((sum, lead) => sum + lead.score, 0) / totalLeads 
      : 0;

    setStats({
      totalLeads,
      qualifiedLeads,
      conversionRate,
      avgLeadScore
    });
    setLoading(false);
  };

  const fetchStats = async () => {
    try {
      const leads = await leadsService.getLeads();
      calculateStats(leads);
    } catch (error) {
      console.error('Error fetching stats:', error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStats();
  }, []);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {loading ? (
        Array(4).fill(0).map((_, index) => (
          <Card key={index} className="overflow-hidden animate-pulse">
            <CardHeader className="flex flex-row items-center justify-between p-4 pb-2 space-y-0">
              <div className="h-5 bg-gray-200 rounded w-24"></div>
              <div className="p-2 bg-gray-200 rounded-full h-10 w-10"></div>
            </CardHeader>
            <CardContent className="p-4 pt-0">
              <div className="h-8 bg-gray-200 rounded w-16 mb-2"></div>
              <div className="h-4 bg-gray-200 rounded w-full"></div>
            </CardContent>
          </Card>
        ))
      ) : (
        <>
          <StatsCard
            title="Total Leads"
            value={stats.totalLeads.toString()}
            description="All time leads captured"
            icon={<Users size={20} className="text-primary" />}
            trend={{ value: "12%", positive: true }}
          />
          <StatsCard
            title="Qualified Leads"
            value={stats.qualifiedLeads.toString()}
            description="Leads with score > 70"
            icon={<Zap size={20} className="text-primary" />}
            trend={{ value: "8%", positive: true }}
          />
          <StatsCard
            title="Conversion Rate"
            value={`${stats.conversionRate.toFixed(1)}%`}
            description="Leads to customers"
            icon={<BarChartBig size={20} className="text-primary" />}
            trend={{ value: "2.1%", positive: true }}
          />
          <StatsCard
            title="Avg. Lead Score"
            value={stats.avgLeadScore.toFixed(1)}
            description="Average AI score"
            icon={<LineChart size={20} className="text-primary" />}
            trend={{ value: "3.2", positive: true }}
          />
        </>
      )}
    </div>
  );
};

export default LeadStats;

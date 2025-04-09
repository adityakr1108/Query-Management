
import { useState, useEffect } from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { leadsService, Lead, LeadStatus } from '@/utils/leadsService';

interface StatusCount {
  name: string;
  value: number;
  color: string;
}

const COLORS = {
  new: '#4f46e5',
  contacted: '#3b82f6',
  qualified: '#10b981',
  converted: '#16a34a',
  lost: '#ef4444',
};

const LeadStatusChart = () => {
  const [data, setData] = useState<StatusCount[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const leads = await leadsService.getLeads();
        const statusCounts: Record<string, number> = {};
        
        // Count leads by status
        leads.forEach(lead => {
          if (statusCounts[lead.status]) {
            statusCounts[lead.status]++;
          } else {
            statusCounts[lead.status] = 1;
          }
        });
        
        // Format data for the chart
        const chartData = Object.keys(statusCounts).map(status => ({
          name: status.charAt(0).toUpperCase() + status.slice(1),
          value: statusCounts[status],
          color: COLORS[status as keyof typeof COLORS] || '#94a3b8',
        }));
        
        setData(chartData);
      } catch (error) {
        console.error('Error fetching lead status data:', error);
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchData();
  }, []);

  if (isLoading) {
    return (
      <Card className="h-[300px] flex items-center justify-center">
        <div className="flex flex-col items-center gap-2">
          <div className="h-8 w-8 animate-spin rounded-full border-b-2 border-primary"></div>
          <p className="text-sm text-muted-foreground">Loading chart data...</p>
        </div>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Lead Status Distribution</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                labelLine={false}
                outerRadius={90}
                fill="#8884d8"
                dataKey="value"
                nameKey="name"
                label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
              >
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip formatter={(value) => [`${value} leads`, 'Count']} />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
};

export default LeadStatusChart;


import { useState, useEffect } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { leadsService, Lead } from '@/utils/leadsService';

interface ScoreBucket {
  range: string;
  count: number;
}

const LeadScoreChart = () => {
  const [data, setData] = useState<ScoreBucket[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const leads = await leadsService.getLeads();
        
        // Define score buckets
        const buckets: ScoreBucket[] = [
          { range: '0-20', count: 0 },
          { range: '21-40', count: 0 },
          { range: '41-60', count: 0 },
          { range: '61-80', count: 0 },
          { range: '81-100', count: 0 },
        ];
        
        // Count leads by score range
        leads.forEach(lead => {
          const score = lead.score;
          if (score <= 20) buckets[0].count++;
          else if (score <= 40) buckets[1].count++;
          else if (score <= 60) buckets[2].count++;
          else if (score <= 80) buckets[3].count++;
          else buckets[4].count++;
        });
        
        setData(buckets);
      } catch (error) {
        console.error('Error fetching lead score data:', error);
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
        <CardTitle>Lead Score Distribution</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={data}
              margin={{
                top: 20,
                right: 30,
                left: 20,
                bottom: 5,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="range" />
              <YAxis />
              <Tooltip 
                formatter={(value) => [`${value} leads`, 'Count']}
                labelFormatter={(label) => `Score Range: ${label}`}
              />
              <Bar dataKey="count" name="Leads" fill="#4f46e5" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
};

export default LeadScoreChart;

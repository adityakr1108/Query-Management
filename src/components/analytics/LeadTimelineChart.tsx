
import { useState, useEffect } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { leadsService, Lead } from '@/utils/leadsService';

interface TimelineData {
  date: string;
  leads: number;
  qualified: number;
  converted: number;
}

// Helper function to generate mock timeline data
const generateMockTimelineData = (leads: Lead[]): TimelineData[] => {
  // For this mock implementation, we'll create data for the last 7 days
  const data: TimelineData[] = [];
  const today = new Date();
  
  for (let i = 6; i >= 0; i--) {
    const date = new Date(today);
    date.setDate(date.getDate() - i);
    
    // Format date as "May 15" etc.
    const dateString = date.toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric' 
    });
    
    // Generate some random but realistic data
    const total = Math.floor(Math.random() * 5) + (10 - i); // More recent dates have more leads
    const qualified = Math.floor(total * (0.4 + Math.random() * 0.3)); // 40-70% qualified
    const converted = Math.floor(qualified * (0.2 + Math.random() * 0.3)); // 20-50% converted
    
    data.push({
      date: dateString,
      leads: total,
      qualified,
      converted,
    });
  }
  
  return data;
};

const LeadTimelineChart = () => {
  const [data, setData] = useState<TimelineData[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const leads = await leadsService.getLeads();
        // In a real app, we would process the leads to create actual timeline data
        // For this demo, we'll generate mock data that looks realistic
        const timelineData = generateMockTimelineData(leads);
        setData(timelineData);
      } catch (error) {
        console.error('Error fetching timeline data:', error);
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
        <CardTitle>Lead Activity (Last 7 Days)</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart
              data={data}
              margin={{
                top: 20,
                right: 30,
                left: 20,
                bottom: 5,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line 
                type="monotone" 
                dataKey="leads" 
                name="Total Leads" 
                stroke="#4f46e5" 
                activeDot={{ r: 8 }} 
              />
              <Line 
                type="monotone" 
                dataKey="qualified" 
                name="Qualified Leads" 
                stroke="#10b981" 
              />
              <Line 
                type="monotone" 
                dataKey="converted" 
                name="Converted Leads" 
                stroke="#f59e0b" 
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
};

export default LeadTimelineChart;

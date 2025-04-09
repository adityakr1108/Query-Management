
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import LeadStatusChart from './LeadStatusChart';
import LeadScoreChart from './LeadScoreChart';
import LeadSourceChart from './LeadSourceChart';
import LeadTimelineChart from './LeadTimelineChart';
import { Download, RefreshCw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';

const AnalyticsDashboard = () => {
  const handleRefresh = () => {
    toast.success('Analytics data refreshed');
  };
  
  const handleExport = () => {
    toast.success('Analytics report exported');
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-2xl font-bold mb-1">Analytics Dashboard</h2>
          <p className="text-gray-500">Analyze lead performance and conversion metrics</p>
        </div>
        <div className="flex items-center space-x-3 mt-4 sm:mt-0">
          <Button variant="outline" onClick={handleRefresh}>
            <RefreshCw size={16} className="mr-2" />
            Refresh
          </Button>
          <Button onClick={handleExport}>
            <Download size={16} className="mr-2" />
            Export Report
          </Button>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <LeadStatusChart />
        <LeadScoreChart />
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <LeadSourceChart />
        <Card>
          <CardHeader>
            <CardTitle>Conversion Rate</CardTitle>
            <CardDescription>Lead-to-customer conversion rate over time</CardDescription>
          </CardHeader>
          <CardContent className="text-center">
            <div className="text-5xl font-bold text-primary my-4">23.7%</div>
            <p className="text-sm text-muted-foreground">+2.1% from last month</p>
            <div className="w-full bg-gray-200 h-2 rounded-full mt-6">
              <div className="bg-primary h-2 rounded-full" style={{ width: '23.7%' }}></div>
            </div>
            <div className="flex justify-between text-xs text-muted-foreground mt-2">
              <span>0%</span>
              <span>25%</span>
              <span>50%</span>
              <span>75%</span>
              <span>100%</span>
            </div>
          </CardContent>
        </Card>
      </div>
      
      <LeadTimelineChart />
      
      <Card>
        <CardHeader>
          <CardTitle>Key Metrics</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="border rounded-lg p-4">
              <p className="text-sm text-muted-foreground">Avg. Time to Contact</p>
              <p className="text-2xl font-bold">4.2 hrs</p>
              <p className="text-xs text-green-600">↓ 12% (Improved)</p>
            </div>
            <div className="border rounded-lg p-4">
              <p className="text-sm text-muted-foreground">Avg. Lead Score</p>
              <p className="text-2xl font-bold">68.5</p>
              <p className="text-xs text-green-600">↑ 3.2 points</p>
            </div>
            <div className="border rounded-lg p-4">
              <p className="text-sm text-muted-foreground">Cost per Lead</p>
              <p className="text-2xl font-bold">$24.80</p>
              <p className="text-xs text-green-600">↓ 8% (Improved)</p>
            </div>
            <div className="border rounded-lg p-4">
              <p className="text-sm text-muted-foreground">Lead Velocity</p>
              <p className="text-2xl font-bold">+14.3%</p>
              <p className="text-xs text-green-600">↑ 2.7%</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AnalyticsDashboard;

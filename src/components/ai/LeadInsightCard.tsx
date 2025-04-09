
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';

interface Insight {
  id: number;
  title: string;
  content: string;
  icon: React.ReactNode;
  actionLabel: string;
  type: string;
}

interface LeadInsightCardProps {
  insight: Insight;
}

const LeadInsightCard = ({ insight }: LeadInsightCardProps) => {
  const handleAction = () => {
    toast.success(`Applied action: ${insight.actionLabel}`);
  };

  return (
    <Card className="overflow-hidden">
      <CardHeader className="pb-2">
        <div className="flex items-start justify-between">
          <div className="flex items-center">
            <div className="mr-2 text-primary">{insight.icon}</div>
            <CardTitle className="text-lg">{insight.title}</CardTitle>
          </div>
          <div className="px-2 py-1 text-xs font-medium rounded-full bg-primary/10 text-primary">
            {insight.type === 'lead-analysis' && 'Lead Analysis'}
            {insight.type === 'conversion' && 'Conversion'}
            {insight.type === 'message-analysis' && 'Message Analysis'}
            {insight.type === 'performance' && 'Performance'}
            {insight.type === 'recommendation' && 'Recommendation'}
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <p className="text-gray-600 text-sm">{insight.content}</p>
      </CardContent>
      <CardFooter className="pt-0">
        <Button 
          variant="outline" 
          size="sm" 
          className="w-full"
          onClick={handleAction}
        >
          {insight.actionLabel}
        </Button>
      </CardFooter>
    </Card>
  );
};

export default LeadInsightCard;

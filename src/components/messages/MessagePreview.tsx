
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Lead } from '@/utils/leadsService';
import { Loader2, Send, Mail } from 'lucide-react';
import { toast } from 'sonner';
import { emailService } from '@/utils/emailService';
import { Badge } from '@/components/ui/badge';

interface MessagePreviewProps {
  lead: Lead | null;
  onSendMessage?: (message: string) => void;
  isLoading?: boolean;
}

const MessagePreview = ({ lead, onSendMessage, isLoading = false }: MessagePreviewProps) => {
  const [message, setMessage] = useState('');
  const [subject, setSubject] = useState('');
  const [isSending, setIsSending] = useState(false);
  
  const handleSendMessage = async () => {
    if (!lead || !message.trim()) return;
    
    try {
      setIsSending(true);
      
      // Send email notification with the message
      const emailSubject = subject.trim() || `Regarding your ${lead.requestType} request`;
      await emailService.sendDirectMessage(
        lead.email, 
        lead.name, 
        emailSubject, 
        message
      );
      
      // Call the parent component's handler if provided
      if (onSendMessage) {
        onSendMessage(message);
      }
      
      // Clear the input fields after sending
      setMessage('');
      setSubject('');
      
      toast.success('Message sent successfully');
    } catch (error) {
      console.error('Error sending message:', error);
      toast.error('Failed to send message');
    } finally {
      setIsSending(false);
    }
  };
  
  if (isLoading) {
    return (
      <Card className="h-full">
        <CardContent className="flex items-center justify-center h-full">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
        </CardContent>
      </Card>
    );
  }
  
  if (!lead) {
    return (
      <Card className="h-full">
        <CardContent className="flex flex-col items-center justify-center h-full py-12">
          <Mail className="h-12 w-12 text-muted-foreground mb-4" />
          <p className="text-muted-foreground">Select a lead to view their message</p>
        </CardContent>
      </Card>
    );
  }
  
  return (
    <Card className="h-full flex flex-col">
      <CardHeader className="border-b pb-3">
        <div className="flex justify-between items-start">
          <div>
            <CardTitle className="text-lg">{lead.name}</CardTitle>
            <div className="text-sm text-muted-foreground mt-1">{lead.email}</div>
          </div>
          
          <div className="flex flex-col items-end">
            <Badge variant={lead.isGuest ? "secondary" : "outline"}>
              {lead.isGuest ? 'Guest' : 'Registered'}
            </Badge>
            <div className="mt-1">
              <Badge variant={
                lead.status === 'new' ? "default" :
                lead.status === 'contacted' ? "secondary" : 
                lead.status === 'qualified' ? "outline" :
                lead.status === 'converted' ? "default" : "destructive"
              }>
                {lead.status.charAt(0).toUpperCase() + lead.status.slice(1)}
              </Badge>
            </div>
          </div>
        </div>
      </CardHeader>
      
      <CardContent className="flex-1 flex flex-col p-4 pt-4">
        <div className="flex-1 overflow-auto mb-4">
          <div className="mb-6">
            <div className="text-sm font-medium mb-2">Request Type:</div>
            <div className="text-sm px-3 py-2 bg-muted rounded-md">
              {lead.requestType}
            </div>
          </div>
          
          <div>
            <div className="text-sm font-medium mb-2">Message:</div>
            <div className="px-4 py-3 bg-primary/5 rounded-lg border text-sm">
              {lead.message}
            </div>
          </div>
        </div>
        
        <div className="border-t pt-4">
          <h3 className="font-medium text-sm mb-3">Send Response:</h3>
          
          <Input
            placeholder="Subject (optional)"
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
            className="mb-3"
          />
          
          <div className="flex flex-col">
            <Textarea
              placeholder="Type your message here..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              rows={3}
              className="mb-3 resize-none"
            />
            
            <div className="flex justify-end">
              <Button 
                onClick={handleSendMessage}
                disabled={!message.trim() || isSending}
                className="w-auto"
              >
                {isSending ? (
                  <Loader2 className="h-4 w-4 animate-spin mr-2" />
                ) : (
                  <Send className="h-4 w-4 mr-2" />
                )}
                Send Message
              </Button>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default MessagePreview;


import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { MessageSquare, Mail, Send } from 'lucide-react';
import { LeadStatus, leadsService } from '@/utils/leadsService';
import { Input } from '@/components/ui/input';
import { toast } from 'sonner';
import { ScrollArea } from '@/components/ui/scroll-area';

interface LeadInteractionProps {
  leadId: string;
  recipientEmail?: string;
  recipientName?: string;
  isAdmin?: boolean;
  onInteractionComplete: () => void;
}

interface Interaction {
  message: string;
  isAdmin: boolean;
  timestamp: string;
}

const LeadInteraction = ({ 
  leadId, 
  recipientEmail, 
  recipientName,
  isAdmin = false, 
  onInteractionComplete 
}: LeadInteractionProps) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState('');
  const [subject, setSubject] = useState('');
  const [newStatus, setNewStatus] = useState<LeadStatus | ''>('');
  const [interactions, setInteractions] = useState<Interaction[]>([]);
  
  const fetchInteractions = async () => {
    try {
      const lead = await leadsService.getLead(leadId);
      if (lead) {
        // Check if interactions is an array
        if (Array.isArray(lead.interactions)) {
          setInteractions(lead.interactions as Interaction[]);
        } else {
          // If it's a number or something else, initialize with empty array
          setInteractions([]);
        }
      }
    } catch (error) {
      console.error('Error fetching interactions:', error);
      setInteractions([]);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Record the interaction
      if (message.trim()) {
        await leadsService.addInteraction(leadId, message);
        
        // Add to local interactions for immediate display
        const newInteraction: Interaction = {
          message,
          isAdmin: isAdmin,
          timestamp: new Date().toLocaleTimeString()
        };
        setInteractions(prev => [...prev, newInteraction]);
      }
      
      // Update status if changed and admin
      if (isAdmin && newStatus) {
        await leadsService.updateLeadStatus(leadId, newStatus as LeadStatus);
      }
      
      // Send email if admin
      if (isAdmin && recipientEmail && subject.trim() && message.trim()) {
        // In a real application, this would connect to an email API
        // For now, we'll simulate email sending with a delay
        await new Promise(resolve => setTimeout(resolve, 1000));
        toast.success(`Email sent to ${recipientEmail}`);
      }
      
      onInteractionComplete();
      setMessage('');
      setSubject('');
      setNewStatus('');
    } catch (error) {
      console.error('Error during lead interaction:', error);
      toast.error('Failed to send message');
    } finally {
      setIsSubmitting(false);
    }
  };

  // Handle SelectValue change with type safety
  const handleSelectChange = (value: string) => {
    setNewStatus(value as LeadStatus);
  };

  return (
    <Dialog onOpenChange={(open) => {
      if (open) {
        fetchInteractions();
      }
    }}>
      <DialogTrigger asChild>
        <Button size="sm" variant={isAdmin ? "default" : "outline"} className={isAdmin ? "flex-1" : "w-full"}>
          {isAdmin ? (
            <>
              <Mail size={14} className="mr-1" /> Email
            </>
          ) : (
            <>
              <MessageSquare size={14} className="mr-1" /> Respond
            </>
          )}
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>
            {isAdmin 
              ? `Email to ${recipientName || 'Lead'}`
              : "Respond to Your Request"
            }
          </DialogTitle>
          <DialogDescription>
            {isAdmin 
              ? `Send an email to ${recipientEmail || 'the lead'} and update their status if needed.` 
              : "Add additional information or respond to your request."}
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Chat display area */}
          {interactions.length > 0 && (
            <ScrollArea className="h-[200px] p-4 rounded-md border">
              <div className="space-y-4">
                {interactions.map((interaction, idx) => (
                  <div key={idx} className={`flex ${interaction.isAdmin ? 'justify-start' : 'justify-end'}`}>
                    <div 
                      className={`max-w-[70%] rounded-2xl px-4 py-2 text-sm ${
                        interaction.isAdmin 
                          ? 'bg-gray-100 rounded-tl-none text-gray-800' 
                          : 'bg-blue-500 rounded-tr-none text-white'
                      }`}
                    >
                      <p>{interaction.message}</p>
                      <p className={`text-xs mt-1 text-right ${interaction.isAdmin ? 'text-gray-500' : 'text-blue-100'}`}>
                        {interaction.timestamp}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </ScrollArea>
          )}
          
          {isAdmin && (
            <div className="space-y-2">
              <label className="text-sm font-medium">To:</label>
              <Input value={recipientEmail || ''} readOnly className="bg-gray-50" />
            </div>
          )}

          {isAdmin && (
            <div className="space-y-2">
              <label className="text-sm font-medium">Subject:</label>
              <Input
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                placeholder="Email subject"
                required={isAdmin}
              />
            </div>
          )}

          <div className="space-y-2">
            <label className="text-sm font-medium">Message:</label>
            <div className="flex">
              <Textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Type your message here..."
                rows={3}
                className="flex-1 rounded-r-none focus-visible:ring-0 focus-visible:ring-offset-0"
                required
              />
              <Button 
                type="submit" 
                className="rounded-l-none bg-blue-500 hover:bg-blue-600" 
                disabled={isSubmitting}
              >
                <Send size={16} />
              </Button>
            </div>
          </div>

          {isAdmin && (
            <div className="space-y-2">
              <div className="text-sm font-medium">Update Lead Status</div>
              <Select 
                value={newStatus} 
                onValueChange={handleSelectChange}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Keep current status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="new">New</SelectItem>
                  <SelectItem value="contacted">Contacted</SelectItem>
                  <SelectItem value="qualified">Qualified</SelectItem>
                  <SelectItem value="converted">Converted</SelectItem>
                  <SelectItem value="lost">Lost</SelectItem>
                </SelectContent>
              </Select>
            </div>
          )}

          <DialogFooter>
            <DialogClose asChild>
              <Button type="button" variant="outline">Cancel</Button>
            </DialogClose>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default LeadInteraction;

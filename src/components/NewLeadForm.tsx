
import { useState } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { PlusCircle } from 'lucide-react';
import { useUser } from '@/context/UserContext';
import { leadsService } from '@/utils/leadsService';
import { toast } from 'sonner';

// Define form schema
const formSchema = z.object({
  requestType: z.string().min(1, { message: 'Please select a request type' }),
  message: z.string().min(10, { message: 'Message must be at least 10 characters' })
});

type FormData = z.infer<typeof formSchema>;

interface NewLeadFormProps {
  onLeadAdded: (data: FormData) => void;
}

const NewLeadForm = ({ onLeadAdded }: NewLeadFormProps) => {
  const [open, setOpen] = useState(false);
  const { user } = useUser();
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      requestType: '',
      message: ''
    }
  });
  
  const onSubmit = async (data: FormData) => {
    if (!user) {
      toast.error("You must be logged in to submit a request");
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      // Create a new lead with the form data
      // Important: Setting isGuest explicitly to false, and removing the second parameter
      // which was causing a duplicate submission
      await leadsService.addLead({
        name: user.name,
        email: user.email,
        requestType: data.requestType,
        message: data.message,
        status: 'new',
        isGuest: false
      });
      
      // Call the onLeadAdded callback
      onLeadAdded(data);
      form.reset();
      setOpen(false);
      toast.success("Your request has been submitted successfully");
    } catch (error) {
      console.error('Error submitting request:', error);
      toast.error("Failed to submit your request. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };
  
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="new-lead-button">
          <PlusCircle size={16} className="mr-2" />
          New Request
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create New Request</DialogTitle>
          <DialogDescription>
            Submit a new request to our team. We'll respond as soon as possible.
          </DialogDescription>
        </DialogHeader>
        
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="requestType"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Request Type</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select request type" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="Product Inquiry">Product Inquiry</SelectItem>
                      <SelectItem value="Demo Request">Demo Request</SelectItem>
                      <SelectItem value="Pricing">Pricing</SelectItem>
                      <SelectItem value="Support">Support</SelectItem>
                      <SelectItem value="Partnership">Partnership</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="message"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Message</FormLabel>
                  <FormControl>
                    <Textarea 
                      placeholder="Tell us about your request"
                      rows={4}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <DialogFooter>
              <Button type="submit" disabled={isSubmitting}>
                {isSubmitting ? 'Submitting...' : 'Submit Request'}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default NewLeadForm;

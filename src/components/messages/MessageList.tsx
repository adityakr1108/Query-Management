
import { Lead } from '@/utils/leadsService';
import { Loader2 } from 'lucide-react';

interface MessageListProps {
  leads: Lead[];
  selectedLead: Lead | null;
  onSelectLead: (lead: Lead) => void;
  isLoading: boolean;
}

const MessageList = ({ leads, selectedLead, onSelectLead, isLoading }: MessageListProps) => {
  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center h-full py-8">
        <Loader2 className="h-8 w-8 animate-spin text-primary mb-4" />
        <p className="text-sm text-muted-foreground">Loading messages...</p>
      </div>
    );
  }
  
  if (leads.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-full py-8">
        <p className="text-sm text-muted-foreground">No messages found</p>
      </div>
    );
  }
  
  return (
    <div className="divide-y">
      {leads.map((lead) => (
        <div
          key={lead.id}
          className={`p-4 cursor-pointer transition-colors hover:bg-muted/50 ${
            selectedLead?.id === lead.id ? 'bg-muted' : ''
          }`}
          onClick={() => onSelectLead(lead)}
        >
          <div className="flex items-start justify-between">
            <div className="flex items-center space-x-3">
              <div className="relative">
                <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center text-primary font-medium">
                  {lead.name.charAt(0).toUpperCase()}
                </div>
                {lead.isGuest ? (
                  <span className="absolute -top-1 -right-1 h-4 w-4 rounded-full bg-gray-300"></span>
                ) : (
                  <span className="absolute -top-1 -right-1 h-4 w-4 rounded-full bg-green-500"></span>
                )}
              </div>
              <div>
                <div className="font-medium">{lead.name}</div>
                <div className="text-xs text-muted-foreground">{lead.email}</div>
              </div>
            </div>
            <div className="text-xs text-muted-foreground">{lead.lastActivity}</div>
          </div>
          <div className="mt-2">
            <div className="text-sm font-medium text-primary">{lead.requestType}</div>
            <p className="text-sm text-muted-foreground line-clamp-2 mt-1">
              {lead.message}
            </p>
          </div>
          <div className="flex justify-between items-center mt-2">
            <div className="flex space-x-1">
              <span className={`px-2 py-0.5 text-xs rounded-full ${
                lead.status === 'new' ? 'bg-blue-100 text-blue-800' :
                lead.status === 'contacted' ? 'bg-yellow-100 text-yellow-800' :
                lead.status === 'qualified' ? 'bg-green-100 text-green-800' :
                lead.status === 'converted' ? 'bg-indigo-100 text-indigo-800' :
                'bg-red-100 text-red-800'
              }`}>
                {lead.status.charAt(0).toUpperCase() + lead.status.slice(1)}
              </span>
            </div>
            {lead.score >= 70 && (
              <span className="px-2 py-0.5 text-xs rounded-full bg-amber-100 text-amber-800">
                High Value
              </span>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default MessageList;

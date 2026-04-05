
import { Lead } from '@/utils/leadsService';
import { Loader2 } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

interface MessageListProps {
  leads: Lead[];
  selectedLead: Lead | null;
  onSelectLead: (lead: Lead) => void;
  isLoading: boolean;
  unreadCounts?: Record<string, number>;
}

const MessageList = ({ leads, selectedLead, onSelectLead, isLoading, unreadCounts = {} }: MessageListProps) => {
  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center h-full py-8">
        <Loader2 className="h-7 w-7 animate-spin text-primary mb-3" />
        <p className="text-sm text-muted-foreground">Loading conversations...</p>
      </div>
    );
  }

  if (leads.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-full py-8">
        <p className="text-sm text-muted-foreground">No conversations found</p>
      </div>
    );
  }

  return (
    <div className="divide-y">
      {leads.map((lead) => {
        const unread = unreadCounts[lead.id] ?? 0;
        const isSelected = selectedLead?.id === lead.id;

        return (
          <div
            key={lead.id}
            className={`p-4 cursor-pointer transition-colors hover:bg-muted/50 ${isSelected ? 'bg-muted border-l-2 border-l-primary' : ''}`}
            onClick={() => onSelectLead(lead)}
          >
            <div className="flex items-start justify-between gap-2">
              <div className="flex items-center space-x-3 min-w-0">
                <div className="relative flex-shrink-0">
                  <div className={`h-9 w-9 rounded-full flex items-center justify-center text-sm font-medium ${
                    isSelected ? 'bg-primary text-primary-foreground' : 'bg-primary/10 text-primary'
                  }`}>
                    {lead.name.charAt(0).toUpperCase()}
                  </div>
                  {/* Online indicator: green for registered */}
                  <span className={`absolute -bottom-0.5 -right-0.5 h-3 w-3 rounded-full border-2 border-white ${
                    lead.isGuest ? 'bg-gray-300' : 'bg-green-500'
                  }`} />
                </div>
                <div className="min-w-0">
                  <div className="font-medium text-sm truncate">{lead.name}</div>
                  <div className="text-xs text-muted-foreground truncate">{lead.email}</div>
                </div>
              </div>
              <div className="flex flex-col items-end gap-1 flex-shrink-0">
                <span className="text-xs text-muted-foreground whitespace-nowrap">{lead.lastActivity}</span>
                {unread > 0 && (
                  <span className="h-5 w-5 rounded-full bg-primary text-primary-foreground text-xs flex items-center justify-center font-medium">
                    {unread > 9 ? '9+' : unread}
                  </span>
                )}
              </div>
            </div>

            <div className="mt-2 pl-12">
              <div className="text-xs font-medium text-primary mb-0.5">{lead.requestType}</div>
              <p className="text-xs text-muted-foreground line-clamp-1">{lead.message}</p>
            </div>

            <div className="flex gap-1.5 mt-2 pl-12">
              <span className={`px-2 py-0.5 text-xs rounded-full font-medium ${
                lead.status === 'new' ? 'bg-blue-100 text-blue-700' :
                lead.status === 'contacted' ? 'bg-yellow-100 text-yellow-700' :
                lead.status === 'qualified' ? 'bg-green-100 text-green-700' :
                lead.status === 'converted' ? 'bg-indigo-100 text-indigo-700' :
                'bg-red-100 text-red-700'
              }`}>
                {lead.status.charAt(0).toUpperCase() + lead.status.slice(1)}
              </span>
              {lead.score >= 70 && (
                <span className="px-2 py-0.5 text-xs rounded-full bg-amber-100 text-amber-700 font-medium">
                  High Value
                </span>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default MessageList;

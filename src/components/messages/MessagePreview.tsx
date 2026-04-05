
import { useState, useEffect, useRef } from 'react';
import { CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Lead } from '@/utils/leadsService';
import { messageService, Message } from '@/utils/messageService';
import { useUser } from '@/context/UserContext';
import { Loader2, Send, Mail, MessageCircle } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { ScrollArea } from '@/components/ui/scroll-area';

interface MessagePreviewProps {
  lead: Lead | null;
  onSendMessage?: (message: string) => void;
  isLoading?: boolean;
}

const MessagePreview = ({ lead, isLoading = false }: MessagePreviewProps) => {
  const { user } = useUser();
  const [messages, setMessages] = useState<Message[]>([]);
  const [text, setText] = useState('');
  const [isSending, setIsSending] = useState(false);
  const [isLoadingMsgs, setIsLoadingMsgs] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);

  // Load + subscribe to messages whenever selected lead changes
  useEffect(() => {
    if (!lead) { setMessages([]); return; }

    let channel: ReturnType<typeof messageService.subscribeToMessages> | null = null;

    const load = async () => {
      setIsLoadingMsgs(true);
      const msgs = await messageService.getMessages(lead.id);
      setMessages(msgs);
      setIsLoadingMsgs(false);

      // Mark messages as read
      if (user) await messageService.markRead(lead.id, user.id);
    };

    load();

    // Supabase Realtime subscription
    channel = messageService.subscribeToMessages(lead.id, (newMsg) => {
      setMessages(prev => {
        if (prev.some(m => m.id === newMsg.id)) return prev;
        return [...prev, newMsg];
      });
    });

    return () => {
      if (channel) messageService.unsubscribe(channel);
    };
  }, [lead?.id, user?.id]);

  // Auto-scroll to bottom on new messages
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSend = async () => {
    if (!lead || !user || !text.trim()) return;
    setIsSending(true);
    await messageService.sendMessage(
      lead.id,
      user.id,
      user.name,
      user.role,
      text.trim()
    );
    setText('');
    setIsSending(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  if (isLoading) {
    return (
      <div className="h-full flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  if (!lead) {
    return (
      <div className="h-full flex flex-col items-center justify-center py-12 text-center px-4">
        <div className="h-16 w-16 rounded-full bg-primary/10 flex items-center justify-center mb-4">
          <Mail className="h-8 w-8 text-primary" />
        </div>
        <p className="text-muted-foreground">Select a conversation to view messages</p>
      </div>
    );
  }

  return (
    <div className="h-full flex flex-col">
      {/* Header */}
      <CardHeader className="border-b pb-3 flex-shrink-0">
        <div className="flex justify-between items-start">
          <div>
            <CardTitle className="text-lg">{lead.name}</CardTitle>
            <div className="text-sm text-muted-foreground mt-0.5">{lead.email}</div>
          </div>
          <div className="flex flex-col items-end gap-1">
            <Badge variant={lead.isGuest ? 'secondary' : 'outline'}>
              {lead.isGuest ? 'Guest' : 'Registered'}
            </Badge>
            <Badge
              variant={
                lead.status === 'new' ? 'default' :
                lead.status === 'converted' ? 'default' :
                lead.status === 'lost' ? 'destructive' : 'secondary'
              }
            >
              {lead.status.charAt(0).toUpperCase() + lead.status.slice(1)}
            </Badge>
          </div>
        </div>
        {/* Original query */}
        <div className="mt-3 p-3 bg-muted rounded-lg text-sm">
          <span className="font-medium text-xs text-muted-foreground uppercase tracking-wide block mb-1">
            {lead.requestType}
          </span>
          <p className="text-foreground line-clamp-2">{lead.message}</p>
        </div>
      </CardHeader>

      {/* Messages */}
      <CardContent className="flex-1 overflow-hidden p-0">
        <ScrollArea className="h-[320px] p-4">
          {isLoadingMsgs ? (
            <div className="flex justify-center py-8">
              <Loader2 className="h-6 w-6 animate-spin text-primary" />
            </div>
          ) : messages.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full py-8 text-center">
              <MessageCircle className="h-10 w-10 text-muted-foreground/40 mb-3" />
              <p className="text-sm text-muted-foreground">No messages yet. Start the conversation!</p>
            </div>
          ) : (
            <div className="space-y-4">
              {messages.map((msg) => {
                const isMe = msg.senderId === user?.id;
                return (
                  <div key={msg.id} className={`flex items-end gap-2 ${isMe ? 'flex-row-reverse' : 'flex-row'}`}>
                    <Avatar className="h-7 w-7 flex-shrink-0">
                      <AvatarFallback className={`text-xs font-medium ${isMe ? 'bg-primary text-primary-foreground' : 'bg-muted'}`}>
                        {msg.senderName.charAt(0).toUpperCase()}
                      </AvatarFallback>
                    </Avatar>
                    <div className={`max-w-[75%] ${isMe ? 'items-end' : 'items-start'} flex flex-col gap-1`}>
                      <div className="flex items-center gap-2">
                        <span className={`text-xs text-muted-foreground ${isMe ? 'order-2' : ''}`}>
                          {msg.senderName}
                        </span>
                        <span className={`text-xs text-muted-foreground/60 ${isMe ? 'order-1' : ''}`}>
                          {new Date(msg.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                        </span>
                      </div>
                      <div className={`px-4 py-2.5 rounded-2xl text-sm leading-relaxed ${
                        isMe
                          ? 'bg-primary text-primary-foreground rounded-tr-sm'
                          : 'bg-muted text-foreground rounded-tl-sm'
                      }`}>
                        {msg.text}
                      </div>
                    </div>
                  </div>
                );
              })}
              <div ref={bottomRef} />
            </div>
          )}
        </ScrollArea>
      </CardContent>

      {/* Input */}
      <div className="border-t p-4 flex-shrink-0">
        <div className="flex gap-2 items-end">
          <Textarea
            placeholder="Type a message… (Enter to send, Shift+Enter for newline)"
            value={text}
            onChange={(e) => setText(e.target.value)}
            onKeyDown={handleKeyDown}
            rows={2}
            className="resize-none flex-1 text-sm"
          />
          <Button
            onClick={handleSend}
            disabled={!text.trim() || isSending}
            size="icon"
            className="h-10 w-10 flex-shrink-0"
          >
            {isSending ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              <Send className="h-4 w-4" />
            )}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default MessagePreview;

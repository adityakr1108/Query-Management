
import { supabase } from '@/lib/supabase';

export interface Message {
  id: string;
  queryId: string;
  senderId: string | null;
  senderName: string;
  senderRole: string;
  text: string;
  read: boolean;
  createdAt: string;
}

// Map DB row → Message
const mapMsg = (row: any): Message => ({
  id: row.id,
  queryId: row.query_id,
  senderId: row.sender_id,
  senderName: row.sender_name,
  senderRole: row.sender_role,
  text: row.text,
  read: row.read,
  createdAt: row.created_at,
});

export const messageService = {
  // ── Fetch all messages for a query ──────────────────────────
  getMessages: async (queryId: string): Promise<Message[]> => {
    const { data, error } = await supabase
      .from('messages')
      .select('*')
      .eq('query_id', queryId)
      .order('created_at', { ascending: true });

    if (error) { console.error(error); return []; }
    return (data ?? []).map(mapMsg);
  },

  // ── Send a message ───────────────────────────────────────────
  sendMessage: async (
    queryId: string,
    senderId: string,
    senderName: string,
    senderRole: string,
    text: string
  ): Promise<Message | null> => {
    const { data, error } = await supabase
      .from('messages')
      .insert({
        query_id: queryId,
        sender_id: senderId,
        sender_name: senderName,
        sender_role: senderRole,
        text,
        read: false,
      })
      .select()
      .single();

    if (error) { console.error(error); return null; }
    return mapMsg(data);
  },

  // ── Subscribe to new messages (Supabase Realtime) ────────────
  subscribeToMessages: (queryId: string, onNew: (msg: Message) => void) => {
    const channel = supabase
      .channel(`messages:${queryId}`)
      .on(
        'postgres_changes',
        {
          event: 'INSERT',
          schema: 'public',
          table: 'messages',
          filter: `query_id=eq.${queryId}`,
        },
        (payload) => onNew(mapMsg(payload.new))
      )
      .subscribe();

    return channel;
  },

  // ── Unsubscribe a channel ────────────────────────────────────
  unsubscribe: (channel: ReturnType<typeof supabase.channel>) => {
    supabase.removeChannel(channel);
  },

  // ── Get unread count for a query ─────────────────────────────
  getUnreadCount: async (queryId: string, userId: string): Promise<number> => {
    const { count, error } = await supabase
      .from('messages')
      .select('id', { count: 'exact', head: true })
      .eq('query_id', queryId)
      .eq('read', false)
      .neq('sender_id', userId);

    return error ? 0 : (count ?? 0);
  },

  // ── Mark all messages in a query as read ─────────────────────
  markRead: async (queryId: string, userId: string): Promise<void> => {
    await supabase
      .from('messages')
      .update({ read: true })
      .eq('query_id', queryId)
      .neq('sender_id', userId);
  },
};

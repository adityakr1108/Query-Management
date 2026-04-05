import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL as string;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY as string;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Type definitions matching our Supabase schema
export type UserRole = 'admin' | 'business_user' | 'employee';

export interface DBProfile {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  company_name: string | null;
  created_at: string;
}

export interface DBQuery {
  id: string;
  name: string;
  email: string;
  request_type: string;
  message: string;
  status: string;
  is_guest: boolean;
  score: number;
  created_by_id: string | null;
  assigned_to_id: string | null;
  last_activity: string;
  created_at: string;
}

export interface DBMessage {
  id: string;
  query_id: string;
  sender_id: string | null;
  sender_name: string;
  sender_role: string;
  text: string;
  read: boolean;
  created_at: string;
}

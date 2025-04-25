import type { SupabaseClient, Session } from '@supabase/supabase-js';
import type { Database } from './lib/database.types'; // optional if using typed Supabase

declare global {
	namespace App {
		interface Locals {
			supabase: SupabaseClient<Database>; // or just SupabaseClient<any> if you're not using a DB type
			session: Session | null;
		}
	}
}

export {};

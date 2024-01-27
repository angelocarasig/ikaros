import { Injectable } from '@nestjs/common';

import { AuthResponse, SupabaseClient, createClient } from '@supabase/supabase-js';

@Injectable()
export class SupabaseService {
  private supabase: SupabaseClient;

  constructor() {
    const supabaseUrl = process.env.SUPABASE_URL;
    const supabaseAnonKey = process.env.SUPABASE_ANON_KEY;

    console.log("Supabase URL: ", supabaseUrl);
    console.log("Supabase Key: ", supabaseAnonKey);

    this.supabase = createClient(supabaseUrl, supabaseAnonKey);
  }

  public async logInWithPassword(email: string, password: string): Promise<AuthResponse> {
    return await this.supabase.auth.signInWithPassword({
      email: email,
      password: password
    })
  }

  public async signUp(username: string, email: string, password: string): Promise<AuthResponse> {
    return await this.supabase.auth.signUp({
      email: email,
      password: password,
      options: {
        data: {
          username: username
        }
      }
    });
  }
}

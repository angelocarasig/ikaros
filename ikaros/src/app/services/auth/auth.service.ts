/* eslint-disable @typescript-eslint/no-unused-vars */
import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { BehaviorSubject } from 'rxjs';
import { AuthResponse } from '@supabase/supabase-js';

import { PublicUser } from '@shared/models/public-user';

@Injectable({
  // To make sure its a singleton service
  providedIn: 'root',
})
export class AuthService {
  userSignedIn$ = new BehaviorSubject<boolean>(false);
  userPublicProfile$ = new BehaviorSubject<PublicUser | null>(null);

  private readonly http = inject(HttpClient);

  constructor() {
  }

  async signUp(username: string, email: string, password: string): Promise<void> {

  }

  async login(email: string, password: string): Promise<void> {
    const body = { email, password };

    this.http.post(`/api/auth/login`, body).subscribe({
      next: (res) => {
        console.log("Response: ", res);
      },
      error: (err) => {
        console.error("Error: ", err);
      }
    });
  }

  async signOut(): Promise<void> {

  }

  /**
   * Refer to: https://supabase.com/docs/reference/javascript/auth-onauthstatechange
   */
  private handleAuthStateChange(): void {
    
  }

    /**
   * @param id Foreign key from auth schema. Typically fetched from the current session data.
   * @returns PublicUser containing the `username`, `email`, and `pfp`.
   */
    private async getCurrentUser(uuid: string): Promise<PublicUser> {
      throw "Not implemented.";
    }
}

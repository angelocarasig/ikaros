/* eslint-disable @typescript-eslint/no-unused-vars */
import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { BehaviorSubject } from 'rxjs';

import { PublicUser } from '@shared/models/public-user';
import { getRouteUrl } from '../../utils';

import { environment } from 'ikaros/src/environments/environment';
import { ApiEndpoints } from '../../constants';

@Injectable({
  // To make sure its a singleton service
  providedIn: 'root',
})
export class AuthService {
  userSignedIn$ = new BehaviorSubject<boolean>(false);
  userPublicProfile$ = new BehaviorSubject<PublicUser | null>(null);

  BACKEND_API = environment.api;

  private readonly http = inject(HttpClient);

  constructor() {
  }

  async signUp(username: string, email: string, password: string): Promise<void> {

  }

  async login(email: string, password: string): Promise<void> {
    const body = { email, password };

    const url = getRouteUrl(this.BACKEND_API, ApiEndpoints.Auth.Login);
    console.log("Body: ", body);
    console.log("Request: ", url);

    this.http.post(getRouteUrl(this.BACKEND_API, ApiEndpoints.Auth.Login), body).subscribe({
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

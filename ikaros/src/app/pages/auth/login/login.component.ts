import { CommonModule } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';


import { HlmButtonDirective } from '@spartan-ng/ui-button-helm';
import { HlmInputDirective } from '@spartan-ng/ui-input-helm';
import { hlmH2, hlmMuted } from '@spartan-ng/ui-typography-helm';
import { LogoComponent } from '../../../components/logo/logo.component';
import { ThemeService } from '../../../services/theme/theme.service';
import { AuthService } from '../../../services/auth/auth.service';

@Component({
  selector: 'ikaros-login',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,

    ReactiveFormsModule,
    HlmButtonDirective,
    HlmInputDirective,

    LogoComponent
  ],
  providers: [
    ThemeService,
    AuthService
  ],
  template: `
    <div
      class="w-screen h-screen bg-background text-foreground flex flex-col justify-center items-center gap-3"
    >
      <div class="flex flex-col gap-2 border border-solid border-secondary p-8 rounded-xl">
        <ikaros-logo class="w-6 h-6 mx-auto mb-2" />
        <h1 class="${hlmH2} border-b-0 pb-2 text-center">Welcome Back</h1>
        <p class="${hlmMuted} pb-2 w-80 text-center">Enter your details to get log in.</p>
        <form
          class="flex flex-col gap-2 items-center"
          [formGroup]="registerForm"
          (ngSubmit)="onSubmit()"
        >
          <div>
            <input
              class="w-80 m-1"
              hlmInput
              type="text"
              id="email"
              placeholder="Email"
              formControlName="email"
            />
            <div
              *ngIf="
                registerForm.get('email')?.invalid &&
                registerForm.get('email')?.touched
              "
            >
              <div
                class="${hlmMuted} text-red-500"
                *ngIf="registerForm.get('email')?.errors?.['required']"
              >
                Email is required.
              </div>
            </div>
          </div>

          <div>
            <input
              class="w-80 m-1"
              hlmInput
              type="password"
              id="password"
              placeholder="Password"
              formControlName="password"
            />
            <div
              *ngIf="
                registerForm.get('password')?.invalid &&
                registerForm.get('password')?.touched
              "
            >
              <div
                class="${hlmMuted} text-red-500"
                *ngIf="registerForm.get('password')?.errors?.['required']"
              >
                Password is required.
              </div>
              <div
                class="${hlmMuted} text-red-500"
                *ngIf="registerForm.get('password')?.errors?.['minLength']"
              >
                Password must be at least 6 characters long.
              </div>
            </div>
          </div>

          <button
            hlmBtn
            type="submit"
            class="w-80"
            [disabled]="registerForm.invalid"
          >
            Login with Email
          </button>

          <p class="${hlmMuted}">Don't have an account yet? <a class="underline cursor-pointer" routerLink="/register">Sign Up</a></p>
          <br />
        </form>

        <div class="flex items-center justify-center space-x-2">
          <div class="flex-grow border-t border-gray-300"></div>
          <p class="${hlmMuted}">Or Continue With</p>
          <div class="flex-grow border-t border-gray-300"></div>
        </div>

        <button hlmBtn class="w-80">
          <div>
            <!-- Gmail Icon -->
            <svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 0 24 24" width="24">
              <path
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                fill="#4285F4" />
              <path
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                fill="#34A853" />
              <path
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                fill="#FBBC05" />
              <path
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                fill="#EA4335" />
              <path d="M1 1h22v22H1z" fill="none" />
            </svg>
          </div>
          <div class="pl-2 w-80">
            Continue with Google
          </div>
        </button>

        <div class="${hlmMuted} w-80 text-center">
          <br />
          By clicking continue, you agree to our <span class="underline cursor-pointer">Terms of Service</span> and <span class="underline cursor-pointer">Privacy Policy</span>.
        </div>
      </div>
    </div>
  `,
})
export class LoginComponent implements OnInit {
  registerForm!: FormGroup;

  private formBuilder = inject(FormBuilder);
  private router = inject(Router);
  private authService = inject(AuthService);
  private _ = inject(ThemeService);

  ngOnInit() {
    this.registerForm = this.formBuilder.group({
      email: this.formBuilder.control('', [Validators.required]),
      password: this.formBuilder.control('', [
        Validators.required,
        Validators.minLength(6),
      ]),
    });
  }

  async onSubmit(): Promise<void> {
    await this.authService.login(
      this.registerForm.value.email,
      this.registerForm.value.password
      ).then(
        () => this.router.navigate(['/'])
      )
  }
}

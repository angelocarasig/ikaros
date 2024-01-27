import { ChangeDetectorRef, Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { HlmButtonDirective } from '@spartan-ng/ui-button-helm';
import {
  BrnPopoverCloseDirective,
  BrnPopoverComponent,
  BrnPopoverContentDirective,
  BrnPopoverTriggerDirective,
} from '@spartan-ng/ui-popover-brain';
import { HlmPopoverCloseDirective, HlmPopoverContentDirective } from '@spartan-ng/ui-popover-helm';

import { PublicUser } from "@shared/models/public-user";

import { ThemeSwitchComponent } from '../theme-switch/theme-switch.component';
import { AuthService } from '../../services/auth/auth.service';
import { NavbarLink } from '../../structures/navbar-link.interface';

@Component({
  selector: 'ikaros-navbar',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    HlmButtonDirective,
    BrnPopoverComponent,
    BrnPopoverTriggerDirective,
    BrnPopoverContentDirective,
    BrnPopoverCloseDirective,
    HlmPopoverCloseDirective,
    HlmPopoverContentDirective,

    ThemeSwitchComponent
  ],
  providers: [AuthService],
  template: `
    <nav class='pb-1 p-2 w-screen bg-background border-b-[card-foreground] border-b border-solid flex justify-between'>
      <div class="left-side flex gap-2">
        @if (this.authService.userSignedIn$ | async) {
          @for(route of NavRoutes; track route.href) {
            <button hlmBtn variant='ghost' class='text-accent-foreground'>
              <a [routerLink]="route.href">{{route.name}}</a>
            </button>
          }
        }
      </div>
      <div class="middle-side">
      </div>
      <div class="right-side flex gap-2 align-center">
        @if (userPublicProfile) {
          <div class="flex h-10 overflow-hidden relative rounded-full shrink-0 w-10 cursor-pointer">
            <img [src]="userPublicProfile.pfp" class="aspect-square h-full object-cover w-full" />
          </div>
        }
        @else {
          <button hlmBtn variant='ghost' class='text-accent-foreground'>
            <a routerLink="/login">Login</a>
          </button>
        }

        <ikaros-theme-switch></ikaros-theme-switch>
      </div>
    </nav>
  `,
})
export class NavbarComponent {
  authService = inject(AuthService);
  changeDetector = inject(ChangeDetectorRef);

  userPublicProfile: PublicUser | null = null;
  userAvatarLoaded: boolean = false;

  constructor() {
    this.authService.userPublicProfile$.subscribe({
      next: (value) => {
        this.userPublicProfile = value;
        // For some reason change detection doesn't trigger unless explicitly called
        // Hence refer to userPublicProfile var in template instead of async

        // this.changeDetector.detectChanges();
      }
    })
  }

  NavRoutes: Array<NavbarLink> = [
    { name: 'Home', href: '/'},
    { name: 'Library', href: '/library'},
    { name: 'Profile', href: '/profile'},
    { name: 'Settings', href: '/settings'},
  ]

  async signOut(): Promise<void> {
  }
}

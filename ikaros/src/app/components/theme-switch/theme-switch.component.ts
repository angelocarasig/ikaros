import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HlmButtonDirective } from '@spartan-ng/ui-button-helm';
import { HlmIconComponent } from '@spartan-ng/ui-icon-helm';

import { provideIcons } from '@ng-icons/core';
import { radixSun, radixMoon } from '@ng-icons/radix-icons';

import { ThemeService } from '../../services/theme/theme.service';
import { Theme } from '../../structures/theme.enum';

@Component({
  selector: 'ikaros-theme-switch',
  standalone: true,
  imports: [
    CommonModule,
    HlmButtonDirective,
    HlmIconComponent,
  ],
  providers: [
    provideIcons({radixSun, radixMoon}),
    ThemeService
  ],
  template: `
    <button hlmBtn size="icon" variant="outline" class="text-accent-foreground" (click)="toggleTheme()"><hlm-icon size='sm' [name]="getCurrentTheme()" /></button>
  `,
})
export class ThemeSwitchComponent {
  constructor(private themeService: ThemeService) {}

  toggleTheme(): void {
    this.themeService.toggleTheme();
  }

  getCurrentTheme(): string {
    return this.themeService.currentTheme === Theme.Light ? 'radixSun' : 'radixMoon';
  }
}

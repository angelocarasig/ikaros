import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'ikaros-logo',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div
      class="w-8 h-8"
      [ngStyle]="{
        '-webkit-mask-image': 'url(' + maskUrl + ')',
        'mask-image': 'url(' + maskUrl + ')',
        '-webkit-mask-position': 'center',
        'mask-position': 'center',
        '-webkit-mask-size': 'cover',
        'mask-size': 'cover',
        '-webkit-mask-repeat': 'no-repeat',
        'mask-repeat': 'no-repeat',
      }"
    >
      <div class="w-full h-full bg-foreground"></div>
    </div>
  `,
  styles: `

  `,
})
export class LogoComponent {
  maskUrl = '/assets/logo.png';
}

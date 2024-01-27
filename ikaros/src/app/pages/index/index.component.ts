import { Component } from '@angular/core';
import { NavbarComponent } from '../../components/navbar/navbar.component';

@Component({
  selector: 'ikaros-index',
  standalone: true,
  imports: [NavbarComponent],
  template: `
    <ikaros-navbar/>
    Home Page
  `
})
export class IndexComponent {}

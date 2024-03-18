import { Component } from '@angular/core';
import { AsideDsoundsComponent } from '../AsideComponent/aside-dsounds.component';

@Component({
  selector: 'app-main-layout',
  standalone: true,
  imports: [AsideDsoundsComponent],
  templateUrl: './main-layout.component.html',
  styleUrl: './main-layout.component.css'
})
export class MainLayoutComponent {

}

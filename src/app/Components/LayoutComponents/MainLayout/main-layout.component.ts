import { Component } from '@angular/core';
import { AsideDsoundsComponent } from '../AsideComponent/aside-dsounds.component';
import { HomeMainComponent } from '../HomeMainComponent/home-main/home-main.component';

@Component({
  selector: 'app-main-layout',
  standalone: true,
  imports: [AsideDsoundsComponent, HomeMainComponent],
  templateUrl: './main-layout.component.html',
  styleUrl: './main-layout.component.css'
})
export class MainLayoutComponent {

  
}

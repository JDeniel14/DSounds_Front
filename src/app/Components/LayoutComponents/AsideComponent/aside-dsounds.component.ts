import { Component } from '@angular/core';
import { MenuDsoundsComponent } from '../MenuComponent/menu-dsounds.component';
import { EventsDsoundsComponent } from '../EventsComponent/events-dsounds.component';

@Component({
  selector: 'app-aside-dsounds',
  standalone: true,
  imports: [
    MenuDsoundsComponent,
    EventsDsoundsComponent,


  ],
  templateUrl: './aside-dsounds.component.html',
  styleUrl: './aside-dsounds.component.css'
})
export class AsideDsoundsComponent {

}

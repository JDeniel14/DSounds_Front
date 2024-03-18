import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AsideDsoundsComponent } from './Components/LayoutComponents/AsideComponent/aside-dsounds.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,
    
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'DSounds_Front';
}

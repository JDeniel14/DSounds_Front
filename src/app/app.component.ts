import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AsideDsoundsComponent } from './Components/LayoutComponents/AsideComponent/aside-dsounds.component';
import { initFlowbite } from 'flowbite';
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,

  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit{
  title = 'DSounds_Front';

  ngOnInit(): void {
    initFlowbite();
  }
}

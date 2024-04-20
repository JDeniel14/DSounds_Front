import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AsideDsoundsComponent } from './Components/LayoutComponents/AsideComponent/aside-dsounds.component';
import { initFlowbite } from 'flowbite';
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,
    AsideDsoundsComponent
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit{
  title = 'DSounds_Front';

  ngOnInit(): void {
    initFlowbite();

  }

  public ResizeMenu(ev:Event){
    const menuButton = document.getElementById('menu-button');
    const app = document.getElementById('app');
    const screenWidth = window.innerWidth;


    menuButton?.addEventListener('click', () => {

      let menuExpanded =  menuButton.getAttribute('aria-expanded');
      console.log(menuExpanded)
      if(menuButton.getAttribute('aria-expanded') != 'true'){
       menuExpanded= menuButton.getAttribute('aria-expanded') == 'true' ? "true" : "false";
      console.log(menuExpanded)
      }



      

    });
  }
}

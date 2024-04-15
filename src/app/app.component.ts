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

    // Agregar evento de clic al botón del menú
    menuButton?.addEventListener('click', () => {
      // Verificar si el menú está desplegado o no
      let menuExpanded =  menuButton.getAttribute('aria-expanded');
      if(menuButton.getAttribute('aria-expanded') != 'true'){
       menuExpanded= menuButton.getAttribute('aria-expanded') == 'true' ? "true" : "false";
      console.log(menuExpanded)
      }

      // Cambiar el diseño de la cuadrícula según el estado del menú
      if(screenWidth >= 1002){

        if (menuExpanded == "true") {
          app!.style.gridTemplateAreas = `"aside main main"`;
          app!.style.gridTemplateColumns = "350px 1fr"
        } else {
          app!.style.gridTemplateAreas = `"aside main main"`;
          app!.style.gridTemplateColumns = "50px 1fr"
        }
      }else{
        if (menuExpanded == "true") {
          app!.style.gridTemplateAreas = `"aside aside aside"
                                            "main main main"`;
        } else {
          app!.style.gridTemplateAreas = `"aside aside aside"
          "main main main"`;

        }
      }
    });
  }
}

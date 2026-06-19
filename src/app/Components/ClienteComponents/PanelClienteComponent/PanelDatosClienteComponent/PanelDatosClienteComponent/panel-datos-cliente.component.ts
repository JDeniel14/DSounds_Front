import { Component, OnDestroy, OnInit, inject } from '@angular/core';
import {  NavigationEnd, Router, RouterLink, RouterOutlet } from '@angular/router';

import { Subscription, filter } from 'rxjs';

@Component({
    selector: 'app-panel-datos-cliente',
    imports: [RouterOutlet, RouterLink],
    templateUrl: './panel-datos-cliente.component.html',
    styleUrl: './panel-datos-cliente.component.css'
})
export class PanelDatosClienteComponent {
  private router = inject(Router);



  ObtenerClassEstilo(url:string):string{

    const ruta = this.router.url;

    if(ruta.toUpperCase().match(url)){
      return "activeUrl"
    }else{
      return "";
    }


  }


}

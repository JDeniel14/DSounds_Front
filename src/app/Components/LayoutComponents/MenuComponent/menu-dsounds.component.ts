import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import {ActivatedRoute, NavigationEnd, Router, RouterLink} from '@angular/router'
import ICliente from '../../../Models/ICliente';
import { TOKEN_STORAGE_SERVICE } from '../../../Services/injectionTokenStorageService';
import { IStorageService } from '../../../Models/IStorageService';
import { Observable, Subscription, filter } from 'rxjs';
@Component({
  selector: 'app-menu-dsounds',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './menu-dsounds.component.html',
  styleUrl: './menu-dsounds.component.css'
})
export class MenuDsoundsComponent implements OnInit, OnDestroy{
  public datosCliente : ICliente|null = null;
  private subCliente : Subscription = new Subscription;
  private subUrl:Subscription = new Subscription;
  public urlActual : string = "";
  /**
   *
   */
  constructor(
    @Inject(TOKEN_STORAGE_SERVICE) private storageSvc: IStorageService,
    private router:Router,
    private activatedRouter: ActivatedRoute
  ) {

  }

  ngOnInit(): void {

   this.subUrl = this.router.events.pipe(
    (filter(evento => evento instanceof NavigationEnd))
   ).subscribe(
    (evento)=>{
      if(evento instanceof NavigationEnd){
        this.urlActual = evento.urlAfterRedirects;
        console.log('subruta actual..',this.urlActual)
      }
    }
   )

    this.subCliente = (this.storageSvc.RecuperarDatosCliente() as Observable<ICliente|null>)
                            .subscribe(
                              (datos:ICliente|null)=>{
                                if(datos){
                                  this.datosCliente = datos
                                }
                              }
                            )
  }

  CerrarSesionCliente(){
    this.storageSvc.EliminarDatosClienteStorage();
    window.location.reload();
  }

  ngOnDestroy(): void {
    this.subCliente.unsubscribe();
    this.subUrl.unsubscribe();
  }
}

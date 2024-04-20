import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import {Router, RouterLink} from '@angular/router'
import ICliente from '../../../Models/ICliente';
import { TOKEN_STORAGE_SERVICE } from '../../../Services/injectionTokenStorageService';
import { IStorageService } from '../../../Models/IStorageService';
import { Observable, Subscription } from 'rxjs';
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
  /**
   *
   */
  constructor(
    @Inject(TOKEN_STORAGE_SERVICE) private storageSvc: IStorageService,
    private router:Router
  ) {

  }

  ngOnInit(): void {
    this.subCliente = (this.storageSvc.RecuperarDatosCliente() as Observable<ICliente|null>)
                            .subscribe(
                              (datos:ICliente|null)=>{
                                if(datos){
                                  console.log(datos)
                                  this.datosCliente = datos
                                  console.log(this.datosCliente)
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
  }
}

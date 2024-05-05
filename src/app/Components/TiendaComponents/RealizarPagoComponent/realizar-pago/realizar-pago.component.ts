import { AsyncPipe } from '@angular/common';
import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { Observable, Subscription, map } from 'rxjs';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import IDisco from '../../../../Models/Disco';
import { RestNodeService } from '../../../../Services/rest-node.service';
import { IStorageService } from '../../../../Models/IStorageService';
import { TOKEN_STORAGE_SERVICE } from '../../../../Services/injectionTokenStorageService';
import { DropdownModule } from 'primeng/dropdown';
import ICliente from '../../../../Models/ICliente';

@Component({
  selector: 'app-realizar-pago',
  standalone: true,
  imports: [RouterLink, AsyncPipe, DropdownModule],
  templateUrl: './realizar-pago.component.html',
  styleUrl: './realizar-pago.component.css'
})
export class RealizarPagoComponent implements OnInit, OnDestroy {

  public datosCliente : ICliente | null = null;
  private subCliente : Subscription = new Subscription;

  public listaItemsPedido$!:Observable<{disco:IDisco, cantidadElemento:number}[]>
  public gastosEnvio:number = 2.95;
  public subtotal$!:Observable<number>;


  constructor(private restSvc: RestNodeService,
    @Inject(TOKEN_STORAGE_SERVICE) private storageSvc : IStorageService,
    private router : Router
) {

this.listaItemsPedido$ = storageSvc.RecuperarItemsPedidoCliente();

this.CalcularTotal()

}

ngOnInit(): void {
  this.subCliente = (this.storageSvc.RecuperarDatosCliente() as Observable<ICliente|null>)
                          .subscribe(
                            (datos:ICliente|null)=>{
                              if(datos){
                                this.datosCliente = datos
                              }
                            }
                          )

 
}


CalcularTotal(){
  this.subtotal$=this.listaItemsPedido$.pipe(
    map(
      (items:{ disco:IDisco, cantidadElemento:number}[])=> items.reduce( (suma,item)=> suma + (item.disco.Precio * item.cantidadElemento) ,0)
    )
    );
 }

 ngOnDestroy(): void {
  this.subCliente.unsubscribe();
}
}

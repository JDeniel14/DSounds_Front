import { AsyncPipe } from '@angular/common';
import { Component, Inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Observable, map } from 'rxjs';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import IDisco from '../../../../Models/Disco';
import { RestNodeService } from '../../../../Services/rest-node.service';
import { IStorageService } from '../../../../Models/IStorageService';
import { TOKEN_STORAGE_SERVICE } from '../../../../Services/injectionTokenStorageService';
import { DropdownModule } from 'primeng/dropdown';

@Component({
  selector: 'app-realizar-pago',
  standalone: true,
  imports: [RouterLink, AsyncPipe, DropdownModule],
  templateUrl: './realizar-pago.component.html',
  styleUrl: './realizar-pago.component.css'
})
export class RealizarPagoComponent {

  public listaItemsPedido$!:Observable<{disco:IDisco, cantidadElemento:number}[]>
  public gastosEnvio:number = 2.95;
  public subtotal$!:Observable<number>;


  constructor(private restSvc: RestNodeService,
    @Inject(TOKEN_STORAGE_SERVICE) private storageSvc : IStorageService
) {

this.listaItemsPedido$ = storageSvc.RecuperarItemsPedidoCliente();

this.CalcularTotal()

}


CalcularTotal(){
  this.subtotal$=this.listaItemsPedido$.pipe(
    map(
      (items:{ disco:IDisco, cantidadElemento:number}[])=> items.reduce( (suma,item)=> suma + (item.disco.Precio * item.cantidadElemento) ,0)
    )
    );
 }
}

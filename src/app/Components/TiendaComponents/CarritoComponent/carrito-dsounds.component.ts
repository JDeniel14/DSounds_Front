import { Component, Inject } from '@angular/core';
import { RestNodeService } from '../../../Services/rest-node.service';
import { TOKEN_STORAGE_SERVICE } from '../../../Services/injectionTokenStorageService';
import { IStorageService } from '../../../Models/IStorageService';
import { Observable, map } from 'rxjs';
import IDisco from '../../../Models/Disco';
import { AsyncPipe } from '@angular/common';
import { MiniElementoCarritoComponent } from '../MiniElementoCarritoComponent/mini-elemento-carrito/mini-elemento-carrito.component';

@Component({
  selector: 'app-carrito-dsounds',
  standalone: true,
  imports: [AsyncPipe, MiniElementoCarritoComponent],
  templateUrl: './carrito-dsounds.component.html',
  styleUrl: './carrito-dsounds.component.css'
})
export class CarritoDSoundsComponent {

  public listaItemsPedido$!:Observable<{disco:IDisco, cantidadElemento:number}[]>
  public gastosEnvio:number = 2.95;
  public subtotal$!:Observable<number>;


  constructor(private restSvc: RestNodeService,
              @Inject(TOKEN_STORAGE_SERVICE) private storageSvc : IStorageService
  ) {

    this.listaItemsPedido$ = storageSvc.RecuperarItemsPedidoCliente();

    this.CalcularTotal()

  }

  ModficarItemPedido( item: [ {disco: IDisco, cantidadElemento:number}, string ]){

    let _disco:IDisco=item[0].disco;
    let _cantidad: number=item[0].cantidadElemento;

    switch (item[1]) {
      case 'sumar': _cantidad +=1; break;
      case 'restar': _cantidad -=1; break;
      case 'borrar': _cantidad=0;  break;
    }
    this.storageSvc.OperarItemsPedidoCliente(_disco,_cantidad, item[1] != 'borrar' ? 'modificar' : 'borrar');
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

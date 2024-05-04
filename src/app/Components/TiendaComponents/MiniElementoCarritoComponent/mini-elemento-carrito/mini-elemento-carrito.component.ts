import { Component, EventEmitter, Input, Output } from '@angular/core';
import IDisco from '../../../../Models/Disco';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-mini-elemento-carrito',
  standalone: true,
  imports: [ButtonModule],
  templateUrl: './mini-elemento-carrito.component.html',
  styleUrl: './mini-elemento-carrito.component.css'
})
export class MiniElementoCarritoComponent {

  @Input() public elementoPedido!: {disco:IDisco, cantidadElemento:number};
  @Output() public operarElementoPedidoEvent: EventEmitter<[{disco:IDisco, cantidadElemento:number}, string ]>
                                     = new EventEmitter<[{disco:IDisco, cantidadElemento:number}, string ]>();


  constructor() {

  }

  public OperarElementoPedido(operacion:string){
    this.operarElementoPedidoEvent.emit([this.elementoPedido,operacion]);
  }
}

import { AsyncPipe } from '@angular/common';
import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { Observable, Subscription, map, mergeMap, tap } from 'rxjs';
import IDisco from '../../../../Models/Disco';
import { RestNodeService } from '../../../../Services/rest-node.service';
import { IStorageService } from '../../../../Models/IStorageService';
import { TOKEN_STORAGE_SERVICE } from '../../../../Services/injectionTokenStorageService';
import { DropdownModule } from 'primeng/dropdown';
import ICliente from '../../../../Models/ICliente';
import { IDatosPago } from '../../../../Models/DatosPago';
import { IPedido } from '../../../../Models/Pedido';
import { MiniDatosEnvioComponent } from '../../miniDatosEnvio/mini-datos-envio/mini-datos-envio.component';
import { MiniDatosFacturacionComponent } from '../../MiniDatosFacturacion/mini-datos-facturacion/mini-datos-facturacion.component';
import { MiniDatosPagoComponent } from '../../miniDatosPago/mini-datos-pago/mini-datos-pago.component';
import { IProvincia } from '../../../../Models/Provincia';
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';
@Component({
  selector: 'app-realizar-pago',
  standalone: true,
  imports: [RouterLink, AsyncPipe, DropdownModule, MiniDatosEnvioComponent,
            MiniDatosFacturacionComponent, MiniDatosPagoComponent,
            ToastModule],
  providers:[MessageService],
  templateUrl: './realizar-pago.component.html',
  styleUrl: './realizar-pago.component.css'
})
export class RealizarPagoComponent implements OnInit, OnDestroy {

  public datosCliente : ICliente | null = null;
  private subCliente : Subscription = new Subscription;
  public mostrarFacturacion: boolean = false;

  public listaProvincias$!:Observable<IProvincia[]>;
  public listaItemsPedido$!:Observable<{disco:IDisco, cantidadElemento:number}[]>
  public gastosEnvio:number = 2.95;
  public subtotal$!:Observable<number>;
  public subPedido$:Subscription = new Subscription;
  public pedidoRealizado:boolean = false;

  public datosPago : IDatosPago = {TipoDireccionEnvio : "Principal", TipoDireccionFactura:'IgualEnvio'};

  constructor(private restSvc: RestNodeService,
    @Inject(TOKEN_STORAGE_SERVICE) private storageSvc : IStorageService,
    private router : Router,
    private messageService : MessageService
) {
  this.listaProvincias$=restSvc.RecuperarProvincias();
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

 ShowCompDatosFacturacion(valor:boolean){
  this.mostrarFacturacion=valor;
 }



 async RealizarPedido(){
  if (this.pedidoRealizado ) {
    return;
  }


  let _pedidoCliente :IPedido= {
    _id : "",
    fechaPedido: new Date(Date.now()),
    estadoPedido: 'En preparación',
    gastosEnvio: this.gastosEnvio,
    subtotal :0,
    totalPedido : 0 + this.gastosEnvio,
    datosPago: this.datosPago,
    elementosPedido: []
  }

 this.subPedido$ = this.listaItemsPedido$.pipe(
    tap(
      (items:{disco:IDisco, cantidadElemento:number}[])=>{
        _pedidoCliente.elementosPedido= items;

        let _subtotal = items.reduce((suma,item)=> suma + (item.disco.Precio * item.cantidadElemento),0);
        _pedidoCliente.subtotal = _subtotal;
        _pedidoCliente.totalPedido = _subtotal + this.gastosEnvio;


      }
    )
  ).subscribe();


      console.log('datos a enviar...', {pedido: _pedidoCliente, email:this.datosCliente!.cuenta.email});


      if(_pedidoCliente.elementosPedido.length > 0){
        let _resp=await this.restSvc.RealizarPedido( _pedidoCliente, this.datosCliente!.cuenta.email);

        if(_resp.codigo==0){
          this.pedidoRealizado = true;
          this.messageService.add({ severity: 'success', summary: 'Pedido Realizado', detail: `Pedido realizado correctamente, se te ha enviado un correo con los detalles` });
          this.storageSvc.AlmacenarDatosCliente(_resp.datosCliente!);
          this.storageSvc.AlmacenarJWT(_resp.token!);



            this.storageSvc.LimpiarCarrito();
            this.router.navigateByUrl('/MiCuenta/Pedidos');

        }else{
          this.messageService.add({ severity: 'warn', summary: 'Pedido', detail: `${_resp.mensaje}` });
        }
      }else{
        this.messageService.add({ severity: 'warn', summary: 'Pedido', detail: `El carrito no tiene productos` });
      }

 }

 ngOnDestroy(): void {
  this.subCliente.unsubscribe();
  this.subPedido$.unsubscribe();

}
}

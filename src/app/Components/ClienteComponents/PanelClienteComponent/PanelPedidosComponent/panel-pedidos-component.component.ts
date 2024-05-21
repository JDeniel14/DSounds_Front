import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { CarouselModule } from 'primeng/carousel';
import { ButtonModule } from 'primeng/button';
import { TagModule } from 'primeng/tag';
import { TOKEN_STORAGE_SERVICE } from '../../../../Services/injectionTokenStorageService';
import { IStorageService } from '../../../../Models/IStorageService';
import { Subscription } from 'rxjs';
import ICliente from '../../../../Models/ICliente';
import { IPedido } from '../../../../Models/Pedido';
import { DatePipe } from '@angular/common';
import { RestNodeService } from '../../../../Services/rest-node.service';
@Component({
  selector: 'app-panel-pedidos-component',
  standalone: true,
  imports: [CarouselModule, ButtonModule,TagModule, DatePipe],
  templateUrl: './panel-pedidos-component.component.html',
  styleUrl: './panel-pedidos-component.component.css'
})
export class PanelPedidosComponentComponent implements OnInit, OnDestroy {

  private subCliente : Subscription = new Subscription;
  public datosCliente!:ICliente;
  public pedidosCliente?:IPedido[];
  responsiveOptions: any[] | undefined;

  constructor(@Inject(TOKEN_STORAGE_SERVICE) private storageSvc:IStorageService,
              private restSvc:RestNodeService
  ){
    this.subCliente = this.storageSvc.RecuperarDatosCliente().subscribe(
      (datos)=>{
        this.datosCliente = datos as ICliente;
        if(datos?.pedidos != null){
          this.pedidosCliente = datos.pedidos;
          this.pedidosCliente.forEach(p => {
            const fechaHaceTresMeses = new Date();
            fechaHaceTresMeses.setMonth(fechaHaceTresMeses.getMonth() - 3);

            if(p.fechaPedido >= fechaHaceTresMeses){
              console.log('es vd no es mayor')
              return p;
            }else{
              return;
            }
          })
          this.pedidosCliente.push(this.pedidosCliente[0])
          this.pedidosCliente.push(this.pedidosCliente[0])
          this.pedidosCliente.push(this.pedidosCliente[0])
        }
      }
    );

  }
  ngOnInit(): void {


    this.responsiveOptions = [
      {
          breakpoint: '1400px',
          numVisible: 1,
          numScroll: 1
      },
      {
          breakpoint: '1220px',
          numVisible: 1,
          numScroll: 1
      },
      {
          breakpoint: '1100px',
          numVisible: 1,
          numScroll: 1
      }
  ];
  }



  public SeveridadTag(estado:string){

    if(estado){
      switch(estado.toUpperCase()){
        case "EN PREPARACIÓN":
           return "info"


         case "ENVIADO":
               return "warning";

        case "CANCELADO":
            return "danger";

           default:
           return "";
       }
    }else{
      return;
    }
  }

  public async CancelarPedido(idPedido:string){
    console.log('pedido...',idPedido)
    //TODO: PONER EL ESTADO DEL PEDIDO A CANCELADO EN EL BACK
    let resp =await this.restSvc.CancelarPedido(idPedido);
    if(resp.codigo ===0){
      this.storageSvc.AlmacenarDatosCliente(resp.datosCliente as ICliente);
      //Comprobar si hace falta recuperar de nuevo los datos del cliente
      /*this.subCliente= this.storageSvc.RecuperarDatosCliente().subscribe(
        (datos)=>{
          this.datosCliente = datos as ICliente;
          if(datos?.pedidos != null){
            this.pedidosCliente = datos.pedidos;
            this.pedidosCliente.forEach(p => {
              const fechaHaceTresMeses = new Date();
              fechaHaceTresMeses.setMonth(fechaHaceTresMeses.getMonth() - 3);

              if(p.fechaPedido >= fechaHaceTresMeses){
                console.log('es vd no es mayor')
                return p;
              }else{
                return;
              }
            })
            this.pedidosCliente.push(this.pedidosCliente[0])
            this.pedidosCliente.push(this.pedidosCliente[0])
            this.pedidosCliente.push(this.pedidosCliente[0])
          }
        }
      )*/
    }
  }


  ngOnDestroy(): void {
    this.subCliente.unsubscribe();
  }
}

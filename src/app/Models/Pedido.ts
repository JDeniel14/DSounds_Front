import IDisco from "./Disco";
//import { IDatosPago } from "./datospago";
import { IDireccion } from "./Direccion"


export interface IPedido{
  idPedido: string;
  fechaPedido: Date;
  estadoPedido: string;
  elementosPedido:Array< { disco:    IDisco, cantidadElemento: number } >;
  subtotal: number;
  gastosEnvio: number;
  totalPedido: number;
  //datosPago: IDatosPago;
}

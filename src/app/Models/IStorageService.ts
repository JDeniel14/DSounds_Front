import { Observable } from "rxjs";
import ICliente from "./ICliente";
import IDisco from "./Disco";

export interface IStorageService{

  AlmacenarDatosCliente(datoscliente:ICliente):void;
  RecuperarDatosCliente():Observable<ICliente|null>;
  AlmacenarJWT(jwt:string):void;
  RecuperarJWT():Observable<string>;
  OperarItemsPedidoCliente(disco:IDisco,cantidad:number, operacion:string):void;
  RecuperarItemsPedidoCliente():Observable<{disco:IDisco, cantidadElemento:number}[]>;
  EliminarDatosClienteStorage():void;
}

import ICliente from "./ICliente";

export interface IRestMessage {


  codigo:number;
  mensaje:string;
  error?:string;
  datosCliente?:ICliente;
  token?:string;
  otrosdatos?:any;
}

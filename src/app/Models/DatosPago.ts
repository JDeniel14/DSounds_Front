import { IDireccion } from "./Direccion";

export interface IDatosPago{

  //envio
  TipoDireccionEnvio:string;
  DireccionEnvio?:IDireccion;
  NombreEnvio?:string;
  ApellidosEnvio?:string;
  TelefonoEnvio?:string;
  EmailEnvio?:string;

  //facturacion
  TipoDireccionFactura:string;
  NombreFactura?:string;
  DocFiscalFactura?:string;
  DireccionFactura?:IDireccion;

  //Pago
  NumeroTarjeta?:string;
  NombreBanco?:string;
  MesCaducidad?:number;
  AnioCaducidad?:number;
  CVV?:number;
}

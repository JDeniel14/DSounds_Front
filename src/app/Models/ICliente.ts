import { IDireccion } from "./Direccion";
import { IPedido } from "./Pedido";

export default interface ICliente{
  nombre:string,
  apellidos:string,
  cuenta:{email:string, password:string, imagenAvatarBASE64:string},
  telefono:string,
  direcciones?:IDireccion[],
  pedidos?:IPedido[],
  genero?:string,
  fechaNacimiento?:Date,
  descripcion?:string
}

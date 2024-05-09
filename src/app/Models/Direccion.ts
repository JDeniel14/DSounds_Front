import { IMunicipio } from "./Municipio";
import { IProvincia } from "./Provincia";

export interface IDireccion{
  _id?:  string;
  calle: string,
  cp: string,
  pais: string,
  provincia: IProvincia,
  municipio: IMunicipio,
  esPrincipal: boolean,
  esFacturacion: boolean,

}

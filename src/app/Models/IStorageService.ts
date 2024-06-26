import { Observable } from "rxjs";
import ICliente from "./ICliente";
import IDisco from "./Disco";
import { AuthorizationSpotify } from "./SpotifyModels/authorizationSpotify";
import { ISpotifyProfile } from "./SpotifyModels/SpotifyProfile";
import { IUserPlaylistSpotify } from "./SpotifyModels/UserPlaylistSpotify";

export interface IStorageService{

  AlmacenarDatosCliente(datoscliente:ICliente):void;
  RecuperarDatosCliente():Observable<ICliente|null>;
  AlmacenarJWT(jwt:string):void;
  RecuperarJWT():Observable<string>;
  OperarItemsPedidoCliente(disco:IDisco,cantidad:number, operacion:string):void;
  RecuperarItemsPedidoCliente():Observable<{disco:IDisco, cantidadElemento:number}[]>;
  EliminarDatosClienteStorage():void;
  LimpiarCarrito():void;
  AlmacenarDatosUsuarioSpotify(authorizationSpotify?:AuthorizationSpotify, perfilSpotifyUser?: ISpotifyProfile,playlistSpotifyUser?: IUserPlaylistSpotify):void;
  RecuperarDatosUsuarioSpotify():Observable<{authorizationSpotify?:AuthorizationSpotify, perfilSpotifyUser?: ISpotifyProfile,playlistSpotifyUser?: IUserPlaylistSpotify} | null>;

}

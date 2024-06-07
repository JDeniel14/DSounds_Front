import { Injectable } from '@angular/core';
import { IStorageService } from '../Models/IStorageService';
import { BehaviorSubject, Observable, Subscription } from 'rxjs';
import IDisco from '../Models/Disco';
import ICliente from '../Models/ICliente';
import { CookieService } from 'ngx-cookie-service';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthorizationSpotify } from '../Models/SpotifyModels/authorizationSpotify';
import { ISpotifyProfile } from '../Models/SpotifyModels/SpotifyProfile';
import { IUserPlaylistSpotify } from '../Models/SpotifyModels/UserPlaylistSpotify';

@Injectable({
  providedIn: 'root'
})
export class SubjectStorageService implements IStorageService {

  private _clienteSubject$ : BehaviorSubject<ICliente| null> = new BehaviorSubject<ICliente|null>(null);
  private _jwtSubject$ : BehaviorSubject<string>=new BehaviorSubject<string>('');
  private _discosPedidoSubject$ : BehaviorSubject<{disco:IDisco, cantidadElemento:number}[]> = new BehaviorSubject<{disco:IDisco, cantidadElemento:number}[]>([]);
  private _datosUsuarioSpotify$ : BehaviorSubject<{authorizationSpotify?:AuthorizationSpotify, perfilSpotifyUser?: ISpotifyProfile,playlistSpotifyUser?: IUserPlaylistSpotify}|null> =
                                  new BehaviorSubject<{authorizationSpotify?:AuthorizationSpotify, perfilSpotifyUser?: ISpotifyProfile,playlistSpotifyUser?: IUserPlaylistSpotify} | null>(null);





  constructor( private cookieService:CookieService, private activatedRoute :ActivatedRoute,
              private router : Router
    ) {

    //const cookieClienteExists: boolean = this.cookieService.check('cookieDatosCliente');
    const cookieJWTExists: boolean = this.cookieService.check('cookieJWT');

   /* if(cookieClienteExists){

      const stringDatosCliente = this.cookieService.get('cookieDatosCliente');
      let datosClienteCookie:ICliente|null = null;

      if(stringDatosCliente){
        datosClienteCookie = JSON.parse(stringDatosCliente);
      }


      this._clienteSubject$.next(datosClienteCookie);

    }*/
   let datosClienteCookie: ICliente;
      if (typeof window !== 'undefined' && window.localStorage) {
        datosClienteCookie = JSON.parse(localStorage.getItem('cookieDatosCliente')!) as ICliente;
      this._clienteSubject$.next(datosClienteCookie);
      }

    if(cookieJWTExists){
      const stringCookieJWT = this.cookieService.get('cookieJWT');
      let datosCookieJWT :string = '';

      if(stringCookieJWT){
        datosCookieJWT = JSON.parse(stringCookieJWT);
      }
      this._jwtSubject$.next(datosCookieJWT);
    }






   }
  LimpiarCarrito(): void {
    this._discosPedidoSubject$.next([]);
  }

   AlmacenarDatosCliente(datoscliente: ICliente): void {

    /*const cookieDatosClienteString = this.cookieService.get('cookieDatosCliente');
    let clienteExistente : ICliente|null = null;
    if(cookieDatosClienteString){
      clienteExistente = JSON.parse(cookieDatosClienteString);
    }*/
    let clienteExistente : ICliente = (JSON.parse(localStorage.getItem('cookieDatosCliente')! )) as ICliente;
    const clienteActualizado = {...clienteExistente, ...datoscliente} as ICliente


    //this.cookieService.set('cookieDatosCliente',JSON.stringify(clienteActualizado));
    localStorage.setItem('cookieDatosCliente',JSON.stringify(clienteActualizado));
    this._clienteSubject$.next(clienteActualizado);
  }


  RecuperarDatosCliente(): Observable<ICliente | null> {

    return this._clienteSubject$.asObservable();
  }

  AlmacenarJWT(jwt: string): void {

    this.cookieService.set('cookieJWT', JSON.stringify(jwt));

    this._jwtSubject$.next(jwt);
  }

  RecuperarJWT(): Observable<string> {
    return this._jwtSubject$.asObservable();
  }

  OperarItemsPedidoCliente(disco: IDisco, cantidad: number, operacion: string): void {

    let _posItemPedido = this._discosPedidoSubject$.value.findIndex(
      (item)=> item.disco._id === disco._id
    );

    switch (operacion.toUpperCase()) {
      case 'AÑADIR':

      if(_posItemPedido != -1){
        this._discosPedidoSubject$.value[_posItemPedido].cantidadElemento+=cantidad;
      }else{
        this._discosPedidoSubject$.value.push(
          {
            disco: disco,
            cantidadElemento: 1
          }
        )
      }
        break;

        case 'BORRAR':
        if(_posItemPedido != -1){
          this._discosPedidoSubject$.value.splice(_posItemPedido,1);
        }
        break;

        case 'MODIFICAR':
        if(_posItemPedido != -1){
          this._discosPedidoSubject$.value[_posItemPedido].cantidadElemento = cantidad
          if(this._discosPedidoSubject$.value[_posItemPedido].cantidadElemento == 0){
            this._discosPedidoSubject$.value.splice(_posItemPedido,1);
          }
        }
        break;

      default:
        break;
    }
    console.log(this._discosPedidoSubject$.value)


  }
  RecuperarItemsPedidoCliente(): Observable<{ disco: IDisco, cantidadElemento: number; }[]> {
    return this._discosPedidoSubject$.asObservable();
  }



  AlmacenarDatosUsuarioSpotify(authorizationSpotify?: AuthorizationSpotify,  perfilSpotifyUser?: ISpotifyProfile,playlistSpotifyUser?: IUserPlaylistSpotify): void {

    const datosUsuarioSpotify = this._datosUsuarioSpotify$.value || null;

    const datosUsuarioSpotifyActualizados = {
      ...datosUsuarioSpotify,
      ...(authorizationSpotify && {authorizationSpotify}),
      ...(perfilSpotifyUser && {perfilSpotifyUser}),
      ...(playlistSpotifyUser && {playlistSpotifyUser}),
    }

    this._datosUsuarioSpotify$.next(datosUsuarioSpotifyActualizados);

}
RecuperarDatosUsuarioSpotify(): Observable<{ authorizationSpotify?: AuthorizationSpotify; perfilSpotifyUser?: ISpotifyProfile,playlistSpotifyUser?: IUserPlaylistSpotify } | null> {
  return this._datosUsuarioSpotify$.asObservable();
}



  EliminarDatosClienteStorage(): void {
    //this.cookieService.delete('cookieDatosCliente');
    localStorage.removeItem('cookieDatosCliente')
    this.cookieService.delete('cookieJWT');

    this._clienteSubject$.next(null);
    this._jwtSubject$.next('');
    this._discosPedidoSubject$.next([]);
    this._datosUsuarioSpotify$.next(null);

    setTimeout(() => {
      //Reemplazamos en el historial la ruta anterior por la principal para que no recargue la página a la anterior al cerrar sesión
      history.replaceState(null, '', '/');
      //navegamos a la ruta raiz
      this.router.navigate(['/']);
    }, 1000);

  }

}

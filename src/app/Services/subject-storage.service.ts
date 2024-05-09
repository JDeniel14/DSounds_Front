import { Injectable } from '@angular/core';
import { IStorageService } from '../Models/IStorageService';
import { BehaviorSubject, Observable } from 'rxjs';
import IDisco from '../Models/Disco';
import ICliente from '../Models/ICliente';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})
export class SubjectStorageService implements IStorageService {

  private _clienteSubject$ : BehaviorSubject<ICliente| null> = new BehaviorSubject<ICliente|null>(null);
  private _jwtSubject$ : BehaviorSubject<string>=new BehaviorSubject<string>('');
  private _discosPedidoSubject$ : BehaviorSubject<{disco:IDisco, cantidadElemento:number}[]> = new BehaviorSubject<{disco:IDisco, cantidadElemento:number}[]>([]);

  constructor( private cookieService:CookieService) {

    const cookieClienteExists: boolean = this.cookieService.check('cookieDatosCliente');
    const cookieJWTExists: boolean = this.cookieService.check('cookieJWT');

    if(cookieClienteExists){

      const stringDatosCliente = this.cookieService.get('cookieDatosCliente');
      let datosClienteCookie:ICliente|null = null;

      if(stringDatosCliente){
        datosClienteCookie = JSON.parse(stringDatosCliente);
      }

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

    const cookieDatosClienteString = this.cookieService.get('cookieDatosCliente');
    let clienteExistente : ICliente|null = null;
    if(cookieDatosClienteString){
      clienteExistente = JSON.parse(cookieDatosClienteString);
    }
    const clienteActualizado = {...clienteExistente, ...datoscliente} as ICliente

    this.cookieService.set('cookieDatosCliente',JSON.stringify(clienteActualizado));
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
          if(this._discosPedidoSubject$.value[_posItemPedido].cantidadElemento != 0){
            this._discosPedidoSubject$.value[_posItemPedido].cantidadElemento = cantidad
          }else{
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
  EliminarDatosClienteStorage(): void {
    this.cookieService.delete('cookieDatosCliente');
    this.cookieService.delete('cookieJWT');

    this._clienteSubject$.next(null);
    this._jwtSubject$.next('');
    this._discosPedidoSubject$.next([]);
  }
}

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IRestMessage } from '../Models/irest-message';
import { Observable, last, lastValueFrom } from 'rxjs';
import ICliente from '../Models/ICliente';
import { IProvincia } from '../Models/Provincia';
import { IMunicipio } from '../Models/Municipio';
import { IPedido } from '../Models/Pedido';
import { IDireccion } from '../Models/Direccion';

@Injectable({
  providedIn: 'root'
})
export class RestNodeService {

  constructor(private readonly _httpClient : HttpClient) {

   }

   //#region metodos tienda...
   public GetAllEventsSpain():Promise<IRestMessage>{

    return lastValueFrom(
      this._httpClient.post<IRestMessage>(
        'http://localhost:3003/api/DsoundsInfo/GetAllEventsSpain',
        null,
        { headers: new HttpHeaders({'Content-Type': 'application/json'}) }
      )
      );

   }

   public ObtenerEventoById(idEvento:string):Observable<IRestMessage>{

    return this._httpClient.get<IRestMessage>(
      `http://localhost:3003/api/DsoundsInfo/ObtenerEventoById?idEvento=${idEvento}`,
      { headers: new HttpHeaders({'Content-Type': 'application/json'}) }
    )
   }

   public ObtenerDiscos():Promise<IRestMessage>{

    return lastValueFrom(
      this._httpClient.get<IRestMessage>(
        'http://localhost:3003/api/DsoundsShop/ObtenerDiscos',
        {headers:new HttpHeaders({'Content-Type':'application/json'})}
      )
    )
   }


   public ObtenerDiscoById(idDisco:string):Promise<IRestMessage>{

    return lastValueFrom(
      this._httpClient.get<IRestMessage>(
        `http://localhost:3003/api/DsoundsShop/ObtenerDiscoById?idDisco=${idDisco}`,
        {headers:new HttpHeaders({'Content-Type':'application/json'})}
      )
    )
   }


   public RecuperarProvincias():Observable<IProvincia[]>{
    return this._httpClient.post<IProvincia[]>('http://localhost:3003/api/DsoundsShop/RecuperarProvincias',
        {
          headers: new HttpHeaders({'Content-Type' : 'application/json'})
        }
    )
  }

  public RecuperarMunicipios(codpro:string):Observable<IMunicipio[]>{

    return this._httpClient.get<IMunicipio[]>(`http://localhost:3003/api/DsoundsShop/RecuperarMunicipios?codpro=${codpro}`);
  }

  public RealizarPedido(pedido:IPedido, email:string):Promise<IRestMessage>{

    return lastValueFrom( this._httpClient.post<IRestMessage>(
      'http://localhost:3003/api/DsoundsShop/RealizarPedido',
      {pedido,email},
      {headers: new HttpHeaders({'Content-Type':'application/json'})}

    )
  );
  }


//#endregion

   //#region metodos Cliente...
   public RegistroCliente(datosCliente:ICliente):Promise<IRestMessage>{

    return lastValueFrom(
      this._httpClient.post<IRestMessage>(
        'http://localhost:3003/api/DsoundsClient/Registro',
        datosCliente,
        {headers:new HttpHeaders({'Content-Type':'application/json'})}
      )
    )
   }

   public LoginCliente(cuenta:{mail:String, pass:string}):Observable<IRestMessage>{

    return this._httpClient.post<IRestMessage>(
      'http://localhost:3003/api/DsoundsClient/Login',
      cuenta,
      {headers:new HttpHeaders({'Content-Type':'application/json'})}
    )
   }

   public LoginClienteId(token:string | null):Observable<IRestMessage>{

    return this._httpClient.post<IRestMessage>(
      `http://localhost:3003/api/DsoundsClient/Login?token=${token}`,
            {headers:new HttpHeaders({'Content-Type':'application/json'})}
    )
   }

   public CancelarPedido(idPedido:string):Promise<IRestMessage>{

    return lastValueFrom(
      this._httpClient.get<IRestMessage>(
        `http://localhost:3003/api/DsoundsClient/CancelarPedido?idPedido=${idPedido}`,
        {headers:new HttpHeaders({'Content-Type':'application/json'})}
      )
    )
   }


  ActualizarPassword(passwordActual:string, passwordNueva:string, email:string):Promise<IRestMessage>{

    return lastValueFrom(
      this._httpClient.post<IRestMessage>('http://localhost:3003/api/DsoundsClient/ActualizarPassword',{passwordActual,passwordNueva,email})
    )

  }

  ActualizarDatosCliente(datosNuevosCliente:ICliente, email:string):Promise<IRestMessage>{

    return lastValueFrom(
      this._httpClient.post<IRestMessage>('http://localhost:3003/api/DsoundsClient/ActualizarDatosCliente', {datosNuevosCliente,email})
    )
  }

  OperarDireccionCliente(direccionOperar:IDireccion, operacion:string, email:string):Promise<IRestMessage>{
    return lastValueFrom(
      this._httpClient.post<IRestMessage>('http://localhost:3003/api/DsoundsClient/OperarDireccion',{direccionOperar,operacion,email})
    )
  }

  ObtenerPerfilUsuarioSpotify(access_token:string){
    return lastValueFrom(
      this._httpClient.get(`http://localhost:3003/api/DsoundsSpotify/ObtenerUsuarioSpotify?access_token=${access_token}`)
    )
  }

   //#endregion
}

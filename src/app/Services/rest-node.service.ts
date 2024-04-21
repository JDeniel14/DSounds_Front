import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IRestMessage } from '../Models/irest-message';
import { Observable, last, lastValueFrom } from 'rxjs';
import ICliente from '../Models/ICliente';

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

   //#endregion
}

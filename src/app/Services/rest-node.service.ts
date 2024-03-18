import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IRestMessage } from '../Models/irest-message';
import { lastValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RestNodeService {

  constructor(private readonly _httpClient : HttpClient) {

   }

   public GetAllEventsSpain():Promise<IRestMessage>{

    return lastValueFrom(
      this._httpClient.post<IRestMessage>(
        'http:localhost/3003/api/DsoundsInfo/GetAllEventsSpain',
        {
          headers: new Headers({'Content-Type':'application/json'})
        }
      )
      );

   }
}

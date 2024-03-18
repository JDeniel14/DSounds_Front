import { Component, OnInit } from '@angular/core';
import { IEventsRoot } from '../../../Models/EventsModels/IEventsRoot';
import { RestNodeService } from '../../../Services/rest-node.service';
import { EventCardComponent } from '../event-card/event-card.component';
import {NzSpinModule } from 'ng-zorro-antd/spin'
@Component({
  selector: 'app-events-dsounds',
  standalone: true,
  imports: [
    EventCardComponent,
    NzSpinModule
  ],
  templateUrl: './events-dsounds.component.html',
  styleUrl: './events-dsounds.component.css'
})
export class EventsDsoundsComponent implements OnInit {

  public EventosSpain ?:IEventsRoot ;

  /**
   *
   */
  constructor(private restSvc: RestNodeService) {

  }
  ngOnInit(): void {
    this.GetAllEventsSpain();
  }


  private async GetAllEventsSpain(){

    let resp = await this.restSvc.GetAllEventsSpain();
    if(resp.codigo == 0){
      console.log('datos...',resp)
      this.EventosSpain = resp.otrosdatos;
    }else{
      console.log('Error al obtener los eventos')
    }
  }
}

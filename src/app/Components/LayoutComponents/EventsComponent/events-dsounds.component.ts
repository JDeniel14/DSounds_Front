import { Component, OnInit } from '@angular/core';
import { IEventsRoot } from '../../../Models/EventsModels/IEventsRoot';
import { RestNodeService } from '../../../Services/rest-node.service';
import { EventCardComponent } from '../event-card/event-card.component';
import {NzSkeletonModule } from 'ng-zorro-antd/skeleton'
@Component({
  selector: 'app-events-dsounds',
  standalone: true,
  imports: [
    EventCardComponent,
    NzSkeletonModule
  ],
  templateUrl: './events-dsounds.component.html',
  styleUrl: './events-dsounds.component.css'
})
export class EventsDsoundsComponent implements OnInit {

  public EventosSpain ?:IEventsRoot ;
  public arrLoading:Array<number> = [1,2,3,4]

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

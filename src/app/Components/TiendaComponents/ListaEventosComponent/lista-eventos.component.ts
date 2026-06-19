import { Component, OnInit, inject } from '@angular/core';
import { IEvent } from '../../../Models/EventsModels/IEvent';
import { RestNodeService } from '../../../Services/rest-node.service';
import { NzSkeletonModule } from 'ng-zorro-antd/skeleton';
import { MiniEventoComponent } from '../MiniEventoComponent/mini-evento.component';
import { IEventsRoot } from '../../../Models/EventsModels/IEventsRoot';
@Component({
    selector: 'app-lista-eventos',
    imports: [NzSkeletonModule, MiniEventoComponent],
    templateUrl: './lista-eventos.component.html',
    styleUrl: './lista-eventos.component.css'
})
export class ListaEventosComponent implements OnInit{
  private restSvc = inject(RestNodeService);



  public eventos?: IEventsRoot;

  ngOnInit(): void {
    this.ObtenerEventos();
  }

  async ObtenerEventos(){
    let resp = await this.restSvc.GetAllEventsSpain();

    if(resp.codigo == 0){
        this.eventos = resp.otrosdatos;
        console.log(this.eventos)
    }
  }
}

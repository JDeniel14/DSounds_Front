import { Component, Input } from '@angular/core';
import { IEvent } from '../../../Models/EventsModels/IEvent';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-mini-evento',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './mini-evento.component.html',
  styleUrl: './mini-evento.component.css'
})
export class MiniEventoComponent {

  @Input() Evento!: IEvent;
}

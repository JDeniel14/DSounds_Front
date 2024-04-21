import { Component, Input } from '@angular/core';
import { IEvent } from '../../../Models/EventsModels/IEvent';
import { RouterLink } from '@angular/router';
@Component({
  selector: 'app-event-card',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './event-card.component.html',
  styleUrl: './event-card.component.css'
})
export class EventCardComponent {
  @Input('evento') eventInfo?: IEvent;

}

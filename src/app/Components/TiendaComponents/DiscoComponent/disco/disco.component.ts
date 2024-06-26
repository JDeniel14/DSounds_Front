import { Component, Input } from '@angular/core';
import IDisco from '../../../../Models/Disco';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-disco',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './disco.component.html',
  styleUrl: './disco.component.css'
})
export class DiscoComponent {

  @Input("Disco") disco?:IDisco;
}

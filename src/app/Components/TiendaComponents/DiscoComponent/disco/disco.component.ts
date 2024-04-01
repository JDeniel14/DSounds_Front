import { Component, Input } from '@angular/core';
import IDisco from '../../../../Models/Disco';

@Component({
  selector: 'app-disco',
  standalone: true,
  imports: [],
  templateUrl: './disco.component.html',
  styleUrl: './disco.component.css'
})
export class DiscoComponent {

  @Input("Disco") disco?:IDisco;
}

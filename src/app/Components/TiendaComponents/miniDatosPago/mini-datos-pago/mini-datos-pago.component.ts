import { Component, Input } from '@angular/core';
import { CardModule } from 'primeng/card';
import { InputMaskModule } from 'primeng/inputmask';
import { ButtonModule } from 'primeng/button';
import { IDatosPago } from '../../../../Models/DatosPago';

@Component({
  selector: 'app-mini-datos-pago',
  standalone: true,
  imports: [CardModule,InputMaskModule,ButtonModule],
  templateUrl: './mini-datos-pago.component.html',
  styleUrl: './mini-datos-pago.component.css'
})
export class MiniDatosPagoComponent {
  @Input() tituloPago:string="2. - Datos Pago.";
  @Input()datosPago!:IDatosPago;


   meses:number[]=Array.from({length:12}, (el,pos)=> pos+1);
   
   anios:number[]=Array.from( { length: new Date(Date.now()).getFullYear() - 2000 }, (el,pos)=> pos + 2001 );
}

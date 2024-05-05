import { Component, Input } from '@angular/core';
import { IDatosPago } from '../../../../Models/DatosPago';
import { IProvincia } from '../../../../Models/Provincia';

@Component({
  selector: 'app-mini-datos-facturacion',
  standalone: true,
  imports: [],
  templateUrl: './mini-datos-facturacion.component.html',
  styleUrl: './mini-datos-facturacion.component.css'
})
export class MiniDatosFacturacionComponent {
  @Input()listaProvincias!:IProvincia[];
  @Input()datosPago!:IDatosPago;
}

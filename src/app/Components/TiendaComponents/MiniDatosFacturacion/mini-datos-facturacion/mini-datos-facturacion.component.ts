import { Component, Input, OnChanges } from '@angular/core';
import { IDatosPago } from '../../../../Models/DatosPago';
import { IProvincia } from '../../../../Models/Provincia';
import { IMunicipio } from '../../../../Models/Municipio';
import { Observable } from 'rxjs';
import { RestNodeService } from '../../../../Services/rest-node.service';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-mini-datos-facturacion',
  standalone: true,
  imports: [AsyncPipe],
  templateUrl: './mini-datos-facturacion.component.html',
  styleUrl: './mini-datos-facturacion.component.css'
})
export class MiniDatosFacturacionComponent implements OnChanges{
  @Input()listaProvincias!:IProvincia[];
  @Input()datosPago!:IDatosPago;


  public listaMunicipios$!:Observable<IMunicipio[]>;
  public mismaDirFactura:boolean = true;

  constructor(private restSvc:RestNodeService){

   }

   ngOnChanges(){
    if(this.mismaDirFactura) this.datosPago.DireccionFactura=this.datosPago.DireccionEnvio;
  }

  CargarMunicipios( provSelec:string){

    this.listaMunicipios$=this.restSvc.RecuperarMunicipios(provSelec.split('-')[0]);



    this.datosPago.DireccionFactura!.provincia={CCOM:'', CPRO: provSelec.split('-')[0], PRO: provSelec.split('-')[1] }
  }

  EstableceMunicipio( muniSelec: string){
    console.log(muniSelec)
    this.datosPago.DireccionFactura!.municipio={CUN:'', CPRO: this.datosPago.DireccionFactura!.provincia.CPRO, CMUM:muniSelec.split('-')[0] , DMUN50: muniSelec.split('-')[1] }
  }

  OnChangeDirFacturacion(){
    this.mismaDirFactura = ! this.mismaDirFactura;

    if(this.mismaDirFactura) {
      this.datosPago.DireccionFactura=this.datosPago.DireccionEnvio;
    } else {
      this.datosPago.DireccionFactura={
                                            _id:"",
                                            calle:        '',
                                            pais:         'España',
                                            cp:           "",
                                            provincia:    { CCOM:'', PRO:'', CPRO:''},
                                            municipio:    { CUN:'', CPRO:'', CMUM:'', DMUN50:''},
                                            esPrincipal:  true,
                                            esFacturacion: false,
                                      };


    }
  }
}

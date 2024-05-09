import { Component, EventEmitter, Inject, Input, OnChanges, OnDestroy, Output } from '@angular/core';
import { IDatosPago } from '../../../../Models/DatosPago';
import ICliente from '../../../../Models/ICliente';
import { IDireccion } from '../../../../Models/Direccion';
import { Observable, Subscription } from 'rxjs';
import { IMunicipio } from '../../../../Models/Municipio';
import { RestNodeService } from '../../../../Services/rest-node.service';
import { TOKEN_STORAGE_SERVICE } from '../../../../Services/injectionTokenStorageService';
import { IStorageService } from '../../../../Models/IStorageService';
import { IProvincia } from '../../../../Models/Provincia';
import { AsyncPipe } from '@angular/common';


@Component({
  selector: 'app-mini-datos-envio',
  standalone: true,
  imports: [AsyncPipe],
  templateUrl: './mini-datos-envio.component.html',
  styleUrl: './mini-datos-envio.component.css'
})
export class MiniDatosEnvioComponent implements OnDestroy, OnChanges {
  @Input()listaProvincias!:IProvincia[];
  @Input()datosPago!:IDatosPago;
  @Output() checkDatosFacturacionEvent:EventEmitter<boolean> = new EventEmitter<boolean>();

  public datosCliente!:ICliente | null;
  public direccionprincipal:IDireccion | undefined;
  public listaMunicipios$!:Observable<IMunicipio[]>;

  private datosClienteSubscriptor:Subscription;
  private _dirEnvioIni:IDireccion={
    _id:"",
  calle:        '',
  pais:         'España',
  cp:           "",
  provincia:    { CCOM:'', PRO:'', CPRO:''},
  municipio:    { CUN:'', CPRO:'', CMUM:'', DMUN50:''},
  esPrincipal:  true,
  esFacturacion: false,
};

public checkdirppalenvio:boolean=true;
public checkclienteloggedenvio:boolean=true;


  constructor(@Inject(TOKEN_STORAGE_SERVICE) private storageSvc:IStorageService,
  private restSvc: RestNodeService){


this.datosClienteSubscriptor=(this.storageSvc
                        .RecuperarDatosCliente() as Observable<ICliente|null>)
                        .subscribe( datos => {

                              this.datosCliente=datos;

                              if (this.datosCliente?.direcciones && this.datosCliente.direcciones.length > 0) {
                                this.direccionprincipal=this.datosCliente.direcciones.filter((d:IDireccion)=>d.esPrincipal==true)[0];

                                this.CheckdirPpalEnvio(true)
                                console.log('dirppal..', this.direccionprincipal)
                              } else {

                                  this.checkdirppalenvio=false;
                              }

                            });
}

ngOnChanges(){
  if(!this.checkdirppalenvio){
      this.datosPago.DireccionEnvio=this._dirEnvioIni;
  }
}


CheckdirPpalEnvio(check:boolean){
  this.checkdirppalenvio=check;
  if (check) {
      this.datosPago.TipoDireccionEnvio='principal';
      this.datosPago.DireccionEnvio=this.direccionprincipal;
      console.log(this.datosPago.DireccionEnvio)
  } else {
      this.datosPago.TipoDireccionEnvio='otradireccion';
      this.datosPago.DireccionEnvio=this._dirEnvioIni;

  }

}

CheckClienteLoggedEnvio(check:boolean){
  this.checkclienteloggedenvio=check;
}

ShowComponenteDatosFactura(ev:any){
  this.checkDatosFacturacionEvent.emit(ev.target.checked);
}

CargarMunicipios( provSelec:string){

  this.listaMunicipios$=this.restSvc.RecuperarMunicipios(provSelec.split('-')[0]);



  this.datosPago.DireccionEnvio!.provincia={CCOM:'', CPRO: provSelec.split('-')[0], PRO: provSelec.split('-')[1] }
}

EstableceMunicipio( muniSelec: string){
  this.datosPago.DireccionEnvio!.municipio={CUN:'', CPRO: this.datosPago.DireccionEnvio!.provincia.CPRO, CMUM:muniSelec.split('-')[0] , DMUN50: muniSelec.split('-')[1] }
}

ngOnDestroy(): void {
  this.datosClienteSubscriptor.unsubscribe();
}

}

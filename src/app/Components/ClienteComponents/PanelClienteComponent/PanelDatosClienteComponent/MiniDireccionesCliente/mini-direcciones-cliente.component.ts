import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import ICliente from '../../../../../Models/ICliente';
import { IDireccion } from '../../../../../Models/Direccion';
import { TOKEN_STORAGE_SERVICE } from '../../../../../Services/injectionTokenStorageService';
import { IStorageService } from '../../../../../Models/IStorageService';
import { RestNodeService } from '../../../../../Services/rest-node.service';
import {CardModule} from 'primeng/card'
import { CarouselModule } from 'primeng/carousel';
import { ButtonModule } from 'primeng/button';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ConfirmationService, MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';
import {DialogModule} from 'primeng/dialog'
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { IProvincia } from '../../../../../Models/Provincia';
import { IMunicipio } from '../../../../../Models/Municipio';
import { DropdownModule } from 'primeng/dropdown';
import { InputTextModule } from 'primeng/inputtext';
import { FloatLabelModule } from 'primeng/floatlabel';
@Component({
  selector: 'app-mini-direcciones-cliente',
  standalone: true,
  imports: [CardModule , CarouselModule, ButtonModule, ConfirmDialogModule,
     ToastModule, DialogModule, ReactiveFormsModule, DropdownModule, InputTextModule,
    FloatLabelModule],
  templateUrl: './mini-direcciones-cliente.component.html',
  styleUrl: './mini-direcciones-cliente.component.css',
  providers: [ConfirmationService, MessageService ]
})
export class MiniDireccionesClienteComponent implements OnInit,OnDestroy {

  private subCliente:Subscription = new Subscription;
  public datosCliente!:ICliente;
  public direccionesCliente?: IDireccion[]
  public dirPrincipal?:IDireccion;
  public dirFacturacion?:IDireccion;
  private direccionEditar!:IDireccion;
  public provincias?:IProvincia[]
  public municipios?:IMunicipio[]
  private subProv:Subscription = new Subscription;
  private subMunis:Subscription = new Subscription;

  responsiveOptions: any[] | undefined;

  public direccionOperar?: IDireccion;
  public formDireccion : FormGroup = new FormGroup(
    {
      calle:new FormControl('',[Validators.required]),
      cp: new FormControl('',[Validators.required, Validators.pattern('^[0-9]{5}$')]),
      pais: new FormControl( {value:'España', disabled:true}),
      provincia: new FormControl(),
      municipio: new FormControl()
    }
  );
  public dialogoVisible: boolean = false;
  public operacion: string = "crear";

  constructor(@Inject(TOKEN_STORAGE_SERVICE)private storageSvc:IStorageService,
              private restSvc : RestNodeService,
              private confirmationService: ConfirmationService,
              private messageService: MessageService
              ) {

  }
  ngOnInit(): void {
    this.subCliente = this.storageSvc.RecuperarDatosCliente().subscribe(
      (datos)=>{
        this.datosCliente = datos as ICliente;
        this.direccionesCliente = this.datosCliente.direcciones

        this.dirPrincipal = this.direccionesCliente?.find(d => d.esPrincipal )
        this.dirFacturacion = this.direccionesCliente?.find(d => d.esFacturacion)
      }
    )

    this.responsiveOptions = [
      {
          breakpoint: '400px',
          numVisible: 1,
          numScroll: 1
      },

  ];

    this.RecuperarProvincias()

  }


  async EliminarDireccion(event:Event, id:string){
    console.log('evento eliminar direccion...', id)
    //TODO : LLAMAR A REST Y BORRAR LA DIRECCION
    this.confirmationService.confirm({
            target: event.target as EventTarget,
            message: `¿Seguro que quiere eliminar la dirección con id ${id}?`,
            header: 'Confirmación',
            icon: 'pi pi-exclamation-triangle',
            acceptIcon:"none",
            rejectIcon:"none",
            acceptLabel: 'Sí',
            rejectLabel: 'No',
            rejectButtonStyleClass:"p-button-text",
            accept: async() => {
              let dirBorrar = this.direccionesCliente?.find(d => d._id == id) as IDireccion;
              let resp = await this.restSvc.OperarDireccionCliente(dirBorrar,'ELIMINAR', this.datosCliente.cuenta.email);
              if(resp.codigo == 0){
                this.storageSvc.AlmacenarDatosCliente(resp.datosCliente as ICliente);

                this.messageService.add({ severity: 'success', summary: 'Confirmación', detail: `La dirección con id ${id} se ha eliminado` });
              }else{
                this.messageService.add({ severity: 'info', summary: 'Confirmación', detail: resp.mensaje });
              }
            },

        });

  }

  MostrarDialogoDireccion(operacion:string,id?:string){
    this.dialogoVisible = true;
    this.operacion = operacion;
    if(operacion.toUpperCase() == 'MODIFICAR'){
      this.direccionEditar = this.direccionesCliente?.find(d => d._id == id) as IDireccion;
      let provDir = this.direccionEditar?.provincia.CPRO;
      this.formDireccion.controls['calle'].setValue(this.direccionEditar?.calle);
      this.formDireccion.controls['cp'].setValue(this.direccionEditar!.cp)
      this.formDireccion.controls['pais'].setValue(this.direccionEditar!.pais)
      this.formDireccion.controls['provincia'].setValue(this.direccionEditar!.provincia.CPRO+'-'+this.direccionEditar!.provincia.PRO)

      this.RecuperarMunicipios(provDir as string)
      setTimeout(
        () => this.formDireccion.controls['municipio'].setValue(this.direccionEditar!.municipio.CMUM+'-'+this.direccionEditar!.municipio.DMUN50),
        1000);
    }
  }

  async CrearModificarDireccion(){
    console.log(this.formDireccion.value)


    if(this.operacion.toUpperCase() == 'CREAR'){
      this.direccionOperar= {
        calle : this.formDireccion.get('calle')?.value,
        cp: this.formDireccion.get('cp')?.value,
        pais : this.formDireccion.get('pais')?.value,
        municipio:{
          CMUM:this.formDireccion.get('municipio')?.value.split('-')[0],
          DMUN50:this.formDireccion.get('municipio')?.value.split('-')[1],
          CPRO:this.formDireccion.get('provincia')?.value.split('-')[1],
          CUN:''
        },
        provincia:{
          CCOM:'',
          CPRO:this.formDireccion.get('provincia')?.value.split('-')[0],
          PRO:this.formDireccion.get('provincia')?.value.split('-')[1],
        },
        esFacturacion:false,
        esPrincipal:false
      }
    }else{
      this.direccionOperar= {
        _id: this.direccionEditar._id,
        calle : this.formDireccion.get('calle')?.value,
        cp: this.formDireccion.get('cp')?.value,
        pais : this.formDireccion.get('pais')?.value,
        municipio:{
          CMUM:this.formDireccion.get('municipio')?.value.split('-')[0],
          DMUN50:this.formDireccion.get('municipio')?.value.split('-')[1],
          CPRO:this.formDireccion.get('provincia')?.value.split('-')[1],
          CUN:''
        },
        provincia:{
          CCOM:'',
          CPRO:this.formDireccion.get('provincia')?.value.split('-')[0],
          PRO:this.formDireccion.get('provincia')?.value.split('-')[1],
        },
        esFacturacion:this.direccionEditar.esFacturacion,
        esPrincipal:this.direccionEditar.esPrincipal
      }
    }

    console.log(this.direccionOperar)
    let resp = await this.restSvc.OperarDireccionCliente(this.direccionOperar,this.operacion.toUpperCase(), this.datosCliente.cuenta.email);
    if(resp.codigo == 0){
      this.storageSvc.AlmacenarDatosCliente(resp.datosCliente as ICliente);
      this.messageService.add({ severity: 'success', summary: 'Confirmación', detail: resp.mensaje });
    }else{
      this.messageService.add({ severity: 'warn', summary: 'Confirmación', detail: resp.mensaje });
    }
    this.dialogoVisible = false;
    this.LimpiarFormulario();
  }

  LimpiarFormulario(){
    this.dialogoVisible = false;
    this.formDireccion.reset();
    this.formDireccion.controls['pais'].setValue('España');
  }

  async RecuperarProvincias(){
   this.subProv = await this.restSvc.RecuperarProvincias().subscribe(
      (provs)=>{
        this.provincias = provs
      }
    );
  }

  async RecuperarMunicipios(cpro:string){
    this.subMunis = await this.restSvc.RecuperarMunicipios(cpro).subscribe(
      (munis)=>{
        this.municipios = munis;
      }
    )
  }

  ngOnDestroy(): void {
    this.subCliente.unsubscribe();
    this.subProv.unsubscribe();
    this.subMunis.unsubscribe();
  }
}

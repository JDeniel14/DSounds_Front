import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import ICliente from '../../../../../Models/ICliente';
import { TOKEN_STORAGE_SERVICE } from '../../../../../Services/injectionTokenStorageService';
import { IStorageService } from '../../../../../Models/IStorageService';
import { RestNodeService } from '../../../../../Services/rest-node.service';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { FloatLabelModule } from 'primeng/floatlabel';
import { DropdownModule } from 'primeng/dropdown';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { CalendarModule } from 'primeng/calendar';
//import { PrimeNGConfig } from 'primeng/api';
import { InputMaskModule } from 'primeng/inputmask';
import { MessageService } from 'primeng/api';
import {ToastModule} from 'primeng/toast'
@Component({
  selector: 'app-mini-datos-personales',
  standalone: true,
  imports: [ReactiveFormsModule, FloatLabelModule, InputTextModule, DropdownModule, ButtonModule,
            CalendarModule,InputMaskModule, ToastModule
  ],
  templateUrl: './mini-datos-personales.component.html',
  styleUrl: './mini-datos-personales.component.css',
  providers:[ MessageService]
})
export class MiniDatosPersonalesComponent implements OnInit, OnDestroy {

  private subCliente:Subscription = new Subscription;
  public generosOptions = [
    { label: 'Masculino', value: 'Masculino' },
    { label: 'Femenino', value: 'Femenino' },
    { label: 'Mujer trans', value: 'Mujer trans' },
    { label: 'Hombre trans', value: 'Hombre trans' },
    { label: 'No binario', value: 'No binario' },
    { label: 'Preferiría no decirlo', value: 'Preferiría no decirlo' }
  ];
  public datosCliente!:ICliente;
  private clienteInicial!:ICliente;
  private copiaCliente!:ICliente;
  public datosForm:FormGroup = new FormGroup(
    {
      email: new FormControl('' , [Validators.required, Validators.email]),
      nombre: new FormControl( '', [Validators.required, Validators.maxLength(150)]),
      apellidos: new FormControl( '', [Validators.required, Validators.maxLength(250)]),
      telefono: new FormControl('', [Validators.required, Validators.pattern(/^\d{3}\s\d{3}\s\d{3}$/)]),
      genero: new FormControl(  ''),
      fechaNacimiento : new FormControl('')
    }
  );

 /* public es: any = {
    firstDayOfWeek: 1,
    dayNames: ["domingo","lunes","martes","miércoles","jueves","viernes","sábado"],
    dayNamesShort: ["dom","lun","mar","mié","jue","vie","sáb"],
    dayNamesMin: ["D","L","M","X","J","V","S"],
    monthNames: [ "enero","febrero","marzo","abril","mayo","junio","julio","agosto","septiembre","octubre","noviembre","diciembre" ],
    monthNamesShort: [ "ene","feb","mar","abr","may","jun","jul","ago","sep","oct","nov","dic" ],
    today: 'Hoy',
    clear: 'Borrar'
  };*/

  constructor(@Inject(TOKEN_STORAGE_SERVICE) private storageSvc:IStorageService,
              private restSvc:RestNodeService,
              //private config:PrimeNGConfig,
              private messageService:MessageService
) {

  }



  ngOnInit(): void {
    //this.config.setTranslation(this.es);
    this.subCliente = this.storageSvc.RecuperarDatosCliente().subscribe(
      (datos)=>{
        this.datosCliente = datos as ICliente;
        this.copiaCliente = this.datosCliente;
        this.clienteInicial = JSON.parse(JSON.stringify(this.datosCliente as ICliente));
                    this.datosForm.controls['email'].setValue(this.datosCliente?.cuenta.email);
                    this.datosForm.controls['nombre'].setValue(this.datosCliente?.nombre);
                    this.datosForm.controls['apellidos'].setValue(this.datosCliente?.apellidos);
                    this.datosForm.controls['telefono'].setValue(this.datosCliente?.telefono);
                    this.datosForm.controls['genero'].setValue(this.datosCliente?.genero);
                    this.datosForm.controls['fechaNacimiento'].setValue(this.datosCliente?.fechaNacimiento);
      }
    )
  }

  async ModificarDatosCliente(){
    console.log(this.datosForm)
    if(this.datosForm.valid){
      console.log(this.datosForm.value)

      this.copiaCliente.cuenta.email = this.datosForm.get('email')?.value;
      this.copiaCliente.telefono = this.datosForm.get('telefono')?.value;
      this.copiaCliente.nombre = this.datosForm.get('nombre')?.value;
      this.copiaCliente.apellidos = this.datosForm.get('apellidos')?.value;
      this.copiaCliente.genero = this.datosForm.get('genero')?.value.label != undefined ? this.datosForm.get('genero')?.value.label : this.datosCliente.genero;

      this.copiaCliente .fechaNacimiento= new Date(this.datosForm.get('fechaNacimiento')?.value)

      console.log('datos nuevos...', this.copiaCliente)
      //TODO: MANDAR DATOS AL REST Y QUE EN EL BACK ACTUALICE EL CLIENTE
      /*let resp = await this.restSvc.ActualizarDatosCliente(this.copiaCliente, this.datosCliente.cuenta.email);

      if(resp.codigo==0){
        //TODO: GUARDAR DATOS EN EL STORAGE Y MOSTRAR MENSAJE SERVER

        this.storageSvc.AlmacenarDatosCliente(resp.datosCliente as ICliente);
        this.storageSvc.AlmacenarJWT(resp.token as string);

        this.messageService.add({ severity: 'success', summary: 'Actualización de tus datos', detail: `${resp.mensaje}` });
      }else{
        this.messageService.add({ severity: 'warn', summary: 'Actualización de tus datos', detail: `${resp.mensaje}` });
      }*/

    }
  }



    ngOnDestroy(): void {
      this.datosCliente = this.clienteInicial
      this.subCliente.unsubscribe();
    }


}

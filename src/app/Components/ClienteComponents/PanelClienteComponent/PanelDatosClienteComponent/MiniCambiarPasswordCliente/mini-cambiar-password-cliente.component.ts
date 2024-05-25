import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { compareToValidator } from '../../../../../Validators/compareTo';
import { TOKEN_STORAGE_SERVICE } from '../../../../../Services/injectionTokenStorageService';
import { IStorageService } from '../../../../../Models/IStorageService';
import { RestNodeService } from '../../../../../Services/rest-node.service';
import { PasswordModule } from 'primeng/password';
import {FloatLabelModule} from 'primeng/floatlabel';
import { ButtonModule } from 'primeng/button';
import ICliente from '../../../../../Models/ICliente';
import { MessageService } from 'primeng/api';
import {ToastModule} from 'primeng/toast'
import { Subscription } from 'rxjs';
@Component({
  selector: 'app-mini-cambiar-password-cliente',
  standalone: true,
  imports: [ReactiveFormsModule, PasswordModule, FloatLabelModule,ButtonModule, ToastModule],
  templateUrl: './mini-cambiar-password-cliente.component.html',
  styleUrl: './mini-cambiar-password-cliente.component.css',
  providers:[MessageService]
})
export class MiniCambiarPasswordClienteComponent implements OnInit,OnDestroy {

  private datosCliente !: ICliente;
  private subCliente : Subscription = new Subscription;

  public datosForm: FormGroup = new FormGroup({
    passwordActual: new FormControl('', [
      Validators.required,
      Validators.pattern(
        '^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{5,}$'
      ),
      Validators.minLength(5),
      Validators.maxLength(12),
    ]),

    nuevaPassword: new FormControl('', [
      Validators.required,
      Validators.pattern(
        '^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{5,}$'
      ),
      Validators.minLength(5),
      Validators.maxLength(12),
    ]),

    repetirPassword: new FormControl('', [
      Validators.required,
      Validators.pattern(
        '^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{5,}$'
      ),
      Validators.minLength(5),
      Validators.maxLength(12),
      compareToValidator('nuevaPassword'),
    ]),
  });

  /**
   *
   */
  constructor(@Inject(TOKEN_STORAGE_SERVICE) private storageSvc: IStorageService,
              private restSvc:RestNodeService,
            private messageService: MessageService) {

  }

  ngOnInit(): void {
    this.subCliente = this.storageSvc.RecuperarDatosCliente().subscribe(
      (datos)=>{
        this.datosCliente = datos as ICliente;
        
      }
    )
  }

  async ModificarPassword(){

    if(this.datosForm.valid){
      let passwordActual = this.datosForm.get('passwordActual')?.value;
      let passwordNueva = this.datosForm.get('nuevaPassword')?.value;
      let resp = await this.restSvc.ActualizarPassword(passwordActual,passwordNueva, this.datosCliente.cuenta.email);
      this.datosForm.reset();
      if(resp.codigo == 0){
        this.storageSvc.AlmacenarDatosCliente(resp.datosCliente as ICliente);
        this.storageSvc.AlmacenarJWT(resp.token as string);

        this.messageService.add({ severity: 'success', summary: 'Cambio de contraseña', detail: `${resp.mensaje}` });
      }else{
        this.messageService.add({ severity: 'warn', summary: 'Cambio de contraseña', detail: `${resp.mensaje}` });
      }
    }
  }
  ngOnDestroy(): void {
    this.subCliente.unsubscribe()

  }
}

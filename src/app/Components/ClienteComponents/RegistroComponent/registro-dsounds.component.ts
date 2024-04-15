import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterLink } from '@angular/router';
import ICliente from '../../../Models/ICliente';
import { RestNodeService } from '../../../Services/rest-node.service';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';
import Swal from 'sweetalert2';
import { compareToValidator } from '../../../Validators/compareTo';
@Component({
  selector: 'app-registro-dsounds',
  standalone: true,
  imports: [ ReactiveFormsModule, RouterLink, SweetAlert2Module],
  templateUrl: './registro-dsounds.component.html',
  styleUrl: './registro-dsounds.component.css'
})
export class RegistroDsoundsComponent {
  private datosCliente?:ICliente;
  public formRegistro: FormGroup = new FormGroup(
    {
      nombre: new FormControl('', [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(50),
      ]),
      apellidos: new FormControl('', [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(200),
      ]),
      email: new FormControl('', [Validators.required, Validators.email]), //<---- validador asincrono para comprobar q no exista ya el email
      repemail: new FormControl('', [
        Validators.required,
        Validators.email,
        compareToValidator('email'),
      ]),
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(5),
        Validators.pattern(
          '^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{5,}$'
        ),
      ]),
      repassword: new FormControl('', [
        Validators.required,
        Validators.minLength(5),
        Validators.pattern(
          '^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{5,}$'
        ),
        compareToValidator('password'),
      ]),
      login: new FormControl('', [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(25),
      ]),
    }
  )


/**
 *
 */
constructor(private restSvc:RestNodeService) {

}

  async registroCliente(){
    if(this.formRegistro.valid){
      console.log(this.formRegistro.value)


      let resp = await this.restSvc.RegistroCliente(this.formRegistro.value)

      if(resp.codigo == 0){
        console.log('registro realizado correctamente..')
        Swal.fire(
          {
            title:'Registro',
            text:'Se te ha enviado un correo para activar tu cuenta',
            icon:'info',
            toast:true,
            confirmButtonText:'Aceptar',
            focusConfirm:true,
            animation:true,
            allowEnterKey:true,
            confirmButtonColor:'#5d0b41',
            timer:10000

          }
        )
      }

    }else{
      console.log(this.formRegistro)
    }
  }
}

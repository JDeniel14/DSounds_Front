import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterLink } from '@angular/router';
import ICliente from '../../../Models/ICliente';

@Component({
  selector: 'app-registro-dsounds',
  standalone: true,
  imports: [ ReactiveFormsModule, RouterLink],
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
        //compareToValidator('email'),
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
        //compareToValidator('password'),
      ]),
      login: new FormControl('', [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(25),
      ]),
    }
  )


  registroCliente(){
    if(this.formRegistro.valid){
      console.log(this.formRegistro.value)


    }
  }
}

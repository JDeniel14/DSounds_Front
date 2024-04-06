import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-login-dsounds',
  standalone: true,
  imports: [RouterLink, ReactiveFormsModule],
  templateUrl: './login-dsounds.component.html',
  styleUrl: './login-dsounds.component.css'
})
export class LoginDsoundsComponent {

  public formLogin : FormGroup = new FormGroup(
    {
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('',
      [Validators.required,
        Validators.pattern( '^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{5,}$'),
      Validators.minLength(5),
    Validators.maxLength(12)])
    }
  )

  loguearCliente(){

    if(this.formLogin.valid){
      console.log(this.formLogin.value)
    }else{
      console.log('no valido')
      console.log(this.formLogin.controls['email'])
    }
  }

}

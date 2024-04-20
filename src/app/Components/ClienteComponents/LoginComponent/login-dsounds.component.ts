import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, ParamMap, RouterLink ,Router} from '@angular/router';
import ICliente from '../../../Models/ICliente';
import { RestNodeService } from '../../../Services/rest-node.service';
import { Subscription, switchMap, tap } from 'rxjs';
import { IRestMessage } from '../../../Models/irest-message';
import Swal from 'sweetalert2';
import { TOKEN_STORAGE_SERVICE } from '../../../Services/injectionTokenStorageService';
import { IStorageService } from '../../../Models/IStorageService';

@Component({
  selector: 'app-login-dsounds',
  standalone: true,
  imports: [RouterLink, ReactiveFormsModule],
  templateUrl: './login-dsounds.component.html',
  styleUrl: './login-dsounds.component.css'
})
export class LoginDsoundsComponent implements OnInit, OnDestroy{

  private clienteRedirigidoActivo?:ICliente;
  private jwt? : string;
  private subParams:Subscription;
  private mensajeServer?:string;
  private errorServer?:string;

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


  /**
   *
   */
  constructor(private restSvc:RestNodeService,
              private router:Router,
              private activatedRoute: ActivatedRoute,
              @Inject(TOKEN_STORAGE_SERVICE) private storageSvc: IStorageService
  ) {
    this.subParams = new Subscription();

  }



  ngOnInit(): void {
    this.subParams = this.activatedRoute.queryParamMap
                          .pipe(
                            tap((params:ParamMap)=>
                              console.log('parámetros obtenidos de la ruta...',params)
                            ),
                            switchMap((params:ParamMap)=>
                            {
                              let token:string | null = params.get('token');
                              console.log(token)
                              return this.restSvc.LoginClienteId(token);
                            })
                          ).subscribe(
                            (resp:IRestMessage)=>{
                              if(resp.codigo == 0){
                                this.clienteRedirigidoActivo = resp.datosCliente as ICliente;
                                this.jwt = resp.token;
                                this.mensajeServer = resp.mensaje;
                                this.errorServer=resp.error;


                                this.storageSvc.AlmacenarDatosCliente(this.clienteRedirigidoActivo)
                                this.storageSvc.AlmacenarJWT(this.jwt as string)


                                let mensajeAlerta = this.errorServer ? this.mensajeServer+', '+this.errorServer : this.mensajeServer;
                                Swal.fire(
                                  {
                                    title:'Login',
                                    text:mensajeAlerta,
                                    icon:'info',
                                    toast:true,
                                    confirmButtonText:'Aceptar',
                                    focusConfirm:true,
                                    animation:true,
                                    allowEnterKey:true,
                                    confirmButtonColor:'#5d0b41',
                                    timer:5000

                                  }
                                )
                                this.router.navigateByUrl('/Home');
                              }else{
                                this.mensajeServer=resp.mensaje;
                              }
                            }
                          )


  }
  loguearCliente(){


      if(this.formLogin.valid){
        console.log(this.formLogin.value)

        this.restSvc.LoginCliente(this.formLogin.value).subscribe(
          (resp:IRestMessage)=>{
            if(resp.codigo == 0){
              
             let _datosCliente = resp.datosCliente as ICliente;

              this.jwt = resp.token;
              this.mensajeServer = resp.mensaje;
              this.errorServer = resp.error;

              this.storageSvc.AlmacenarDatosCliente(_datosCliente);
              this.storageSvc.AlmacenarJWT(this.jwt as string);

              let mensajeAlerta = this.errorServer
                ? this.mensajeServer + ', ' + this.errorServer
                : this.mensajeServer;
              Swal.fire({
                title: 'Login',
                text: mensajeAlerta,
                icon: 'info',
                toast: true,
                confirmButtonText: 'Aceptar',
                focusConfirm: true,
                animation: true,
                allowEnterKey: true,
                confirmButtonColor: '#5d0b41',
                timer: 10000,
              });

              this.router.navigateByUrl('/Home');
            }else{
              this.mensajeServer=resp.mensaje;
            }
          }
        );


      }else{
        console.log('no valido')
        console.log(this.formLogin.controls['email'])
      }

  }

  ngOnDestroy(): void {
    if(this.subParams){
      this.subParams.unsubscribe();
    }
  }
}

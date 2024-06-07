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
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';
@Component({
  selector: 'app-login-dsounds',
  standalone: true,
  imports: [RouterLink, ReactiveFormsModule, ToastModule],
  templateUrl: './login-dsounds.component.html',
  styleUrl: './login-dsounds.component.css',
  providers:[MessageService]
})
export class LoginDsoundsComponent implements OnInit, OnDestroy{

  private clienteRedirigidoActivo?:ICliente;
  private jwt? : string;
  private subParams:Subscription;
  private mensajeServer?:string;
  private errorServer?:string;
  private subLogin$:Subscription = new Subscription;

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
              @Inject(TOKEN_STORAGE_SERVICE) private storageSvc: IStorageService,
              private messageService : MessageService
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

                                this.messageService.add({ severity: 'info', summary: 'Login', detail: `${mensajeAlerta}}` });
                                this.router.navigateByUrl('/Home');
                              }else{
                                this.messageService.add({ severity: 'warn', summary: 'Login', detail: `${resp.mensaje}}` });
                              }
                            }
                          )


  }
  loguearCliente(){


      if(this.formLogin.valid){
        console.log(this.formLogin.value)

     this.subLogin$ =   this.restSvc.LoginCliente(this.formLogin.value).subscribe(
          (resp:IRestMessage)=>{
            console.log(resp)
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

              this.messageService.add({ severity: 'info', summary: 'Login', detail: `${mensajeAlerta}, redirigiendo a inicio` });
              setTimeout(()=>{
                this.router.navigateByUrl('/Home');
              },2000)
            }else{

              this.messageService.add({ severity: 'warn', summary: 'Login', detail: `${resp.error}}` });
            }
          },
          (error) => {
            let errorMsg = error.error?.mensaje || 'Error en la solicitud al servidor';
            let errorDetail = error.error?.error || 'No se pudo conectar con el servidor';
            this.messageService.add({
              severity: 'error',
              summary: 'Login',
              detail: `${errorMsg}: ${errorDetail}`
            });
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
    this.subLogin$.unsubscribe();
  }
}

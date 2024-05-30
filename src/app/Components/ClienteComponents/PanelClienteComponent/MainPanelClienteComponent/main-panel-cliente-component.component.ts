import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import ICliente from '../../../../Models/ICliente';
import { TOKEN_STORAGE_SERVICE } from '../../../../Services/injectionTokenStorageService';
import { IStorageService } from '../../../../Models/IStorageService';
import { IPedido } from '../../../../Models/Pedido';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { formatDate } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { AuthorizationSpotify } from '../../../../Models/SpotifyModels/authorizationSpotify';
import { ISpotifyProfile } from '../../../../Models/SpotifyModels/SpotifyProfile';

@Component({
  selector: 'app-main-panel-cliente-component',
  standalone: true,
  imports: [ CardModule, ButtonModule, RouterLink ],
  templateUrl: './main-panel-cliente-component.component.html',
  styleUrl: './main-panel-cliente-component.component.css'
})
export class MainPanelClienteComponentComponent implements OnInit, OnDestroy {

  public datosCliente?:ICliente ;
  public ultimoPedido?:IPedido;
  public fechaPedidoFormateada?:string;
  public authorizationSpotify: AuthorizationSpotify  = {access_token:'',refresh_token:''};
  public perfilSpotifyUser?:ISpotifyProfile;


  private subCliente :Subscription = new Subscription;
  private subParams: Subscription = new Subscription;
  /**
   *
   */
  constructor(@Inject(TOKEN_STORAGE_SERVICE) private storageSvc:IStorageService,
              private activatedRoute: ActivatedRoute
) {


  }
  ngOnInit(): void {
    this.subCliente = this.storageSvc.RecuperarDatosCliente().subscribe(
      (datos)=>{
        if(datos){
          this.datosCliente = datos as ICliente;
          if(datos!.pedidos!.length > 0){
            this.ultimoPedido = datos.pedidos![datos.pedidos!.length -1]
            this.fechaPedidoFormateada = formatDate(this.ultimoPedido.fechaPedido, "dd 'de ' MMMM 'de' yyyy",'es')
          }
        }
      }
    )

        console.log('datos del cliente recuperados...', this.datosCliente)
        console.log('ultimo pedido...', this.ultimoPedido)


        this.subParams = this.activatedRoute.queryParams.subscribe(
          params => {
            let accessToken = params['access_token']
            let refreshToken = params['refresh_token']

            if(accessToken && refreshToken){
              this.authorizationSpotify.access_token = accessToken;
              this.authorizationSpotify.refresh_token = refreshToken;
              //Todo: Guardar en memoria estos datos

              console.log('parametros spotify..', this.authorizationSpotify?.access_token, this.authorizationSpotify?.refresh_token)
            }
          }
        )


  }

  LoguearSpotify(){
    window.location.href="http://localhost:3003/api/DsoundsSpotify/LoginSpotify"
  }


  ngOnDestroy(): void {
    this.subCliente.unsubscribe();
    this.subParams.unsubscribe();
  }

}

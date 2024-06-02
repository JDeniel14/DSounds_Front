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
import {AvatarModule} from 'primeng/avatar'
import { RestNodeService } from '../../../../Services/rest-node.service';
import { IUserPlaylistSpotify } from '../../../../Models/SpotifyModels/UserPlaylistSpotify';
@Component({
  selector: 'app-main-panel-cliente-component',
  standalone: true,
  imports: [ CardModule, ButtonModule, RouterLink, AvatarModule ],
  templateUrl: './main-panel-cliente-component.component.html',
  styleUrl: './main-panel-cliente-component.component.css'
})
export class MainPanelClienteComponentComponent implements OnInit, OnDestroy {

  public datosCliente?:ICliente ;
  public ultimoPedido?:IPedido;
  public fechaPedidoFormateada?:string;
  public authorizationSpotify: AuthorizationSpotify  = {access_token:'',refresh_token:''};
  public perfilSpotifyUser?:ISpotifyProfile;
  public playlistSpotifyUser?:IUserPlaylistSpotify;

  private subCliente :Subscription = new Subscription;
  private subParams: Subscription = new Subscription;
  private subUsuarioSpotify:Subscription= new Subscription;
  /**
   *
   */
  constructor(@Inject(TOKEN_STORAGE_SERVICE) private storageSvc:IStorageService,
              private activatedRoute: ActivatedRoute,
              private restSvc: RestNodeService
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
              if(this.authorizationSpotify.access_token){
                this.storageSvc.AlmacenarDatosUsuarioSpotify(this.authorizationSpotify)
                this.ObtenerPerfilUsuarioSpotify();
                console.log('parametros spotify..', this.authorizationSpotify?.access_token, this.authorizationSpotify?.refresh_token)
              }
            }else{
             this.subUsuarioSpotify  = this.storageSvc.RecuperarDatosUsuarioSpotify().subscribe(
              (datos)=>{
                this.authorizationSpotify = datos?.authorizationSpotify as AuthorizationSpotify;
                this.perfilSpotifyUser = datos?.perfilSpotifyUser ;
                this.playlistSpotifyUser = datos?.playlistSpotifyUser;
              }
             )
            }
          }
        )


  }

  LoguearSpotify(){
    window.location.href="http://localhost:3003/api/DsoundsSpotify/LoginSpotify"
  }

  async ObtenerPerfilUsuarioSpotify(){
    let resp = await this.restSvc.ObtenerPerfilUsuarioSpotify(this.authorizationSpotify.access_token);
    if(resp.codigo == 0){
      this.perfilSpotifyUser = resp.data;
      if(this.perfilSpotifyUser){
        this.storageSvc.AlmacenarDatosUsuarioSpotify(this.authorizationSpotify,this.perfilSpotifyUser)
        await this.ObtenerPlaylistUsuario();
      }
    }else{
      console.log(resp.mensaje)
    }
  }

  async ObtenerPlaylistUsuario(){
    let resp = await this.restSvc.ObtenerPlaylistUsuarioSpotify(this.authorizationSpotify.access_token);
    if(resp.codigo == 0){
      this.playlistSpotifyUser = resp.data;
      if(this.playlistSpotifyUser && this.playlistSpotifyUser.items.length >0){
        const filteredItems = this.playlistSpotifyUser.items.filter(pl => pl.owner.id === this.perfilSpotifyUser?.id);


   this.playlistSpotifyUser = {
    ...this.playlistSpotifyUser,
    items: filteredItems,
    total: filteredItems.length
  };
      }
      console.log('datos spotify..',this.authorizationSpotify,this.perfilSpotifyUser, this.playlistSpotifyUser)
      if(this.playlistSpotifyUser){
        this.storageSvc.AlmacenarDatosUsuarioSpotify(this.authorizationSpotify,this.perfilSpotifyUser,this.playlistSpotifyUser)
      }
    }else{
      console.log(resp.mensaje)
    }
  }


  ngOnDestroy(): void {
    this.subCliente.unsubscribe();
    this.subParams.unsubscribe();
    this.subUsuarioSpotify.unsubscribe();
  }

}

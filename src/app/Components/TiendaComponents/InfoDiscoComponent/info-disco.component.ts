import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import IDisco from '../../../Models/Disco';
import { RestNodeService } from '../../../Services/rest-node.service';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { IRestMessage } from '../../../Models/irest-message';
import { TOKEN_STORAGE_SERVICE } from '../../../Services/injectionTokenStorageService';
import { IStorageService } from '../../../Models/IStorageService';
import { MessageService, PrimeNGConfig } from 'primeng/api';
import { AccordionModule } from 'primeng/accordion';
import { ButtonModule } from 'primeng/button';
import { ToastModule } from 'primeng/toast';
import { DropdownModule } from 'primeng/dropdown';
import { AuthorizationSpotify } from '../../../Models/SpotifyModels/authorizationSpotify';
import { ISpotifyProfile } from '../../../Models/SpotifyModels/SpotifyProfile';
import { IUserPlaylistSpotify } from '../../../Models/SpotifyModels/UserPlaylistSpotify';
import { ISearchSpotifyModel } from '../../../Models/SpotifyModels/SearchModel';
import { Subscription } from 'rxjs';
import { DialogModule } from 'primeng/dialog';
import {ListboxModule} from 'primeng/listbox'
import { AvatarModule } from 'primeng/avatar';
@Component({
  selector: 'app-info-disco',
  standalone: true,
  imports: [AccordionModule, ButtonModule, ToastModule,
    DropdownModule, DialogModule, ListboxModule, AvatarModule
  ],
  templateUrl: './info-disco.component.html',
  styleUrl: './info-disco.component.css',
  providers:[MessageService]
})
export class InfoDiscoComponent implements OnInit, OnDestroy {
  public disco?: IDisco;
  private idDisco: string = '';
  private authorizationSpotify?:AuthorizationSpotify;
  private perfilUserSpotify?:ISpotifyProfile;
  public playlistUserSpotify?:IUserPlaylistSpotify;
  private searchSpotify?:ISearchSpotifyModel;
  public visible : boolean = false;
  private subUserSpotify:Subscription = new Subscription;


  constructor(
    private restSvc: RestNodeService,
    private activatedRoute: ActivatedRoute,
    @Inject(TOKEN_STORAGE_SERVICE) private storageSvc : IStorageService,
    private primengConfig:PrimeNGConfig,
    private messageService: MessageService
  ) {
  }

  ngOnInit(): void {
    this.primengConfig.ripple = true;
    this.idDisco = this.activatedRoute.snapshot.paramMap.get('idDisco') as string;

    this.ObtenerDisco();

    this.subUserSpotify = this.storageSvc.RecuperarDatosUsuarioSpotify().subscribe(
      (datos)=>{
        this.authorizationSpotify = datos?.authorizationSpotify;
        this.perfilUserSpotify = datos?.perfilSpotifyUser;
        this.playlistUserSpotify = datos?.playlistSpotifyUser;
      }
    )



  }

  public async ObtenerDisco(){
    let resp = await this.restSvc.ObtenerDiscoById(this.idDisco);

    if(resp.codigo == 0){
      this.disco = resp.otrosdatos;
      console.log(this.disco)
      if(this.authorizationSpotify){
      await  this.BuscarDiscoSpotify();

      }
    }
  }

  public AddDiscoPedido(){
    this.storageSvc.OperarItemsPedidoCliente(this.disco!,1,"añadir");
    console.log('disco añadido al pedido')
    console.log(this.storageSvc.RecuperarItemsPedidoCliente())
    this.messageService.add({ severity: 'success', summary: 'Carrito', detail: `${this.disco?.Nombre} añadido al carrito` });

  }

  async BuscarDiscoSpotify(){
    console.log(this.disco)
    if(this.authorizationSpotify?.access_token && this.disco){
      let resp = await this.restSvc.BuscarAlbumSpotify(this.authorizationSpotify?.access_token,this.disco.Nombre+' '+this.disco.Artista)
      console.log(resp)
      if(resp.codigo == 0){
        this.searchSpotify = resp.data;

      }else{
        console.log(resp.mensaje)
      }
    }
  }

  MostrarDialogo(){
    this.visible = true;
  }

  async AddDistoToPlaylist(event:Event,idPlaylist:string){
    event.stopPropagation();
    console.log('add playlist...', idPlaylist)
    if(idPlaylist && this.searchSpotify && this.authorizationSpotify){
      let idAlbum =this.searchSpotify?.albums.items[0].id;
      console.log('add playlist...', idPlaylist, this.authorizationSpotify, idAlbum)
      let resp = await this.restSvc.AddDiscoToPlaylist(idPlaylist, idAlbum,this.authorizationSpotify?.access_token)

      if(resp.codigo == 0){
        this.messageService.add({ severity: 'success', summary: 'Spotify', detail: `${resp.mensaje}` });
        this.visible = false;
      }else{
        this.messageService.add({ severity: 'warning', summary: 'Spotify', detail: `${resp.mensaje}` });
      }
    }
  }

  ngOnDestroy(): void {
   this.subUserSpotify.unsubscribe();
  }
}

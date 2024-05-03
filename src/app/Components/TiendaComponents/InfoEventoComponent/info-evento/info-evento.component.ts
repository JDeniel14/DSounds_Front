import { Component, OnDestroy, OnInit, Sanitizer } from '@angular/core';
import { IEvent } from '../../../../Models/EventsModels/IEvent';
import { ActivatedRoute } from '@angular/router';
import {  PrimeNGConfig } from 'primeng/api';
import { RestNodeService } from '../../../../Services/rest-node.service';
import { ButtonModule } from 'primeng/button';
import { ToastModule } from 'primeng/toast';
import { AccordionModule } from 'primeng/accordion';
import { IInfoEvento } from '../../../../Models/InfoEventModels/InfoEvent';
import { Subscription } from 'rxjs';
import {CardModule} from 'primeng/card'
import { DomSanitizer } from '@angular/platform-browser';
import { environment } from '../../../../../environments/environment.development';
import { DatePipe } from '@angular/common';
@Component({
  selector: 'app-info-evento',
  standalone: true,
  imports: [ButtonModule, ToastModule,AccordionModule, CardModule, DatePipe],
  templateUrl: './info-evento.component.html',
  styleUrl: './info-evento.component.css',
})
export class InfoEventoComponent implements OnInit, OnDestroy{

  public evento?:IInfoEvento;
  public idEvento?:string;
  public srcEventoMap:string ="";
  public urlTwitter:string="";
  public urlYT : string= "";
  public urlItunes:string="";
  public urlSpotify:string="";
  public urlInstagram : string ="";
  private subIdEvento:Subscription = new Subscription;
  private subParam:Subscription = new Subscription;
  /**
   *
   */
  constructor(private activatedRoute:ActivatedRoute,
              private primengConfig:PrimeNGConfig,
              private restSvc : RestNodeService,
              private sanitazer :DomSanitizer


  ) {

  }
  ngOnDestroy(): void {
    this.subIdEvento.unsubscribe()
    this.subParam.unsubscribe();


  }

  ngOnInit(): void {
    this.primengConfig.ripple = true;

    this.subParam= this.activatedRoute.paramMap.subscribe(
      (param)=>{
        this.idEvento = param.get('idEvento') as string
        this.ObtenerEventoById();
        this.ActualizarRedesSociales();
      }
    )

  }

  private async ObtenerEventoById(){
     if(this.idEvento != null){
      this.subIdEvento = await this.restSvc.ObtenerEventoById(this.idEvento).subscribe(
        (res)=>{
          if(res.codigo == 0){
            this.evento= res.otrosdatos;
          }
        }
      );

    }


    }

      public RedirectToEvento(){

        window.open(`${this.evento?.url}`)
      }

      public GetMapEvento(){
        const API_KEYGOOGLE = environment.googleAPIKEY;
        let url = `https://www.google.com/maps/embed/v1/place?key=${API_KEYGOOGLE}&q=${this.evento?._embedded.venues[0].location.latitude},${this.evento?._embedded.venues[0].location.longitude}`
        return this.sanitazer.bypassSecurityTrustResourceUrl(url)
      }

      private ActualizarRedesSociales() {
        this.urlInstagram =
          this.evento?._embedded!.attractions[0].externalLinks.instagram[0]
            .url != null
            ? this.evento?._embedded!.attractions[0].externalLinks.instagram[0].url.toString()
            : '';
        this.urlSpotify =
          this.evento?._embedded!.attractions[0].externalLinks.spotify[0]
            .url != null
            ? this.evento?._embedded!.attractions[0].externalLinks.spotify[0].url.toString()
            : '';
        this.urlTwitter =
          this.evento?._embedded!.attractions[0].externalLinks.twitter[0]
            .url != null
            ? this.evento?._embedded!.attractions[0].externalLinks.twitter[0].url.toString()
            : '';
        this.urlYT =
          this.evento?._embedded!.attractions[0].externalLinks.youtube[0]
            .url != null
            ? this.evento?._embedded!.attractions[0].externalLinks.youtube[0].url.toString()
            : '';
        this.urlItunes =
          this.evento?._embedded!.attractions[0].externalLinks.itunes[0]
            .url != null
            ? this.evento?._embedded!.attractions[0].externalLinks.itunes[0].url.toString()
            : '';
      }
  }


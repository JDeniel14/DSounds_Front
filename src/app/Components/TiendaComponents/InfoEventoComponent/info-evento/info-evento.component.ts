import { Component, OnDestroy, OnInit } from '@angular/core';
import { IEvent } from '../../../../Models/EventsModels/IEvent';
import { ActivatedRoute } from '@angular/router';
import {  PrimeNGConfig } from 'primeng/api';
import { RestNodeService } from '../../../../Services/rest-node.service';
import { ButtonModule } from 'primeng/button';
import { ToastModule } from 'primeng/toast';
import { AccordionModule } from 'primeng/accordion';
import { IInfoEvento } from '../../../../Models/InfoEventModels/InfoEvent';
import { Subscription } from 'rxjs';
@Component({
  selector: 'app-info-evento',
  standalone: true,
  imports: [ButtonModule, ToastModule,AccordionModule],
  templateUrl: './info-evento.component.html',
  styleUrl: './info-evento.component.css',
})
export class InfoEventoComponent implements OnInit, OnDestroy{

  public evento?:IInfoEvento;
  public idEvento?:string;
  public srcMapsEvento : string = "";

  private subIdEvento:Subscription = new Subscription;
  private subParam:Subscription = new Subscription;
  /**
   *
   */
  constructor(private activatedRoute:ActivatedRoute,
              private primengConfig:PrimeNGConfig,
              private restSvc : RestNodeService,

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
        this.GetUrlMapsEvento();
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

      public GetUrlMapsEvento(){

        let latitud = this.evento?._embedded.venues[0].location.latitude;
        let longitud =this.evento?._embedded.venues[0].location.longitude;
        this.srcMapsEvento = `https://www.google.com/maps/embed/v1/place?key=apiKEY&q=${latitud},${longitud}`;


      }
  }


import { Component, OnInit } from '@angular/core';
import {NzCarouselModule } from 'ng-zorro-antd/carousel'
import { NzSkeletonModule } from 'ng-zorro-antd/skeleton';

import IDisco from '../../../../Models/Disco';

import {DiscoComponent} from '../../../TiendaComponents/DiscoComponent/disco/disco.component'
import { RouterLink } from '@angular/router';
import { RestNodeService } from '../../../../Services/rest-node.service';

@Component({
  selector: 'app-home-main',
  standalone: true,
  imports: [NzCarouselModule, DiscoComponent, RouterLink, NzSkeletonModule],
  templateUrl: './home-main.component.html',
  styleUrl: './home-main.component.css'
})
export class HomeMainComponent implements OnInit {

  public arrImgs : string[] = ['../../../../assets/images/43172.jpg','../../../../assets/images/justin-bieber-justice-album-promo-photo-2021-lomasrankiao.jpg']


  public Discos:IDisco[]= [];

  /**
   *
   */
  constructor(private restSvc : RestNodeService) {

  }

  ngOnInit(): void {



      this.ObtenerDiscos();



  }

  async ObtenerDiscos(){

    let resp = await this.restSvc.ObtenerDiscos()

    if(resp.codigo == 0){
      this.Discos = resp.otrosdatos;

      console.log('hola')
      console.log(this.Discos)
    }else{
      console.log('error obteniendo discos...')
    }
  }

}

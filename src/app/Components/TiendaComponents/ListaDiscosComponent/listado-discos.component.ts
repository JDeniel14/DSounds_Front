import { Component, OnInit } from '@angular/core';
import { DiscoComponent } from '../DiscoComponent/disco/disco.component';
import { RouterLink } from '@angular/router';
import { NzSkeletonModule } from 'ng-zorro-antd/skeleton';
import IDisco from '../../../Models/Disco';
import { RestNodeService } from '../../../Services/rest-node.service';

@Component({
  selector: 'app-listado-discos',
  standalone: true,
  imports: [DiscoComponent, RouterLink, NzSkeletonModule],
  templateUrl: './listado-discos.component.html',
  styleUrl: './listado-discos.component.css'
})
export class ListadoDiscosComponent implements OnInit{
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

    
  }else{
    console.log('error obteniendo discos...')
  }
}

}

import { Component, OnInit } from '@angular/core';
import { DiscoComponent } from '../DiscoComponent/disco/disco.component';
import { RouterLink } from '@angular/router';
import { NzSkeletonModule } from 'ng-zorro-antd/skeleton';
import IDisco from '../../../Models/Disco';
import { RestNodeService } from '../../../Services/rest-node.service';
import { FormControl, FormGroup,  ReactiveFormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';
import { ButtonModule } from 'primeng/button';
@Component({
  selector: 'app-listado-discos',
  standalone: true,
  imports: [DiscoComponent, RouterLink, NzSkeletonModule, ReactiveFormsModule, InputTextModule,
    IconFieldModule,InputIconModule, ButtonModule
  ],
  templateUrl: './listado-discos.component.html',
  styleUrl: './listado-discos.component.css'
})
export class ListadoDiscosComponent implements OnInit{
  public Discos:IDisco[]= [];
  public discosBusqueda:IDisco[] = [];
  public cantidadDiscosRenderizar:number=15;
  public formBusqueda: FormGroup = new FormGroup(
    {
      busqueda: new FormControl('')
    }
  )

  public busqueda:boolean = false;
  private cantidadAñadida:number = 0;
  public mensajeTope:string = "";

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
    this.discosBusqueda = this.Discos.slice(0,this.cantidadDiscosRenderizar)
    this.cantidadAñadida = this.cantidadDiscosRenderizar;


  }else{
    console.log('error obteniendo discos...')
  }
}

BuscarDiscos(){

  if(this.formBusqueda.controls['busqueda'].value != ""){

    setTimeout(() => {
      this.busqueda = true;
      this.discosBusqueda = this.Discos.filter(disco =>
        disco.Nombre.toLowerCase().includes(this.formBusqueda.controls['busqueda'].value.toLowerCase())
        ||
        disco.Artista.toLowerCase().includes(this.formBusqueda.controls['busqueda'].value.toLowerCase())
      );
    }, 500);

  }else{
    this.busqueda = false;
    this.discosBusqueda = this.Discos;
  }


}

CargarMasDiscos(cantidad:number){
  let tope = this.Discos.length;
  this.cantidadAñadida+=cantidad;
  if(cantidad < tope){
    this.discosBusqueda = this.Discos.slice(0,(this.cantidadAñadida+cantidad))
  }else{
    this.cantidadAñadida = this.discosBusqueda.length
    this.discosBusqueda = this.Discos;

  }
}

}

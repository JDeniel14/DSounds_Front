import { Component, Inject, OnInit } from '@angular/core';
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

@Component({
  selector: 'app-info-disco',
  standalone: true,
  imports: [AccordionModule, ButtonModule, ToastModule],
  templateUrl: './info-disco.component.html',
  styleUrl: './info-disco.component.css',
  providers:[MessageService]
})
export class InfoDiscoComponent implements OnInit {
  public disco?: IDisco;
  private idDisco: string = '';
  /**
   *
   */
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

  }

  public async ObtenerDisco(){
    let resp = await this.restSvc.ObtenerDiscoById(this.idDisco);

    if(resp.codigo == 0){
      this.disco = resp.otrosdatos;
    }
  }

  public AddDiscoPedido(){
    this.storageSvc.OperarItemsPedidoCliente(this.disco!,1,"añadir");
    console.log('disco añadido al pedido')
    console.log(this.storageSvc.RecuperarItemsPedidoCliente())
    this.messageService.add({ severity: 'success', summary: 'Carrito', detail: `${this.disco?.Nombre} añadido al carrito` });

  }
}

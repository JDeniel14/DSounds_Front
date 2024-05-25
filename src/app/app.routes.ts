import { Routes } from '@angular/router';
import { AppComponent } from './app.component';

//-- TIENDA --
import { MainLayoutComponent } from './Components/LayoutComponents/MainLayout/main-layout.component';
import {ListadoDiscosComponent} from './Components/TiendaComponents/ListaDiscosComponent/listado-discos.component'
import { InfoDiscoComponent } from './Components/TiendaComponents/InfoDiscoComponent/info-disco.component';
import { CarritoDSoundsComponent } from './Components/TiendaComponents/CarritoComponent/carrito-dsounds.component';
import { InfoEventoComponent } from './Components/TiendaComponents/InfoEventoComponent/info-evento/info-evento.component';
import { RealizarPagoComponent } from './Components/TiendaComponents/RealizarPagoComponent/realizar-pago/realizar-pago.component';
import { AccesoPagoGuard } from './Guards/acceso-pago.guard';

// LOGIN Y REGISTRO
import { LoginDsoundsComponent } from './Components/ClienteComponents/LoginComponent/login-dsounds.component';
import { RegistroDsoundsComponent } from './Components/ClienteComponents/RegistroComponent/registro-dsounds.component';


// --- PANEL CLIENTE--
import { MainPanelClienteComponentComponent } from './Components/ClienteComponents/PanelClienteComponent/MainPanelClienteComponent/main-panel-cliente-component.component';
import { PanelPedidosComponentComponent } from './Components/ClienteComponents/PanelClienteComponent/PanelPedidosComponent/panel-pedidos-component.component';
import { PanelDatosClienteComponent } from './Components/ClienteComponents/PanelClienteComponent/PanelDatosClienteComponent/PanelDatosClienteComponent/panel-datos-cliente.component';
import { MiniCambiarPasswordClienteComponent } from './Components/ClienteComponents/PanelClienteComponent/PanelDatosClienteComponent/MiniCambiarPasswordCliente/mini-cambiar-password-cliente.component';
import { MiniDatosPersonalesComponent } from './Components/ClienteComponents/PanelClienteComponent/PanelDatosClienteComponent/MiniDatosPersonales/mini-datos-personales.component';



export const routes: Routes = [
  {path:'Home', component:MainLayoutComponent},
  {path:'Discos', component:ListadoDiscosComponent},
  {path:'InfoDisco/:idDisco', component:InfoDiscoComponent},
  {path:'Carrito', component:CarritoDSoundsComponent},
  {path:'Login', component:LoginDsoundsComponent},
  {path:'Registro', component:RegistroDsoundsComponent},
  {path:'InfoEvento/:idEvento',component:InfoEventoComponent},
  {path:'RealizarPago', component:RealizarPagoComponent, canActivate:[AccesoPagoGuard]},
  {path:'MiCuenta',component:MainPanelClienteComponentComponent},
  {path:'MiCuenta/Pedidos', component:PanelPedidosComponentComponent},
  {path:'MiCuenta/DatosPersonales', component:PanelDatosClienteComponent,
    children:[
      { path: '', redirectTo: 'MisDatosPersonales', pathMatch: 'full' },
      {path:'MisDatosPersonales', component:MiniDatosPersonalesComponent},
      {path:'CambiarMiPassword', component:MiniCambiarPasswordClienteComponent}
    ]
  },
  {path:'', redirectTo:'/Home',pathMatch:'full'},
  {path:'**', redirectTo:'/Home'}
];

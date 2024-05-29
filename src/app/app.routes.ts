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
import { MiniDatosPersonalesComponent } from './Components/ClienteComponents/PanelClienteComponent/PanelDatosClienteComponent/MiniDatosPersonales/mini-datos-personales.component';
import { MiniDireccionesClienteComponent } from './Components/ClienteComponents/PanelClienteComponent/PanelDatosClienteComponent/MiniDireccionesCliente/mini-direcciones-cliente.component';
import { MiniCambiarPasswordClienteComponent } from './Components/ClienteComponents/PanelClienteComponent/PanelDatosClienteComponent/MiniCambiarPasswordCliente/mini-cambiar-password-cliente.component';



export const routes: Routes = [
  {path:'Home', loadComponent:()=>import('./Components/LayoutComponents/MainLayout/main-layout.component').then(m => m.MainLayoutComponent)},
  {path:'Discos', loadComponent:()=>import('./Components/TiendaComponents/ListaDiscosComponent/listado-discos.component').then(m => m.ListadoDiscosComponent)},
  {path:'Eventos', loadComponent : () => import('./Components/TiendaComponents/ListaEventosComponent/lista-eventos.component').then(m=>m.ListaEventosComponent)},
  {path:'InfoDisco/:idDisco', loadComponent:()=> import('./Components/TiendaComponents/InfoDiscoComponent/info-disco.component').then(m => m.InfoDiscoComponent)},
  {path:'Carrito', loadComponent:()=> import('./Components/TiendaComponents/CarritoComponent/carrito-dsounds.component').then(m => m.CarritoDSoundsComponent)},
  {path:'Login', loadComponent:()=> import('./Components/ClienteComponents/LoginComponent/login-dsounds.component').then( m => m.LoginDsoundsComponent)},
  {path:'Registro', loadComponent:()=>import('./Components/ClienteComponents/RegistroComponent/registro-dsounds.component').then(m => m.RegistroDsoundsComponent)},
  {path:'InfoEvento/:idEvento',loadComponent:()=> import('./Components/TiendaComponents/InfoEventoComponent/info-evento/info-evento.component').then(m => m.InfoEventoComponent)},
  {path:'RealizarPago', loadComponent:()=>import('./Components/TiendaComponents/RealizarPagoComponent/realizar-pago/realizar-pago.component').then(m => m.RealizarPagoComponent),
                        canActivate:[AccesoPagoGuard]},
  {path:'MiCuenta', loadComponent:()=> import('./Components/ClienteComponents/PanelClienteComponent/MainPanelClienteComponent/main-panel-cliente-component.component').then(m=>m.MainPanelClienteComponentComponent)},
  {path:'MiCuenta/Pedidos', loadComponent:()=> import('./Components/ClienteComponents/PanelClienteComponent/PanelPedidosComponent/panel-pedidos-component.component').then(m => m.PanelPedidosComponentComponent)},
  {path:'MiCuenta/DatosPersonales', loadComponent:()=>import('./Components/ClienteComponents/PanelClienteComponent/PanelDatosClienteComponent/PanelDatosClienteComponent/panel-datos-cliente.component').then(m => m.PanelDatosClienteComponent),
    children:[
      { path: '', redirectTo: 'MisDatosPersonales', pathMatch: 'full' },
      {path:'MisDatosPersonales', loadComponent:()=> import('./Components/ClienteComponents/PanelClienteComponent/PanelDatosClienteComponent/MiniDatosPersonales/mini-datos-personales.component').then(m => m.MiniDatosPersonalesComponent)},
      {path:'MisDirecciones', loadComponent:()=>import('./Components/ClienteComponents/PanelClienteComponent/PanelDatosClienteComponent/MiniDireccionesCliente/mini-direcciones-cliente.component').then(m => m.MiniDireccionesClienteComponent)},
      {path:'CambiarMiPassword', loadComponent:()=> import('./Components/ClienteComponents/PanelClienteComponent/PanelDatosClienteComponent/MiniCambiarPasswordCliente/mini-cambiar-password-cliente.component').then(m => m.MiniCambiarPasswordClienteComponent)}
    ]
  },
  {path:'', redirectTo:'/Home',pathMatch:'full'},
  {path:'**', redirectTo:'/Home'}
];

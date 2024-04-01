import { Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { MainLayoutComponent } from './Components/LayoutComponents/MainLayout/main-layout.component';
import {ListadoDiscosComponent} from './Components/TiendaComponents/ListaDiscosComponent/listado-discos.component'
import { InfoDiscoComponent } from './Components/TiendaComponents/InfoDiscoComponent/info-disco.component';
import { CarritoDSoundsComponent } from './Components/TiendaComponents/CarritoComponent/carrito-dsounds.component';
import { LoginDsoundsComponent } from './Components/ClienteComponents/LoginComponent/login-dsounds.component';
import { RegistroDsoundsComponent } from './Components/ClienteComponents/RegistroComponent/registro-dsounds.component';
export const routes: Routes = [
  {path:'Home', component:MainLayoutComponent},
  {path:'Discos', component:ListadoDiscosComponent},
  {path:'InfoDisco/:idDisco', component:InfoDiscoComponent},
  {path:'Carrito', component:CarritoDSoundsComponent},
  {path:'Login', component:LoginDsoundsComponent},
  {path:'Registro', component:RegistroDsoundsComponent},
  {path:'', redirectTo:'/Home',pathMatch:'full'},
  {path:'**', redirectTo:''}
];

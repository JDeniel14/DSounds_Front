import { Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { MainLayoutComponent } from './Components/LayoutComponents/MainLayout/main-layout.component';

export const routes: Routes = [
  {path:'Home', component:MainLayoutComponent},
  {path:'', redirectTo:'/Home',pathMatch:'full'},
  {path:'**', redirectTo:''}
];

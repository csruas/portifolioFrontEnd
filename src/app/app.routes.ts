import { Routes } from '@angular/router';
import { LoginComponent } from './components/layout/login/login.component';
import { PrincipalComponent } from './components/layout/principal/principal.component';
import { CarroslistComponent } from './components/carros/carroslist/carroslist.component';
import { CarrosdetailsComponent } from './components/carros/carrosdetails/carrosdetails.component';
import { MarcaslistComponent } from './components/marcas/marcaslist/marcaslist.component';
import { MarcasdetailsComponent } from './components/marcas/marcasdetails/marcasdetails.component';
import { AcessoriolistComponent } from './components/acessorio/acessoriolist/acessoriolist.component';
import { AcessoriodetailsComponent } from './components/acessorio/acessoriodetails/acessoriodetails.component';

export const routes: Routes = [
  {path: "", redirectTo: "login", pathMatch: 'full'},
  {path: "login", component: LoginComponent},
  {path: "admin", component: PrincipalComponent, children : [

    {path: "carros", component: CarroslistComponent},
    {path: "carros/new", component: CarrosdetailsComponent},
    {path: "carros/edit/:id", component: CarrosdetailsComponent},

    {path: "marcas", component: MarcaslistComponent},
    {path: "marcas/new", component: MarcasdetailsComponent},
    {path: "marcas/edit/:id", component: MarcasdetailsComponent},

    {path: "acessorio", component: AcessoriolistComponent},
    {path: "acessorio/new", component: AcessoriodetailsComponent},
    {path: "acessorio/edit/:id", component: AcessoriodetailsComponent},
  ]}
];

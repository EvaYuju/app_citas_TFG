import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthGuard, redirectUnauthorizedTo } from '@angular/fire/auth-guard'; //Para controlar los accesos a url sin iniciar sesión
import { CitasComponent } from './citas/citas.component';

import { SpecialtiesComponent } from './specialties/specialties.component';
//import { SpecialtiesRoutingModule } from './specialties-routing.module';


const redirectUnauthorizedToLogin = () => redirectUnauthorizedTo(['login']);


const routes: Routes = [

  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: 'folder/:id',
    loadChildren: () => import('./folder/folder.module').then( m => m.FolderPageModule)
  },
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)
  },
  {
    path: 'home',
    canActivate: [AuthGuard], //Controlar acceso por url sin iniciar sesión.
    data: {authGuardPipe : redirectUnauthorizedToLogin}, // Redirigir al login si no está logueado
    loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)
  },
  {
    path: 'login',
    loadChildren: () => import('./login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'register',
    loadChildren: () => import('./register/register.module').then( m => m.RegisterPageModule)
  },
  {
  path: 'citas', component: CitasComponent
  },
  {
    path: 'contacto',
    loadChildren: () => import('./contacto/contacto.module').then( m => m.ContactoPageModule)
  },
  {
    path: 'folder',
    loadChildren: () => import('./folder/folder.module').then( m => m.FolderPageModule)
  },
  {
    path: 'specialties',
    component: SpecialtiesComponent
  },
];

@NgModule({
  declarations: [SpecialtiesComponent],
  imports: [
    CommonModule, RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }

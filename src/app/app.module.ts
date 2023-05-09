import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { AuthGuardModule } from '@angular/fire/auth-guard';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { initializeApp,provideFirebaseApp } from '@angular/fire/app';
import { environment } from '../environments/environment';

import { provideAuth,getAuth } from '@angular/fire/auth';
import { provideFirestore,getFirestore } from '@angular/fire/firestore';

import { FormsModule } from '@angular/forms';

import { PacientesComponent } from './pacientes/pacientes.component'; // Importa el componente PacientesComponent aquí




@NgModule({
  declarations: [AppComponent, PacientesComponent],
  entryComponents: [],
  imports: [
  BrowserModule,
  IonicModule.forRoot(),
  AppRoutingModule, provideFirebaseApp(() => initializeApp(environment.firebase)), // también
  provideAuth(() => getAuth()), // Servicios que necesitamos para conectar base de datos-proyecto
  provideFirestore(() => getFirestore()),
  AuthGuardModule,
  FormsModule
  ],
  providers: [{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy }],
  bootstrap: [AppComponent],

})
export class AppModule {}

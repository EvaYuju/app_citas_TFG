import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { HomePage } from './home.page';

import { HomePageRoutingModule } from './home-routing.module';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HomePageRoutingModule
  ],
  declarations: [HomePage]
})
export class HomePageModule {

  constructor(
    private auth: AuthService,
    private router: Router
  ) {}

  /*async logout(){
    localStorage.removeItem('ROL');
    this.auth.logout();
    this.router.navigate(['/landing-page']);
  }*/

}

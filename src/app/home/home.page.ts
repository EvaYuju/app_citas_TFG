import { Component } from '@angular/core';
import { NavController } from '@ionic/angular';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  constructor(private navCtrl: NavController, private auth: AuthService, private router: Router) {}

  navigateToCitas() {
    this.navCtrl.navigateForward('citas');
  }

  
  navigateToMisCitas() {
    this.navCtrl.navigateForward('mis-citas');
  }

  navigateToContact() {
    this.navCtrl.navigateForward('contacto');
  }

  navigateToPacientes() {
    this.navCtrl.navigateForward('pacientes');
  }

  navigateToDoctores() {
    this.navCtrl.navigateForward('doctores');
  }

  navigateToEspecialidades() {
    this.navCtrl.navigateForward('specialties');
  }

  async logout(){
    localStorage.removeItem('ROL');
    this.auth.logout();
    this.router.navigate(['/login']);
  }

  navigateToLogOut() {
    this.logout();
  }


}

import { Component, HostListener } from '@angular/core';
import { NavController } from '@ionic/angular';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { MenuController } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  constructor(
    private navCtrl: NavController,
    private auth: AuthService,
    private router: Router,
    private menuController: MenuController
  ) {}

  isMenuOpen: boolean = false;

  @HostListener('document:click', ['$event'])
  handleClick(event: MouseEvent) {
    const targetElement = event.target as HTMLElement;

    if (this.isMenuOpen && !targetElement.closest('ion-menu')) {
      this.menuController.close();
      this.isMenuOpen = false;
    }
  }

  toggleMenu() {
    if (this.isMenuOpen) {
      this.menuController.close();
    } else {
      this.menuController.open();
    }
    this.isMenuOpen = !this.isMenuOpen;
  }

  closeMenu() {
    this.menuController.close();
  }

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

  logout() {
    localStorage.removeItem('ROL');
    this.auth.logout();
    //window.location.reload();
    this.router.navigate(['/landing-page']);
    //window.location.reload();
  }

  navigateToLogOut() {
    this.logout();
  }
}

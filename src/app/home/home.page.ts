import { Component, HostListener } from '@angular/core';
import { NavController } from '@ionic/angular';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { MenuController } from '@ionic/angular';
import { UsuariosService } from '../services/usuarios.service';
import { PacientesService } from './../services/pacientes.service';
import { Usuarios } from '../models/usuarios';


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
    private menuController: MenuController,
    private pacientesService: PacientesService,
    private authService: AuthService,
    private usuariosService: UsuariosService
  ) {
    this.obtenerUsuarioRol();
  }

  isMenuOpen: boolean = false;
  usuarioRol: string = ''; // Agrega esta línea para almacenar el rol del usuario
  dniUsuarioActual: string = '';

  @HostListener('document:click', ['$event'])
  handleClick(event: MouseEvent) {
    const targetElement = event.target as HTMLElement;

    if (this.isMenuOpen && !targetElement.closest('ion-menu')) {
      this.menuController.close();
      this.isMenuOpen = false;
    }
  }

  obtenerUsuarioRol() {
    this.authService.getUsuarioEmail().subscribe((correo) => {
      if (correo) {
        this.usuariosService.getUsuarioRol(correo).then((rol) => {
          this.usuarioRol = rol || '';

          // Obtener el paciente.DATO_QUE_QUERAMOS del paciente logueado
          if (this.usuarioRol === 'PACIENTE') {
            this.pacientesService.getPacientePorCorreo(correo).then((paciente) => {
              if (paciente) {
                this.dniUsuarioActual = paciente.dni; // Almacena el DNI en una variable para usarlo en la vista HTML

              }
            });
          }
        });
      }
    });
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
    window.location.reload();
  }

  navigateToLogOut() {
    this.logout();
  }
}

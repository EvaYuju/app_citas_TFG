import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { filter } from 'rxjs/operators'; // Para poder ver el estado de la sesión
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {

  // Pestañas laterales //
  public appPages = this.authSetAppPages();
  /*[
    { title: 'Inicio', url: '/home', icon: 'home' },
    { title: 'Pacientes', url: '/pacientes', icon: 'people-circle' },
    { title: 'Doctores', url: '/doctores', icon: 'people' },
    { title: 'Especialidades', url: '/specialties', icon: 'bandage' },
    { title: 'Citas', url: '/citas', icon: 'calendar-number', },
    { title: 'Contacto', url: '/contacto', icon: 'call' },

  ];*/

  // Usuario
user$ = this.auth.authState$.pipe( // Trae el estado de la sesión
    filter(state => state ? true: false)
  );

  constructor(
    private auth: AuthService,
    private router: Router
  ) {}

  authSetAppPages(){
    const rol = localStorage.getItem('ROL');
    if(rol == 'PACIENTE'){
      return [{ title: 'Inicio', url: '/home', icon: 'home' },
    { title: 'Pacientes', url: '/pacientes', icon: 'people-circle' },
    { title: 'Citas', url: '/citas', icon: 'calendar-number', },
    { title: 'Especialidades', url: '/specialties', icon: 'bandage' },
    { title: 'Contacto', url: '/contacto', icon: 'call' },
  ];
    }else if(rol == 'DOCTOR') {
      return [];
    }else if(rol == 'ADMIN'){
      return [
    { title: 'Inicio', url: '/home', icon: 'home' },
    { title: 'Pacientes', url: '/pacientes', icon: 'people-circle' },
    { title: 'Doctores', url: '/doctores', icon: 'people' },
    { title: 'Especialidades', url: '/specialties', icon: 'bandage' },
    { title: 'Citas', url: '/citas', icon: 'calendar-number', },
    { title: 'Contacto', url: '/contacto', icon: 'call' },
      ];
    }
    return [];
  }

    /*
  logout(){
    localStorage.removeItem('ROL');
    this.auth.logout();
    this.router.navigate(['/landing-page']);
  }
  */

  
}

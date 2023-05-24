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

  // Pestañas laterales // ok = Correctas
  public appPages = [
    { title: 'Inicio', url: '/home', icon: 'home' }, // ok
    { title: 'Pacientes', url: '/pacientes', icon: 'people-circle' }, // ok
    { title: 'Doctores', url: '/doctores', icon: 'people' }, // ok
    { title: 'Especialidades', url: '/specialties', icon: 'bandage' }, // ok
    { title: 'Citas', url: '/citas', icon: 'calendar-number' }, // ok
    { title: 'Contacto', url: '/contacto', icon: 'call' }, // ok

  ];

  // Usuario
user$ = this.auth.authState$.pipe( // Trae el estado de la sesión
    filter(state => state ? true: false)
  );

  constructor(
    private auth: AuthService,
    private router: Router
  ) {}

  async logout(){
    this.auth.logout();
    this.router.navigate(['/login']);
  }
}

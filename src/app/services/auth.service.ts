import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';

import { Auth, signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut, authState } from '@angular/fire/auth';
import { UsuariosService } from './usuarios.service';
import { PacientesService } from './pacientes.service';
import { DoctorsService } from './doctors.service';
import { Pacientes } from '../models/pacientes';
import { Doctor } from '../models/doctor';

@Injectable({
  providedIn: 'root'
})
export class AuthService {



  authState$ = authState(this.afAuth); // Observador del usuario logueado
  constructor(
    private afAuth: Auth,
    private usuarioService: UsuariosService,
    private pacienteService: PacientesService,
    private doctorService: DoctorsService
  ) {}

  getUsuarioEmail() {
    return this.authState$.pipe(
      map(user => (user && user.email) || null)
    );
  }

  getCurrentUser() {
    return this.authState$.pipe(
      map(user => user && user.email || null)
    );
  }
  async register(password: string, rol: string, paciente?: Pacientes, doctores?: Doctor) {
    if(rol === 'PACIENTE' && paciente){
      this.usuarioService.registerUsuario(paciente.correoElectronico, rol);
      const user = await createUserWithEmailAndPassword(this.afAuth, paciente.correoElectronico, password);
      this.pacienteService.addPaciente(paciente);
      return await signInWithEmailAndPassword(this.afAuth, paciente.correoElectronico, password);
    } else if(rol === 'MEDICO' && doctores){
      this.usuarioService.registerUsuario(doctores.correoElectronico, rol);
      const user = await createUserWithEmailAndPassword(this.afAuth, doctores.correoElectronico, password);
      this.doctorService.addDoctor(doctores);
      return await signInWithEmailAndPassword(this.afAuth, doctores.correoElectronico, password);
    }
    return;
    };

    async login(email: string, password: string) {
      const rol = await this.usuarioService.getUsuarioRol(email).then(snapshot => {
        return snapshot;
      });

      if (rol !== null) {
        localStorage.setItem('ROL', rol);
      }

      return signInWithEmailAndPassword(this.afAuth, email, password);
    }


  logout() {
    return signOut(this.afAuth);
  }

  }

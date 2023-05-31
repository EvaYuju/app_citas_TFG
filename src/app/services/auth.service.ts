import { Injectable } from '@angular/core';
import { Auth, signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut, authState } from '@angular/fire/auth';
import { UsuariosService } from './usuarios.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  authState$ = authState(this.afAuth); // Observador del usuario logueado
  constructor(
    private afAuth: Auth,
    private usuarioService: UsuariosService
  ) {}

  async register(email: string, password: string) {
    this.usuarioService.registerUsuario(email, 'PACIENTE');
    const user = await createUserWithEmailAndPassword(this.afAuth, email, password);
    return await signInWithEmailAndPassword(this.afAuth, email, password);
    };

  async login(email: string, password: string) {
    const rol = await this.usuarioService.getUsuarioRol(email).then(snapshot => {
      return snapshot;
    });
    localStorage.setItem('ROL', rol);
    return signInWithEmailAndPassword(this.afAuth, email, password);
  };

  logout() {
    return signOut(this.afAuth);
  }

  }

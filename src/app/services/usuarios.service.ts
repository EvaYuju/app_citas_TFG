import { Injectable } from '@angular/core';
import {
  Firestore,
  collection,
  addDoc,
  query,
  where,
  getDocs,
  doc,
  updateDoc,
  deleteDoc,
} from '@angular/fire/firestore';

import { Usuarios } from '../models/usuarios';


@Injectable({
  providedIn: 'root'
})
export class UsuariosService {

  constructor(private firestore: Firestore) { }

  registerUsuario(correo: string, rol: string){
    const usuariosRef = collection(this.firestore, 'usuarios');
    const usuario = {
      correo: correo,
      rol: rol
    };
   return addDoc(usuariosRef, usuario);
  }

  getUsuarioRol(correo: string): Promise<string | null> {
    const usuariosRef = collection(this.firestore, 'usuarios');
    const q = query(usuariosRef, where('correo', '==', correo));
    return getDocs(q).then((snapshot) => {
      let usuario: string | null = null;
      if (!snapshot.empty) {
        snapshot.forEach((doc) => {
          const user = doc.data() as Usuarios;
          usuario = user.rol;
        });
      }
      return usuario;
    });
  }

}

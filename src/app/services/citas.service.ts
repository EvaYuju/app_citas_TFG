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
import { Citas } from '../models/citas';

@Injectable({
  providedIn: 'root',
})
export class CitasService {
  // Inyectamos Firestore en el constructor para poder trabajar con esa herramienta
  constructor(private firestore: Firestore) {}

  //(recibe un paciente de tipo:)
  addCita(cita: Citas) {
    // Ref a la bd = metodo collection(importamos)(1ºparametro Sºfirestores, 2ºparam nombreColeccion)
    const citaRef = collection(this.firestore, 'citas');
    // retornar la llamada a addDoc(params: la coleccion, lo que insertamos)
    return addDoc(citaRef, cita);
  }

  getCitaPorID(id: string) {
    const citaRef = collection(this.firestore, 'citas');
    const q = query(citaRef, where('id', '==', id));
    return getDocs(q).then((snapshot) => !snapshot.empty);
  }

  buscarCitaPorID(id: string) {
    const citaRef = collection(this.firestore, 'citas');
    const q = query(citaRef, where('id', '==', id));
    return getDocs(q).then((snapshot) => {
      if (!snapshot.empty) {
        const citas: any = [];
        snapshot.forEach((doc) => {
          const cita = doc.data() as Citas;
          cita.id = doc.id;
          citas.push(cita);
        });
        return citas;
      } else {
        return [];
      }
    });
  }

  modificarCita(cita: Citas) {
    const citaRef = doc(this.firestore, 'citas', cita.id);
    return updateDoc(citaRef, 'citas', cita);
  }

  borrarCita(id: string) {
    const citaRef = doc(this.firestore, 'citas', id);
    return deleteDoc(citaRef);
  }
}

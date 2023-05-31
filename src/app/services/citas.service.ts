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
//import { v4 as uuidv4 } from 'uuid';
import { Citas } from '../models/citas';
import { setDoc } from 'firebase/firestore';

@Injectable({
  providedIn: 'root',
})
export class CitasService {
  // Inyectamos Firestore en el constructor para poder trabajar con esa herramienta
  constructor(private firestore: Firestore) {}

  /*//(recibe un paciente de tipo:)
  addCita(cita: Citas) {
    // Ref a la bd = metodo collection(importamos)(1ºparametro Sºfirestores, 2ºparam nombreColeccion)
    const citaRef = collection(this.firestore, 'citas');

    // retornar la llamada a addDoc(params: la coleccion, lo que insertamos)
    return addDoc(citaRef, cita);
  }*/

   async addCita(cita: Citas) {
    try {
      const citaRef = collection(this.firestore, 'citas');
      const docRef = await addDoc(citaRef, cita);
      const citaId = docRef.id;
      cita.id = citaId;
      console.log('Cita creada con ID:', citaId);
    } catch (error) {
      console.error('Error al crear la cita:', error);
    }
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
        const citas: Citas[] = []; // Cambio: Define el tipo de citas como Citas[]
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
    return setDoc(citaRef, cita);
  }

  borrarCita(id: string) {
    const citaRef = doc(this.firestore, 'citas', id);
    return deleteDoc(citaRef);
  }
}
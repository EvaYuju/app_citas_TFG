import { Injectable } from '@angular/core';
import { Firestore, collection, addDoc, query, where, getDocs, doc, updateDoc, deleteDoc } from '@angular/fire/firestore';
import { Citas } from '../models/citas';
import { setDoc } from 'firebase/firestore';

@Injectable({
  providedIn: 'root',
})
export class CitasService {
  constructor(private firestore: Firestore) {}

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
        const citas: Citas[] = [];
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

  // * Revisar y quitar si no se usa
  buscarCitasPorDNI(dni: string) {
    const citaRef = collection(this.firestore, 'citas');
    const q = query(citaRef, where('dni', '==', dni));
    return getDocs(q).then((snapshot) => {
      if (!snapshot.empty) {
        const citas: Citas[] = [];
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
  // * En uso para buscar citas por dni en citas
  buscarCitasPorPacienteID(pacienteId: string) {
    const citaRef = collection(this.firestore, 'citas');
    const q = query(citaRef, where('pacienteId', '==', pacienteId));
    return getDocs(q).then((snapshot) => {
      if (!snapshot.empty) {
        const citas: Citas[] = [];
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

  buscarCitasPorDoctorDNI(doctorId: string, fecha: string) {
    const citaRef = collection(this.firestore, 'citas');
    const q = query(citaRef, where('doctorId', '==', doctorId), where('fecha', '==', fecha));
    return getDocs(q).then((snapshot) => {
      if (!snapshot.empty) {
        const citas: Citas[] = [];
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

import { Injectable } from '@angular/core';
import { Firestore, collection, addDoc, query, where, getDocs, doc, updateDoc, deleteDoc } from '@angular/fire/firestore';
import { Pacientes } from '../models/pacientes';

@Injectable({
  providedIn: 'root'
})
export class PacientesService {

  // Inyectamos Firestore en el constructor para poder trabajar con esa herramienta
  constructor(private firestore: Firestore) { }
    //(recibe un paciente de tipo:)
  addPaciente(paciente: Pacientes){
    // Ref a la bd = metodo collection(importamos)(1ºparametro Sºfirestores, 2ºparam nombreColeccion)
    const pacienteRef = collection(this.firestore, 'pacientes');
    // retornar la llamada a addDoc(params: la coleccion, lo que insertamos)
    return addDoc(pacienteRef, paciente);
  }

  getPacientePorDNI(dni: string) {
    const pacienteRef = collection(this.firestore, 'pacientes');
    const q = query(pacienteRef, where('dni', '==', dni));
    return getDocs(q)
      .then((snapshot) => !snapshot.empty);
  }
  buscarPacientePorDNI(dni: string) {
    const pacienteRef = collection(this.firestore, 'pacientes');
    const q = query(pacienteRef, where('dni', '==', dni));
    return getDocs(q)
      .then((snapshot) => {
        if (!snapshot.empty) {
          const pacientes: any = [];
          snapshot.forEach((doc) => {
            const paciente = doc.data() as Pacientes;
            paciente.id = doc.id;
            pacientes.push(paciente);
          });
          return pacientes;
        } else {
          return [];
        }
      });
  }

  modificarPaciente(paciente: Pacientes) {
    const pacienteRef = doc(this.firestore, 'pacientes', paciente.id);
    const pacienteData = {
      dni: paciente.dni,
      nombre: paciente.nombre,
      edad: paciente.fechaNacimiento,
      direccion: paciente.direccion,
      telefono: paciente.telefono,
      email: paciente.correoElectronico
    };
    return updateDoc(pacienteRef, pacienteData);
  }

  borrarPaciente(id: string) {
    const pacienteRef = doc(this.firestore, 'pacientes', id);
    return deleteDoc(pacienteRef);
  }
}


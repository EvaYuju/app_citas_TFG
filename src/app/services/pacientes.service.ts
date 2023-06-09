import { Injectable } from '@angular/core';
import { Firestore, collection, addDoc, query, where, getDocs, doc, updateDoc, deleteDoc } from '@angular/fire/firestore';
import { Pacientes } from '../models/pacientes';
//import { v4 as uuidv4 } from 'uuid'; // Importa la función uuidv4 para generar un id único


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
    //const id = uuidv4(); // Genera un id único utilizando la función uuidv4()
    //const pacienteWithId = { ...paciente, id }; // Crea un nuevo objeto que incluya el id generado

    // retornar la llamada a addDoc(params: la coleccion, lo que insertamos)
    return addDoc(pacienteRef, paciente);
  }

  getPacientePorDNI(dni: string) {
    const pacienteRef = collection(this.firestore, 'pacientes');
    const q = query(pacienteRef, where('dni', '==', dni));
    return getDocs(q)
      .then((snapshot) => !snapshot.empty);
  }

  getPacientePorCorreo(correo: string) {
    const pacienteRef = collection(this.firestore, 'pacientes');
    const q = query(pacienteRef, where('correoElectronico', '==', correo));
    return getDocs(q)
      .then((snapshot) => {
        if (!snapshot.empty) {
          const paciente = snapshot.docs[0].data() as Pacientes;
          paciente.id = snapshot.docs[0].id;
          return paciente;
        } else {
          return null;
        }
      });
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
      id: paciente.id,
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


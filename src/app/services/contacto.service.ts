import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Firestore, collection, addDoc, query, where, getDocs } from '@angular/fire/firestore';
import { Mensaje } from '../models/mensaje';

@Injectable({
  providedIn: 'root'
})
export class ContactoService {

  constructor(private firestore: Firestore) {
  }

  guardarConsulta(consulta: Mensaje): Promise<void> {
    const pacienteDni = consulta.pacienteDni;
    return this.verificarExistenciaPaciente(pacienteDni)
      .then(() => this.agregarConsulta(consulta))
      .catch((error) => {
        throw new Error(`Error al guardar la consulta: ${error}`);
      });
  }

  obtenerConsultas(): Observable<any[]> {
    const consultasRef = collection(this.firestore, 'consultas');
    return new Observable((observer) => {
      getDocs(consultasRef)
        .then((querySnapshot) => {
          const consultas: any[] = [];
          querySnapshot.forEach((doc) => {
            consultas.push({ id: doc.id, ...doc.data() });
          });
          observer.next(consultas);
        })
        .catch((error) => {
          observer.error(`Error al obtener las consultas: ${error}`);
        });
    });
  }

  private verificarExistenciaPaciente(dni: string): Promise<void> {
    const pacientesRef = collection(this.firestore, 'pacientes');
    const pacienteQuery = query(pacientesRef, where('dni', '==', dni));
    return getDocs(pacienteQuery)
      .then((snapshot) => {
        if (snapshot.empty) {
          throw new Error(`No se encontró un paciente con DNI ${dni}`);
        }
      });
  }

  private agregarConsulta(consulta: Mensaje): Promise<any> {
    const consultasRef = collection(this.firestore, 'consultas');
    return addDoc(consultasRef, consulta)
      .then((docRef) => {
        console.log("Documento agregado con ID: ", docRef.id);
      })
      .catch((error) => {
        throw new Error(`Error al agregar la consulta: ${error}`);
      });
  }

}

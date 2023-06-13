import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { getFirestore, collection, addDoc, getDocs } from 'firebase/firestore';
import { Mensaje } from '../models/mensaje';

@Injectable({
  providedIn: 'root'
})
export class ContactoService {
  private firestore = getFirestore();

  constructor() {}

  guardarConsulta(consulta: Mensaje): Promise<void> {
    consulta.id = this.generarIdMensaje(); // Asignar el ID automáticamente
    return this.agregarConsulta(consulta)
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

  private agregarConsulta(consulta: Mensaje): Promise<any> {
    const consultasRef = collection(this.firestore, 'consultas');
    return addDoc(consultasRef, { ...consulta }) // Enviar los datos como un objeto plano
      .then((docRef) => {
        console.log("Documento agregado con ID: ", docRef.id);
      })
      .catch((error) => {
        throw new Error(`Error al agregar la consulta: ${error}`);
      });
  }

  private generarIdMensaje(): string {
    // Generar un ID único para el mensaje
    return Math.random().toString(36).substring(2, 10);
  }
}

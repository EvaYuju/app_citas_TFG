import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { getFirestore, collection, addDoc, getDocs, query, orderBy, deleteDoc, doc } from 'firebase/firestore';
import { Mensaje } from '../models/mensaje';

@Injectable({
  providedIn: 'root'
})
export class ContactoService {
  private firestore = getFirestore();

  constructor() {}

  guardarConsulta(consulta: Mensaje): Promise<void> {
    return this.agregarConsulta(consulta)
      .then(() => {
        console.log("Consulta guardada con ID: ", consulta.id);
      })
      .catch((error) => {
        throw new Error(`Error al guardar la consulta: ${error}`);
      });
  }

  obtenerConsultas(): Observable<any[]> {
    const consultasRef = collection(this.firestore, 'consultas');
    const consultasQuery = query(consultasRef, orderBy('fechaConsulta'));
    return new Observable((observer) => {
      getDocs(consultasQuery)
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

  private async agregarConsulta(consulta: Mensaje): Promise<any> {
    try {
      const consultasRef = collection(this.firestore, 'consultas');
      const docRef = await addDoc(consultasRef, consulta);
      consulta.id = docRef.id; // Asignar el ID generado automáticamente al objeto consulta
      return docRef;
    } catch (error) {
      throw new Error(`Error al agregar la consulta: ${error}`);
    }
  }

  borrarConsulta(id: string) {
    const consultaRef = doc(this.firestore, 'consultas', id);
    console.log(id)
    return deleteDoc(consultaRef);
  }
}
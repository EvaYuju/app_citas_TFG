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

import { Especialidad } from '../models/specialties';

@Injectable({
  providedIn: 'root'
})
export class SpecialtiesService {

  constructor(private firestore: Firestore) { }

  getAllSpecialties() {
    //conexion de la base de datos con la tabla especialidades
    const specialtyRef = collection(this.firestore, 'especialidades');
    //lista de TODOS los elementos de la tabla(por que no lleva un where)
    const q = query(specialtyRef);
    //retorna lo que hagamos dentro del then
    return getDocs(q).then((snapshot) => {
      //si la lista de la base de datos no viene rellena, hacemos x cosa
      // creamos la lista de las especialidades que vamos a devolver
      const specialties: Especialidad[] = [];
      if(!snapshot.empty){
            //recorremos cada elemento de la base de datos, para manejar sus valores
            snapshot.forEach((doc) => {
              //creamos cada elemento specialty que vamos a añadir en nuestra lista specialties
              const specialty = doc.data() as Especialidad;
              specialties.push(specialty);
            });
      }
      return specialties;
    }
    );
  }
}

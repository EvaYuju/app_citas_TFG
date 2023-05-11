
import { Injectable } from '@angular/core';
import { Firestore, collection, addDoc, query, where, getDocs } from '@angular/fire/firestore';
import { Pacientes } from '../models/pacientes';


@Injectable({
  providedIn: 'root'
})
export class PacientesService {

  // Inyectamos Firebase en el constructor para poder trabajar con esa herramienta
  constructor(private firestore: Firestore) { }

  addPaciente(paciente: Pacientes){
    // Ref a la bd = metodo collection(importamos)(1ºparametro Sºfirestores, 2ºparam nombreColeccion)
    const pacienteRef = collection(this.firestore, 'pacientes');
    return addDoc(pacienteRef, paciente);
  }

  getPacientePorDNI(dni: string) {
    const pacienteRef = collection(this.firestore, 'pacientes');
    const q = query(pacienteRef, where('dni', '==', dni));
    return getDocs(q)
      .then((snapshot) => !snapshot.empty);
  }

}

/*
  getPlaces(): Observable<Place[]> {
    const placeRef = collection(this.firestore, 'places');
    return collectionData(placeRef, { idField: 'id' }) as Observable<Place[]>;
  }

  deletePlace(place: Place) {
    const placeDocRef = doc(this.firestore, `places/${place.id}`);
    return deleteDoc(placeDocRef);
  }*/

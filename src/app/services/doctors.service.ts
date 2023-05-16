import { Injectable } from '@angular/core';
import { Firestore, collection, addDoc, query, where, getDocs, doc, updateDoc, deleteDoc } from '@angular/fire/firestore';
import { Doctor } from '../models/doctor';

@Injectable({
  providedIn: 'root'
})
export class DoctorsService {

  // Inyectamos Firestore en el constructor para poder trabajar con esa herramienta
  constructor(private firestore: Firestore) { }
  //(recibe un doctor de tipo:)
  addDoctor(doctor: Doctor) {
    // Ref a la bd = metodo collection(importamos)(1ºparametro Sºfirestores, 2ºparam nombreColeccion)
    const doctorRef = collection(this.firestore, 'doctors');
    return addDoc(doctorRef, doctor)
  }
  getDoctorPorEspecialidad(specialty: string) {
    const doctorRef = collection(this.firestore, 'pacientes');
    const q = query(doctorRef, where('specialty', '==', specialty));
    return getDocs(q)
      .then((snapshot) => !snapshot.empty);
  }
  buscarDoctorPorEspecialidad(specialty: string) {
    const doctorRef = collection(this.firestore, 'doctors');
    const q = query(doctorRef, where('specialty', '==', specialty));
    return getDocs(q)
      .then((snapshot) => {
        if (!snapshot.empty) {
          const doctors: any = [];
          snapshot.forEach((doc) => {
            const doctor = doc.data() as Doctor;
            doctor.id = doc.id;
            doctors.push(doctor);
          });
          return doctors;
        } else {
          return [];
        }
      });
  }

  modificarDoctor(doctor: Doctor) {
    const doctorRef = doc(this.firestore, 'doctors', doctor.id);
    const doctorData = {
      dni: doctor.dni,
      name: doctor.name,
      specialty: doctor.specialty
    };
    return updateDoc(doctorRef, doctorData);
  }

  borrarDoctor(id: string) {
    const doctorRef = doc(this.firestore, 'doctors', id);
    return deleteDoc(doctorRef);

  }
}

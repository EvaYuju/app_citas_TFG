import { Injectable } from '@angular/core';
import { Firestore, collection, addDoc, query, where, getDocs, doc, updateDoc, deleteDoc, getDoc } from '@angular/fire/firestore';
import { Doctor } from '../models/doctor';

@Injectable({
  providedIn: 'root'
})
export class DoctorsService {

  constructor(private firestore: Firestore) { }

  addDoctor(doctor: Doctor) {
    const doctorRef = collection(this.firestore, 'doctores');
    return addDoc(doctorRef, doctor);
  }

  getDoctorPorEspecialidad(especialidad: string) {
    const doctorRef = collection(this.firestore, 'doctores');
    const q = query(doctorRef, where('especialidad', '==', especialidad));
    return getDocs(q)
      .then((snapshot) => !snapshot.empty);
  }
  getDoctorPorDni(dni: string) {
    const doctorRef2 = collection(this.firestore, 'doctores');
    const q = query(doctorRef2, where('dni', '==', dni));
    return getDocs(q)
      .then((snapshot) => !snapshot.empty);
  }

  getDoctorPorCorreo(correo: string) {
    const doctorRef = collection(this.firestore, 'doctores');
    const q = query(doctorRef, where('correoElectronico', '==', correo));
    return getDocs(q)
      .then((snapshot) => {
        if (!snapshot.empty) {
          const doctor = snapshot.docs[0].data() as Doctor;
          doctor.id = snapshot.docs[0].id;
          console.log(q);
          console.log(correo);
          return doctor;
        } else {
          return null;
        }
      });
  }



  buscarDoctorPorEspecialidad(especialidad: string) {
    const doctorRef = collection(this.firestore, 'doctores');
    const q = query(doctorRef, where('especialidad', '==', especialidad));
    return getDocs(q)
      .then((snapshot) => {
        if (!snapshot.empty) {
          const doctors: Doctor[] = [];
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


  async buscarDoctorPorDNI(dni: string) {
    const doctorRef2 = collection(this.firestore, 'doctores');
    const q = query(doctorRef2, where('dni', '==', dni));
    return getDocs(q)
      .then((snapshot) => {
        if (!snapshot.empty) {
          const doctors: Doctor[] = [];
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
    const doctorRef = doc(this.firestore, 'doctores', doctor.id);
    const doctorData = {
      id: doctor.id,
      nombre: doctor.nombre,
      apellidos: doctor.apellidos,
      dni: doctor.dni,
      nColegiado: doctor.nColegiado,
      especialidad: doctor.especialidad,
      telefono: doctor.telefono,
      correoElectronico: doctor.correoElectronico
    };
    return updateDoc(doctorRef, doctorData);
  }

  /*borrarDoctor(id: string) {
    const doctorRef = doc(this.firestore, 'doctores', id);
    return deleteDoc(doctorRef);
  }*/

  borrarDoctor(id: string) {
    const DoctorRef = doc(this.firestore, 'doctores', id);
    return getDoc(DoctorRef)
      .then((snapshot) => {
        if (snapshot.exists()) {
          const doctor = snapshot.data() as Doctor;
          return deleteDoc(DoctorRef).then(() => {
            const usuariosRef = collection(this.firestore, 'usuarios');
            const q = query(usuariosRef, where('correo', '==', doctor.correoElectronico));
            return getDocs(q).then((usuariosSnapshot) => {
              if (!usuariosSnapshot.empty) {
                usuariosSnapshot.forEach((usuarioDoc) => {
                  const usuarioId = usuarioDoc.id;
                  const usuarioRef = doc(usuariosRef, usuarioId);
                  return deleteDoc(usuarioRef);
                });
              }
            });
          });
        } else {
          return Promise.reject('El doctor no existe');
        }
      });
  }
  

}

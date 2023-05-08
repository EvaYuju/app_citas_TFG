import { Injectable } from '@angular/core';
import { Firestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class DoctorsService {

  // Inyectamos Firebase en el constructor para poder trabajar con esa herramienta
  constructor(private firestore: Firestore) { }



}

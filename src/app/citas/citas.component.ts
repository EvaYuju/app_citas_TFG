import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { ActivatedRoute } from '@angular/router';
import { AngularFirestore } from '@angular/fire/firestore';

@Component({
  selector: 'app-citas',
  templateUrl: './citas.component.html',
  styleUrls: ['./citas.component.scss'],
})
export class CitasComponent  implements OnInit {

  //miVariable: string = '¡Hola, mundo!';
  // Variables
  //doctorId: string;
  citas: any;

  constructor(private activatedRoute: ActivatedRoute, private navController: NavController, private firestore: AngularFirestore) { }


  ngOnInit() {
    this.doctorId = this.activatedRoute.snapshot.paramMap.get('doctorId');
  }

  //miFuncion(): void { console.log('Funcion ejecutada.'); }
  
  onSubmit(form) {
    const date = form.value.date;
    const time = form.value.time;
    // Llamada a Firebase para guardar la cita
  }



}

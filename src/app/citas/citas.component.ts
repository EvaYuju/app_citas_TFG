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
  citas: any[] = [];

  constructor(private navController: NavController, private firestore: AngularFirestore) { }


  ngOnInit() {
    // Aquí obtenemos las citas de Firebase
    this.firestore.collection('citas').valueChanges().subscribe((citas: any[]) => {
      this.citas = citas;
    });
  }

  //miFuncion(): void { console.log('Funcion ejecutada.'); }

  navigateToHome() {
    this.navController.navigateBack('home');
  }



}

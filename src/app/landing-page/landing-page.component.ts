import { Pacientes } from './../models/pacientes';
import { Component, OnInit } from '@angular/core';
import { PacientesService } from '../services/pacientes.service';
import { IonicModule } from '@ionic/angular';

@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.scss'],
})
export class LandingPageComponent {
  constructor() {}

  selectedSegment: string = 'pacientes';

  segmentChanged(event: CustomEvent) {
    this.selectedSegment = event.detail.value;
  }
}

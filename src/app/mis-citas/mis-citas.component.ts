import { Component, OnInit } from '@angular/core';
import { Citas } from './../models/citas';
import { CitasService } from '../services/citas.service';


@Component({
  selector: 'app-mis-citas',
  templateUrl: './mis-citas.component.html',
  styleUrls: ['./mis-citas.component.scss'],
})
export class MisCitasComponent implements OnInit {
  citasPaciente: Citas[] = [];
  dni: string = '';
  pacienteId: string = '';


  constructor(private citasService: CitasService) { }

  ngOnInit() { }

  buscarCitasPorDNI() {
    if (this.dni !== '') {
      this.citasService.buscarCitasPorDNI(this.dni).then((citas) => {
        this.citasPaciente = citas;
      });
    } else {
      this.citasPaciente = [];
    }
  }

  buscarCitasPorPacienteID() {
    if (this.pacienteId !== '') {
      this.citasService.buscarCitasPorPacienteID(this.pacienteId).then((citas) => {
        this.citasPaciente = citas;
      });
    } else {
      this.citasPaciente = [];
    }
  }
}

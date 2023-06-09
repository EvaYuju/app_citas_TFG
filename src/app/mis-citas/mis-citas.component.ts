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
  nuevoEstado: string = '';

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

  getColorByEstado(estado: string): string {
    switch (estado) {
      case 'confirmada':
        return 'rgb(150, 230, 150)'; // Cita confirmada
      case 'pendiente':
        return 'rgb(255, 255, 144)'; // Cita pendiente
      case 'denegada':
        return 'rgb(238, 77, 77)'; // Cita denegada
      default:
        return 'inherit'; // Color por defecto si el estado no coincide con ninguno de los casos anteriores
    }
  }

  ordenarCitasPorEstado() {
    this.citasPaciente.sort((citaA, citaB) => {
      const estadoA = this.obtenerValorEstado(citaA.estado);
      const estadoB = this.obtenerValorEstado(citaB.estado);

      if (estadoA < estadoB) {
        return -1;
      } else if (estadoA > estadoB) {
        return 1;
      } else {
        return 0;
      }
    });
  }

  obtenerValorEstado(estado: string): number {
    switch (estado) {
      case 'confirmada':
        return 1;
      case 'pendiente':
        return 2;
      case 'denegada':
        return 3;
      default:
        return 0;
    }
  }

  modificarEstadoCita(cita: Citas) {
    cita.estado = this.nuevoEstado;
    this.citasService.modificarCita(cita)
      .then(() => {
        console.log('Estado de la cita modificado exitosamente');
      })
      .catch((error) => {
        console.error('Error al modificar el estado de la cita:', error);
      });
  }
  
}

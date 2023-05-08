import { Pacientes } from './../models/pacientes';
import { Component, OnInit } from '@angular/core';
import { PacientesService } from '../services/pacientes.service';

@Component({
  selector: 'app-pacientes',
  templateUrl: './pacientes.component.html',
  styleUrls: ['./pacientes.component.scss']
})
export class PacientesComponent implements OnInit{
  paciente: Pacientes = {
    id: '',
    nombre: '',
    edad: null,
    direccion: '',
    telefono: '',
    email: ''
  };

  constructor(private pacientesService: PacientesService) { }

  ngOnInit() {
  }

  agregarPaciente() {
    this.pacientesService.addPaciente(this.paciente)
      .then(() => {
        console.log('Paciente agregado correctamente');
        // Aquí puedes realizar acciones adicionales después de agregar el paciente, como limpiar el formulario o mostrar un mensaje de éxito.
      })
      .catch(error => {
        console.error('Error al agregar el paciente:', error);
        // Aquí puedes manejar el error de manera adecuada, como mostrar un mensaje de error al usuario.
      });
  }
}

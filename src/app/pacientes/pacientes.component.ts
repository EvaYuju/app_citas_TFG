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
    dni: '',
    nombre: '',
    edad: null,
    direccion: '',
    telefono: '',
    email: ''
  };

  mensaje: string = '';

  constructor(private pacientesService: PacientesService) { }

  ngOnInit() {
  }

  agregarPaciente() {
    if (!this.camposValidos()) {
      this.mensaje = 'Por favor, completa todos los campos.';
      return;
    }

    this.pacientesService.getPacientePorDNI(this.paciente.dni)
      .then((pacienteExistente) => {
        if (pacienteExistente) {
          this.mensaje = 'Ya existe un paciente con este DNI.';
        } else {
          this.pacientesService.addPaciente(this.paciente)
            .then(() => {
              this.mensaje = 'Paciente agregado correctamente.';
              this.limpiarFormulario();
            })
            .catch((error) => {
              this.mensaje = 'Error al agregar el paciente: ' + error;
            });
        }
      })
      .catch((error) => {
        this.mensaje = 'Error al buscar el paciente: ' + error;
      });
  }

  camposValidos() {
    return (
      this.paciente.dni &&
      this.paciente.nombre &&
      this.paciente.edad &&
      this.paciente.direccion &&
      this.paciente.telefono &&
      this.paciente.email
    );
  }

  limpiarFormulario() {
    this.paciente = {
      dni: '',
      nombre: '',
      edad: null,
      direccion: '',
      telefono: '',
      email: ''
    };
  }
}

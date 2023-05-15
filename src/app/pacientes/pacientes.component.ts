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
    dni: '',
    nombre: '',
    edad: null,
    direccion: '',
    telefono: '',
    email: ''
  };

  mensaje: string = '';
  
  pacientesEncontrados: Pacientes[] = [];
  pacienteSeleccionado: Pacientes | null = null;

  dniBuscar: string = ''; // Agrega esta línea para definir la propiedad dniBuscar


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

  buscarPacientePorDNI(dni: string) {
    this.pacientesService.buscarPacientePorDNI(dni)
    .then((pacientes) => {
    this.pacientesEncontrados = pacientes;
    if (pacientes.length === 0) {
    this.mensaje = 'No se encontraron pacientes con este DNI.';
    } else {
    this.mensaje = '';
    }
    })
    .catch((error) => {
    this.mensaje = 'Error al buscar el paciente: ' + error;
    this.pacientesEncontrados = [];
    });
    }

    seleccionarPaciente(paciente: Pacientes) {
    this.pacienteSeleccionado = { ...paciente };
    }

    modificarPaciente() {
    if (this.pacienteSeleccionado) {
    this.pacientesService.modificarPaciente(this.pacienteSeleccionado)
    .then(() => {
    this.mensaje = 'Paciente modificado correctamente.';
    this.pacienteSeleccionado = null;
    })
    .catch((error) => {
    this.mensaje = 'Error al modificar el paciente: ' + error;
    });
    }
    }

    borrarPaciente(id: string) {
    this.pacientesService.borrarPaciente(id)
    .then(() => {
    this.mensaje = 'Paciente eliminado correctamente.';
    this.pacientesEncontrados = this.pacientesEncontrados.filter(paciente => paciente.id !== id);
    })
    .catch((error) => {
    this.mensaje = 'Error al eliminar el paciente: ' + error;
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
      id: '',
      dni: '',
      nombre: '',
      edad: null,
      direccion: '',
      telefono: '',
      email: ''
    };
  }
}

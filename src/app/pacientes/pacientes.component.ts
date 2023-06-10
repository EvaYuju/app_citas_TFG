import { CommonModule, DatePipe } from '@angular/common';
import { Pacientes } from './../models/pacientes';
import { Component, OnInit } from '@angular/core';
import { PacientesService } from '../services/pacientes.service';
import { AuthService } from '../services/auth.service';
import { UsuariosService } from '../services/usuarios.service';

@Component({
  selector: 'app-pacientes',
  templateUrl: './pacientes.component.html',
  styleUrls: ['./pacientes.component.scss']
})
export class PacientesComponent implements OnInit{
  paciente: Pacientes = {
    id: '',
    nombre: '',
    apellidos: '',
    dni: '',
    nSeguridadSocial: '',
    fechaNacimiento: new Date(),
    direccion: '',
    telefono: '',
    correoElectronico: '',
  };
  //PARA AUTHENTICATION
  rol: any;
  mensaje: string = '';

  pacientesEncontrados: Pacientes[] = [];
  pacienteSeleccionado: Pacientes | null = null;

  dniBuscar: string = ''; // Agrega esta línea para definir la propiedad dniBuscar
  minDate: string = '';


  constructor(private pacientesService: PacientesService) { }

  ngOnInit() {
    //PARA AUTHENTICATION
    this.pacienteSeleccionado = this.paciente;
    this.rol = localStorage.getItem('ROL');

    const currentDate = new Date();
    this.minDate = this.getFormattedDate(currentDate);
  }
  //PARA AUTHENTICATION
  isAuthenticated(rol:string){
    return this.rol == rol;
  }

  agregarPaciente() {
    if (!this.camposValidos()) {
      this.mensaje = 'Por favor, complete todos los campos.';
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

  getFormattedDate(date: Date): string {
    const year = date.getFullYear();
    const month = ('0' + (date.getMonth() + 1)).slice(-2);
    const day = ('0' + date.getDate()).slice(-2);
    const hours = ('0' + date.getHours()).slice(-2);
    const minutes = ('0' + date.getMinutes()).slice(-2);
    return `${year}-${month}-${day}T${hours}:${minutes}:00.000Z`;
  }

  camposValidos() {
    return (
      this.paciente.dni &&
      this.paciente.nombre &&
      this.paciente.fechaNacimiento &&
      this.paciente.direccion &&
      this.paciente.telefono &&
      this.paciente.correoElectronico
    );
  }

  limpiarFormulario() {
    this.paciente = {
      id: '',
      nombre: '',
      apellidos: '',
      dni: '',
      nSeguridadSocial: '',
      fechaNacimiento: new Date(),
      direccion: '',
      telefono: '',
      correoElectronico: '',
      //citas: ''
    };
  }
}

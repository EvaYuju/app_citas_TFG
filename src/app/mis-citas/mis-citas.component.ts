import { Component, OnInit } from '@angular/core';
import { Citas } from './../models/citas';
import { CitasService } from '../services/citas.service';
import { UsuariosService } from '../services/usuarios.service';
import { PacientesService } from './../services/pacientes.service';
import { Usuarios } from '../models/usuarios';
import { AuthService } from './../services/auth.service';
import { take } from 'rxjs/operators';


@Component({
  selector: 'app-mis-citas',
  templateUrl: './mis-citas.component.html',
  styleUrls: ['./mis-citas.component.scss'],
})
export class MisCitasComponent implements OnInit {
  citasPaciente: Citas[] = [];
  dni: string = '';
  pacienteId: string = '';
  nuevoEstado: string = ''; // Almacenar el cambio del estado
  usuarioRol: string = ''; // Agrega esta línea para almacenar el rol del usuario
  usuarioPacienteDni: string = '';
  dniUsuarioActual: string = '';

  constructor(
    private citasService: CitasService,
    private usuariosService: UsuariosService,
    private pacientesService: PacientesService,
    private authService: AuthService
    ) { }

  ngOnInit() { 
    this.obtenerUsuarioRol().then(() => {
      this.obtenerUsuarioDNI().then(() => {
        this.buscarCitas();
      });
    });

  }

  // ROL PACIENTE 
  obtenerUsuarioDNI() {
    return this.authService.getUsuarioEmail().pipe(take(1)).toPromise().then((correo) => {
      if (correo) {
        if (this.usuarioRol === 'PACIENTE') {
          return this.pacientesService.getPacientePorCorreo(correo).then((paciente) => {
            if (paciente) {
              this.dniUsuarioActual = paciente.dni; // Almacena el DNI en una variable para usarlo en la vista HTML
            }
            return null; // Add a return statement here
          });
        }
      }
      return null; // Add a return statement here
    });
  }
  
  obtenerUsuarioRol() {
    return this.authService.getUsuarioEmail().pipe(take(1)).toPromise().then((correo) => {
      if (correo) {
        return this.usuariosService.getUsuarioRol(correo).then((rol) => {
          this.usuarioRol = rol || '';
  
          // Obtener el paciente.DATO_QUE_QUERAMOS del paciente logueado 
          if (this.usuarioRol === 'PACIENTE') {
            return this.pacientesService.getPacientePorCorreo(correo).then((paciente) => {
              if (paciente) {
                this.dniUsuarioActual = paciente.dni; // Almacena el DNI en una variable para usarlo en la vista HTML
              }
              return rol;
            });
          } else {
            return rol;
          }
        });
      }
      return null; // Add a return statement here
    });
  }
  

  
  
  
  
  
  

  getUsuarioRol(correo: string): Promise<string | null> {
    return this.usuariosService.getUsuarioRol(correo).then((rol) => {
      this.usuarioRol = rol || '';
      // Obtener el paciente.DATO_QUE_QUERAMOS del paciente logueado 
      if (this.usuarioRol === 'PACIENTE') {
        return this.pacientesService.getPacientePorCorreo(correo).then((paciente) => {
          if (paciente) {
            this.dniUsuarioActual = paciente.dni; // Almacena el DNI en una variable para usarlo en la vista HTML
          }
          return rol;
        });
      } else {
        return rol;
      }
    });
  }

  buscarCitas() {
    if (this.dniUsuarioActual !== '') {
      this.citasService.buscarCitasPorPacienteID(this.dniUsuarioActual).then((citas) => {
        this.citasPaciente = citas;
        console.log("Citas del paciente:", this.citasPaciente);

      });
    } else {
      this.citasPaciente = [];
    }
  }

  // ROL MEDICO 
  buscarCitasPorDNI() {
    console.log("Buscar citas se ha ejecutado correctamente.MED");

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
                console.log("Citas del paciente:", this.citasPaciente);

      });
    } else {
      this.citasPaciente = [];
    }
  }

  // Métodos comúnes

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

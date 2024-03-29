import { Component, OnInit } from '@angular/core';
import { Doctor } from '../models/doctor';
import { DoctorsService } from '../services/doctors.service';
import { Especialidad } from '../models/specialties';
import { SpecialtiesService } from '../services/specialties.service';
import { UsuariosService } from '../services/usuarios.service';

@Component({
  selector: 'app-doctores',
  templateUrl: './doctores.component.html',
  styleUrls: ['./doctores.component.scss']
})

export class DoctoresComponent implements OnInit {
  doctor: Doctor = {
    id: '',
    nombre: '',
    apellidos: '',
    dni: '',
    nColegiado: '',
    especialidad: '',
    telefono: '',
    correoElectronico: '',
    horario: this.generarHorario(this.horaInicio, this.horaFinal),
    //citas: ''
  };

  //PARA AUTHENTICATION
  rol: any;

  mensaje: string = '';
  mensajeBusq: string = '';

  horaInicio?: number;
  horaFinal?: number;
  doctorsEncontrados: Doctor[] = [];
  doctorsEncontradosDNI: Doctor[] = [];
  doctorSeleccionado: Doctor | null = null;

  specialtyBuscar: string = '';
  dniBuscar: string = '';

  especialidades: Especialidad[] = [];

  constructor(
    private doctorsService: DoctorsService, 
    private specialtiesService: SpecialtiesService,     
    private usuariosService: UsuariosService
    ) {
    this.loadDoctorsBySpecialty();


  }

  ngOnInit() {
    this.loadSpecialties();
    this.rol = localStorage.getItem('ROL');
  }

  //PARA AUTHENTICATION
  isAuthenticated(rol:string){
    return this.rol == rol;
  }

  agregarDoctor() {
    if (!this.camposValidos()) {
      this.mensaje = 'Por favor, completa todos los campos.';
      return;
    }

    this.doctorsService.getDoctorPorDni(this.doctor.dni)
      .then((exists) => {
        if (exists) {
          this.mensaje = 'Ya existe un doctor con ese DNI.';
        } else {
          this.doctorsService.addDoctor(this.doctor)
            .then(() => {
              this.mensaje = 'Doctor agregado exitosamente.';
              this.limpiarFormulario();
            })
            .catch((error: any) => {
              this.mensaje = 'Error al agregar doctor: ' + error;
            });
        }
      })
      .catch((error: any) => {
        this.mensaje = 'Error al verificar la existencia del doctor: ' + error;
      });
  }

  buscarDoctorPorEspecialidad(especialidad: string) {
    this.doctorsService.buscarDoctorPorEspecialidad(especialidad)
      .then((doctors) => {
        this.doctorsEncontrados = doctors;
        if (doctors.length === 0) {
          this.mensajeBusq = 'No se encontraron doctores con esta especialidad.';
          this.limpiarFormulario();
        } else {
          this.mensajeBusq = '';
        }
      })
      .catch((error) => {
        this.mensajeBusq = 'Error al buscar el doctor: ' + error;
        this.doctorsEncontrados = [];
      });
  }

  buscarDoctorPorDNI(dni: string) {
    this.doctorsService.buscarDoctorPorDNI(dni)
    .then((doctors) => {
    this.doctorsEncontrados = doctors;
    if (doctors.length === 0) {
    this.mensajeBusq = 'No se encontraron doctores con este DNI.';
    } else {
    this.mensajeBusq = '';
    }
    })
    .catch((error) => {
    this.mensajeBusq = 'Error al buscar el doctor: ' + error;
    this.doctorsEncontradosDNI = [];
    });
    }


  seleccionarDoctor(doctor: Doctor) {
    this.doctorSeleccionado = { ...doctor };
  }

  modificarDoctor() {
    if (this.doctorSeleccionado) {
      this.doctorsService.modificarDoctor(this.doctorSeleccionado)
        .then(() => {
          this.mensaje = 'Doctor modificado correctamente.';
          this.doctorSeleccionado = null;
          this.buscarDoctorPorEspecialidad(this.specialtyBuscar);
        })
        .catch((error) => {
          this.mensaje = 'Error al modificar el doctor: ' + error;
        });
    }
  }

  borrarDoctor(id: string) {
    this.doctorsService.borrarDoctor(id)
      .then(() => {
        this.mensaje = 'Doctor eliminado correctamente.';
        this.doctorsEncontrados = this.doctorsEncontrados.filter(doctor => doctor.id !== id);
      })
      .catch((error) => {
        this.mensaje = 'Error al eliminar el doctor: ' + error;
      });
  }

// Llamada a la función de borrado de usuario en el servicio correspondiente
borrarUsuario(correo: string) {
  this.usuariosService.borrarUsuario(correo)
    .then(() => {
      console.log('Usuario eliminado correctamente.');
    })
    .catch((error) => {
      console.log('Error al eliminar el usuario: ' + error);
    });
}




  // Validación
  camposValidos() {
    return (
      this.doctor.dni &&
      this.doctor.nombre &&
      this.doctor.especialidad
    );
  }

  // Métodos adicionales
  limpiarFormulario() {
    this.doctor = {
      id: '',
      nombre: '',
      apellidos: '',
      dni: '',
      nColegiado: '',
      especialidad: '',
      telefono: '',
      correoElectronico: '',
      horario: this.generarHorario(),
    };
  }

  loadDoctorsBySpecialty() {
    const especialidadSeleccionada = this.specialtyBuscar;
    if (especialidadSeleccionada) {
      this.doctorsService.buscarDoctorPorEspecialidad(especialidadSeleccionada)
        .then((doctors) => {
          this.doctorsEncontrados = doctors;
          if (doctors.length === 0) {
            this.mensaje = 'No se encontraron doctores con esta especialidad.';
          } else {
            this.mensaje = '';
          }
        })
        .catch((error) => {
          this.mensaje = 'Error al buscar el doctor: ' + error;
          this.doctorsEncontrados = [];
        });
    } else {
      this.doctorsEncontrados = [];
      this.mensaje = '';
    }
  }

  generarHorario(horaIni?: number, horaFin?: number) {
    const horario = [];
    const horaInicio = new Date().setHours(horaIni? horaIni: 8, 0, 0); // Establecer hora de inicio en 8:00 AM
    const horaFinal = new Date().setHours(horaFin? horaFin: 15, 0, 0); // Establecer hora de fin en 3:00 PM

    const tiempoIncremento = 30; // Incremento de tiempo en minutos

    let horaActual = horaInicio;
    while (horaActual <= horaFinal) {
      const hora = new Date(horaActual);
      const horaFormateada = this.formatoHora(hora);
      horario.push(horaFormateada);

      horaActual += tiempoIncremento * 60 * 1000; // Convertir el incremento a milisegundos
    }

    return horario;
  }

  formatoHora(hora: Date) {
    const opciones = { hour: 'numeric', minute: 'numeric' } as const;
    return hora.toLocaleTimeString([], opciones);
  }

  loadSpecialties(){
    this.specialtiesService.getAllSpecialties().then((listSpecialties) => {
      this.especialidades = listSpecialties;
    });
  }



}

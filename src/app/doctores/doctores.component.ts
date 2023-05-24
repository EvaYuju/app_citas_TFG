import { Component, OnInit } from '@angular/core';
import { Doctor } from '../models/doctor';
import { DoctorsService } from '../services/doctors.service';
import { Especialidad } from '../models/specialties';

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
    horario: this.generarHorario(),
    //citas: ''
  };

  mensaje: string = '';

  doctorsEncontrados: Doctor[] = [];
  doctorSeleccionado: Doctor | null = null;

  specialtyBuscar: string = '';

  especialidades: Especialidad[] = [
    // ...
  ];

  constructor(private doctorsService: DoctorsService) {
    this.loadDoctorsBySpecialty();

    
  }

  ngOnInit() {
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
          this.mensaje = 'No se encontraron doctores con esta especialidad.';
          this.limpiarFormulario();
        } else {
          this.mensaje = '';
        }
      })
      .catch((error) => {
        this.mensaje = 'Error al buscar el doctor: ' + error;
        this.doctorsEncontrados = [];
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
      //citas: ''
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

  generarHorario() {
    const horario = [];
    const horaInicio = new Date().setHours(8, 0, 0); // Establecer hora de inicio en 8:00 AM
    const horaFin = new Date().setHours(15, 0, 0); // Establecer hora de fin en 3:00 PM

    const tiempoIncremento = 30; // Incremento de tiempo en minutos

    let horaActual = horaInicio;
    while (horaActual <= horaFin) {
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




}

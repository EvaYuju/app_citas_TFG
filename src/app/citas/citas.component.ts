import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { Citas } from './../models/citas';
import { CitasService } from '../services/citas.service';
import { DoctorsService } from '../services/doctors.service';
import { SpecialtiesService } from '../services/specialties.service';
import { Especialidad } from '../models/specialties';
import { Doctor } from '../models/doctor';
import { UsuariosService } from '../services/usuarios.service';


@Component({
  selector: 'app-citas',
  templateUrl: './citas.component.html',
  styleUrls: ['./citas.component.scss'],
})
export class CitasComponent implements OnInit {
  cita: Citas = {
    id: '',
    pacienteId: '',
    doctorId: '',
    especialidad: '',
    fecha: new Date(),
    motivo: '',
    estado: '',
    comentario: '',
  };

  doctors: Doctor[] = [];

  mensaje: string = '';

  specialtyBuscar: string = '';
  doctorSeleccionado: Doctor | null = null;
  citasEncontradas: Citas[] = [];
  citaSeleccionada: Citas | null = null;
  especialidades: Especialidad[] = [];
  idBuscar: string = ''; // Agrega esta línea para definir la propiedad idBuscar
  usuarioRol: string = ''; // Agrega esta línea para almacenar el rol del usuario

  constructor(
    private citasService: CitasService,
    private doctorsService: DoctorsService,
    private specialtiesService: SpecialtiesService,
    private usuariosService: UsuariosService
    ) {}

  ngOnInit() {
    this.citaSeleccionada = this.cita;
    this.loadSpecialties();
    
  }

  agregarCita() {
    if (!this.camposValidos()) {
      this.mensaje = 'Por favor, completa todos los campos.';
      return;
    }

    this.citasService
      .getCitaPorID(this.cita.id)
      .then((citaExistente) => {
        if (citaExistente) {
          this.mensaje = 'Ya existe una cita con este ID.';
        } else {
          this.citasService
            .addCita(this.cita)
            .then(() => {
              this.mensaje = 'Cita agregada correctamente.';
              this.limpiarFormulario();
            })
            .catch((error) => {
              this.mensaje = 'Error al agregar la cita: ' + error;
            });
        }
      })
      .catch((error) => {
        this.mensaje = 'Error al buscar la cita: ' + error;
      });
  }

  buscarCitaPorID(id: string) {
    this.citasService
      .buscarCitaPorID(id)
      .then((citas) => {
        this.citasEncontradas = citas;
        if (citas.length === 0) {
          this.mensaje = 'No se encontraron citas con este DID.';
        } else {
          this.mensaje = '';
        }
      })
      .catch((error) => {
        this.mensaje = 'Error al buscar la cita: ' + error;
        this.citasEncontradas = [];
      });
  }

  seleccionarCita(cita: Citas) {
    this.citaSeleccionada = { ...cita };
  }

  modificarCita() {
    if (this.citaSeleccionada) {
      this.citasService
        .modificarCita(this.citaSeleccionada)
        .then(() => {
          this.mensaje = 'Cita modificada correctamente.';
          this.citaSeleccionada = null;
        })
        .catch((error) => {
          this.mensaje = 'Error al modificar la cita: ' + error;
        });
    }
  }

  buscarDoctorPorEspecialidad(especialidad: string) {
    this.doctorsService
      .buscarDoctorPorEspecialidad(especialidad)
      .then((doctors) => {
        this.doctors = doctors;
        if (doctors.length === 0) {
          this.mensaje = 'No se encontraron doctores con esta especialidad.';
          this.limpiarFormulario();
        } else {
          this.mensaje = '';
        }
      })
      .catch((error) => {
        this.mensaje = 'Error al buscar el doctor: ' + error;
        this.doctors = [];
      });
  }

  loadSpecialties() {
    this.specialtiesService.getAllSpecialties().then((listSpecialties) => {
      this.especialidades = listSpecialties;
    });
  }

  seleccionarDoctor(doctor: Doctor) {
    this.doctorSeleccionado = { ...doctor };
  }

  borrarCita(id: string) {
    this.citasService
      .borrarCita(id)
      .then(() => {
        this.mensaje = 'Cita eliminada correctamente.';
        this.citasEncontradas = this.citasEncontradas.filter(
          (cita) => cita.id !== id
        );
      })
      .catch((error) => {
        this.mensaje = 'Error al eliminar la cita: ' + error;
      });
  }

  camposValidos() {
    return (
      this.cita.id &&
      this.cita.pacienteId &&
      this.cita.doctorId &&
      this.cita.especialidad &&
      this.cita.fecha &&
      this.cita.motivo &&
      this.cita.estado
    );
  }

  limpiarFormulario() {
    this.cita = {
      id: '',
      pacienteId: '',
      doctorId: '',
      especialidad: '',
      fecha: new Date(),
      motivo: '',
      estado: '',
      comentario: '',
    };
  }
}

import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { Citas } from './../models/citas';
import { CitasService } from '../services/citas.service';
import { DoctorsService } from '../services/doctors.service';
import { SpecialtiesService } from '../services/specialties.service';
import { Especialidad } from '../models/specialties';
import { Doctor } from '../models/doctor';
import { UsuariosService } from '../services/usuarios.service';
import { AlertController } from '@ionic/angular';


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
    hora: '',
    motivo: '',
    estado: '',
    comentario: '',
  };

  doctors: Doctor[] = [];

  mensaje: string = '';
  mensajeID: string = '';
  mensajeDoc: string = '';


  specialtyBuscar: string = '';
  doctorSeleccionado: Doctor | null = null;
  citasEncontradas: Citas[] = [];
  citaSeleccionada: Citas | null = null;
  especialidades: Especialidad[] = [];
  idBuscar: string = ''; // Agrega esta línea para definir la propiedad idBuscar
  usuarioRol: string = ''; // Agrega esta línea para almacenar el rol del usuario
  minDate: string = '';
  horariosDoctor: string[] = [];


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

    // Obtener la hora seleccionada del componente ion-datetime y asignarla al campo 'hora'
  const selectedDateTime: Date = new Date(this.cita.fecha);
  const selectedTime: string = ('0' + selectedDateTime.getHours()).slice(-2) + ':' + ('0' + selectedDateTime.getMinutes()).slice(-2);
  this.cita.hora = selectedTime;
  
    this.citasService
      .addCita(this.cita)
      .then(() => {
        this.mensajeID =
          'Cita agregada correctamente. ID de la cita: ' + this.cita.id;
        this.limpiarFormulario();
      })
      .catch((error) => {
        this.mensaje = 'Error al agregar la cita: ' + error;
      });
  }
  

  buscarCitaPorID(id: string) {
    this.citasService.buscarCitaPorID(this.cita.id)
      .then((citas) => {
        this.citasEncontradas = citas;
        if (citas.length === 0) {
          this.mensaje = 'No se encontraron citas con este ID.';
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
          this.mensajeDoc = 'No se encontraron doctores con esta especialidad.';
          this.limpiarFormulario();
        } else {
          this.mensajeDoc = '';
          this.horariosDoctor = doctors[0].horario;
        }
      })
      .catch((error) => {
        this.mensajeDoc = 'Error al buscar el doctor: ' + error;
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
    this.loadDoctorSchedule();
  }
  loadDoctorSchedule() {
    if (this.doctorSeleccionado) {
      this.minDate = this.getFormattedDate(new Date());
      // Obtener los horarios del doctor seleccionado
      this.horariosDoctor = this.doctorSeleccionado.horario;
      // Utilizar el primer horario disponible como fecha mínima
      this.minDate += ' ' + this.horariosDoctor[0];
    }
  }
  // Aquí se obtiene el horario del doctor seleccionado y se establece como fecha mínima permitida
      // para la selección en el componente ion-datetime.
      // Asegúrate de que el horario del doctor sea un array de strings que representen las horas disponibles.
      // Por ejemplo, ['09:00', '10:00', '11:00', ...].


  getFormattedDate(date: Date): string {
    const year = date.getFullYear();
    const month = ('0' + (date.getMonth() + 1)).slice(-2);
    const day = ('0' + date.getDate()).slice(-2);
    const hours = ('0' + date.getHours()).slice(-2);
    const minutes = ('0' + date.getMinutes()).slice(-2);
    return `${day}/${month}/${year} ${hours}:${minutes}`;
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
      hora: '',
      motivo: '',
      estado: '',
      comentario: '',
    };
  }
}
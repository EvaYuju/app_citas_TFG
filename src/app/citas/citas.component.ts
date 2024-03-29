import { CommonModule, DatePipe } from '@angular/common';
import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { NavController } from '@ionic/angular';
import { Citas } from './../models/citas';
import { CitasService } from '../services/citas.service';
import { DoctorsService } from '../services/doctors.service';
import { SpecialtiesService } from '../services/specialties.service';
import { Especialidad } from '../models/specialties';
import { Doctor } from '../models/doctor';
import { UsuariosService } from '../services/usuarios.service';
import { PacientesService } from './../services/pacientes.service';
import { Usuarios } from '../models/usuarios';
import { AuthService } from './../services/auth.service';

import {
  Firestore,
  collection,
  addDoc,
  query,
  where,
  getDocs,
  doc,
  updateDoc,
  deleteDoc,
} from '@angular/fire/firestore';

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

  isWeekday = (dateString: string) => {
    const date = new Date(dateString);
    const utcDay = date.getUTCDay();
    return utcDay !== 0 && utcDay !== 6;
  };

  doctors: Doctor[] = [];

  mensaje: string = '';
  mensajeID: string = '';
  mensajeDoc: string = '';

  specialtyBuscar: string = '';
  doctorSeleccionado?: Doctor;
  citasEncontradas: Citas[] = [];
  citaSeleccionada: Citas | null = null;
  especialidades: Especialidad[] = [];
  idBuscar: string = ''; // Agrega esta línea para definir la propiedad idBuscar
  usuarioRol: string = ''; // Agrega esta línea para almacenar el rol del usuario
  minDate: string = '';
  horariosDoctor: string[] = [];
  usuarioPacienteDni: string = '';
  dniUsuarioActual: string = '';
  correoUsuarioActual: string = '';
  

  constructor(
    private citasService: CitasService,
    private doctorsService: DoctorsService,
    private specialtiesService: SpecialtiesService,
    private usuariosService: UsuariosService,
    private alertController: AlertController,
    private pacientesService: PacientesService,
    private firestore: Firestore,
    private auth: AuthService,
    private authService: AuthService,
    private datepipe: DatePipe
  ) {}

  ngOnInit() {
    this.citaSeleccionada = this.cita;
    this.loadSpecialties();
    this.obtenerUsuarioRol(); // Obtener el rol del usuario
    this.usuarioRol = '';
    this.obtenerUsuarioDNI(); // Obtener el DNI del paciente logueado
    this.dniUsuarioActual = '';
    this.correoUsuarioActual = '';

    const currentDate = new Date();
    this.minDate = this.getFormattedDate(currentDate);



    //this.selectDoctor("20000009H",new Date());

  }

  async selectDoctor(dni?:string, date?:Date){
    let doctores:Doctor[] = [];
    if(dni && date){
      await this.doctorsService.buscarDoctorPorDNI(dni).then((value) => {doctores = value});
    this.seleccionarDoctor(
      doctores[0],
      date
      );
    }
  }
  // ***
  obtenerUsuarioRol() {
    this.authService.getUsuarioEmail().subscribe((correo) => {
      if (correo) {
        this.usuariosService.getUsuarioRol(correo).then((rol) => {
          this.usuarioRol = rol || '';

          // Obtener el paciente.DATO_QUE_QUERAMOS del paciente logueado
          if (this.usuarioRol === 'PACIENTE') {
            this.pacientesService
              .getPacientePorCorreo(correo)
              .then((paciente) => {
                if (paciente) {
                  this.dniUsuarioActual = paciente.dni; // Almacena el DNI en una variable para usarlo en la vista HTML
                }
              });
          }
        });
      }
    });
  }

  getUsuarioRol(correo: string): Promise<string | null> {
    return this.usuariosService.getUsuarioRol(correo).then((rol) => {
      this.usuarioRol = rol || '';
      // Obtener el paciente.DATO_QUE_QUERAMOS del paciente logueado
      if (this.usuarioRol === 'PACIENTE') {
        return this.pacientesService
          .getPacientePorCorreo(correo)
          .then((paciente) => {
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
  

  obtenerUsuarioDNI() {
    this.authService.getUsuarioEmail().subscribe((correo) => {
      if (correo) {
        if (this.usuarioRol === 'PACIENTE') {
          this.pacientesService
            .getPacientePorCorreo(correo)
            .then((paciente) => {
              if (paciente) {
                this.dniUsuarioActual = paciente.dni; // Almacena el DNI en una variable para usarlo en la vista HTML
              }
            });
        }
      }
    });
  }

  async agregarCita() {
    if (!this.camposValidos()) {
      this.mensaje = 'Por favor, complete todos los campos.';
      return;

    }
    if (this.usuarioRol === 'MEDICO') {
    // Comprobar si el dni existe
    console.log('Valor de this.cita.pacienteId:', this.cita.pacienteId);

    const pacienteExists = await this.pacientesService.getPacientePorDNI(
      this.cita.pacienteId
    );
    console.log('Valor de pacienteExists:', pacienteExists);

    if (!pacienteExists) {
      this.mensaje = 'El DNI del paciente no coincide con ningún paciente registrado.';
      return;
    }
  }
    // Obtener la hora seleccionada del componente ion-select y asignarla al campo 'hora'
    this.cita.hora = this.cita.hora.substring(0, 5);
    /*const docRef = await addDoc(
      collection(this.firestore, 'citas'),
      this.cita
    );
    this.cita.id = docRef.id; */
    if (this.usuarioRol === 'PACIENTE') {
      this.cita.pacienteId = this.dniUsuarioActual;
      this.cita.estado = 'pendiente';

    }

    // Agregar la cita a Firestore
    try {
      const docRef = await addDoc(
        collection(this.firestore, 'citas'),
        this.cita
      );
      this.cita.id = docRef.id;
      if (this.usuarioRol === 'MEDICO') {
        this.mensajeID =
        'Cita agregada correctamente (ID de la cita: ' + docRef.id +').' ;
      }  else if (this.usuarioRol === 'PACIENTE') {
        this.mensajeID = 'Su cita ha sido agregada correctamente. Será gestionada por nuestros doctores. Podrá consultar su estado en el apartado "Mis citas".';
      }
      
      this.limpiarFormulario();
      this.limpiarMensaje(); // Limpia el mensaje 1º

    } catch (error) {
      this.mensaje = 'Error al agregar la cita: ' + error;
    }
  }

  buscarCitaPorID(id: string) {
    this.citasService
      .buscarCitaPorID(id)
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

  async filtarHorariosDoctor(doctor: Doctor, fecha: Date) {
    let horasCitas: string[] = [];
    let horas_final: string[] =[];
    let date = this.datepipe.transform(fecha, 'yyyy-MM-dd');
    if (date) {
      await this.citasService
        .buscarCitasPorDoctorDNI(doctor.dni, date)
        .then((citas) => {
          citas.forEach((cita) => {
            horasCitas.push(cita.hora);
          });
          doctor.horario.forEach((searchElement) => {

            if(!horasCitas.includes(searchElement)){
              horas_final.push(searchElement);
            }
          });
        });

      return horas_final;
    }
    return [];
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
          doctors[0].horario;
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

  async seleccionarDoctor(doctor: Doctor, fecha:Date) {
    this.doctorSeleccionado = { ...doctor };
    this.doctorSeleccionado.horario = await this.filtarHorariosDoctor(
      this.doctorSeleccionado,
      fecha
    );
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
      //this.cita.pacienteId &&
      this.cita.doctorId &&
      this.cita.especialidad &&
      this.cita.fecha &&
      this.cita.motivo 
      //this.cita.estado
    );
  }

  async showTimes(fecha?:Date) {
    await this.selectDoctor(this.cita.doctorId, fecha);
  }

  borrarHoras() {
    let horas = this.horariosDoctor;
    this.horariosDoctor = [];
    this.horariosDoctor = horas;
    this.horariosDoctor;
    this.cita.hora = '';
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
  limpiarMensaje() {
    this.mensaje = '';
  }
}

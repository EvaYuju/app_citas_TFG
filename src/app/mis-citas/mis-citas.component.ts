import { Component, OnInit } from '@angular/core';
import { Citas } from './../models/citas';
import { CitasService } from '../services/citas.service';
import { UsuariosService } from '../services/usuarios.service';
import { PacientesService } from './../services/pacientes.service';
import { SpecialtiesService } from '../services/specialties.service';
import { Especialidad } from '../models/specialties';
import { Usuarios } from '../models/usuarios';
import { AuthService } from './../services/auth.service';
import { take } from 'rxjs/operators';
import { DoctorsService } from './../services/doctors.service';


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


@Component({
  selector: 'app-mis-citas',
  templateUrl: './mis-citas.component.html',
  styleUrls: ['./mis-citas.component.scss'],
})
export class MisCitasComponent implements OnInit {
  citasPaciente: Citas[] = [];
  citasDoctor: Citas[] = []; // ***
  dni: string = '';
  pacienteId: string ='';
  doctorId: string ='';
  nuevoEstado: string = ''; // Almacenar el cambio del estado
  usuarioRol: string = ''; // Agrega esta línea para almacenar el rol del usuario
  //usuarioPacienteDni: string = '';
  dniUsuarioActual: string = '';
  tlfUsuarioActual: string = '';
  correoUsuarioActual: string = '';
  nombreUsuarioActual: string = ''; // pendiente hacer y en todas
  citasEncontradasEspecialidad: Citas[] = [];
  especialidades: Especialidad[] = [];
  specialtyBuscar: string = '';

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

  //cita: Citas;


  constructor(
    private citasService: CitasService,
    private usuariosService: UsuariosService,
    private pacientesService: PacientesService,
    private doctorsService: DoctorsService,
    private firestore: Firestore,
    private specialtiesService: SpecialtiesService,
    private authService: AuthService
    ) { }

  ngOnInit() {
    this.loadSpecialties();
    this.obtenerUsuarioRol().then(() => {
      this.obtenerUsuarioDNI().then(() => {
        this.buscarCitas(); // Inizializar ver citas de paciente logueado
        this.buscarCitasDoc(); // Inizializar ver citas de doctor logueado
        this.buscarCitasPorDoctorID(); // Agrega esta línea para buscar las citas del doctor

      });
    });

    /*this.citasService.obtenerCitas().subscribe(
      (citasV) => {
        this.citasDoctor = citasV;
      },
      (error) => {
        console.error(error);
      }
    );*/
  }

  obtenerUsuarioDNI() {
    return this.authService.getUsuarioEmail().pipe(take(1)).toPromise().then((correo) => {
      if (correo) {
        if (this.usuarioRol === 'PACIENTE') {
          return this.pacientesService.getPacientePorCorreo(correo).then((paciente) => {
            if (paciente) {
              this.dniUsuarioActual = paciente.dni;
            }
            return null;
          });
        } else if (this.usuarioRol === 'DOCTOR') {
          return this.doctorsService.getDoctorPorCorreo(correo).then((doctor) => {
            if (doctor) {
              this.dniUsuarioActual = doctor.dni;
              this.doctorId = doctor.id;
            }
            return null;
          });
        }
      }
      return null;
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
          } else if (this.usuarioRol === 'MEDICO') {
            return this.doctorsService.getDoctorPorCorreo(correo).then((doctor) => {
              if (doctor) {
                this.correoUsuarioActual = doctor.correoElectronico; // 
                this.dniUsuarioActual = doctor.dni; // Almacena el DNI en una variable para usarlo en la vista HTML
                this.obtenerDatosUsuario(); // Llamar a obtenerDatosUsuario() después de obtener el rol del usuario

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
      } else if (this.usuarioRol === 'MEDICO') {
          return this.doctorsService.getDoctorPorCorreo(correo).then((doctor) => {
            if (doctor) {
              this.dniUsuarioActual = doctor.dni; // Almacena el DNI en una variable para usarlo en la vista HTML
            }
            return rol;
          });
      } else {
        return rol;
      }
    });
  }

  obtenerDatosUsuario() {
    this.authService.getUsuarioEmail().subscribe((correo) => {
      if (correo && this.usuarioRol === 'MEDICO') {
        this.doctorsService.getDoctorPorCorreo(correo).then((doctor) => {
          if (doctor) {
            this.dniUsuarioActual = doctor.dni;
            this.correoUsuarioActual = doctor.correoElectronico;
            
  
            // Asignar los valores después de obtener los datos del docotr
            //this.telefonoPaciente = this.tlfUsuarioActual;
            //this.emailPaciente = this.correoUsuarioActual;
            //this.pacienteDni = this.dniUsuarioActual;
          }
        });
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

  
  buscarCitasDoc() {
    if (this.dniUsuarioActual !== '') {
      this.citasService.buscarCitasPorDoctorID(this.dniUsuarioActual).then((citas) => {
        this.citasDoctor = citas;
        console.log("Citas del doc:", this.citasDoctor);

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
        console.log("Citas del paciente:", this.citasPaciente);

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
      this.citasPaciente = []; // este si lo pilla
    }
  }

  buscarCitasPorDoctorID() {
    if (this.doctorId !== '') {
      this.citasService.buscarCitasPorDoctorID(this.doctorId).then((citas) => {
        this.citasDoctor = citas;
                console.log("Citas del doctor1:", this.citasDoctor);

      });
    } else {
      this.citasDoctor = []; // este no...
      //console.log("Citas del doctor:", this.citasDoctor);

    }
  }

  buscarCitasPorEspecialidad(especialidad: string) {
    const citaRef = collection(this.firestore, 'citas');
    const q = query(citaRef, where('especialidad', '==', especialidad));
    return getDocs(q).then((snapshot) => {
      if (!snapshot.empty) {
        const citas: Citas[] = [];
        snapshot.forEach((doc) => {
          const cita = doc.data() as Citas;
          cita.id = doc.id;
          citas.push(cita);
        });
        this.citasPaciente = citas; // Asignar las citas encontradas a this.citasPaciente
      } else {
        this.citasPaciente = []; // Si no se encontraron citas, asignar un array vacío
      }
    });
  }
  loadSpecialties() {
    this.specialtiesService.getAllSpecialties().then((listSpecialties) => {
      this.especialidades = listSpecialties;
    });
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

    this.citasDoctor.sort((citaA, citaB) => {
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
    if (cita) {
      cita.estado = this.nuevoEstado;
      this.citasService
        .modificarCita(cita)
        .then(() => {
          console.log('Estado de la cita modificado exitosamente');
        })
        .catch((error) => {
          console.error('Error al modificar el estado de la cita:', error);
        });
    }
  }

  borrarCita(citaId: string) {
    this.citasService.borrarCita(citaId)
      .then(() => {
        console.log('Cita borrada exitosamente');
        // Aquí puedes actualizar la lista de citas si es necesario
        this.citasPaciente = this.citasPaciente.filter(cita => cita.id !== citaId);
        this.citasDoctor = this.citasDoctor.filter(cita => cita.id !== citaId);


      })
      .catch((error) => {
        console.error('Error al borrar la cita:', error);
      });
  }
}

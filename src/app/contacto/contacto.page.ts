import { Component } from '@angular/core';
import { ContactoService } from '../services/contacto.service';
import { Mensaje } from '../models/mensaje';
import { UsuariosService } from '../services/usuarios.service';
import { PacientesService } from './../services/pacientes.service';
import { Usuarios } from '../models/usuarios';
import { AuthService } from './../services/auth.service';
import { v4 as uuidv4 } from 'uuid';

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
  selector: 'app-contacto',
  templateUrl: './contacto.page.html',
  styleUrls: ['./contacto.page.scss'],
})
export class ContactoPage {
  contactForm: Mensaje = {
    id: '',
    fechaConsulta: new Date(),
    telefonoPaciente: '',
    emailPaciente: '',
    textoMensaje: '',
    pacienteDni: ''
  };
  mensaje: string | null = null;
  mensajeID: string | null = null;
  consultas: any[] = []; // Variable para almacenar los mensajes
  //authService: any;
  usuarioRol: string = '';
  dniUsuarioActual: string = '';
  tlfUsuarioActual: string = '';
  correoUsuarioActual: string = '';


  constructor(
    private contactoService: ContactoService,
    private usuariosService: UsuariosService,
    private pacientesService: PacientesService,
    private firestore: Firestore,
    private authService: AuthService

    ) {

    }

    ngOnInit() {

      this.obtenerUsuarioRol(); // Obtener el rol del usuario
      //this.obtenerDatosUsuario();
      this.usuarioRol = '';
      this.dniUsuarioActual = '';
      this.tlfUsuarioActual = '';
      this.correoUsuarioActual = '';
      // Llamar al método para obtener los mensajes ordenados por fecha
      this.contactoService.obtenerConsultas().subscribe(
      (consultas) => {
        this.consultas = consultas;
      },
      (error) => {
        console.error(error);
      }
    );
      }

  submitForm() {
    this.contactForm.id = uuidv4(); // Asigna un ID aleatorio
    this.contactoService.guardarConsulta(this.contactForm)
      .then(() => {
        this.mensaje = 'Consulta enviada correctamente';
        //this.mensajeID = guardarconsulta.mensajeID;
        this.contactForm = {
          id: '',
          fechaConsulta: new Date(),
          telefonoPaciente: this.tlfUsuarioActual, // Asignar el teléfono del paciente logueado
          emailPaciente: this.correoUsuarioActual, // Asignar el correo del paciente logueado
          textoMensaje: '',
          pacienteDni: this.dniUsuarioActual // Asignar el DNI del paciente logueado
        };
      })
      .catch((error) => {
        this.mensaje = `Error al enviar la consulta: ${error.message}`;
      });
  }

  // Obtener datos usuario-paciente para campos

  // ***
  obtenerUsuarioRol() {
    this.authService.getUsuarioEmail().subscribe((correo) => {
      if (correo) {
        this.usuariosService.getUsuarioRol(correo).then((rol) => {
          this.usuarioRol = rol || '';

          // Obtener el paciente.DATO_QUE_QUERAMOS del paciente logueado
          if (this.usuarioRol === 'PACIENTE') {
            this.pacientesService.getPacientePorCorreo(correo).then((paciente) => {
              if (paciente) {
                this.dniUsuarioActual = paciente.dni; // Almacena el DNI en una variable para usarlo en la vista HTML
                this.tlfUsuarioActual = paciente.telefono; // Almacena el teléfono en una variable para usarlo en la vista HTML
                this.correoUsuarioActual = paciente.correoElectronico; // Alma
                this.obtenerDatosUsuario(); // Llamar a obtenerDatosUsuario() después de obtener el rol del usuario

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
        return this.pacientesService.getPacientePorCorreo(correo).then((paciente) => {
          if (paciente) {
            this.dniUsuarioActual = paciente.dni; // Almacena el DNI en una variable para usarlo en la vista HTML
            this.tlfUsuarioActual = paciente.telefono; // Almacena el teléfono en una variable para usarlo en la vista HTML
            this.correoUsuarioActual = paciente.correoElectronico; // Alma
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
      if (correo && this.usuarioRol === 'PACIENTE') {
        this.pacientesService.getPacientePorCorreo(correo).then((paciente) => {
          if (paciente) {
            this.dniUsuarioActual = paciente.dni;
            this.tlfUsuarioActual = paciente.telefono;
            this.correoUsuarioActual = paciente.correoElectronico;

            // Asignar los valores después de obtener los datos del paciente
            this.contactForm.telefonoPaciente = this.tlfUsuarioActual;
            this.contactForm.emailPaciente = this.correoUsuarioActual;
            this.contactForm.pacienteDni = this.dniUsuarioActual;
          }
        });
      }
    });
  }

  borrarConsulta(id: string) {
    this.contactoService.borrarConsulta(id)
      .then(() => {
        console.log('Consulta eliminada correctamente');
      })
      .catch((error) => {
        console.error('Error al eliminar la consulta:', error);
      });
  }


}

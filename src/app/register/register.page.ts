import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Form, Validators } from '@angular/forms';
import { AuthService } from './../services/auth.service';
import { Pacientes } from './../models/pacientes';
import { PacientesService } from '../services/pacientes.service';
import { Doctor } from '../models/doctor';
import { DoctorsService } from '../services/doctors.service';
import { Especialidad } from '../models/specialties';
import { SpecialtiesService } from '../services/specialties.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {
  type: string = "PACIENTE";
  paciente?: Pacientes;
  medico?: Doctor;
  especialidades: Especialidad[] = [];

  customCounterFormatter(inputLength: number, maxLength: number) {
    return `${maxLength - inputLength} characters remaining`;
  }

  constructor(
    private formBuilder: FormBuilder,
    private specialtiesService: SpecialtiesService,
    private auth: AuthService,
    private acRoute: ActivatedRoute,
    private router: Router,
    private pacientesService: PacientesService,
    private doctorsService: DoctorsService
  ) { }

  ngOnInit() {
    this.loadSpecialties();
    this.acRoute.queryParams.subscribe((params) => {
      const obj = {...params['type'], ...params};
      this.type = obj.type;
    })
  }

  formPaciente = this.formBuilder.group({
    dni: ['', [Validators.minLength(9), Validators.maxLength(9), Validators.required]],
    nombre: ['', [Validators.required]],
    apellidos: ['', [Validators.required]],
    nSeguridadSocial: ['', [Validators.minLength(6), Validators.required]],
    fechaNacimiento: ['', [Validators.required]],
    direccion: ['', [Validators.required]],
    telefono: ['', [Validators.required]],
    email: ['', [Validators.email, Validators.required]],
    password: ['', [Validators.minLength(6), Validators.required]],
    confirmPassword: ['', [Validators.minLength(6), Validators.required]],
  });

  formMedico = this.formBuilder.group({
    dni: ['', [Validators.minLength(9), Validators.maxLength(9), Validators.required]],
    nombre: ['', Validators.required],
    apellidos: ['', Validators.required],
    nColegiado: ['', Validators.required],
    telefono: ['', Validators.required],
    email: ['', [Validators.email, Validators.required]],
    password: ['', [Validators.minLength(6), Validators.required]],
    confirmPassword: ['', [Validators.minLength(6), Validators.required]],
    especialidad: ['', Validators.required],
  });

  showDniError = false;
  showNombreError = false;
  showApellidosError = false;
  showNSeguridadSocialError = false;
  // Agrega una variable booleana para cada campo de error adicional que necesites

  showError = false; // en consola



  async registerPaciente() {
    const dni = this.formPaciente.get('dni')?.value;

    if (this.formPaciente.valid && dni) {
      const { email, password, nombre, apellidos, nSeguridadSocial, fechaNacimiento, direccion, telefono } = this.formPaciente.getRawValue();

      // Verificar si el DNI ya existe
      const dniExists = await this.pacientesService.getPacientePorDNI(dni);
      if (dniExists) {
        this.formPaciente.get('dni')?.setErrors({ dniExists: true });
        return;
      }

      this.paciente = {
        id: '',
        nombre: nombre?nombre:'',
        apellidos: apellidos?apellidos:'',
        dni:dni?dni:'',
        nSeguridadSocial: nSeguridadSocial?nSeguridadSocial:'',
        fechaNacimiento: fechaNacimiento? new Date(fechaNacimiento): new Date(),
        direccion: direccion?direccion:'',
        telefono: telefono?telefono:'',
        correoElectronico: email?email:''
      }
      if (email !== null && password !== null) { // Comprobar que email y password no son null
        this.auth.register(password,'PACIENTE', this.paciente, undefined)
        .then(() => {
          this.router.navigate(['/home']);
        })
        .catch(error => {
          console.error(error);
        });
      } else {
        console.error("Email o password null");
      }
    } else {
      this.formPaciente.markAsTouched();
    }
  }

  async registerMedico() {

      const dni = this.formMedico.get('dni')?.value;
      if (this.formMedico.valid && dni) {
      const { email, password, nombre, apellidos, nColegiado, telefono, especialidad } = this.formMedico.getRawValue();

      // Verificar si el DNI ya existe
      const dniExists = await this.doctorsService.getDoctorPorDni(dni);
      if (dniExists) {
        this.formMedico.get('dni')?.setErrors({ dniExists: true });
        return;
      }

      this.medico = {
        id: '',
        nombre: nombre ? nombre : '',
        apellidos: apellidos ? apellidos : '',
        dni: dni?dni:'',
        nColegiado: nColegiado ? nColegiado : '',
        especialidad: especialidad ? especialidad : '',
        telefono: telefono ? telefono : '',
        correoElectronico: email ? email : '',
        horario: this.generarHorario(8, 15)
      };

      if (email !== null && password !== null) {
        // Comprobar que email y password no son null
        this.auth.register(password, 'MEDICO', undefined, this.medico)
          .then(() => {
            this.router.navigate(['/home']);
          })
          .catch(error => {
            console.error(error);
          });
      } else {
        console.error("Email o password null");
      }
    } else {
      this.formMedico.markAsTouched();
    }
  }

  loadSpecialties(){
    this.specialtiesService.getAllSpecialties().then((listSpecialties) => {
      this.especialidades = listSpecialties;
    });
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
}





  /*async registerMedico() {
    if (this.formPaciente.valid) {
      const { email, password } = this.formPaciente.getRawValue();

      if (email !== null && password !== null) { // Comprobar que email y password no son null
        this.auth.register(email, password, 'MEDICO')
        .then(() => {
          this.router.navigate(['/home']);
        })
        .catch(error => {
          console.error(error);
        });
      } else {
        console.error("Email o password null");
      }
    } else {
      this.formPaciente.markAsTouched();
    }
  }*/



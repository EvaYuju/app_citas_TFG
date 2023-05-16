import { Component, OnInit } from '@angular/core';
import { Doctor } from '../models/doctor';
import { DoctorsService } from '../services/doctors.service';

@Component({
  selector: 'app-doctores',
  templateUrl: './doctores.component.html',
  styleUrls: ['./doctores.component.scss']
})
export class DoctoresComponent implements OnInit {
  doctores: Doctor[] = [];
  id: string = '';
  dni: string = '';
  name: string = '';
  specialty: string = '';
  especialidadBusqueda: string = '';


  doctorSeleccionado: Doctor | null = null;
  mensaje: string = '';

  constructor(private doctorsService: DoctorsService) {}

  ngOnInit(): void {
    this.actualizarListaDoctores();
  }

  buscarDoctorPorEspecialidad(specialty: string) {
    this.especialidadBusqueda = specialty;
    this.actualizarListaDoctores();
  }

  agregarDoctor() {
    const doctor: Doctor = {
      id: '',
      dni: this.dni,
      name: this.name,
      specialty: this.specialty
    };

    this.doctorsService.getDoctorPorEspecialidad(this.specialty)
      .then((exists: boolean) => {
        if (exists) {
          this.mensaje = 'El doctor ya existe';
        } else {
          this.doctorsService.addDoctor(doctor)
            .then(() => {
              this.mensaje = 'Doctor agregado exitosamente';
              this.limpiarFormulario();
              this.actualizarListaDoctores();
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

  modificarDoctor() {
    if (this.doctorSeleccionado) {
      this.doctorsService.modificarDoctor(this.doctorSeleccionado)
        .then(() => {
          this.mensaje = 'Doctor modificado exitosamente';
          this.limpiarFormulario();
          this.actualizarListaDoctores();
        })
        .catch((error: any) => {
          this.mensaje = 'Error al modificar doctor: ' + error;
        });
    }
  }

  borrarDoctor(id: string) {
    this.doctorsService.borrarDoctor(id)
      .then(() => {
        this.mensaje = 'Doctor borrado exitosamente';
        this.actualizarListaDoctores();
      })
      .catch((error: any) => {
        this.mensaje = 'Error al borrar doctor: ' + error;
      });
  }

  seleccionarDoctor(doctor: Doctor) {
    this.doctorSeleccionado = doctor;
    this.name = doctor.name;
    this.specialty = doctor.specialty;
  }

  private actualizarListaDoctores() {
    this.doctorsService.buscarDoctorPorEspecialidad(this.especialidadBusqueda)
      .then((doctores: Doctor[]) => {
        this.doctores = doctores;
      })
      .catch((error: any) => {
        this.mensaje = 'Error al buscar doctores: ' + error;
      });
  }

  private limpiarFormulario() {
    this.name = '';
    this.dni = '';
    this.specialty = '';
    this.doctorSeleccionado = null;
  }
}

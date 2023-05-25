import { Component, OnInit } from '@angular/core';
import { Especialidad } from './../models/specialties';
import { DoctorsService } from '../services/doctors.service';
import { SpecialtiesService } from '../services/specialties.service';

@Component({
  selector: 'app-specialties',
  templateUrl: './specialties.component.html',
  styleUrls: ['./specialties.component.scss'],
})
export class SpecialtiesComponent implements OnInit {
  especialidades: Especialidad[] = [];
  /*[
    { id: '1', nombre: 'Cardiología', descripcion: 'Especialidad en el estudio y tratamiento de enfermedades del corazón.', doctores: [] },
    { id: '2', nombre: 'Dermatología', descripcion: 'Especialidad en el cuidado y tratamiento de la piel.', doctores: [] },
    { id: '3', nombre: 'Endocrinología', descripcion: 'Especialidad en el estudio y tratamiento de trastornos hormonales.', doctores: [] },
    { id: '4', nombre: 'Gastroenterología', descripcion: 'Especialidad en el estudio y tratamiento de enfermedades del sistema digestivo.', doctores: [] },
    { id: '5', nombre: 'Neurología', descripcion: 'Especialidad en el estudio y tratamiento de enfermedades del sistema nervioso.', doctores: [] },
    { id: '6', nombre: 'Oftalmología', descripcion: 'Especialidad en el cuidado y tratamiento de los ojos y trastornos visuales.', doctores: [] },
    { id: '7', nombre: 'Pediatría', descripcion: 'Especialidad en el cuidado y tratamiento de niños y adolescentes.', doctores: [] },
    { id: '8', nombre: 'Psiquiatría', descripcion: 'Especialidad en el estudio y tratamiento de enfermedades mentales.', doctores: [] },
    { id: '9', nombre: 'Traumatología', descripcion: 'Especialidad en el estudio y tratamiento de lesiones y enfermedades del sistema musculoesquelético.', doctores: [] },
    { id: '10', nombre: 'Urología', descripcion: 'Especialidad en el estudio y tratamiento de enfermedades del sistema urinario.', doctores: [] },
    { id: '11', nombre: 'Anestesiología', descripcion: 'Especialidad en el cuidado y administración de anestesia.', doctores: [] },
    { id: '12', nombre: 'Angiología', descripcion: 'Especialidad en el estudio y tratamiento de enfermedades de los vasos sanguíneos.', doctores: [] },
    { id: '13', nombre: 'Audiología', descripcion: 'Especialidad en la evaluación y tratamiento de problemas de audición y equilibrio.', doctores: [] },
    { id: '14', nombre: 'Cirugía General', descripcion: 'Especialidad en el tratamiento quirúrgico de diversas enfermedades.', doctores: [] },
    { id: '15', nombre: 'Cirugía Plástica', descripcion: 'Especialidad en la reconstrucción y remodelación de tejidos del cuerpo.', doctores: [] },
    { id: '16', nombre: 'Cirugía Vascular', descripcion: 'Especialidad en el tratamiento quirúrgico de enfermedades vasculares.', doctores: [] },
    { id: '17', nombre: 'Dentista', descripcion: 'Especialidad en el cuidado y tratamiento de la salud oral.', doctores: [] },
    { id: '18', nombre: 'Fisioterapia', descripcion: 'Especialidad en el tratamiento y rehabilitación física.', doctores: [] },
    { id: '19', nombre: 'Ginecología', descripcion: 'Especialidad en el cuidado y tratamiento de la salud femenina.', doctores: [] },
    { id: '20', nombre: 'Hematología', descripcion: 'Especialidad en el estudio y tratamiento de enfermedades de la sangre.', doctores: [] },
    { id: '21', nombre: 'Infectología', descripcion: 'Especialidad en el estudio y tratamiento de enfermedades infecciosas.', doctores: [] },
    { id: '22', nombre: 'Medicina Interna', descripcion: 'Especialidad en el estudio y tratamiento de enfermedades en adultos.', doctores: [] },
    { id: '23', nombre: 'Nefrología', descripcion: 'Especialidad en el estudio y tratamiento de enfermedades renales.', doctores: [] },
    { id: '24', nombre: 'Nutrición', descripcion: 'Especialidad en el estudio y tratamiento de la nutrición y dietética.', doctores: [] },
    { id: '25', nombre: 'Oncología', descripcion: 'Especialidad en el estudio y tratamiento de enfermedades cancerosas.', doctores: [] },
    { id: '26', nombre: 'Otorrinolaringología', descripcion: 'Especialidad en el estudio y tratamiento de enfermedades del oído, nariz y garganta.', doctores: [] },
    { id: '27', nombre: 'Radiología', descripcion: 'Especialidad en el diagnóstico y tratamiento mediante imágenes médicas.', doctores: [] },
    { id: '28', nombre: 'Reumatología', descripcion: 'Especialidad en el estudio y tratamiento de enfermedades reumáticas.', doctores: [] },
    { id: '29', nombre: 'Terapia Ocupacional', descripcion: 'Especialidad en el tratamiento de personas con dificultades en sus actividades diarias.', doctores: [] },
    { id: '30', nombre: 'Terapia Respiratoria', descripcion: 'Especialidad en el tratamiento de enfermedades respiratorias.', doctores: [] }
  ];*/

  selectedSpecialty: Especialidad | undefined;

  constructor(private doctorsService: DoctorsService, private specialtiesService: SpecialtiesService) {}

  ngOnInit() {
    this.loadDoctorsBySpecialty();
    this.loadSpecialties();
  }

  // Método para mostrar nombre-doctor segun especialidad seleccionada
  loadDoctorsBySpecialty() {
    const nombreEspecialidad = this.selectedSpecialty?.nombre;
    if (nombreEspecialidad) {
      this.doctorsService
        .buscarDoctorPorEspecialidad(nombreEspecialidad)
        .then((nombresDoctores) => {
          // Asigna los nombres de los doctores correspondientes a la especialidad seleccionada
          this.selectedSpecialty!.doctores = nombresDoctores;
        })
        .catch((error: any) => {
          console.error('Error al cargar los nombres de los doctores por especialidad:', error);
        });
    }
  }

  loadSpecialties(){
    this.specialtiesService.getAllSpecialties().then((listSpecialties) => {
      this.especialidades = listSpecialties;
    });
  }
}

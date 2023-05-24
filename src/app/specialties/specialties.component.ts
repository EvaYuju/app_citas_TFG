import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-specialties',
  templateUrl: './specialties.component.html',
  styleUrls: ['./specialties.component.scss'],
})
export class SpecialtiesComponent {
  especialidades: string[] = [
    'Cardiología',
    'Dermatología',
    'Endocrinología',
    'Gastroenterología',
    'Neurología',
    'Oftalmología',
    'Pediatría',
    'Psiquiatría',
    'Traumatología',
    'Urología',
    'Anestesiología',
    'Angiología',
    'Audiología',
    'Cirugía General',
    'Cirugía Plástica',
    'Cirugía Vascular',
    'Dentista',
    'Fisioterapia',
    'Ginecología',
    'Hematología',
    'Infectología',
    'Medicina Interna',
    'Nefrología',
    'Nutrición',
    'Oncología',
    'Otorrinolaringología',
    'Radiología',
    'Reumatología',
    'Terapia Ocupacional',
    'Terapia Respiratoria',
    // Agrega más especialidades según tus necesidades
  ];

}

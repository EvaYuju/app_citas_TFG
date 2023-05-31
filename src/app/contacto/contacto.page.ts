import { Component } from '@angular/core';
import { ContactoService } from '../services/contacto.service';
import { Mensaje } from '../models/mensaje';

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

  constructor(private contactoService: ContactoService) {}

  submitForm() {
    this.contactoService.guardarConsulta(this.contactForm)
      .then(() => {
        this.mensaje = 'Consulta enviada correctamente';
        this.contactForm = {
          id: '',
          fechaConsulta: new Date(),
          telefonoPaciente: '',
          emailPaciente: '',
          textoMensaje: '',
          pacienteDni: ''
        };
      })
      .catch((error) => {
        this.mensaje = `Error al enviar la consulta: ${error.message}`;
      });
  }
}

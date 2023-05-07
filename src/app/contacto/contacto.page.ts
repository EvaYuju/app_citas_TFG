import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-contacto',
  templateUrl: './contacto.page.html',
  styleUrls: ['./contacto.page.scss'],
})
export class ContactoPage implements OnInit {
  contactForm = {
    name: '',
    email: '',
    message: ''
  };

  constructor() { }

  ngOnInit() {
  }

  submitForm() {
    // Aquí puedes implementar la lógica para enviar el correo electrónico o almacenar los datos de contacto
    // Puedes acceder a los valores del formulario utilizando this.contactForm.name, this.contactForm.email, etc.
    // Por ejemplo:
    console.log('Nombre:', this.contactForm.name);
    console.log('Correo electrónico:', this.contactForm.email);
    console.log('Mensaje:', this.contactForm.message);

    // Aquí puedes hacer la llamada a tu servicio para enviar el correo o almacenar los datos
    // ...

    // Luego de realizar la acción, puedes limpiar el formulario
    this.contactForm = {
      name: '',
      email: '',
      message: ''
    };
  }
}

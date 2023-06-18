import { Pacientes } from './../models/pacientes';
import { Component, OnInit } from '@angular/core';
import { PacientesService } from '../services/pacientes.service';
import { IonicModule } from '@ionic/angular';
import { FormBuilder, FormGroup, Form, Validators } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { UsuariosService } from '../services/usuarios.service';

@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.scss'],
})
export class LandingPageComponent implements OnInit {
  selectedSegment: string = 'PACIENTE';

  segmentChanged(event: CustomEvent) {
    this.selectedSegment = event.detail.value;
  }

  form = this.formBuilder.group({
    email: ['', [Validators.email, Validators.required]],
    password: ['', [Validators.minLength(6), Validators.required]],
  });

  showError = false;
  showError2 = false;

  constructor(
    private formBuilder: FormBuilder,
    private auth: AuthService,
    private userService: UsuariosService,
    private router: Router
  ) {}

  ngOnInit() {}

  errorText: string = '';

  login() {
    if (this.form.valid) {
      const { email, password } = this.form.getRawValue();

      if (email !== null && password !== null) {
        this.userService.getUsuarioRol(email).then((rol) => {
          if (rol === '') {
            this.errorText = 'Usuario o contraseña incorrectos. Sí no tiene una cuenta, regístrese.';
          } else if (rol === null) {
            this.errorText = 'Usuario o contraseña incorrectos. Sí no tiene una cuenta, regístrese.';
          } else if (rol === this.selectedSegment) {
            this.auth
              .login(email, password)
              .then(() => {
                this.router.navigate(['/home']);
              })
              .catch((error) => {
                this.errorText = 'Credenciales incorrectas. Inténtelo de nuevo.';
                console.error(error);
              });
          } else {
            this.errorText = 'Rol no indicado correctamente. Cambie de Inicio de Sesión entre Área Pacientes y Área Médicos.';
          }
        });
      } else {
        this.errorText = 'Usuario no registrado. Por favor, regístrese.';
      }
      this.showError = true;
    } else {
      this.form.markAsTouched();
      this.showError = true;
    }
  }


  setValue(value: string) {
    this.selectedSegment = value;
  }
}

import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Form, Validators } from '@angular/forms';

import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  form = this.formBuilder.group({
    email: ['', [Validators.email, Validators.required]],
    password: ['', [Validators.minLength(6), Validators.required]],
  });

  showError = false;

  constructor(
    private formBuilder: FormBuilder,
    private auth: AuthService,
    private router: Router,
  ) { }

  ngOnInit() {
  }

  login() {
    if (this.form.valid) {
      const { email, password } = this.form.getRawValue();
      if (email !== null && password !== null) { // Comprobar que email y password no son null
      this.auth.login(email, password)
        .then(() => {
          this.router.navigate(['/home']);
        })
        .catch(error => {
          console.error(error);
        });
      } else {
        console.error("Email o password null");
      }
      this.showError = false;
    } else {
      this.form.markAsTouched();
      this.showError = true;
    }
  }

}

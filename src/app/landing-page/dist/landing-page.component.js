"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.LandingPageComponent = void 0;
var core_1 = require("@angular/core");
var forms_1 = require("@angular/forms");
var LandingPageComponent = /** @class */ (function () {
    function LandingPageComponent(formBuilder, auth, userService, router) {
        this.formBuilder = formBuilder;
        this.auth = auth;
        this.userService = userService;
        this.router = router;
        this.selectedSegment = 'PACIENTE';
        this.form = this.formBuilder.group({
            email: ['', [forms_1.Validators.email, forms_1.Validators.required]],
            password: ['', [forms_1.Validators.minLength(6), forms_1.Validators.required]]
        });
        this.showError = false;
        this.showError2 = false;
        this.errorText = '';
    }
    LandingPageComponent.prototype.segmentChanged = function (event) {
        this.selectedSegment = event.detail.value;
    };
    LandingPageComponent.prototype.ngOnInit = function () { };
    LandingPageComponent.prototype.login = function () {
        var _this = this;
        if (this.form.valid) {
            var _a = this.form.getRawValue(), email_1 = _a.email, password_1 = _a.password;
            if (email_1 !== null && password_1 !== null) {
                this.userService.getUsuarioRol(email_1).then(function (rol) {
                    if (rol === '') {
                        _this.errorText = 'Usuario o contraseña incorrectos. Sí no tiene una cuenta, regístrese.';
                    }
                    else if (rol === null) {
                        _this.errorText = 'Usuario o contraseña incorrectos. Sí no tiene una cuenta, regístrese.';
                    }
                    else if (rol === _this.selectedSegment) {
                        _this.auth
                            .login(email_1, password_1)
                            .then(function () {
                            _this.router.navigate(['/home']);
                        })["catch"](function (error) {
                            _this.errorText = 'Credenciales incorrectas. Inténtelo de nuevo.';
                            console.error(error);
                        });
                    }
                    else {
                        _this.errorText = 'Rol no indicado correctamente. Cambie de Inicio de Sesión entre Área Pacientes y Área Médicos.';
                    }
                });
            }
            else {
                this.errorText = 'Usuario no registrado. Por favor, regístrese.';
            }
            this.showError = true;
        }
        else {
            this.form.markAsTouched();
            this.showError = true;
        }
    };
    LandingPageComponent.prototype.setValue = function (value) {
        this.selectedSegment = value;
    };
    LandingPageComponent = __decorate([
        core_1.Component({
            selector: 'app-landing-page',
            templateUrl: './landing-page.component.html',
            styleUrls: ['./landing-page.component.scss']
        })
    ], LandingPageComponent);
    return LandingPageComponent;
}());
exports.LandingPageComponent = LandingPageComponent;

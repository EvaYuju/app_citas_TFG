"use strict";

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

var __decorate = void 0 && (void 0).__decorate || function (decorators, target, key, desc) {
  var c = arguments.length,
      r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc,
      d;
  if ((typeof Reflect === "undefined" ? "undefined" : _typeof(Reflect)) === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);else for (var i = decorators.length - 1; i >= 0; i--) {
    if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
  }
  return c > 3 && r && Object.defineProperty(target, key, r), r;
};

exports.__esModule = true;
exports.LandingPageComponent = void 0;

var core_1 = require("@angular/core");

var forms_1 = require("@angular/forms");

var LandingPageComponent =
/** @class */
function () {
  function LandingPageComponent(formBuilder, auth, userService, router) {
    this.formBuilder = formBuilder;
    this.auth = auth;
    this.userService = userService;
    this.router = router;
    this.selectedSegment = 'PACIENTE';
    this.mensajeLogin = '';
    this.form = this.formBuilder.group({
      email: ['', [forms_1.Validators.email, forms_1.Validators.required]],
      password: ['', [forms_1.Validators.minLength(6), forms_1.Validators.required]]
    });
    this.showError = false;
  }

  LandingPageComponent.prototype.segmentChanged = function (event) {
    this.selectedSegment = event.detail.value;
  };

  LandingPageComponent.prototype.ngOnInit = function () {};

  LandingPageComponent.prototype.login = function () {
    var _this = this;

    if (this.form.valid) {
      var _a = this.form.getRawValue(),
          email_1 = _a.email,
          password_1 = _a.password;

      if (email_1 !== null && password_1 !== null) {
        this.userService.getUsuarioRol(email_1).then(function (rol) {
          if (rol == _this.selectedSegment) {
            _this.auth.login(email_1, password_1).then(function () {
              _this.router.navigate(['/home']);
            })["catch"](function (error) {
              _this.mensajeLogin = "Email o contraseña incorrectos. Por favor, inténtelo de nuevo.";
            });
          } else {
            _this.mensajeLogin = "Inicie sesión en el Área correspondiente.";
          }
        });
      } else {
        this.mensajeLogin = "Email o contraseña no pueden estar vacíos.";
      }

      this.showError = false;
    } else {
      this.form.markAsTouched();
      this.showError = true;
    }
  };

  LandingPageComponent.prototype.setValue = function (value) {
    this.selectedSegment = value;
  };

  LandingPageComponent = __decorate([core_1.Component({
    selector: 'app-landing-page',
    templateUrl: './landing-page.component.html',
    styleUrls: ['./landing-page.component.scss']
  })], LandingPageComponent);
  return LandingPageComponent;
}();

exports.LandingPageComponent = LandingPageComponent;
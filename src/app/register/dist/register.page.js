"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
exports.RegisterPage = void 0;
var core_1 = require("@angular/core");
var forms_1 = require("@angular/forms");
var RegisterPage = /** @class */ (function () {
    function RegisterPage(formBuilder, specialtiesService, auth, acRoute, router, pacientesService, doctorsService) {
        this.formBuilder = formBuilder;
        this.specialtiesService = specialtiesService;
        this.auth = auth;
        this.acRoute = acRoute;
        this.router = router;
        this.pacientesService = pacientesService;
        this.doctorsService = doctorsService;
        this.type = "PACIENTE";
        this.especialidades = [];
        this.formPaciente = this.formBuilder.group({
            dni: ['', [forms_1.Validators.minLength(9), forms_1.Validators.maxLength(9), forms_1.Validators.required]],
            nombre: ['', [forms_1.Validators.required]],
            apellidos: ['', [forms_1.Validators.required]],
            nSeguridadSocial: ['', [forms_1.Validators.minLength(6), forms_1.Validators.required]],
            fechaNacimiento: ['', [forms_1.Validators.required]],
            direccion: ['', [forms_1.Validators.required]],
            telefono: ['', [forms_1.Validators.required]],
            email: ['', [forms_1.Validators.email, forms_1.Validators.required]],
            password: ['', [forms_1.Validators.minLength(6), forms_1.Validators.required]],
            confirmPassword: ['', [forms_1.Validators.minLength(6), forms_1.Validators.required]]
        });
        this.formMedico = this.formBuilder.group({
            dni: ['', [forms_1.Validators.minLength(9), forms_1.Validators.maxLength(9), forms_1.Validators.required]],
            nombre: ['', forms_1.Validators.required],
            apellidos: ['', forms_1.Validators.required],
            nColegiado: ['', forms_1.Validators.required],
            telefono: ['', forms_1.Validators.required],
            email: ['', [forms_1.Validators.email, forms_1.Validators.required]],
            password: ['', [forms_1.Validators.minLength(6), forms_1.Validators.required]],
            confirmPassword: ['', [forms_1.Validators.minLength(6), forms_1.Validators.required]],
            especialidad: ['', forms_1.Validators.required]
        });
        this.showDniError = false;
        this.showNombreError = false;
        this.showApellidosError = false;
        this.showNSeguridadSocialError = false;
        // Agrega una variable booleana para cada campo de error adicional que necesites
        this.showError = false; // en consola
    }
    RegisterPage.prototype.customCounterFormatter = function (inputLength, maxLength) {
        return maxLength - inputLength + " characters remaining";
    };
    RegisterPage.prototype.ngOnInit = function () {
        var _this = this;
        this.loadSpecialties();
        this.acRoute.queryParams.subscribe(function (params) {
            var obj = __assign(__assign({}, params['type']), params);
            _this.type = obj.type;
        });
    };
    RegisterPage.prototype.registerPaciente = function () {
        var _a, _b;
        return __awaiter(this, void 0, void 0, function () {
            var dni, _c, email, password, nombre, apellidos, nSeguridadSocial, fechaNacimiento, direccion, telefono, dniExists;
            var _this = this;
            return __generator(this, function (_d) {
                switch (_d.label) {
                    case 0:
                        dni = (_a = this.formPaciente.get('dni')) === null || _a === void 0 ? void 0 : _a.value;
                        if (!(this.formPaciente.valid && dni)) return [3 /*break*/, 2];
                        _c = this.formPaciente.getRawValue(), email = _c.email, password = _c.password, nombre = _c.nombre, apellidos = _c.apellidos, nSeguridadSocial = _c.nSeguridadSocial, fechaNacimiento = _c.fechaNacimiento, direccion = _c.direccion, telefono = _c.telefono;
                        return [4 /*yield*/, this.pacientesService.getPacientePorDNI(dni)];
                    case 1:
                        dniExists = _d.sent();
                        if (dniExists) {
                            (_b = this.formPaciente.get('dni')) === null || _b === void 0 ? void 0 : _b.setErrors({ dniExists: true });
                            return [2 /*return*/];
                        }
                        this.paciente = {
                            id: '',
                            nombre: nombre ? nombre : '',
                            apellidos: apellidos ? apellidos : '',
                            dni: dni ? dni : '',
                            nSeguridadSocial: nSeguridadSocial ? nSeguridadSocial : '',
                            fechaNacimiento: fechaNacimiento ? new Date(fechaNacimiento) : new Date(),
                            direccion: direccion ? direccion : '',
                            telefono: telefono ? telefono : '',
                            correoElectronico: email ? email : ''
                        };
                        if (email !== null && password !== null) { // Comprobar que email y password no son null
                            this.auth.register(password, 'PACIENTE', this.paciente, undefined)
                                .then(function () {
                                _this.router.navigate(['/home']);
                            })["catch"](function (error) {
                                console.error(error);
                            });
                        }
                        else {
                            console.error("Email o password null");
                        }
                        return [3 /*break*/, 3];
                    case 2:
                        this.formPaciente.markAsTouched();
                        _d.label = 3;
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    RegisterPage.prototype.registerMedico = function () {
        var _a, _b;
        return __awaiter(this, void 0, void 0, function () {
            var dni, _c, email, password, nombre, apellidos, nColegiado, especialidad, telefono, dniExists;
            var _this = this;
            return __generator(this, function (_d) {
                switch (_d.label) {
                    case 0:
                        dni = (_a = this.formMedico.get('dni')) === null || _a === void 0 ? void 0 : _a.value;
                        if (!(this.formMedico.valid && dni)) return [3 /*break*/, 2];
                        _c = this.formMedico.getRawValue(), email = _c.email, password = _c.password, nombre = _c.nombre, apellidos = _c.apellidos, nColegiado = _c.nColegiado, especialidad = _c.especialidad, telefono = _c.telefono;
                        return [4 /*yield*/, this.doctorsService.getDoctorPorDni(dni)];
                    case 1:
                        dniExists = _d.sent();
                        if (dniExists) {
                            (_b = this.formMedico.get('dni')) === null || _b === void 0 ? void 0 : _b.setErrors({ dniExists: true });
                            return [2 /*return*/];
                        }
                        this.medico = {
                            id: '',
                            nombre: nombre ? nombre : '',
                            apellidos: apellidos ? apellidos : '',
                            dni: dni,
                            nColegiado: nColegiado ? nColegiado : '',
                            especialidad: especialidad ? especialidad : '',
                            telefono: telefono ? telefono : '',
                            correoElectronico: email ? email : '',
                            horario: this.generarHorario(8, 15)
                        };
                        if (email !== null && password !== null) {
                            // Comprobar que email y password no son null
                            this.auth.register(password, 'MEDICO', undefined, this.medico)
                                .then(function () {
                                _this.router.navigate(['/home']);
                            })["catch"](function (error) {
                                console.error(error);
                            });
                        }
                        else {
                            console.error("Email o password null");
                        }
                        return [3 /*break*/, 3];
                    case 2:
                        this.formMedico.markAsTouched();
                        _d.label = 3;
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    RegisterPage.prototype.loadSpecialties = function () {
        var _this = this;
        this.specialtiesService.getAllSpecialties().then(function (listSpecialties) {
            _this.especialidades = listSpecialties;
        });
    };
    RegisterPage.prototype.generarHorario = function (horaIni, horaFin) {
        var horario = [];
        var horaInicio = new Date().setHours(horaIni ? horaIni : 8, 0, 0); // Establecer hora de inicio en 8:00 AM
        var horaFinal = new Date().setHours(horaFin ? horaFin : 15, 0, 0); // Establecer hora de fin en 3:00 PM
        var tiempoIncremento = 30; // Incremento de tiempo en minutos
        var horaActual = horaInicio;
        while (horaActual <= horaFinal) {
            var hora = new Date(horaActual);
            var horaFormateada = this.formatoHora(hora);
            horario.push(horaFormateada);
            horaActual += tiempoIncremento * 60 * 1000; // Convertir el incremento a milisegundos
        }
        return horario;
    };
    RegisterPage.prototype.formatoHora = function (hora) {
        var opciones = { hour: 'numeric', minute: 'numeric' };
        return hora.toLocaleTimeString([], opciones);
    };
    RegisterPage = __decorate([
        core_1.Component({
            selector: 'app-register',
            templateUrl: './register.page.html',
            styleUrls: ['./register.page.scss']
        })
    ], RegisterPage);
    return RegisterPage;
}());
exports.RegisterPage = RegisterPage;
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

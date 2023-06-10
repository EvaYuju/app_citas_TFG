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
exports.CitasComponent = void 0;
var core_1 = require("@angular/core");
var firestore_1 = require("@angular/fire/firestore");
var CitasComponent = /** @class */ (function () {
    function CitasComponent(citasService, doctorsService, specialtiesService, usuariosService, alertController, pacientesService, firestore, auth, authService) {
        this.citasService = citasService;
        this.doctorsService = doctorsService;
        this.specialtiesService = specialtiesService;
        this.usuariosService = usuariosService;
        this.alertController = alertController;
        this.pacientesService = pacientesService;
        this.firestore = firestore;
        this.auth = auth;
        this.authService = authService;
        this.cita = {
            id: '',
            pacienteId: '',
            doctorId: '',
            especialidad: '',
            fecha: new Date(),
            hora: '',
            motivo: '',
            estado: '',
            comentario: ''
        };
        this.doctors = [];
        this.mensaje = '';
        this.mensajeID = '';
        this.mensajeDoc = '';
        this.specialtyBuscar = '';
        this.doctorSeleccionado = null;
        this.citasEncontradas = [];
        this.citaSeleccionada = null;
        this.especialidades = [];
        this.idBuscar = ''; // Agrega esta línea para definir la propiedad idBuscar
        this.usuarioRol = ''; // Agrega esta línea para almacenar el rol del usuario
        this.minDate = '';
        this.horariosDoctor = [];
        this.usuarioPacienteDni = '';
        this.dniUsuarioActual = '';
    }
    CitasComponent.prototype.ngOnInit = function () {
        this.citaSeleccionada = this.cita;
        this.loadSpecialties();
        this.obtenerUsuarioRol(); // Obtener el rol del usuario
        this.obtenerUsuarioDNI(); // Obtener el DNI del paciente logueado
    };
    // ***
    CitasComponent.prototype.obtenerUsuarioRol = function () {
        var _this = this;
        this.authService.getUsuarioEmail().subscribe(function (correo) {
            if (correo) {
                _this.usuariosService.getUsuarioRol(correo).then(function (rol) {
                    _this.usuarioRol = rol || '';
                    // Obtener el paciente.DATO_QUE_QUERAMOS del paciente logueado 
                    if (_this.usuarioRol === 'PACIENTE') {
                        _this.pacientesService.getPacientePorCorreo(correo).then(function (paciente) {
                            if (paciente) {
                                _this.dniUsuarioActual = paciente.dni; // Almacena el DNI en una variable para usarlo en la vista HTML
                            }
                        });
                    }
                });
            }
        });
    };
    CitasComponent.prototype.getUsuarioRol = function (correo) {
        var _this = this;
        return this.usuariosService.getUsuarioRol(correo).then(function (rol) {
            _this.usuarioRol = rol || '';
            // Obtener el paciente.DATO_QUE_QUERAMOS del paciente logueado 
            if (_this.usuarioRol === 'PACIENTE') {
                return _this.pacientesService.getPacientePorCorreo(correo).then(function (paciente) {
                    if (paciente) {
                        _this.dniUsuarioActual = paciente.dni; // Almacena el DNI en una variable para usarlo en la vista HTML
                    }
                    return rol;
                });
            }
            else {
                return rol;
            }
        });
    };
    CitasComponent.prototype.obtenerUsuarioDNI = function () {
        var _this = this;
        this.authService.getUsuarioEmail().subscribe(function (correo) {
            if (correo) {
                if (_this.usuarioRol === 'PACIENTE') {
                    _this.pacientesService.getPacientePorCorreo(correo).then(function (paciente) {
                        if (paciente) {
                            _this.dniUsuarioActual = paciente.dni; // Almacena el DNI en una variable para usarlo en la vista HTML
                        }
                    });
                }
            }
        });
    };
    CitasComponent.prototype.agregarCita = function () {
        return __awaiter(this, void 0, void 0, function () {
            var docRef, error_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!this.camposValidos()) {
                            this.mensaje = 'Por favor, complete todos los campos.';
                            return [2 /*return*/];
                        }
                        // Obtener la hora seleccionada del componente ion-select y asignarla al campo 'hora'
                        this.cita.hora = this.cita.hora.substring(0, 5);
                        // Guardar el dniUsuarioActual en cita.pacienteId
                        this.cita.pacienteId = this.dniUsuarioActual;
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, firestore_1.addDoc(firestore_1.collection(this.firestore, 'citas'), this.cita)];
                    case 2:
                        docRef = _a.sent();
                        this.mensajeID = 'Cita agregada correctamente. ID de la cita: ' + docRef.id;
                        this.limpiarFormulario();
                        return [3 /*break*/, 4];
                    case 3:
                        error_1 = _a.sent();
                        this.mensaje = 'Error al agregar la cita: ' + error_1;
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    CitasComponent.prototype.buscarCitaPorID = function (id) {
        var _this = this;
        this.citasService.buscarCitaPorID(id)
            .then(function (citas) {
            _this.citasEncontradas = citas;
            if (citas.length === 0) {
                _this.mensaje = 'No se encontraron citas con este ID.';
            }
            else {
                _this.mensaje = '';
            }
        })["catch"](function (error) {
            _this.mensaje = 'Error al buscar la cita: ' + error;
            _this.citasEncontradas = [];
        });
    };
    CitasComponent.prototype.seleccionarCita = function (cita) {
        this.citaSeleccionada = __assign({}, cita);
    };
    CitasComponent.prototype.modificarCita = function () {
        var _this = this;
        if (this.citaSeleccionada) {
            this.citasService
                .modificarCita(this.citaSeleccionada)
                .then(function () {
                _this.mensaje = 'Cita modificada correctamente.';
                _this.citaSeleccionada = null;
            })["catch"](function (error) {
                _this.mensaje = 'Error al modificar la cita: ' + error;
            });
        }
    };
    CitasComponent.prototype.buscarDoctorPorEspecialidad = function (especialidad) {
        var _this = this;
        this.doctorsService
            .buscarDoctorPorEspecialidad(especialidad)
            .then(function (doctors) {
            _this.doctors = doctors;
            if (doctors.length === 0) {
                _this.mensajeDoc = 'No se encontraron doctores con esta especialidad.';
                _this.limpiarFormulario();
            }
            else {
                _this.mensajeDoc = '';
                _this.horariosDoctor = doctors[0].horario;
            }
        })["catch"](function (error) {
            _this.mensajeDoc = 'Error al buscar el doctor: ' + error;
            _this.doctors = [];
        });
    };
    CitasComponent.prototype.loadSpecialties = function () {
        var _this = this;
        this.specialtiesService.getAllSpecialties().then(function (listSpecialties) {
            _this.especialidades = listSpecialties;
        });
    };
    CitasComponent.prototype.seleccionarDoctor = function (doctor) {
        this.doctorSeleccionado = __assign({}, doctor);
        this.loadDoctorSchedule();
    };
    CitasComponent.prototype.loadDoctorSchedule = function () {
        if (this.doctorSeleccionado) {
            this.minDate = this.getFormattedDate(new Date());
            // Obtener los horarios del doctor seleccionado
            this.horariosDoctor = this.doctorSeleccionado.horario;
            // Utilizar el primer horario disponible como fecha mínima
            this.minDate += ' ' + this.horariosDoctor[0];
        }
    };
    // Aquí se obtiene el horario del doctor seleccionado y se establece como fecha mínima permitida
    // para la selección en el componente ion-datetime.
    // Asegúrate de que el horario del doctor sea un array de strings que representen las horas disponibles.
    // Por ejemplo, ['09:00', '10:00', '11:00', ...].
    CitasComponent.prototype.getFormattedDate = function (date) {
        var year = date.getFullYear();
        var month = ('0' + (date.getMonth() + 1)).slice(-2);
        var day = ('0' + date.getDate()).slice(-2);
        var hours = ('0' + date.getHours()).slice(-2);
        var minutes = ('0' + date.getMinutes()).slice(-2);
        return day + "/" + month + "/" + year + " " + hours + ":" + minutes;
    };
    CitasComponent.prototype.borrarCita = function (id) {
        var _this = this;
        this.citasService
            .borrarCita(id)
            .then(function () {
            _this.mensaje = 'Cita eliminada correctamente.';
            _this.citasEncontradas = _this.citasEncontradas.filter(function (cita) { return cita.id !== id; });
        })["catch"](function (error) {
            _this.mensaje = 'Error al eliminar la cita: ' + error;
        });
    };
    CitasComponent.prototype.camposValidos = function () {
        return (
        //this.cita.pacienteId &&
        this.cita.doctorId &&
            this.cita.especialidad &&
            this.cita.fecha &&
            this.cita.motivo &&
            this.cita.estado);
    };
    CitasComponent.prototype.limpiarFormulario = function () {
        this.cita = {
            id: '',
            pacienteId: '',
            doctorId: '',
            especialidad: '',
            fecha: new Date(),
            hora: '',
            motivo: '',
            estado: '',
            comentario: ''
        };
    };
    CitasComponent = __decorate([
        core_1.Component({
            selector: 'app-citas',
            templateUrl: './citas.component.html',
            styleUrls: ['./citas.component.scss']
        })
    ], CitasComponent);
    return CitasComponent;
}());
exports.CitasComponent = CitasComponent;

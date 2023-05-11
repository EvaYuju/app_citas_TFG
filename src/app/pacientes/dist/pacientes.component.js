"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.PacientesComponent = void 0;
var core_1 = require("@angular/core");
var PacientesComponent = /** @class */ (function () {
    function PacientesComponent(pacientesService) {
        this.pacientesService = pacientesService;
        this.paciente = {
            dni: '',
            nombre: '',
            edad: null,
            direccion: '',
            telefono: '',
            email: ''
        };
        this.mensaje = '';
    }
    PacientesComponent.prototype.ngOnInit = function () {
    };
    PacientesComponent.prototype.agregarPaciente = function () {
        var _this = this;
        if (!this.camposValidos()) {
            this.mensaje = 'Por favor, completa todos los campos.';
            return;
        }
        this.pacientesService.getPacientePorDNI(this.paciente.dni)
            .then(function (pacienteExistente) {
            if (pacienteExistente) {
                _this.mensaje = 'Ya existe un paciente con este DNI.';
            }
            else {
                _this.pacientesService.addPaciente(_this.paciente)
                    .then(function () {
                    _this.mensaje = 'Paciente agregado correctamente.';
                    _this.limpiarFormulario();
                })["catch"](function (error) {
                    _this.mensaje = 'Error al agregar el paciente: ' + error;
                });
            }
        })["catch"](function (error) {
            _this.mensaje = 'Error al buscar el paciente: ' + error;
        });
    };
    PacientesComponent.prototype.camposValidos = function () {
        return (this.paciente.dni &&
            this.paciente.nombre &&
            this.paciente.edad &&
            this.paciente.direccion &&
            this.paciente.telefono &&
            this.paciente.email);
    };
    PacientesComponent.prototype.limpiarFormulario = function () {
        this.paciente = {
            dni: '',
            nombre: '',
            edad: null,
            direccion: '',
            telefono: '',
            email: ''
        };
    };
    PacientesComponent = __decorate([
        core_1.Component({
            selector: 'app-pacientes',
            templateUrl: './pacientes.component.html',
            styleUrls: ['./pacientes.component.scss']
        })
    ], PacientesComponent);
    return PacientesComponent;
}());
exports.PacientesComponent = PacientesComponent;

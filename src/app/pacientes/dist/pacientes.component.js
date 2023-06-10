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
exports.__esModule = true;
exports.PacientesComponent = void 0;
var core_1 = require("@angular/core");
var PacientesComponent = /** @class */ (function () {
    function PacientesComponent(pacientesService) {
        this.pacientesService = pacientesService;
        this.paciente = {
            id: '',
            nombre: '',
            apellidos: '',
            dni: '',
            nSeguridadSocial: '',
            fechaNacimiento: new Date(),
            direccion: '',
            telefono: '',
            correoElectronico: ''
        };
        this.mensaje = '';
        this.pacientesEncontrados = [];
        this.pacienteSeleccionado = null;
        this.dniBuscar = ''; // Agrega esta línea para definir la propiedad dniBuscar
        this.minDate = '';
    }
    PacientesComponent.prototype.ngOnInit = function () {
        //PARA AUTHENTICATION
        this.pacienteSeleccionado = this.paciente;
        this.rol = localStorage.getItem('ROL');
        var currentDate = new Date();
        this.minDate = this.getFormattedDate(currentDate);
    };
    //PARA AUTHENTICATION
    PacientesComponent.prototype.isAuthenticated = function (rol) {
        return this.rol == rol;
    };
    PacientesComponent.prototype.agregarPaciente = function () {
        var _this = this;
        if (!this.camposValidos()) {
            this.mensaje = 'Por favor, complete todos los campos.';
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
    PacientesComponent.prototype.buscarPacientePorDNI = function (dni) {
        var _this = this;
        this.pacientesService.buscarPacientePorDNI(dni)
            .then(function (pacientes) {
            _this.pacientesEncontrados = pacientes;
            if (pacientes.length === 0) {
                _this.mensaje = 'No se encontraron pacientes con este DNI.';
            }
            else {
                _this.mensaje = '';
            }
        })["catch"](function (error) {
            _this.mensaje = 'Error al buscar el paciente: ' + error;
            _this.pacientesEncontrados = [];
        });
    };
    PacientesComponent.prototype.seleccionarPaciente = function (paciente) {
        this.pacienteSeleccionado = __assign({}, paciente);
    };
    PacientesComponent.prototype.modificarPaciente = function () {
        var _this = this;
        if (this.pacienteSeleccionado) {
            this.pacientesService.modificarPaciente(this.pacienteSeleccionado)
                .then(function () {
                _this.mensaje = 'Paciente modificado correctamente.';
                _this.pacienteSeleccionado = null;
            })["catch"](function (error) {
                _this.mensaje = 'Error al modificar el paciente: ' + error;
            });
        }
    };
    PacientesComponent.prototype.borrarPaciente = function (id) {
        var _this = this;
        this.pacientesService.borrarPaciente(id)
            .then(function () {
            _this.mensaje = 'Paciente eliminado correctamente.';
            _this.pacientesEncontrados = _this.pacientesEncontrados.filter(function (paciente) { return paciente.id !== id; });
        })["catch"](function (error) {
            _this.mensaje = 'Error al eliminar el paciente: ' + error;
        });
    };
    PacientesComponent.prototype.getFormattedDate = function (date) {
        var year = date.getFullYear();
        var month = ('0' + (date.getMonth() + 1)).slice(-2);
        var day = ('0' + date.getDate()).slice(-2);
        var hours = ('0' + date.getHours()).slice(-2);
        var minutes = ('0' + date.getMinutes()).slice(-2);
        return year + "-" + month + "-" + day + "T" + hours + ":" + minutes + ":00.000Z";
    };
    PacientesComponent.prototype.camposValidos = function () {
        return (this.paciente.dni &&
            this.paciente.nombre &&
            this.paciente.fechaNacimiento &&
            this.paciente.direccion &&
            this.paciente.telefono &&
            this.paciente.correoElectronico);
    };
    PacientesComponent.prototype.limpiarFormulario = function () {
        this.paciente = {
            id: '',
            nombre: '',
            apellidos: '',
            dni: '',
            nSeguridadSocial: '',
            fechaNacimiento: new Date(),
            direccion: '',
            telefono: '',
            correoElectronico: ''
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

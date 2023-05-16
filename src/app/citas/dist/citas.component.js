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
exports.CitasComponent = void 0;
var core_1 = require("@angular/core");
var CitasComponent = /** @class */ (function () {
    function CitasComponent(citasService) {
        this.citasService = citasService;
        this.cita = {
            id: '',
            pacienteId: '',
            doctorId: '',
            especialidad: '',
            fecha: new Date(),
            motivo: '',
            estado: ''
        };
        this.mensaje = '';
        this.citasEncontradas = [];
        this.citaSeleccionada = null;
        this.idBuscar = ''; // Agrega esta línea para definir la propiedad idBuscar
    }
    CitasComponent.prototype.ngOnInit = function () { };
    CitasComponent.prototype.agregarCita = function () {
        var _this = this;
        if (!this.camposValidos()) {
            this.mensaje = 'Por favor, completa todos los campos.';
            return;
        }
        this.citasService
            .getCitaPorID(this.cita.id)
            .then(function (citaExistente) {
            if (citaExistente) {
                _this.mensaje = 'Ya existe una cita con este ID.';
            }
            else {
                _this.citasService
                    .addCita(_this.cita)
                    .then(function () {
                    _this.mensaje = 'Cita agregada correctamente.';
                    _this.limpiarFormulario();
                })["catch"](function (error) {
                    _this.mensaje = 'Error al agregar la cita: ' + error;
                });
            }
        })["catch"](function (error) {
            _this.mensaje = 'Error al buscar la cita: ' + error;
        });
    };
    CitasComponent.prototype.buscarCitaPorID = function (id) {
        var _this = this;
        this.citasService
            .buscarCitaPorID(id)
            .then(function (citas) {
            _this.citasEncontradas = citas;
            if (citas.length === 0) {
                _this.mensaje = 'No se encontraron citas con este DID.';
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
        return (this.cita.id &&
            this.cita.pacienteId &&
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
            fecha: new Date('01-01-01'),
            motivo: '',
            estado: ''
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

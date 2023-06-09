"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.MisCitasComponent = void 0;
var core_1 = require("@angular/core");
var MisCitasComponent = /** @class */ (function () {
    function MisCitasComponent(citasService) {
        this.citasService = citasService;
        this.citasPaciente = [];
        this.dni = '';
        this.pacienteId = '';
        this.nuevoEstado = '';
    }
    MisCitasComponent.prototype.ngOnInit = function () { };
    MisCitasComponent.prototype.buscarCitasPorDNI = function () {
        var _this = this;
        if (this.dni !== '') {
            this.citasService.buscarCitasPorDNI(this.dni).then(function (citas) {
                _this.citasPaciente = citas;
            });
        }
        else {
            this.citasPaciente = [];
        }
    };
    MisCitasComponent.prototype.buscarCitasPorPacienteID = function () {
        var _this = this;
        if (this.pacienteId !== '') {
            this.citasService.buscarCitasPorPacienteID(this.pacienteId).then(function (citas) {
                _this.citasPaciente = citas;
            });
        }
        else {
            this.citasPaciente = [];
        }
    };
    MisCitasComponent.prototype.getColorByEstado = function (estado) {
        switch (estado) {
            case 'confirmada':
                return 'rgb(150, 230, 150)'; // Cita confirmada
            case 'pendiente':
                return 'rgb(255, 255, 144)'; // Cita pendiente
            case 'denegada':
                return 'rgb(238, 77, 77)'; // Cita denegada
            default:
                return 'inherit'; // Color por defecto si el estado no coincide con ninguno de los casos anteriores
        }
    };
    MisCitasComponent.prototype.ordenarCitasPorEstado = function () {
        var _this = this;
        this.citasPaciente.sort(function (citaA, citaB) {
            var estadoA = _this.obtenerValorEstado(citaA.estado);
            var estadoB = _this.obtenerValorEstado(citaB.estado);
            if (estadoA < estadoB) {
                return -1;
            }
            else if (estadoA > estadoB) {
                return 1;
            }
            else {
                return 0;
            }
        });
    };
    MisCitasComponent.prototype.obtenerValorEstado = function (estado) {
        switch (estado) {
            case 'confirmada':
                return 1;
            case 'pendiente':
                return 2;
            case 'denegada':
                return 3;
            default:
                return 0;
        }
    };
    MisCitasComponent.prototype.modificarEstadoCita = function (cita) {
        cita.estado = this.nuevoEstado;
        this.citasService.modificarCita(cita)
            .then(function () {
            console.log('Estado de la cita modificado exitosamente');
        })["catch"](function (error) {
            console.error('Error al modificar el estado de la cita:', error);
        });
    };
    MisCitasComponent = __decorate([
        core_1.Component({
            selector: 'app-mis-citas',
            templateUrl: './mis-citas.component.html',
            styleUrls: ['./mis-citas.component.scss']
        })
    ], MisCitasComponent);
    return MisCitasComponent;
}());
exports.MisCitasComponent = MisCitasComponent;

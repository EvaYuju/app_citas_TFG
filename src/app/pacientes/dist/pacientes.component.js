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
            id: '',
            nombre: '',
            edad: null,
            direccion: '',
            telefono: '',
            email: ''
        };
    }
    PacientesComponent.prototype.ngOnInit = function () {
    };
    PacientesComponent.prototype.agregarPaciente = function () {
        this.pacientesService.addPaciente(this.paciente)
            .then(function () {
            console.log('Paciente agregado correctamente');
            // Aquí puedes realizar acciones adicionales después de agregar el paciente, como limpiar el formulario o mostrar un mensaje de éxito.
        })["catch"](function (error) {
            console.error('Error al agregar el paciente:', error);
            // Aquí puedes manejar el error de manera adecuada, como mostrar un mensaje de error al usuario.
        });
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

"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.DoctoresComponent = void 0;
var core_1 = require("@angular/core");
var DoctoresComponent = /** @class */ (function () {
    function DoctoresComponent(doctorsService) {
        this.doctorsService = doctorsService;
        this.doctores = [];
        this.id = '';
        this.dni = '';
        this.name = '';
        this.specialty = '';
        this.especialidadBusqueda = '';
        this.doctorSeleccionado = null;
        this.mensaje = '';
    }
    DoctoresComponent.prototype.ngOnInit = function () {
        this.actualizarListaDoctores();
    };
    DoctoresComponent.prototype.buscarDoctorPorEspecialidad = function (specialty) {
        this.especialidadBusqueda = specialty;
        this.actualizarListaDoctores();
    };
    DoctoresComponent.prototype.agregarDoctor = function () {
        var _this = this;
        var doctor = {
            id: '',
            dni: this.dni,
            name: this.name,
            specialty: this.specialty
        };
        this.doctorsService.getDoctorPorEspecialidad(this.specialty)
            .then(function (exists) {
            if (exists) {
                _this.mensaje = 'El doctor ya existe';
            }
            else {
                _this.doctorsService.addDoctor(doctor)
                    .then(function () {
                    _this.mensaje = 'Doctor agregado exitosamente';
                    _this.limpiarFormulario();
                    _this.actualizarListaDoctores();
                })["catch"](function (error) {
                    _this.mensaje = 'Error al agregar doctor: ' + error;
                });
            }
        })["catch"](function (error) {
            _this.mensaje = 'Error al verificar la existencia del doctor: ' + error;
        });
    };
    DoctoresComponent.prototype.modificarDoctor = function () {
        var _this = this;
        if (this.doctorSeleccionado) {
            this.doctorsService.modificarDoctor(this.doctorSeleccionado)
                .then(function () {
                _this.mensaje = 'Doctor modificado exitosamente';
                _this.limpiarFormulario();
                _this.actualizarListaDoctores();
            })["catch"](function (error) {
                _this.mensaje = 'Error al modificar doctor: ' + error;
            });
        }
    };
    DoctoresComponent.prototype.borrarDoctor = function (id) {
        var _this = this;
        this.doctorsService.borrarDoctor(id)
            .then(function () {
            _this.mensaje = 'Doctor borrado exitosamente';
            _this.actualizarListaDoctores();
        })["catch"](function (error) {
            _this.mensaje = 'Error al borrar doctor: ' + error;
        });
    };
    DoctoresComponent.prototype.seleccionarDoctor = function (doctor) {
        this.doctorSeleccionado = doctor;
        this.name = doctor.name;
        this.specialty = doctor.specialty;
    };
    DoctoresComponent.prototype.actualizarListaDoctores = function () {
        var _this = this;
        this.doctorsService.buscarDoctorPorEspecialidad(this.especialidadBusqueda)
            .then(function (doctores) {
            _this.doctores = doctores;
        })["catch"](function (error) {
            _this.mensaje = 'Error al buscar doctores: ' + error;
        });
    };
    DoctoresComponent.prototype.limpiarFormulario = function () {
        this.name = '';
        this.dni = '';
        this.specialty = '';
        this.doctorSeleccionado = null;
    };
    DoctoresComponent = __decorate([
        core_1.Component({
            selector: 'app-doctores',
            templateUrl: './doctores.component.html',
            styleUrls: ['./doctores.component.scss']
        })
    ], DoctoresComponent);
    return DoctoresComponent;
}());
exports.DoctoresComponent = DoctoresComponent;

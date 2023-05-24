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
exports.DoctoresComponent = void 0;
var core_1 = require("@angular/core");
var DoctoresComponent = /** @class */ (function () {
    function DoctoresComponent(doctorsService) {
        this.doctorsService = doctorsService;
        this.doctor = {
            id: '',
            dni: '',
            name: '',
            specialty: ''
        };
        this.mensaje = '';
        this.doctorsEncontrados = [];
        this.doctorSeleccionado = null;
        this.specialtyBuscar = ''; // Agrega esta línea para definir la propiedad specialtyBuscar
    }
    DoctoresComponent.prototype.ngOnInit = function () {
    };
    DoctoresComponent.prototype.agregarDoctor = function () {
        var _this = this;
        if (!this.camposValidos()) {
            this.mensaje = 'Por favor, completa todos los campos.';
            return;
        }
        ;
        this.doctorsService.getDoctorPorDni(this.doctor.dni)
            .then(function (exists) {
            if (exists) {
                _this.mensaje = 'Ya existe un doctor con ese DNI.';
            }
            else {
                _this.doctorsService.addDoctor(_this.doctor)
                    .then(function () {
                    _this.mensaje = 'Doctor agregado exitosamente.';
                    _this.limpiarFormulario();
                    //this.buscarDoctorPorEspecialidad(this.specialtyBuscar); // Actualiza la lista de doctores
                    //this.actualizarListaDoctores();
                })["catch"](function (error) {
                    _this.mensaje = 'Error al agregar doctor: ' + error;
                });
            }
        })["catch"](function (error) {
            _this.mensaje = 'Error al verificar la existencia del doctor: ' + error;
        });
    };
    DoctoresComponent.prototype.buscarDoctorPorEspecialidad = function (specialty) {
        var _this = this;
        this.doctorsService.buscarDoctorPorEspecialidad(specialty)
            .then(function (doctors) {
            _this.doctorsEncontrados = doctors;
            if (doctors.length === 0) {
                _this.mensaje = 'No se encontraron doctores con esta especialidad.';
                _this.limpiarFormulario();
            }
            else {
                _this.mensaje = '';
            }
        })["catch"](function (error) {
            _this.mensaje = 'Error al buscar el doctor: ' + error;
            _this.doctorsEncontrados = [];
        });
    };
    DoctoresComponent.prototype.seleccionarDoctor = function (doctor) {
        this.doctorSeleccionado = __assign({}, doctor);
    };
    DoctoresComponent.prototype.modificarDoctor = function () {
        var _this = this;
        if (this.doctorSeleccionado) {
            this.doctorsService.modificarDoctor(this.doctorSeleccionado)
                .then(function () {
                _this.mensaje = 'Doctor modificado correctamente.';
                _this.doctorSeleccionado = null;
                _this.buscarDoctorPorEspecialidad(_this.specialtyBuscar); // Actualiza la lista de doctores
            })["catch"](function (error) {
                _this.mensaje = 'Error al modificar el doctor: ' + error;
            });
        }
    };
    DoctoresComponent.prototype.borrarDoctor = function (id) {
        var _this = this;
        this.doctorsService.borrarDoctor(id)
            .then(function () {
            _this.mensaje = 'Doctor eliminado correctamente.';
            _this.doctorsEncontrados = _this.doctorsEncontrados.filter(function (doctor) { return doctor.id !== id; });
        })["catch"](function (error) {
            _this.mensaje = 'Error al eliminar el doctor: ' + error;
        });
    };
    DoctoresComponent.prototype.camposValidos = function () {
        return (this.doctor.dni &&
            this.doctor.name &&
            this.doctor.specialty);
    };
    DoctoresComponent.prototype.limpiarFormulario = function () {
        this.doctor = {
            id: '',
            dni: '',
            name: '',
            specialty: ''
        };
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

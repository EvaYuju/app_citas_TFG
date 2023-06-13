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
var operators_1 = require("rxjs/operators");
var MisCitasComponent = /** @class */ (function () {
    //cita: Citas;
    function MisCitasComponent(citasService, usuariosService, pacientesService, authService) {
        this.citasService = citasService;
        this.usuariosService = usuariosService;
        this.pacientesService = pacientesService;
        this.authService = authService;
        this.citasPaciente = [];
        this.dni = '';
        this.pacienteId = '';
        this.nuevoEstado = ''; // Almacenar el cambio del estado
        this.usuarioRol = ''; // Agrega esta línea para almacenar el rol del usuario
        this.usuarioPacienteDni = '';
        this.dniUsuarioActual = '';
        this.nombreUsuarioActual = ''; // pendiente hacer y en todas
    }
    MisCitasComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.obtenerUsuarioRol().then(function () {
            _this.obtenerUsuarioDNI().then(function () {
                _this.buscarCitas();
            });
        });
    };
    // ROL PACIENTE
    MisCitasComponent.prototype.obtenerUsuarioDNI = function () {
        var _this = this;
        return this.authService.getUsuarioEmail().pipe(operators_1.take(1)).toPromise().then(function (correo) {
            if (correo) {
                if (_this.usuarioRol === 'PACIENTE') {
                    return _this.pacientesService.getPacientePorCorreo(correo).then(function (paciente) {
                        if (paciente) {
                            _this.dniUsuarioActual = paciente.dni; // Almacena el DNI en una variable para usarlo en la vista HTML
                        }
                        return null; // Add a return statement here
                    });
                }
            }
            return null; // Add a return statement here
        });
    };
    MisCitasComponent.prototype.obtenerUsuarioRol = function () {
        var _this = this;
        return this.authService.getUsuarioEmail().pipe(operators_1.take(1)).toPromise().then(function (correo) {
            if (correo) {
                return _this.usuariosService.getUsuarioRol(correo).then(function (rol) {
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
            }
            return null; // Add a return statement here
        });
    };
    MisCitasComponent.prototype.getUsuarioRol = function (correo) {
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
    MisCitasComponent.prototype.buscarCitas = function () {
        var _this = this;
        if (this.dniUsuarioActual !== '') {
            this.citasService.buscarCitasPorPacienteID(this.dniUsuarioActual).then(function (citas) {
                _this.citasPaciente = citas;
                console.log("Citas del paciente:", _this.citasPaciente);
            });
        }
        else {
            this.citasPaciente = [];
        }
    };
    // ROL MEDICO
    MisCitasComponent.prototype.buscarCitasPorDNI = function () {
        var _this = this;
        console.log("Buscar citas se ha ejecutado correctamente.MED");
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
                console.log("Citas del paciente:", _this.citasPaciente);
            });
        }
        else {
            this.citasPaciente = [];
        }
    };
    // Métodos comúnes
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
        if (cita) {
            cita.estado = this.nuevoEstado;
            this.citasService
                .modificarCita(cita)
                .then(function () {
                console.log('Estado de la cita modificado exitosamente');
            })["catch"](function (error) {
                console.error('Error al modificar el estado de la cita:', error);
            });
        }
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

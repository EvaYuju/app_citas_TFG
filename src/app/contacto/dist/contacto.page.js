"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.ContactoPage = void 0;
var core_1 = require("@angular/core");
var ContactoPage = /** @class */ (function () {
    function ContactoPage(contactoService, usuariosService, pacientesService, firestore, authService) {
        this.contactoService = contactoService;
        this.usuariosService = usuariosService;
        this.pacientesService = pacientesService;
        this.firestore = firestore;
        this.authService = authService;
        this.contactForm = {
            id: '',
            fechaConsulta: new Date(),
            telefonoPaciente: '',
            emailPaciente: '',
            textoMensaje: '',
            pacienteDni: ''
        };
        this.mensaje = null;
        this.mensajeID = null;
        this.consultas = []; // Variable para almacenar los mensajes
        //authService: any;
        this.usuarioRol = '';
        this.dniUsuarioActual = '';
        this.tlfUsuarioActual = '';
        this.correoUsuarioActual = '';
    }
    ContactoPage.prototype.ngOnInit = function () {
        var _this = this;
        this.obtenerUsuarioRol(); // Obtener el rol del usuario
        //this.obtenerDatosUsuario();
        this.usuarioRol = '';
        this.dniUsuarioActual = '';
        this.tlfUsuarioActual = '';
        this.correoUsuarioActual = '';
        // Llamar al método para obtener los mensajes ordenados por fecha
        this.contactoService.obtenerConsultas().subscribe(function (consultas) {
            _this.consultas = consultas;
        }, function (error) {
            console.error(error);
        });
    };
    ContactoPage.prototype.submitForm = function () {
        var _this = this;
        this.contactoService.guardarConsulta(this.contactForm)
            .then(function () {
            _this.mensaje = 'Consulta enviada correctamente';
            //this.mensajeID = guardarconsulta.mensajeID;
            _this.contactForm = {
                id: '',
                fechaConsulta: new Date(),
                telefonoPaciente: _this.tlfUsuarioActual,
                emailPaciente: _this.correoUsuarioActual,
                textoMensaje: '',
                pacienteDni: _this.dniUsuarioActual // Asignar el DNI del paciente logueado
            };
        })["catch"](function (error) {
            _this.mensaje = "Error al enviar la consulta: " + error.message;
        });
    };
    // Obtener datos usuario-paciente para campos
    // ***
    ContactoPage.prototype.obtenerUsuarioRol = function () {
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
                                _this.tlfUsuarioActual = paciente.telefono; // Almacena el teléfono en una variable para usarlo en la vista HTML
                                _this.correoUsuarioActual = paciente.correoElectronico; // Alma
                                _this.obtenerDatosUsuario(); // Llamar a obtenerDatosUsuario() después de obtener el rol del usuario
                            }
                        });
                    }
                });
            }
        });
    };
    ContactoPage.prototype.getUsuarioRol = function (correo) {
        var _this = this;
        return this.usuariosService.getUsuarioRol(correo).then(function (rol) {
            _this.usuarioRol = rol || '';
            // Obtener el paciente.DATO_QUE_QUERAMOS del paciente logueado 
            if (_this.usuarioRol === 'PACIENTE') {
                return _this.pacientesService.getPacientePorCorreo(correo).then(function (paciente) {
                    if (paciente) {
                        _this.dniUsuarioActual = paciente.dni; // Almacena el DNI en una variable para usarlo en la vista HTML
                        _this.tlfUsuarioActual = paciente.telefono; // Almacena el teléfono en una variable para usarlo en la vista HTML
                        _this.correoUsuarioActual = paciente.correoElectronico; // Alma
                    }
                    return rol;
                });
            }
            else {
                return rol;
            }
        });
    };
    ContactoPage.prototype.obtenerDatosUsuario = function () {
        var _this = this;
        this.authService.getUsuarioEmail().subscribe(function (correo) {
            if (correo && _this.usuarioRol === 'PACIENTE') {
                _this.pacientesService.getPacientePorCorreo(correo).then(function (paciente) {
                    if (paciente) {
                        _this.dniUsuarioActual = paciente.dni;
                        _this.tlfUsuarioActual = paciente.telefono;
                        _this.correoUsuarioActual = paciente.correoElectronico;
                        // Asignar los valores después de obtener los datos del paciente
                        _this.contactForm.telefonoPaciente = _this.tlfUsuarioActual;
                        _this.contactForm.emailPaciente = _this.correoUsuarioActual;
                        _this.contactForm.pacienteDni = _this.dniUsuarioActual;
                    }
                });
            }
        });
    };
    ContactoPage.prototype.borrarConsulta = function (id) {
        this.contactoService.borrarConsulta(id)
            .then(function () {
            console.log('Consulta eliminada correctamente');
        })["catch"](function (error) {
            console.error('Error al eliminar la consulta:', error);
        });
    };
    ContactoPage = __decorate([
        core_1.Component({
            selector: 'app-contacto',
            templateUrl: './contacto.page.html',
            styleUrls: ['./contacto.page.scss']
        })
    ], ContactoPage);
    return ContactoPage;
}());
exports.ContactoPage = ContactoPage;

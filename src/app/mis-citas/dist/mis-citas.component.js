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
var firestore_1 = require("@angular/fire/firestore");
var MisCitasComponent = /** @class */ (function () {
    //cita: Citas;
    function MisCitasComponent(citasService, usuariosService, pacientesService, doctorsService, firestore, specialtiesService, authService) {
        this.citasService = citasService;
        this.usuariosService = usuariosService;
        this.pacientesService = pacientesService;
        this.doctorsService = doctorsService;
        this.firestore = firestore;
        this.specialtiesService = specialtiesService;
        this.authService = authService;
        this.citasPaciente = [];
        this.citasDoctor = []; // ***
        this.dni = '';
        this.pacienteId = '';
        this.doctorId = '';
        this.nuevoEstado = ''; // Almacenar el cambio del estado
        this.usuarioRol = ''; // Agrega esta línea para almacenar el rol del usuario
        //usuarioPacienteDni: string = '';
        this.dniUsuarioActual = '';
        this.tlfUsuarioActual = '';
        this.correoUsuarioActual = '';
        this.nombreUsuarioActual = ''; // pendiente hacer y en todas
        this.citasEncontradasEspecialidad = [];
        this.especialidades = [];
        this.specialtyBuscar = '';
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
    }
    MisCitasComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.loadSpecialties();
        this.obtenerUsuarioRol().then(function () {
            _this.obtenerUsuarioDNI().then(function () {
                _this.buscarCitas(); // Inizializar ver citas de paciente logueado
                _this.buscarCitasDoc(); // Inizializar ver citas de doctor logueado
                _this.buscarCitasPorDoctorID(); // Agrega esta línea para buscar las citas del doctor
            });
        });
        /*this.citasService.obtenerCitas().subscribe(
          (citasV) => {
            this.citasDoctor = citasV;
          },
          (error) => {
            console.error(error);
          }
        );*/
    };
    MisCitasComponent.prototype.obtenerUsuarioDNI = function () {
        var _this = this;
        return this.authService.getUsuarioEmail().pipe(operators_1.take(1)).toPromise().then(function (correo) {
            if (correo) {
                if (_this.usuarioRol === 'PACIENTE') {
                    return _this.pacientesService.getPacientePorCorreo(correo).then(function (paciente) {
                        if (paciente) {
                            _this.dniUsuarioActual = paciente.dni;
                        }
                        return null;
                    });
                }
                else if (_this.usuarioRol === 'DOCTOR') {
                    return _this.doctorsService.getDoctorPorCorreo(correo).then(function (doctor) {
                        if (doctor) {
                            _this.dniUsuarioActual = doctor.dni;
                            _this.doctorId = doctor.id;
                        }
                        return null;
                    });
                }
            }
            return null;
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
                    else if (_this.usuarioRol === 'MEDICO') {
                        return _this.doctorsService.getDoctorPorCorreo(correo).then(function (doctor) {
                            if (doctor) {
                                _this.correoUsuarioActual = doctor.correoElectronico; // 
                                _this.dniUsuarioActual = doctor.dni; // Almacena el DNI en una variable para usarlo en la vista HTML
                                _this.obtenerDatosUsuario(); // Llamar a obtenerDatosUsuario() después de obtener el rol del usuario
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
            else if (_this.usuarioRol === 'MEDICO') {
                return _this.doctorsService.getDoctorPorCorreo(correo).then(function (doctor) {
                    if (doctor) {
                        _this.dniUsuarioActual = doctor.dni; // Almacena el DNI en una variable para usarlo en la vista HTML
                    }
                    return rol;
                });
            }
            else {
                return rol;
            }
        });
    };
    MisCitasComponent.prototype.obtenerDatosUsuario = function () {
        var _this = this;
        this.authService.getUsuarioEmail().subscribe(function (correo) {
            if (correo && _this.usuarioRol === 'MEDICO') {
                _this.doctorsService.getDoctorPorCorreo(correo).then(function (doctor) {
                    if (doctor) {
                        _this.dniUsuarioActual = doctor.dni;
                        _this.correoUsuarioActual = doctor.correoElectronico;
                        // Asignar los valores después de obtener los datos del docotr
                        //this.telefonoPaciente = this.tlfUsuarioActual;
                        //this.emailPaciente = this.correoUsuarioActual;
                        //this.pacienteDni = this.dniUsuarioActual;
                    }
                });
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
    MisCitasComponent.prototype.buscarCitasDoc = function () {
        var _this = this;
        if (this.dniUsuarioActual !== '') {
            this.citasService.buscarCitasPorDoctorID(this.dniUsuarioActual).then(function (citas) {
                _this.citasDoctor = citas;
                console.log("Citas del doc:", _this.citasDoctor);
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
                console.log("Citas del paciente:", _this.citasPaciente);
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
            this.citasPaciente = []; // este si lo pilla
        }
    };
    MisCitasComponent.prototype.buscarCitasPorDoctorID = function () {
        var _this = this;
        if (this.doctorId !== '') {
            this.citasService.buscarCitasPorDoctorID(this.doctorId).then(function (citas) {
                _this.citasDoctor = citas;
                console.log("Citas del doctor1:", _this.citasDoctor);
            });
        }
        else {
            this.citasDoctor = []; // este no...
            //console.log("Citas del doctor:", this.citasDoctor);
        }
    };
    MisCitasComponent.prototype.buscarCitasPorEspecialidad = function (especialidad) {
        var _this = this;
        var citaRef = firestore_1.collection(this.firestore, 'citas');
        var q = firestore_1.query(citaRef, firestore_1.where('especialidad', '==', especialidad));
        return firestore_1.getDocs(q).then(function (snapshot) {
            if (!snapshot.empty) {
                var citas_1 = [];
                snapshot.forEach(function (doc) {
                    var cita = doc.data();
                    cita.id = doc.id;
                    citas_1.push(cita);
                });
                _this.citasPaciente = citas_1; // Asignar las citas encontradas a this.citasPaciente
            }
            else {
                _this.citasPaciente = []; // Si no se encontraron citas, asignar un array vacío
            }
        });
    };
    MisCitasComponent.prototype.loadSpecialties = function () {
        var _this = this;
        this.specialtiesService.getAllSpecialties().then(function (listSpecialties) {
            _this.especialidades = listSpecialties;
        });
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
        this.citasDoctor.sort(function (citaA, citaB) {
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
    MisCitasComponent.prototype.borrarCita = function (citaId) {
        var _this = this;
        this.citasService.borrarCita(citaId)
            .then(function () {
            console.log('Cita borrada exitosamente');
            // Aquí puedes actualizar la lista de citas si es necesario
            _this.citasPaciente = _this.citasPaciente.filter(function (cita) { return cita.id !== citaId; });
            _this.citasDoctor = _this.citasDoctor.filter(function (cita) { return cita.id !== citaId; });
        })["catch"](function (error) {
            console.error('Error al borrar la cita:', error);
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

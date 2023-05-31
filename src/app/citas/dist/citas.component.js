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
    function CitasComponent(citasService, doctorsService, specialtiesService, usuariosService) {
        this.citasService = citasService;
        this.doctorsService = doctorsService;
        this.specialtiesService = specialtiesService;
        this.usuariosService = usuariosService;
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
        this.doctors = [];
        this.mensaje = '';
        this.mensajeID = '';
        this.mensajeDoc = '';
        this.specialtyBuscar = '';
        this.doctorSeleccionado = null;
        this.citasEncontradas = [];
        this.citaSeleccionada = null;
        this.especialidades = [];
        this.idBuscar = ''; // Agrega esta línea para definir la propiedad idBuscar
        this.usuarioRol = ''; // Agrega esta línea para almacenar el rol del usuario
        this.minDate = '';
        this.horariosDoctor = [];
    }
    CitasComponent.prototype.ngOnInit = function () {
        this.citaSeleccionada = this.cita;
        this.loadSpecialties();
    };
    CitasComponent.prototype.agregarCita = function () {
        var _this = this;
        if (!this.camposValidos()) {
            this.mensaje = 'Por favor, completa todos los campos.';
            return;
        }
        // Obtener la hora seleccionada del componente ion-datetime y asignarla al campo 'hora'
        var selectedDateTime = new Date(this.cita.fecha);
        var selectedTime = ('0' + selectedDateTime.getHours()).slice(-2) + ':' + ('0' + selectedDateTime.getMinutes()).slice(-2);
        this.cita.hora = selectedTime;
        this.citasService
            .addCita(this.cita)
            .then(function () {
            _this.mensajeID =
                'Cita agregada correctamente. ID de la cita: ' + _this.cita.id;
            _this.limpiarFormulario();
        })["catch"](function (error) {
            _this.mensaje = 'Error al agregar la cita: ' + error;
        });
    };
    CitasComponent.prototype.buscarCitaPorID = function (id) {
        var _this = this;
        this.citasService.buscarCitaPorID(this.cita.id)
            .then(function (citas) {
            _this.citasEncontradas = citas;
            if (citas.length === 0) {
                _this.mensaje = 'No se encontraron citas con este ID.';
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
    CitasComponent.prototype.buscarDoctorPorEspecialidad = function (especialidad) {
        var _this = this;
        this.doctorsService
            .buscarDoctorPorEspecialidad(especialidad)
            .then(function (doctors) {
            _this.doctors = doctors;
            if (doctors.length === 0) {
                _this.mensajeDoc = 'No se encontraron doctores con esta especialidad.';
                _this.limpiarFormulario();
            }
            else {
                _this.mensajeDoc = '';
                _this.horariosDoctor = doctors[0].horario;
            }
        })["catch"](function (error) {
            _this.mensajeDoc = 'Error al buscar el doctor: ' + error;
            _this.doctors = [];
        });
    };
    CitasComponent.prototype.loadSpecialties = function () {
        var _this = this;
        this.specialtiesService.getAllSpecialties().then(function (listSpecialties) {
            _this.especialidades = listSpecialties;
        });
    };
    CitasComponent.prototype.seleccionarDoctor = function (doctor) {
        this.doctorSeleccionado = __assign({}, doctor);
        this.loadDoctorSchedule();
    };
    CitasComponent.prototype.loadDoctorSchedule = function () {
        if (this.doctorSeleccionado) {
            this.minDate = this.getFormattedDate(new Date());
            // Obtener los horarios del doctor seleccionado
            this.horariosDoctor = this.doctorSeleccionado.horario;
            // Utilizar el primer horario disponible como fecha mínima
            this.minDate += ' ' + this.horariosDoctor[0];
        }
    };
    // Aquí se obtiene el horario del doctor seleccionado y se establece como fecha mínima permitida
    // para la selección en el componente ion-datetime.
    // Asegúrate de que el horario del doctor sea un array de strings que representen las horas disponibles.
    // Por ejemplo, ['09:00', '10:00', '11:00', ...].
    CitasComponent.prototype.getFormattedDate = function (date) {
        var year = date.getFullYear();
        var month = ('0' + (date.getMonth() + 1)).slice(-2);
        var day = ('0' + date.getDate()).slice(-2);
        var hours = ('0' + date.getHours()).slice(-2);
        var minutes = ('0' + date.getMinutes()).slice(-2);
        return day + "/" + month + "/" + year + " " + hours + ":" + minutes;
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
        return (this.cita.pacienteId &&
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
            fecha: new Date(),
            hora: '',
            motivo: '',
            estado: '',
            comentario: ''
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

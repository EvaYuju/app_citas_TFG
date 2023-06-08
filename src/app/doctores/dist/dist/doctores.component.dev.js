"use strict";

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

var __assign = void 0 && (void 0).__assign || function () {
  __assign = Object.assign || function (t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
      s = arguments[i];

      for (var p in s) {
        if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
      }
    }

    return t;
  };

  return __assign.apply(this, arguments);
};

var __decorate = void 0 && (void 0).__decorate || function (decorators, target, key, desc) {
  var c = arguments.length,
      r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc,
      d;
  if ((typeof Reflect === "undefined" ? "undefined" : _typeof(Reflect)) === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);else for (var i = decorators.length - 1; i >= 0; i--) {
    if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
  }
  return c > 3 && r && Object.defineProperty(target, key, r), r;
};

exports.__esModule = true;
exports.DoctoresComponent = void 0;

var core_1 = require("@angular/core");

var DoctoresComponent =
/** @class */
function () {
  function DoctoresComponent(doctorsService, specialtiesService) {
    this.doctorsService = doctorsService;
    this.specialtiesService = specialtiesService;
    this.doctor = {
      id: '',
      nombre: '',
      apellidos: '',
      dni: '',
      nColegiado: '',
      especialidad: '',
      telefono: '',
      correoElectronico: '',
      horario: this.generarHorario(this.horaInicio, this.horaFinal)
    };
    this.mensaje = '';
    this.doctorsEncontrados = [];
    this.doctorsEncontradosDNI = [];
    this.doctorSeleccionado = null;
    this.specialtyBuscar = '';
    this.dniBuscar = '';
    this.especialidades = [];
    this.loadDoctorsBySpecialty();
  }

  DoctoresComponent.prototype.ngOnInit = function () {
    this.loadSpecialties();
    this.rol = localStorage.getItem('ROL');
  }; //PARA AUTHENTICATION


  DoctoresComponent.prototype.isAuthenticated = function (rol) {
    return this.rol == rol;
  };

  DoctoresComponent.prototype.agregarDoctor = function () {
    var _this = this;

    if (!this.camposValidos()) {
      this.mensaje = 'Por favor, completa todos los campos.';
      return;
    }

    this.doctorsService.getDoctorPorDni(this.doctor.dni).then(function (exists) {
      if (exists) {
        _this.mensaje = 'Ya existe un doctor con ese DNI.';
      } else {
        _this.doctorsService.addDoctor(_this.doctor).then(function () {
          _this.mensaje = 'Doctor agregado exitosamente.';

          _this.limpiarFormulario();
        })["catch"](function (error) {
          _this.mensaje = 'Error al agregar doctor: ' + error;
        });
      }
    })["catch"](function (error) {
      _this.mensaje = 'Error al verificar la existencia del doctor: ' + error;
    });
  };

  DoctoresComponent.prototype.buscarDoctorPorEspecialidad = function (especialidad) {
    var _this = this;

    this.doctorsService.buscarDoctorPorEspecialidad(especialidad).then(function (doctors) {
      _this.doctorsEncontrados = doctors;

      if (doctors.length === 0) {
        _this.mensaje = 'No se encontraron doctores con esta especialidad.';

        _this.limpiarFormulario();
      } else {
        _this.mensaje = '';
      }
    })["catch"](function (error) {
      _this.mensaje = 'Error al buscar el doctor: ' + error;
      _this.doctorsEncontrados = [];
    });
  };

  DoctoresComponent.prototype.buscarDoctorPorDNI = function (dni) {
    var _this = this;

    this.doctorsService.buscarDoctorPorDNI(dni).then(function (doctors) {
      _this.doctorsEncontrados = doctors;

      if (doctors.length === 0) {
        _this.mensaje = 'No se encontraron pacientes con este DNI.';
      } else {
        _this.mensaje = '';
      }
    })["catch"](function (error) {
      _this.mensaje = 'Error al buscar el paciente: ' + error;
      _this.doctorsEncontradosDNI = [];
    });
  };

  DoctoresComponent.prototype.seleccionarDoctor = function (doctor) {
    this.doctorSeleccionado = __assign({}, doctor);
  };

  DoctoresComponent.prototype.modificarDoctor = function () {
    var _this = this;

    if (this.doctorSeleccionado) {
      this.doctorsService.modificarDoctor(this.doctorSeleccionado).then(function () {
        _this.mensaje = 'Doctor modificado correctamente.';
        _this.doctorSeleccionado = null;

        _this.buscarDoctorPorEspecialidad(_this.specialtyBuscar);
      })["catch"](function (error) {
        _this.mensaje = 'Error al modificar el doctor: ' + error;
      });
    }
  };

  DoctoresComponent.prototype.borrarDoctor = function (id) {
    var _this = this;

    this.doctorsService.borrarDoctor(id).then(function () {
      _this.mensaje = 'Doctor eliminado correctamente.';
      _this.doctorsEncontrados = _this.doctorsEncontrados.filter(function (doctor) {
        return doctor.id !== id;
      });
    })["catch"](function (error) {
      _this.mensaje = 'Error al eliminar el doctor: ' + error;
    });
  }; // Validación


  DoctoresComponent.prototype.camposValidos = function () {
    return this.doctor.dni && this.doctor.nombre && this.doctor.especialidad;
  }; // Métodos adicionales


  DoctoresComponent.prototype.limpiarFormulario = function () {
    this.doctor = {
      id: '',
      nombre: '',
      apellidos: '',
      dni: '',
      nColegiado: '',
      especialidad: '',
      telefono: '',
      correoElectronico: '',
      horario: this.generarHorario()
    };
  };

  DoctoresComponent.prototype.loadDoctorsBySpecialty = function () {
    var _this = this;

    var especialidadSeleccionada = this.specialtyBuscar;

    if (especialidadSeleccionada) {
      this.doctorsService.buscarDoctorPorEspecialidad(especialidadSeleccionada).then(function (doctors) {
        _this.doctorsEncontrados = doctors;

        if (doctors.length === 0) {
          _this.mensaje = 'No se encontraron doctores con esta especialidad.';
        } else {
          _this.mensaje = '';
        }
      })["catch"](function (error) {
        _this.mensaje = 'Error al buscar el doctor: ' + error;
        _this.doctorsEncontrados = [];
      });
    } else {
      this.doctorsEncontrados = [];
      this.mensaje = '';
    }
  };

  DoctoresComponent.prototype.generarHorario = function (horaIni, horaFin) {
    var horario = [];
    var horaInicio = new Date().setHours(horaIni ? horaIni : 8, 0, 0); // Establecer hora de inicio en 8:00 AM

    var horaFinal = new Date().setHours(horaFin ? horaFin : 15, 0, 0); // Establecer hora de fin en 3:00 PM

    var tiempoIncremento = 30; // Incremento de tiempo en minutos

    var horaActual = horaInicio;

    while (horaActual <= horaFinal) {
      var hora = new Date(horaActual);
      var horaFormateada = this.formatoHora(hora);
      horario.push(horaFormateada);
      horaActual += tiempoIncremento * 60 * 1000; // Convertir el incremento a milisegundos
    }

    return horario;
  };

  DoctoresComponent.prototype.formatoHora = function (hora) {
    var opciones = {
      hour: 'numeric',
      minute: 'numeric'
    };
    return hora.toLocaleTimeString([], opciones);
  };

  DoctoresComponent.prototype.loadSpecialties = function () {
    var _this = this;

    this.specialtiesService.getAllSpecialties().then(function (listSpecialties) {
      _this.especialidades = listSpecialties;
    });
  };

  DoctoresComponent = __decorate([core_1.Component({
    selector: 'app-doctores',
    templateUrl: './doctores.component.html',
    styleUrls: ['./doctores.component.scss']
  })], DoctoresComponent);
  return DoctoresComponent;
}();

exports.DoctoresComponent = DoctoresComponent;
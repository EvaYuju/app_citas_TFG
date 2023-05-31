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
exports.ContactoService = void 0;
var core_1 = require("@angular/core");
var rxjs_1 = require("rxjs");
var firestore_1 = require("@angular/fire/firestore");
var ContactoService = /** @class */ (function () {
    function ContactoService(firestore) {
        this.firestore = firestore;
    }
    ContactoService.prototype.guardarConsulta = function (consulta) {
        var _this = this;
        var pacienteDni = consulta.pacienteDni;
        return this.verificarExistenciaPaciente(pacienteDni)
            .then(function () { return _this.agregarConsulta(consulta); })["catch"](function (error) {
            throw new Error("Error al guardar la consulta: " + error);
        });
    };
    ContactoService.prototype.obtenerConsultas = function () {
        var consultasRef = firestore_1.collection(this.firestore, 'consultas');
        return new rxjs_1.Observable(function (observer) {
            firestore_1.getDocs(consultasRef)
                .then(function (querySnapshot) {
                var consultas = [];
                querySnapshot.forEach(function (doc) {
                    consultas.push(__assign({ id: doc.id }, doc.data()));
                });
                observer.next(consultas);
            })["catch"](function (error) {
                observer.error("Error al obtener las consultas: " + error);
            });
        });
    };
    ContactoService.prototype.verificarExistenciaPaciente = function (dni) {
        var pacientesRef = firestore_1.collection(this.firestore, 'pacientes');
        var pacienteQuery = firestore_1.query(pacientesRef, firestore_1.where('dni', '==', dni));
        return firestore_1.getDocs(pacienteQuery)
            .then(function (snapshot) {
            if (snapshot.empty) {
                throw new Error("No se encontr\u00F3 un paciente con DNI " + dni);
            }
        });
    };
    ContactoService.prototype.agregarConsulta = function (consulta) {
        var consultasRef = firestore_1.collection(this.firestore, 'consultas');
        return firestore_1.addDoc(consultasRef, consulta)
            .then(function (docRef) {
            console.log("Documento agregado con ID: ", docRef.id);
        })["catch"](function (error) {
            throw new Error("Error al agregar la consulta: " + error);
        });
    };
    ContactoService = __decorate([
        core_1.Injectable({
            providedIn: 'root'
        })
    ], ContactoService);
    return ContactoService;
}());
exports.ContactoService = ContactoService;

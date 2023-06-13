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
var firestore_1 = require("firebase/firestore");
var ContactoService = /** @class */ (function () {
    function ContactoService() {
        this.firestore = firestore_1.getFirestore();
    }
    ContactoService.prototype.guardarConsulta = function (consulta) {
        consulta.id = this.generarIdMensaje(); // Asignar el ID automáticamente
        return this.agregarConsulta(consulta)["catch"](function (error) {
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
    ContactoService.prototype.agregarConsulta = function (consulta) {
        var consultasRef = firestore_1.collection(this.firestore, 'consultas');
        return firestore_1.addDoc(consultasRef, __assign({}, consulta)) // Enviar los datos como un objeto plano
            .then(function (docRef) {
            console.log("Documento agregado con ID: ", docRef.id);
        })["catch"](function (error) {
            throw new Error("Error al agregar la consulta: " + error);
        });
    };
    ContactoService.prototype.generarIdMensaje = function () {
        // Generar un ID único para el mensaje
        return Math.random().toString(36).substring(2, 10);
    };
    ContactoService = __decorate([
        core_1.Injectable({
            providedIn: 'root'
        })
    ], ContactoService);
    return ContactoService;
}());
exports.ContactoService = ContactoService;

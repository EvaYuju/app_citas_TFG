"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.CitasService = void 0;
var core_1 = require("@angular/core");
var firestore_1 = require("@angular/fire/firestore");
var CitasService = /** @class */ (function () {
    // Inyectamos Firestore en el constructor para poder trabajar con esa herramienta
    function CitasService(firestore) {
        this.firestore = firestore;
    }
    //(recibe un paciente de tipo:)
    CitasService.prototype.addCita = function (cita) {
        // Ref a la bd = metodo collection(importamos)(1ºparametro Sºfirestores, 2ºparam nombreColeccion)
        var citaRef = firestore_1.collection(this.firestore, 'citas');
        // retornar la llamada a addDoc(params: la coleccion, lo que insertamos)
        return firestore_1.addDoc(citaRef, cita);
    };
    CitasService.prototype.getCitaPorID = function (id) {
        var citaRef = firestore_1.collection(this.firestore, 'citas');
        var q = firestore_1.query(citaRef, firestore_1.where('id', '==', id));
        return firestore_1.getDocs(q).then(function (snapshot) { return !snapshot.empty; });
    };
    CitasService.prototype.buscarCitaPorID = function (id) {
        var citaRef = firestore_1.collection(this.firestore, 'citas');
        var q = firestore_1.query(citaRef, firestore_1.where('id', '==', id));
        return firestore_1.getDocs(q).then(function (snapshot) {
            if (!snapshot.empty) {
                var citas_1 = [];
                snapshot.forEach(function (doc) {
                    var cita = doc.data();
                    cita.id = doc.id;
                    citas_1.push(cita);
                });
                return citas_1;
            }
            else {
                return [];
            }
        });
    };
    CitasService.prototype.modificarCita = function (cita) {
        var citaRef = firestore_1.doc(this.firestore, 'citas', cita.id);
        return firestore_1.updateDoc(citaRef, 'citas', cita);
    };
    CitasService.prototype.borrarCita = function (id) {
        var citaRef = firestore_1.doc(this.firestore, 'citas', id);
        return firestore_1.deleteDoc(citaRef);
    };
    CitasService = __decorate([
        core_1.Injectable({
            providedIn: 'root'
        })
    ], CitasService);
    return CitasService;
}());
exports.CitasService = CitasService;

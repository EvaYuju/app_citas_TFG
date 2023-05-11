"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.PacientesService = void 0;
var core_1 = require("@angular/core");
var firestore_1 = require("@angular/fire/firestore");
var PacientesService = /** @class */ (function () {
    // Inyectamos Firebase en el constructor para poder trabajar con esa herramienta
    function PacientesService(firestore) {
        this.firestore = firestore;
    }
    PacientesService.prototype.addPaciente = function (paciente) {
        // Ref a la bd = metodo collection(importamos)(1ºparametro Sºfirestores, 2ºparam nombreColeccion)
        var pacienteRef = firestore_1.collection(this.firestore, 'pacientes');
        return firestore_1.addDoc(pacienteRef, paciente);
    };
    PacientesService.prototype.getPacientePorDNI = function (dni) {
        var pacienteRef = firestore_1.collection(this.firestore, 'pacientes');
        var q = firestore_1.query(pacienteRef, firestore_1.where('dni', '==', dni));
        return firestore_1.getDocs(q)
            .then(function (snapshot) { return !snapshot.empty; });
    };
    PacientesService = __decorate([
        core_1.Injectable({
            providedIn: 'root'
        })
    ], PacientesService);
    return PacientesService;
}());
exports.PacientesService = PacientesService;
/*
  getPlaces(): Observable<Place[]> {
    const placeRef = collection(this.firestore, 'places');
    return collectionData(placeRef, { idField: 'id' }) as Observable<Place[]>;
  }

  deletePlace(place: Place) {
    const placeDocRef = doc(this.firestore, `places/${place.id}`);
    return deleteDoc(placeDocRef);
  }*/

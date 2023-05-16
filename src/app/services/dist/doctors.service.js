"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.DoctorsService = void 0;
var core_1 = require("@angular/core");
var firestore_1 = require("@angular/fire/firestore");
var DoctorsService = /** @class */ (function () {
    // Inyectamos Firestore en el constructor para poder trabajar con esa herramienta
    function DoctorsService(firestore) {
        this.firestore = firestore;
    }
    //(recibe un doctor de tipo:)
    DoctorsService.prototype.addDoctor = function (doctor) {
        // Ref a la bd = metodo collection(importamos)(1ºparametro Sºfirestores, 2ºparam nombreColeccion)
        var doctorRef = firestore_1.collection(this.firestore, 'doctores');
        return firestore_1.addDoc(doctorRef, doctor);
    };
    DoctorsService.prototype.getDoctorPorEspecialidad = function (specialty) {
        var doctorRef = firestore_1.collection(this.firestore, 'doctores');
        var q = firestore_1.query(doctorRef, firestore_1.where('specialty', '==', specialty));
        return firestore_1.getDocs(q)
            .then(function (snapshot) { return !snapshot.empty; });
    };
    DoctorsService.prototype.buscarDoctorPorEspecialidad = function (specialty) {
        var doctorRef = firestore_1.collection(this.firestore, 'doctores');
        var q = firestore_1.query(doctorRef, firestore_1.where('specialty', '==', specialty));
        return firestore_1.getDocs(q)
            .then(function (snapshot) {
            if (!snapshot.empty) {
                var doctores_1 = [];
                snapshot.forEach(function (doc) {
                    var doctor = doc.data();
                    doctor.id = doc.id;
                    doctores_1.push(doctor);
                });
                return doctores_1;
            }
            else {
                return [];
            }
        });
    };
    DoctorsService.prototype.modificarDoctor = function (doctor) {
        var doctorRef = firestore_1.doc(this.firestore, 'doctores', doctor.id);
        var doctorData = {
            dni: doctor.dni,
            name: doctor.name,
            specialty: doctor.specialty
        };
        return firestore_1.updateDoc(doctorRef, doctorData);
    };
    DoctorsService.prototype.borrarDoctor = function (id) {
        var doctorRef = firestore_1.doc(this.firestore, 'doctores', id);
        return firestore_1.deleteDoc(doctorRef);
    };
    DoctorsService = __decorate([
        core_1.Injectable({
            providedIn: 'root'
        })
    ], DoctorsService);
    return DoctorsService;
}());
exports.DoctorsService = DoctorsService;

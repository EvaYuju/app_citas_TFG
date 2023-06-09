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
//import { v4 as uuidv4 } from 'uuid'; // Importa la función uuidv4 para generar un id único
var PacientesService = /** @class */ (function () {
    // Inyectamos Firestore en el constructor para poder trabajar con esa herramienta
    function PacientesService(firestore) {
        this.firestore = firestore;
    }
    //(recibe un paciente de tipo:)
    PacientesService.prototype.addPaciente = function (paciente) {
        // Ref a la bd = metodo collection(importamos)(1ºparametro Sºfirestores, 2ºparam nombreColeccion)
        var pacienteRef = firestore_1.collection(this.firestore, 'pacientes');
        //const id = uuidv4(); // Genera un id único utilizando la función uuidv4()
        //const pacienteWithId = { ...paciente, id }; // Crea un nuevo objeto que incluya el id generado
        // retornar la llamada a addDoc(params: la coleccion, lo que insertamos)
        return firestore_1.addDoc(pacienteRef, paciente);
    };
    PacientesService.prototype.getPacientePorDNI = function (dni) {
        var pacienteRef = firestore_1.collection(this.firestore, 'pacientes');
        var q = firestore_1.query(pacienteRef, firestore_1.where('dni', '==', dni));
        return firestore_1.getDocs(q)
            .then(function (snapshot) { return !snapshot.empty; });
    };
    PacientesService.prototype.getPacientePorCorreo = function (correo) {
        var pacienteRef = firestore_1.collection(this.firestore, 'pacientes');
        var q = firestore_1.query(pacienteRef, firestore_1.where('correoElectronico', '==', correo));
        return firestore_1.getDocs(q)
            .then(function (snapshot) {
            if (!snapshot.empty) {
                var paciente = snapshot.docs[0].data();
                paciente.id = snapshot.docs[0].id;
                return paciente;
            }
            else {
                return null;
            }
        });
    };
    PacientesService.prototype.buscarPacientePorDNI = function (dni) {
        var pacienteRef = firestore_1.collection(this.firestore, 'pacientes');
        var q = firestore_1.query(pacienteRef, firestore_1.where('dni', '==', dni));
        return firestore_1.getDocs(q)
            .then(function (snapshot) {
            if (!snapshot.empty) {
                var pacientes_1 = [];
                snapshot.forEach(function (doc) {
                    var paciente = doc.data();
                    paciente.id = doc.id;
                    pacientes_1.push(paciente);
                });
                return pacientes_1;
            }
            else {
                return [];
            }
        });
    };
    PacientesService.prototype.modificarPaciente = function (paciente) {
        var pacienteRef = firestore_1.doc(this.firestore, 'pacientes', paciente.id);
        var pacienteData = {
            id: paciente.id,
            dni: paciente.dni,
            nombre: paciente.nombre,
            edad: paciente.fechaNacimiento,
            direccion: paciente.direccion,
            telefono: paciente.telefono,
            email: paciente.correoElectronico
        };
        return firestore_1.updateDoc(pacienteRef, pacienteData);
    };
    PacientesService.prototype.borrarPaciente = function (id) {
        var pacienteRef = firestore_1.doc(this.firestore, 'pacientes', id);
        return firestore_1.deleteDoc(pacienteRef);
    };
    PacientesService = __decorate([
        core_1.Injectable({
            providedIn: 'root'
        })
    ], PacientesService);
    return PacientesService;
}());
exports.PacientesService = PacientesService;

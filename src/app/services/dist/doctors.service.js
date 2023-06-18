"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
exports.DoctorsService = void 0;
var core_1 = require("@angular/core");
var firestore_1 = require("@angular/fire/firestore");
var DoctorsService = /** @class */ (function () {
    function DoctorsService(firestore) {
        this.firestore = firestore;
    }
    DoctorsService.prototype.addDoctor = function (doctor) {
        var doctorRef = firestore_1.collection(this.firestore, 'doctores');
        return firestore_1.addDoc(doctorRef, doctor);
    };
    DoctorsService.prototype.getDoctorPorEspecialidad = function (especialidad) {
        var doctorRef = firestore_1.collection(this.firestore, 'doctores');
        var q = firestore_1.query(doctorRef, firestore_1.where('especialidad', '==', especialidad));
        return firestore_1.getDocs(q)
            .then(function (snapshot) { return !snapshot.empty; });
    };
    DoctorsService.prototype.getDoctorPorDni = function (dni) {
        var doctorRef2 = firestore_1.collection(this.firestore, 'doctores');
        var q = firestore_1.query(doctorRef2, firestore_1.where('dni', '==', dni));
        return firestore_1.getDocs(q)
            .then(function (snapshot) { return !snapshot.empty; });
    };
    DoctorsService.prototype.getDoctorPorCorreo = function (correo) {
        var doctorRef = firestore_1.collection(this.firestore, 'doctores');
        var q = firestore_1.query(doctorRef, firestore_1.where('correoElectronico', '==', correo));
        return firestore_1.getDocs(q)
            .then(function (snapshot) {
            if (!snapshot.empty) {
                var doctor = snapshot.docs[0].data();
                doctor.id = snapshot.docs[0].id;
                console.log(q);
                console.log(correo);
                return doctor;
            }
            else {
                return null;
            }
        });
    };
    DoctorsService.prototype.buscarDoctorPorEspecialidad = function (especialidad) {
        var doctorRef = firestore_1.collection(this.firestore, 'doctores');
        var q = firestore_1.query(doctorRef, firestore_1.where('especialidad', '==', especialidad));
        return firestore_1.getDocs(q)
            .then(function (snapshot) {
            if (!snapshot.empty) {
                var doctors_1 = [];
                snapshot.forEach(function (doc) {
                    var doctor = doc.data();
                    doctor.id = doc.id;
                    doctors_1.push(doctor);
                });
                return doctors_1;
            }
            else {
                return [];
            }
        });
    };
    DoctorsService.prototype.buscarDoctorPorDNI = function (dni) {
        return __awaiter(this, void 0, void 0, function () {
            var doctorRef2, q;
            return __generator(this, function (_a) {
                doctorRef2 = firestore_1.collection(this.firestore, 'doctores');
                q = firestore_1.query(doctorRef2, firestore_1.where('dni', '==', dni));
                return [2 /*return*/, firestore_1.getDocs(q)
                        .then(function (snapshot) {
                        if (!snapshot.empty) {
                            var doctors_2 = [];
                            snapshot.forEach(function (doc) {
                                var doctor = doc.data();
                                doctor.id = doc.id;
                                doctors_2.push(doctor);
                            });
                            return doctors_2;
                        }
                        else {
                            return [];
                        }
                    })];
            });
        });
    };
    DoctorsService.prototype.modificarDoctor = function (doctor) {
        var doctorRef = firestore_1.doc(this.firestore, 'doctores', doctor.id);
        var doctorData = {
            id: doctor.id,
            nombre: doctor.nombre,
            apellidos: doctor.apellidos,
            dni: doctor.dni,
            nColegiado: doctor.nColegiado,
            especialidad: doctor.especialidad,
            telefono: doctor.telefono,
            correoElectronico: doctor.correoElectronico
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

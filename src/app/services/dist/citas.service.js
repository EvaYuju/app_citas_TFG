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
exports.CitasService = void 0;
var core_1 = require("@angular/core");
var firestore_1 = require("@angular/fire/firestore");
var firestore_2 = require("firebase/firestore");
var CitasService = /** @class */ (function () {
    function CitasService(firestore) {
        this.firestore = firestore;
    }
    CitasService.prototype.addCita = function (cita) {
        return __awaiter(this, void 0, void 0, function () {
            var citaRef, docRef, citaId, error_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        citaRef = firestore_1.collection(this.firestore, 'citas');
                        return [4 /*yield*/, firestore_1.addDoc(citaRef, cita)];
                    case 1:
                        docRef = _a.sent();
                        citaId = docRef.id;
                        cita.id = citaId;
                        console.log('Cita creada con ID:', citaId);
                        return [3 /*break*/, 3];
                    case 2:
                        error_1 = _a.sent();
                        console.error('Error al crear la cita:', error_1);
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
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
    // * Revisar y quitar si no se usa
    CitasService.prototype.buscarCitasPorDNI = function (dni) {
        var citaRef = firestore_1.collection(this.firestore, 'citas');
        var q = firestore_1.query(citaRef, firestore_1.where('dni', '==', dni));
        return firestore_1.getDocs(q).then(function (snapshot) {
            if (!snapshot.empty) {
                var citas_2 = [];
                snapshot.forEach(function (doc) {
                    var cita = doc.data();
                    cita.id = doc.id;
                    citas_2.push(cita);
                });
                return citas_2;
            }
            else {
                return [];
            }
        });
    };
    // * En uso para buscar citas por dni en citas
    CitasService.prototype.buscarCitasPorPacienteID = function (pacienteId) {
        var citaRef = firestore_1.collection(this.firestore, 'citas');
        var q = firestore_1.query(citaRef, firestore_1.where('pacienteId', '==', pacienteId));
        return firestore_1.getDocs(q).then(function (snapshot) {
            if (!snapshot.empty) {
                var citas_3 = [];
                snapshot.forEach(function (doc) {
                    var cita = doc.data();
                    cita.id = doc.id;
                    citas_3.push(cita);
                });
                return citas_3;
            }
            else {
                return [];
            }
        });
    };
    CitasService.prototype.modificarCita = function (cita) {
        var citaRef = firestore_1.doc(this.firestore, 'citas', cita.id);
        return firestore_2.setDoc(citaRef, cita);
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

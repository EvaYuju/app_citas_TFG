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
exports.ContactoService = void 0;
var core_1 = require("@angular/core");
var rxjs_1 = require("rxjs");
var firestore_1 = require("firebase/firestore");
var ContactoService = /** @class */ (function () {
    function ContactoService() {
        this.firestore = firestore_1.getFirestore();
    }
    ContactoService.prototype.guardarConsulta = function (consulta) {
        return this.agregarConsulta(consulta)
            .then(function () {
            console.log("Consulta guardada con ID: ", consulta.id);
        })["catch"](function (error) {
            throw new Error("Error al guardar la consulta: " + error);
        });
    };
    ContactoService.prototype.obtenerConsultas = function () {
        var consultasRef = firestore_1.collection(this.firestore, 'consultas');
        var consultasQuery = firestore_1.query(consultasRef, firestore_1.orderBy('fechaConsulta'));
        return new rxjs_1.Observable(function (observer) {
            firestore_1.getDocs(consultasQuery)
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
        return __awaiter(this, void 0, Promise, function () {
            var consultasRef, docRef, error_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        consultasRef = firestore_1.collection(this.firestore, 'consultas');
                        return [4 /*yield*/, firestore_1.addDoc(consultasRef, consulta)];
                    case 1:
                        docRef = _a.sent();
                        consulta.id = docRef.id; // Asignar el ID generado automáticamente al objeto consulta
                        return [2 /*return*/, docRef];
                    case 2:
                        error_1 = _a.sent();
                        throw new Error("Error al agregar la consulta: " + error_1);
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    ContactoService.prototype.borrarConsulta = function (id) {
        var consultaRef = firestore_1.doc(this.firestore, 'consultas', id);
        console.log(id);
        return firestore_1.deleteDoc(consultaRef);
    };
    ContactoService = __decorate([
        core_1.Injectable({
            providedIn: 'root'
        })
    ], ContactoService);
    return ContactoService;
}());
exports.ContactoService = ContactoService;

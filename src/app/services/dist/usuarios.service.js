"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.UsuariosService = void 0;
var core_1 = require("@angular/core");
var firestore_1 = require("@angular/fire/firestore");
var UsuariosService = /** @class */ (function () {
    function UsuariosService(firestore) {
        this.firestore = firestore;
    }
    UsuariosService.prototype.registerUsuario = function (correo, rol) {
        var usuariosRef = firestore_1.collection(this.firestore, 'usuarios');
        var usuario = {
            correo: correo,
            rol: rol
        };
        return firestore_1.addDoc(usuariosRef, usuario);
    };
    UsuariosService.prototype.getUsuarioRol = function (correo) {
        var usuariosRef = firestore_1.collection(this.firestore, 'usuarios');
        var q = firestore_1.query(usuariosRef, firestore_1.where('correo', '==', correo));
        return firestore_1.getDocs(q).then(function (snapshot) {
            var usuario = null;
            if (!snapshot.empty) {
                snapshot.forEach(function (doc) {
                    var user = doc.data();
                    usuario = user.rol;
                });
            }
            return usuario;
        });
    };
    UsuariosService = __decorate([
        core_1.Injectable({
            providedIn: 'root'
        })
    ], UsuariosService);
    return UsuariosService;
}());
exports.UsuariosService = UsuariosService;

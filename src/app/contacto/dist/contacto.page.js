"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.ContactoPage = void 0;
var core_1 = require("@angular/core");
var ContactoPage = /** @class */ (function () {
    function ContactoPage(contactoService) {
        this.contactoService = contactoService;
        this.contactForm = {
            id: '',
            fechaConsulta: new Date(),
            telefonoPaciente: '',
            emailPaciente: '',
            textoMensaje: '',
            pacienteDni: ''
        };
        this.mensaje = null;
    }
    ContactoPage.prototype.submitForm = function () {
        var _this = this;
        this.contactoService.guardarConsulta(this.contactForm)
            .then(function () {
            _this.mensaje = 'Consulta enviada correctamente';
            _this.contactForm = {
                id: '',
                fechaConsulta: new Date(),
                telefonoPaciente: '',
                emailPaciente: '',
                textoMensaje: '',
                pacienteDni: ''
            };
        })["catch"](function (error) {
            _this.mensaje = "Error al enviar la consulta: " + error.message;
        });
    };
    ContactoPage = __decorate([
        core_1.Component({
            selector: 'app-contacto',
            templateUrl: './contacto.page.html',
            styleUrls: ['./contacto.page.scss']
        })
    ], ContactoPage);
    return ContactoPage;
}());
exports.ContactoPage = ContactoPage;

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
var DoctorsService = /** @class */ (function () {
    // Inyectamos Firebase en el constructor para poder trabajar con esa herramienta
    function DoctorsService(firestore) {
        this.firestore = firestore;
    }
    DoctorsService = __decorate([
        core_1.Injectable({
            providedIn: 'root'
        })
    ], DoctorsService);
    return DoctorsService;
}());
exports.DoctorsService = DoctorsService;

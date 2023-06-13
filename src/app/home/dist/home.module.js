"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.HomePageModule = void 0;
var core_1 = require("@angular/core");
var common_1 = require("@angular/common");
var angular_1 = require("@ionic/angular");
var forms_1 = require("@angular/forms");
var home_page_1 = require("./home.page");
var home_routing_module_1 = require("./home-routing.module");
var HomePageModule = /** @class */ (function () {
    function HomePageModule(auth, router) {
        this.auth = auth;
        this.router = router;
    }
    HomePageModule = __decorate([
        core_1.NgModule({
            imports: [
                common_1.CommonModule,
                forms_1.FormsModule,
                angular_1.IonicModule,
                home_routing_module_1.HomePageRoutingModule
            ],
            declarations: [home_page_1.HomePage]
        })
    ], HomePageModule);
    return HomePageModule;
}());
exports.HomePageModule = HomePageModule;

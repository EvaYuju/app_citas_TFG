"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.AppModule = void 0;
var core_1 = require("@angular/core");
var platform_browser_1 = require("@angular/platform-browser");
var router_1 = require("@angular/router");
var angular_1 = require("@ionic/angular");
var auth_guard_1 = require("@angular/fire/auth-guard");
var app_component_1 = require("./app.component");
var app_routing_module_1 = require("./app-routing.module");
var app_1 = require("@angular/fire/app");
var environment_1 = require("../environments/environment");
var auth_1 = require("@angular/fire/auth");
var firestore_1 = require("@angular/fire/firestore");
var pacientes_component_1 = require("./pacientes/pacientes.component"); // Importa el componente PacientesComponent aquí
var forms_1 = require("@angular/forms");
var AppModule = /** @class */ (function () {
    function AppModule() {
    }
    AppModule = __decorate([
        core_1.NgModule({
            declarations: [app_component_1.AppComponent, pacientes_component_1.PacientesComponent],
            entryComponents: [],
            imports: [
                platform_browser_1.BrowserModule,
                angular_1.IonicModule.forRoot(),
                app_routing_module_1.AppRoutingModule,
                app_1.provideFirebaseApp(function () { return app_1.initializeApp(environment_1.environment.firebase); }),
                auth_1.provideAuth(function () { return auth_1.getAuth(); }),
                firestore_1.provideFirestore(function () { return firestore_1.getFirestore(); }),
                auth_guard_1.AuthGuardModule,
                forms_1.FormsModule
            ],
            providers: [{ provide: router_1.RouteReuseStrategy, useClass: angular_1.IonicRouteStrategy }],
            bootstrap: [app_component_1.AppComponent]
        })
    ], AppModule);
    return AppModule;
}());
exports.AppModule = AppModule;

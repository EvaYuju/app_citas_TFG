"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.AppRoutingModule = void 0;
var core_1 = require("@angular/core");
var common_1 = require("@angular/common");
var router_1 = require("@angular/router");
var auth_guard_1 = require("@angular/fire/auth-guard"); //Para controlar los accesos a url sin iniciar sesión
var citas_component_1 = require("./citas/citas.component");
var pacientes_component_1 = require("./pacientes/pacientes.component");
var specialties_component_1 = require("./specialties/specialties.component");
var doctores_component_1 = require("./doctores/doctores.component");
var redirectUnauthorizedToLogin = function () { return auth_guard_1.redirectUnauthorizedTo(['login']); };
var routes = [
    {
        path: '',
        redirectTo: 'login',
        pathMatch: 'full'
    },
    {
        path: 'folder/:id',
        loadChildren: function () { return Promise.resolve().then(function () { return require('./folder/folder.module'); }).then(function (m) { return m.FolderPageModule; }); }
    },
    {
        path: 'home',
        loadChildren: function () { return Promise.resolve().then(function () { return require('./home/home.module'); }).then(function (m) { return m.HomePageModule; }); }
    },
    {
        path: 'home',
        canActivate: [auth_guard_1.AuthGuard],
        data: { authGuardPipe: redirectUnauthorizedToLogin },
        loadChildren: function () { return Promise.resolve().then(function () { return require('./home/home.module'); }).then(function (m) { return m.HomePageModule; }); }
    },
    {
        path: 'login',
        loadChildren: function () { return Promise.resolve().then(function () { return require('./login/login.module'); }).then(function (m) { return m.LoginPageModule; }); }
    },
    {
        path: 'register',
        loadChildren: function () { return Promise.resolve().then(function () { return require('./register/register.module'); }).then(function (m) { return m.RegisterPageModule; }); }
    },
    {
        path: 'citas', component: citas_component_1.CitasComponent
    },
    {
        path: 'pacientes',
        component: pacientes_component_1.PacientesComponent
    },
    {
        path: 'contacto',
        loadChildren: function () { return Promise.resolve().then(function () { return require('./contacto/contacto.module'); }).then(function (m) { return m.ContactoPageModule; }); }
    },
    {
        path: 'folder',
        loadChildren: function () { return Promise.resolve().then(function () { return require('./folder/folder.module'); }).then(function (m) { return m.FolderPageModule; }); }
    },
    {
        path: 'specialties',
        component: specialties_component_1.SpecialtiesComponent
    },
    {
        path: 'doctores',
        component: doctores_component_1.DoctoresComponent
    },
];
var AppRoutingModule = /** @class */ (function () {
    function AppRoutingModule() {
    }
    AppRoutingModule = __decorate([
        core_1.NgModule({
            declarations: [],
            imports: [
                common_1.CommonModule, router_1.RouterModule.forRoot(routes, { preloadingStrategy: router_1.PreloadAllModules })
            ],
            exports: [router_1.RouterModule]
        })
    ], AppRoutingModule);
    return AppRoutingModule;
}());
exports.AppRoutingModule = AppRoutingModule;

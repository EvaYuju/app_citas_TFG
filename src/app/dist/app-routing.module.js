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
var auth_guard_1 = require("@angular/fire/auth-guard");
var pacientes_component_1 = require("./pacientes/pacientes.component");
var citas_component_1 = require("./citas/citas.component");
var specialties_component_1 = require("./specialties/specialties.component");
var doctores_component_1 = require("./doctores/doctores.component");
var landing_page_component_1 = require("./landing-page/landing-page.component");
var mis_citas_component_1 = require("./mis-citas/mis-citas.component");
var redirectUnauthorizedToLogin = function () { return auth_guard_1.redirectUnauthorizedTo(['landing-page']); };
var redirectLoggedInToHome = function () { return auth_guard_1.redirectLoggedInTo(['home']); };
var routes = [
    {
        path: '',
        redirectTo: 'landing-page',
        pathMatch: 'full'
    },
    {
        path: 'mis-citas', component: mis_citas_component_1.MisCitasComponent
    },
    {
        path: 'folder/:id',
        loadChildren: function () { return Promise.resolve().then(function () { return require('./folder/folder.module'); }).then(function (m) { return m.FolderPageModule; }); }
    },
    {
        path: 'landing-page',
        component: landing_page_component_1.LandingPageComponent
    },
    {
        path: 'login',
        loadChildren: function () { return Promise.resolve().then(function () { return require('./login/login.module'); }).then(function (m) { return m.LoginPageModule; }); },
        canActivate: [auth_guard_1.AuthGuard],
        data: { authGuardPipe: redirectLoggedInToHome }
    },
    {
        path: 'register',
        loadChildren: function () { return Promise.resolve().then(function () { return require('./register/register.module'); }).then(function (m) { return m.RegisterPageModule; }); },
        canActivate: [auth_guard_1.AuthGuard],
        data: { authGuardPipe: redirectLoggedInToHome }
    },
    // Páginas que solo se pueden acceder si el usuario está autenticado
    {
        path: 'home',
        loadChildren: function () { return Promise.resolve().then(function () { return require('./home/home.module'); }).then(function (m) { return m.HomePageModule; }); },
        canActivate: [auth_guard_1.AuthGuard],
        data: { authGuardPipe: redirectUnauthorizedToLogin }
    },
    {
        path: 'citas',
        component: citas_component_1.CitasComponent,
        canActivate: [auth_guard_1.AuthGuard],
        data: [{ authGuardPipe: redirectUnauthorizedToLogin },
            { authGuardPipe: redirectUnauthorizedToLogin }]
    },
    {
        path: 'pacientes',
        component: pacientes_component_1.PacientesComponent,
        canActivate: [auth_guard_1.AuthGuard],
        data: { authGuardPipe: redirectUnauthorizedToLogin }
    },
    {
        path: 'contacto',
        loadChildren: function () { return Promise.resolve().then(function () { return require('./contacto/contacto.module'); }).then(function (m) { return m.ContactoPageModule; }); },
        canActivate: [auth_guard_1.AuthGuard],
        data: { authGuardPipe: redirectUnauthorizedToLogin }
    },
    {
        path: 'folder',
        loadChildren: function () { return Promise.resolve().then(function () { return require('./folder/folder.module'); }).then(function (m) { return m.FolderPageModule; }); },
        canActivate: [auth_guard_1.AuthGuard],
        data: { authGuardPipe: redirectUnauthorizedToLogin }
    },
    {
        path: 'specialties',
        component: specialties_component_1.SpecialtiesComponent,
        canActivate: [auth_guard_1.AuthGuard],
        data: { authGuardPipe: redirectUnauthorizedToLogin }
    },
    {
        path: 'doctores',
        component: doctores_component_1.DoctoresComponent,
        canActivate: [auth_guard_1.AuthGuard],
        data: { authGuardPipe: redirectUnauthorizedToLogin }
    },
];
var AppRoutingModule = /** @class */ (function () {
    function AppRoutingModule() {
    }
    AppRoutingModule = __decorate([
        core_1.NgModule({
            declarations: [],
            imports: [
                common_1.CommonModule,
                router_1.RouterModule.forRoot(routes, { preloadingStrategy: router_1.PreloadAllModules }),
                router_1.RouterModule.forRoot(routes, { onSameUrlNavigation: 'reload' })
            ],
            exports: [router_1.RouterModule]
        })
    ], AppRoutingModule);
    return AppRoutingModule;
}());
exports.AppRoutingModule = AppRoutingModule;

"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.HomePage = void 0;
var core_1 = require("@angular/core");
var HomePage = /** @class */ (function () {
    function HomePage(navCtrl, auth, router, menuController, pacientesService, authService, usuariosService) {
        this.navCtrl = navCtrl;
        this.auth = auth;
        this.router = router;
        this.menuController = menuController;
        this.pacientesService = pacientesService;
        this.authService = authService;
        this.usuariosService = usuariosService;
        this.isMenuOpen = false;
        this.usuarioRol = ''; // Agrega esta línea para almacenar el rol del usuario
        this.dniUsuarioActual = '';
        this.obtenerUsuarioRol();
    }
    HomePage.prototype.handleClick = function (event) {
        var targetElement = event.target;
        if (this.isMenuOpen && !targetElement.closest('ion-menu')) {
            this.menuController.close();
            this.isMenuOpen = false;
        }
    };
    HomePage.prototype.obtenerUsuarioRol = function () {
        var _this = this;
        this.authService.getUsuarioEmail().subscribe(function (correo) {
            if (correo) {
                _this.usuariosService.getUsuarioRol(correo).then(function (rol) {
                    _this.usuarioRol = rol || '';
                    // Obtener el paciente.DATO_QUE_QUERAMOS del paciente logueado 
                    if (_this.usuarioRol === 'PACIENTE') {
                        _this.pacientesService.getPacientePorCorreo(correo).then(function (paciente) {
                            if (paciente) {
                                _this.dniUsuarioActual = paciente.dni; // Almacena el DNI en una variable para usarlo en la vista HTML
                            }
                        });
                    }
                });
            }
        });
    };
    HomePage.prototype.toggleMenu = function () {
        if (this.isMenuOpen) {
            this.menuController.close();
        }
        else {
            this.menuController.open();
        }
        this.isMenuOpen = !this.isMenuOpen;
    };
    HomePage.prototype.closeMenu = function () {
        this.menuController.close();
    };
    HomePage.prototype.navigateToCitas = function () {
        this.navCtrl.navigateForward('citas');
    };
    HomePage.prototype.navigateToMisCitas = function () {
        this.navCtrl.navigateForward('mis-citas');
    };
    HomePage.prototype.navigateToContact = function () {
        this.navCtrl.navigateForward('contacto');
    };
    HomePage.prototype.navigateToPacientes = function () {
        this.navCtrl.navigateForward('pacientes');
    };
    HomePage.prototype.navigateToDoctores = function () {
        this.navCtrl.navigateForward('doctores');
    };
    HomePage.prototype.navigateToEspecialidades = function () {
        this.navCtrl.navigateForward('specialties');
    };
    HomePage.prototype.logout = function () {
        localStorage.removeItem('ROL');
        this.auth.logout();
        window.location.reload();
        this.router.navigate(['/landing-page']);
        //window.location.reload();
    };
    HomePage.prototype.navigateToLogOut = function () {
        this.logout();
    };
    __decorate([
        core_1.HostListener('document:click', ['$event'])
    ], HomePage.prototype, "handleClick");
    HomePage = __decorate([
        core_1.Component({
            selector: 'app-home',
            templateUrl: 'home.page.html',
            styleUrls: ['home.page.scss']
        })
    ], HomePage);
    return HomePage;
}());
exports.HomePage = HomePage;

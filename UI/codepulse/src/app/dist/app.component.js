"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.AppComponent = void 0;
var core_1 = require("@angular/core");
var router_1 = require("@angular/router");
var navbar_component_1 = require("./core/components/navbar/navbar.component");
var http_1 = require("@angular/common/http"); // Import HttpClientModule
var auth_service_1 = require("./features/auth/services/auth.service");
var AppComponent = /** @class */ (function () {
    function AppComponent() {
        this.title = 'codepulse';
    }
    AppComponent = __decorate([
        core_1.Component({
            selector: 'app-root',
            standalone: true,
            imports: [router_1.RouterOutlet, navbar_component_1.NavbarComponent, http_1.HttpClientModule],
            templateUrl: './app.component.html',
            styleUrl: './app.component.css',
            providers: [auth_service_1.AuthService]
        })
    ], AppComponent);
    return AppComponent;
}());
exports.AppComponent = AppComponent;

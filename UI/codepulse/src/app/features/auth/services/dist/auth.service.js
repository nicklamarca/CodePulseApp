"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.AuthService = void 0;
var core_1 = require("@angular/core");
var rxjs_1 = require("rxjs");
var environment_1 = require("../../../../environments/environment");
var AuthService = /** @class */ (function () {
    function AuthService(http) {
        this.http = http;
        this.$user = new rxjs_1.BehaviorSubject(undefined);
    }
    AuthService.prototype.login = function (request) {
        return this.http.post(environment_1.environment.apiBaseUrl + "/api/auth/login", {
            email: request.email,
            password: request.password
        });
    };
    AuthService.prototype.setUser = function (user) {
        //this.$user.next(user);
        localStorage.setItem('user-email', user.email);
        localStorage.setItem('user-roles', user.roles.join(','));
    };
    AuthService.prototype.user = function () {
        return this.$user.asObservable();
    };
    AuthService.prototype.test = function () {
        console.log("testing 123");
    };
    AuthService = __decorate([
        core_1.Injectable({
            providedIn: 'root' // Ensure this is provided in the root injector
        })
    ], AuthService);
    return AuthService;
}());
exports.AuthService = AuthService;

"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.LoginComponent = void 0;
var core_1 = require("@angular/core");
var forms_1 = require("@angular/forms");
var http_1 = require("@angular/common/http");
var LoginComponent = /** @class */ (function () {
    function LoginComponent(authService, cookieService, router) {
        this.authService = authService;
        this.cookieService = cookieService;
        this.router = router;
        this.model = {
            email: '',
            password: ''
        };
    }
    LoginComponent.prototype.ngOnDestroy = function () {
        var _a;
        (_a = this.loginSubscription) === null || _a === void 0 ? void 0 : _a.unsubscribe();
    };
    LoginComponent.prototype.onSubmit = function () {
        var _this = this;
        this.loginSubscription = this.authService.login(this.model).subscribe({
            next: function (response) {
                //set the cookie
                _this.cookieService.set('Authorization', "Bearer " + response.token, undefined, '/', undefined, true, 'Strict');
                //set user in localstorage
                _this.authService.setUser({
                    email: response.email,
                    roles: response.roles
                });
                //redirect back to home
                _this.router.navigateByUrl('/');
            },
            error: function (error) {
                console.log(error);
            }
        });
    };
    LoginComponent = __decorate([
        core_1.Component({
            selector: 'app-login',
            standalone: true,
            imports: [forms_1.FormsModule, http_1.HttpClientModule],
            templateUrl: './login.component.html',
            styleUrl: './login.component.css'
        })
    ], LoginComponent);
    return LoginComponent;
}());
exports.LoginComponent = LoginComponent;

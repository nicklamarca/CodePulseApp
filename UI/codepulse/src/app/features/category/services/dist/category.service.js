"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.CategoryService = void 0;
var core_1 = require("@angular/core");
var environment_1 = require("../../../../environments/environment");
var CategoryService = /** @class */ (function () {
    function CategoryService(http) {
        this.http = http;
    }
    CategoryService.prototype.addCategory = function (model) {
        return this.http.post(environment_1.environment.apiBaseUrl + "/api/categories", model);
    };
    CategoryService.prototype.getAllCategories = function () {
        return this.http.get(environment_1.environment.apiBaseUrl + "/api/categories");
    };
    CategoryService.prototype.getCategoryById = function (id) {
        return this.http.get(environment_1.environment.apiBaseUrl + "/api/categories/" + id);
    };
    CategoryService.prototype.updateCategory = function (id, updateCategoryRequest) {
        return this.http.put(environment_1.environment.apiBaseUrl + "/api/categories/" + id, updateCategoryRequest);
    };
    CategoryService = __decorate([
        core_1.Injectable({
            providedIn: 'root'
        })
    ], CategoryService);
    return CategoryService;
}());
exports.CategoryService = CategoryService;

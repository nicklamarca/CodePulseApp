"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.AddCategoryComponent = void 0;
var core_1 = require("@angular/core");
var forms_1 = require("@angular/forms");
var http_1 = require("@angular/common/http");
var AddCategoryComponent = /** @class */ (function () {
    function AddCategoryComponent(categoryService, router) {
        this.categoryService = categoryService;
        this.router = router;
        this.model = {
            name: '',
            urlHandle: ''
        };
    }
    AddCategoryComponent.prototype.ngOnDestroy = function () {
        var _a;
        (_a = this.addCategorySubscription) === null || _a === void 0 ? void 0 : _a.unsubscribe();
    };
    AddCategoryComponent.prototype.onFormSubmit = function () {
        var _this = this;
        this.addCategorySubscription = this.categoryService.addCategory(this.model)
            .subscribe({
            next: function (response) {
                _this.router.navigateByUrl('/admin/categories');
            },
            error: function (error) {
                console.log(error);
            }
        });
    };
    AddCategoryComponent = __decorate([
        core_1.Component({
            selector: 'app-add-category',
            standalone: true,
            imports: [forms_1.FormsModule, http_1.HttpClientModule],
            templateUrl: './add-category.component.html',
            styleUrl: './add-category.component.css'
        })
    ], AddCategoryComponent);
    return AddCategoryComponent;
}());
exports.AddCategoryComponent = AddCategoryComponent;

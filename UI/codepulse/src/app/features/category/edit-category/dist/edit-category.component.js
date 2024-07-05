"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.EditCategoryComponent = void 0;
var core_1 = require("@angular/core");
var common_1 = require("@angular/common");
var http_1 = require("@angular/common/http");
var forms_1 = require("@angular/forms");
var EditCategoryComponent = /** @class */ (function () {
    function EditCategoryComponent(route, categoryService, router) {
        this.route = route;
        this.categoryService = categoryService;
        this.router = router;
        this.id = null;
    }
    EditCategoryComponent.prototype.ngOnDestroy = function () {
        var _a, _b, _c;
        (_a = this.paramsSubscription) === null || _a === void 0 ? void 0 : _a.unsubscribe();
        (_b = this.updateCategorySubscription) === null || _b === void 0 ? void 0 : _b.unsubscribe();
        (_c = this.deleteCategorySubscription) === null || _c === void 0 ? void 0 : _c.unsubscribe();
    };
    EditCategoryComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.paramsSubscription = this.route.paramMap.subscribe({
            next: function (params) {
                _this.id = params.get('id');
                if (_this.id) {
                    _this.categoryService.getCategoryById(_this.id)
                        .subscribe({
                        next: function (response) {
                            _this.category = response;
                        }
                    });
                }
            }
        });
    };
    EditCategoryComponent.prototype.onFormSubmit = function () {
        var _this = this;
        var _a, _b, _c, _d;
        var updateCategoryRequest = {
            name: (_b = (_a = this.category) === null || _a === void 0 ? void 0 : _a.name) !== null && _b !== void 0 ? _b : '',
            urlHandle: (_d = (_c = this.category) === null || _c === void 0 ? void 0 : _c.urlHandle) !== null && _d !== void 0 ? _d : ''
        };
        if (this.id) {
            this.updateCategorySubscription = this.categoryService.updateCategory(this.id, updateCategoryRequest)
                .subscribe({
                next: function (response) {
                    _this.router.navigateByUrl('/admin/categories');
                }
            });
        }
    };
    EditCategoryComponent.prototype.onDelete = function () {
        var _this = this;
        if (this.id) {
            this.deleteCategorySubscription = this.categoryService.deleteCategory(this.id)
                .subscribe({
                next: function (response) {
                    _this.router.navigateByUrl('/admin/categories');
                }
            });
        }
    };
    EditCategoryComponent = __decorate([
        core_1.Component({
            selector: 'app-edit-category',
            standalone: true,
            imports: [common_1.CommonModule, http_1.HttpClientModule, forms_1.FormsModule],
            templateUrl: './edit-category.component.html',
            styleUrl: './edit-category.component.css'
        })
    ], EditCategoryComponent);
    return EditCategoryComponent;
}());
exports.EditCategoryComponent = EditCategoryComponent;

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
    function EditCategoryComponent(route, categoryService) {
        this.route = route;
        this.categoryService = categoryService;
        this.id = null;
    }
    EditCategoryComponent.prototype.ngOnDestroy = function () {
        var _a;
        (_a = this.paramsSubscription) === null || _a === void 0 ? void 0 : _a.unsubscribe();
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
        console.log(this.category);
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

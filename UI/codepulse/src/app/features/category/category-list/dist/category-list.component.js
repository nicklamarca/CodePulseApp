"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.CategoryListComponent = void 0;
var core_1 = require("@angular/core");
var router_1 = require("@angular/router");
var common_1 = require("@angular/common");
var http_1 = require("@angular/common/http");
var CategoryListComponent = /** @class */ (function () {
    function CategoryListComponent(categoryService) {
        this.categoryService = categoryService;
        this.list = [];
        this.pageNumber = 1;
        this.pageSize = 20;
    }
    CategoryListComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.categoryService.getCategoriesCount().subscribe({
            next: function (count) {
                _this.totalCount = count;
                _this.list = Array(Math.ceil(count / _this.pageSize));
                _this.categories$ = _this.categoryService.getAllCategories(undefined, undefined, undefined, _this.pageNumber, _this.pageSize);
            }
        });
    };
    CategoryListComponent.prototype.onSearch = function (query) {
        this.categories$ = this.categoryService.getAllCategories(query);
    };
    CategoryListComponent.prototype.sort = function (sortBy, sortDirection) {
        this.categories$ = this.categoryService.getAllCategories(undefined, sortBy, sortDirection);
    };
    CategoryListComponent.prototype.getPage = function (pageNumber) {
        this.pageNumber = pageNumber;
        this.categories$ = this.categoryService.getAllCategories(undefined, undefined, undefined, this.pageNumber, this.pageSize);
    };
    CategoryListComponent.prototype.getPrevPage = function () {
        if (this.pageNumber - 1 < 1) {
            return;
        }
        this.pageNumber -= 1;
        this.categories$ = this.categoryService.getAllCategories(undefined, undefined, undefined, this.pageNumber, this.pageSize);
    };
    CategoryListComponent.prototype.getNextPage = function () {
        if (this.pageNumber + 1 > this.list.length) {
            return;
        }
        this.pageNumber += 1;
        this.categories$ = this.categoryService.getAllCategories(undefined, undefined, undefined, this.pageNumber, this.pageSize);
    };
    CategoryListComponent = __decorate([
        core_1.Component({
            selector: 'app-category-list',
            standalone: true,
            imports: [router_1.RouterLink, common_1.CommonModule, http_1.HttpClientModule],
            templateUrl: './category-list.component.html',
            styleUrl: './category-list.component.css'
        })
    ], CategoryListComponent);
    return CategoryListComponent;
}());
exports.CategoryListComponent = CategoryListComponent;

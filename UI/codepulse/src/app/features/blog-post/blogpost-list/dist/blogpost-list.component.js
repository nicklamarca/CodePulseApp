"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.BlogpostListComponent = void 0;
var common_1 = require("@angular/common");
var http_1 = require("@angular/common/http");
var core_1 = require("@angular/core");
var router_1 = require("@angular/router");
var BlogpostListComponent = /** @class */ (function () {
    function BlogpostListComponent(blogPostService) {
        this.blogPostService = blogPostService;
    }
    BlogpostListComponent.prototype.ngOnInit = function () {
        this.blogPosts$ = this.blogPostService.getAllBlogPosts();
    };
    BlogpostListComponent = __decorate([
        core_1.Component({
            selector: 'app-blogpost-list',
            standalone: true,
            imports: [router_1.RouterLink, common_1.CommonModule, http_1.HttpClientModule],
            templateUrl: './blogpost-list.component.html',
            styleUrl: './blogpost-list.component.css'
        })
    ], BlogpostListComponent);
    return BlogpostListComponent;
}());
exports.BlogpostListComponent = BlogpostListComponent;

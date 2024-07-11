"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.BlogDetailsComponent = void 0;
var core_1 = require("@angular/core");
var forms_1 = require("@angular/forms");
var common_1 = require("@angular/common");
var ngx_markdown_1 = require("ngx-markdown");
var BlogDetailsComponent = /** @class */ (function () {
    function BlogDetailsComponent(route, blogPostService) {
        this.route = route;
        this.blogPostService = blogPostService;
        this.url = null;
    }
    BlogDetailsComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.route.paramMap.subscribe({
            next: function (params) {
                _this.url = params.get('urlHandle');
            }
        });
        //Fetch BlogDetails By UrlHandle
        if (this.url) {
            this.blogPost$ = this.blogPostService.getBlogPostByUrlHandle(this.url);
        }
    };
    BlogDetailsComponent = __decorate([
        core_1.Component({
            selector: 'app-blog-details',
            standalone: true,
            imports: [forms_1.FormsModule, common_1.CommonModule, ngx_markdown_1.MarkdownModule],
            templateUrl: './blog-details.component.html',
            styleUrl: './blog-details.component.css'
        })
    ], BlogDetailsComponent);
    return BlogDetailsComponent;
}());
exports.BlogDetailsComponent = BlogDetailsComponent;

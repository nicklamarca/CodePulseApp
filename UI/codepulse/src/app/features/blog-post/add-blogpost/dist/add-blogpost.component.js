"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.AddBlogpostComponent = void 0;
var core_1 = require("@angular/core");
var forms_1 = require("@angular/forms");
var common_1 = require("@angular/common");
var AddBlogpostComponent = /** @class */ (function () {
    function AddBlogpostComponent(blogPostService, router) {
        this.blogPostService = blogPostService;
        this.router = router;
        this.model = {
            title: '',
            urlHandle: '',
            shortDescription: '',
            content: '',
            featuredImageUrl: '',
            publishedDate: new Date(),
            author: '',
            isVisible: true
        };
    }
    AddBlogpostComponent.prototype.onFormSubmit = function () {
        var _this = this;
        this.blogPostService.createBlogPost(this.model).subscribe({
            next: function (response) {
                _this.router.navigateByUrl('/admin/blogposts');
            },
            error: function (error) {
                console.error(error);
            }
        });
    };
    AddBlogpostComponent = __decorate([
        core_1.Component({
            selector: 'app-add-blogpost',
            standalone: true,
            imports: [forms_1.FormsModule, common_1.CommonModule],
            templateUrl: './add-blogpost.component.html',
            styleUrl: './add-blogpost.component.css'
        })
    ], AddBlogpostComponent);
    return AddBlogpostComponent;
}());
exports.AddBlogpostComponent = AddBlogpostComponent;

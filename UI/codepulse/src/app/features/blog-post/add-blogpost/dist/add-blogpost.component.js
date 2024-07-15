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
var ngx_markdown_1 = require("ngx-markdown");
var image_selector_component_1 = require("../../../shared/components/image-selector/image-selector.component");
var http_1 = require("@angular/common/http");
var AddBlogpostComponent = /** @class */ (function () {
    function AddBlogpostComponent(blogPostService, router, categoryService, imageService) {
        this.blogPostService = blogPostService;
        this.router = router;
        this.categoryService = categoryService;
        this.imageService = imageService;
        this.imageSelectorVisible = false;
        this.model = {
            title: '',
            urlHandle: '',
            shortDescription: '',
            content: '',
            featuredImageUrl: '',
            publishedDate: new Date(),
            author: '',
            isVisible: true,
            categories: []
        };
    }
    AddBlogpostComponent.prototype.ngOnDestroy = function () {
        var _a;
        (_a = this.imageSelectorSubscription) === null || _a === void 0 ? void 0 : _a.unsubscribe();
    };
    AddBlogpostComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.categories$ = this.categoryService.getAllCategories();
        this.imageSelectorSubscription = this.imageService.onSelectImage()
            .subscribe({
            next: function (selectedImage) {
                if (_this.model) {
                    _this.model.featuredImageUrl = selectedImage.url;
                    _this.closeImageSelector();
                }
            }
        });
    };
    AddBlogpostComponent.prototype.onFormSubmit = function () {
        var _this = this;
        console.log(this.model);
        this.blogPostService.createBlogPost(this.model).subscribe({
            next: function (response) {
                _this.router.navigateByUrl('/admin/blogposts');
            },
            error: function (error) {
                console.error(error);
            }
        });
    };
    AddBlogpostComponent.prototype.openImageSelector = function () {
        this.imageSelectorVisible = true;
    };
    AddBlogpostComponent.prototype.closeImageSelector = function () {
        this.imageSelectorVisible = false;
    };
    AddBlogpostComponent = __decorate([
        core_1.Component({
            selector: 'app-add-blogpost',
            standalone: true,
            imports: [forms_1.FormsModule, common_1.CommonModule, ngx_markdown_1.MarkdownModule, image_selector_component_1.ImageSelectorComponent, http_1.HttpClientModule],
            templateUrl: './add-blogpost.component.html',
            styleUrl: './add-blogpost.component.css'
        })
    ], AddBlogpostComponent);
    return AddBlogpostComponent;
}());
exports.AddBlogpostComponent = AddBlogpostComponent;

"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.EditBlogpostComponent = void 0;
var core_1 = require("@angular/core");
var forms_1 = require("@angular/forms");
var common_1 = require("@angular/common");
var ngx_markdown_1 = require("ngx-markdown");
var image_selector_component_1 = require("../../../shared/components/image-selector/image-selector.component");
var http_1 = require("@angular/common/http");
var EditBlogpostComponent = /** @class */ (function () {
    function EditBlogpostComponent(route, blogPostService, categoryService, router, imageService) {
        this.route = route;
        this.blogPostService = blogPostService;
        this.categoryService = categoryService;
        this.router = router;
        this.imageService = imageService;
        this.id = null;
        this.imageSelectorVisible = false;
    }
    EditBlogpostComponent.prototype.ngOnDestroy = function () {
        var _a, _b, _c, _d, _e;
        (_a = this.routeSubscription) === null || _a === void 0 ? void 0 : _a.unsubscribe();
        (_b = this.updateBlogPostSubscription) === null || _b === void 0 ? void 0 : _b.unsubscribe();
        (_c = this.getBlogPostSubscription) === null || _c === void 0 ? void 0 : _c.unsubscribe();
        (_d = this.deleteBlogPostSubscription) === null || _d === void 0 ? void 0 : _d.unsubscribe();
        (_e = this.imageSelectorSubscription) === null || _e === void 0 ? void 0 : _e.unsubscribe();
    };
    EditBlogpostComponent.prototype.openImageSelector = function () {
        this.imageSelectorVisible = true;
    };
    EditBlogpostComponent.prototype.closeImageSelector = function () {
        this.imageSelectorVisible = false;
    };
    EditBlogpostComponent.prototype.onDelete = function () {
        var _this = this;
        if (this.id) {
            this.deleteBlogPostSubscription = this.blogPostService.deleteBlogPost(this.id).subscribe({
                next: function (response) {
                    _this.router.navigateByUrl('/admin/blogposts');
                },
                error: function (error) {
                    console.error(error);
                }
            });
        }
    };
    EditBlogpostComponent.prototype.onFormSubmit = function () {
        var _this = this;
        var _a;
        //Convert model to request obj
        if (this.model && this.id) {
            var updateBlogPost = {
                author: this.model.author,
                content: this.model.content,
                featuredImageUrl: this.model.featuredImageUrl,
                isVisible: this.model.isVisible,
                publishedDate: this.model.publishedDate,
                shortDescription: this.model.shortDescription,
                title: this.model.title,
                urlHandle: this.model.urlHandle,
                categories: (_a = this.selectedCategories) !== null && _a !== void 0 ? _a : []
            };
            this.updateBlogPostSubscription = this.blogPostService.updateBlogPost(this.id, updateBlogPost).subscribe({
                next: function (response) {
                    _this.router.navigateByUrl('/admin/blogposts');
                },
                error: function (error) {
                    console.error(error);
                }
            });
        }
    };
    EditBlogpostComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.categories$ = this.categoryService.getAllCategories();
        this.routeSubscription = this.route.paramMap.subscribe({
            next: function (params) {
                _this.id = params.get('id');
                //Get BlogPost from API
                if (_this.id) {
                    _this.getBlogPostSubscription = _this.blogPostService.getBlogPostById(_this.id).subscribe({
                        next: function (response) {
                            _this.model = response;
                            _this.selectedCategories = response.categories.map(function (c) { return c.id; });
                        },
                        error: function (error) {
                            console.error(error);
                        }
                    });
                }
                _this.imageSelectorSubscription = _this.imageService.onSelectImage()
                    .subscribe({
                    next: function (response) {
                        if (_this.model) {
                            _this.model.featuredImageUrl = response.url;
                            _this.imageSelectorVisible = false;
                        }
                    }
                });
            }
        });
    };
    EditBlogpostComponent = __decorate([
        core_1.Component({
            selector: 'app-edit-blogpost',
            standalone: true,
            templateUrl: './edit-blogpost.component.html',
            styleUrl: './edit-blogpost.component.css',
            imports: [forms_1.FormsModule, common_1.CommonModule, ngx_markdown_1.MarkdownModule, image_selector_component_1.ImageSelectorComponent, http_1.HttpClientModule]
        })
    ], EditBlogpostComponent);
    return EditBlogpostComponent;
}());
exports.EditBlogpostComponent = EditBlogpostComponent;

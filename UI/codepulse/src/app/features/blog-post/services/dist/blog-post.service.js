"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.BlogPostService = void 0;
var core_1 = require("@angular/core");
var environment_1 = require("../../../../environments/environment");
var BlogPostService = /** @class */ (function () {
    function BlogPostService(http) {
        this.http = http;
    }
    BlogPostService.prototype.createBlogPost = function (blogPost) {
        return this.http.post(environment_1.environment.apiBaseUrl + "/api/blogposts", blogPost);
    };
    BlogPostService.prototype.getAllBlogPosts = function () {
        return this.http.get(environment_1.environment.apiBaseUrl + "/api/blogposts");
    };
    BlogPostService.prototype.getBlogPostById = function (id) {
        return this.http.get(environment_1.environment.apiBaseUrl + "/api/blogposts/" + id);
    };
    BlogPostService.prototype.updateBlogPost = function (id, updatedBlogPost) {
        return this.http.put(environment_1.environment.apiBaseUrl + "/api/blogposts/" + id, updatedBlogPost);
    };
    BlogPostService.prototype.deleteBlogPost = function (id) {
        return this.http["delete"](environment_1.environment.apiBaseUrl + "/api/blogposts/" + id);
    };
    BlogPostService.prototype.getBlogPostByUrlHandle = function (urlHandle) {
        return this.http.get(environment_1.environment.apiBaseUrl + "/api/blogposts/" + urlHandle);
    };
    BlogPostService = __decorate([
        core_1.Injectable({
            providedIn: 'root'
        })
    ], BlogPostService);
    return BlogPostService;
}());
exports.BlogPostService = BlogPostService;

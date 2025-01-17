"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.ImageService = void 0;
var core_1 = require("@angular/core");
var rxjs_1 = require("rxjs");
var environment_1 = require("../../../../environments/environment");
var ImageService = /** @class */ (function () {
    function ImageService(http) {
        this.http = http;
        this.selectedImage = new rxjs_1.BehaviorSubject({
            id: '',
            url: '',
            title: '',
            fileName: '',
            fileExtension: ''
        });
    }
    ImageService.prototype.uploadImage = function (file, fileName, title) {
        var formData = new FormData();
        formData.append('file', file);
        formData.append('fileName', fileName);
        formData.append('title', title);
        return this.http.post(environment_1.environment.apiBaseUrl + "/api/images", formData);
    };
    ImageService.prototype.getAllImages = function () {
        return this.http.get(environment_1.environment.apiBaseUrl + "/api/images");
    };
    ImageService.prototype.selectImage = function (image) {
        this.selectedImage.next(image);
    };
    ImageService.prototype.onSelectImage = function () {
        return this.selectedImage.asObservable();
    };
    ImageService = __decorate([
        core_1.Injectable({
            providedIn: 'root'
        })
    ], ImageService);
    return ImageService;
}());
exports.ImageService = ImageService;

"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.ImageSelectorComponent = void 0;
var core_1 = require("@angular/core");
var forms_1 = require("@angular/forms");
var ImageSelectorComponent = /** @class */ (function () {
    function ImageSelectorComponent(imageService) {
        this.imageService = imageService;
        this.fileName = '';
        this.title = '';
    }
    ImageSelectorComponent.prototype.uploadImage = function () {
        if (this.file && this.fileName !== '' && this.title !== '') {
            //Image Service to upload the image
            this.imageService.uploadImage(this.file, this.fileName, this.title).subscribe({
                next: function (response) {
                    console.log(response);
                },
                error: function (error) {
                    console.log(error);
                }
            });
        }
    };
    ImageSelectorComponent.prototype.onFileUploadChange = function (event) {
        var _a;
        var element = event.target;
        this.file = (_a = element.files) === null || _a === void 0 ? void 0 : _a[0];
    };
    ImageSelectorComponent = __decorate([
        core_1.Component({
            selector: 'app-image-selector',
            standalone: true,
            imports: [forms_1.FormsModule],
            templateUrl: './image-selector.component.html',
            styleUrl: './image-selector.component.css'
        })
    ], ImageSelectorComponent);
    return ImageSelectorComponent;
}());
exports.ImageSelectorComponent = ImageSelectorComponent;

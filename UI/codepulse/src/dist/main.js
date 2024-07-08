"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
exports.__esModule = true;
var platform_browser_1 = require("@angular/platform-browser");
var app_config_1 = require("./app/app.config");
var app_component_1 = require("./app/app.component");
var router_1 = require("@angular/router");
var app_routes_1 = require("./app/app.routes");
var core_1 = require("@angular/core");
var http_1 = require("@angular/common/http");
var ngx_markdown_1 = require("ngx-markdown");
platform_browser_1.bootstrapApplication(app_component_1.AppComponent, __assign(__assign({}, app_config_1.appConfig), { providers: [
        core_1.importProvidersFrom(http_1.HttpClientModule),
        core_1.importProvidersFrom(ngx_markdown_1.MarkdownModule.forRoot()),
        router_1.provideRouter(app_routes_1.routes, router_1.withRouterConfig({})),
    ] }))["catch"](function (err) { return console.error(err); });

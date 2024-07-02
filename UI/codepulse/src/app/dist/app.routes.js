"use strict";
exports.__esModule = true;
exports.routes = void 0;
var category_list_component_1 = require("./features/category/category-list/category-list.component");
var add_category_component_1 = require("./features/category/add-category/add-category.component");
exports.routes = [
    {
        path: 'admin/categories',
        component: category_list_component_1.CategoryListComponent
    },
    {
        path: 'admin/categories/add',
        component: add_category_component_1.AddCategoryComponent
    }
];

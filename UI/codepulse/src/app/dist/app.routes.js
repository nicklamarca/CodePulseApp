"use strict";
exports.__esModule = true;
exports.routes = void 0;
var category_list_component_1 = require("./features/category/category-list/category-list.component");
var add_category_component_1 = require("./features/category/add-category/add-category.component");
var edit_category_component_1 = require("./features/category/edit-category/edit-category.component");
var blogpost_list_component_1 = require("./features/blog-post/blogpost-list/blogpost-list.component");
var add_blogpost_component_1 = require("./features/blog-post/add-blogpost/add-blogpost.component");
var edit_blogpost_component_1 = require("./features/blog-post/edit-blogpost/edit-blogpost.component");
var home_component_1 = require("./features/public/home/home.component");
var blog_details_component_1 = require("./features/public/blog-details/blog-details.component");
var login_component_1 = require("./features/auth/login/login.component");
exports.routes = [
    {
        path: '',
        component: home_component_1.HomeComponent
    },
    {
        path: 'login',
        component: login_component_1.LoginComponent
    },
    {
        path: 'blog/:urlHandle',
        component: blog_details_component_1.BlogDetailsComponent
    },
    {
        path: 'admin/categories',
        component: category_list_component_1.CategoryListComponent
    },
    {
        path: 'admin/categories/add',
        component: add_category_component_1.AddCategoryComponent
    },
    {
        path: 'admin/categories/:id',
        component: edit_category_component_1.EditCategoryComponent
    },
    {
        path: 'admin/blogposts',
        component: blogpost_list_component_1.BlogpostListComponent
    },
    {
        path: 'admin/blogposts/add',
        component: add_blogpost_component_1.AddBlogpostComponent
    },
    {
        path: 'admin/blogposts/:id',
        component: edit_blogpost_component_1.EditBlogpostComponent
    }
];

define('Blog.Categories.EntryPoint', [
    'Blog.CategoriesPost.Model',
    'Blog.CategoriesTags.Model',
    'Blog.CategoriesPost.ServiceController',
    'Blog.CategoriesTags.ServiceController'
], function BlogCategoriesEntryPoint(
    BlogCategoriesPostModel,
    BlogCategoriesTagsModel,
    BlogCategoriesPostServiceController,
    BlogCategoriesTagsServiceController
) {
    'use strict';

    return {
        BlogCategoriesPostModel: BlogCategoriesPostModel,
        BlogCategoriesTagsModel: BlogCategoriesTagsModel,
        BlogCategoriesPostServiceController: BlogCategoriesPostServiceController,
        BlogCategoriesTagsServiceController: BlogCategoriesTagsServiceController
    };
});

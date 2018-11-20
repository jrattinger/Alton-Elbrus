define('Blog.CategoriesTags.ServiceController', [
    'ServiceController',
    'Application',
    'Blog.CategoriesTags.Model'
], function BlogTagsModelServiceController(
    ServiceController,
    Application,
    BlogCategoriesTagsModel
) {
    'use strict';

    return ServiceController.extend({
        name: 'Blog.CategoriesTags.ServiceController',
        get: function get() {
            this.sendContent(
                (BlogCategoriesTagsModel.getBlogTagList()),
                { 'cache': response.CACHE_DURATION_MEDIUM }
            );
        }
    });
});

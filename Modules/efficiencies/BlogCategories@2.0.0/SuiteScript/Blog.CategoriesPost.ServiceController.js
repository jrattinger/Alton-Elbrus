define('Blog.CategoriesPost.ServiceController', [
    'ServiceController',
    'Application',
    'Blog.CategoriesPost.Model'
], function BlogTagsServiceController(
    ServiceController,
    Application,
    BlogCategoriesPostModel
) {
    'use strict';

    return ServiceController.extend({
        name: 'Blog.CategoriesPost.ServiceController',
        get: function get() {
            var tagId = this.request.getParameter('tagId');
            this.sendContent(
                (BlogCategoriesPostModel.listBlogPost(tagId)),
                { 'cache': response.CACHE_DURATION_MEDIUM }
            );
        }
    });
});

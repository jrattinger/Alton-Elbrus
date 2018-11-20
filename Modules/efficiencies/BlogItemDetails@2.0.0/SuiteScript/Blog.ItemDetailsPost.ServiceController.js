define('Blog.ItemDetailsPost.ServiceController', [
    'ServiceController',
    'Application',
    'Blog.ItemDetailsPost.Model'
], function BlogTagsServiceController(
    ServiceController,
    Application,
    BlogItemDetailsPostModel
) {
    'use strict';

    return ServiceController.extend({
        name: 'Blog.ItemDetailsPost.ServiceController',
        get: function get() {
            var tagId = this.request.getParameter('tagId');
            this.sendContent(
                (BlogItemDetailsPostModel.listBlogPost(tagId)),
                { 'cache': response.CACHE_DURATION_MEDIUM }
            );
        }
    });
});

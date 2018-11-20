define('Blog.ItemDetailsTags.ServiceController', [
    'ServiceController',
    'Application',
    'Blog.ItemDetailsTags.Model'
], function BlogTagsServiceController(
    ServiceController,
    Application,
    BlogItemDetailsTagsModel
) {
    'use strict';

    return ServiceController.extend({
        name: 'Blog.ItemDetailsTags.ServiceController',
        get: function get() {
            this.sendContent(
                (BlogItemDetailsTagsModel.getBlogTagList()),
                { 'cache': response.CACHE_DURATION_MEDIUM }
            );
        }
    });
});

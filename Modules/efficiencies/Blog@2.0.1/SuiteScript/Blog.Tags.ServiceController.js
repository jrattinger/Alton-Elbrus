define('Blog.Tags.ServiceController', [
    'ServiceController',
    'Application',
    'Blog.Tags.Model'
], function BlogTagsServiceController(
    ServiceController,
    Application,
    BlogTagsModel
) {
    'use strict';

    return ServiceController.extend({
        name: 'Blog.Tags.ServiceController',
        get: function get() {
            var url = this.request.getParameter('url');
            this.sendContent(
                url ? BlogTagsModel.getBlogTag(url) : (BlogTagsModel.getBlogTagList() || []),
                { 'cache': response.CACHE_DURATION_MEDIUM }
            );
        }
    });
});

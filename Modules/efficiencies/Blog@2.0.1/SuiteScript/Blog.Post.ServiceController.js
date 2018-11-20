define('Blog.Post.ServiceController', [
    'ServiceController',
    'Application',
    'Blog.Post.Model'
], function BlogPostServiceController(
    ServiceController,
    Application,
    BlogPostModel
) {
    'use strict';

    return ServiceController.extend({
        name: 'Blog.Post.ServiceController',
        get: function get() {
            var url = this.request.getParameter('url');
            var self = this;
            this.sendContent(
                url ? BlogPostModel.getBlogPost(url) : (
                    BlogPostModel.listBlogPost(
                        self.request.getParameter('tagId'),
                        self.request.getParameter('page'),
                        self.request.getParameter('month'),
                        self.request.getParameter('year'),
                        self.request.getParameter('day')
                    ) || []
                ),
                { 'cache': response.CACHE_DURATION_MEDIUM }
            );
        }
    });
});

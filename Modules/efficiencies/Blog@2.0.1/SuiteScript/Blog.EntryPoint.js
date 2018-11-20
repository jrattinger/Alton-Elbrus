define('Blog.EntryPoint', [
    'Blog.Post.Model',
    'Blog.Tags.Model',
    'Blog.Post.ServiceController',
    'Blog.Tags.ServiceController'
], function CheckoutFileUploadEntryPoint(
    BlogPostModel,
    BlogTagsModel,
    BlogPostServiceController,
    BlogTagsServiceController
) {
    'use strict';

    return {
        BlogPostModel: BlogPostModel,
        BlogTagsModel: BlogTagsModel,
        BlogPostServiceController: BlogPostServiceController,
        BlogTagsServiceController: BlogTagsServiceController
    };
});

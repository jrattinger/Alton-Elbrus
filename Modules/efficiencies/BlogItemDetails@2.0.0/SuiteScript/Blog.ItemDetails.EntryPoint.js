define('Blog.ItemDetails.EntryPoint', [
    'Blog.ItemDetailsPost.Model',
    'Blog.ItemDetailsTags.Model',
    'Blog.ItemDetailsPost.ServiceController',
    'Blog.ItemDetailsTags.ServiceController'
], function BlogItemDetailsEntryPoint(
    BlogItemDetailsPostModel,
    BlogItemDetailsTagsModel,
    BlogItemDetailsPostServiceController,
    BlogItemDetailsTagsServiceController
) {
    'use strict';

    return {
        BlogItemDetailsPostModel: BlogItemDetailsPostModel,
        BlogItemDetailsTagsModel: BlogItemDetailsTagsModel,
        BlogItemDetailsPostServiceController: BlogItemDetailsPostServiceController,
        BlogItemDetailsTagsServiceController: BlogItemDetailsTagsServiceController
    };
});

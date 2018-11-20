define('Blog.ItemDetailsPost.Model', [
    'Backbone',
    'Utils'
], function BlogPostModel(
    Backbone,
    _
) {
    'use strict';

    return Backbone.Model.extend({
        urlRoot: _.getAbsoluteUrl('services/Blog.ItemDetailsPost.Service.ss')
    });
});

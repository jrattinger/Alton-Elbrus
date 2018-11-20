define('Blog.CategoriesPost.Collection', [
    'Blog.Post.Model',
    'Backbone',
    'underscore'
], function BlogCollection(
    Model,
    Backbone,
    _
) {
    'use strict';

    return Backbone.Collection.extend({
        model: Model,
        url: _.getAbsoluteUrl('services/Blog.CategoriesPost.Service.ss')
    });
});

define('Blog.ItemDetailsPost.Collection', [
    'Blog.ItemDetailsPost.Model',
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
        url: _.getAbsoluteUrl('services/Blog.ItemDetailsPost.Service.ss')
    });
});

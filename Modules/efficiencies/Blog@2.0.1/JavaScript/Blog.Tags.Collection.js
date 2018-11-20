define('Blog.Tags.Collection', [
    'Backbone',
    'Blog.Tags.Model',
    'underscore'
], function BlogTagsCollection(
    Backbone,
    BlogTagModel,
    _
) {
    'use strict';

    return Backbone.Collection.extend({
        model: BlogTagModel,
        url: _.getAbsoluteUrl('services/Blog.Tags.Service.ss')
    });
});

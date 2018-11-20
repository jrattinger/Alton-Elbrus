define('Blog.ItemDetailsTags.Collection', [
    'Backbone',
    'Blog.ItemDetailsTags.Model',
    'underscore'
], function BlogTagsCollection(
    Backbone,
    BlogTagModel,
    _
) {
    'use strict';

    return Backbone.Collection.extend({
        model: BlogTagModel,
        url: _.getAbsoluteUrl('services/Blog.ItemDetailsTags.Service.ss')
    });
});

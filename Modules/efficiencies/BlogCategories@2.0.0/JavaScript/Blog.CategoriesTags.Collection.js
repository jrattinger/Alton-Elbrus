define('Blog.CategoriesTags.Collection', [
    'Backbone',
    'Blog.CategoriesTags.Model',
    'underscore'
], function BlogTagsCollection(
    Backbone,
    BlogTagModel,
    _
) {
    'use strict';

    return Backbone.Collection.extend({
        model: BlogTagModel,
        url: _.getAbsoluteUrl('services/Blog.CategoriesTags.Service.ss')
    });
});

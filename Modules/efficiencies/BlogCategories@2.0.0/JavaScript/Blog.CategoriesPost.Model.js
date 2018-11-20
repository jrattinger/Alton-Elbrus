define('Blog.CategoriesPost.Model', [
    'Backbone',
    'underscore'
], function BlogPostModel(
    Backbone,
    _
) {
    'use strict';

    return Backbone.Model.extend({
        urlRoot: _.getAbsoluteUrl('services/Blog.CategoriesPost.Service.ss')
    });
});

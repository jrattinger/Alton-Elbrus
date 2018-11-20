define('Blog.ItemDetailsTags.Model', [
    'Backbone',
    'Utils'
], function BlogItemModel(
    Backbone,
    _
) {
    'use strict';

    return Backbone.Model.extend({
        urlRoot: _.getAbsoluteUrl('services/Blog.ItemDetailsTags.Service.ss')
    });
});

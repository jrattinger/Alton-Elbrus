define('Blog.Post.View', [
    'blog_post_view.tpl',
    'Backbone'

], function BlogItemCell(
    BlogItemCellTpl,
    Backbone
) {
    'use strict';

    var baseUrl;

    return Backbone.View.extend({
        template: BlogItemCellTpl,
        initialize: function initialize() {
        },

        getContext: function getContext() {
            baseUrl = '/blog/' + this.model.get('url');
            return {
                url: baseUrl,
                internalid: this.model.get('id'),
                image: this.model.get('thumbnailImage'),
                title: this.model.get('title')
            };
        }
    });
});

define('Blog.Categories.Content.View', [
    'blog_categories_content.tpl',
    'Backbone',
    'Utils'
], function BlogItemDetailsContentView(
    BlogCategoriesContentTPL,
    Backbone
) {
    'use strict';

    return Backbone.View.extend({
        template: BlogCategoriesContentTPL,
        getContext: function getContext() {
            return {
                title: this.model.get('title'),
                thumbnailImage: this.model.get('thumbnailImage'),
                url: this.model.get('url'),
                id: this.model.get('id')
            };
        }
    });
});

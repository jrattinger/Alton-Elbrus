define('Blog.ItemDetails.Content.View', [
    'blog_item_details_content.tpl',
    'Backbone',
    'Utils'
], function BlogItemDetailsContentView(
    BlogItemDetailsContentTPL,
    Backbone
) {
    'use strict';

    return Backbone.View.extend({
        template: BlogItemDetailsContentTPL,
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

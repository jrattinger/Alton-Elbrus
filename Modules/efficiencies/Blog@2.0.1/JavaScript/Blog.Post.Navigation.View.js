define('Blog.Post.Navigation.View', [
    'blog_post_navigation_view.tpl',

    'Backbone'
], function BlogTagItems(
    BlolPostNavigationViewTpl,

    Backbone
) {
    'use strict';

    return Backbone.View.extend({

        template: BlolPostNavigationViewTpl,

        getContext: function getContext() {
            return {
                title: this.model.get('title'),
                id: this.model.get('id'),
                url: this.model.get('url')
            };
        }

    });
});

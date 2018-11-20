define('Blog.Tags.Navigation.View', [
    'Blog.Post.Collection',
    'blog_tag_navigation_view.tpl',

    'Backbone'
], function BlogTagPost(
    BlogPostCollection,
    BlogTagNavigationViewTpl,
    Backbone
) {
    'use strict';

    return Backbone.View.extend({

        template: BlogTagNavigationViewTpl,

        initialize: function initialize() {
            this.blog = new BlogPostCollection();
        },

        getContext: function getContext() {
            return {
                tags: this.model.get('name'),
                id: this.model.get('recordid'),
                url: this.model.get('url')
            };
        }
    });
});

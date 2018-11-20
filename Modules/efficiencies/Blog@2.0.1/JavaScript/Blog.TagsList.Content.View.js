define('Blog.TagsList.Content.View', [
    'blog_tagslist_content_view.tpl',

    'Backbone'
], function BlotTagsContent(
    BlogTagsContentView,
    Backbone
) {
    'use strict';

    return Backbone.View.extend({
        template: BlogTagsContentView,

        getContext: function getContext() {
            var baseUrl;
            baseUrl = '/blog/tag/' + this.model.get('url');

            return {
                url: baseUrl,
                name: this.model.get('name')
            };
        }
    });
});

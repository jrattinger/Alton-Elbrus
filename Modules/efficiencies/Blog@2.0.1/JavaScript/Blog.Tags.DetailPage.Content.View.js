define('Blog.Tags.DetailPage.Content.View', [
    'blog_tag_detailpage_content_view.tpl',

    'Backbone',
    'jQuery'
], function BlogItemsDetailPageContentView(
    BlogTagDetailPageContentViewTpl,

    Backbone,
    jQuery
) {
    'use strict';

    return Backbone.View.extend({
        template: BlogTagDetailPageContentViewTpl,

        getMetaTags: function getMetaTags() {
            return jQuery('<head/>').html(
                jQuery.trim(
                    this.model.get('metaTags')
                )
            ).children('meta');
        },

        getMetaDescription: function getMetaDescription() {
            return this.getMetaTags().filter('[name="description"]').attr('content') || '';
        },

        getMetaKeywords: function getMetaKeywords() {
            return this.getMetaTags().filter('[name="keywords"]').attr('content') || '';
        },

        getContext: function getContext() {
            return {
                name: this.model.get('name'),
                description: this.model.get('description')
            };
        }
    });
});

define('Blog.Post.DetailPage.Content.View', [
    'Backbone.CollectionView',
    'Backbone.CompositeView',
    'Blog.Tags.Collection',

    'blog_post_detailpage_content_view.tpl',

    'SC.Configuration',
    'Backbone',
    'jQuery',
    'underscore',
    'Utils'

], function BlogPostDetailPageContentView(
    BackboneCollectionView,
    BackboneCompositeView,
    BlogTagsCollection,

    BlogPostDetailPageContentViewTpl,

    Configuration,
    Backbone,
    jQuery,
    _

) {
    'use strict';

    var tagsCollection;

    return Backbone.View.extend({
        template: BlogPostDetailPageContentViewTpl,

        initialize: function initialize() {
            BackboneCompositeView.add(this);
            tagsCollection = new BlogTagsCollection();
        },

        fromObject: function toObject(arr) {
            var baseUrl;
            var filterData;

            tagsCollection.fetch().done(function fntagsCollection(data) {
                _.each(arr, function iterateObject(val) {
                    if (val) {
                        filterData = _.findWhere(data, { name: val });
                        baseUrl = '/blog/tag/' + filterData.url;
                        jQuery('#tagged_linked').append('<li><a href="' + baseUrl + '">' + val + '</a></li>');
                    }
                });
            });
        },

        getContext: function getContext() {
            return {
                splittags: this.fromObject(this.model.get('tags').split(',')),
                tags: this.model.get('tags'),
                content: this.model.get('html'),
                name: this.model.get('owner'),
                date: this.model.get('post_date'),
                title: this.model.get('title'),
                image: this.model.get('thumbnailImage'),
                detailimage: this.model.get('detailimage'),
                url: window.location.origin + '#' + Backbone.history.fragment,
                dateModified: this.model.get('last_modefied'),
                displayName: Configuration.get('siteSettings.displayname')
            };
        }
    });
});

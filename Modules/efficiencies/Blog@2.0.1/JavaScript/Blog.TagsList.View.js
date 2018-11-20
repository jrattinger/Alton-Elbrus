define('Blog.TagsList.View', [
    'Blog.NavigationChildView.View',
    'Blog.TagsList.Content.View',
    'Backbone.CollectionView',
    'Backbone.CompositeView',

    'Backbone',
    'blog_tagslist_view.tpl',
    'blog_taglist_content_rows.tpl',


    'underscore',
    'Utils',
    'jQuery.scPush'

], function BlogTagsView(
    BlogNavigationChildView,
    BlogTagsContentView,
    BackboneCollectionView,
    BackboneCompositeView,

    Backbone,
    BlogsTagsViewTpl,
    BlogsTagsViewTplRows,
    _
) {
    'use strict';

    return Backbone.View.extend({
        template: BlogsTagsViewTpl,

        initialize: function initialize(options) {
            BackboneCompositeView.add(this);

            this.blogNav = options.blogNav;
            this.collection = options.collection;
            this.application = options.application;
        },

        getBreadcrumbPages: function getBreadcrumbPages() {
            return [
                    { text: _.translate('Blog'), href: '/blog' },
                    { text: _.translate('Tag List'), href: '/blog/tag/list' }
            ];
        },

        getSelectedMenu: function getSelectedMenu() {
            return 'tagList';
        },

        initPlugins: function initPlugins() {
            this.$el.find('[data-action="pushable"]').scPush(
                { target: 'tablet' }
            );
        },

        showContent: function showContent(options) {
            var self = this;

            this.application.getLayout().showContent(this, options && options.dontScroll)
                .done(function fnshowContent() {
                    self.initPlugins();
                });
        },

        childViews: {
            'Blog.ChildViews': function FnBlogNavigationView() {
                return new BlogNavigationChildView({
                    application: this.application,
                    tagsCollection: this.collection,
                    blogNav: this.blogNav
                });
            },

            'Blog.Tags.Content': function FnBlogTagContentView() {
                return new BackboneCollectionView({
                    collection: this.collection,
                    childView: BlogTagsContentView,
                    viewsPerRow: 4,
                    rowTemplate: BlogsTagsViewTplRows
                });
            }
        }
    });
});

define('Blog.Main.View', [
    'Blog.NavigationChildView.View',
    'Blog.Post.View',

    'Backbone.CollectionView',
    'Backbone.CompositeView',

    'SC.Configuration',
    'Blog.Pagination.View',

    'blog_main_view.tpl',
    'blog_post_item_rows.tpl',

    'Backbone',
    'jQuery',
    'underscore',
    'Utils',
    'jQuery.scPush'

], function BlogView(
    BlogNavigationChildView,
    BlogPostView,

    BackboneCollectionView,
    BackboneCompositeView,

    Configuration,
    PaginationView,

    blogviewTPL,
    blogPostRowTPL,
    Backbone,
    jQuery,
    _


) {
    'use strict';

    return Backbone.View.extend({

        title: _.translate('Blog'),

        template: blogviewTPL,

        initialize: function initialize(options) {
            BackboneCompositeView.add(this);
            this.application = options.application;
            this.tagsCollection = options.tagsCollection;
            this.collection = options.collection;
            this.blogNav = options.blogNav;
        },

        getBreadcrumbPages: function getBreadcrumbPages() {
            return [
                { text: _.translate('Blog'), href: '/blog' }
            ];
        },

        getSelectedMenu: function getSelectedMenu() {
            return 'blogHome';
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

            'Blog.ChildViews': function BlogchildViews() {
                return new BlogNavigationChildView({
                    application: this.application,
                    tagsCollection: this.tagsCollection,
                    blogNav: this.blogNav
                });
            },

            'Blog.Post': function FnBlogItems() {
                return new BackboneCollectionView({
                    collection: this.collection,
                    childView: BlogPostView,
                    viewsPerRow: 4,
                    rowTemplate: blogPostRowTPL,
                    childViewOptions: {
                        application: this.application,
                        isNew: true
                    }
                });
            },

            'GlobalViews.Pagination': function GlobalViewsPagination() {
                return new PaginationView(_.extend({
                    currentPage: this.collection.page || 0,
                    totalPages: this.collection.totalPages || 0,
                    pager: function pager(page) {
                        return '/' + (page > 1 ?
                                _.setUrlParameter(Backbone.history.fragment, 'page', page) :
                                _.removeUrlParameter(Backbone.history.fragment, 'page'));
                    },
                    extraClass: 'pull-right no-margin-top no-margin-bottom'
                }, Configuration.get('defaultPaginationSettings')));
            }

        }
    });
});

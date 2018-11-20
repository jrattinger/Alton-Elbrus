define('Blog.Tags.DetailPage.View', [
    'Blog.Tags.DetailPage.Content.View',
    'Blog.Post.View',
    'Blog.NavigationChildView.View',

    'Backbone.CollectionView',
    'Backbone.CompositeView',

    'SC.Configuration',
    'Blog.Pagination.View',

    'blog_tags_detailpage_view.tpl',

    'Backbone',
    'underscore',
    'jQuery.scPush'

], function BlogTagsDetailPageView(
    BlogTagContentView,
    BlogPostView,
    BlogNavigationChildView,

    BackboneCollectionView,
    BackboneCompositeView,

    Configuration,
    PaginationView,

    BlogTagsDetailPageViewTPL,

    Backbone,
    _
) {
    'use strict';

    return Backbone.View.extend({

        title: '',

        template: BlogTagsDetailPageViewTPL,

        initialize: function initialize(options) {
            BackboneCompositeView.add(this);
            this.post = options.items;
            this.blogNav = options.blogNav;
            this.tagNav = options.tagNav;
            this.application = options.application;
        },

        getBreadcrumbPages: function getBreadcrumbPages() {
            this.title = this.model.models[0].get('name');

            return [
                { text: _.translate('Blog'), href: '/blog' },
                { text: this.model.models[0].get('name'),
                    href: '/blog/' + this.model.models[0].get('name')
                }
            ];
        },

        getSelectedMenu: function getSelectedMenu() {
            return 'tagDetails';
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
            'Tags.Detail': function FnBlogNavigationView() {
                return new BackboneCollectionView({
                    collection: this.model,
                    childView: BlogTagContentView,
                    viewsPerRow: 1
                });
            },
            'Blog.Related': function fnBlogRelatedView() {
                return new BackboneCollectionView({
                    collection: this.post,
                    childView: BlogPostView,
                    viewsPerRow: 1
                });
            },

            'Blog.ChildViews': function FnBlogNavigationView() {
                return new BlogNavigationChildView({
                    application: this.application,
                    tagsCollection: this.tagNav,
                    collection: this.items,
                    blogNav: this.blogNav
                });
            },

            'GlobalViews.Pagination': function GlobalViewsPagination() {
                return new PaginationView(_.extend({
                    currentPage: this.post.page || 0,
                    totalPages: this.post.totalPages || 0,
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

define('Blog.Post.DetailPage.View', [
    'Blog.NavigationChildView.View',
    'Blog.Post.DetailPage.Content.View',

    'Backbone.CollectionView',
    'Backbone.CompositeView',
    'SocialSharing.Flyout.View',

    'blog_post_detailpage_view.tpl',

    'SC.Configuration',
    'Backbone',
    'underscore',
    'jQuery',
    'Utils',
    'jQuery.scPush'

], function BlogPostDetailPageView(
    BlogNavigationChildView,
    BlogPostDetailPageContentView,

    BackboneCollectionView,
    BackboneCompositeView,
    SocialSharingFlyoutView,

    BlogPostDetailPageViewTpl,
    Configuration,
    Backbone,
    _,
    jQuery

) {
    'use strict';

    return Backbone.View.extend({

        title: '',

        template: BlogPostDetailPageViewTpl,

        initialize: function initialize(options) {
            BackboneCompositeView.add(this);

            this.application = options.application;
            this.collection = options.collection;
            this.blogNav = options.blogNav;
            this.model = options.model;
        },

        getBreadcrumbPages: function getBreadcrumbPages() {
            this.title = this.model.models[0].get('title');

            return [
                { text: _.translate('Blog'), href: '/blog' },
                { text: this.model.models[0].get('title'),
                    href: '/blog/' + this.model.models[0].get('title')
                }
            ];
        },


        setMetaTagsByConfiguration: function setMetaTagsByConfiguration(self, metaTagConfiguration) {
            _.each(metaTagConfiguration, function eachMetaTagConfiguration(fn, name) {
                var content = fn(self);

                jQuery('<meta />', {
                    name: name,
                    content: content || ''
                }).appendTo(jQuery('head'));
            });
        },

        setMetaTags: function setMetaTags() {
            var self = this;

            var metaTagMappingOg = Configuration.metaTagMappingOg;
            var metaTagMappingTwitterProductCard = Configuration.metaTagMappingTwitterProductCard;

            this.setMetaTagsByConfiguration(self, metaTagMappingOg);
            this.setMetaTagsByConfiguration(self, metaTagMappingTwitterProductCard);
            this.setMetaTagsDescription(); // bug fix
        },

        // created function for bug fix on meta tags
        setMetaTagsDescription: function setMetaTagsDescription() {
            jQuery('<meta />', {
                name: 'description',
                content: this.model.models[0].get('metaTags')
            }).appendTo(jQuery('head'));
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
            'Blog.ChildViews': function FnBlogNavigationView() {
                return new BlogNavigationChildView({
                    application: this.application,
                    tagsCollection: this.collection,
                    blogNav: this.blogNav
                });
            },

            'SocialSharing.Flyout': function SocialSharingFlyout() {
                return new SocialSharingFlyoutView();
            },

            'Blog.Detail': function FnBlogItemsDetailPageContentView() {
                var layout;
                var self = this;

                layout = this.application.getLayout();

                layout.on('afterAppendView', function onAfterAppendView() {
                    self.setMetaTags();
                });

                return new BackboneCollectionView({
                    collection: this.model,
                    childView: BlogPostDetailPageContentView,
                    viewsPerRow: 1
                });
            }
        }
    });
});

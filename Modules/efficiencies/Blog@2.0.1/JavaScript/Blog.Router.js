define('Blog.Router', [
    'Blog.Main.View',
    'Blog.Post.DetailPage.View',
    'Blog.Tags.DetailPage.View',
    'Blog.TagsList.View',

    'Blog.Post.Collection',
    'Blog.Tags.Collection',
    'Blog.Post.Model',
    'Blog.Tags.Model',

    'Backbone',
    'Blog.Utils',
    'jQuery',
    'underscore',
    'ErrorManagement.PageNotFound.View',
    'Utils'

], function BlogRouter(
    BlogMainView,
    BlogPostDetailPageViewTpl,
    BlogTagsDetailPageView,
    BlogTagsListView,

    BlogPostCollection,
    BlogTagsCollection,
    BlogPostModel,
    BlogTagsModel,

    Backbone,
    BlogUtils,
    jQuery,
    _,
    ErrorManagementPageNotFoundView

) {
    'use strict';

    return Backbone.Router.extend({

        routes: {
            'blog': 'blogHome',
            'blog/archive/:month/:day/:year': 'archive',

            'blog/:url': 'blogDetails',

            'blog/tag/list': 'tagListView',
            'blog/tag/:url*': 'tagCustomDetails'

        },

        initialize: function initialize(application) {
            this.application = application;
            this.blogpostCollection = new BlogPostCollection();
            this.tagsCollection = new BlogTagsCollection();

            // navigation
            this.blogNav = new BlogPostCollection();
            this.tagNav = new BlogTagsCollection();
        },

        blogHome: function blogHome(id) {
            var blogHomeView;
            var blogItems;
            var tagNav;
            var blogNav;

            blogHomeView = new BlogMainView({
                collection: this.blogpostCollection,
                application: this.application,
                tagsCollection: this.tagsCollection,
                blogNav: this.blogNav
            });

            // blog content
            if (!id) {
                blogItems = this.blogpostCollection.fetch();
            } else {
                blogItems = this.blogpostCollection.fetch({
                    data: {
                        page: _.parseUrlOptions(Backbone.history.fragment).page,
                        tagId: id
                    }
                });
            }

            // navigations
            tagNav = this.tagsCollection.fetch();
            blogNav = this.blogNav.fetch();

            // render
            jQuery.when(blogItems, tagNav, blogNav).then(function loadCollections() {
                blogHomeView.showContent();
            });
        },

        archive: function archive(month, day, year) {
            var blogHomeView;
            var tagNav;
            var blogNav;

            blogHomeView = new BlogMainView({
                collection: this.blogpostCollection,
                application: this.application,
                tagsCollection: this.tagsCollection,
                blogNav: this.blogNav
            });

            // navigations
            tagNav = this.tagsCollection.fetch();
            blogNav = this.blogNav.fetch();

            this.blogpostCollection
                .fetch({
                    data: {
                        page: _.parseUrlOptions(Backbone.history.fragment).page,
                        month: month,
                        day: day,
                        year: year
                    }
                }).done(function doneBlogCollection(data) {
                    blogHomeView.showContent({
                        data: data,
                        tagNav: tagNav,
                        blogNav: blogNav
                    });
                });
        },

        blogDetails: function blogDetails(url) {
            var blogItem;
            var tagNav;
            var blogNav;
            var postDetailPage;
            var self;

            self = this;

            postDetailPage = new BlogPostDetailPageViewTpl({
                application: this.application,
                model: this.blogpostCollection,
                collection: this.tagsCollection,
                blogNav: this.blogNav
            });

            // content blog detail page
            blogItem = this.blogpostCollection.fetch({
                data: {
                    url: url
                }
            }).done(function doneBlogCollection(data) {
                /* eslint-disable */
                if (data._lastResult.length === 0) {
                    postDetailPage = new ErrorManagementPageNotFoundView({
                        application: self.application
                    });
                }
                /* eslint-enable */
            });

            // navigations
            tagNav = this.tagsCollection.fetch();
            blogNav = this.blogNav.fetch();

            // render
            jQuery.when(blogItem, tagNav, blogNav).then(function loadCollections() {
                postDetailPage.showContent();
            });
        },

        tagListView: function tagListView() {
            var tagListAll;
            var tagItems;
            var blogNav;


            // content for view all tags
            tagListAll = new BlogTagsListView({
                application: this.application,
                collection: this.tagsCollection,
                blogNav: this.blogNav
            });

            // navigation
            blogNav = this.blogNav.fetch();
            tagItems = this.tagsCollection.fetch();
            // render

            jQuery.when(blogNav, tagItems).then(function loadCollections() {
                tagListAll.showContent();
            });
        },

        tagCustomDetails: function tagDetails(url) {
            var tagDetailPage;
            var tagNav;
            var blogPost;
            var blogNav;
            var self;

            self = this;

            // content for tag detail page
            if (url) {
                tagDetailPage = new BlogTagsDetailPageView({
                    application: this.application,
                    collection: this.tagsCollection,
                    items: this.blogpostCollection,
                    blogNav: this.blogNav,
                    model: this.tagsCollection,
                    tagNav: this.tagNav
                });

                // navigations
                tagNav = this.tagNav.fetch();
                blogNav = this.blogNav.fetch();

                this.tagsCollection.fetch({
                    data: {
                        url: url
                    }
                }).done(function doneTagsCollection(data) {
                    blogPost = self.blogpostCollection.fetch({
                        data: {
                            tagId: data[0].internalid,
                            page: _.parseUrlOptions(Backbone.history.fragment).page
                        }
                    }).done(function doneBlogPostCollection() {
                        tagDetailPage.showContent({
                            tagNav: tagNav,
                            blogPost: blogPost,
                            blogNav: blogNav
                        });
                    });
                });
            }
        }
    });
});

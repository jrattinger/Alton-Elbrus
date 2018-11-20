define('Blog.NavigationChildView.View', [
    'Blog.Tags.Navigation.View',
    'Blog.Post.Navigation.View',
    'Blog.Archive.Navigation.View',

    'blog_navigation_childview.tpl',

    'Backbone.CollectionView',
    'Backbone.CompositeView',

    'Backbone',
    'Blog.Utils',
    'underscore',
    'jQuery',
    'SC.Configuration',
    'jquery.dateFormat',
    'Utils'
], function BlogNavigationChildView(
    BlogTagNavigationView,
    BlogPostNavigationView,
    BlogArchiveNavigationView,

    Template,

    BackboneCollectionView,
    BackboneCompositeView,

    Backbone,
    BlogUtils,
    _,
    jQuery,
    Configuration
) {
    'use strict';

    return Backbone.View.extend({
        template: Template,

        initialize: function initialize(options) {
            BackboneCompositeView.add(this);

            this.application = options.application;
            this.tagsCollection = options.tagsCollection;
            this.blogNav = options.blogNav;
        },

        childViews: {
            'Blog.Tags.Navigation': function FnBlogNavigationView() {
                return new BackboneCollectionView({
                    collection: this.tagsCollection.slice(0, 5),
                    childView: BlogTagNavigationView,
                    viewsPerRow: 1
                });
            },
            'Blog.Post.Navigation': function FnBlogNavigationView() {
                return new BackboneCollectionView({
                    collection: this.blogNav.slice(0, 5),
                    childView: BlogPostNavigationView,
                    viewsPerRow: 1
                });
            },
            'Blog.Archive.Navigation': function FnBlogNavigationView() {
                var monthArray;
                var i;
                var postDates;
                i = 0;
                monthArray = {};
                postDates = _.pluck(this.blogNav.toJSON(), 'post_date');
                _.map(postDates, function mapPostDates(postDate) {
                    var mydate = new Date(postDate);
                    var newDate = jQuery.format.date(mydate, 'Test: ' + Configuration.get('blog.dateformat'));
                    if (postDate) {
                        monthArray[i] = { month: BlogUtils.convertDate(newDate.split(':')[1]), post_date: newDate.split(':')[1] };
                        i++;
                    }
                });

                return new BackboneCollectionView({
                    collection: monthArray,
                    childView: BlogArchiveNavigationView,
                    viewsPerRow: 1
                });
            }
        },
        getContext: function getContext() {
            return {
                hideArchive: Configuration.get('blog.showarchive')
            };
        }
    });
});

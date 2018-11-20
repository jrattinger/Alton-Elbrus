define('BlogCategories', [
    'Facets.Browse.View',
    'Blog.Categories.View',

    'Blog.CategoriesPost.Collection',
    'Blog.CategoriesTags.Collection',
    'underscore'
], function BlogCategoriesRelatedView(
    FacetBrowseView,
    BlogCategoriesView,

    BlogPostCollection,
    BlogTagsCollection,
    _
) {
    'use strict';

    var self;
    var tagscollection;
    var filterTags;

    _.extend(FacetBrowseView.prototype.childViews, {
        'Blog.Post': function BlogItems() {
            tagscollection.fetch().done(function resultsDone(data) {
                filterTags = _.findWhere(data, { name: (self.model.get('category')) ? self.model.get('category').get('name') : '' });

                if (filterTags) {
                    self.items.fetch({
                        data: {
                            tagId: filterTags.recordid
                        }
                    });
                }
            });

            return new BlogCategoriesView({
                collection: this.items,
                application: this.application
            });
        }
    });

    FacetBrowseView.prototype.initialize =
    _.wrap(FacetBrowseView.prototype.initialize, function wrapProductFormInitialize(fn) {
        self = this;
        this.items = new BlogPostCollection();
        tagscollection = new BlogTagsCollection();
        fn.apply(this, _.toArray(arguments).slice(1));

        this.on('beforeCompositeViewRender', function afterViewRender() {
            this.$el
                .find('.facets-facet-browse-results')
                .append('<div data-view="Blog.Post"></div>');
        });
    });
});

define('Blog.Categories.View', [
    'Blog.Categories.Content.View',

    'Backbone.CompositeView',
    'Backbone.CollectionView',

    'blog_categories_view.tpl',
    'blog_item_row.tpl',

    'Backbone',
    'Utils'

], function BlogCategoriesDetailsView(
    BlogCategoriesContentView,

    BackboneCompositeView,
    BackboneCollectionView,

    BlogItemCellTpl,
    BlogItemRowTpl,

    Backbone

) {
    'use strict';

    return Backbone.View.extend({
        template: BlogItemCellTpl,
        initialize: function initialize(options) {
            BackboneCompositeView.add(this);
            this.application = options.application;
            this.collection = options.collection;

            this.listenTo(this.collection, 'sync', this.render);
        },

        render: function render() {
            this._render();
        },

        getContext: function getContext() {
            return {
                hasBlogCategories: this.collection.length !== 0
            };
        },

        childViews: {
            'Blog.Items.Views': function BlogItems() {
                if (this.collection.length !== 0) {
                    return new BackboneCollectionView({
                        application: this.application,
                        collection: this.collection,
                        childView: BlogCategoriesContentView,
                        rowTemplate: BlogItemRowTpl,
                        viewsPerRow: 4
                    });
                }
            }
        }

    });
});

define('Blog.ItemDetails.View', [
    'Blog.ItemDetails.Content.View',

    'Backbone.CompositeView',
    'Backbone.CollectionView',

    'blog_item_details_view.tpl',
    'blog_item_row.tpl',

    'Backbone',
    'jQuery',
    'underscore',
    'Utils'

], function BlogItemDetailsView(
    BlogItemDetailsContentView,

    BackboneCompositeView,
    BackboneCollectionView,

    BlogItemCellTpl,
    BlogItemRow,

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
                hasBlogItemDetails: this.collection.length !== 0
            };
        },

        childViews: {
            'Blog.Items.Views': function BlogItems() {
                if (this.collection.length !== 0) {
                    return new BackboneCollectionView({
                        application: this.application,
                        collection: this.collection,
                        childView: BlogItemDetailsContentView,
                        rowTemplate: BlogItemRow,
                        viewsPerRow: 4
                    });
                }
            }
        }
    });
});

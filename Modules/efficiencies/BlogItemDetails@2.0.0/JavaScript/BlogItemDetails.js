define('BlogItemDetails', [
    'ProductDetails.Full.View',
    'Blog.ItemDetails.View',

    'Blog.ItemDetailsPost.Collection',
    'Blog.ItemDetailsTags.Collection',

    'blog_item_row.tpl',

    'Backbone',
    'underscore',
    'PluginContainer',
    'Utils'

], function BlogItemRelatedView(
    ProductDetailsFullView,
    BlogItemDetailsView,

    BlogItemDetailsCollection,
    BlogTagsCollection,

    rowTPL,
    Backbone,
    _,
    PluginContainer
) {
    'use strict';

    var tagscollection = '';
    var filterTags;
    var splitTags;
    var splitTags2;
    var itemDetailsCollection;

    return {
        mountToApp: function mountToApp(application) {
            var pdp = application.getComponent('PDP');

            ProductDetailsFullView.prototype.preRenderPlugins = ProductDetailsFullView.prototype.preRenderPlugins || new PluginContainer();
            ProductDetailsFullView.prototype.preRenderPlugins.install({
                name: 'BlogItemDetailsPreRenderPlugins',
                priority: 10,
                execute: function execute($el) {
                    $el
                        .find('[data-view="ProductReviews.Center"]')
                        .after('<div data-view="Blog.Post" />');
                }
            });

            pdp.on('afterShowContent', function afterShowContent() {
                if (typeof tagscollection.fetch !== 'undefined') {
                    tagscollection.fetch().done(function results(data) {
                        splitTags = pdp.getItemInfo().item.custitem_ef_blog_tags.split(', ');
                        splitTags2 = [];
                        _.each(splitTags, function splitTedtags(val) {
                            filterTags = _.findWhere(data, { name: val });
                            /* eslint-disable */
                            (filterTags) ? splitTags2.push(filterTags.recordid) : '';
                            /* eslint-enable */
                        });
    
                        if (filterTags) {
                            itemDetailsCollection.fetch({
                                data: {
                                    tagId: splitTags2.join(',')
                                }
                            });
                        }
                    });
                }
            });

            pdp.on('beforeShowContent', function beforeShowContent() {
                itemDetailsCollection = new BlogItemDetailsCollection();
                tagscollection = new BlogTagsCollection();
            });

            pdp.addChildViews('ProductDetails.Full.View', {
                'Blog.Post': {
                    'new_price_view': {
                        childViewIndex: 1,
                        childViewConstructor: function childViewConstructor() {
                            return new BlogItemDetailsView({
                                collection: itemDetailsCollection,
                                application: application
                            });
                        }
                    }
                }
            });
        }
    };
});

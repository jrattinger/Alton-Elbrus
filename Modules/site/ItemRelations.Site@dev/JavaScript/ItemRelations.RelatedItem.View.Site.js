define('ItemRelations.RelatedItem.View.Site', [
    'ItemRelations.RelatedItem.View',
    'Product.Model',
    'LiveOrder.Model',
    'LiveOrder.Line.Model',
    'Backbone',
    'Tracker',
    'underscore',
    'jQuery',
    'Utils'
], function ItemRelationsRelatedItemViewSite(
    ItemRelationsRelatedItemView,
    ProductModel,
    LiveOrderModel,
    LiveOrderLineModel,
    Backbone,
    Tracker,
    _,
    jQuery,
    Utils
) {
    _.extend(ItemRelationsRelatedItemView.prototype, {
        initialize: _.wrap(ItemRelationsRelatedItemView.prototype.initialize, function(fn) {
            fn.apply(this, _.toArray(arguments).slice(1));
            this.cart = LiveOrderModel.getInstance();
        }),

        events: {
            'click [data-action="add-related-to-cart"]': 'addItemToCart'
        },

        addItemToCart: function addItemToCart(e) {
			e.stopPropagation();
			e.preventDefault();

			var self = this;
            var itemId = self.$(e.target).closest('div[itemprop="itemListElement"]').data('item-id');
            
            var product = new ProductModel({
                item: this.model,
                quantity: this.model.get('_minimumQuantity', true)
            });

            //var line = LiveOrderLineModel.createFromProduct(this.model);
            var cartPromise = this.cart.addProduct(product);
            
			if (cartPromise) {
				this.disableElementsOnPromise(cartPromise, e.target);
			}
        }
    });
});
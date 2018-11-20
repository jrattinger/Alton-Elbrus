define('Cart.Lines.View.Site', [
    'Backbone',
    'Cart.Lines.View',
    'ProductDetails.AddToProductList.View',
    'Product.Model',
    'underscore',

    'Utils'
], function ProductDetailsItemDetailsView(
    Backbone,
    CartLinesView,
    ProductDetailsAddToProductListView,
    ProductModel,
    _
) {
    'use strict';

    _.extend(CartLinesView.prototype, {
        childViews: _.extend(CartLinesView.prototype.childViews, {
            'AddToProductList': function AddToProductList() {
				return new ProductDetailsAddToProductListView({
					model: this.model
				,	application: this.options.application
				});
            }
        })
    });
});

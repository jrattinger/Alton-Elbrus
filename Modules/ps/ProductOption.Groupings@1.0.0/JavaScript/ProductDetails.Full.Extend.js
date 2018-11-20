define('ProductDetails.Full.Extend', [
    'ProductDetails.Full.View',
    'Product.Model',
    'Utils',
    'underscore'
], function ProductDetailsFullExtend(
    ProductDetailsFullView,
    ProductModel,
    Utils,
    _
) {
    'use strict';

    _.extend(ProductDetailsFullView.prototype, {
        initialize: _.wrap(ProductDetailsFullView.prototype.initialize, function initialize(fn) {
            fn.apply(this, _.toArray(arguments).slice(1));
        })
    });

    _.extend(ProductModel.prototype, {
        getPrice: function getPrice () {
            var originalPrice = this.get('item').getPrice(this.get('quantity'), this.getSelectedMatrixChilds());
            if (this.get('custcol_su_set_pieces') == 2) {
                var vestPrice = this.get('item').get('custitem_vest_sales_price');
                if (vestPrice) {
                    originalPrice.price += vestPrice;
                    originalPrice.compare_price += vestPrice;
                    originalPrice.price_formatted = Utils.formatCurrency(originalPrice.price);
                    originalPrice.compare_price_formatted = Utils.formatCurrency(originalPrice.compare_price);
                }
            }
            return originalPrice;
        }
    });
});

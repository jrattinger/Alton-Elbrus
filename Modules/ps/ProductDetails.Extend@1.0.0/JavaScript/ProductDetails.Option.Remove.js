define('ProductDetails.Option.Remove', [
    'ProductDetails.Options.Selector.Pusher.View',
    'ProductDetails.Options.Selector.View',
    'jQuery',
    'underscore'
], function ProductDetailsOptionRemove(
    ProductDetailsPusherView,
    ProductDetailsView,
    $,
    _
) {
    'use strict';

    return {
        mountToApp: function mountToApp() {
            _.extend(ProductDetailsPusherView.prototype, {
                render: _.wrap(ProductDetailsPusherView.prototype.render, function optionSelectorWrap(fn) {
                    fn.apply(this, _.toArray(arguments).slice(1));
                    this.$el.find('[custcol_ava_udf1]').remove();
                })
            });

            _.extend(ProductDetailsView.prototype, {
                render: _.wrap(ProductDetailsView.prototype.render, function optionSelectorWrap(fn) {
                    fn.apply(this, _.toArray(arguments).slice(1));
                    this.$('[data-cart-option-id="custcol_ava_udf1"]').remove();
                    this.$('[data-cart-option-id="custcol_ava_item"]').remove();
                })
            });
        }
    };
});

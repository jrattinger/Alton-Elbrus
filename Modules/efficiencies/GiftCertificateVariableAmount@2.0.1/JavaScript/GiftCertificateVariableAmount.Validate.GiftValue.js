define('GiftCertificateVariableAmount.Validate.GiftValue', [
    'Backbone',
    'Cart.AddToCart.Button.View',
    'GlobalViews.Message.View',
    'Backbone.CompositeView',
    'underscore',
    'jQuery',
    'Utils'
], function GiftCertificateVariableAmountValidateGiftValue(
    Backbone,
    CartAddToCartButtonView,
    GlobalViewsMessageView,
    BackboneCompositeView,
    _,
    jQuery
) {
    'use strict';

    CartAddToCartButtonView.prototype.addToCart =
        _.wrap(CartAddToCartButtonView.prototype.addToCart, function wrapProductDetailsView(fn) {
            var giftValue = jQuery("[name='custcol_certificate_amount']").val();
            var self = this;
            var responseMsg = self.model.validateGiftValue(giftValue);
            var globalViewMessage;
            var msgContainerParent;

            if (self.model.get('item').get('_isGiftCertWithVariableAmount')) {
                if (responseMsg) {
                    globalViewMessage = new GlobalViewsMessageView({
                        message: _.translate(self.model.validateGiftValue(giftValue)),
                        type: 'error',
                        closable: true
                    });
                    msgContainerParent = jQuery('.errormsg');
                    msgContainerParent.html(globalViewMessage.render().$el.html());

                    return false;
                }
            }
            fn.apply(self, _.toArray(arguments).slice(1));

            return true;
        });
});

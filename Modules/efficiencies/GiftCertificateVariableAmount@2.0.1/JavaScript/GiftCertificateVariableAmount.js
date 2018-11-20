define('GiftCertificateVariableAmount', [
    'ProductDetails.Full.View',
    'GiftCertificateVariableAmount.View',
    'jQuery',
    'underscore',

    'GiftCertificateVariableAmount.Site.Configuration',
    'GiftCertificateVariableAmount.ItemsKeyMapping',
    'GiftCertificateVariableAmount.Model',
   
    'GiftCertificateVariableAmount.ItemPrice.View'
], function GiftCertificateVariableAmount(
     ProductDetailsFullView,
     GiftCertificateVariableAmountView,
     jQuery,
     _
) {
    'use strict';

    _.extend(ProductDetailsFullView.prototype.childViews, {
        'GiftCertificateVariableAmount.View': function GiftCertificateVariableAmountChildView() {
            return new GiftCertificateVariableAmountView({
                model: this.model
            });
        }
    });

    return {
        mountToApp: function mountToApp() {
            ProductDetailsFullView.prototype.initialize =
                _.wrap(ProductDetailsFullView.prototype.initialize, function initialize(fn) {
                    fn.apply(this, _.toArray(arguments).slice(1));
                    this.on('beforeCompositeViewRender', function afterViewRender() {
                        this.$el
                           .find('.product-details-full-actions')
                           .before('<div data-view="GiftCertificateVariableAmount.View"></div>');
                    });
                });
        }
    };
});

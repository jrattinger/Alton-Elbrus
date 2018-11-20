define('GiftCertificateVariableAmount.ItemPrice.View', [
    'ProductViews.Price.View',
    'Backbone',
    'jQuery',
    'underscore',
    'ProductDetails.Full.View'
], function GiftCertificateVariableAmountItemPriceView(
    ProductViewsPriceView,
    Backbone,
    jQuery,
    _
) {
    'use strict';

    ProductViewsPriceView.prototype.getContext =
        _.wrap(ProductViewsPriceView.prototype.getContext, function getContext(fn) {
            var custColGiftCertAmount = _.parseUrlOptions(Backbone.history.fragment).custcol_certificate_amount;
            var priceFormatted = this.model.getPrice();
            var result;
            var context = fn.call(this);
            var isGiftCert;
            var isPdp;
            var pdpConfirmation;

            if (this.model.get('item')) {
                isGiftCert = (this.model.get('item').get('itemtype') === 'GiftCert');
                isPdp = (this.options.origin === 'PDPFULL' || this.options.origin === 'PDPQUICK' ||
                          this.options.origin === 'ITEMCELL' ||
                          this.options.origin === 'RELATEDITEM' || this.options.origin === 'PRODUCTLISTDETAILSLATER'
                );

                pdpConfirmation = (this.options.origin === 'PDPCONFIRMATION');

                if (this.options.linePrice && this.options.linePriceFormatted) {
                    priceFormatted.price = this.options.linePrice;
                    priceFormatted.price_formatted = this.options.linePriceFormatted;
                }
                if (isGiftCert) {
                    if (isPdp && this.model.get('item').get('_isGiftCertWithVariableAmount')) {
                        result = {
                            showComparePrice: false,
                            priceFormatted: ''
                        };
                    } else if (pdpConfirmation && custColGiftCertAmount) {
                        result = {
                            showComparePrice: false,
                            priceFormatted: SC.ENVIRONMENT.currentCurrency.symbol + custColGiftCertAmount
                        };
                    } else {
                        result = {
                            showComparePrice: false,
                            priceFormatted: priceFormatted.price_formatted
                        };
                    }
                    _.extend(context, result);
                }
            }
            return context;
        });
});

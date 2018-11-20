define('GiftCertificateVariableAmount.View', [
    'Backbone',
    'giftcertificatevariableamount_view.tpl',
    'jQuery',
    'underscore',

    'GiftCertificateVariableAmount.Validate.GiftValue',
    'Utils'
], function GiftCertificateVariableAmountView(
    Backbone,
    giftCertificateVariableAmountViewTpl,
    jQuery,
    _
) {
    'use strict';

    return Backbone.View.extend({
        getContext: function getContext() {
            return {
                message: _.translate(
                    this.model.warningMessage(),
                    this.model.get('item').get('_minimumGiftValue'),
                    this.model.get('item').get('_maximumGiftValue')
                ),
                isGiftCertWithVariableAmount: this.model.get('item').get('_hasMaxMinGiftValue')
            };
        },
        template: giftCertificateVariableAmountViewTpl
    });
});

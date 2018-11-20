define('GiftCertificateBalance.Details.View', [
    'Backbone',
    'giftcertificate_details_view.tpl'
], function GiftCertificateBalanceDetailsView(
    Backbone,
    giftCertificateDetailViewTPL
) {
    'use strict';

    return Backbone.View.extend({
        getContext: function getContext() {
            return {
                'giftcertcode': this.model.get('giftcertcode'),
                'amountremaining': this.model.get('amountremaining'),
                'originalamount': this.model.get('originalamount'),
                'email': this.model.get('email')
            };
        },
        template: giftCertificateDetailViewTPL
    });
});

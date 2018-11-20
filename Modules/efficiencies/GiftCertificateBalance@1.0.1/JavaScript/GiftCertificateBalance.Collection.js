define('GiftCertificateBalance.Collection', [
    'Backbone',
    'GiftCertificateBalance.Model',
    'underscore'
], function GiftCertificateBalanceCollection(
    Backbone,
    Model,
    _
) {
    'use strict';

    return Backbone.Collection.extend({
        model: Model,
            url: _.getAbsoluteUrl('services/GiftCertificateBalance.Service.ss')
    });
});

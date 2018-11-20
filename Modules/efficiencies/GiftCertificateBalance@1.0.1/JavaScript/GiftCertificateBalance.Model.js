define('GiftCertificateBalance.Model', [
    'Backbone',
    'underscore',
    'Utils'
], function GiftCertificateBalanceModel(
    Backbone,
    _
) {
    'use strict';

    return Backbone.Model.extend({
        urlRoot: _.getAbsoluteUrl('services/GiftCertificateBalance.Service.ss')
    });
});

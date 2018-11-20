define('GiftCertificateBalance.ServiceController', [
    'ServiceController',
    'Application',
    'GiftCertificateBalance.Model'
], function GiftCertificateBalanceServiceController(
    ServiceController,
    Application,
    GiftCertificateBalanceModel
) {
    'use strict';

    return ServiceController.extend({
        name: 'GiftCertificateBalance.ServiceController',
        get: function get() {
            this.sendContent(
                GiftCertificateBalanceModel.get(),
                { 'status': 201 }
            );
        }
    });
});

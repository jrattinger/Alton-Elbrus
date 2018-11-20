define('GiftCertificateBalance.Model', [
    'SC.Model',
    'SuiteletProxy',
    'Models.Init'
], function GiftCertificateBalanceModel(
    SCModel,
    SuiteletProxy,
    CommerceAPI
) {
    'use strict';

    return SCModel.extend({
        name: 'GiftCertificateBalance',

        get: function get() {
            var userData = CommerceAPI.customer.getFieldValues();
            var proxyResponse = new SuiteletProxy({
                scriptId: 'customscript_ef_gcb_suitelet',
                deployId: 'customdeploy_ef_gcb_suitelet',
                parameters: {
                    website: session.getSiteSettings(['siteid']).siteid,
                    // This should probably be 'defaultSub' if going in sc env.
                    // But again, then subsidiary should be param in url
                    subsidiary: session.getShopperSubsidiary(),
                    // internalid: id
                    email: userData.email
                },
                requestType: 'GET',
                isAvailableWithoutLogin: false,
                cache: {
                    enabled: true,
                    ttl: 5 * 60
                }
            }).get();
            return proxyResponse;
        }
    });
});

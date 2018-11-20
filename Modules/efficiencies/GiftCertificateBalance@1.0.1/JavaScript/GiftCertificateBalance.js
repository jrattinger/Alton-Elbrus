define('GiftCertificateBalance', [
    'GiftCertificateBalance.Router'
], function GiftCertificateBalance(
    Router
) {
    'use strict';

    return {
        MenuItems: {
            parent: 'billing',
            id: 'giftBalanceList',
            name: 'Gift Certificate Balance',
            url: 'giftbalance'
        },
        mountToApp: function mountToApp(application) {
            return new Router(application);
        }
    };
});

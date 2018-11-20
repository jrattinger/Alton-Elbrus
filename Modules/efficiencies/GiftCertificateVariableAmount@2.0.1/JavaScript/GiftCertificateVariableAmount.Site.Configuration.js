define('GiftCertificateVariableAmount.Site.Configuration', [
    'SC.Shopping.Configuration',
    'underscore',
    'Utils'
], function GiftCertificateVariableAmountSiteConfiguration(
    ShoppingConfiguration,
    _
) {
    'use strict';

    ShoppingConfiguration.productDetailsInformation.push(
        {
            name: _('How It Works').translate(),
            contentFromKey: 'custitem_ef_gift_how_it_works',
            opened: true,
            itemprop: 'howitworks'
        },
        {
            name: _('Terms And Condition').translate(),
            contentFromKey: 'custitem_ef_gift_terms_condition',
            opened: true,
            itemprop: 'termsandcondition'
        }
    );
});

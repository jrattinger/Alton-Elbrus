define('GiftCertificateBalance.View', [
    'Backbone.CollectionView',
    'Backbone.CompositeView',
    'GiftCertificateBalance.Details.View',

    'Backbone',
    'giftcertificate_balance_view.tpl',
    'underscore',
    'Utils'

], function GiftCertificateBalanceView(
     BackboneCollectionView,
     BackboneCompositeView,
     GiftCertificateBalanceDetailsView,
     Backbone,
     giftCertificateBalanceViewTPL,
     _
) {
    'use strict';

    return Backbone.View.extend({
        initialize: function initialize() {
            BackboneCompositeView.add(this);
        },
        childViews: {
            'GiftCertificate.Balance': function GiftCertificateBalance() {
                return new BackboneCollectionView({
                    collection: this.collection,
                    childView: GiftCertificateBalanceDetailsView
                });
            }
        },
        getBreadcrumbPages: function giftCertBreadCrumb() {
            return [{ text: _.translate('Gift Certificates Balance'), href: '/giftbalance' }];
        },

        getSelectedMenu: function expandNav() {
            return 'giftbalance';
        },
        getContext: function getContext() {
            return {
                isApprove: !this.collection.length
            };
        },
        template: giftCertificateBalanceViewTPL
    });
});

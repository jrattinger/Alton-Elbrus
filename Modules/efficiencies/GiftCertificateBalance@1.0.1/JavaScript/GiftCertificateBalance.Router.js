define('GiftCertificateBalance.Router', [
    'Backbone',
    'GiftCertificateBalance.Collection',
    'GiftCertificateBalance.View'
], function GiftCertificateBalanceRouter(
    Backbone,
    GiftCertificateBalanceCollection,
    GiftCertificateBalanceView
) {
    return Backbone.Router.extend({
        initialize: function initialize(application) {
            this.application = application;
        },

        routes: {
            'giftbalance': 'giftBalanceList'
        },

        giftBalanceList: function giftBalance() {
            var collection = new GiftCertificateBalanceCollection();
            var view = new GiftCertificateBalanceView({
                application: this.application,
                collection: collection
            });

            collection.fetch().done(function done() {
                view.showContent();
            });
        }
    });
});

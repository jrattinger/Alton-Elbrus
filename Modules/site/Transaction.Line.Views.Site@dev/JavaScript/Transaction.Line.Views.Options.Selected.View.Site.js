define('Transaction.Line.Views.Options.Selected.View.Site', [
    'Transaction.Line.Views.Options.Selected.View',
    'Transaction.Line.Views.Option.View',

    'Backbone.CollectionView',
    'Backbone',
    'underscore',
    'jQuery'
], function TransactionLineViewsOptionsSelectedViewSite(
    TransactionLineViewsOptionsSelectedView,
    TransactionLineViewsOptionView,

    BackboneCollectionView,
    Backbone,
    _,
    $
) {
  
    _.extend(TransactionLineViewsOptionsSelectedView.prototype.childViews, {
        'Options.Collection': function () {
            var options = this.model.getVisibleOptions();

            if (this.model.get('item') && this.model.get('item').get('isfulfillable') === true && this.model.get('item').get('itemtype') === 'GiftCert') {
                options = _.filter(options, function(option) {
                    return option.get('cartOptionId') !== 'GIFTCERTRECIPIENTEMAIL' && option.get('cartOptionId') !== 'GIFTCERTRECIPIENTNAME'
                })
            };

            return new BackboneCollectionView({
                collection: options
            ,	childView: TransactionLineViewsOptionView
            ,	viewsPerRow: 1
            ,	childViewOptions: {
                    line: this.model
                ,	templateName: 'selected'
                }
            });
        }
    });

});
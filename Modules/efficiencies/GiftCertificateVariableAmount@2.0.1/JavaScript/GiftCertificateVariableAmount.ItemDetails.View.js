define('GiftCertificateVariableAmount.ItemDetails.View', [
    'Backbone',
    'ProductDetails.Full.View',
    'Backbone.CollectionView',
    'ProductViews.Option.View',
    'underscore',

    'Utils'
], function GiftCertificateVariableAmountItemDetailsView(
    Backbone,
    ProductDetailsFullView,
    BackboneCollectionView,
    ProductViewsOptionView,
    _
) {
    'use strict';

    ProductDetailsFullView.prototype.childViews['Product.Options'] = function ItemDetailsOptions() {
        var optionsToRender = this.model.get('item').getPosibleOptions();
        var filteredOptionsToRender;
        var isGiftCertWithVariableAmount = this.model.get('item').get('_isGiftCertWithVariableAmount');
        var giftCert = this.model.get('item').get('itemtype');

        var showFields = [
            'GIFTCERTFROM',
            'GIFTCERTRECIPIENTNAME',
            'GIFTCERTRECIPIENTEMAIL',
            'GIFTCERTMESSAGE'
        ];


        _.each(optionsToRender.models, function optionsToRenderData(data) {
            // hide item options that is not needed for Gift Certificate
            if (giftCert === 'GiftCert') {
                _.each(showFields, function showCustField(custField) {
                    // check if item has a variable amount
                    if (data.get('cartOptionId') === custField) {
                        data.set('displayOption', true);
                    }
                });
            } else {
                data.set('displayOption', true);
            }
            
            // validate visibility of variable amount field
            if (data.get('cartOptionId') === 'custcol_certificate_amount') {
                if (isGiftCertWithVariableAmount) {
                    data.set('displayOption', true);
                } else {
                    data.set('displayOption', false);
                }
            } else if (data.get('cartOptionId') === 'custcol_is_variable_amount') {
                data.set('displayOption', false);
            }
        });

        // filteredOptionsToRender = _.where(optionsToRender.models, {
        //     'displayOption': true
        // });

        filteredOptionsToRender = optionsToRender.filter(function filterItemPossibleOptions(result) {
            var filterResult = (_.filter(result, { displayOption: true })[0]);

            return filterResult;
        });

        return new BackboneCollectionView({
            collection: new Backbone.Collection(filteredOptionsToRender),
            childView: ProductViewsOptionView,
            viewsPerRow: 1,
            childViewOptions: {
                item: this.model
            }
        });
    };
});

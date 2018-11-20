define('ProductOption.Groupings', [
    'SC.Configuration',
    'ProductDetails.Full.View',
    'ProductViews.OptionGroup.View',
    'Product.Container.View',
    'Item.Model',
    'Product.Model',
    'Backbone.CollectionView',
    'Backbone',
    'underscore'
], function ProductionGroupings(
    Configuration,
    ProductDetailsFullView,
    ProductViewsOptionView,
    ProductContainerView,
    ItemModel,
    ProductModel,
    BackboneCollectionView,
    Backbone,

    _
) {
    'use strict';

    ProductDetailsFullView.prototype.childViews['Product.Options'] = function ItemDetailsOptions() {
        var optionsToRender = this.model.getVisibleOptions(); //this.model.get('item').getPosibleOptions();

        var filteredOptionsToRender;
        var isGiftCertWithVariableAmount = this.model.get('item').get('_isGiftCertWithVariableAmount');
        var giftCert = this.model.get('item').get('itemtype');
        var isDeliverable = this.model.get('item').get('isfulfillable');

        var showFields = [
            'GIFTCERTFROM',
            'GIFTCERTRECIPIENTNAME',
            'GIFTCERTRECIPIENTEMAIL',
            'GIFTCERTMESSAGE'
        ];

        if (isDeliverable) {
            _.each(optionsToRender, function removeMandatory(custField) {
                if(showFields.indexOf(custField.get('cartOptionId')) !== -1 && custField.get('cartOptionId') !== 'GIFTCERTFROM') {
                    custField.set('isMandatory', false);
                }
                if(custField.get('cartOptionId') === 'GIFTCERTRECIPIENTEMAIL') {
                    custField.set('value', {
                        label: 'null@delivered.com',
                        internalid: 'null@delivered.com'
                    });
                    custField.set('displayOption', false);
                }
                if(custField.get('cartOptionId') === 'GIFTCERTRECIPIENTNAME') {
                    custField.set('value', {
                        label: 'null-delivered',
                        internalid: 'null-delivered'
                    });
                    custField.set('displayOption', false);
                }
            });

            showFields = ['GIFTCERTFROM', 'GIFTCERTMESSAGE'];
        }

        _.each(optionsToRender, function optionsToRenderData(data) {
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
        
        filteredOptionsToRender = optionsToRender.filter(function filterItemPossibleOptions(result) {
            var filterResult = (_.filter(result, { displayOption: true })[0]);

            return filterResult;
        });

        return new ProductContainerView({
            collection: new Backbone.Collection(filteredOptionsToRender),
            application: this.application,
            childView: ProductViewsOptionView,
            viewsPerRow: 1,
            childViewOptions: {
                item: this.model
            }
        });
    };
});

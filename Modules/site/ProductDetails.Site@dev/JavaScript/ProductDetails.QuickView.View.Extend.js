define('ProductDetails.QuickView.View.Extend', [
    'ProductDetails.QuickView.View',
    'ProductDetails.ItemOptions.View',
    'ProductDetails.ItemOptions.Model',
    'underscore'
], function ProductDetailsQuickViewViewExtend(
    ProductDetailsQuickViewView,
    ProductDetailsItemOptionsView,
    ProductDetailsItemOptionsModel,
    _
) {
    'use strict';
 
    _.extend(ProductDetailsQuickViewView.prototype, {
        childViews: _.extend(ProductDetailsQuickViewView.prototype.childViews, {
            'ProductDetails.ItemOptions': function () {
                var optionsModel = new ProductDetailsItemOptionsModel();
                
                var view = new ProductDetailsItemOptionsView({
                    model: optionsModel,
                    itemModel: this.model,
                    application: this.application,
                    isUpdating: true
                });
                return view;
            }
        }),
 
        getContext: _.wrap(ProductDetailsQuickViewView.prototype.getContext, function getContext(fn) {
            var content = fn.apply(this, _.toArray(arguments).slice(1));
            var itemModel = this.model.get('item');
            
            content.isCustomizable = false;
            if (itemModel.get('custitem_sca_item_category') && itemModel.get('custitem_sca_cat_item_options').split(', ').length && itemModel.get('itemtype') !== 'GiftCert') {
                content.isCustomizable = true;
            }

            return content;
        })
    });
});
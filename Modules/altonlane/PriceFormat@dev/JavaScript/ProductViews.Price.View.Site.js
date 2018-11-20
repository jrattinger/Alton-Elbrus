define('ProductViews.Price.View.Site', [
    'ProductViews.Price.View',
    'underscore'
], function ProductViewsPriceViewSite(
    ProductViewsPriceView,
    _
) {
    'use strict';

    _.extend(ProductViewsPriceView.prototype, {
        getContext: _.wrap(ProductViewsPriceView.prototype.getContext, function (fn) {
            var retVal = fn.apply(this, _.toArray(arguments).slice(1));

            if (!_.isUndefined(this.model.get('item'))) {
                _.extend(retVal, {
                    showPrice: !_.isUndefined(this.model.get('item').attributes.dontshowprice) ? !this.model.get('item').attributes.dontshowprice : true
                });
            }

            return retVal;
        })
    });
});

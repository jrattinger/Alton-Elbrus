define('ProductViews.Option.View.Site', [
    'Backbone',
    'ProductViews.Option.View',
    'underscore',

    'Utils'
], function ProductViewsOptionViewSite(
    Backbone,
    ProductViewsOptionView,
    _
) {
    'use strict';

    _.extend(ProductViewsOptionView.prototype, {
        initialize: _.wrap(ProductViewsOptionView.prototype.initialize, function wrappedInitialize(fn) {
            fn.apply(this, _.toArray(arguments).slice(1));
            this.maxLength = this.options.maxLength;
            this.name = this.options.configName;
        }),

        getContext: _.wrap(ProductViewsOptionView.prototype.getContext, function wrappedGetContext(fn) {
            var retval = fn.apply(this, _.toArray(arguments).slice(1));
            retval.maxLength = this.maxLength;
            retval.configName = this.name;
            retval.isGiftCard = this.options.isGiftCard;

            return retval;
        })

    });

});

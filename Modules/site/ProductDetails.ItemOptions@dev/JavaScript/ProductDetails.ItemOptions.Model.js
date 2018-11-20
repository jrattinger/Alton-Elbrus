define('ProductDetails.ItemOptions.Model', [
    'Backbone',
    'underscore',
    'Utils'
], function ProductDetailsItemOptionsModel(
    Backbone,
    _
) {
    'use strict';

    return Backbone.Model.extend({
        urlRoot: _.getAbsoluteUrl('services/ProductDetails.ItemOptions.Service.ss')
    });
});

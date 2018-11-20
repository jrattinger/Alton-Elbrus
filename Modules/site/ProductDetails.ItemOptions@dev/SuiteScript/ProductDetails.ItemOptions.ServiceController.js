define('ProductDetails.ItemOptions.ServiceController', [
    'ServiceController',
    'ProductDetails.ItemOptions.Model'
], function ProductDetailsItemOptionsServiceController(
   ServiceController,
   ProductDetailsItemOptionsModel
) {
    'use strict';

    return ServiceController.extend({

        name: 'ProductDetails.ItemOptions.ServiceController',


        get: function get() {
            var options = this.request.getParameter('options');
            var category = this.request.getParameter('category');
            return ProductDetailsItemOptionsModel.get(options, category);
        }
    });
});

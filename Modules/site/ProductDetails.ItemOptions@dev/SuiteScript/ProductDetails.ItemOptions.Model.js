define('ProductDetails.ItemOptions.Model', [
    'SC.Model',
    'Configuration',
    'underscore'
], function ProductDetailsItemOptionsModel(
    SCModel,
    Configuration,
    _
) {
    'use strict';

    return SCModel.extend({
        name: 'ProductDetails.ItemOptions',

        get: function get(options, category) {

            var filters = [];
            filters.push(['custrecord_sca_io_item_category', 'is', category]);
            filters.push('and')

            var optionsArray = options.split(',');
            var optionsFilters = [];

            for (var i = 0; i < optionsArray.length; i++) {
                if (i === optionsArray.length-1) {
                    optionsFilters.push(['name', 'is', optionsArray[i].trim()]);
                } else {
                    optionsFilters.push(['name', 'is', optionsArray[i].trim()]);
                    optionsFilters.push('or');
                }
            }
            
            filters.push(optionsFilters);            
            
            var results = nlapiSearchRecord(null, 'customsearch_sca_item_options_search', filters, null);

            // create a JSON object
            var itemOptionInfo = {};
            _.each(results, function(result) {
                if (itemOptionInfo[result.getValue('name')]) {
                    itemOptionInfo[result.getValue('name')].options.push({
                        imageRef: result.getValue('custrecord_sca_io_image', 'custrecord_io_parent_link', null),
                        itemOptionId: result.getValue('custrecord_sca_io_id', 'custrecord_io_parent_link', null)
                    })
                } else {
                    itemOptionInfo[result.getValue('name')] = {
                        name: result.getValue('name'),
                        description: result.getValue('custrecord_sca_io_description'),
                        itemOptionParentId: result.getValue('custrecord_sca_io_parent_id'),
                        order: result.getValue('custrecord_sca_io_order'),
                        hideIfNoStitching: result.getValue('custrecord_sca_io_stitching'),
                        hideIfNoMonogram: result.getValue('custrecord_sca_io_monogram'),
                        hideIfNoShirtComplement: result.getValue('custrecord_sca_io_shirt_complement'),
                        hideIfNoVest: result.getValue('custrecord_sca_io_vest'),
                        maxLength: result.getValue('custrecord_sca_io_max_length'),
                        options: [{
                            imageRef: result.getValue('custrecord_sca_io_image', 'custrecord_io_parent_link', null),
                            itemOptionId: result.getValue('custrecord_sca_io_id', 'custrecord_io_parent_link', null)
                        }]
                    }
                }
            });

            //convert JSON object into array
            var itemOptionInfoArray = [];
            _.each(itemOptionInfo, function(itemOption) {
                itemOptionInfoArray.push(itemOption);
            });
            
            return itemOptionInfoArray;
        }
    });
});

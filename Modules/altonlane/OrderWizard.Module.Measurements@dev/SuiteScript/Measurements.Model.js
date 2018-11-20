define('Measurements.Model', [
    'SC.Model',
    'Configuration',
    'underscore'
], function MeasurementsModel(
    SCModel,
    Configuration,
    _
) {
    'use strict';

    return SCModel.extend({
        name: 'Measurements',

        get: function get() {
            var results = [];

            var columns = new Array();
            columns[0] = new nlobjSearchColumn('name');
            columns[1] = new nlobjSearchColumn('custrecord_webstore_measurements_desc');
            columns[2] = new nlobjSearchColumn('custrecord_webstore_measurements_help');
            columns[3] = new nlobjSearchColumn('custrecord_webstore_measurement_order');

            var searchResults = new nlapiSearchRecord('customrecord_webstore_measurements', null, null, columns);

            _.each(searchResults, function(result) {
                results.push({
                    internalid: result.getId(),
                    name: result.getValue('name'),
                    description: result.getValue('custrecord_webstore_measurements_desc'),
                    help: result.getValue('custrecord_webstore_measurements_help'),
                    order: result.getValue('custrecord_webstore_measurement_order')
                });
            });

            return {list: results};
        }
    });
});

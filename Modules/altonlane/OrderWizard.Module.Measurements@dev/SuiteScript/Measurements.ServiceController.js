define('Measurements.ServiceController', [
    'ServiceController',
    'Measurements.Model'
], function MeasurementsServiceController(
   ServiceController,
   MeasurementsModel
) {
    'use strict';

    return ServiceController.extend({

        name: 'Measurements.ServiceController',


        get: function get() {
            return MeasurementsModel.get();
        }
    });
});

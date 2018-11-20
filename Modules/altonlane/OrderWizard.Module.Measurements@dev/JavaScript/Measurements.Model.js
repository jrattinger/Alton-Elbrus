define('Measurements.Model', [
    'Backbone',
    'underscore',
    'Utils'
], function OrderWizardMolduleMeasurementsModel(
    Backbone,
    _
) {
    'use strict';

    return Backbone.Model.extend({
        urlRoot: 'services/Measurements.Service.ss'
    });
});

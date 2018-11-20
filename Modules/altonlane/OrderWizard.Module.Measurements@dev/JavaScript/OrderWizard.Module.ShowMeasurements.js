// OrderWizard.Module.OrderNotes.js
// --------------------------------
//
define('OrderWizard.Module.ShowMeasurements', [
    'Wizard.Module',
    'Measurements.Model',
    'Backbone',

    'order_wizard_show_measurements_module.tpl',

    'Utils'
], function (
    WizardModule,
    MeasurementsModel,
    Backbone,

    orderWizardShowMeasurementsModule,

    Utils
) {
    'use strict';

    var collapsibles_states = {};

    return WizardModule.extend({
        template: orderWizardShowMeasurementsModule,

        initialize: function () {
            WizardModule.prototype.initialize.apply(this, arguments);
            var self = this;
            this.mModel = new MeasurementsModel();

            this.mModel.fetch().done(function(){
                this.render();
            }.bind(this));
        },

        getContext: function () {
            var selectedOption = "Loading...";
            var self = this;

            if (this.mModel.get('list')) {
                _.each(self.mModel.get('list'), function(option) {
                    if (self.model.get('options') && option.internalid == self.model.get('options').custbody_webstore_measurement) {
                        selectedOption = option.description;
                    }
                });
            }

            return {
                selectedOption: selectedOption
            };
        }
    });
});

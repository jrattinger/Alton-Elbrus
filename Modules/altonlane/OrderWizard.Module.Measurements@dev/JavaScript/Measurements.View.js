define('Measurements.View', [
    'measurements.tpl',
    
    'Backbone',
    'underscore',
    'jQuery'
], function (
    measurementsTpl,
    
    Backbone,
    _,
    jQuery
) {
	'use strict';

	//@class Address.List.View List profile's addresses @extend Backbone.View
	return Backbone.View.extend({

        template: measurementsTpl,
        
        initialize: function initialize(options) {
            if(this.model.get('list') && options.wizard.get('options') && options.wizard.get('options').custbody_webstore_measurement) {
                _.each(this.model.get('list'), function(option) {
                    if (option.internalid == options.wizard.get('options').custbody_webstore_measurement) {
                        option.checked = true;
                    } else {
                        option.checked = false;
                    }
                });
            } else if (this.model.get('list')) {
                this.model.get('list')[0].checked = true
            }
        },

        events: {
            'change input[name="measurements"]': 'toggleMeasurement'
        },

        toggleMeasurement: function(e) {
            var value = jQuery(e.currentTarget).val();

            _.each(this.model.get('list'), function(option) {
                if (option.internalid == value) {
                    option.checked = true;
                } else {
                    option.checked = false;
                }
            });

            this.render();
        },
        
		getContext: function getContext() {
            var options = this.model ? this.model.get('list') : [];
            var selectedOption = _.find(options, function(option) {
                return option.checked;
            });

            var optionsSorted = _.sortBy(options, function (option) {
                return option.order;
            });

			return {
                options: optionsSorted,
                help: selectedOption ? selectedOption.help : ''
			};
		}
	});
});
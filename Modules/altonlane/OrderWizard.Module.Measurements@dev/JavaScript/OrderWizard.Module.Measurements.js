// OrderWizard.Module.OrderNotes.js
// --------------------------------
//
define('OrderWizard.Module.Measurements', [
    'Wizard.Module',
    'Measurements.Model',
    'Measurements.View',
    'Backbone.CompositeView',
    'Backbone',

    'order_wizard_measurements_module.tpl',

    'Utils'
], function (
    WizardModule,
    MeasurementsModel,
    MeasurementsView,
    BackboneCompositeView,
    Backbone,

    orderWizardOrderNotesModuleTpl,

    Utils
) {
    'use strict';

    var collapsibles_states = {};

    return WizardModule.extend({
        template: orderWizardOrderNotesModuleTpl,

        initialize: function () {
            WizardModule.prototype.initialize.apply(this, arguments);
            var self = this;
            this.mModel = new MeasurementsModel();

            this.mModel.fetch().done(function(){
                BackboneCompositeView.add(this);
                this.render();
            }.bind(this));
            
            this.on('afterViewRender', function() {
                this.resetCollapsibleStates();
            }, this);
        },
        
        events: {
            'click [data-action="next"]': 'initiateNextStep'
        },

        initiateNextStep: function initiateNextStep(e) {
            e.preventDefault();

            $('[data-target="#order-wizard-measurements-module-body"]').click();

            if (!$('#order-wizard-address-module-body-shipaddress').hasClass('in')) {
                $('[data-target="#order-wizard-address-module-body-shipaddress"]').click();
            }
        },

        render: function render() {
            this.storeCollapsibleStates();
            this._render();
        },

        storeCollapsibleStates: function storeCollapsibleStates() {
			this.$('.collapse').each(function (index, element) {
				collapsibles_states[Utils.getFullPathForElement(element)] = jQuery(element).hasClass('in');
			});
		},

		resetCollapsibleStates: function resetCollapsibleStates() {
			var self = this;
			_.each(collapsibles_states, function (is_in, element_selector) {
				self.$(element_selector)[ is_in ? 'addClass' : 'removeClass' ]('in').css('height',  is_in ? 'auto' : '0');
            });
        },

        submit: function () {
            this.model.get('options').custbody_webstore_measurement = this.$el.find('input[name="measurements"]:checked').val();
            return this.isValid();
        },

        childViews: {
            
            'Checkout.Measurements': function checkoutMeasurements() {
                return new MeasurementsView({
                    model: this.mModel,
                    wizard: this.model
                });
            }
        },

        getContext: function () {
            return {
            };
        }
    });
});

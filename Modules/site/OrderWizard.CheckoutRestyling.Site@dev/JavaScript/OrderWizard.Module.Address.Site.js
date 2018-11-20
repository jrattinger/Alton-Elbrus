define('OrderWizard.Module.Address.Site', [
    'OrderWizard.Module.Address',
    'Address.Model',
    'Backbone',
    'underscore',
    'jQuery',
    'Utils'
], function OrderWizardModuleAddressSite(
    OrderWizardModuleAddress,
    AddressModel,
    Backbone,
    _,
    jQuery,
    Utils
) {
    var collapsibles_states = {};

    _.extend(OrderWizardModuleAddress.prototype, {
        initialize: _.wrap(OrderWizardModuleAddress.prototype.initialize, function(fn) {
            fn.apply(this, _.toArray(arguments).slice(1));
            this.on('afterCompositeViewRender afterViewRender', function() {
                this.resetCollapsibleStates();
            }, this);
        }),

        events: _.extend(OrderWizardModuleAddress.prototype.events, {
            'click [data-action="next"]': 'initiateNextStep'
        }),


        initiateNextStep: function initiateNextStep(e) {
            e.preventDefault();

            if (this.manage === 'shipaddress') {
                $('[data-target="#order-wizard-address-module-body-shipaddress"]').click();

                if (!$('#order-wizard-shipmethod-module-body').hasClass('in')) {
                    $('[data-target="#order-wizard-shipmethod-module-body"]').click();
                }
            } else {
                $('[data-target="#order-wizard-address-module-body-billaddress"]').click();

                if (!$('#order-wizard-paymentmethod-selector-module-body').hasClass('in')) {
                    $('[data-target="#order-wizard-paymentmethod-selector-module-body"]').click();
                }
            }
            
        },

        render: _.wrap(OrderWizardModuleAddress.prototype.render, function(fn) {
            this.storeCollapsibleStates();
            fn.apply(this, _.toArray(arguments).slice(1));
        }),

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
        
        getContext: _.wrap(OrderWizardModuleAddress.prototype.getContext, function(fn) {
            var context = fn.apply(this, _.toArray(arguments).slice(1));

            context.isShipping = this.manage === 'shipaddress';

            return context;
        }),
    });
});
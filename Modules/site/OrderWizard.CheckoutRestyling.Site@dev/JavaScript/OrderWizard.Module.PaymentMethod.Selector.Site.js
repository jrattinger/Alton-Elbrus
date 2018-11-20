define('OrderWizard.Module.PaymentMethod.Selector.Site', [
    'OrderWizard.Module.PaymentMethod.Selector',
    'Backbone',
    'underscore',
    'jQuery',
    'Utils'
], function OrderWizardModulePaymentMethodSelectorSite(
    OrderWizardModulePaymentMethodSelector,
    Backbone,
    _,
    jQuery,
    Utils
) {
    var collapsibles_states = {};

    _.extend(OrderWizardModulePaymentMethodSelector.prototype, {
        initialize: _.wrap(OrderWizardModulePaymentMethodSelector.prototype.initialize, function(fn) {
            fn.apply(this, _.toArray(arguments).slice(1));
            this.on('afterCompositeViewRender afterViewRender', function() {
                this.resetCollapsibleStates();
            }, this);
        }),

        events: _.extend(OrderWizardModulePaymentMethodSelector.prototype.events, {
            'click [data-action="next"]': 'initiateNextStep'
        }),

        initiateNextStep: function initiateNextStep(e) {
            e.preventDefault();

            $('[data-target="#order-wizard-paymentmethod-selector-module-body"]').click();

            if (!$('#order-wizard-paymentmethod-giftcertificates-module-body').hasClass('in')) {
                $('[data-target="#order-wizard-paymentmethod-giftcertificates-module-body"]').click();
            }
        },

        render: _.wrap(OrderWizardModulePaymentMethodSelector.prototype.render, function(fn) {
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
        
        destroy: function () {
			collapsibles_states = {};
			this.off('afterCompositeViewRender', this.resetCollapsibleStates, this);
			this._destroy();
		}
    });
});
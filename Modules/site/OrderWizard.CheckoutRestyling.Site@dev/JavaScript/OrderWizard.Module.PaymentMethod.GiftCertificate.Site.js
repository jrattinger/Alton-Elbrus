define('OrderWizard.Module.PaymentMethod.GiftCertificate.Site', [
    'OrderWizard.Module.PaymentMethod.GiftCertificates',
    'Backbone',
    'underscore',
    'jQuery',
    'Utils'
], function OrderWizardModulePaymentMethodGiftCertificateSite(
    OrderWizardModulePaymentMethodGiftCertificate,
    Backbone,
    _,
    jQuery,
    Utils
) {
    var collapsibles_states = {};

    _.extend(OrderWizardModulePaymentMethodGiftCertificate.prototype, {
        initialize: _.wrap(OrderWizardModulePaymentMethodGiftCertificate.prototype.initialize, function(fn) {
            fn.apply(this, _.toArray(arguments).slice(1));
            this.on('afterCompositeViewRender afterViewRender', function() {
                this.resetCollapsibleStates();
            }, this);
        }),

        events: _.extend(OrderWizardModulePaymentMethodGiftCertificate.prototype.events, {
            'click [data-action="next"]': 'initiateNextStep'
        }),

        initiateNextStep: function initiateNextStep(e) {
            e.preventDefault();

            $('[data-target="#order-wizard-paymentmethod-giftcertificates-module-body"]').click();

            if (!$('#order-wizard-address-module-body-billaddress').hasClass('in')) {
                $('[data-target="#order-wizard-address-module-body-billaddress"]').click();
            }
        },

        render: _.wrap(OrderWizardModulePaymentMethodGiftCertificate.prototype.render, function(fn) {
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
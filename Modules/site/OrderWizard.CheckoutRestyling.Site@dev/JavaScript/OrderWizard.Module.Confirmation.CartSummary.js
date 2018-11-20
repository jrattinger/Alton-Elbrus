define('OrderWizard.Module.Confirmation.CartSummary', [
    'Wizard.Module',
    'Backbone.CompositeView',
    'Backbone.CollectionView',
    'Cart.Promocode.List.View',
    'GlobalViews.FormatPaymentMethod.View',
    'Address.Details.View',
    
    'order_wizard_confirmation_cartsummary.tpl',
    
    'underscore'
], function (
    WizardModule,
    BackboneCompositeView,
    BackboneCollectionView,
    CartPromocodeListView,
    GlobalViewsFormatPaymentMethodView,
    AddressDetailsView,
    
    orderWizardConfirmationCartSummaryTpl,
    
    _
) {
	'use strict';

	return WizardModule.extend({

        template: orderWizardConfirmationCartSummaryTpl,
        
        className: 'OrderWizard.Module.Confirmation.CartSummary',
        
        attributes: {
            'id': 'order-wizard-layout',
            'class': 'order-wizard-layout'
        },
        
        initialize: function initialize () {
			WizardModule.prototype.initialize.apply(this, arguments);
			BackboneCompositeView.add(this);
        },
        
        
        render: function render () {
			if (this.state === 'present' ) {
				this._render();
				this.trigger('ready', true);
			}
        },
        
        childViews: {
			'GiftCertificates': function () {
				return new BackboneCollectionView({
						collection: this.wizard.model.get('paymentmethods').where({type: 'giftcertificate'}) || []
					,	cellTemplate: cart_summary_gift_certificate_cell_tpl
					,	viewsPerRow: 1
					,	childView: GlobalViewsFormatPaymentMethodView
					,	rowTemplate: null
				});
            },
            
			'CartPromocodeListView': function () {
				var self = this;
				return new CartPromocodeListView({
                    hideRemovePromocodeButton: false,
                    model: this._getModel(),
					isReadOnly: true
				});
            },
            
            'Billing.Address': function () {
				return new AddressDetailsView({
				    model: this.model.get('addresses').get(this.model.get('billaddress')),
					hideActions: true,
					hideDefaults: true,
					manage: 'billaddress'
				});
			},
			'Shipping.Address': function () {
				return new AddressDetailsView({
					model: this.model.get('addresses').get(this.model.get('shipaddress')),
					hideActions: true,
					hideDefaults: true,
					manage: 'shipaddress'
				});
			}
        },
        
        countItems: function countItems (lines) {
			var item_count = 0;

			_.each(lines.models ? lines.models: lines, function (line) {
				item_count += line.get('quantity');
			});

			return item_count;
        },
        
        _isReadFromConfirmation: function() {
			var confirmation = this.wizard.model.get('confirmation')
			var read_from_confirmation = confirmation && confirmation.get('internalid') && this.wizard.isExternalCheckout;

			return read_from_confirmation;
        },
        
        getShowShippingCost: function (confirmation) {
			var confirmation_lines = confirmation && confirmation.get('lines');

			if (confirmation_lines.length) {
				var pickup_lines = confirmation_lines.filter(function (model) {
					return model.get('fulfillmentChoice') && model.get('fulfillmentChoice') === 'pickup';
				});

				var non_shippable_lines = confirmation_lines.filter(function (model) {
					return !model.get('item').get('_isfulfillable');
				});

				return confirmation_lines.length - non_shippable_lines.length - pickup_lines.length > 0;	
			} else {
				return this.wizard.model.getIfThereAreDeliverableItems();
			}
        },
        
        getShowPickupCost: function (confirmation) {
			var confirmation_lines = confirmation && confirmation.get('lines');

			if (confirmation_lines.length) {
				return !!confirmation_lines.find(function (model) {
					return model.get('fulfillmentChoice') && model.get('fulfillmentChoice') === 'pickup';
				});
			} else {
				return !!this.wizard.model.getPickupInStoreLines().length;
			}
        },
        
        _getModel: function() {
			if (this._isReadFromConfirmation()) {
				return this.wizard.model.get('confirmation');
			} else {
				return this.wizard.model;
			}
        },
        
        getContext: function getContext ()
		{
			var model = this._getModel();
			var summary = model.get('summary') || {};
			var itemCount = this.countItems(model.get('lines'));
            var confirmation = this.wizard.model.get('confirmation');
            var date = new Date();

			return {
				model: model,
				itemCount: itemCount,
				itemCountGreaterThan1: itemCount > 1,
				giftCertificates: model.get('paymentmethods').where({type: 'giftcertificate'}) || [],
				showGiftCertificates: !!summary.giftcertapplied,
				showDiscount: !!summary.discounttotal,
				showHandlingCost: !!summary.handlingcost,
				showShippingCost: this.getShowShippingCost(confirmation),
				showPickupCost: this.getShowPickupCost(confirmation),
				showRemovePromocodeButton: !!this.options.allow_remove_promocode,
                orderNumber: model.get('tranid'),
				orderDate: (date.getMonth() + 1) + '/' + date.getDate() + '/' + date.getFullYear(),
				orderName: this.wizard.profileModel.get('firstname') + ' ' + this.wizard.profileModel.get('lastname'),
				orderEmail: this.wizard.profileModel.get('email'),
				orderPhone: this.wizard.profileModel.get('phone')
			};
		}
	});
});
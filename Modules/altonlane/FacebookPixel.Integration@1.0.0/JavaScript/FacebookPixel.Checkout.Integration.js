define('FacebookPixel.Checkout.Integration', [
  'Backbone',
  'Backbone.FormView',
  'FacebookPixel',

  'LoginRegister.Register.View',
  'Wizard.View',

  'underscore'
], function FacebookPixelIntegration(
  Backbone,
  BackboneFormView,
  FacebookPixel,

  LoginRegisterRegisterView,
  WizardView,

  _
) {
  'use strict';

  return {
    mountToApp: function initialize() {
      // init on enter checkout
      this._enterCheckout();

      // init complete signup
      this._signUpComplete();
    },


    _enterCheckout: function enterCheckout() {
      WizardView.prototype.initialize = _.wrap(WizardView.prototype.initialize, function(fn) {
        fn.apply(this, _.toArray(arguments).slice(1));

        var summary = this.wizard.model.get('summary');

        if (this.wizard.currentStep == 'opc') {
          FacebookPixel.track('InitiateCheckout', {
            num_items: summary.itemcount,
            value: summary.total,
            currency: SC.ENVIRONMENT.siteSettings.sitecurrency[0].code
          });
        } else if(this.wizard.currentStep == 'review') {
          FacebookPixel.track('AddPaymentInfo', {
            value: summary.total,
            currency: SC.ENVIRONMENT.siteSettings.sitecurrency[0].code
          });
        } else if(this.wizard.currentStep == 'confirmation') {
          // get all itemids
          var items = [];
          _.each(this.wizard.model.get('lines').models, function(item) {
            items.push(item.get('item').get('itemid'));
          });

          FacebookPixel.track('AddPaymentInfo', {
            content_ids: items,
            content_type: 'product',
            value: summary.total,
            currency: SC.ENVIRONMENT.siteSettings.sitecurrency[0].code
          });
        }
      });
    },

    _signUpComplete: function signUpComplete() {
      LoginRegisterRegisterView.prototype.events = _.extend({}, LoginRegisterRegisterView.prototype.events, {
        'submit form': 'saveTheForm'
      });

      LoginRegisterRegisterView.prototype.saveTheForm = function saveForm(e) {
        BackboneFormView.saveForm.apply(this, arguments);

        FacebookPixel.track('Lead');
        FacebookPixel.track('CompleteRegistration');
      };
    }
  }
});

define('ProductDetails.Login.View', [
    'Account.Login.Model',
    'Tracker',
    'Session',
    'Profile.Model',
    'LiveOrder.Model',
    'Header.View',
 
    'product_details_login.tpl',
 
    'Backbone',
    'Backbone.FormView',
    'underscore'
], function ProductDetailsLoginView(
    AccountLoginModel,
    Tracker,
    Session,
    ProfileModel,
    LiveOrderModel,
    HeaderProfileView,
 
    productDetailsLoginTpl,
 
    Backbone,
    BackboneFormView,
    _
) {
    'use strict';
 
    return Backbone.View.extend({
 
        template: productDetailsLoginTpl,
 
        initialize: function(options) {
            this.application = options.application;
            this.parentView = options.parentView;
            this.model = new AccountLoginModel();
            this.model.on('save', _.bind(this.redirect, this));
            BackboneFormView.add(this);
        },
 
        events: {
            'click [data-action="continue-as-guest"]': 'continueAsGuest',
            'submit form': 'saveForm'
        },
 
        bindings: {
            '[name="email"]': 'email',
            '[name="password"]': 'password'
        },
 
        continueAsGuest: function continueAsGuest() {
            this.parentView.isCustomizing = true;
            this.application.getLayout().closeModal();
            this.parentView.render();
        },
 
        trackEvent: function (callback) {
            Tracker.getInstance().trackEvent({
                category: 'sign-in',
                action: 'click',
                value: 1,
                callback: callback
            });
        },
 
        redirect: function (context, response) {
            var self = this;
            this.trackEvent(function () {
                self.refreshApplication(response);
            });
        },
 
        refreshApplication: function (response) {
            var application = this.application;
            var profileModel = ProfileModel.getInstance();
            var cartModel = LiveOrderModel.getInstance();
 
            response.user && profileModel.set(response.user);
            response.cart && cartModel.set(response.cart);
            response.address && profileModel.get('addresses').reset(response.address);
            response.creditcard && profileModel.get('creditcards').reset(response.creditcard);
            response.currency && response.currency.code && Session.set('currency', response.currency);
            response.touchpoints && (application.Configuration.siteSettings.touchpoints = response.touchpoints);
 
            application.Configuration.currentTouchpoint = 'shopping';

            this.parentView.isCustomizing = true;
            this.application.getLayout().closeModal();
            this.application.getLayout().headerViewInstance.render();
            this.parentView.render();
        },
 
        getContext: function() {
 
        }
    });
});
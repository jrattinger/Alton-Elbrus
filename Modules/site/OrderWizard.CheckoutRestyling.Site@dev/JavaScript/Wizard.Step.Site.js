define('Wizard.Step.Site', [
    'Wizard.Step',
    'Backbone',
    'underscore',
    'jQuery',
    'Utils'
], function WizardStepSite(
    WizardStep,
    Backbone,
    _,
    jQuery,
    Utils
) {
    var collapsibles_states = {};

    _.extend(WizardStep.prototype, {
        submitErrorHandler: function (error) {
			this.enableNavButtons();
			this.wizard.manageError(error, this);
            var self = this;
            var errorParents = [];

			_.each(this.moduleInstances, function (module_instance) {
				module_instance.enableInterface();
            });
            
            _.each(jQuery('p[data-validation-error="block"]'), function(errorDiv) {
                var parent = jQuery(errorDiv).parents('.order-wizard-module-body')[0];
                if (parent) {
                    parent = parent.id;
                }
                if (errorParents.indexOf(parent) === -1) {
                    errorParents.push(parent);
                }
            });

            _.each(jQuery('.global-views-message-error'), function(errorDiv) {
                var parent = jQuery(errorDiv).parents('.module-rendered')[0];
                var childOfParent = jQuery(parent).find('.order-wizard-module-body')[0];
                if (childOfParent) {
                    childOfParent = childOfParent.id;
                }
                if (errorParents.indexOf(childOfParent) === -1) {
                    errorParents.push(childOfParent);
                }
            });

            _.each(errorParents, function(parent) {
                if (!jQuery('#'+parent).hasClass('in')) {
                    jQuery('[data-target="#'+parent+'"]').click();
                }
            })
        },	
        
        submit: _.wrap(WizardStep.prototype.submit, function wrapSubmit(fn){
            _.each(jQuery('.order-wizard-module-body'), function (dropdownBody) {
                if (jQuery(dropdownBody).hasClass('in')) {
                    jQuery('[data-target="#'+jQuery(dropdownBody)[0].id+'"]').click();
                }
            })
			fn.apply(this, _.toArray(arguments).slice(1));
		})
    });
});
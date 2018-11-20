define('OrderWizard.Module.Confirmation.Site', [
    'OrderWizard.Module.Confirmation',
    'Backbone',
    'underscore',
    'jQuery',
    'Utils'
], function OrderWizardModuleConfirmationSite(
    OrderWizardModuleConfirmation,
    Backbone,
    _,
    jQuery,
    Utils
) {
    _.extend(OrderWizardModuleConfirmation.prototype, {
        getContext: _.wrap(OrderWizardModuleConfirmation.prototype.getContext, function(fn) {
            var retval = fn.apply(this, _.toArray(arguments).slice(1));

            retval.imageUrl = _.getAbsoluteUrl('../../../images/other/order-confirmation-img.jpg')
            
            return retval;
        })
    });
});
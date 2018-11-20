define('CreditCard.Edit.Form.View.Site', [
    'CreditCard.Edit.Form.View',
    'Backbone',
    'underscore',
    'jQuery',
    'Utils'
], function CreditCardEditFormViewSite(
    CreditCardEditFormView,
    Backbone,
    _,
    jQuery,
    Utils
) {
    _.extend(CreditCardEditFormView.prototype, {
        initialize: _.wrap(CreditCardEditFormView.prototype.initialize, function(fn) {
            fn.apply(this, _.toArray(arguments).slice(1));
            this.on('afterCompositeViewRender afterViewRender', function() {
                this.checkInputs();
            }, this);
        }),

        events: {
            'blur input': 'checkInputs',
        },

        checkInputs: function checkInputs(e) {
            _.each(this.$('input.required'), function(input) {
                if (jQuery(input).val() !== '') {
                    jQuery(input).addClass('not-empty');
                } else {
                    jQuery(input).removeClass('not-empty');
                }
            });
        }
    });
});
define('Address.Edit.FieldsView.Site', [
    'Address.Edit.Fields.View',
    'Address.Model',
    'Backbone',
    'underscore',
    'jQuery',
    'Utils'
], function AddressEditFieldsViewSite(
    AddressEditFieldsView,
    AddressModel,
    Backbone,
    _,
    jQuery,
    Utils
) {
    _.extend(AddressEditFieldsView.prototype, {
        initialize: _.wrap(AddressEditFieldsView.prototype.initialize, function(fn) {
            fn.apply(this, _.toArray(arguments).slice(1));
            this.on('afterCompositeViewRender afterViewRender', function() {
                this.checkInputs();
            }, this);
        }),

        events: _.extend(AddressEditFieldsView.prototype.events, {
            'blur input': 'checkInputs'
        }),

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
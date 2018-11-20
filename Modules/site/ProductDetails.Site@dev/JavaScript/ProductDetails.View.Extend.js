define('ProductDetails.View.Extend', [
    'ProductDetails.Full.View',
    'ProductDetails.Login.View',
    'ProductDetails.ItemOptions.View',
    'ProductDetails.ItemOptions.Model',
    'Profile.Model',
    'underscore'
], function ProductDetailsViewExtend(
    ProductDetailsFullView,
    ProductDetailsLoginView,
    ProductDetailsItemOptionsView,
    ProductDetailsItemOptionsModel,
    ProfileModel,
    _
) {
    'use strict';
 
    _.extend(ProductDetailsFullView.prototype, {
        initialize: _.wrap(ProductDetailsFullView.prototype.initialize, function initialize(fn) {
            fn.apply(this, _.toArray(arguments).slice(1));

            this.isCustomizing = false;
            this.profileModel = ProfileModel.getInstance();
 
            this.on('afterViewRender', function afterViewRender() {
                CMS.trigger('adapter:page:changed');
            });
        }),
 
        events: {
            'click [data-action="customize"]': 'initLogin'
        },
 
        initLogin: function initLogin() {
            if (this.profileModel.get('isLoggedIn') === 'T') {
                this.isCustomizing = true;
                this.render();
            } else {
                this.loginModalView = new ProductDetailsLoginView({
                    application: this.application,
                    parentView: this,
                    model: this.model
                })
 
                this.application.getLayout().showInModal(this.loginModalView, {
                    className: 'product-details-login-modal'
                });
            }
        },

        childViews: _.extend(ProductDetailsFullView.prototype.childViews, {
            'ProductDetails.ItemOptions': function () {
                var optionsModel = new ProductDetailsItemOptionsModel();
                
                var view = new ProductDetailsItemOptionsView({
                    model: optionsModel,
                    itemModel: this.model,
                    application: this.application
                });
                return view;
            }
        }),
 
        getContext: _.wrap(ProductDetailsFullView.prototype.getContext, function getContext(fn) {
            var content = fn.apply(this, _.toArray(arguments).slice(1));
            var itemModel = this.model.get('item');
            var primaryCategory;
            var category = itemModel.get('commercecategory');
 
            if (category.primarypath && category.primarypath.length > 0) {
                primaryCategory = category.primarypath[0].name;
                primaryCategory = primaryCategory.replace(/\s/g, '')
            }

            content.isCustomizable = false;
            if (itemModel.get('custitem_sca_item_category') && itemModel.get('custitem_sca_cat_item_options').split(', ').length && itemModel.get('itemtype') !== 'GiftCert') {
                content.isCustomizable = true;
            }

            content.primaryCategory = primaryCategory;
            content.isCustomizing = this.isCustomizing;
            return content;
        })
    });
});
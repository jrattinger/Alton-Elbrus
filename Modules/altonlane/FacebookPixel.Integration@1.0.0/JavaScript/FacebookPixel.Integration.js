define('FacebookPixel.Integration', [
  'Backbone',
  'Backbone.FormView',
  'FacebookPixel',

  'ProductDetails.Base.View',
  'Cart.AddToCart.Button.View',
  'Facets.Browse.View',

  'underscore'
], function FacebookPixelIntegration(
  Backbone,
  BackboneFormView,
  FacebookPixel,

  ProductDetailsBaseView,
  CartAddToCartButtonView,
  FacetsBrowseView,

  _
) {
  'use strict';

  return {
    mountToApp: function initialize() {
      // init search pages
      this._searchExtension();

      // init add to cart
      this._addToCartExtension();

      // init pdp extension
      this._pdpExtension();
    },

    _searchExtension: function searchExtension() {
      FacetsBrowseView.prototype.showContent = _.wrap(FacetsBrowseView.prototype.showContent, function(fn) {
        fn.apply(this, _.toArray(arguments).slice(1));

        var keywords = this.translator.getOptionValue('keywords');
        if (keywords) {
          FacebookPixel.track('Search', {
            search_string: keywords
          });
        }
      });
    },

    _addToCartExtension: function addToCartExtension() {
      CartAddToCartButtonView.prototype.addToCart = _.wrap(CartAddToCartButtonView.prototype.addToCart, function(fn) {
        fn.apply(this, _.toArray(arguments).slice(1));

        FacebookPixel.track('AddToCart', {
          content_name: this.model.get('item').get('_name'),
          content_ids: [this.model.get('item').get('itemid')],
          content_type: 'product',
          value: this.model.get('item').get('pricelevel6'),
          currency: SC.ENVIRONMENT.siteSettings.sitecurrency[0].code
        });
      });
    },

    _pdpExtension: function pdpExtension() {
      ProductDetailsBaseView.prototype.initialize = _.wrap(ProductDetailsBaseView.prototype.initialize, function(fn) {
        fn.apply(this, _.toArray(arguments).slice(1));

        FacebookPixel.track('ViewContent', {
          content_name: this.model.get('item').get('_name'),
          content_ids: [this.model.get('item').get('itemid')],
          content_type: 'product',
          value: this.model.get('item').get('pricelevel6'),
          currency: SC.ENVIRONMENT.siteSettings.sitecurrency[0].code
        });
      });
    }
  }
});

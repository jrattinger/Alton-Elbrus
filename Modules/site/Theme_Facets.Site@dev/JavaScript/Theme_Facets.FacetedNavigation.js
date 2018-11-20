define('Theme_Facets.FacetedNavigation', [
    'Profile.Model',
    'Facets.FacetedNavigationItem.View',
    'Facets.FacetedNavigation.View',
    'SC.Configuration',

    'Backbone.CollectionView',
    'Backbone',
    'underscore',
    'jQuery',
    'Utils'
], function(
    ProfileModel,
    FacetsFacetedNavigationItemView,
    FacetsFacetedNavigationView,
    Configuration,

    BackboneCollectionView,
    Backbone,
    _,
    jQuery,
    Utils
) {
    var selectedFacet = '';
    //var collapsibles_states = {};

    _.extend(FacetsFacetedNavigationItemView.prototype, {
        getContext: _.wrap(FacetsFacetedNavigationItemView.prototype.getContext, function(fn) {
            var context = fn.apply(this, _.toArray(arguments).slice(1));
            var isActive = false;
            if (context.facetId === selectedFacet) {
                isActive = true;
            } else if (context.facetId === 'custitem_web_color_filter' && selectedFacet === '') {
                isActive = true;
            }
            else if (context.facetId == "custitemcustitem_web_accessory_filter") {
                var colorFacet = this.model.collection.findWhere({id: 'custitem_web_color_filter'});
                if (!colorFacet || !colorFacet.get('values') || !colorFacet.get('values').length) {
                    isActive = true;
                }
            }
            return _.extend(context, {
                showHeading: this.options.isHeading ? context.showHeading : false,
                showOptions: (!this.options.isHeading && _.isDesktopDevice()) || this.options.showOptions,
                isActive: isActive,
                isCentered: this.model.get('values') ?  this.model.get('values').length < 4 : false
            });
        })
    });

    
    var collapsibles_states = {};
    _.extend(FacetsFacetedNavigationView.prototype, {
        initialize: _.wrap(FacetsFacetedNavigationView.prototype.initialize, function(fn) {
            fn.apply(this, _.toArray(arguments).slice(1));
            
            this.on('afterCompositeViewRender afterViewRender', function() {
                this.resetCollapsibleStates();
            }, this);
        }),

        storeCollapsibleStates: function storeCollapsibleStates(e) {
            e.preventDefault();
			jQuery('.collapse').each(function (index, element) {
				collapsibles_states[Utils.getFullPathForElement(element)] = jQuery(element).hasClass('in');
            });
		},

		resetCollapsibleStates: function resetCollapsibleStates() {
			var self = this;
			_.each(collapsibles_states, function (is_in, element_selector) {
				self.$(element_selector)[ is_in ? 'addClass' : 'removeClass' ]('in').css('height',  is_in ? 'auto' : '0');
            });
        },
        events: {
            'click [data-toggle="collapse"]': 'changeFilter',
            'click .facets-faceted-navigation-item-facet-text': 'storeCollapsibleStates',
            'click .facets-faceted-navigation-item-color-picker-color': 'storeCollapsibleStates',
            'click .facets-faceted-navigation-item-color-text': 'storeCollapsibleStates'
        },

        changeFilter: function changeFilter(e) {
            if(jQuery('.in').length > 0 && !jQuery(jQuery(e.currentTarget).data('target')).hasClass('in')) {
                e.stopPropagation();
                jQuery('.in').removeClass('in');
                jQuery(jQuery(e.currentTarget).data('target')).addClass('in');
                jQuery('.facets-faceted-navigation-item-facet-group-title-container').addClass('collapsed');
                jQuery(e.currentTarget).removeClass('collapsed');
            }
        }
    });

    _.extend(FacetsFacetedNavigationView.prototype.childViews, {
        'Facets.FacetedNavigationItems.Header': function() {
            var translator = this.options.translator;
            var ordered_facets = this.options.facets && this.options.facets.sort(function (a, b) {
                return (translator.getFacetConfig(b.url || b.id).priority || 0) - (translator.getFacetConfig(a.url || a.id).priority || 0);
            });
            var hidden_facet_names = Configuration.get('loginToSeePrices.hiddenFacetNames', []);
            if (ProfileModel.getInstance().hidePrices()) {
                ordered_facets = _.reject(ordered_facets, function (item) {
                    return _.indexOf(hidden_facet_names, item.id) >= 0;
                });
            }

            var filteredOrderedFacets = _.filter(ordered_facets, function(facet) {
                return facet.values.length > 0;
            });
            
            return new BackboneCollectionView({
                childView: FacetsFacetedNavigationItemView,	
                viewsPerRow: 1,
                collection: new Backbone.Collection(filteredOrderedFacets),
                childViewOptions: {
                    translator: translator,
                    isHeading: true,
                    showOptions: !_.isDesktopDevice()
                }
            });
        },

        'Facets.FacetedNavigationItems': function() {
            var translator = this.options.translator;
            var ordered_facets = this.options.facets && this.options.facets.sort(function (a, b) {
                return (translator.getFacetConfig(b.url || b.id).priority || 0) - (translator.getFacetConfig(a.url || a.id).priority || 0);
            });
            var hidden_facet_names = Configuration.get('loginToSeePrices.hiddenFacetNames', []);
            if (ProfileModel.getInstance().hidePrices()) {
                ordered_facets = _.reject(ordered_facets, function (item) {
                    return _.indexOf(hidden_facet_names, item.id) >= 0;
                });
            }

            var filteredOrderedFacets = _.filter(ordered_facets, function(facet) {
                return facet.values.length > 0;
            });
            
            return new BackboneCollectionView({
                childView: FacetsFacetedNavigationItemView,	
                viewsPerRow: 1,
                collection: new Backbone.Collection(filteredOrderedFacets),
                childViewOptions: {
                    translator: translator
                }
            });
        }
    });

});
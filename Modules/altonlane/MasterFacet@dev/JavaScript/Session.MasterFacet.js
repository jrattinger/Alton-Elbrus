/* eslint-disable */
define('Session.MasterFacet',
    [
        'Session',
        'underscore',
        'SC.Configuration'
    ],

    function(
        Session,
        _,
        Configuration
    ) {


    /*
        This module allows adding master facets to all searches. It iterates among the master facets added to the
        configuration and applies the facet. What you should add to the configuration:
        masterFacets: [
         {
             facetId: 'custitem_sc_display_b2b', <-- item field id
             hideFromSearch: true, <-- determines whether the facet is displayed on the facet navigation
             onlyHideFromSearch: false, <-- used for cases when the facet is used for merchandising rules
             facetValue: function facetValue() <-- function invoked to get the facet value to apply.
             {
                 return 'T';
             }
         },

        ]

    */

    if (Configuration.searchApiMasterOptions && Configuration.searchApiMasterOptions.Facets) {
        Configuration.searchApiMasterOptions.Facets.custitem_web_display_as_swatch = 'false';
    }

    _.extend(Session, {

        getSearchApiParams: _.wrap(Session.getSearchApiParams, function(fn)
        {
            var search_api_params = fn.apply(this, _.toArray(arguments).slice(1)),
                masterFacets = Configuration.masterFacets;

            if (SC.isPageGenerator()) {
              masterFacets.push(
                  {
                      facetId: 'custitem_web_display_categories',
                      hideFromSearch: true,
                      onlyHideFromSearch: true
                  },
                  {
                      facetId: 'custitem_web_display_as_swatch',
                      hideFromSearch: true,
                      onlyHideFromSearch: true
                  },
                  {
                      facetId: 'custitem_ef_gw_is_giftwrap',
                      hideFromSearch: true,
                      onlyHideFromSearch: true
                  }
              )
            }

            _.each(masterFacets, function(masterFacet)
            {
                var facetId = masterFacet.facetId;

                if(!masterFacet.onlyHideFromSearch) {
                    var facetValue = masterFacet.facetValue();
                    if(facetValue){
                        search_api_params[facetId] = facetValue;
                    }
                }

                if(masterFacet.hideFromSearch || masterFacet.onlyHideFromSearch)
                {
                    _.extend(search_api_params, {
                        'facet.exclude': search_api_params['facet.exclude'] ?
                        search_api_params['facet.exclude'] + ',' + facetId : facetId
                    });
                }
            });

            var region = this.get('subsidiary');
            region && (search_api_params['region'] = region);

            return search_api_params;
        })

    });
});

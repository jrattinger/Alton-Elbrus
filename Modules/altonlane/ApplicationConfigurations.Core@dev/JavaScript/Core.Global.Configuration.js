/* eslint-disable */
define('Core.Global.Configuration', [
    'SC.Configuration'
], function SiteGlobalConfiguration(
    Configuration
) {
    'use strict';

    /* Add your global config here. It will be merged in the specific app config, not here */

    return {
        masterFacets: [
            {
                facetId: 'custitem_web_display_as_swatch',
                hideFromSearch: true,
                onlyHideFromSearch: true
            },
            {
                facetId: 'custitem_web_display_categories',
                hideFromSearch: true,
                onlyHideFromSearch: true
            },
            {
                facetId: 'custitem_ef_gw_is_giftwrap',
                hideFromSearch: true,
                onlyHideFromSearch: true
            }
        ]
    };
});

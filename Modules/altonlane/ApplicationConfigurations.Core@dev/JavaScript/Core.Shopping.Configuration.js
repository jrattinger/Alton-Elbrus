/* eslint-disable */
define('Core.Shopping.Configuration', [
    'SC.Shopping.Configuration',
    'Core.Global.Configuration',
    'underscore',
    'Utils'
], function SiteCheckoutConfiguration(
    ShoppingConfiguration,
    GlobalConfiguration,
    _
) {
    'use strict';

    ShoppingConfiguration.modulesConfig = ShoppingConfiguration.modulesConfig || {};

    _.extend(ShoppingConfiguration, GlobalConfiguration);

    return {
        mountToApp: function mountToApp(application) {
            _.extend(application.Configuration, ShoppingConfiguration);
        }
    };
});

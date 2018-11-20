define('AltonLaneFooter.View', [
    'Footer.View',
    'PluginContainer',
    'underscore',
    'SC.Configuration',
    'Utils'
],
    function AltonLaneFooterView(
        SiteFooterView,
        PluginContainer,
        _,
        Configuration,
        Utils
    ) {
        'use strict';
 
        return {
            mountToApp: function mountToApp() {
                var socialMediaLinks = Configuration.get('footer.socialMediaLinks', []);
 
                SiteFooterView.prototype.preRenderPlugins =
                    SiteFooterView.prototype.preRenderPlugins || new PluginContainer();
 
                SiteFooterView.prototype.preRenderPlugins.install({
                    name: 'themeHorizonFooter',
                    execute: function execute($el /* , view */) {
                        $el.find('[data-view="LowerText"]')
                            .html(_(Configuration.get('footer.text', '')).translate());
                    }
                });
 
                SiteFooterView.prototype.installPlugin('postContext', {
                    name: 'themeHorizonContext',
                    priority: 10,
                    execute: function execute(context) {
                        _.extend(context, {
                            iconClass: Configuration.get('footer.icon'),
                            title: Configuration.get('footer.title'),
                            socialMediaLinks: socialMediaLinks,
                            socialMediaLinksTitle: Configuration.get('footer.socialMediaLinksTitle'),
                            logoUrl: Utils.getAbsoluteUrlOfNonManagedResources(Configuration.get('header.logoUrl')),
                            isMobile: Utils.getViewportWidth() <= 992
                        });
                    }
                });
            }
        };
    });
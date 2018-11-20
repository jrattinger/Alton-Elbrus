define('SocialSharing.Plugins.Pinterest.Hover.Site', [
	'SocialSharing.Plugins.Pinterest.Hover',
	'SC.Configuration',
	'Backbone.View',
	'underscore'
], function SocialSharingPluginsPinteresHoverSite(
	SocialSharingPluginsPinteresHover,
	Configuration,
	BackboneView,
	_
) {
	'use strict';

	// All of this just to remove the "Pinit" text inside the Pinterest hover icon
	_.extend(SocialSharingPluginsPinteresHover, {
		mountToApp: function (application) {
			if (Configuration.get('pinterest.enableHover'))
			{
				var layout = application.getLayout();

				// This are mostly related to the dom, or to events, so we add them in the layout
				_.extend(layout, {
					shareInPinterest: this.shareInPinterest
				});

				// extend Layout and add event listeners
				_.extend(layout.events, {
					'click [data-action="share-in-pinterest-hover"]': this.shareInPinterestHoverEventListener
				});

				//@class SocialSharing.Pinterest.Plugin @extends Plugin
				BackboneView.postRender.install({
					name: 'pinterestPluginHover'
				,	priority: 10
				,	execute: function ($el)
					{
						if (!$el.find('[data-action="share-in-pinterest-hover"]').length)
						{
							$el.find('[data-type="social-share-icons-hover"]').append('<a href="#" class="social-sharing-flyout-content-social-pinterest" data-action="share-in-pinterest-hover"><i class="social-sharing-flyout-content-social-pinterest-icon"></i></a>');
						}
					}
				});
			}
		}
	});
});

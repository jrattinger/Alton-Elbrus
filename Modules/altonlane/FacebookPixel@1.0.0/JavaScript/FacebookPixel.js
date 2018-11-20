/*
	© 2017 NetSuite Inc.
	User may not copy, modify, distribute, or re-bundle or otherwise make available this code;
	provided, however, if you are an authorized user with a NetSuite account or log-in, you
	may use this code subject to the terms that govern your access and use.
*/
(function(win, name, src, fn, t, s) {
		win.FacebookPixelObject = name;
    if (win[name]) return;
    fn = win[name] = function() {
        fn.callMethod ? fn.callMethod.apply(fn, arguments) : fn.queue.push(arguments)
    };
    if (!win['_' + name]) win['_' + name] = fn;
    fn.push = fn;
    fn.loaded = !0;
    fn.version = '2.0';
    fn.queue = [];
		t = document.createElement('script');
    t.async = !0;
    t.src = src;
    s = document.getElementsByTagName('script')[0];
    s.parentNode.insertBefore(t, s)


	//@module FacebookPixel
	define('FacebookPixel', [
	  'Backbone',
	  'SC.Configuration',
	  'underscore',
		'jQuery'
	], function FacebookPixel(
	  Backbone,
	  Configuration,
	  _,
		jQuery
	) {
	  'use strict';

	  return {
			tracking: null,
	    _init: function init() {
	      	win[name]('init', this.tracking.pixelID);
					win[name]('track', 'PageView');
	    },

	    // @param {String} event
	    // @param {Object} data
	    // @return {Void}
	    track: function track(event, data) {
	      win[name]('track', event, data);
	    },

	    // @param {String} event
	    // @param {Object} data
	    // @return {Void}
	    trackCustom: function trackCustom(event, data) {
	      win[name]('trackCustom', event, data);
	    },

	    // @param {none}
	    // @return {Void}
	    // @private
	    _loadScript: function loadScript() {
				var self = this;

				if (SC.ENVIRONMENT.jsEnvironment === 'browser') {
					jQuery.getScript(src).done(function(){
						self._init();
					});
				}
	    },

	    mountToApp: function mountToApp(application) {
				this.tracking = application.getConfig('tracking.facebookPixel') || null;

	      // if track page view needs to be tracked
	      if (this.tracking && this.tracking.pixelID) {
	        // the facebookpixel script is only loaded if we are on a browser
	        application.getLayout().once('afterAppendView', jQuery.proxy(this, '_loadScript'));
	      }
	    }
	  };
	});
})(window, 'fbq', 'https://connect.facebook.net/en_US/fbevents.js');

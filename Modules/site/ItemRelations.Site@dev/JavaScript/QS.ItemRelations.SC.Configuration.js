

 /*
* Copyright NetSuite, Inc. 2015 All rights reserved.
* The following code is a demo prototype. Due to time constraints of a demo,
* the code may contain bugs, may not accurately reflect user requirements
* and may not be the best approach. Actual implementation should not reuse
* this code without due verification.

* @Author: mgaricoits
* @Date:   12/5/16
* @Edited: heaston
*/

define('QS.ItemRelations.SC.Configuration', [
    'underscore',
    'SC.Configuration'
],
function QSItemRelations(
    _
) {
    'use strict';

    return {
        mountToApp: function mountToApp() {
            if (SC.CONFIGURATION.bxSliderDefaults && SC.CONFIGURATION.bxSliderDefaults.slideWidth) {
                var slides = 3;
                var slideWidth = 260;

                if(_.getViewportWidth() < 992) {
                    slideWidth = 327;
                }

                if (_.getViewportWidth() < 600) {
                    slides = 2;
                    slideWidth = 295;
                }

                SC.CONFIGURATION.bxSliderDefaults.slideWidth = slideWidth;
                SC.CONFIGURATION.bxSliderDefaults.maxSlides = slides;
                SC.CONFIGURATION.bxSliderDefaults.minSlides = slides;
            }
        }
    };
});

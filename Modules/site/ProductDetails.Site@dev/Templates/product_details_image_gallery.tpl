<div class="product-details-image-gallery">
    {{#if showImages}}
        <div class="product-details-image-gallery-thumbnails">
            {{#each images}}
                <div class="product-details-image-gallery-thumbnails-container">
                    <a id="image-{{@index}}" data-action="switch-image">
                        <img
                        src="{{resizeImage url ../imageResizeId}}"
                        alt="{{altimagetext}}"
                        itemprop="image"
                        data-loader="false">
                    </a>
                </div>
            {{/each}}
        </div>
        <div class="product-details-image-gallery-image">
            {{#with firstImage}}
                <div class="product-details-image-gallery-detailed-image" data-zoom>
                    <img
                        class="center-block"
                        src="{{resizeImage url ../imageResizeId}}"
                        alt="{{altimagetext}}"
                        itemprop="image"
                        data-loader="false">
                </div>
            {{/with}}
        </div>
    {{/if}}
    <div data-view="SocialSharing.Flyout.Hover"></div>
</div>
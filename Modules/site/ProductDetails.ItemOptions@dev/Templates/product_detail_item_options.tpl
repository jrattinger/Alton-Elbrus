<div class="product-detail-item-options-container">
    {{#if isLoaded}}
        <h3 class="product-detail-item-options-header">Let's personalize your garment</h3>

        <div class="product-details-item-options" data-view="Options.Tiles"></div>

        {{#if showImage}}
            <div class="product-detail-item-options-image">
                {{#if image}}
                    <img src="{{image}}">
                {{else}}
                    <div class="product-detail-item-options-image-unavailable">No Image Available</div>
                {{/if}}
            </div>
        {{/if}}

        <div class="product-detail-item-options-description">
            {{{description}}}
        </div>

        <div class="product-detail-item-options-navigation">
            <div class="product-detail-item-options-button-container">
                <button class="product-detail-item-options-button" data-action="change-option" data-direction="back" {{#if isFirstOption}} disabled {{/if}}>
                    <i class="product-detail-item-options-back-button-icon"></i>
                    <span class="product-detail-item-options-back-button-text">Back</span>
                </button>
            </div>
            <div class="product-detail-item-options-button-container">
                {{#if isLastOption}}
                    <button class="product-detail-item-options-add-to-cart-button" data-action="add-to-cart">
                        <span class="product-detail-item-options-back-button-text">{{finishButton}}</span>
                    </button>
                {{else}}
                    <button class="product-detail-item-options-button" data-action="change-option" data-direction="next" {{#unless isNextAvailable}}disabled{{/unless}}>
                        <span class="product-detail-item-options-back-button-text">Next</span>
                        <i class="product-detail-item-options-next-button-icon"></i>
                    </button>
                {{/if}}
            </div>
        </div>
    {{else}}
        <h2 class="product-detail-item-options-header">Loading...</h2>
    {{/if}}
</div>
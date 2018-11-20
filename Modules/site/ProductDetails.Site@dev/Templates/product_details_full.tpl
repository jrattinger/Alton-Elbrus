<div class="product-details-full">
 
    <div data-cms-area="item_details_banner" data-cms-area-filters="page_type"></div>
 
    <header class="product-details-full-header">
        <div id="banner-content-top" class="product-details-full-banner-top"></div>
    </header>
 
    <article class="product-details-full-content" itemscope itemtype="https://schema.org/Product">
        <meta itemprop="url" content="{{itemUrl}}">
        <div id="banner-details-top" class="product-details-full-banner-top-details"></div>
 
        <section class="product-details-full-main-content {{#unless isCustomizable}}pdp-normal{{/unless}}">

            <div class="product-details-full-main-content-left">
                <div class="product-details-full-image-gallery-container">
                    <div id="banner-image-top" class="content-banner banner-image-top"></div>
                    <div data-view="Product.ImageGallery"></div>
                    <div id="banner-image-bottom" class="content-banner banner-image-bottom"></div>
                </div>
            </div>
            <div class="product-details-full-content-header">
                {{#if isCustomizable}}
                    {{#if isCustomizing}}
                        <div data-view="ProductDetails.ItemOptions"></div>
                    {{else}}
                        <h1 class="product-details-full-content-header-title" itemprop="name">{{pageHeader}}</h1>
                        <div data-cms-area="item_info" data-cms-area-filters="path"></div>
                        <div data-view="Product.Price"></div>
                        <section data-view="Product.Information"></section>
                        <button data-action="customize" class="product-details-full-content-customize-button">Customize Now</button>
                        
                    {{/if}}
                {{else}}
                    <h1 class="product-details-full-content-header-title" itemprop="name">{{pageHeader}}</h1>
                    <div data-cms-area="item_info" data-cms-area-filters="path"></div>
                    {{#if isItemProperlyConfigured}}
                        <form id="product-details-full-form" data-action="submit-form" method="POST">
                            <div data-view="Product.Price"></div>
                            <section data-view="Product.Information"></section>
                            <section data-view="Product.Options"></section>
                            
                            {{#if isPriceEnabled}}
                                <div data-view="Quantity"></div>

                                <section class="product-details-full-actions">

                                    <div class="product-details-full-actions-container">
                                        <div data-view="MainActionView"></div>
                                    </div>

                                    <div class="product-details-full-actions-container">
                                        <div data-view="AddToProductList" class="product-details-full-actions-addtowishlist"></div>
                                    </div>

                                </section>
                            {{/if}}
                            <div data-view="SocialSharing.Flyout" class="product-details-full-social-sharing"></div>
                        </form>
                    {{else}}
                         <div data-view="GlobalViewsMessageView.WronglyConfigureItem"></div>
                    {{/if}}
                {{/if}}
            </div>
        </section>
        <div class="category-info-container">
            <div class="category-info-content" id="category-info-{{primaryCategory}}" data-cms-area="item_info_bottom_{{primaryCategory}}" data-cms-area-filters="global"></div>
        </div>
 
        <!--<div data-view="ProductReviews.Center"></div>-->
 
        {{!-- <div class="product-details-full-content-related-items">
            <div data-view="Related.Items"></div>
        </div> --}}
 
        {{!-- <div class="product-details-full-content-correlated-items">
            <div data-view="Correlated.Items"></div>
        </div> --}}
        <div id="banner-details-bottom" class="content-banner banner-details-bottom" data-cms-area="item_details_banner_bottom" data-cms-area-filters="page_type"></div>
    </article>
</div>
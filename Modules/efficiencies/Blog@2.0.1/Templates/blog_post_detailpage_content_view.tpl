<section itemscope itemtype="http://schema.org/LiveBlogPosting" class="blog-details-main-content">
<meta itemscope itemprop="mainEntityOfPage" itemType="https://schema.org/WebPage" itemid="{{url}}"/>
    <div class="blog-details-content-header">
        <h1 class="blog-details-content-header-title" itemprop="name">{{title}}</h1>
        <p class="blog-details-content-header-title">
            <span itemprop="datePublished" content="2016-02-29T04:02">{{date}}</span>
            <p class="blog-detail-hide-elem" itemscope itemtype="http://schema.org/Organization">
                <span itemprop="sponsor" itemscope itemtype="http://schema.org/Organization">
                  <span class="blog-detail-hide-elem" itemprop="name">{{displayName}}</span>
                </span>
            </p>
            {{translate 'by'}}
            <span itemprop="author" itemtype="http://schema.org/Person">
                <span itemprop="author">{{name}}</span>
            </span>
        </p>
        <span class="blog-detail-hide-elem" itemprop="dateModified" content="2016-02-29T04:02">{{dateModified}}</span>
    </div>
    <div class="blog-details-divider"></div>
    <div class="blog-details-image-gallery-container">
        <div id="banner-image-top" class="content-banner banner-image-top"></div>
        <div data-view="ItemDetails.ImageGallery">
              <div class="blog-details-image-gallery">
                <div class="blog-details-image-gallery-detailed-image">
                 {{#if detailimage.name}}
                    <img class="center-block" src="{{detailimage.name}}" data-type="social-image" itemprop="image" data-loader="false">
                {{else}}
                    <img class="center-block" src="{{image.name}}" data-type="social-image" itemprop="image" data-loader="false">
                {{/if}}
                </div>
              </div>
        </div>
        <div id="banner-image-bottom" class="content-banner banner-image-bottom"></div>
    </div>
    <div class="blog-details-divider"></div>
    <div class="blog-details-main">
    </div>
    <div class="blog-details-divider"></div>
    {{# if content}}
        <div role="tabpanel">
            <div class="blog-details-tab-content">
                <div role="tabpanel" class="blog-details-tab-content-panel active" id="blog-details-info-tab-0" itemprop="description">
                    <div class="blog-details-content-container"><span itemprop="articleBody"> {{{content}}} </span> </div>
                </div>
            </div>
        </div>
    {{/if}}
    {{#if tags}}
        <div role="tabpanel">
            <div class="blog-details-tab-content">
                <h3>{{translate 'TAGGED WITH'}}: </h3>
                <div role="tabpanel" class="blog-details-tab-content-panel active" id="blog-details-info-tab-0" itemprop="description">
                    <div class="blog-details-content-container">
                        <ul itemprop="keywords" id ="tagged_linked"></ul>
                    </div>
                </div>
            </div>
        </div>
    {{/if}}
</section>
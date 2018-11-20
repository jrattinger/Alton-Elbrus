<div data-cms-area="blog_post_details" data-cms-area-filters="page_type"></div>
    <section class="blog-tag-details-main-content" itemtype="http://schema.org/BlogPosting">
    <meta itemscope itemprop="mainEntityOfPage" itemType="https://schema.org/WebPage" itemid="{{url}}"/>
        <div class="blog-tag-details-image-gallery-container">
            <h1 class="blog-tag-details-content-header-title">
                <span itemprop="name">{{translate 'TAG'}}: {{name}} </span>
            </h1>
        </div>
        <div role="tabpanel">
            {{# if description}}
                <div class="blog-tag-details-tab-content">
                    <div role="tabpanel" class="blog-tag-details-tab-content-panel active" id="blog-tag-details-info-tab-0" itemprop="description">
                        <div class = "blog-tag-details-content-container"><span itemprop="articleBody">{{{description}}}</span></div>
                    </div>
                </div>
            {{/if}}
        </div>
        <div class="blog-tag-details-divider"></div>
    </section>
<header>
    <h1 class="blog-title">
        {{translate 'Blog'}}
    </h1>
    <nav class="blog-list-header">
        <div class="blog-list-header-actions"></div>
        <div class="blog-list-header-filters collapse" id="list-header-filters">
            <div class="blog-list-header-filters-wrapper">
                <div class="blog-list-header-filters-row">
                    <div class="blog-list-header-filter-column">
                    </div>
                    <div class="blog-list-header-filter-column">
                    </div>
                </div>
            </div>
        </div>
    </nav>
</header>
<div class="blog-details-divider-desktop"></div>
<div class="blog-browse-content">

<div data-cms-area="blog_navigation_top" data-cms-area-filters="page_type"></div>

<div class="blog-navigation-main">
    <div  data-action="pushable" data-id="pushable-filter">
        <div class="blog-navigation-item-facet-group" id="#tagLatest5" data-type="render-tags" data-blog-id="#tagLatest5">
            <h4 class="blog-navigation-item-facet-group-title">
                    <a data-toggle="collapse" data-target="#blogs-tagaccordion-id" aria-expanded="false">
                        {{translate 'Recent Tags'}}
                        <i class="acordion-head-toggle-icon"></i>
                    </a>
            </h4>
            <div class="in" id="blogs-tagaccordion-id">
                <div class="collapse in  blog-navigation-item-facet-group-wrapper">
                    <div class="blog-navigation-item-facet-group-content">
                       <ul class="blog-navigation-item-facet-optionlist" data-view="Blog.Tags.Navigation"></ul>
                    </div>
                    <ul class="blog-navigation-item-facet-optionlist">
                        <li><a href="/blog/tag/list" class="blog-navigation-item-optionlist-extra-button">{{translate 'See More'}}</a></li>
                    </ul>
                </div>
            </div>
        </div>

        <div class="blog-navigation-item-facet-group" id="#blogLatest5" data-type="render-tags" data-blog-id="#blogLatest5">
            <h4 class="blog-navigation-item-facet-group-title">
                    <a data-toggle="collapse" data-target="#blogs-itemaccordion-id" aria-expanded="false">
                        {{translate 'Recent Posts'}}
                        <i class="acordion-head-toggle-icon"></i>
                    </a>
            </h4>
            <div class="in" id="blogs-itemaccordion-id">
                <div class="collapse in blog-navigation-item-facet-group-wrapper">
                    <div class="blog-navigation-item-facet-group-content">
                       <ul class="blog-navigation-item-facet-optionlist" data-view="Blog.Post.Navigation"></ul>
                    </div>
                </div>
            </div>
        </div>
        {{#if hideArchive}}
            <div class="blog-navigation-item-facet-group" id="#blogarchive" data-type="render-tags" data-blog-id="#blogarchive">
                <h4 class="blog-navigation-item-facet-group-title">
                        <a data-toggle="collapse" data-target="#blogs-archiveaccordion-id" aria-expanded="false">
                            {{translate 'Archive'}}
                            <i class="acordion-head-toggle-icon"></i>
                        </a>
                </h4>
                <div class="in" id="blogs-archiveaccordion-id">
                    <div class="collapse in blog-navigation-item-facet-group-wrapper">
                        <div class="blog-navigation-item-facet-group-content">
                           <ul class="blog-navigation-item-facet-optionlist" data-view="Blog.Archive.Navigation"></ul>
                        </div>
                    </div>
                </div>

            </div>
        {{/if}}
</div>
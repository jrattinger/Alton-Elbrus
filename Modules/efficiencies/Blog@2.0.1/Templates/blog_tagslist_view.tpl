<section class="blog-main">
    <div data-view="Blog.ChildViews"></div>

    <div class="blog-tag-results">
        <button class="blog-browse-list-header-filter-tag" data-type="sc-pusher" data-target="pushable-filter">{{translate 'Navigation'}}
            <i class ="blog-browse-list-header-filter-tag-icon"></i>
        </button>

        <div class="blog-allTags-label">
            <h3 itemprop="name" class="panel-title">{{ translate 'All Tags' }}</h3>
        </div>
        <div class="blog-details-divider-desktop"></div>

        <div class="panel-body">
            <!-- display all tags -->
            <div class="blog-tags-results" data-view="Blog.Tags.Content">

            </div>

        </div>
    </div>
    <div data-cms-area="blog_tags_bottom" data-cms-area-filters="page_type"></div>
</div>
</section>
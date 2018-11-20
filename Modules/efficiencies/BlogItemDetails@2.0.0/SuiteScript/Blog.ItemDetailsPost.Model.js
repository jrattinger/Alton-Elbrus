define('Blog.ItemDetailsPost.Model', [
    'SC.Model',
    'SearchHelper'
], function BlogPostModel(
    SCModel,
    SearchHelper
) {
    'use strict';

    var resultsPerPage = SC.Configuration && SC.Configuration.blog.resultsPerPage;

    return SCModel.extend({
        name: 'BlogPost',
        siteId: session.getSiteSettings(['siteid']).siteid,
        record: 'customrecord_ef_b_blog_post',
        sort: 'internalid',
        sortOrder: 'desc',
        resultsPerPage: resultsPerPage,
        columns: {
            id: { fieldName: 'internalid', sort: 'desc' },
            title: { fieldName: 'custrecord_ef_b_bp_title' },
            html: { fieldName: 'custrecord_ef_b_bp_html' },
            post_date: { fieldName: 'custrecord_ef_b_bp_post_date' },
            displayWebSite: { fieldName: 'custrecord_ef_b_bp_display_in_website' },
            tags: { fieldName: 'custrecord_ef_b_bp_tags', type: 'getText' },
            availableSites: { fieldName: 'custrecord_ef_b_bp_available_in_websites' },
            owner: { fieldName: 'owner', type: 'getText' },
            thumbnailImage: { fieldName: 'custrecord_ef_b_bp_image_thumbnail', type: 'file' },
            detailimage: { fieldName: 'custrecord_ef_b_bp_detail_img', type: 'file' },
            url: { fieldName: 'custrecord_ef_b_bp_url' },
            metaTags: { fieldName: 'custrecord_ef_b_bp_metataghtml' },
            last_modefied: { fieldName: 'lastmodified' }
        },

        filters: [
            { fieldName: 'custrecord_ef_b_bp_display_in_website', operator: 'is', value1: 'T' }
        ],

        listBlogPost: function listBlogPost(tagId) {
            var blog;
            var search;
            var tagArray;

            search = new SearchHelper(
                this.record,
                this.filters,
                this.columns,
                null,
                null,
                null,
                this.sort,
                this.sortOrder
            );


            if (tagId) {
                // add a filter to filter Post by tags

                tagArray = tagId.split(',');
                search.addFilter({
                    fieldName: this.columns.tags.fieldName,
                    operator: 'anyof',
                    value1: tagArray
                });
            }

            search.addFilter({
                fieldName: this.columns.availableSites.fieldName,
                operator: 'anyof',
                value1: this.siteId
            });

            blog = search.search().getResults();

            if (!blog) {
                throw notFoundError;
            }

            return blog;
        }
    });
});

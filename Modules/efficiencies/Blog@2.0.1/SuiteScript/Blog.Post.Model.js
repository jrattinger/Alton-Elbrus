define('Blog.Post.Model', [
    'SC.Model',
    'SearchHelper',
    'Configuration'
], function BlogPostModel(
    SCModel,
    SearchHelper,
    Configuration
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

        listBlogPost: function listBlogPost(tagId, page, month, year, day) {
            var blog;
            var search;
            var fromDate;
            var toDate;
            var tagArray;
            var dateFormat = Configuration.get('blog.dateformat').split('/');

            search = new SearchHelper(
                this.record,
                this.filters,
                this.columns,
                null,
                this.resultsPerPage,
                page || 1,
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

            if (month && year) {
                if (dateFormat[0] === 'dd' && dateFormat[1] === 'MM' && dateFormat[2] === 'yyyy') { // if date is dd/MM/YYYY
                    fromDate = '1/' + month + '/' + year;
                    toDate = day + '/' + month + '/' + year;
                } else if (dateFormat[0] === 'MM' && dateFormat[1] === 'dd' && dateFormat[2] === 'yyyy') { // if date is MM/dd/YYYY
                    fromDate = month + '/1/' + year;
                    toDate = month + '/' + day + '/' + year;
                } else if (dateFormat[0] === 'yyyy' && dateFormat[1] === 'MM' && dateFormat[2] === 'dd') { // if date is yyyy/MM/dd/
                    fromDate = year + '/' + month + '/1/';
                    toDate = year + '/' + month + '/' + day;
                } else if (dateFormat[0] === 'yyyy' && dateFormat[1] === 'dd' && dateFormat[2] === 'MM') { // if date is yyyy/dd/MM/
                    fromDate = year + '/1/' + month;
                    toDate = year + '/' + day + '/' + month;
                }

                // add a filter to filter Post by date
                search.addFilter({
                    fieldName: this.columns.post_date.fieldName,
                    operator: 'within',
                    value1: fromDate,
                    value2: toDate
                });
            }

            search.addFilter({
                fieldName: this.columns.availableSites.fieldName,
                operator: 'anyof',
                value1: this.siteId
            });

            blog = search.search();


            if (!blog) {
                throw notFoundError;
            }

            return blog;
        },

        getBlogPost: function getBlogPost(url, page) {
            var getblog;
            var search;

            search = new SearchHelper(
                this.record,
                this.filters,
                this.columns,
                null,
                1,
                page || 1
            );

            // add a filter to display detail
            search.addFilter({
                fieldName: this.columns.url.fieldName,
                operator: 'is',
                value1: url
            });

            search.addFilter({
                fieldName: this.columns.availableSites.fieldName,
                operator: 'anyof',
                value1: this.siteId
            });

            getblog = search.search();

            if (!getblog) {
                throw notFoundError;
            }
            return getblog;
        }
    });
});

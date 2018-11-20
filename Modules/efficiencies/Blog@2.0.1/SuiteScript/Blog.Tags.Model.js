define('Blog.Tags.Model', [
    'SC.Model',
    'SearchHelper',
    'underscore'
], function BlogTagModel(
    SCModel,
    SearchHelper,
    _
) {
    'use strict';

    return SCModel.extend({
        name: 'BlogTags',
        record: 'customrecord_ef_b_blog_tags',
        columns: {
            url: { fieldName: 'custrecord_ef_b_bt_url' },
            name: { fieldName: 'name' },
            recordid: { fieldName: 'internalid', sort: 'desc' },
            description: { fieldName: 'custrecord_ef_b_bt_description' },
            metaTags: { fieldName: 'custrecord_ef_b_bt_meta_html' }
        },

        filters: [
            { fieldName: 'internalid', operator: 'noneof', value1: '@NONE@' }
        ],
        getBlogTagList: function getBlogTag() {
            var blog;
            var search = new SearchHelper(
                this.record,
                this.filters,
                this.columns
            );

            search.search();

            blog = search.getResults();

            if (!blog) {
                throw notFoundError;
            }
            return blog;
        },

        getBlogTag: function getBlogItems(url) {
            var getBlogTagData;
            var search;
            var data;

            search = new SearchHelper(
                this.record,
                this.filters,
                this.columns
            );

            // add a filter to search for urlcomponents
            search.addFilter({
                fieldName: this.columns.url.fieldName,
                operator: 'is',
                value1: url
            });

            getBlogTagData = search.search().getResults();

            if (!getBlogTagData) {
                throw notFoundError;
            }

            if (getBlogTagData && getBlogTagData.length > 0) {
                data = _.map(getBlogTagData, function mapResult(result) {
                    return {
                        url: result.url,
                        name: result.name,
                        internalid: result.recordid,
                        description: result.description
                    };
                });
            }

            return data;
        }

    });
});

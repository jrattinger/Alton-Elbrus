define('Blog.ItemDetailsTags.Model', [
    'SC.Model',
    'SearchHelper'
], function BlogTagModel(
    SCModel,
    SearchHelper
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
        }
    });
});

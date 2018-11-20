define('Blog.Post.Collection', [
    'Blog.Post.Model',
    'Backbone',
    'underscore',
    'SC.Configuration'
], function BlogCollection(
    Model,
    Backbone,
    _,
    Configuration
) {
    'use strict';

    return Backbone.Collection.extend({
        model: Model,
        url: _.getAbsoluteUrl('services/Blog.Post.Service.ss'),
        parse: function parseResult(data) {
            this.totalRecordsFound = data.totalRecordsFound;
            this.totalPages = Math.ceil(this.totalRecordsFound / this.getModuleConfig().resultsPerPage);
            /* eslint-disable */
            return data._lastResult;
            /* eslint-enable */
        },
        getModuleConfig: function getModuleCOnfig() {
            return Configuration.get('blog');
        }
    });
});

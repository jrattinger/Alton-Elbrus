define('Blog.Archive.Navigation.View', [
    'Blog.Utils',
    'blog_archive_navigation_view.tpl',

    'Backbone',
    'jQuery',
    'underscore',
    'Utils'
], function BlogArchiveNavigationView(
    BlogUtils,
    BlogArchiveNavigationTpl,
    Backbone,
    jQuery,
    _
) {
    'use strict';

    return Backbone.View.extend({
        template: BlogArchiveNavigationTpl,

        render: function render() {
            this._render();
        },

        iterateMonth: function iterateMonth(data) {
            var append;
            var newDate;
            var month;
            var year;
            var lastDay;
            var count;
            var pdata;
            var filterdata;
            append = {};

            pdata = _.uniq(_.pluck(data.attributes, 'month'));
            count = 0;
            _.each(pdata, function fnMonthArray(val) {
                filterdata = _.filter(data.attributes, { month: val });
                newDate = new Date(filterdata[0].post_date);
                month = newDate.getMonth() + 1;
                year = val.split(' ')[1];
                lastDay = new Date(newDate.getFullYear(), newDate.getMonth() + 1, 0);
                append[count] = { link: '<a href="/blog/archive/' + month + '/' + lastDay.getDate() +
                    '/' + year + '" class = "blog-navigation-item-facet-option">' + val + '</a>'
                };
                count++;
            });

            return _.map(append, function mapAppend(el) { return el; });
        },

        getContext: function getContext() {
            var data;
            data = this.iterateMonth(this.model);
            return {
                obj: data
            };
        }

    });
});

define('Blog.Utils', [
    'Backbone'
], function BlogUtils(

) {
    'use strict';

    var BlogUtilities = {
        convertDate: function convertDate(date1) {
            var monthNames;
            var date;
            var year;
            var monthIndex;

            date = new Date(date1);
            monthIndex = date.getMonth();
            year = date.getFullYear();

            monthNames = [
                'January', 'February', 'March',
                'April', 'May', 'June', 'July',
                'August', 'September', 'October',
                'November', 'December'
            ];

            return monthNames[monthIndex] + ' ' + year;
        }

    };
    return BlogUtilities;
});

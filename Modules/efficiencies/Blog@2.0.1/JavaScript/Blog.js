define('Blog', [
    'Backbone',
    'Blog.Router'
], function Blog(
    Backbone,
    Router
) {
    'use strict';

    return {
        mountToApp: function mountToApp(application) {
            return new Router(application);
        }
    };
});

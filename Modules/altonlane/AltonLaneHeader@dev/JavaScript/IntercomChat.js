define('IntercomChat', [
    'underscore'
], function (
    _
) {
    return {
        mountToApp: function(application) {
            if (!SC.isPageGenerator()) {
                window.intercomSettings = {
                    app_id: "okesps6w"
                };
                application.getLayout().on('afterAppendView', function () {

                    (function () {
                        var w = window;
                        var ic = w.Intercom;
                        if (typeof ic === "function") {
                            ic('reattach_activator');
                            ic('update', intercomSettings);
                        } else {
                            var d = document;
                            var i = function () {
                                i.c(arguments)
                            };
                            i.q = [];
                            i.c = function (args) {
                                i.q.push(args)
                            };
                            w.Intercom = i;

                            function l() {
                                var s = d.createElement('script');
                                s.type = 'text/javascript';
                                s.async = true;
                                s.src = 'https://widget.intercom.io/widget/okesps6w';
                                var x = d.getElementsByTagName('script')[0];
                                x.parentNode.insertBefore(s, x);
                            }
                            l();
                        }
                    })()
                });
            }
        }
    };
});
/* eslint-disable */
define('MenuTree.View.RemoveQuotes', [
    'MenuTree.View',
    'underscore'
], function MenuTreeViewRemoveQuotes(
    MenuTreeView,
    _
) {
    'use strict';

    _.extend(MenuTreeView.prototype, {
        // Remove 'Quotes' menu item from My Account
        addMenuItem: function (items) {
            var self = this;

            items = _.isArray(items) ? items : [items];

            var itemsToHide = [
                'quotes',
                'balance',
                'backinstocknotification',
                'invoices',
                'transactionhistory',
                'printstatement',
                'giftBalanceList'
            ];

            _.each(items, function (item) {
                if (!_.contains(itemsToHide, item.id)) {
                        self.menuItems.push(item);
                }
            });
        }
    });
});

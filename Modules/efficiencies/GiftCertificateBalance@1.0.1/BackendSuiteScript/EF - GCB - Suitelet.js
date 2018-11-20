/**
 *@NApiVersion 2.x
 *@NScriptName GiftCertificateBalance.Suitelet.js
 *@NScriptId _ef_gcb_suitelet
 *@NScriptType Suitelet
 */

define([
    'N/search'
], function GiftCertificateBalance(
    search
) {
    var myResults = [];
    var mySearch;
    var giftCertificateBalance = {
        id: 'customsearch_ef_gift_save_search',

        loadAndRunSearch: function loadAndRunSearch(email) {
            mySearch = search.load({
                id: this.id
            });
            mySearch.filters = this.getFilters({
                email: email
            });
            mySearch.run().each(function mySearchRun(result) {
                myResults.push({
                    sender: result.getValue('sender'),
                    giftcertcode: result.getValue('giftcertcode'),
                    email: result.getValue('email'),
                    originalamount: result.getValue('originalamount'),
                    amountremaining: result.getValue('amountremaining')
                });
                return true;
            });
        },

        getFilters: function getFilters(options) {
            var filters = [];
            filters.push(search.createFilter({
                name: 'email',
                operator: 'is',
                values: options.email
            }));
            filters.push(search.createFilter({
                name: 'amountremaining',
                operator: search.Operator.ISNOTEMPTY
            }));
            return filters;
        }
    };

    return {
        onRequest: function result(context) {
            if (context.request.method === 'GET') {
                giftCertificateBalance.loadAndRunSearch(context.request.parameters.email);
                context.response.write(JSON.stringify(myResults));
            }
        }
    };
});

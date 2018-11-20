define('GiftCertificateVariableAmount.ItemsKeyMapping', [
    'Backbone',
    'SC.Configuration',
    'underscore'
], function GiftCertificateVariableAmountItemsKeyMapping(
    Backbone,
    Configuration,
    _
) {
    'use strict';

    Configuration.itemKeyMapping = Configuration.itemKeyMapping || {};
    _.extend(Configuration.itemKeyMapping, {
        _isGiftCertWithVariableAmount: function isGiftWithVariableAmount(item) {
            if (item.get('itemtype') === 'GiftCert') {
                if (item.get('custitem_is_variable_amount')) {
                    return true;
                }
            }
            return false;
        },
        _isWithVariableAmount: function isGiftWithVariableAmount(item) {
            if (item.get('custitem_is_variable_amount')) {
                return true;
            }
            return false;
        },
        _minimumGiftValue: function minimumGiftValue(item) {
            var result = 0;
            var custItemMinimumValue = item.get('custitem_ef_minimum_gift_value');

            if (custItemMinimumValue !== undefined) {
                result = custItemMinimumValue;
            } else {
                result = 0;
            }
            return result;
        },
        _maximumGiftValue: function maximumGiftValue(item) {
            var result = 0;
            var custItemMaximumValue = item.get('custitem_ef_maximum_gift_value');

            if (custItemMaximumValue !== undefined) {
                result = custItemMaximumValue;
            } else {
                result = 0;
            }
            return result;
        },
        _hasMaxMinGiftValue: function hasMaxMinGiftValue(item) {
            if (item.get('_isGiftCertWithVariableAmount')) {
                if ((item.get('_minimumGiftValue') !== 0) || (item.get('_maximumGiftValue') !== 0)) {
                    return true;
                }
            }
            return false;
        },
        _certificateValueAmount: function certificateVaalueAmount(item) {
            return item.get('custcol_certificate_amount');
        },
        _isVariableAmount: function isVariableAmount(item) {
            return item.get('custcol_is_variable_amount');
        }

    });
});

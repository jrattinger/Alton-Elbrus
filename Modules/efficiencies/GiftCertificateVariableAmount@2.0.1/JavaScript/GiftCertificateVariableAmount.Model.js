define('GiftCertificateVariableAmount.Model', [
    'Product.Model',
    'underscore',
    'Utils'
], function GiftCertificateVariableAmountModel(
    ProductModel,
    _
) {
    'use strict';

    _.extend(ProductModel.prototype, {
        validateGiftValue: function validateGiftValue(giftValue) {
            var userInputValue = parseInt(giftValue, 10);
            var minimumGiftValue = parseInt(this.get('item').get('_minimumGiftValue'), 10);
            var maximumGiftValue = parseInt(this.get('item').get('_maximumGiftValue'), 10);
            var response = '';

            if (userInputValue) {
                if ((minimumGiftValue !== 0) && (maximumGiftValue !== 0)) {
                    if (userInputValue < minimumGiftValue) {
                        response = _.translate('Gift Certificate Amount is less than the minimum');
                    } else if (userInputValue > maximumGiftValue) {
                        response = _.translate('Gift Certificate Amount exceeds the maximum');
                    }
                } else if ((minimumGiftValue !== 0) && (maximumGiftValue === 0)) {
                    if (userInputValue < minimumGiftValue) {
                        response = _.translate('Gift Certificate Amount is less than the minimum');
                    }
                } else if ((minimumGiftValue === 0) && (maximumGiftValue !== 0)) {
                    if (userInputValue > maximumGiftValue) {
                        response = _.translate('Gift Certificate Amount exceeds the maximum');
                    }
                }
            } else {
                response = _.translate('Gift Certificate Amount should not be empty');
            }

            return response;
        },
        warningMessage: function warningMessage() {
            var responseMessage = '';
            // if has both minimum and maximum
            if ((this.get('item').get('_minimumGiftValue') !== 0) && (this.get('item').get('_maximumGiftValue') !== 0)) {
                responseMessage = 'Please enter an amount between $(0) and $(1)';

            // if has only miniimum value
            } else if ((this.get('item').get('_minimumGiftValue') !== 0) && (this.get('item').get('_maximumGiftValue') === 0)) {
                responseMessage = 'Please enter an amount of $(0) or above';

            // if has only maximum value
            } else if ((this.get('item').get('_minimumGiftValue') === 0)
                && (this.get('item').get('_maximumGiftValue') !== 0)) {
                responseMessage = 'Please enter an amount of $(1) or below';
            }
            return responseMessage;
        }
    });
});

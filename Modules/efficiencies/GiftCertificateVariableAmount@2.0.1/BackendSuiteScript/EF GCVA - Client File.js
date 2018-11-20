// Create Date 2014/07/09
// FileName scriptableGC_L41.js
// Developer: Somsak Ri
// E-Mail: risomsak@gmail.com

function setAmount() {
    var totalQty = nlapiGetLineItemCount('item');
    var line;
    var isVariableAmount;
    var amount;
    var currentAmount;

    for (line = 1; line <= totalQty; line++) {
        isVariableAmount = nlapiGetLineItemValue('item', 'custcol_is_variable_amount', line);

        if (isVariableAmount === 'T') {
            amount = nlapiGetLineItemValue('item', 'custcol_certificate_amount', line);
            currentAmount = nlapiGetLineItemValue('item', 'amount', line);

            if (currentAmount !== amount) {
                nlapiSelectLineItem('item', line);
                nlapiSetCurrentLineItemValue('item', 'rate', amount, false, true);
                nlapiSetCurrentLineItemValue('item', 'amount', amount, false, true);
                nlapiCommitLineItem('item');
            }
        }
    }
}

function setVariableAmount(type, action) {  // eslint-disable-line consistent-return
    if (nlapiGetContext().getExecutionContext() !== 'webstore') return true;

    if ((type === 'item') && (action === 'commit')) {
        try {
            setAmount();
        } catch (e) {
            nlapiLogExecution('ERROR', 'Scriptable cart error', e);
        } finally {
            nlapiLogExecution('ERROR', 'end');
        }
    }
}

function onRecalc(type, action) { // eslint-disable-line
    if (type !== 'item') return;

    try {
        if (nlapiGetContext().getExecutionContext() !== 'webstore') return;

        nlapiLogExecution('debug', 'webstore1', nlapiGetContext().getExecutionContext());
        setVariableAmount(type, action);
    } catch (err) {
        nlapiLogExecution('debug', 'error', err);
    } finally {
        return true; // eslint-disable-line
    }
}

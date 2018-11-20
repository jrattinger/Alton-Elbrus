<section class="giftcertificate-list">
    <header class="giftcertificate-list-header">
        <h1 class="giftcertificate-list-title">{{translate 'Gift Certificate Balance'}}</h1>
    </header>

    <div class="giftcertificate-list-results-container">
        <table class="giftcertificate-list-results-table">
            <thead class="giftcertificate-list-results-table-header">
            <tr class="giftcertificate-list-results-table-header-row">
                <th class="giftcertificate-list-results-table-header-giftcode">{{translate 'Gift Certificate Code'}}</th>
                <th class="giftcertificate-list-results-table-header-row-email">{{translate 'Sent By'}}</th>
                <th class="giftcertificate-list-results-table-header-row-originalamount">{{translate 'Original Amount'}}</th>
                <th class="giftcertificate-list-results-table-header-row-remaining">{{translate 'Remaining'}}</th>
            </tr>
            </thead>
            <tbody data-view="GiftCertificate.Balance"></tbody>
        </table>
        {{#if isApprove}}
            <p class="giftcertificate-list-title">{{translate 'No available Gift Certificate balance for this account'}}</p>
        {{/if}}
    </div>
</section>
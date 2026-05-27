# FAQ

## Transactions

<details>
    <summary>How long does it take for a transaction to settle?</summary>
    - **Debit** transactions usually settle within a day.
    - **Credit** transactions usually settle within three days.
    
    Exceptions may be:
    - Hotels and airline tickets can sometimes take weeks to settle.
    - Gas stations usually take from 2 to 5 days.   
</details>

## KYC

<details>
    <summary>What happens when a user fails the document upload process?</summary>

    The KYC status is changed to `failed` and Atelio will reach out to you directly to explain why this has happened. This does not happen very often.
</details>

<details>
    <summary>When a user uploads documents during a KYC, is their application immediately moved to "manual review"?</summary>

    Yes, during the KYC process, as soon as the user uploads the required document(s), their application status changes to `under review`. This happens immediately and a webhook is sent.
</details>

## Billing 

<details>
    <summary>Can I set up an automatic billing updater?</summary>

    This is a feature that will be active when the BIN goes live. The automatic billing updater provides automatic updates on various platforms when the PAN details change due to a card being reissued.

    There are two billing updaters, VAU, (see [VAU](https://usa.visa.com/dam/VCOM/download/merchants/visa-account-updater-product-information-fact-sheet-for-merchants.pdf)), and Mastercard ABU, (see [ABU](https://developer.mastercard.com/product/automatic-billing-updater-abu/)).
</details>
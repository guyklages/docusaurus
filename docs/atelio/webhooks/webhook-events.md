# Webhook events

## Introduction

To be sent an event notification, you need to [subscribe](https://docs.atelio.com/embedded/docs/webhook-subscriptions) to the required event. You can subscribe to more than one event.

For example, subscribing to `kyc.verification.success` enables you to receive the successful result of a customer KYC verification request once it has finished being processed.

## Event types 

The following tables list the events that you can subscribe to.

### Account 

| Event enum values | Description |
| --- | --- |
| `account.autopay.changed` | Embedded app user has changed autopay status. |
| `account.autopay.failed` | Embedded app user autopay has failed to process. |
| `account.autopay.processed` | Embedded app user autopay has been successfully processed. |
| `account.autopay.scheduled` | Embedded app user autopay has been scheduled. |
| `account.history.ready` | Used when [retrieving an external account history](https://docs.atelio.com/embedded/docs/retrieving-external-account-history) for the first time. |
| `account.statements.generated` | Embedded app user statement is ready for download. |
| `account.statements.late_payment` | Embedded app user has missed an on-time card payment, and the outstanding balance has been deducted from the security deposit account. |
| `account.statements.ready` | Monthly statement for a credit or deposit account is now [ready](https://docs.atelio.com/embedded/reference/get-statements-yyyy-mm). |

### Card 

| Event enum values | Description |
| --- | --- |
| `card.created` | Card has been created. |
| `card.status.active` | Card status is now `Active`. |
| `card.status.closed` | Card status is now `Closed`. |
| `card.status.inactive` | Card status is now `Inactive`. |
| `card.status.reissue` | Card status is now `Reissue`. |
| `card.wallet.add` | Card was successfully added to a mobile wallet. |
| `card.wallet.add_failure` | Card failed to be added to a mobile wallet. |

### Commercial

| Event enum values | Description |
| --- | --- |
| `commercial.credit_application.created` | Commercial credit application has been created |
| `commercial.credit_application.submitted` | Commercial credit application has been submitted |
| `commercial.credit_application.under_review` | Commercial credit application is under review |
| `commercial.credit_application.approved` | Commercial credit application has been approved |
| `commercial.credit_application.denied` | Commercial credit application has been denied |
| `commercial.credit_application.resubmit_required` | Commercial credit application has failed KYC or timed out. The application needs to be resubmitted with the same `application_id`. |
| `commercial.credit_application.pending` | Commercial credit application is still pending |

### Credit

| Event enum values | Description |
| --- | --- |
| `credit.application.created` | Consumer credit application has been created. |
| `credit.application.submitted` | Consumer credit application has been submitted. |
| `credit.application.approved` | Consumer credit application has been approved. |
| `credit.application.adverse_action` | Consumer credit application adverse action has been generated. |
| `credit.application.resubmit_required` | Consumer credit application resubmit has failed KYC or timed out. The application needs to be resubmitted with the same `application_id`. |

### Customer  

| Event enum values | Description |
| --- | --- |
| `customer.updated` | A customer has updated their personal information. |

### Develop 

| Event enum values | Description |
| --- | --- |
| `develop.api_key.created` | A new API key has been created. |

### Fraud Operations 

| Event enum values | Description |
| --- | --- |
| `fraud_operations.freeze.initiated` | A freeze operation has been initiated on a customer account. |
| `fraud_operations.freeze.success` | A freeze operation has been successfully completed on a customer account. |
| `fraud_operations.freeze.failed` | A freeze operation has failed on a customer account. |
| `fraud_operations.unfreeze.initiated` | An unfreeze operation has been initiated on a customer account. |
| `fraud_operations.unfreeze.success` | An unfreeze operation has been successfully completed on a customer account. |
| `fraud_operations.unfreeze.failed` | An unfreeze operation has failed on a customer account. |
| `fraud_operations.close.initiated` | A close operation has been initiated on a customer account. |
| `fraud_operations.close.success` | A close operation has been successfully completed on a customer account. |
| `fraud_operations.close.failed` | A close operation has failed on a customer account. |

For more details on fraud operations events, see [Fraud Operations Webhook Events](https://docs.atelio.com/embedded/docs/webhook-events-fraud-operations).

### KYB  

| Event enum values | Description |
| --- | --- |
| `kyb.verification.error` | KYB failed due to server error. |
| `kyb.verification.initiated` | KYB process has been initiated. |
| `kyb.verification.rejected` | KYB failed due to low confidence in identity validation. |
| `kyb.verification.warning` | Run KYB again. |

### KYC 

| Event enum values | Description |
| --- | --- |
| `kyc.verification.document_required` | KYC requires further information to continue. This includes a documents field that indicates the types of documents required. |
| `kyc.verification.error` | KYC failed due to server error. |
| `kyc.verification.failure` | KYC failed due to low confidence in identity validation. |
| `kyc.verification.reenter_information` | This is optional and will be sent at the same time as `kyc.verification.document_required`.<br/>The customer may have entered incorrect information that can cause KY failure. Reentering this information may resolve the issue. This includes an `incorrect_information` field that identifies exactly what should be checked by the customer. |
| `kyc.verification.success` | KYC passed. |
| `kyc.verification.timeout` | The system timed out trying to verify the information. Run KYC again. |
| `kyc.verification.under_review` | KYC documents submitted are being reviewed. |

### Portal

| Event enum values | Description |
| --- | --- |
| `portal.data_export` | A user has downloaded a report of transactions from Atelio Portal. |

### Transactions

| Event enum values | Description |
| --- | --- |
| `transactions` | Sent on every new transaction or transaction update. |

## Webhook Configuration Example 

cURL

```curl
curl --request POST \
     --url https://sandbox.atelio.com/api/v0.1/webhooks \
     --header 'Accept: application/json' \
     --header 'Authorization: <YOUR_AUTHORIZATION>' \
     --header 'Content-Type: application/json' \
     --header 'Identity: <YOUR_IDENTITY>' \
     --data '
{
     "events": [\
          "card.*",\
          "credit.*",\
          "kyc.*",\
          "account.statement.ready",\
          "transactions"\
     ],
     "url": "https://hostname.com/webhook/route",
     "description": "KYC state changes."
}
'
```

> 📘 **Note** 
>
> You can also use wildcards when managing webhooks. For example, to refer to all **card** webhooks, use `card*`.

The following is an example of a successful `200` response which indicates that the subscription is enabled.

JSON

```json
{
  "date_created": "2020-11-17T11:13:06.568119",
  "webhook_id": "522e9ec7-b17d-4d92-8270-c2e1741dd6e0",
  "url": "https://hostname.com/webhook/route",
  "description": "KYC state changes.",
  "events": [\
        "card.created",\
        "card.status.active",\
        "card.status.closed",\
        "card.status.fraud",\
        "card.status.inactive",\
        "card.status.lost",\
        "card.status.no_withdrawals",\
        "card.status.reissue",\
        "card.status.stolen",\
        "card.wallet.add",\
        "card.wallet.add_failure",\
        "credit.application.created",\
        "credit.application.submitted",\
        "credit.application.approved",\
        "credit.application.adverse_action",\
        "credit.application.resubmit_required",\
        "kyc.verification.document_required",\
        "kyc.verification.error",\
        "kyc.verification.failure",\
        "kyc.verification.reenter_information",\
        "kyc.verification.success",\
        "kyc.verification.timeout",\
        "kyc.verification.under_review",\
        "account.statement.ready",\
        "transactions"\
  ],
  "status": "STATUS_ENABLED",
  "secret": "whsec_XqTEJtniwuEhp0A1c1cTJNsmpR/qgOfB"
}
```

For a complete specification and interactive examples, see [Managing subscriptions](ref:managing-subscriptions) in the Atelio API Reference.

## Transaction event example

The transaction event example shown below sends notifications of every transaction type across card transactions, in addition to the ACH, and RCD transactions to the call-back URL provided.

JSON

```json
{
  "event": "transactions",
  "occurred_at": "2022-07-27T21:56:53.150700+00:00",
  "transaction": {
    "bond_brand_id": "48cd01ee-d333-4688-a6f4-fa1e9f12098b",
    "transaction_type": "ACH Deposit",
    "balances": null,
    "transaction_id": "d7990a22-ed1a-441a-b20a-c08307cce65b",
    "created_time": "2022-07-27T21:56:53.029766",
    "description": "Retest ACH Transactions",
    "amount": "10.01",
    "business_id": null,
    "account_id": "bc905964-1432-47f9-8cc5-b42a972bac32",
    "fee": null,
    "payment_type": "ach",
    "details": {
      "destination_account_id": "afeedb84-6b29-43d6-943f-8d221c7a795f",
      "originating_account_id": "10b55efe-fe7b-44de-9e21-5f7ce37d035e"
    },
    "customer_id": "e6cfcaea-195c-4fa7-a185-018118c38752",
    "currency": "USD",
    "updated_time": "2022-08-11T21:56:52.888542",
    "state": "pending",
    "previous_transaction_id": null
  }
}
```

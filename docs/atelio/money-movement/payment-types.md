# Payment types

## Introduction

The Atelio platform supports card, ACH, and account payment types.

The `transaction` object contains a `details` object that contains the payment details. The three payment types have different sets of attributes in the `details` object:

- [Card payments](https://docs.atelio.com/embedded/docs/payment-types#card-payments)
- [ACH payments](https://docs.atelio.com/embedded/docs/payment-types#ach-payments)
- [Account payments](https://docs.atelio.com/embedded/docs/payment-types#account-payments)

For transaction type details, see [Transaction types](https://docs.atelio.com/embedded/docs/payment-types#transaction-types).

### Card payments

The following code sample extract displays the attributes of a `details` object for a card transaction.

```json title="JSON"
{
"details": {
    "card_id": "c5326b94-73f2-427d-b8cb-4605519da842",
    "mcc": "3542",
    "mcc_description": "Professional Services and Membership Organizations",
    "currency": "USD",
    "exchange_rate": "0.00",
    "merchant_id": "1AD18GT7744554",
    "merchant_name": "Target",
    "merchant_city": "San Mateo",
    "merchant_state": "CA",
    "merchant_country": "USA",
    "merchant_postal_code": "90210",
    "merchant_currency": "",
    "merchant_amount": "",
    "exchange_rate": "",
    "cardholder_presence": true,
    "statement_descriptor": "Target #4744",
    "arn": "000091556011",
    "fraud_rule_triggered": "spend_velocity",
    "products": ["RETAIL", "GENERAL_MERCHANDISE"],
    "settlements": [
        {
            "settlement_date": "2024-01-15T14:22:31+00",
            "amount": "-25.99"
        }
    ]
    }
}
```

The following table describes the `details` attributes for a card transaction.

| Attribute              | Description |
| ---------------------- | ----------- |
| `arn`                  | ARN, also called the Trace ID. Tracks a debit or credit transaction from the merchant's bank to the card holder's bank. |
| `card_id`              | UUID for the card. |
| `cardholder_presence`  | - `true` if the cardholder was present when the card was swiped.<br/>- `false` if the cardholder was present when the card was swiped. |
| `currency`             | Currency the transaction was processed in. |
| `exchange_rate`        | Exchange rate, if applicable. |
| `fraud_rule_triggered` | Identifies the fraud rule, if any, for this transaction. |
| `mcc`                  | Numeric value for the merchant category code. <br/> For details, see [MCC Codes and Descriptions](https://docs.atelio.com/embedded/docs/mcc-codes-and-descriptions). |
| `mcc_description`      | Descriptions for the merchant category code. <br/> For details, see [MCC Codes and Descriptions](https://docs.atelio.com/embedded/docs/mcc-codes-and-descriptions). |
| `merchant_amount`      | The original value of the transaction before an currency conversions. |
| `merchant_city`        | City the merchant resides in. |
| `merchant_country`     | Country the merchant resides in. |
| `merchant_currency`    | ISO currency for the transaction, for example USD. |
| `merchant_id`          | Unique identifier for the merchant. |
| `merchant_name`        | Name of the merchant. |
| `merchant_postal_code` | Zip or postal code for the merchant. |
| `merchant_state`       | State the merchant resides in. |
| `products`             | List of product categories associated with the transaction. |
| `settlements`          | List of settlement records for multi-settlement transactions, each containing a settlement date and amount. |
| `statement_descriptor` | Describes the transaction. |

### ACH payments

The following code sample extract displays the attributes of a `details` object for an ACH transaction.

```json title="JSON"
{
"details": {
      "card_id": "c5326b94-73f2-427d-b8cb-4605519da842",
      "external_account_id": "51fca76f-60a0-4db1-a0b7-d98a3687fa42",
      "class_code": "WEB",
      "direction": "credit",
      "network": "same-day-ach",
      "description": "PAYROLL",
      "failure_reason": "Insufficient Funds",
      "return_code": "R01",
      "products": ["direct deposit", "payroll"]
      }
}
```

The following table describes the `details` attributes for an ACH transaction.

| Attribute             | Description |
| --------------------- | ----------- |
| `card_id`             | The unique identifier for the card. |
| `class_code`          | A three-letter code identified by NACHA standards. For details, see [ACH Class Codes](https://docs.atelio.com/embedded/docs/ach-transfers#ach-class-code). |
| `description`         | A 10-character description that you can include. |
| `direction`           | `credit` or `debit`. Defines the direction of the transaction. |
| `external_account_id` | The ID of the external account linked in the ACH transfer. |
| `failure_reason`      | Reason for the ACH failure. |
| `network`             | `ach` or `same-day-ach`. |
| `products`            | An array of strings that categorize the transaction by product type, such as `direct deposit` and `payroll`. |
| `return_code`         | The return code defined by NACHA standards. For details, see [ACH Return Codes](https://docs.atelio.com/embedded/docs/ach-return-codes). |

### Account payments

Account payments are also known as `account-to-account` transfers.

The following code sample extract displays the attributes of a `details` object for an `account-to-account` transaction.

```json title="JSON"
{
"details": {
    "origination_account_id": "2742ff6a-7455-4066-8b45-ae12d3acca34",
    "destination_account_id": "3fa85f64-5717-4562-b3fc-2c963f66afa6"
    }
 }
```

## Transaction types

Transaction types provide a granular category to classify and better understand transactions, whereas Payment types provide a high-level understanding of the money movement method.

Each of the three card payment types (card, ACH, and account) has its own list of transaction types as described in the following sections.

### Card transactions

The transaction types listed in the following table are all related to transactions that occur on a card network.

| Transaction Type   | Description |
| ------------------ | ----------- |
| Cash Withdrawal    | Cash was withdrawn via an ATM. |
| Chargeback Credit  | Credit applied back to the card account. Chargeback credit is a reversal of funds initiated by a cardholder's bank or credit card issuer in response to a dispute over a transaction. |
| Credit Adjustment  | A refund was sent by a merchant to a credit card as a credit adjustment. |
| Debit Adjustment   | A card transaction that removes funds from a cardholder's account to correct processing errors, collect undercharged amounts, or reverse disputed transactions. |
| Fee                | Fee transaction |
| Load&nbsp;Money&nbsp;Onto&nbsp;Card | Atelio-provided funds to a "master" account for initial distribution. |
| POS Cash Advance   | A cash advance was made at an in-store purchase. |
| POS Purchase       | An online or in-store purchase was made. |
| POS PIN Purchase   | An in-store purchase was made that involved entering a PIN. |
| Provisional Credit | Temporary credit applied to the card account. |
| Provisional Debit  | Temporary debit applied to the card account. |
| Pre Authorization  | A pre-authorization was initiated on the card. |
| Purchase Returns   | An item that was purchased was returned for a refund or store credit. |
| Repayment          | A repayment was posted to the card account. |

### ACH transactions

The transactions types listed in the following table all result from an ACH transfer.

| Transaction Type        | Description |
| ----------------------- | ----------- |
| ACH Deposit             | Money moved into your Atelio account. |
| ACH Withdrawal          | Money moved out of your Atelio account. |
| External ACH Deposit    | Money was moved from an external bank account to an Atelio pseudo-DDA through an ACH. |
| External ACH Withdrawal | Money was moved from an Atelio pseudo-DDA to an external bank account through an ACH. |

### Account transactions

All Account transaction types occur within the Atelio platform framework and do not use ACH or Card paths, which makes them instantaneous.

| Transaction Type | Description |
| ---------------- | ----------- |
| Account&nbsp;to&nbsp;Account | Account-to-account transactions occur when you move money between Deposit Accounts or between a Deposit Account and a Credit Account. Since the funds are already present at Atelio, these transfers are instantaneous. |

For a complete specification and interactive examples, see [Retrieving transactions and history](ref:get_transactions) in the Atelio API Reference.


## Transaction examples

The following are payload examples across the various transaction types.

### Cash withdrawal

The following is a payload example for a cash withdrawal transaction:

```json title="JSON"
{
   "transaction_id":"30a2b5a4-c8af-49b3-8272-f9cda6b5654d",
   "bond_brand_id":"00000000-0000-0000-0000-000000000000",
   "customer_id":"35ae74c5-cb4f-4166-b4f4-146caf104973",
   "account_id":"bdd9154f-2c7a-4834-9184-33791616367c",
   "payment_type":"card",
   "transaction_type":"Cash Withdrawal",
   "state":"completed",
   "description":"Domestic ATM Cash Withdrawal",
   "amount":"-20.00",
   "currency":"USD",
   "created_time":"2022-08-03T20:41:55+00:00",
   "updated_time":"2022-08-03T20:41:55+00:00",
   "balances":{
      "prior_balance":"-358.36",
      "new_balance":"-383.66"
   },
   "details":{
      "card_id":"aebe6b3a-e9df-42ed-8d71-280d13ef75ec",
      "mcc":"6011",
      "mcc_description":"Automated Cash Disbursement - Member Institution",
      "currency":"USD",
      "exchange_rate":"1.00",
      "merchant_id":"TFND/MONEYPASS",
      "merchant_name":"Transfund",
      "merchant_city":"ROUND ROCK",
      "merchant_state":"TX",
      "merchant_currency":"USD",
      "merchant_amount":"-20",
      "cardholder_presence":true,
      "statement_descriptor":"TRANSFUND                ROUND ROCK   TXUSA"
   }
}
```

### ATM withdrawal fee payload

A separate transaction may be processed for the ATM withdrawal fee. This webhook payload will be sent along with the Cash Withdrawal one. The following is a payload for a Fee transaction:

```json title="JSON"
{
   "transaction_id":"2db09df4-0911-491f-86dd-a200563cffae",
   "bond_brand_id":"00000000-0000-0000-0000-000000000000",
   "customer_id":"35ae74c5-cb4f-4166-b4f4-146caf104973",
   "account_id":"bdd9154f-2c7a-4834-9184-33791616367c",
   "payment_type":"card",
   "transaction_type":"Fee",
   "state":"completed",
   "description":"Fee of Domestic ATM Cash Withdrawal",
   "amount":"-0.99",
   "currency":"USD",
   "created_time":"2022-07-28T22:05:09+00:00",
   "updated_time":"2022-07-28T22:05:09+00:00",
   "balances":{
      "prior_balance":"-151.91",
      "new_balance":"-228.04"
   },
   "details":{
      "card_id":"aebe6b3a-e9df-42ed-8d71-280d13ef75ec",
      "fee_type":"Generic",
      "linked_transaction_id":"97141e4e-ee2d-47d3-b1ea-40b9a2f74969"
   }
}
```

### Card reissue fee payload

When a card is reissued, a payload for the $4.99 reissue fee will be sent. The following is the payload for this Fee transaction:

```json title="JSON"
{
    "transaction_id": "10c2ef09-dd32-4ee5-b8ee-a4613a9c8a96",
    "bond_brand_id": "3d6a093b-ff34-413d-a7a9-4972f4149bec",
    "customer_id": "4e04c6e4-0b5a-4ba2-9edc-655f7653fd9f",
    "account_id": "3bf93342-7264-4e95-b7c9-1ea5682123f6",
    "payment_type": "card",
    "transaction_type": "Fee",
    "state": "completed",
    "description": "Fee-Reissue Card - From Card Number (51*************8396)",
    "amount": "-4.99",
    "currency": "USD",
    "created_time": "2023-01-02T01:31:14+00:00",
    "updated_time": "2023-01-02T01:31:14+00:00",
    "details": {
        "card_id": "3bc18277-c37d-4684-9004-a9055ced779a",
        "fee_type": "Reissue Card"
    },
    "balances": {
        "prior_balance": "-4.99",
        "new_balance": "-4.99"
    }
}
```

### Pre-authorization

The following is a payload of type `POS Purchase` with state `pending`:

```json title="JSON"
{
    "transaction_id": "59a2e7c1-9853-4aed-b1a4-f41ab0516b6e",
    "bond_brand_id": "00000000-0000-0000-0000-000000000000",
    "customer_id": "0bb749c9-ca8f-4010-950f-071f3667b3fc",
    "account_id": "73401ad8-ece1-4018-bba4-93c21b451900",
    "payment_type": "card",
    "transaction_type": "POS Purchase",
    "state": "pending",
    "description": "Pre-Auth Transaction-POS Signature Purchase",
    "amount": "-4.50",
    "currency": "USD",
    "created_time": "2022-08-05T17:22:19+00:00",
    "updated_time": "2022-08-05T17:22:19+00:00",
    "balances": {
        "prior_balance": "-12.00",
        "new_balance": "-16.50"
    },
    "details": {
        "card_id": "e68adbcc-d76d-47b9-b7c0-d7aa65337f88",
        "mcc": "5814",
        "mcc_description": "Fast Food",
        "currency": "USD",
        "exchange_rate": "1.00",
        "merchant_id": "242632000053360",
        "merchant_name": "Sq *Rising Star Coffee   Cleveland    Ohusa",
        "merchant_city": "Cleveland    ",
        "merchant_state": "OH",
        "merchant_currency": "USD",
        "merchant_amount": "-4.5",
        "cardholder_presence": true,
        "statement_descriptor": "SQ *RISING STAR COFFEE   Cleveland    OHUSA"
    }
}
```

### POS purchase

The following is a payload of type `POS Purchase` with state `completed`:


```json title="JSON"
{
   "transaction_id":"03cc5178-243b-42fa-a73a-27000da36e7c",
   "bond_brand_id":"00000000-0000-0000-0000-000000000000",
   "customer_id":"35ae74c5-cb4f-4166-b4f4-146caf104973",
   "account_id":"bdd9154f-2c7a-4834-9184-33791616367c",
   "payment_type":"card",
   "transaction_type":"POS Purchase",
   "state":"completed",
   "description":"Pre-Auth Transaction-POS Signature Purchase",
   "amount":"-6.68",
   "currency":"USD",
   "created_time":"2022-08-03T20:31:56+00:00",
   "updated_time":"2022-08-03T20:31:56+00:00",
   "balances":{
      "prior_balance":"-397.53",
      "new_balance":"-397.53"
   },
   "details":{
      "card_id":"aebe6b3a-e9df-42ed-8d71-280d13ef75ec",
      "mcc":"5542",
      "mcc_description":"Automatic Fuel Dispenser",
      "currency":"USD",
      "exchange_rate":"1.00",
      "merchant_id":"195000005833001",
      "merchant_name":"Qt 4134",
      "merchant_city":"ROUND ROCK",
      "merchant_state":"TX",
      "merchant_currency":"USD",
      "merchant_amount":"-6.68",
      "statement_descriptor":"QT 4134 ROUND ROCK   TXUSA"
   }
}
```

### Credit adjustment

The following payload example shows a credit adjustment issued to a customer in the case of a refund to a credit card by a merchant:

```json title="JSON"
{
    "transaction_id": "af827f08-95cc-423d-95f7-c9f5d1e41587",
    "bond_brand_id": "00000000-0000-0000-0000-000000000000",
    "customer_id": "baae67f7-00e6-4e1e-8a08-03d4daad9e43",
    "account_id": "e14fee38-118b-43db-87db-b9da975a679f",
    "payment_type": "card",
    "transaction_type": "Credit Adjustment",
    "state": "completed",
    "amount": "11.00",
    "currency": "USD",
    "created_time": "2022-01-07T15:39:37+00:00",
    "updated_time": "2022-01-07T15:39:37+00:00",
    "balances": {
        "prior_balance": "17.02",
        "new_balance": "11.02"
    },
    "details": {
        "card_id": "030bbe79-4272-4b43-8d64-5cd558ed65fa",
        "mcc": "5999",
        "mcc_description": "Misc Retail",
        "currency": "USD",
        "exchange_rate": "1.0",
        "merchant_id": "242661000053360",
        "merchant_name": "Sq *Atelio Financial Tec   San Franciscocausa",
        "merchant_city": "San Francisco",
        "merchant_state": "CA",
        "merchant_currency": "USD",
        "merchant_amount": "11",
        "cardholder_presence": false,
        "statement_descriptor": "SQ *BOND FINANCIAL TEC   San FranciscoCAUSA"
    }
}
```

### Provisional credit

Chargebacks in Atelio take the form of provisional credit sent to a cardholder's account when the cardholder opens a dispute on a transaction. If the dispute is resolved in favor of the cardholder, the credit will remain in the account; otherwise, a provisional debit will be sent to the account to offset this credit. The following payload is for a provisional credit transaction:

```json title="JSON"
{
  "transaction_id": "defa388d-29e3-4d77-a853-80893a09cdb1",
  "bond_brand_id": "00000000-0000-0000-0000-000000000000",
  "customer_id": "ea326d41-0d2a-4c3a-9b90-4d18fb410191",
  "account_id": "670b3035-4c04-4999-985b-b53e14d5146f",
  "payment_type": "card",
  "transaction_type": "Provisional Credit",
  "state": "completed",
  "description": "Provisional Credit",
  "amount": "1.21",
  "fee": "0.00",
  "currency": "USD",
  "created_time": "2022-06-16T22:16:57+00:00",
  "updated_time": "2022-06-16T22:16:57+00:00",
  "details": {
    "card_id": "90107917-3b9e-4411-8a1e-b8fcbf17eae9",
    "mcc": "0",
    "mcc_description": "Merchant Unknown",
    "currency": "USD",
    "exchange_rate": "1.00",
    "merchant_name": "Usa",
    "merchant_currency": "USD",
    "merchant_amount": "1.21",
    "statement_descriptor": "USA"
  }
}
```

> 📘 **Note**
>
> In the future, this payload will be finalized and may be subject to change.

### Purchase returns

The following is an example payload for a completed purchase returns transaction:

```json title="JSON"
{
  "transaction_id": "9c80fac3-885d-4534-bbba-3a2598864b9f",
  "bond_brand_id": "00000000-0000-0000-0000-000000000000",
  "customer_id": "bf0b1891-cd63-46ef-8c6f-c98f3468af9c",
  "account_id": "91b9f9af-fdbc-44d0-93df-c68865b525a5",
  "payment_type": "card",
  "transaction_type": "Purchase Returns",
  "state": "completed",
  "description": "POS Signature Return International (with currency conversion) [European EMU, Euro: 1.28], Fx @1.0312",
  "amount": "1.32",
  "currency": "USD",
  "created_time": "2022-08-14T00:40:27+00:00",
  "updated_time": "2022-08-14T00:40:27+00:00",
  "balances": {
    "prior_balance": "-42.06",
    "new_balance": "-43.38"
  },
  "details": {
    "card_id": "ab386833-0903-4a03-93b0-49d75bb3e124",
    "mcc": "5734",
    "mcc_description": "Computer Software",
    "currency": "USD",
    "exchange_rate": "1.03125",
    "merchant_id": "AWBI8FHJQJHZYIP",
    "merchant_name": "Stripe Secure",
    "merchant_city": "LONDON",
    "merchant_state": "LN",
    "merchant_currency": "EUR",
    "merchant_amount": "1.28",
    "statement_descriptor": "STRIPE SECURE LONDON LNGBR"
  }
}
```

### Payroll to credit accounts

```json title="JSON"
{
    "transaction_id": "b8ef629e-8833-49f5-bf31-94b610b87522",
    "bond_brand_id": "00000000-0000-0000-0000-000000000000",
    "customer_id": "a8d9de10-0eb8-476f-8cb9-9a1f99b166b0",
    "account_id": "12354a17-91c0-4575-849d-e05ded46af5c",
    "payment_type": "ach",
    "transaction_type": "External ACH Deposit",
    "state": "completed",
    "amount": "50.00",
    "currency": "USD",
    "created_time": "2023-03-01T05:45:09.579917+00:00",
    "updated_time": "2023-03-01T05:45:09.579917+00:00",
    "details": {
        "card_id": "6457faff-937e-4f8b-9b22-cd992842da40",
        "class_code": "PPD",
        "direction": "credit",
        "description": "PAYROLL",
        "products": ["direct deposit", "payroll"]
    },
    "balances": {
        "prior_balance": "1326.32",
        "new_balance": "1326.32"
    }
}
```

### Payroll to deposit accounts

```json title="JSON"
{
    "transaction_id": "7604955a-fa1b-4025-88c5-6948533b8111",
    "bond_brand_id": "3d6a093b-ff34-413d-a7a9-4972f4149bec",
    "customer_id": "8d9a3c7b-1891-4176-b873-bca398a316d9",
    "account_id": "08c4745f-4c4a-442c-a40a-1fab9fbd39b1",
    "payment_type": "account",
    "transaction_type": "External ACH Deposit",
    "state": "completed",
    "description": "Atelio::John Doe",
    "amount": "50.00",
    "currency": "USD",
    "created_time": "2023-02-15T09:30:10.042120+00:00",
    "updated_time": "2023-02-15T09:30:10.042120+00:00",
    "details": {
        "originating_account_id": "08c4745f-4c4a-442c-a40a-1fab9fbd39b1",
        "destination_account_id": "96940004-569f-4672-acd2-30901224c54e",
        "class_code": "PPD",
        "same_day": false,
        "return_code": "",
        "failure_reason": ""
    },
    "balances": {}
}
```

> 📘 **Usage Tips**
>
> When figuring out how to organize transaction payloads, you can generally exclude $0 transactions in your transaction list views and statements displayed to end users. An exception, however, is to include $0 transactions where the `details.merchant_amount` is positive, since this can help users keep track of declined POS transactions.

## Retrieve transactions

With the [Transactions API](https://docs.atelio.com/embedded/reference/transactions), you can retrieve either all the transactions for a specific customer or details of a specific transaction.

### Retrieve all transactions

To retrieve a list of all transactions, use the [GetAllTransactions](https://docs.atelio.com/embedded/reference/get_transactions) endpoint and provide the following parameters.

| Attribute | Type | Description |
| --------- | ---- | ----------- |
| `account_id` | string | The UUID of the account. Each `customer_id` can have more than one `account_id` associated with it. |
| `count` | int32 | Number of transactions to return per page. One of: `1`, `2`, `5`, `10`, `20`, `50`, `100`, `1000`, `5000`, `10000` |
| `customer_id` | string | The unique ID used to reference a customer or business resource. |
| `end_date` | date | End date at which to include transactions, in the `YYYY-MM-DD` format. |
| `order_by` | string | `desc` or `asc`. |
| `page` | int32 | The required page number to return. |
| `payment_type` | string | `ach`, `card`, or `account`. For details, see [Payment Types](https://docs.atelio.com/embedded/docs/payment-types). |
| `start_date` | string | Starting date from which to include transactions, in the `YYYY-MM-DD` format. |
| `transaction_state` | string | The transaction state to be included. One of: `failed`, `declined`, `pending`, `cancelled`, `completed`, `returned` |

#### Example request to get all transactions:

```curl title="cURL"
curl --request GET \
      --url 'https://sandbox.atelio.com/api/v0.1/transactions?customer_id=931e2341-c3eb-4681-97d4-f6e09d90da14&account_id=0bebf64a-a74b-42f4-9af9-8e5ac7b07cf4&payment_type=card&start_date=2019-12-01&end_date=2022-12-31&page=1&count=20&order_by=asc&transaction_state=completed' \
     --header 'Accept: application/json' \
     --header 'Authorization: <YOUR_AUTHORIZATION>' \
     --header 'Identity: <YOUR_IDENTITY>'
```

#### Example response to a successful request to retrieve all transactions:

```json title="JSON"
{
    "page": 1,
    "pages": 1,
    "count": 2,
    "next_page": null,
    "transactions": [
        {
            "transaction_id": "b9b8da9a-5ff2-4e5c-84ee-587b7d092f6b",
            "bond_brand_id": "8ed5c9fe-581b-490a-9dcb-3302db235a4b",
            "customer_id": "6493109c-7cb5-4f21-9d19-d9c3901d452d",
            "account_id": "9dc86a8a-4c12-4107-84a8-e7cf6a76586f",
            "payment_type": "card",
            "transaction_type": "credit",
            "transaction_state": "completed",
            "previous_transaction_id": null,
            "state": "pending",
            "amount": "5.30",
            "currency": "USD",
            "created_time": "2021-02-02T22:27:13+00:00",
            "updated_time": "2021-03-02T20:39:56+00:00",
            "details": {
                "card_id": "71efc729-830f-455f-9525-281c19bb4bb4",
                "mcc": "3542",
                "mcc_description": "matrix dynamic eyeballs",
                "currency": "USD",
                "exchange_rate": "0.00",
                "merchant_id": "9le8DI5z8am54O3b",
                "merchant_name": "Baldwin, Wright and Martinez",
                "merchant_city": "New Nathanshire",
                "merchant_state": "Missouri",
                "merchant_country": "Colombia",
                "merchant_postal_code": "34100",
                "merchant_currency": "",
                "merchant_amount": "",
                "exchange_rate": "",
                "cardholder_presence": true,
                "statement_descriptor": "Target #4744",
                "arn": "000091556011",
                "fraud_rule_triggered": "spend_velocity"
            }
        },
        {
            "transaction_id": "6460856a-e431-4d5f-a6d2-deb87c01042f",
            "bond_brand_id": "4b3fab91-7b67-4300-95f7-437dacac5e78",
            "customer_id": "00b9a8ed-03b5-4ce4-a0dd-9bb47aefd2b0",
            "account_id": "9e5f7953-743d-46d0-88ae-dacc395e8030",
            "payment_type": "ach",
            "transaction_type": "credit",
            "transaction_state": "completed",
            "previous_transaction_id": null,
            "state": "pending",
            "amount": "3.22",
            "currency": "USD",
            "created_time": "2021-01-17T06:37:44+00:00",
            "updated_time": "2021-03-04T01:09:46+00:00",
            "details": {
                "card_id": "21775c4e-c74e-40e8-83ec-1e2c9781d587",
                "external_account_id": "d6517906-a318-43b5-849f-0b42032c0a1f",
                "class_code": "ppd",
                "direction": "credit",
                "network": "ach",
                "description": "Testing",
                "failure_reason": "Invalid ACH routing number",
                "return_code": "R13",
                "products": ["direct deposit", "payroll"]
            }
        }
    ]
}
```

### Retrieve transaction details

To retrieve details for a single transaction, use the [GetTransaction](https://docs.atelio.com/embedded/reference/get_transaction_id) endpoint and include the `transaction_id` in the path parameter.

#### Example request of GetTransaction

```curl title="cURL"
curl --request GET \
     --url https://sandbox.atelio.com/api/v0.1/transactions/b9b8da9a-5ff2-4e5c-84ee-587b7d092f6b \
     --header 'accept: application/json'
```

#### Example response to a successful request to retrieve all transactions:

```json title="JSON"
{
  "transaction_id": "b9b8da9a-5ff2-4e5c-84ee-587b7d092f6b",
  "bond_brand_id": "8ed5c9fe-581b-490a-9dcb-3302db235a4b",
  "customer_id": "6493109c-7cb5-4f21-9d19-d9c3901d452d",
  "account_id": "9dc86a8a-4c12-4107-84a8-e7cf6a76586f",
  "payment_type": "card",
  "transaction_type": "credit",
  "previous_transaction_id": null,
  "state": "pending",
  "amount": "5.30",
  "currency": "USD",
  "created_time": "2021-02-02T22:27:13+00:00",
  "updated_time": "2021-03-02T20:39:56+00:00",
  "balances": {
    "prior_balance": "68.83",
    "new_balance": "63.53"
  },
  "details": {
    "card_id": "71efc729-830f-455f-9525-281c19bb4bb4",
    "mcc": "3542",
    "mcc_description": "matrix dynamic eyeballs",
    "currency": "USD",
    "exchange_rate": "1.0",
    "merchant_id": "9le8DI5z8am54O3b",
    "merchant_name": "Baldwin, Wright and Martinez",
    "merchant_city": "New Nathanshire",
    "merchant_state": "Missouri",
    "merchant_country": "Colombia",
    "merchant_postal_code": "34100",
    "merchant_currency": "USD",
    "merchant_amount": "5.30",
    "cardholder_presence": true,
    "statement_descriptor": "Target #4744",
    "arn": "000091556011",
    "fraud_rule_triggered": "spend_velocity"
  }
}
```

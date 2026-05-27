# Accounts overview

Atelio's account-centric model empowers developers to create innovative features built on top of ledger accounts. These accounts serve as versatile containers for storing value, such as USD, and provide a flexible way to segment and control stored funds. The Accounts model offers a comprehensive suite of features, including:

| Feature            | Description |
|--------------------|-------------|
| Transfers          | Move funds between accounts using ACH (Automated Clearing House) or internal account-to-account transfers. |
| Balance Management | Track and manage account balances in real time. |
| Virtual Ledger     | Built on the concepts of double-entry accounting and inspired by [ISO-8583](https://en.wikipedia.org/wiki/ISO_8583) standards. |
| Statement Data     | Access detailed statement information for each account. |

The Accounts model utilizes a polymorphic structure via the type key, which leverages inheritance in the JSON API to support multiple account types. This approach allows Atelio to introduce new account types in the future as the platform expands.

Currently, Atelio offers the following account types:

Deposit AccountCredit AccountSecurity Deposit Account

```json
{
    "account_id": "a2cbc90c-caeb-4137-8d95-3d1b64c10628",
    "date_updated": "2022-07-08T16:44:20.179543Z",
    "date_created": "2022-07-08T16:44:20.179543Z",
    "program_id": "84183869-461e-4e96-86b5-45b824aae569",
    "customer_id": "842ebd28-6d86-4d05-9630-b12cf9278875",
    "type": "deposit",
    "status": "active",
    "routing_number": "014175741",
    "account_number": "61286758183945",
    "description": "My First Deposit Account",
    "balance": {
        "previous_statement_balance": 97495,
        "available_balance": 97495,
        "current_balance": 97495,
        "currency": "USD"
    },
    "cards": [],
    "deposit": {}
}
```

```json
{
  "account_id": "ed3dc85e-c3e8-4076-802f-56da7d5d66e2",
  "date_updated": "2022-07-08T16:44:20.179543Z",
  "date_created": "2022-07-08T16:44:20.179543Z",
  "program_id": "0adea755-90d3-47f4-9d44-4b73cbebaf3c",
  "customer_id": "db39e8e9-849d-435a-842c-7f4b3a49c5b3",
  "type": "credit",
  "status": "active",
  "description": "string",
  "routing_number": "547897762",
  "account_number": "574771265",
  "balance": {
      "current_balance": -500,
      "available_balance": -500,
    	"previous_statement_balance": 0,
    	"locked_balance": 0,
      "currency": "USD"
  },
  "credit": {
      "credit_limit": 10000,
      "security_deposit_account_id": "182c3a25-69e8-4e16-b1bc-7211fcc2583d"
  },
  "cards": [\
      "6c65c025-40bf-48cd-93dd-169dbfd95659"\
  ]
}
```

```json
{
    "account_id": "c858b30f-83a3-4c9b-b476-b16e212b96c4",
    "program_id": "cf436dab-68c2-4934-b104-0e98aa314d6f",
    "customer_id": "1e4bfc12-63c5-4269-bb52-4fa93c971dd1",
    "description": "Security Deposit Account",
    "date_updated": "2023-06-29T19:12:44.097360Z",
    "date_created": "2023-06-29T19:12:44.097354Z",
    "type": "security_deposit",
    "status": "active",
    "routing_number": "123456789",
    "account_number": "1234567892838563",
    "balance": {
        "previous_statement_balance": 200000,
        "current_balance": 250000,
        "available_balance": 240000,
        "locked_balance": 500,
        "currency": "USD"
    },
    "security_deposit": {
        "credit_account_id": "387e10f2-c7d3-45f1-80e2-a6941576df6b",
        "all_credit_account_ids": [\
          	"387e10f2-c7d3-45f1-80e2-a6941576df6b"\
        ]
    },
    "cards": []
}
```

Note that the `deposit`, `credit`, and `security_deposit` objects are generated based on the account type. Each account type has its own corresponding object within the Account API model. This enables the API response to provide account-specific data.

> ❗️ **External Accounts**
>
> Accounts at external financial institutions linked to the Atelio platform (e.g. using Plaid) are handled separately, with their own APIs.

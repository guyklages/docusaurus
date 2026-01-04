# Money movement

## Overview

The Atelio platform enables you to facilitate payments and money movement for your users. Key capabilities include:

| Capability           | Description |
| -------------------- | --- |
| Payments             | Atelio supports multiple payment methods, including card payments, ACH transactions, and direct account payments. This allows users to make payments from a security deposit account or an externally linked bank account, offering flexibility in managing fund flows. |
| Payment&nbsp;Details | Each transaction on the Atelio platform includes a 'details' object within the transaction object, which contains specific attributes depending on the payment type. This structured approach ensures clarity and ease of integration for different payment methods. |
| Transfers            | The platform's transfers API manages all aspects of fund transfers between accounts, whether it's from linked accounts to security deposit accounts or between credit cards and linked accounts. Each transfer operation is uniquely identified, allowing developers to track and manage transfers efficiently. |
| ACH Transfers        | Users can transfer money electronically between banks via the ACH (Automated Clearing House) system without needing paper checks, cards, or wire transfers. The Atelio platform handles creating and transmitting properly formatted ACH files to the ACH operator. Originating account balances are checked to ensure sufficient funds before initiating a transfer. |


## Payment management APIs

Use these APIs to manage payments and transfers.

### Transactions

The [Transactions API](https://docs.atelio.com/embedded/reference/transactions) manages all operations related to transactions. The attributes of the `transaction` object are valid for all types of payments; card, ACH, RDC, and account.

### Transfers

The [Transfers API](https://docs.atelio.com/embedded/reference/post-transfer) manages all fund transfers in and out of accounts. Each transfer has a unique transfer ID. The `origination_account_id` indicates where funds are taken from, while the `destination_account_id` indicates where funds are transferred to.

The Transfers API supports fund transfers between various account types, including:

- Linked account to a security deposit account
- Security deposit account to a linked account
- Security deposit account to a credit card account
- Credit card account to security deposit account
- Credit card account to/from a linked account

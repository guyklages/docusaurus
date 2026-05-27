# Account transfers

> 📘 **Note**
>
> Currently, only transfers in USD currency are supported.

The [Transfers API](https://docs.atelio.com/embedded/reference/post-transfer) manages all fund transfers in and out of accounts. When performing a transfer, the direction of the flow of funds is dictated by the `origination_account_id` (from which funds are extracted), and the `destination_account_id` (to which funds are deposited). Each transfer is represented by a unique `transfer_id`.

The Transfers API supports fund transfers between various account types, including:

- Linked external bank account to a security deposit account
- Security deposit account to a linked external bank account
- Security deposit account to a credit card account
- Credit card account to security a deposit account
- Credit card account to/from a linked external bank account

## ACH Transfers

ACH is a method of transferring money electronically between banks without the need for paper checks, cards, or wire transfers. Common examples of ACH transfers include payroll systems which issue ACH credit transactions to pay employees by direct deposits, or utility providers which issue ACH debit transactions to request direct payments from the consumer's bank account.

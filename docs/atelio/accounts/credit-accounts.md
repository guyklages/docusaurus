# Credit accounts

## Overview

Credit accounts offer a convenient solution to manage loans and credit lines within your application. These accounts store information, including the amount of credit owed and the credit limit, making it easy to track and manage outstanding balances. Once you've created a customer or business, you can open a credit account for them by creating and submitting a credit application.

## Credit applications

In order to determine whether your user is eligible for a secured charge card, you need to create and submit a credit application on their behalf containing their personal details.

After creating the application, you need to submit it. Submitting a credit application triggers the following:

- KYC process to ensure that the customer information is genuine
- Creation of a secured deposit account once the KYC process is approved

Once the customer has passed the KYC checks, a secured charge card can be issued but the limit on the card is $0 until funds are deposited in the security account. Creation of a card not only creates the card, but also creates an associated credit account.

If the KYC process fails, you can retrieve the failure reason using the the reason for the failure can be retrieved using the using the [GetAdverseActions](https://docs.atelio.com/embedded/reference/get-adverse-actions) endpoint.

## Supported operations

The Credit API provides a set of endpoints for you to manage credit accounts:

| Endpoint | Description |
|----------|-------------|
| [CreateCreditApplication](https://docs.atelio.com/embedded/reference/post-credit-applications)   | Start a credit application. |
| [ListCreditApplications](https://docs.atelio.com/embedded/reference/get-credit-applications)     | Retrieve a list of credit applications. |
| [GetCreditApplication](https://docs.atelio.com/embedded/reference/get-credit-applications-id)    | Retrieves the details of a specific credit application by ID. |
| [UpdateCreditApplication](https://docs.atelio.com/embedded/reference/patch-credit-applications)  | Update a credit application. |
| [SubmitCreditApplication](https://docs.atelio.com/embedded/reference/credit-applications-submit) | Submit a credit application. |
| [GetAdverseActions](https://docs.atelio.com/embedded/reference/get-adverse-actions)              | Get adverse actions for a credit application if applicable. |

## Show credit account data

This guide provides an overview of leveraging Atelio's credit account data to create account summary views for your customers with secured charge cards. Integrating Atelio's APIs allows you to seamlessly retrieve and display account information, empowering your customers to manage their secured charge card accounts effectively.

## Retrieving credit account data

To display account information for secured charge card customers, you'll need to call [GetAccount](https://docs.atelio.com/embedded/reference/get-accounts-by-id) to fetch the relevant credit account data, including the account balance, credit limit, and account numbers.

### Example credit account

The following JSON example illustrates the basic structure of a credit account:

```json
{
    "account_id": "8a543f24-90af-420e-be48-c3e651d8332b",
    "program_id": "e618458e-f4bd-4870-9244-d7e062794e58",
    "customer_id": "6ad049b3-108e-4a35-b743-0a875542dbb6",
    "date_updated": "2022-09-06T21:36:26.376769Z",
    "date_created": "2022-07-01T15:59:13.924400Z",
    "type": "credit",
    "status": "active",
    "routing_number": "084106768",
    "account_number": "9501118375993606",
    "cards": [\
        "4da1f1ff-95c4-412b-9dd1-8addb4dc6c99"\
    ],
    "balance": {
        "current_balance": -500,
        "available_balance": -1700,
        "previous_statement_balance": 0,
        "locked_balance": 0,
        "currency": "USD"
    },
    "credit": {
        "credit_limit": 15242,
        "security_deposit_account_id": "d574e241-3745-493f-a784-8e3108cec5d7"
    },
    "description": ""
}
```

## Useful Fields

The table below defines a few of the key fields you will use to display account information to customers with secured charge cards:

| Field | Description |
| --- | --- |
| `balance.current_balance` | The amount the cardholder owes on their account minus any pending purchases or payments. This is typically a negative value and will differ from `balance.available_balance` when there are pending transactions. |
| `balance.available_balance` | The amount the cardholder owes on their account, **including** any pending purchases or payments. This is typically a negative value. |
| `balance.previous_statement_balance` | The balance owed on the statement for the previous billing cycle. |
| `credit.credit_limit` | The balance of the security deposit account linked to this credit account. |
| `credit.security_deposit_account_id` | The account\_id of the security deposit account linked to this credit account. |

When displaying these in an account summary, you can simply access the fields directly from the credit account object.

## Calculating available to spend

One useful piece of information to present is the amount that is available to spend on the secured charge card. To calculate this, add the values for `balance.available_balance` and `credit.credit_limit`.

When a new credit account is created alongside a new secured charge card, the `available_balance` and `current_balance` both start at 0. As the customer makes more purchases, `available_balance` and `current_balance` take on greater negative values as they increase.

By adding the `available_balance` to the `credit_limit`, you will get the amount of available credit that the customer has left to use.

> 👍 **Available to Spend**
>
> `available_to_spend = balance.available_balance + credit.credit_limit`

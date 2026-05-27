# Create a transfer

# Overview

To execute a transfer, use the [CreateTransfer](https://docs.atelio.com/embedded/reference/post-transfer) operation and provide the body parameters as shown in the table below.

| Parameter                | Required | Type   | Description |
| ------------------------ | -------- | ------ | ----------- |
| `ach`                    | Required if the origination or destination account is an external account | object | Details of the `ach` transfer to be made, as shown in the **ach** object table below. |
| `amount`                 | Yes      | string | Transfer amount as a decimal string, for example `8550` being $85.50.<br/>Currently only USD is supported. |
| `description`            |          | string | Freeform description for the transfer. |
| `destination_account_id` | Yes      | string | Atelio account UUID (36 characters) for the transfer destination account, for example `6f0e7dcb-6073-42df-bf02-ce71bd5fac3b`. |
| `origination_account_id` | Yes      | string | Atelio account UUID (36 characters) for the originating account, for example `6f0e7dcb-6073-42df-bf02-ce71bd5fac3b`. |

The `ach` object has the structure shown in the table below.

| ACH object   | Required | Type    | Description |
| ------------ | -------- | ------- | ----------- |
| `class_code` | Yes      | string  | ACH Standard Entry Class (SEC) code. One of:<br/>`CCD`, `PPD`, `WEB` |
| `same_day`   | Yes      | boolean | ACH transfer network. Either `false`=standard, or `true`=same-day-ach. |


## Idempotency

> 📘 **Note**
>
> The KYC endpoint is idempotent and repeated requests using the same `Idempotency-Key` within a 24 hour period will fail.

Idempotency is a Web API design principle that prevents you from running the same operation multiple times. Because a certain amount of intermittent failure is to be expected, you need a way to reconcile failed requests with a server, and idempotency provides a mechanism for that. Including an idempotency key makes POST requests idempotent, which prompts the API to do the record keeping required to prevent duplicate operations. You can safely retry requests that include an idempotency key as long as the second request occurs within 24 hours from when you first receive the key (keys expire after 24 hours).

Providing the idempotency key string in the header is optional and example is shown below.

```json title="JSON"
{
   "Authorization": "<YOUR_AUTHORIZATION>",
   "Identity": "<YOUR_IDENTITY>",
   "Idempotency-Key": "dd6dcedd-2a11-4098-1223-876902123abc"
}
```

## Internal account-to-account transfers

The following request calls [CreateTransfer](https://docs.atelio.com/embedded/reference/post-transfer) to create an internal transfer for the amount of $10.00.

#### Example request of an internal transfer

```curl title="cURL"
curl --request POST \
     --url https://sandbox.atelio.com/api/v0.1/transfers \
     --header 'Accept: application/json' \
     --header 'Authorization: h+abc94585ef+JzvzRBGIYxikINh9q9kajuaUq6IdEAXBu' \
     --header 'Content-Type: application/json' \
     --header 'Identity: 4a4157b3-28a2-493c-b627-cf3c4dfd4dde' \
     --data '
{
     "origination_account_id": "6f0e7dcb-6073-42df-bf02-ce71bd5fac3b",
     "destination_account_id": "225641a5-f6e4-4ae1-b5e0-326e6b98842e",
     "description": "GIFT",
     "amount": 10
}
'
```

#### Example response

The following is an example of a response to a successful internal transfer request. The response includes the unique `transfer_id` representing the transfer. Note that the transfer `amount` is expressed as a decimal string in cents.

```json title="JSON"
{
  "date_created": "2020-10-09T17:14:09.686688",
  "date_updated": "2020-10-09T17:14:09.686688",
  "date_settled": "2020-10-13T17:14:09.686688",
  "transfer_id": "4ead6cdc-77eb-45fa-9959-3f166385a60a",
  "transaction_id": "0fec1e58-b197-4052-99cf-2218496c5482",
  "origination_account_id": "6f0e7dcb-6073-42df-bf02-ce71bd5fac3b",
  "destination_account_id": "225641a5-f6e4-4ae1-b5e0-326e6b98842e",
  "description": "GIFT",
  "amount": 1000
}
```

A successful request results in a `completed` status.


## ACH external transfers

The following request calls [CreateTransfer](https://docs.atelio.com/embedded/reference/post-transfer) and includes the `ach` object to create an ACH external transfer.

#### Example request of an ACH external transfer

```json title="JSON"
{
    "origination_account_id": "6f0e7dcb-6073-42df-bf02-ce71bd5fac3b",
    "destination_account_id": "225641a5-f6e4-4ae1-b5e0-326e6b98842e",
    "amount": 1000,
    "ach": {
        "class_code": "WEB",
        "same_day": true
    }
}
```

#### Example response

A successful `200` response to this ACH external transfer looks like:

```json title="JSON"
{
  "date_created": "2020-10-09T17:14:09.686688",
  "date_updated": "2020-10-09T17:14:09.686688",
  "date_settled": "2020-10-13T17:14:09.686688",
  "transfer_id": "4ead6cdc-77eb-45fa-9959-3f166385a60a",
  "transaction_id": "0fec1e58-b197-4052-99cf-2218496c5482",
  "origination_account_id": "6f0e7dcb-6073-42df-bf02-ce71bd5fac3b",
  "destination_account_id": "225641a5-f6e4-4ae1-b5e0-326e6b98842e",
  "description": "GIFT",
  "amount": 1000,
  "status": "submitted",
  "ach": {
    "ach_class_code": "WEB",
    "same_day": true
  }
}
```

## Credit Card Account to/from Linked Account transfers

Here is an example using the following account IDs for a $50.00 ACH transfer.

_Credit Card Account_: `26d1d34a-585a-493e-904f-e2a5feff42c0`

_Linked Account_: `0aca3af5-b7af-4c40-afdc-c2b610e59e5b`

If repaying from the Linked Account to the Credit Card Account, the _Linked Account_ is the `origination_account_id`. The request payload is shown below:

```json title="JSON"
{
    "origination_account_id": "0aca3af5-b7af-4c40-afdc-c2b610e59e5b",
    "destination_account_id": "26d1d34a-585a-493e-904f-e2a5feff42c0",
    "amount": 5000,
    "ach": {
        "class_code": "WEB",
        "same_day": true
    }
}
```

To move funds out of the Credit Card Account to the Linked Account, simply swap the `origination_account_id` and the `account_id`:

```json title="JSON"
{
    "origination_account_id": "26d1d34a-585a-493e-904f-e2a5feff42c0",
    "destination_account_id": "0aca3af5-b7af-4c40-afdc-c2b610e59e5b",
    "amount": 5000,
    "ach": {
        "class_code": "WEB",
        "same_day": true
    }
}
```

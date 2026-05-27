# Make a payment

## Statements

Statements contain information, such as transaction history, outstanding balance, and payment due date, and must be provided to your users during the repayment cycle. For details, see [Building statements](https://docs.atelio.com/embedded/docs/building-statements).


## Payments

You can make a payment to a card from either the security deposit account or from an externally linked bank account. Both options must be presented to your user, although one may be encouraged based on your product flow.

### Paying from a security deposit account

To initialize a transfer from our sample security deposit account to our card, use the [Create a transfer](https://docs.atelio.com/embedded/reference/post-transfer) API.

The following is an example of a transfer initialization request.

Transfer initialization request

```curl title="cURL"
curl --request POST \
     --url https://api.atelio.com/api/v0.1/transfers \
     --header 'Accept: application/json' \
     --header 'Authorization: <YOUR_AUTHORIZATION>' \
     --header 'Content-Type: application/json' \
     --header 'Identity: <YOUR_IDENTITY>' \
     --data '{
     	"origination_account_id": "173121d8-f05e-4bb6-b280-b5b761d2214f",
     	"destination_account_id": "e913d434-bda9-494e-b6df-adf46a52c1cc",
     	"description": "eline repayment",
    	"amount": 25600
		}'
```

Note that we use **`173121d8-f05e-4bb6-b280-b5b761d2214f`** from the `security_deposit_account_id` as our `origination_account_id` and **`e913d434-bda9-494e-b6df-adf46a52c1cc`** from the`credit_account_id` as our `destination_account_id`. This dictates that the funds should move from `security_deposit_account_id` to the `credit_account_id`.

The following is an example of a successful transfer initialization response.

```json title="JSON"
{
  "date_created": "2022-05-19T17:14:09.686688",
  "date_updated": "2022-05-19T17:14:09.686688",
  "date_settled": "2022-05-19T17:14:09.686688",
  "transfer_id": "4ead6cdc-77eb-45fa-9959-3f166385a60a",
  "transaction_id": "0fec1e58-b197-4052-99cf-2218496c5482",
  "origination_account_id": "173121d8-f05e-4bb6-b280-b5b761d2214f",
  "destination_account_id": "e913d434-bda9-494e-b6df-adf46a52c1cc",
  "description": "eline repayment",
  "amount": "25600"
}
```

### Paying from an external account

To initialize a transfer from an external bank account, use the [Create a transfer](https://docs.atelio.com/embedded/reference/post-transfer) API in the same way that we funded the security deposit account.

The following is an example of a transfer initialization request.

Transfer initialization request

```curl title="cURL"
curl --request POST \
     --url https://api.atelio.com/api/v0.1/transfers \
     --header 'Accept: application/json' \
     --header 'Authorization: <YOUR_AUTHORIZATION>' \
     --header 'Content-Type: application/json' \
     --header 'Identity: <YOUR_IDENTITY>' \
     --data '
{
     "ach": {
          "class_code": "WEB",
          "same_day": false
     },
     "origination_account_id": "f64eadeb-5398-46f7-b1a1-9a0a709039a9",
     "destination_account_id": "e913d434-bda9-494e-b6df-adf46a52c1cc",
     "description": "eline repayment",
     "amount": 25600
}
'
```

Note that we use **`f64eadeb-5398-46f7-b1a1-9a0a709039a9`** from the `external_account_id` as our `origination_account_id` and **`e913d434-bda9-494e-b6df-adf46a52c1cc`** from `credit_account_id` as our `destination_account_id`, This dictates that the funds should move from the `external_account_id` to the `credit_account_id`.

The following is an example of a successful transfer initialization response.

```json title="JSON"
{
  "date_created": "2022-05-19T17:14:09.686688",
  "date_updated": "2022-05-19T17:14:09.686688",
  "date_settled": null,
  "transfer_id": "e19472da-86c7-404c-8737-b64d9d120ece",
  "transaction_id": "cedc0221-9de6-4735-86d7-1ea89e0cc591",
  "origination_account_id": "f64eadeb-5398-46f7-b1a1-9a0a709039a9",
  "destination_account_id": "e913d434-bda9-494e-b6df-adf46a52c1cc",
  "description": "eline repayment",
  "amount": "25600",
  "ach": {
    "ach_class_code": "WEB",
    "same_day": false,
    "ach_return_code": "R73",
    "failure_reason": null
  }
}
```

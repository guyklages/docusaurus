# Pay by Bank (PBB) payments

## == Beta ==

## Overview

Pay by bank allows customers to make payments directly from their bank accounts in a safe, secure, and private way -- without entering their credit card or debit card number and without entering their bank routing or account numbers.

### Set up flow

Typically, a first-time user of Pay by Bank goes through a step-by-step process to select their banking details, so that the next time they return to Pay by Bank, they see a much shorter flow. They can always re-configure their banking details in the [Settings widget](https://docs.atelio.com/embedded/docs/pay-by-bank-app-overview#settings-widget) .

However, you can also start your user journey with the [Settings widget](https://docs.atelio.com/embedded/docs/pay-by-bank-app-overview#settings-widget) to select and configure your banking details first. If you do that, then the first or next time you Pay by Bank, you'll see the same shorter experience.

### Web and mobile support

The Atelio app is embeddable via a secure URL and designed to work in web applications (via an [iframe](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/iframe)) or native mobile applications (via [WebViews](https://developer.apple.com/documentation/webkit/wkwebview)). It utilizes a responsive UI with full support for desktop, tablet, and mobile screens.

## General integration steps

It's recommended that you always use the sandbox until you've thoroughly tested your API calls.

| Environment | URL |
| --- | --- |
| Sandbox | `api-sandbox.lending.embedded.atelio.com` |
| Production | `api.lending.embedded.atelio.com` |

To integrate Pay by Bank, do the following:

1. [Obtain tokens](https://docs.atelio.com/embedded/docs/pay-by-bank-payments#1-obtain-tokens)
2. [Create a Pay by Bank deposit account](https://docs.atelio.com/embedded/docs/pay-by-bank-payments#3-create-a-pbb-deposit-account)
3. [Create a Pay by Bank user](https://docs.atelio.com/embedded/docs/pay-by-bank-payments#4-create-a-pbb-user)
4. [Create a payment for the Pay by Bank user](https://docs.atelio.com/embedded/docs/pay-by-bank-payments#5-create-a-payment-for-the-pay-by-bank-user)
5. [Obtain Pay by Bank user-scoped tokens](https://docs.atelio.com/embedded/docs/pay-by-bank-payments#6-obtain-pbb-user-scoped-tokens)
6. [Mount a payments widget in an iframe](https://docs.atelio.com/embedded/docs/pay-by-bank-payments#7-mount-a-payments-widget-in-an-iframe)
7. [Mount Pay by Bank settings widget](https://docs.atelio.com/embedded/docs/pay-by-bank-payments#8-mount-pay-by-bank-setting-widget)

### 1. Obtain tokens

To start the integration, request an `access_token` and a `refresh_token` using your brand's API key.

Note: The `business_id` is the unique identifier of your business in your system.

#### Request in Sandbox: 

```curl title="cURL"
curl --location 'https://api-sandbox.lending.embedded.atelio.com/api/v0/auth/' \
--header 'Content-Type: application/json' \
--data '{
    "business_id": "617a6028-1272-4104-b610-9f2b6a6b8290",
    "scopes": "openid embedded.pbb.admin"
}'
```

#### Expected Response:

```json title="JSON"
{
    "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjkyMWQ3YTJiLThkY2UtNDE3ZS05ZTc0LThjYWQxN2RjZWE4ZCIsImNsaWVudF9pZCI6ImIyMzVkMzBlLTJjZTMtNDc2ZS1hMDE5LTgzM2UwNTY4OWQyZCIsImV4cCI6MTczODkxMDkyOSwiaWF0IjoxNzM4OTA3MzI5LCJzY29wZXMiOiJvcGVuaWQgZW1iZWRkZWQucGJiLnVzZXIifQ.yN0NZfHmwHUBELWov5Rk3O1JKR-GetHqtkWseN7WIWY",
    "refresh_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjkyMWQ3YTJiLThkY2UtNDE3ZS05ZTc0LThjYWQxN2RjZWE4ZCIsImNsaWVudF9pZCI6ImIyMzVkMzBlLTJjZTMtNDc2ZS1hMDE5LTgzM2UwNTY4OWQyZCIsImV4cCI6MTczODkyMTcyOSwiaWF0IjoxNzM4OTA3MzI5fQ.bWZABQVBaCtkWNU6jsSpnA5MPJapZD_1EArw1-VWhzA"
}
```

### 2. Create a PBB deposit account

If you haven't opened an account yet, follow the required steps of our [commercial account onboarding process](https://docs.atelio.com/embedded/docs/deposit-accounts#create-a-commercial-deposit-account) to _Create a Business_ and _Complete KYB_. Next, create a [Pay by Bank deposit account](https://docs.atelio.com/embedded/docs/deposit-accounts#create-a-pay-by-bank-deposit-account) (and not a general Commercial Deposit account) to accept your Pay by Bank payments.

The _funding account_ in the code below is a Pay by Bank deposit account, where where Pay by Bank payments are deposited. The request must be authorized using the `access_token` you obtained when integrating Pay by Bank.

#### Request in Sandbox:

```curl title="cURL"
curl --location --request POST 'https://api-sandbox.lending.embedded.atelio.com/api/v0/accounts/funding_account' \
--header 'Authorization: Bearer your-pbb-admin-scoped-access-token' \
--data ''
```

#### Expected Response:

```json title="JSON"
{
    "account_id": "1af2d7d9-d199-4974-bfc1-24253a18784b",
    "program_id": "cbb4efbe-a880-4ecf-ae7f-bc96fccbb757",
    "business_id": "ca80e995-a81e-463f-b586-8fa6588c5d79",
    "date_updated": "2025-02-07T05:53:12.575443Z",
    "date_created": "2025-02-07T05:53:12.575438Z",
    "type": "deposit",
    "status": "active",
    "routing_number": "084******",
    "account_number": "************2589",
    "balance": {
        "previous_statement_balance": 0,
        "current_balance": 0,
        "available_balance": 0,
        "locked_balance": 0,
        "currency": "USD"
    },
    "deposit": {},
    "description": "",
    "cards": []
}
```

### 3. Create a PBB user

Create a Pay by Bank user by passing:

| Parameter              | Description |
|------------------------|-------------|
| `brand_supplied_email` | User's email ID within the customer's system |
| `external_user_id`     | Unique identifier for the payer in your system   |

For payment risk assessment and anti-fraud screening, it's recommended that you include the following optional fields that are associated with the user in the customer's system:

#### Basic User Information

| Parameter          | Description |
|--------------------|-------------|
| `first_name`       | User's first name |
| `middle_name`      | User's middle name |
| `last_name`        | User's last name |
| `date_of_birth`    | User's date of birth |

#### OIDC Standard Fields

| Parameter               | Description |
|-------------------------|-------------|
| `address`               | User's postal address following _RFC 5733/vCard_ format |
| `amr`                   | Authentication methods used, such as `pwd` or `mfa` |
| `auth_time`             | Time when the end-user authentication occurred (seconds since `1970-01-01T00:00:00Z`) |
| `email`                 | End user's email address |
| `email_verified`        | Whether or not the end-user's email has been verified |
| `phone_number`          | Phone number with country code in E.164 format, such as `+12125551234` |
| `phone_number_verified` | Whether or not the phone number has been verified |
| `sub`                   | Unique identifier for the end-user |

#### Account History Fields

| Parameter                        | Description |
|----------------------------------|-------------|
| `account_create_date`            | Date when payer's login for the brand was created (`YYYY-MM-DD` format) |
| `account_transaction_count`      | Count of prior payment transactions |
| `account_transaction_first_date` | Date of first payment transaction (`YYYY-MM-DD` format) |
| `account_type`                   | Type of account: `GUEST` or `MEMBER` |

#### Request in Sandbox:

```curl title="cURL"
curl --location 'https://api-sandbox.lending.embedded.atelio.com/api/v0/pbb/user' \
--header 'Content-Type: application/json' \
--header 'Authorization: Bearer your-pbb-admin-scoped-access-token' \
--data '{
    "external_user_id": "your-unique-payer-id",
    "brand_supplied_email": "payer@example.com",
    "first_name": "John",
    "last_name": "Doe",
    "date_of_birth": "1990-01-01",
    "email": "john.doe@example.com",
    "email_verified": true,
    "phone_number": "+12125551234",
    "phone_number_verified": true,
    "auth_time": 1714503245,
    "amr": ["pwd", "mfa"],
    "address": {
        "street_address": "123 Main St\nApt 4B",
        "locality": "New York",
        "region": "NY",
        "postal_code": "10001",
        "country": "US"
    },
    "account_create_date": "2023-05-15",
    "account_type": "MEMBER",
    "account_transaction_count": 12,
    "account_transaction_first_date": "2023-06-01"
}'
```

#### Expected Response:

```json title="JSON"
{
    "id": "c0155f4f-990f-4e7d-969b-958a87900c87",
    "business_id": "9a8b9f3b-6632-4c91-8098-aa15ec663904",
    "brand_id": "b235d30e-2ce3-476e-a019-833e05689d2d",
    "external_user_id": "your-unique-payer-id",
    "brand_supplied_email": "payer@example.com",
    "program_id": "1f6cc978-f14c-413a-a2cb-273daa147464",
    "first_name": "John",
    "middle_name": "L",
    "last_name": "Doe",
    "date_of_birth": "1908/11/28",
    "remember_me": false,
    "default_linked_account_id": null
}
```

### 4. Create a PBB payment

To process a payment for a Pay by Bank user, pass the following parameters:

| Parameter     | Description |
| ------------- | ----------- |
| `amount`      | The payment amount. |
| `payee_name`  | Your business' name. |
| `pbb_user_id` | Created in the previous step. |

#### Example Request:

```curl title="cURL"
curl --location 'https://api-sandbox.lending.embedded.atelio.com/api/v0/pbb/payments' \
--header 'Content-Type: application/json' \
--header 'Authorization: Bearer your-pbb-admin-scoped-access-token' \
--data '{
    "amount": "15.89",
    "payee_name": "Lu's Good Clinic",
    "brand_pbb_transaction_id": "your-transaction-id",
    "pbb_user_id": "pbb-user-id"
}'
```

#### Expected Response:

```json title="JSON"
{
    "id": "8c3abacb-8f81-47cd-9782-8b4dcfbc0138",
    "amount": "15.75",
    "payee_name": "Good Clinic",
    "brand_pbb_transaction_id": "907fb8bf-279a-4c7b-88fd-7a374c5cd358",
    "pbb_user_id": "97c235fb-4b72-472d-9c5a-837b9951900e",
    "business_id": "6bb356b7-1e70-4860-978b-6faa2e3491de",
    "linked_pbb_account_id": null,
    "process_stage": "pending_to_link_account",
    "transaction_id": null
}
```

> 📘 **Note**
>
> The `brand_pbb_transaction_id` field is optional and can hold the unique payment transaction identifier from your system. Use our unique `id` (payment ID) from the response to fetch and track all payment-related information.

### 5. Obtain PBB tokens

Request a user-scoped access token using your brand’s API key.

A refresh token will also be returned with your access token.

#### Example Request:

```curl title="cURL"
curl --location 'https://api-sandbox.lending.embedded.atelio.com/api/v0/auth/' \
--header 'Content-Type: application/json' \
--data '{
    "business_id": "617a6028-1272-4104-b610-9f2b6a6b8290",
    "scopes": "openid embedded.pbb.user"
}'
```

#### Expected Response:

```json title="JSON"
{
    "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjkyMWQ3YTJiLThkY2UtNDE3ZS05ZTc0LThjYWQxN2RjZWE4ZCIsImNsaWVudF9pZCI6ImIyMzVkMzBlLTJjZTMtNDc2ZS1hMDE5LTgzM2UwNTY4OWQyZCIsImV4cCI6MTczODkxMDkyOSwiaWF0IjoxNzM4OTA3MzI5LCJzY29wZXMiOiJvcGVuaWQgZW1iZWRkZWQucGJiLnVzZXIifQ.yN0NZfHmwHUBELWov5Rk3O1JKR-GetHqtkWseN7WIWY",
    "refresh_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjkyMWQ3YTJiLThkY2UtNDE3ZS05ZTc0LThjYWQxN2RjZWE4ZCIsImNsaWVudF9pZCI6ImIyMzVkMzBlLTJjZTMtNDc2ZS1hMDE5LTgzM2UwNTY4OWQyZCIsImV4cCI6MTczODkyMTcyOSwiaWF0IjoxNzM4OTA3MzI5fQ.bWZABQVBaCtkWNU6jsSpnA5MPJapZD_1EArw1-VWhzA"
}
```

### 6. Mount payments widget

Use the two [PBB user-scoped tokens](https://docs.atelio.com/embedded/docs/pay-by-bank-payments#5-obtain-pbb-user-scoped-tokens) along with your `pbb_user_id` and `payment_id` to mount the Pay by Bank UI widget in an iframe.

#### Example mount:

```curl title="cURL"
https://pay-by-bank.embedded.atelio.com?access_token=${tokens.accessToken}&refresh_token=${tokens.refreshToken}&payment_id={payment_id}&pbb_user_id={pbb_user_id}
```

### 7. Mount settings widget

Allow Pay by Bank users to manage their saved account in their [Settings](https://docs.atelio.com/embedded/docs/pay-by-bank-payments#settings-widget) pages. You can embed this widget in your User profile or Payments Settings (Wallet) pages in your system. Here’s how you mount the Pay by Bank Settings UI.

#### Example mount:

```curl title="cURL"
https://pay-by-bank.embedded.atelio.com/setting-preferences?access_token=${tokens.accessToken}&refresh_token=${tokens.refreshToken}&pbb_user_id={pbb_user_id}
```


## iframe integration steps

To embed the Pay by Bank UI within an Iframe and set up transaction webhook events for real-time payment updates, perform the following steps:

1. [Obtain tokens](https://docs.atelio.com/embedded/docs/pay-by-bank-payments#obtain-tokens)
2. [Construct the UI URL](https://docs.atelio.com/embedded/docs/pay-by-bank-payments#construct-the-ui-url)
3. [Embed the URL in an iframe](https://docs.atelio.com/embedded/docs/pay-by-bank-payments#embed-the-url-in-an-iframe)
4. [Set up webhook events](https://docs.atelio.com/embedded/docs/pay-by-bank-payments#set-up-webhook-events)

### 1. Obtain tokens

To embed the Pay by Bank UI, you need to pass a few query parameters in the iframe URL, including an `access_token` and a `refresh_token`. Use the following steps to retrieve these tokens.

Make a `POST` request to the [authentication](https://docs.atelio.com/embedded/reference/authentication-post) endpoint using your unique:

- authorization header
- identity header
- business ID

```curl title="cURL"
curl --request POST <https://api-sandbox.lending.embedded.atelio.com/api/v0/auth/>
  --header 'Content-Type: application/json'
  --header 'Authorization: \<YOUR_AUTH_HEADER>'
  --header 'Identity: \<YOUR_IDENTITY_HEADER>'
  --data '{
      "business_id": "{{BUSINESS_ID_IN_YOUR_SYSTEM}}"
  }'
```

Save the returned `access_token` and `refresh_token` to be used for constructing your iframe URL, similar to the following response:

```curl title="cURL"
{
   "access_token": "eyJhbGciOiJIUzI1NiI...PpUNczyMpgAXPpXdok894YRextI6yrkb8s",
   "refresh_token": "eyJhbGciOiJIUzI1Ni...m96uicvw-5hvIUbHix5O3Rj7mqpTnI2dAQA"
}
```

### 2. Construct the UI URL

Use the retrieved tokens and the required parameters to construct the URL for the iframe.

Example: use the following cURL statement inside the `iframe src="..."` double-quote marks.

For the Pay by Bank payments flow:

```curl title="cURL"
https://pay-by-bank.embedded.atelio.com?access_token=${tokens.accessToken}&refresh_token=${tokens.refreshToken}&payment_id={payment_id}&pbb_user_id={pbb_user_id}
```

For the Pay by Bank settings page:

```curl title="cURL"
https://pay-by-bank.embedded.atelio.com/setting-preferences?access_token=${tokens.accessToken}&refresh_token=${tokens.refreshToken}&pbb_user_id={pbb_user_id}
```

URL parameters:

| URL parameter | Description |
| --- | --- |
| `access_token` | The access token retrieved from the authentication request. |
| `refresh_token` | The refresh token retrieved from the authentication request. |
| `payment_id` | The unique ID for the Pay by Bank payment returned by the Create Pay by Bank payment API. |
| `pbb_user_id` | The unique ID for the Pay by Bank user returned by the Create Pay by Bank User API. |

### 3\. Embed the URL in an iframe

Once you’ve constructed the URL, embed it within an iframe in your web application:

```curl title="cURL"
<iframe src="<YOUR_CONSTRUCTED_URL>" width="100%" height="600px" frameborder="0"></iframe>
```

Replace `<YOUR_CONSTRUCTED_URL>` with the full URL constructed in the previous step.

### 4\. Set up webhook events

To receive real-time transactions status updates, set up webhooks to listen for specific transaction events.

Detailed information on transaction webhooks is available in the [Transaction Webhook Documentation](https://docs.atelio.com/embedded/docs/event-subscriptions#transaction-event-example) .

## Pay by Bank refunds API

You or your user might want to cancel a previous Pay by Bank payment due to a qualified reason or error. In those cases, you would want to reverse the transaction by issuing a refund to the Payer.

### Refund an amount

`POST /api/v0.1/transfers/pbb_refund/{transaction_id}`

Use this API endpoint to refund an amount (`refund_amount`) for a particular Pay by Bank transaction (`transaction_id`).

You can obtain transaction IDs by using [webhooks](https://docs.atelio.com/embedded/reference/webhooks) or [GET transactions](https://docs.atelio.com/embedded/reference/transactions) .

Note: You can send multiple refunds as long as the total of these transactions does not exceed the original transaction amount.

```json title="JSON"
payload {
  "refund_amount": <YOUR_REFUND_AMOUNT>
  "business_id": "<YOUR_BUSINESS_ID>"
}
```

#### Response `201`

```json title="JSON"
refund payload {
            "transfer_id": "abc",
            "origination_account_id": "account_id",
            "destination_account_id": "account_id",
            "description": "description",
            "amount": 12345,
            "status": "pending",
            "ach": {"class_code": "WEB", "same_day": true},
            "date_created": "2020-10-09T17:14:09.686688",
            "date_updated": "2020-10-09T17:14:09.686688"
        }
```

### List all refunds

`GET /api/v0.1/transfers/pbb_refund/{original_transaction_id}`

Use this API endpoint to list all refunds created on the `original_transaction_id`.

```json title="JSON"
refund payload{
  refunds: [
      {
		“transaction_id”: “abc”,
“refund_amount”: 145,
“status”: ”pending”,
“original_transaction_id”: ”xyz”
 },
      {
		“transaction_id”: “bcd”,
“original_transaction_id”:”xyz”,
...
 },
 ...
  ]
}
```

## == Beta == 

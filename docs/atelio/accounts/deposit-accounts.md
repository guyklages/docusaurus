# Deposit accounts

## Introduction

Deposit accounts, a crucial component of your banking platform, empower you to offer an account to store funds and execute money movement. With their quick fund transfer capabilities and the option to link to external accounts like bank accounts and other account types within your platform ecosystem, these accounts provide convenience to your customers, allowing them to easily manage their finances.

### Deposit account types

Atelio offers two primary deposit account types, **Commercial** and **Consumer** accounts, each designed to bring unique benefits to your banking platform. These accounts provide tailored features that cater to your business's and individual customers' specific requirements. With Atelio's APIs, you can seamlessly create and integrate commercial and consumer deposit accounts into your platform.


## Integration flow

The following steps represent the workflow for using Account APIs to create a commercial or consumer deposit account:

### Commercial accounts

1. **Get your program ID**: Start by retrieving your program ID from the Atelio Portal under the **Developers** tab.
2. **Create a business**: Use the [CreateBusiness](https://docs.atelio.com/embedded/reference/post_businesses) endpoint to create a business and input details about the business such as `legal_business_name`, `ein`, and `business_type`.
3. **Run KYB**: Use the [StartKYB](https://docs.atelio.com/embedded/reference/post_kyb_2) endpoint to start the KYB verification process.
4. **Create a deposit account:** Call CreateAccount and specify the `business_id` to create and associate the deposit account with the applicable business.

### Consumer accounts

1. **Get your program ID**: Start by retrieving your program ID from the Atelio Portal under the **Developers** tab.
2. **Create a customer**: Use the [CreateCustomer](https://docs.atelio.com/embedded/reference/post_customers) endpoint to create a customer and input details about the customer such as `first_name`, `last_name`, and `dob`.
3. **Run KYC**: Use the [StartCustomerKYC](https://docs.atelio.com/embedded/reference/post_verification_kyc) endpoint to start a KYC verification for the customer. Await approval from webhooks.
4. **Create a deposit account:** Call [CreateAccount](https://docs.atelio.com/embedded/reference/post-accounts) and specify the `customer_id` to create and associate the deposit account with the applicable customer.


## Consumer deposit account

On Atelio's platform, every one of your consumers that is issued a financial product must have an associated [Customer](https://docs.atelio.com/embedded/docs/customer) object. This customer object stores important information on the consumer, including name, address, and other sensitive information that is required for regulatory purposes. This guide walks through onboarding an imaginary consumer named Christine Smith, who lives at Atelio HQ.

### Consumer prerequisites

**Find your program ID**: Start by retrieving your program ID from the Atelio Portal. A program ID is a UUID value that represents a relationship between you and a bank and is often associated one-to-one with a financial product. In this guide, our program ID will be affiliated with consumer debit accounts. You can find your program ID in the Atelio Portal under the `Developers` tab. For more information on what a program ID represents, please see [Card program ID](https://docs.atelio.com/embedded/docs/card-program-id).

To create a consumer deposit account, do the following steps:

1. [Create a customer](https://docs.atelio.com/embedded/docs/deposit-accounts#create-a-customer)
2. [Run KYC](https://docs.atelio.com/embedded/docs/deposit-accounts#run-kyc)
3. [Create a consumer deposit account](https://docs.atelio.com/embedded/docs/deposit-accounts#create-a-consumer-deposit-account)

### Create a customer

The following example request creates a customer profile for Christine Smith. See the API reference for more information on the request and response schema for the [CreateCustomer](https://docs.atelio.com/embedded/reference/post_customers) endpoint. Note that the `brand_person_id` field is provided in case you want to include a unique UUID to help associate between Atelio's `customer` ID and your own internal `user` ID. For this request, we'll pass a random UUID `6723febc-61e5-4aed-9f83-f7f1e0f1b6bc`.

#### Example request

```curl
curl --request POST \
  --url https://sandbox.atelio.com/api/v0.1/customers/ \
  --header 'Identity: <YOUR_IDENTITY>' \
  --header 'Authorization: <YOUR_AUTHORIZATION>' \
  --header 'Content-Type: application/json' \
  --data '{
    "brand_person_id": "<YOUR_INTERNAL_USER_ID>",
    "dob":"1999-12-25",
    "last_name":"Smith",
    "first_name":"Christine",
    "addresses":[
      {
        "address_type":"PHYSICAL",
        "street":"345 California Ave.",
        "street2": "Suite 600",
        "city": "San Francisco",
        "state": "CA",
        "zip_code": "12345-1234",
        "country": "US",
        "is_primary": true
      }
    ]
  }'
```

#### Example response

Upon success, Atelio returns a `201` status with the customer's details in a JSON file, including the `customer_id` UUID value `ee268265-1f29-4603-a958-a9b0ab7ce573`, which uniquely identifies the newly created customer object associated with Christine.

```json
{
    "customer_id": "ee268265-1f29-4603-a958-a9b0ab7ce573",
    "bond_brand_id": "abaa2147-4533-4ec7-a9f6-bd88a988ecd1",
    "brand_person_id": "6723febc-61e5-4aed-9f83-f7f1e0f1b6bc",
    "date_created": "2022-04-19T22:02:16.062792+00:00",
    "dob": "1999-12-25",
    "first_name": "Christine",
    "middle_name": "",
    "last_name": "Smith",
    "kyc_requests_available": 3,
    "addresses": [
        {
            "address_id": "d172892e-49ef-4af5-9925-cf626371efba",
            "address_type":"PHYSICAL",
            "street":"345 California Ave.",
            "street2": "Suite 600",
            "city": "San Francisco",
            "state": "CA",
            "zip_code": "12345-1234",
            "country": "US",
            "is_primary": true,
            "date_created": "2022-04-19T22:02:16.065774+00:00"
        }
    ]
}
```

### Run KYC

After providing Atelio with initial information on your user during customer creation, the next step is to initiate KYC.

Call [StartCustomerKYC](https://docs.atelio.com/embedded/reference/post_verification_kyc) to begin the KYC verification process. In the example below, we initialized the KYC request for Christine. In the request, we included the `customer_id` value from the previous step as a path parameter and the program\_id value in our request body.

Refer to the API reference for more information on the request and response schemas for the [StartCustomerKYC](https://docs.atelio.com/embedded/reference/post_verification_kyc) API.

#### Example request

```curl
curl --request POST \
  --url https://sandbox.atelio.com/api/v0.1/customers/ee268265-1f29-4603-a958-a9b0ab7ce573/verification-kyc \
  --header 'Identity: <YOUR_IDENTITY>' \
  --header 'Authorization: <YOUR_AUTHORIZATION>' \
  --header 'Content-Type: application/json' \
  --data '{
    "program_id": "<YOUR_PROGRAM_ID>",
    "ssn": "123-45-6789",
    "phone": "1234567890",
    "phone_country_code": "1",
    "email": "example@atelio.com",
    "ip": "127.0.0.1"
}'
```

#### Example Response

Upon success, the KYC service returns a `201` status with the `kyc_status` in a JSON file.

```json
{
    "customer_id": "ee268265-1f29-4603-a958-a9b0ab7ce573",
    "kyc_status": "submitted"
}
```

The `submitted` state indicates that Atelio's platform has successfully received the KYC request. After processing the KYC request, the status of the KYC will automatically update. You can request the new by calling [RetrieveKYCStatus](https://docs.atelio.com/atelio/reference/get_verification_kyc) or via a [Webhooks](https://docs.atelio.com/embedded/docs/webhook) subscription.

Once the customer's KYC status reaches `passed,` you can proceed to create a deposit account.

### Create a consumer deposit account

After executing the appropriate follow-up steps when running the KYC, the customer object is now prepared fpr creating a deposit account. Call [CreateAccount](https://docs.atelio.com/embedded/reference/post-accounts) to create a deposit account. An example of a deposit account creation request is provided below. The example request below creates an account by specifying the `customer_id` in the request body.

#### Example request

```curl
curl --request POST 'https://api.atelio.com/api/v0.1/accounts' \
--header 'Identity: <YOUR_IDENTITY>' \
--header 'Authorization: <YOUR_AUTHORIZATION>' \
--header 'Content-Type: application/json' \
--data-raw '{
  "program_id": "<YOUR_PROGRAM_ID>",
  "customer_id": "ee268265-1f29-4603-a958-a9b0ab7ce573",
  "type": "deposit"
}'
```

#### Example response 

Upon success, Atelio returns a `200` status in a JSON file with the details of the consumer deposit account including the following:

- `account_id`: Used for checking balances, getting transactions, and initiating both ACH and instant transfers
- `routing_number/account_number`: Initiates External ACH transfers.

```json
{
    "account_id": "a90708df-72a5-4cc3-a497-e1ad27ccae46",
    "date_updated": "2022-04-22T17:07:03.034183+00:00",
    "date_created": "2022-04-22T17:07:03.034177+00:00",
    "program_id": "<YOUR_PROGRAM_ID>",
    "customer_id": "ee268265-1f29-4603-a958-a9b0ab7ce573",
    "type": "deposit",
    "status": "active",
    "routing_number": "084101234",
    "account_number": "2834461234567890",
    "description": "deposit account",
    "balance": {
        "previous_statement_balance": 0,
        "available_balance": 0,
        "current_balance": 0,
        "currency": "USD"
    },
    "cards": []
}
```

## Commercial deposit account

Commercial deposit accounts can hold and manage funds for your business customers. On Atelio's platform, every one of your business customers that is issued a financial product must have an associated [Business](https://docs.atelio.com/embedded/docs/businesses) object.

The business object is a key component of Atelio's platform. It stores vital information about your business customers, including their legal business name, type, address, beneficial owners, and employer identification number.

This guide will walk you through the onboarding process of an imaginary business named Acme Inc., based in San Francisco. We'll start by calling [CreateBusiness](https://docs.atelio.com/embedded/reference/post_businesses) to create a business for Acme Inc.

### Commercial prerequisites

**You need a program ID**: Start by retrieving your program ID from the Atelio Portal. A program ID is a UUID value that represents a relationship between you and a bank and is often associated one-to-one with a financial product. In this guide, our program ID will be affiliated with commercial debit accounts. You can find your program ID in the Atelio Portal under the `Developers` tab. For more information on what a program ID represents, please see [Card program ID](https://docs.atelio.com/embedded/docs/card-program-id).

Then you can do the following steps:

1. [Create a business](https://docs.atelio.com/embedded/docs/deposit-accounts#create-a-business)
2. [Run KYB](https://docs.atelio.com/embedded/docs/deposit-accounts#run-kyb)
3. [Create a commercial deposit account](https://docs.atelio.com/embedded/docs/deposit-accounts#create-a-commercial-deposit-account)

### Create a business

The following example request creates a business for Acme Inc. See the API reference for more information on the request and response schema for the [CreateBusiness](https://docs.atelio.com/embedded/reference/post_businesses) endpoint.

#### Example request

```curl
curl --request POST \
  --url https://sandbox.atelio.com/api/v0.1/businesses/ \
  --header 'Identity: <YOUR_IDENTITY>' \
  --header 'Authorization: <YOUR_AUTHORIZATION>' \
  --header 'Content-Type: application/json' \
  --data '{
  "ein": "12-1234567",
  "phone": "+14085557788",
  "email": "company@acme.tech",
  "website": "https://www.acme.tech",
  "legal_business_name": "Acme Inc.",
  "dba_business_name": "Acme Inc.",
  "business_type": "corporation",
  "addresses": [
    {
      "address_type": "MAILING",
      "street": "345 California Ave.",
      "street2": "Suite 600",
      "city": "San Francisco",
      "state": "CA",
      "zip_code": "12345-1234",
      "country": "US",
      "is_primary": true
    },
    {
      "address_type": "PHYSICAL",
      "street": "123 California Ave.",
      "street2": "Suite 100",
      "city": "San Francisco",
      "state": "CA",
      "zip_code": "12345-1234",
      "country": "US",
      "is_primary": false
    }
  ],
  "beneficial_owners": [
    {
      "first_name": "James",
      "last_name": "Atelio",
      "dob": "1970-12-12",
      "addresses": [
        {
          "address_type": "MAILING",
          "street": "345 California Ave.",
          "street2": "Suite 600",
          "city": "San Francisco",
          "state": "CA",
          "zip_code": "12345-1234",
          "country": "US",
          "is_primary": true
        }
      ]
    }
  ]
}'
```

#### Example Response

Upon success, Atelio returns a `201` status code and details about the new business in a JSON file, including the `business_id` and the `beneficial_owner_id`. Note the following UUID values for the `business_id` and `beneficial_owner_id`, as we will need them in the following steps.

- `business_id` :`b57ecb2f-659d-4bfe-a61d-ef56000226a6`
- `beneficial_owner_id`: `6578bd28-35dc-4b10-b1f5-3e9c655df7e6`

```json
{
    "date_created": "2022-08-25T16:35:23.770199+00:00",
    "addresses": [
        {
            "date_created": "2022-08-25T16:35:23.775334+00:00",
            "address_id": "87c90c92-701f-423c-ab19-33c6043f9d2f",
            "address_type": "MAILING",
            "street": "345 California Ave.",
            "street2": "Suite 600",
            "city": "San Francisco",
            "state": "CA",
            "zip_code": "12345-1234",
            "country": "US",
            "is_primary": true
        },
        {
            "date_created": "2022-08-25T16:35:23.776317+00:00",
            "address_id": "f3d10c09-74c5-4a78-ba92-65a53f6757e4",
            "address_type": "PHYSICAL",
            "street": "123 California Ave.",
            "street2": "Suite 100",
            "city": "San Francisco",
            "state": "CA",
            "zip_code": "12345-1234",
            "country": "US",
            "is_primary": false
        }
    ],
    "beneficial_owners": [
        {
            "date_created": "2022-08-25T16:35:23.772728+00:00",
            "addresses": [
                {
                    "date_created": "2022-08-25T16:35:23.777525+00:00",
                    "address_id": "2339bd4c-a71e-4ddd-b0a0-58978b473ccb",
                    "address_type": "MAILING",
                    "street": "345 California Ave.",
                    "street2": "Suite 600",
                    "city": "San Francisco",
                    "state": "CA",
                    "zip_code": "12345-1234",
                    "country": "US",
                    "is_primary": true
                }
            ],
            "beneficial_owner_id": "6578bd28-35dc-4b10-b1f5-3e9c655df7e6",
            "first_name": "James",
            "middle_name": null,
            "last_name": "Atelio",
            "dob": "1970-12-12",
            "ssn": null,
            "phone": null,
            "email": null
        }
    ],
    "business_id": "b57ecb2f-659d-4bfe-a61d-ef56000226a6",
    "ein": "12-1234567",
    "legal_business_name": "Acme Inc.",
    "dba_business_name": "Acme Inc.",
    "business_type": "corporation",
    "date_established": null,
    "phone": "+14085557788",
    "email": "company@acme.tech",
    "website": "https://www.acme.tech"
}
```

### Run KYB

> 🚧 **Requirement**
>
> Before running KYB, make sure that the business resource contains the `ein` and `phone` values and that they're correct.
>
> You can call the [RetrieveBusiness](https://docs.atelio.com/embedded/docs/business-onboarding-overview#retrieve-businesses) endpoint to view the `ein` and `phone` status, and the [UpdateBusiness](https://docs.atelio.com/embedded/docs/managing-businesses) to modify them if necessary.

Next you'll need to validate the business customer in Atelio through the Know-Your-Business (KYB) process by calling [StartKYB](https://docs.atelio.com/atelio/reference/post_kyb_2) using the Acme ```businessI_id``b57ecb2f-659d-4bfe-a61d-ef56000226a6```.

#### Example request

```curl
curl --request POST \
  --url https://sandbox.atelio.com/api/v0.1/businesses/b57ecb2f-659d-4bfe-a61d-ef56000226a6/post_kyb_2 \
  --header 'Authorization: <YOUR_AUTHORIZATION>' \
  --header 'Identity: <YOUR_IDENTITY>'
```

#### Example response

Upon success the KYB service returns a 200 status with an `initiated` JSON message.

```json
{
    "business_id": "b57ecb2f-659d-4bfe-a61d-ef56000226a6",
    "kyb_status": "initiated"
}
```

#### Retrieve KYB status

The results of the KYB are sent via a [webhook](https://docs.atelio.com/embedded/docs/webhook). You can also call [GetKYBStatus](https://docs.atelio.com/embedded/reference/get_business) to get the KYB status.

#### Example request

```curl
curl --request GET \
  --url https://sandbox.atelio.com/api/v0.1/businesses/b57ecb2f-659d-4bfe-a61d-ef56000226a6/verification-kyb \
  --header 'Authorization: <YOUR_AUTHORIZATION>' \
  --header 'Identity: <YOUR_IDENTITY>'
```

#### Example responses

Upon success, the KYB service returns a `200` status with an `approved` JSON status indicating that Acme has passed KYB.

```json
{
   "business_id": "b57ecb2f-659d-4bfe-a61d-ef56000226a6",
   "kyb_status": "approved",
}
```

The following example includes a JSON response if you're using a webhook subscription to monitor KYB status.

```json
{
  "event": "kyb.verification.approved",
  "business_id": "b57ecb2f-659d-4bfe-a61d-ef56000226a6",
  "occurred_at": "2022-07-15T17:06:41.122010+00:00"
}
```

If the business fails the KYB check and they can't pass a manual check, you cannot issue them a deposit account. The response will include a reason code indicating the reason why KYB was rejected and the details. Refer to our [How KYB works](https://docs.atelio.com/embedded/docs/know-your-business) guide for more information about KYB.

### Create a commercial deposit account

After the beneficial owners have passed KYC and the business has passed KYB, you can now call the [CreateAccount](https://docs.atelio.com/embedded/reference/post-accounts) endpoint to create a deposit account.

For Pay by Bank, see [Create a Pay by Bank deposit account](https://docs.atelio.com/embedded/docs/deposit-accounts#create-a-pay-by-bank-deposit-account) .

The following example request creates an account by specifying the `business_id` in the request body.

#### Example request

```curl
curl --request POST 'https://api.atelio.com/api/v0.1/accounts' \
--header 'Identity: <YOUR_IDENTITY>' \
--header 'Authorization: <YOUR_AUTHORIZATION>' \
--header 'Content-Type: application/json' \
--data-raw '{
  "program_id": "<YOUR_PROGRAM_ID>",
  "business_id": "b57ecb2f-659d-4bfe-a61d-ef56000226a6",
  "type": "deposit"
}'
```

#### Example response

Upon success, Atelio returns a `200` status with the details of the commercial deposit account in a JSON message, including the following:

- `account_id`: Used for checking balances, getting transactions, and initiating both ACH and instant transfers
- `routing_number`/`account_number`: Initiates External ACH transfers.

```json
{
    "account_id": "a90708df-72a5-4cc3-a497-e1ad27ccae46",
    "date_updated": "2022-04-22T17:07:03.034183+00:00",
    "date_created": "2022-04-22T17:07:03.034177+00:00",
    "program_id": "<YOUR_PROGRAM_ID>",
    "business_id": "b57ecb2f-659d-4bfe-a61d-ef56000226a6",
    "type": "deposit",
    "status": "active",
    "routing_number": "084101234",
    "account_number": "2834461234567890",
    "description": "deposit account",
    "balance": {
        "previous_statement_balance": 0,
        "available_balance": 0,
        "current_balance": 0,
        "currency": "USD"
    },
    "cards": []
}
```

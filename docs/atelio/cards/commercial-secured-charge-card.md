# Commercial secured charge card

## Overview

Atelio's secured commercial charge card program pairs a security deposit account (SDA) with charge cards issued to a business. 

The balance in the SDA is effectively the total credit limit across all of its linked charge cards, and repayments on the charge card can be made from either the SDA or another bank account. This guide covers the issuing of a commercial secured charge card.

### Before you start

1. You need a program ID. Start by retrieving your program ID for the card program from the Atelio Portal under the Developers tab.

2. Register webhooks. We use [webhooks](https://docs.atelio.com/embedded/docs/webhook) to signal asynchronously that work has been done in response to certain API requests. These webhooks are for convenience and any information provided asynchronously by the webhooks can also be queried using synchronous API requests. For this guide we are interested in webhooks specifically in the following categories:

    - `kyb`
    - `transactions`
    - `cards`
    - `commercial.credit_application`

Webhook registration can be done through the Atelio Portal or via API. For more information, see [Webhook events and subscriptions](https://docs.atelio.com/embedded/docs/event-subscriptions).

### Business onboarding

Before you can issue accounts and cards on behalf of a business, they'll need to complete the onboarding process by going through KYB and Beneficial Owner (BO) KYC. Atelio leverages a single widget utilizing our partner Persona for both KYB and BO KYC.

The steps for onboarding are:

| Step                  | Description |
| --------------------- | ----------- |
| 1. Create business    | Brand makes a request to Atelio's create business endpoint |
| 2. Initiate KYB       | Brand initiates KYB by making a request to the endpoint for starting KYB |
| 3. Display KYB widget | Brand starts the Persona inquiry, displaying it within the UI |
| 4. KYB decision       | Once the user has submitted all information in the verification widget, Atelio's Compliance team will review and decision the business |
| 5.&nbsp;Sync&nbsp;with&nbsp;verified&nbsp;info | Upon receiving the webhook for KYB approval, brand will make an API request to Atelio's get business endpoint and get beneficial owner endpoint to get the most up-to-date verified information on the business and beneficial owners |

## Steps to issue a card

To issue a commercial secured charge card you need to do the following steps:

1. [Create a business](https://docs.atelio.com/embedded/docs/commercial-secured-charge-cards#create-a-business)
2. [Create a Commercial Credit application](https://docs.atelio.com/embedded/docs/commercial-secured-charge-cards#create-your-application)
3. [Submit your Commercial Credit application](https://docs.atelio.com/embedded/docs/commercial-secured-charge-cards#submit-your-application)
4. [Initiate the KYB process](https://docs.atelio.com/embedded/docs/commercial-secured-charge-cards#initiate-the-kyb-process)
5. [Check your application status](https://docs.atelio.com/embedded/docs/commercial-secured-charge-cards#check-your-application-status)
6. [Create and link an SDA account](https://docs.atelio.com/embedded/docs/commercial-secured-charge-cards#create-and-link-an-sda-account)
7. [Issue a secured charge card](https://docs.atelio.com/embedded/docs/commercial-secured-charge-cards#issue-a-secured-charge-card)
8. [Set up and mail your card](https://docs.atelio.com/embedded/docs/commercial-secured-charge-cards#set-up-and-mail-your-card)

### Create a business

Brand calls the [Create a business](https://docs.atelio.com/embedded/reference/post_businesses) endpoint. Only a business name is required, but any information submitted as part of this request will be used to pre-populate the Persona verification widget. Any information initially submitted to this endpoint may be overwritten by verified data as a result of the KYB process.

#### Example request to create a business:

```curl title="cURL"
curl --request POST \
     --url https://sandbox.atelio.com/api/v0.1/businesses \
     --header 'accept: application/json' \
     --header 'content-type: application/json' \
     --data @- <<EOF
{
  "ein": "12-1234567",
  "legal_business_name": "John Doe Business Corporation",
  "dba_business_name": "John's",
  "business_type": "cooperative",
  "date_established": "2020-01-01T00:00:00.000Z",
  "phone": "+14157485052",
  "email": "info@business.com",
  "website": "www.business.com",
  "industry_type": "Financial",
  "number_of_employees": "0-50"
}
EOF
```

#### Example response:

```json title="JSON"
{
  "ein": "12-1234567",
  "phone": "+14085557788",
  "email": "user@example.com",
  "website": "https://www.specter.com",
  "legal_business_name": "World Domination Inc.",
  "dba_business_name": "World Domination Inc.",
  "business_type": "limited_liability_company",
  "industry_type": "Financial",
  "number_of_employees": "0-50",
  "addresses": [
    {
      "address_type": "MAILING",
      "street": "345 California Ave.",
      "street2": "Suit 600",
      "city": "San Francisco",
      "state": "CA",
      "zip_code": "12345-1234",
      "country": "US",
      "is_primary": true
    },
    {
      "address_type": "PHYSICAL",
      "street": "123 California Ave.",
      "street2": "Suit 100",
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
      "last_name": "Bond",
      "dob": "1970-12-12",
      "addresses": [
        {
          "address_type": "MAILING",
          "street": "345 California Ave.",
          "street2": "Suit 600",
          "city": "San Francisco",
          "state": "CA",
          "zip_code": "12345-1234",
          "country": "US",
          "is_primary": true
        }
      ]
    },
    {
      "first_name": "Le",
      "last_name": "Chiffre",
      "dob": "1980-04-04",
      "addresses": [
        {
          "address_type": "MAILING",
          "street": "345 California Ave.",
          "street2": "Suit 600",
          "city": "San Francisco",
          "state": "CA",
          "zip_code": "12345-1234",
          "country": "US",
          "is_primary": true
        }
      ]
    }
  ]
}
```

Upon success, Atelio returns a `200` response with the business details.

### Create your application

To create a commercial credit appication, send a `POST` request to the `api/v0.1/commercial_credit/applications` endpoint.

#### Example request:

```curl title="cURL"
{
    "applicant": {
        "business_id": "3874d035-41df-4436-8c12-028c1562e546"
    },
    "program_id": "fe5aa331-5271-4742-b02a-81446b94f772"
}
```

#### Example response:

```json title="JSON"
{
    "accounts": {
        "security_deposit_account_id": null
    },
    "applicant": {
        "addresses": [
            {
                "address_id": "ff7c673c-2837-404a-91a1-11b111a552e2",
                "address_type": "MAILING",
                "city": "San Francisco",
                "country": "US",
                "date_created": "2024-10-16T20:36:11.876653+00:00",
                "date_updated": "2024-10-16T20:36:11.876656+00:00",
                "is_primary": false,
                "state": "CA",
                "street": "345 California Ave.",
                "street2": "Suit 600",
                "zip_code": "12345-1234"
            },
            {
                "address_id": "568a6e08-53f7-4a07-a918-1bbfb626eae3",
                "address_type": "PHYSICAL",
                "city": "San Francisco",
                "country": "US",
                "date_created": "2024-10-16T20:36:11.876659+00:00",
                "date_updated": "2024-10-16T20:36:11.876660+00:00",
                "is_primary": true,
                "state": "CA",
                "street": "123 California Ave.",
                "street2": "Suit 100",
                "zip_code": "12345-1234"
            }
        ],
        "beneficial_owners": [
            {
                "addresses": [
                    {
                        "address_id": "8d417918-ac93-4fd5-8957-10158c3d7c17",
                        "address_type": "MAILING",
                        "city": "San Francisco",
                        "country": "US",
                        "date_created": "2024-10-16T20:36:11.883751+00:00",
                        "date_updated": "2024-10-16T20:36:11.883753+00:00",
                        "is_primary": true,
                        "state": "CA",
                        "street": "345 California Ave.",
                        "street2": "Suit 600",
                        "zip_code": "12345-1234"
                    }
                ],
                "beneficial_owner_id": "eb064590-4021-4d4b-9f7c-ed6a5a632fd4",
                "date_created": "2024-10-16T20:36:11.858023+00:00",
                "date_updated": "2024-10-16T20:36:11.858026+00:00",
                "dob": "1970-12-12",
                "email": null,
                "first_name": "James",
                "id_expiration": null,
                "id_number": null,
                "id_type": null,
                "is_control_person": null,
                "last_name": "Bond",
                "middle_name": "",
                "percentage_ownership": null,
                "phone": null,
                "ssn": null
            },
            {
                "addresses": [
                    {
                        "address_id": "278d01a9-ab1c-49e4-832f-c60fccaf4261",
                        "address_type": "MAILING",
                        "city": "San Francisco",
                        "country": "US",
                        "date_created": "2024-10-16T20:36:11.883757+00:00",
                        "date_updated": "2024-10-16T20:36:11.883758+00:00",
                        "is_primary": true,
                        "state": "CA",
                        "street": "345 California Ave.",
                        "street2": "Suit 600",
                        "zip_code": "12345-1234
                    }
                ],
                "beneficial_owner_id": "4b5f50c9-a8f9-4d56-8718-1e491d2b6973",
                "date_created": "2024-10-16T20:36:11.858038+00:00",
                "date_updated": "2024-10-16T20:36:11.858038+00:00",
                "dob": "1980-04-04",
                "email": null,
                "first_name": "Le",
                "id_expiration": null,
                "id_number": null,
                "id_type": null,
                "is_control_person": null,
                "last_name": "Chiffre",
                "middle_name": "",
                "percentage_ownership": null,
                "phone": null,
                "ssn": null\
            }
        ],
        "brand_business_id": null,
        "business_id": "3874d035-41df-4436-8c12-028c1562e546",
        "business_type": "limited_liability_company",
        "date_created": "2024-10-16T20:36:11.855429+00:00",
        "date_established": null,
        "date_updated": "2024-10-16T20:36:11.855433+00:00",
        "dba_business_name": "World Domination Inc.",
        "ein": "12-1234567",
        "email": "user@example.com",
        "industry_type": null,
        "legal_business_name": "World Domination Inc.",
        "number_of_employees": null,
        "phone": "+1408-555-7788",
        "website": "https://www.specter.com"
    },
    "application_id": "f97dc828-183e-46bb-90a0-724178e46c63",
    "application_status": "created",
    "date_created": "2024-10-16T23:44:48.757649+00:00",
    "date_updated": "2024-10-16T23:44:48.757655+00:00",
    "program_id": "fe5aa331-5271-4742-b02a-81446b94f772"
}
```

### Submit your application

To submit your commercial credit application, send an empty body `POST` request to the `api/v0.1/commercial_credit/applications/{application_id}/submit` endpoint.

#### Example response:

```json title="JSON"
{
    "application_id": "f97dc828-183e-46bb-90a0-724178e46c63",
    "application_status": "submitted",
    "business_id": "3874d035-41df-4436-8c12-028c1562e546",
    "date_created": "2024-10-16T23:44:48.757649+00:00",
    "date_updated": "2024-10-16T23:49:08.825985+00:00",
    "persona_inquiry_id": "inq_DQBLfi1B7gi8AnE7H6XkPfBs71hL",
    "persona_kyb_url": "https://withpersona.com/verify?inquiry-id=inq_DQBLfi1B7gi8AnE7H6XkPfBs71hL"
}
```

### Initiate the KYB process

Brand initiates KYB by copying and pasting the `persona_kyb_url` into their browser from the above response payload.

Brand can get the application status by sending an empty body `GET` request to the `/api/v0.1/commercial_credit/applications/{application_id}` endpoint.

#### Example response to start KYB:

```json title="JSON"
{
    "accounts": {
        "security_deposit_account_id": "fc7c673c-6547-404a-81bc-11b111a55f22"
    },
    "applicant": {
        "addresses": [
            {
                "address_id": "ff7c673c-2837-404a-91a1-11b111a552e2",
                "address_type": "MAILING",
                "city": "San Francisco",
                "country": "US",
                "date_created": "2024-10-16T20:36:11.876653+00:00",
                "date_updated": "2024-10-16T20:36:11.876656+00:00",
                "is_primary": false,
                "state": "CA",
                "street": "345 California Ave.",
                "street2": "Suit 600",
                "zip_code": "12345-1234"
            },
            {
                "address_id": "568a6e08-53f7-4a07-a918-1bbfb626eae3",
                "address_type": "PHYSICAL",
                "city": "San Francisco",
                "country": "US",
                "date_created": "2024-10-16T20:36:11.876659+00:00",
                "date_updated": "2024-10-16T20:36:11.876660+00:00",
                "is_primary": true,
                "state": "CA",
                "street": "123 California Ave.",
                "street2": "Suit 100",
                "zip_code": "12345-1234"
            }
        ],
        "beneficial_owners": [
            {
                "addresses": [
                    {
                        "address_id": "8d417918-ac93-4fd5-8957-10158c3d7c17",
                        "address_type": "MAILING",
                        "city": "San Francisco",
                        "country": "US",
                        "date_created": "2024-10-16T20:36:11.883751+00:00",
                        "date_updated": "2024-10-16T20:36:11.883753+00:00",
                        "is_primary": true,
                        "state": "CA",
                        "street": "345 California Ave.",
                        "street2": "Suit 600",
                        "zip_code": "12345-1234"
                    }
                ],
                "beneficial_owner_id": "eb064590-4021-4d4b-9f7c-ed6a5a632fd4",
                "date_created": "2024-10-16T20:36:11.858023+00:00",
                "date_updated": "2024-10-16T20:36:11.858026+00:00",
                "dob": "1970-12-12",
                "email": null,
                "first_name": "James",
                "id_expiration": null,
                "id_number": null,
                "id_type": null,
                "is_control_person": null,
                "last_name": "Bond",
                "middle_name": "",
                "percentage_ownership": null,
                "phone": null,
                "ssn": null
            },
            {
                "addresses": [
                    {
                        "address_id": "278d01a9-ab1c-49e4-832f-c60fccaf4261",
                        "address_type": "MAILING",
                        "city": "San Francisco",
                        "country": "US",
                        "date_created": "2024-10-16T20:36:11.883757+00:00",
                        "date_updated": "2024-10-16T20:36:11.883758+00:00",
                        "is_primary": true,
                        "state": "CA",
                        "street": "345 California Ave.",
                        "street2": "Suit 600",
                        "zip_code": "12345-1234"
                    }
                ],
                "beneficial_owner_id": "4b5f50c9-a8f9-4d56-8718-1e491d2b6973",
                "date_created": "2024-10-16T20:36:11.858038+00:00",
                "date_updated": "2024-10-16T20:36:11.858038+00:00",
                "dob": "1980-04-04",
                "email": null,
                "first_name": "Le",
                "id_expiration": null,
                "id_number": null,
                "id_type": null,
                "is_control_person": null,
                "last_name": "Chiffre",
                "middle_name": "",
                "percentage_ownership": null,
                "phone": null,
                "ssn": null
            }
        ],
        "brand_business_id": null,
        "business_id": "3874d035-41df-4436-8c12-028c1562e546",
        "business_type": "limited_liability_company",
        "date_created": "2024-10-16T20:36:11.855429+00:00",
        "date_established": null,
        "date_updated": "2024-10-16T20:36:11.855433+00:00",
        "dba_business_name": "World Domination Inc.",
        "ein": "12-1234567",
        "email": "user@example.com",
        "industry_type": null,
        "legal_business_name": "World Domination Inc.",
        "number_of_employees": null,
        "phone": "+1408-555-7788",
        "website": "https://www.specter.com"
    },
    "application_id": "f97dc828-183e-46bb-90a0-724178e46c63",
    "application_status": "submitted",
    "date_created": "2024-10-16T23:44:48.757649+00:00",
    "date_updated": "2024-10-16T23:49:08.825985+00:00",
    "kyb": {
        "persona_inquiry_id": "inq_DQBLfi1B7gi8AnE7H6XkPfBs71hL",
        "persona_kyb_url": "https://withpersona.com/verify?inquiry-id=inq_DQBLfi1B7gi8AnE7H6XkPfBs71hL",
        "status": "under review"
    },
    "program_id": "fe5aa331-5271-4742-b02a-81446b94f772"
}
```

The following webhook events are added for Commercial Secured charge card:

- `commercial.credit_application.created`
- `commercial.credit_application.submitted`
- `commercial.credit_application.under_review`
- `commercial.credit_application.approved`
- `commercial.credit_application.denied`
- `commercial.credit_application.resubmit_required`
- `commercial.credit_application.pending`

### Idempotency

> 📘 **Note**
>
> The KYC endpoint is idempotent and repeated requests using the same `Idempotency-Key` within a 24 hour period will fail.

Idempotency is a Web API design principle that prevents you from running the same operation multiple times. Because a certain amount of intermittent failure is to be expected, you need a way to reconcile failed requests with a server, and idempotency provides a mechanism for that. Including an idempotency key makes POST requests idempotent, which prompts the API to do the record keeping required to prevent duplicate operations. You can safely retry requests that include an idempotency key as long as the second request occurs within 24 hours from when you first receive the key (keys expire after 24 hours).

Providing the idempotency key string in the header is optional.

#### Example request:

```json title="JSON"
{
   "Authorization": "<YOUR_AUTHORIZATION>",
   "Identity": "<YOUR_IDENTITY>",
   "Idempotency-Key": "dd6dcedd-2a11-4098-1223-876902123abc"
}
```

### Create and link an SDA account

Once the business has been approved for KYB, a security deposit account may be issued to the business. This can be done upon receiving the `kyb.verification.approved` webhook, or by polling the get KYB status endpoint and seeing an approved status. Security deposit accounts are issued using our [CreateAccount](https://docs.atelio.com/embedded/reference/post-accounts) API, passing the type as `security_deposit`.

> 📘 **Note**
>
> After a business receives KYB approval, the following steps are automatically taken.

#### Example request of an SDA creation request:

```curl title="cURL"
curl --request POST
     --url <https://api.atelio.com/api/v0.1/accounts>
     --header 'Accept: application/json'
     --header 'Authorization: <YOUR_AUTHORIZATION>'
     --header 'Content-Type: application/json'
     --header 'Identity: <YOUR_IDENTITY>'
     --data '
{
     "business_id": "590f65b1-98c7-4d22-bc90-4024023d4f3f",
     "program_id": "dcdb9663-65c8-48e4-bc12-aa092642dfd8",
     "type": "security_deposit"
}
'
```

#### Example response:

```json title="JSON"
{
  "account_id": "979e14cd-6fe4-4765-b7a4-d4eff102cc4a",
  "program_id": "3c23ab0e-cdef-47b5-aa7c-769bf6a3c1c9",
  "business_id": "590f65b1-98c7-4d22-bc90-4024023d4f3f",
  "type": "deposit",
  "status": "active",
  "description": "bus_01",
  "routing_number": "547897762",
  "account_number": "574771265",
  "cards": [
    "a0cdca3b-e667-4ead-b8d8-27f171406216"
  ],
  "date_updated": "2020-08-15T19:39:34Z",
  "date_created": "2020-08-15T19:39:34Z",
  "balance": {
    "current_balance": 45412,
    "available_balance": 48312,
    "previous_statement_balance": 17312,
    "locked_balance": 0,
    "currency": "USD"
  },
  "credit": {
    "credit_limit": 1000,
    "security_deposit_account_id": "46352399-d005-451a-b988-27b8c878503e"
  },
  "deposit": {},
  "security_deposit": {
    "credit_account": "string"
  }
}
```

The response will include an `account_id` to identify the newly-created SDA.

> 📘 **Note**
>
> You will use the `account_id` in the future, so make a note of it.

Then link your account as instructed on the [Link an external account](https://docs.atelio.com/embedded/docs/link-an-external-account) page.

### Issue secured charge cards

Once an SDA is successfully created, you may start to create charge cards which each use the SDA to determine their overall credit limit. Note that each individual card may have its own individual limit - the card can spend until its own balance hits its individual limit, or until the sum of all cards' balances hits the SDA balance. Secured charge cards are issued using our [CreateCard](https://docs.atelio.com/embedded/reference/post_cards) API, passing in the SDA's `account_id`. Creation of a card not only creates the card, but also creates an associated credit account.

#### Example request to create a secured charge card:

```curl title="cURL"
curl --request POST
     --url https://api.atelio.com/api/v0.1/cards
     --header 'Accept: application/json'
     --header 'Authorization: <YOUR_AUTHORIZATION>'
     --header 'Content-Type: application/json'
     --header 'Identity: <YOUR_IDENTITY>'
     --data '
{
     "account_id": "979e14cd-6fe4-4765-b7a4-d4eff102cc4a",
     "credit_limit": "1000.00"
}
'
```

#### Example response:

The response will contain an `account_id`, which will identify the credit account associated with the card. You'll want to note that ID as it'll be used later for repaying the card.

Note that if you'd like the card to be shipped to a different address than the one on file for the business, you can pass the address to the `card_mailing_address` key.

```json title="JSON"
{
  "card_id": "057c6074-a02d-4a5a-bad9-bbc64b047df7",
  "date_updated": "2020-08-16T19:39:34Z",
  "date_created": "2020-08-15T19:39:34Z",
  "customer_id": "c8940088-21e8-451c-987c-0a0398db3ee5",
  "account_id": "26bdeb70-157c-4c44-a04a-3727793b9779",
  "expiry_date": "tok_live_7g3eARzeEBJw89rJRCHqHv",
  "last_four": "6270",
  "card_number": "tok_live_q7kwTYb5YCYznpgRHHTs9p",
  "cvv": "tok_live_c94od3AsFWYQ1ecaaMYtFU",
  "status": "active",
  "card_design_id": null
}
```

### Set up and mail your card


## Fund the SDA

Since the credit limit on the cards is driven by the balance of the SDA, the business will need to fund their SDA before they can start using their cards. Our SDAs have numerous funds-in options using account and routing numbers, but for this guide we'll focus on funding via an ACH transfer initiated on-platform.

The first step is to link an external account. We'll focus on a quick Sandbox use case, but for full options for how to link external accounts, please [see our guide](https://docs.atelio.com/embedded/docs/link-an-external-account). Please see below for an example request to link an external account without the Atelio SDK.

#### Example request to link an external account:

```curl title="cURL"
curl --request POST
  --url <https://sandbox.atelio.com/api/v0.1/accounts>
  --header 'Identity: <YOUR_IDENTITY>'
  --header 'Authorization: <YOUR_AUTHORIZATION>'
  --header 'Content-Type: application/json'
  --data '
{
  "business_id": "BUSINESS-ID",
  "type": "migrate_account",
  "link_type": "plaid",
	"account_number": "1111222233331111",
  "routing_number": "021000021",
  "bank_account_type": "checking",
  "bank_name": "My Bank"
}'
```

The response will include the newly-linked external account's `account_id`. You'll use that ID in the next step.

Once an external account is linked, you can initiate an [ACH transfer from that external account](https://docs.atelio.com/embedded/docs/account-fund-transfers#ach-external-transfers) to the SDA using the create transfer endpoint. Please see below for an example request to create a transfer.

#### Example request to transfer from external account:

```curl title="cURL"
curl --request POST
     --url <https://api.atelio.com/api/v0.1/transfers>
     --header 'Accept: application/json'
     --header 'Authorization: <YOUR_AUTHORIZATION>'
     --header 'Content-Type: application/json'
     --header 'Identity: <YOUR_IDENTITY>'
     --data '
{
     "ach": {
          "class_code": "WEB",
          "same_day": false
     },
     "origination_account_id": "EXTERNAL-ACCOUNT-D",
     "destination_account_id": "SDA-ACCOUNT-ID",
     "amount": 2500000,
     "description": "initial funding"
}
'
```

Note that ACH is not an [instant transfer mechanism,](https://docs.atelio.com/embedded/docs/fund-security-deposit-accounts#instant-funding) and you'll have to wait for the ACH transfer to settle before the account is funded. In our Sandbox environment, we automatically settle pending ACHs every 10 minutes for convenience.

Once the SDA is funded, the secured charge cards linked to that SDA will be able to be used.


## Make a repayment

At the end of the statement period, the balance across each individual card will need to be paid off. Businesses may use the funds in their SDA to repay, or they may pay using their linked external account. However, even if the business pays using their linked external account, all funds will be routed through the SDA to accomplish the payment.

If the business chooses to repay using their external account, you'll first want to note the balance of each individual card for the prior statement. Then, you'll want to sum all of those values to determine the total amount of the repayment and initiate an ACH transfer from the linked external account to the SDA.

Please find an example request to [create that transfer](https://docs.atelio.com/embedded/reference/post-transfer) shown below. In this example, the total balance to be repaid across all cards is $14,101.50.

#### Example request to create an ACH transfer to repay:

```curl title="cURL"
curl --request POST
     --url <https://api.atelio.com/api/v0.1/transfers>
     --header 'Accept: application/json'
     --header 'Authorization: <YOUR_AUTHORIZATION>'
     --header 'Content-Type: application/json'
     --header 'Identity: <YOUR_IDENTITY>'
     --data '
{
     "ach": {
          "class_code": "WEB",
          "same_day": false
     },
     "origination_account_id": "EXTERNAL-ACCOUNT-ID",
     "destination_account_id": "SDA-ACCOUNT-ID",
     "amount": 1410150,
     "description": "Repayment for January statement"
}
```

To pay off each individual card, you'll initiate an [account-to-account](https://docs.atelio.com/embedded/docs/account-fund-transfers#internal-account-to-account-transfers) transfer using our [CreateTransfer](https://docs.atelio.com/embedded/reference/post-transfer) endpoint. When a transfer is initiated from an SDA to a credit account, it's processed as an instant account-to-account transfer, which will instantly debit the SDA and credit the card account. You'll use the balance from the prior statement of each individual card to determine the amount to transfer to each credit account.

Building on the prior example, where the total balance was $14,101.50, the following example assumes the individual card has a prior statement balance of $3,501.25 and the other cards have a total prior statement balance of $10,600.25. You'll repeat this request for each other card until the entire balance is paid off.

#### Example request to create a transfer to pay off an individual card:

```curl title="cURL"
curl --request POST
     --url <https://api.atelio.com/api/v0.1/transfers>
     --header 'Accept: application/json'
     --header 'Authorization: <YOUR_AUTHORIZATION>'
     --header 'Content-Type: application/json'
     --header 'Identity: <YOUR_IDENTITY>'
     --data '
{
     "origination_account_id": "SDA-ACCOUNT-ID",
     "destination_account_id": "CREDIT-CARD-ACCOUNT-ID",
     "amount": 350125,
     "description": "Repayment for January statement"
}'
```

## Clawbacks and Reversals

In secured charge card programs, if a payment is missed or insufficient funds are available for repayment, the system may automatically perform clawbacks from the security deposit account (SDA) to cover unpaid balances. This ensures that outstanding card balances are covered by the collateral held in the SDA.

### Clawback Process

When clawbacks are necessary:

- Funds are automatically transferred from the SDA to the credit card account to cover unpaid balances.
- The clawback amount is typically equal to the outstanding balance on the card.
- Clawbacks help maintain the secured nature of the charge card program.

### Clawback Reversals

In certain situations, clawbacks may need to be reversed. This can occur when:

- A customer has overpaid their balance, resulting in excess funds being clawed back.
- A clawback was processed in error and needs to be corrected.
- Payment reconciliation reveals that a clawback amount was incorrect.

When a clawback reversal is needed, the system can automatically process the reversal by performing the following:

| Process | Description |
| --- | --- |
| Automatic&nbsp;reversal&nbsp;processing | The system identifies clawbacks that require reversal and processes them automatically. |
| Balance validation | If the amount owed is zero or negative (indicating overpayment), the reversal may be completed without requiring a transfer. |
| Transfer execution | When a reversal transfer is needed, funds are moved from the credit card account back to the security deposit account. |
| Status tracking | Clawback records are updated with reversal status to maintain accurate transaction history. |

This reversal process ensures that customers are not charged incorrectly and that security deposit account balances accurately reflect the true collateral position. The automated nature of both clawbacks and reversals helps maintain the integrity of the secured charge card program while providing proper customer protection.

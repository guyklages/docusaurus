---
title: Client Prefund Account (Nium API Reference)
mdx:
  format: md
---

[Skip to main content](https://docs.nium.com/api#__docusaurus_skipToContent_fallback)

v2026.7.30

OpenAPI 3.0.3

# Nium API Reference

[Nium API Reference](mailto:experience@nium.com)

Copyright (c) 2025 NIUM

The Nium API is a RESTful platform that helps you build and scale global financial services including payouts, foreign exchange, onboarding, and digital wallets. It offers secure, resource-oriented endpoints for onboarding, wallet management, foreign exchange, payments, compliance, and more.

Built on standard REST principles, the Nium API uses **JSON-formatted requests and responses**, **HTTPS** for secure communication, and consistent conventions across all endpoints. Each integration is modular—so you can implement only what you need—and reliable, so your team can move fast with confidence.

You can use the Nium API to:

- Onboard individual or corporate customers with built-in **KYC/KYB** workflows.
- Manage digital wallets and transfer funds in real time.
- Access competitive **foreign exchange (FX)** rates and lock them securely.
- Make global payouts via bank transfers, cards, and local payment methods.
- Prefund and reconcile transactions for operational control.
- Monitor transactions and generate account statements.
- Handle compliance with document uploads and **RFI (Request for Information)** flows.

This reference includes everything you need to get started, including request and response structures, required headers, code samples, and schema definitions.

For more information about using Nium, see [Nium Documentation](https://docs.nium.com/).

Server

Server:https://gateway.nium.com

Client Libraries

Shell

Ruby

Node.js

PHP

Python

MoreSelect from all clients

Shell Curl

## Client Prefund Account

​Copy link

The **Client Prefund Account** requests let you fund your Nium account and track those funds across all currencies. The `client` resource represents your account with Nium.

Prefunding ensures you have an available balance to support downstream activity—like customer wallet funding, card issuance, or cross-border payouts. The prefunding workflow includes:

- Transferring funds to a Nium-provided virtual account (per currency).
- Submitting a prefund request (via API) with transfer details and a reference number.
- Automatic reconciliation, where Nium validates the request against actual received funds.
- Balance visibility, so you can monitor prefund amounts in real time across all supported currencies.

Use these requests to:

- Initiate a prefund request after sending a bank transfer.
- Check the status of all prefund requests by `date`, `status`, or `referenceId`.
- Fetch available prefund balances across currencies to plan your funding needs

These requests are critical for clients who manage high-volume payouts or need to maintain liquidity for funding wallets, issuing cards, or settling currency conversions. To learn more about how prefunding works, see [Program, Client, and Client Prefund Account](https://docs.nium.com/docs/payins/program-client-and-client-prefund-account).

Client Prefund Account Operations

- post/api/v1/client/{clientHashId}/prefund
- get/api/v1/client/{clientHashId}/prefundList
- get/api/v1/client/{clientHashId}/balances

### Client Prefund Request

​Copy link

Auth Required

Enables the client to raise a prefund request in the system.

Path Parameters

- clientHashIdCopy link to clientHashId



Type: string

required









Unique client identifier generated and shared before the initial request.


Headers

- x-request-idCopy link to x-request-id



Type: string

Example

{{$guid}}











Enter a universally unique identifier (UUID).


Body·Prefund request

required

application/json

Prefund Request

- amountCopy link to amount



Type: number Format:  double

required



Example

1000









The amount transferred to account

- currencyCodeCopy link to currencyCode



Type: string

required



Example

SGD









The 3-letter [ISO-4217 currency code](https://docs.nium.com/docs/getting-started/currency-and-country-codes).

- bankReferenceNumberCopy link to bankReferenceNumber



Type: string

Example

712347512376









The reference number provided by the bank during fund transfer

- beneAccountNumberCopy link to beneAccountNumber



Type: string

Example

800207849









The virtual account number

- clientAccountNumberCopy link to clientAccountNumber



Type: string

Example

615234671328









The client's bank account number for reference from which the client has transferred money.

- commentsCopy link to comments



Type: string

Example

Client Prefund









The comments which need to be passed, if any.

- dateOfTransferCopy link to dateOfTransfer



Type: string

Example

2019-11-24









The date of the client's prefund transfer to the Nium bank account. This request can be raised for a transfer within 30 days.

- niumAccountNumberCopy link to niumAccountNumber



Type: string

Example

133876812367









The Nium account number to which the client has transferred the money.

- requesterIdCopy link to requesterId



Type: string

Example

8123768123









The client's unique requester ID.


Responses

- 200







OK











application/json

- 400







Bad Request











application/json

- 401







Unauthorized











application/json

- 403







Forbidden











application/json

- 404







Not Found











application/json

- 500







Internal Server Error











application/json


Request Example for post/api/v1/client/ _{clientHashId}_/prefund

Shell Curl

```curl
curl 'https://gateway.nium.com/api/v1/client/{clientHashId}/prefund' \
  --request POST \
  --header 'Content-Type: application/json' \
  --header 'x-api-key: YOUR_SECRET_TOKEN' \
  --data '{
  "amount": 1000,
  "bankReferenceNumber": "712347512376",
  "beneAccountNumber": 800207849,
  "clientAccountNumber": "615234671328",
  "comments": "Client Prefund",
  "currencyCode": "SGD",
  "dateOfTransfer": "2019-11-24",
  "niumAccountNumber": "133876812367",
  "requesterId": "8123768123"
}'
```

cURLCopy

cURLCopy

Status: 200Status: 400Status: 401Status: 403Status: 404Status: 500

Show Schema

```json
{
  "amount": 1000,
  "message": "Prefund request added successfully",
  "status": "Pending",
  "systemReferenceNumber": "CP8790469553",
  "uniquePayerId": "null",
  "uniquePaymentId": "null"
}
```

JSONCopy

JSONCopy

OK

### Fetch Client Prefund Request

​Copy link

Auth Required

This API allows you to fetch the details of client prefund requests.

Path Parameters

- clientHashIdCopy link to clientHashId



Type: string

required









Unique client Id assigned to the client during the onboarding process.


Query Parameters

- amountCopy link to amount



Type: string







amount

- bankReferenceNumberCopy link to bankReferenceNumber



Type: string







bankReferenceNumber

- currencyCopy link to currency



Type: string







currency

- endDateCopy link to endDate



Type: string







endDate

- orderCopy link to order



Type: string

Default

DESC












The sort order for the results. Acceptable values are ASC or DESC.
The default order value is DESC.

- pageCopy link to page



Type: integer Format:  int32

Default

0












This API may have lot of data in response and supports pagination. Entire response data is divided into pages with size as the upper limit on the number of data. Integer values from 0 onwards are acceptable.
Default page is 0.

- prefundStatusCopy link to prefundStatus



Type: string







prefundStatus

- sizeCopy link to size



Type: integer Format:  int32

Default

20












The upper limit on the number of items to be fetched with each call. Integer values from 1 onwards are acceptable.
Default size is 20.

- startDateCopy link to startDate



Type: string







startDate

- systemReferenceNumberCopy link to systemReferenceNumber



Type: string







systemReferenceNumber

- uniquePayerIdCopy link to uniquePayerId



Type: string







uniquePayerId

- uniquePaymentIdCopy link to uniquePaymentId



Type: string







uniquePaymentId


Headers

- x-request-idCopy link to x-request-id



Type: string

Example

{{$guid}}











Enter a universally unique identifier (UUID).


Responses

- 200







OK











application/json

- 400







Bad Request











application/json

- 401







Unauthorized











application/json

- 403







Forbidden











application/json

- 404







Not Found











application/json

- 500







Internal Server Error











application/json


Request Example for get/api/v1/client/ _{clientHashId}_/prefundList

Shell Curl

```curl
curl 'https://gateway.nium.com/api/v1/client/{clientHashId}/prefundList' \
  --header 'x-api-key: YOUR_SECRET_TOKEN'
```

cURLCopy

cURLCopy

Status: 200Status: 400Status: 401Status: 403Status: 404Status: 500

Show Schema

```json
{
  "pagination": {
    "totalElements": 1,
    "totalPages": 1
  },
  "prefundList": [\
    {\
      "amount": 1,\
      "bankReferenceNumber": "string",\
      "clientAccountNumber": "string",\
      "clientCode": "string",\
      "clientName": "string",\
      "comments": "string",\
      "createdAt": "2026-08-02T00:26:40.205Z",\
      "createdBy": "string",\
      "currencyCode": "string",\
      "dateOfCreation": "2026-08-02T00:26:40.205Z",\
      "dateOfTransfer": "string",\
      "imageUrl": "string",\
      "niumAccountNumber": "string",\
      "status": "string",\
      "systemReferenceNumber": "string",\
      "uniquePayerId": "string",\
      "uniquePaymentId": "string",\
      "updatedAt": "2026-08-02T00:26:40.205Z",\
      "updatedBy": "string"\
    }\
  ]
}
```

JSONCopy

JSONCopy

OK

### Client Prefund Balances

​Copy link

Auth Required

This API allows you to fetch the available prefund balance for a client.

Path Parameters

- clientHashIdCopy link to clientHashId



Type: string

required









Unique client identifier generated and shared before the initial request.


Headers

- x-request-idCopy link to x-request-id



Type: string

Example

{{$guid}}











Enter a universally unique identifier (UUID).


Responses

- 200







OK











application/json

- 400







Bad Request











application/json

- 401







Unauthorized











application/json

- 403







Forbidden











application/json

- 404







Not Found











application/json

- 409







Conflict











\*/\*

- 500







Internal Server Error











application/json


Request Example for get/api/v1/client/ _{clientHashId}_/balances

Shell Curl

```curl
curl 'https://gateway.nium.com/api/v1/client/{clientHashId}/balances' \
  --header 'x-api-key: YOUR_SECRET_TOKEN'
```

cURLCopy

cURLCopy

Status: 200Status: 400Status: 401Status: 403Status: 404Status: 409Status: 500

Show Schema

```json
[\
  {\
    "accountType": "CLIENT_POOL",\
    "balance": 0,\
    "createdAt": "2020-07-14 05:16:09",\
    "currency": "0.0",\
    "isDefault": "true",\
    "updatedAt": "2020-07-14 05:16:09"\
  }\
]
```

JSONCopy

JSONCopy

OK

## Client Settings  (Collapsed)

​Copy link

Use the Client Settings requests to fetch and manage configuration details set at the client level. The `client` resource represents your account with Nium. These settings are defined during onboarding and determine how your program operates—including supported currencies, fee structures, funding limits, and compliance behavior.

These requests let you:

- Retrieve the full client profile, including name, region, regulatory details, and webhook configuration.
- Fetch fee configurations applied at the client level.
- Get limits and authorization settings for payin transactions.

These configurations are typically read-only and are set by the Nium team during onboarding. However, the details are essential for building dynamic integrations that respond to region-specific rules or client-level constraints.

For a full overview of how clients and programs are structured in Nium, see [Program, Client, and Client Prefund Account](https://docs.nium.com/docs/payins/program-client-and-client-prefund-account).

Client Settings Operations

- get/api/v1/client/{clientHashId}
- get/api/v2/client/{clientHashId}/fees
- get/api/v3/client/{clientHashId}/fees
- get/api/v1/client/{clientHashId}/payin/limits

Show More

## Client Transactions  (Collapsed)

​Copy link

Use the Fetch Client Transactions request to retrieve a complete view of financial activity across your client account. This request returns every transaction initiated under your program—including wallet loads, foreign exchange conversions, card payments, and payouts.

You can:

- Retrieve transactions by date range, `status`, `customerHashId`, `walletHashId`, or `transactionCurrency`.
- View transaction metadata like `amount`, `type`, and `settlementStatus`.

Use this request to support reporting, reconciliation, and troubleshooting across all customer transactions. For more information about transactions, see [Transactions](https://docs.nium.com/docs/transactions).

Client Transactions Operations

- get/api/v1/client/{clientHashId}/transactions

Show More

## User Management  (Collapsed)

​Copy link

REST API's for User Management Module

User Management Operations

- get/api/v1/client/{clientHashId}/users
- post/api/v1/client/{clientHashId}/users
- get/api/v1/client/{clientHashId}/user/{userHashId}
- post/api/v1/client/{clientHashId}/userKyc

Show More

## Customer Onboarding V5  (Collapsed)

​Copy link

Requests for Customer Onboarding v5.

Customer Onboarding V5 Operations

- get/api/v5/client/{clientHashId}/customers
- post/api/v5/client/{clientHashId}/customers
- get/api/v5/client/{clientHashId}/applications
- get/api/v5/client/{clientHashId}/customer/{customerHashId}
- put/api/v5/client/{clientHashId}/customer/{customerHashId}
- post/api/v5/client/{clientHashId}/customer/{customerHashId}/submitKyc
- get/api/v5/client/{clientHashId}/corporate/publicDetails
- get/api/v5/client/{clientHashId}/corporate/exhaustiveDetailsSearch

Show More

## Customer Account - Individual  (Collapsed)

​Copy link

Use the Customer Account – Individual requests to onboard, update, and manage individual customers under your client account. Individual customers are represented by the `customer` resource.

These requests let you collect personal information, verify identity, and track onboarding status in compliance with Know Your Customer (KYC) requirements. You can:

- Add new individual `customers` and assign them wallets.
- Update `customer` or contact details.
- Upload documents and respond to Requests for Information (RFIs).
- Regenerate KYC URLs and fetch onboarding status.

For a full walkthrough of onboarding individual customers, see [Individual Customers](https://docs.nium.com/docs/onboarding/individual-customers).

Customer Account - Individual Operations

- post/api/v4/client/{clientHashId}/customer
- post/api/v1/client/{clientHashId}/customer/{customerHashId}/updateCustomer
- get/api/v1/client/{clientHashId}/customer/{customerHashId}/rfi
- post/api/v1/client/{clientHashId}/customer/{customerHashId}/rfi
- post/api/v1/client/{clientHashId}/customer/{customerHashId}/uploadDocuments
- post/api/v1/client/{clientHashId}/customer-min-data
- post/api/v3/client/{clientHashId}/customer

Show More

## Customer Account - Corporate  (Collapsed)

​Copy link

Use the Customer Account – Corporate requests to onboard, update, and manage corporate customers under your client account. Corporate customers are also represented by the `customer` resource; however corporate customers are managed using the `/corporate` endpoint. These requests let you submit business entity details, verify documents, and track compliance status as part of the corporate Know Your Business (KYB) process.

You can:

- Onboard `corporate` customers and assign them wallets.
- Upload incorporation and compliance documents.
- Respond to Requests for Information (RFIs) for KYB verification.
- Update `corporate` profiles or business information.
- Regenerate KYB URLs and fetch onboarding status.

For a full walkthrough of onboarding `corporate` users, see [Corporate Customers](https://docs.nium.com/docs/onboarding/corporate-customers).

Customer Account - Corporate Operations

- get/api/v2/client/{clientHashId}/corporate/lookup
- post/api/v1/client/{clientHashId}/corporate
- get/api/v1/client/{clientHashId}/corporate/rfi
- post/api/v1/client/{clientHashId}/corporate/rfi
- post/api/v1/client/{clientHashId}/customer/{customerHashId}/corporate/documents
- post/api/v1/client/{clientHashId}/customer/{customerHashId}/regenerateKYCURL
- get/api/v2/client/{clientHashId}/onboarding/constants
- post/api/v1/client/{clientHashId}/customer/{customerHashId}/corporate
- get/api/v1/client/{clientHashId}/corporate/lookup

Show More

## Customer Management  (Collapsed)

​Copy link

Use the Customer Management requests to view, search, and manage individual or corporate customers after onboarding; both corporate and individual customers are represented by the `customer` resource. These requests let you fetch customer details, list all customers under your account, and manage account-level actions like blocking or unblocking.

You can:

- List customers by `customerHashId`, `email`, `mobile` number, or `tag`.
- Update the tags of a `customer`.
- Block or unblock a `customer`.
- Download account statements by date range and currency.

For more information on the relationship between `customers` and `clients`, see [Parent-Child Hierarchy](https://docs.nium.com/docs/getting-started/parent-child-hierarchy).

Customer Management Operations

- get/api/v3/client/{clientHashId}/customers
- get/api/v2/client/{clientHashId}/customer/{customerHashId}
- put/api/v1/client/{clientHashId}/customer/{customerHashId}/block
- get/api/v1/client/{clientHashId}/customer/{customerHashId}
- get/api/v1/client/{clientHashId}/customer/{customerHashId}/accounts/statement
- post/api/v1/client/{clientHashId}/customer/{customerHashId}/tags
- get/api/v2/client/{clientHashId}/customers
- get/api/v1/client/{clientHashId}/customer/{customerHashId}/wallet/{walletHashId}/statement

Show More

## Customer Terms and Conditions  (Collapsed)

​Copy link

Use the Customer Terms and Conditions requests to manage how end users review and accept your program’s terms during onboarding. These requests help you track customer acceptance and retrieve the latest version of your configured legal agreements.

You can:

- Retrieve the current terms and conditions configured for your account.
- Check whether a customer has accepted the terms.
- Record acceptance of terms for individual customers.

For more information on managing terms and when they need to be shown to customers, see [Onboarding](https://docs.nium.com/docs/onboarding).

Customer Terms and Conditions Operations

- post/api/v1/client/{clientHashId}/customer/{customerHashId}/termsAndConditions
- get/api/v1/client/{clientHashId}/termsAndConditions

Show More

## Open Banking (Onboarding)  (Collapsed)

​Copy link

Use the Open Banking (Onboarding) requests to retrieve verified customer account and payment data from regulated third-party providers. These requests support onboarding flows that comply with Open Banking standards, including AIS (Account Information Services) and PIS (Payment Initiation Services).

You can:

- Fetch bank account details using a consent ID (AIS flow).
- Retrieve payment details using a system reference number (PIS flow).

These requests help streamline onboarding by prefilling customer data with bank-verified information, reducing manual input and ensuring compliance.
Open Banking onboarding is currently supported in the United Kingdom and select European Union countries where PSD2 regulations apply. For more information, see [Open Banking](https://docs.nium.com/docs/open-banking).

Open Banking (Onboarding) Operations

- get/api/v1/client/{clientHashId}/customer/{customerHashId}/wallet/{walletHashId}/consent/account
- get/api/v1/client/{clientHashId}/customer/{customerHashId}/wallet/{walletHashId}/consent/payment

Show More

## Accounts  (Collapsed)

​Copy link

Use the Accounts requests to link and manage a customer’s external bank accounts; customer's bank accounts are represented by the `bankAccounts` resource. These requests allow you to connect external accounts for payout or funding purposes, verify ownership through authentication, and update or remove linked accounts as needed.

You can:

- Create and link a new bank account to a customer profile.
- Fetch, update, or delete linked bank accounts.
- Filter linked accounts by account number, tags, or currency.

These requests help you enable payouts for customers and verify bank account ownership. For more information, see [Direct Debit](https://docs.nium.com/docs/payins/direct-debit).

Accounts Operations

- get/api/v1/client/{clientHashId}/customer/{customerHashId}/bankAccounts
- post/api/v1/client/{clientHashId}/customer/{customerHashId}/bankAccounts
- post/api/v1/client/{clientHashId}/customer/{customerHashId}/bankAccounts/{bankAccountId}/confirm
- get/api/v1/client/{clientHashId}/customer/{customerHashId}/bankAccounts/{bankAccountId}
- put/api/v1/client/{clientHashId}/customer/{customerHashId}/bankAccounts/{bankAccountId}
- delete/api/v1/client/{clientHashId}/customer/{customerHashId}/bankAccounts/{bankAccountId}

Show More

## Onboarding Forms - Corporate  (Collapsed)

​Copy link

Use the Corporate Onboarding Forms requests to generate and manage onboarding form links for corporate customers; onboarding forms are represented by the `applications` resource. These requests support a secure, self-service onboarding experience where customers complete their KYB (Know Your Business) journey through a dynamic web form.

You can:

- Create an `application` and generate a secure link to the onboarding form
for the customer.

- Regenerate an onboarding form link if the original expires.
- Fetch `application` details and track completion status by section.
- Identify and resolve submission errors or missing information.

Ideal for use cases where you want Nium to host the onboarding experience. For more information, see [Onboarding Forms](https://docs.nium.com/docs/onboarding/corporate-customers/onboarding-forms).

Onboarding Forms - Corporate Operations

- post/api/v1/client/{clientHashId}/applications
- get/api/v1/client/{clientHashId}/applications/{applicationId}/regenerateURL
- get/api/v1/client/{clientHashId}/application/{applicationId}

Show More

## Sessions  (Collapsed)

​Copy link

Use the Sessions requests to manage the different pre-built form instance.
For more information, see [Pre-built Forms](https://docs.nium.com/docs/developers/pre-built-forms).

Sessions Operations

- post/api/v1/client/{clientHashId}/sessions

Show More

## Files  (Collapsed)

​Copy link

Use the File storage requests to upload documents. This includes for onboarding, verification, RFIs, etc.

Files Operations

- post/api/v1/client/{clientHashId}/files
- get/api/v1/client/{clientHashId}/files/{fileId}

Show More

## Customer Wallet Balance  (Collapsed)

​Copy link

Use the Customer Wallet Balance requests to manage wallets assigned to a customer; customer wallets are represented by the `wallet` resource. These requests return real-time balances across all configured currencies within the wallet, including any blocked or withheld amounts.

You can:

- Add a new `wallet` for a customer in a supported currency.
- Fetch current balances for each currency in the wallet.
- View withheld balances set aside for compliance or operational holds.
- Identify the default currency for the wallet.

These requests are useful for displaying wallet balances to customers, validating funding availability, or powering internal dashboards. For more information, see [Wallets](https://docs.nium.com/docs/wallets).

Customer Wallet Balance Operations

- get/api/v1/client/{clientHashId}/customer/{customerHashId}/wallet/{walletHashId}
- put/api/v1/client/{clientHashId}/customer/{customerHashId}/wallet/{walletHashId}
- get/api/v1/client/{clientHashId}/customer/{customerHashId}/wallet
- post/api/v1/client/{clientHashId}/customer/{customerHashId}/wallet

Show More

## Wallet to Wallet Transfers  (Collapsed)

​Copy link

Use the Wallet to Wallet Transfers requests to move funds between customer wallets, either across different clients or within the same client group. Customer wallets are represented by the `wallet` resource. Each transfer requires specifying the source and destination wallets and must use a supported currency.

You can:

- Transfer funds between two `wallets` using the Wallet to Wallet Transfer request.
- Include customer comments and optional metadata to support reconciliation.
- Specify exemption codes and purpose of transfer as needed.

Note: The peer-to-peer (P2P) transfer request has been deprecated. Use the Wallet to Wallet Transfer request for all wallet-to-wallet transfers moving forward. For more information, see [Wallet to Wallet Transfers](https://docs.nium.com/docs/wallets/wallet-to-wallet-transfers).

Wallet to Wallet Transfers Operations

- post/api/v1/client/{clientHashId}/customer/{customerHashId}/wallet/{walletHashId}/transfers

Show More

## Customer Wallet Transactions  (Collapsed)

​Copy link

Use the Customer Wallet Transactions requests to retrieve transaction history and manage transaction metadata for a specific customer wallet. Customer wallets are represented by the `wallet` resource. These requests allow you to fetch individual transactions, attach receipts, tag transactions, and update metadata like location or business classification.

You can:

- Fetch a list of transactions by customer and `walletHashId`.
- Upload or download transaction receipts.
- Tag transactions for categorization or tracking.
- Add merchant location data or flag a transaction as business-related.

These requests are useful for building audit trails, powering transaction-level reporting, or enriching customer-facing interfaces. For more information, see [Transactions](https://docs.nium.com/docs/transactions).

Customer Wallet Transactions Operations

- get/api/v1/client/{clientHashId}/customer/{customerHashId}/wallet/{walletHashId}/transactions
- put/api/v1/client/{clientHashId}/customer/{customerHashId}/wallet/{walletHashId}/transactions/{transactionId}/business
- put/api/v1/client/{clientHashId}/customer/{customerHashId}/wallet/{walletHashId}/transactions/{transactionId}/location
- get/api/v1/client/{clientHashId}/customer/{customerHashId}/wallet/{walletHashId}/transactions/{transactionId}/receipt
- post/api/v1/client/{clientHashId}/customer/{customerHashId}/wallet/{walletHashId}/transactions/{transactionId}/receipt
- post/api/v1/client/{clientHashId}/customer/{customerHashId}/wallet/{walletHashId}/transactions/{transactionId}/tags

Show More

## Customer Funding  (Collapsed)

​Copy link

Use the Customer Funding requests to link, manage, and use funding instruments for topping up customer wallets. The funding source customer's use to fund wallets (bank accounts, cards, etc.) is represented by the `fundingInstrument` resource. These requests support multiple funding channels, including direct debit, cards, bank transfers, and prefunding.

You can:

- Link a `fundingInstrument` such as a card or bank account to a customer wallet.
- Confirm or delete existing `fundingInstruments`.
- Fund a wallet using a supported funding channel and currency pair.

These requests let customers fund their wallets using external accounts. For more information, see [Fund a Wallet](https://docs.nium.com/docs/payins/fund-wallet).

Customer Funding Operations

- post/api/v1/client/{clientHashId}/customer/{customerHashId}/fundingInstruments/{fundingInstrumentId}/confirmFundingInstrument
- get/api/v1/client/{clientHashId}/customer/{customerHashId}/fundingInstruments/{fundingInstrumentId}/fundingInstrumentDetails
- get/api/v1/client/{clientHashId}/customer/{customerHashId}/fundingInstruments
- delete/api/v1/client/{clientHashId}/customer/{customerHashId}/fundingInstruments/{fundingInstrumentId}
- post/api/v1/client/{clientHashId}/customer/{customerHashId}/wallet/{walletHashId}/fundingInstruments
- post/api/v1/client/{clientHashId}/customer/{customerHashId}/wallet/{walletHashId}/fund
- post/api/v2/client/{clientHashId}/customer/{customerHashId}/wallet/{walletHashId}/fund
- patch/api/v2/client/{clientHashId}/customer/{customerHashId}/wallet/{walletHashId}/fund/{systemReferenceNumber}
- post/api/v2/client/{clientHashId}/customer/{customerHashId}/wallet/{walletHashId}/fundingInstruments

Show More

## Customer Virtual Accounts  (Collapsed)

​Copy link

Use the Customer Virtual Accounts requests to assign and manage virtual account numbers (VANs) for a customer's wallet. Virtual accounts are represented by the `paymentId`. These virtual accounts act as unique identifiers for receiving funds, and enabling seamless payins via bank transfer.

You can:

- Assign virtual accounts by currency and bank name.
- Fetch all virtual accounts linked to a customer's wallet.
- Add, update, or delete custom tags for each virtual account.
- Download account ownership certificates, with optional balance details.

These requests are essential for customers who receive payments via virtual accounts. For more information, see [Virtual Account Number](https://docs.nium.com/docs/payins/virtual-account-number).

Customer Virtual Accounts Operations

- post/api/v1/client/{clientHashId}/customer/{customerHashId}/wallet/{walletHashId}/paymentId
- post/api/v1/client/{clientHashId}/customer/{customerHashId}/wallet/{walletHashId}/paymentId/tags
- get/api/v1/client/{clientHashId}/customer/{customerHashId}/wallet/{walletHashId}/paymentIds
- get/api/v2/client/{clientHashId}/customer/{customerHashId}/wallet/{walletHashId}/paymentIds
- post/api/v2/client/{clientHashId}/customer/{customerHashId}/wallet/{walletHashId}/paymentId
- get/api/v1/client/{clientHashId}/customer/{customerHashId}/accountOwnershipCertificate
- put/api/v1/client/{clientHashId}/customer/{customerHashId}/wallet/{walletHashId}/paymentId/consent

Show More

## Rates  (Collapsed)

​Copy link

Use the Rates requests to fetch real-time and historical foreign exchange (FX) rates for supported currency pairs. The rates returned are represented by the `exchangeRate` resource. These rates help you calculate conversion values, display FX data to customers, or power cross-currency transactions.

You can:

- Retrieve interbank exchange rates without markup.
- View historical rates grouped by time window (e.g., hourly, daily).

These requests are useful for displaying FX rates, previewing conversions, or auditing pricing across time. For more information, see [Foreign Exchange](https://docs.nium.com/docs/foreign-exchange).

Rates Operations

- get/api/v2/exchangeRate
- get/api/v1/exchangeRates/aggregate

Show More

## Quotes  (Collapsed)

​Copy link

Use the Quotes requests to generate and manage Foreign Exchange (FX) quotes for supported currency pairs. The quotes returned are represented by the `quote` resource. Each quote includes the applicable exchange rate, markup, and lock period, and can be used for conversions within the quote’s validity window.

You can:

- Create a quote with a fixed lock period and conversion schedule.
- Retrieve details of a previously generated quote by quote ID.
- View the applicable markup and rate capture time for audit purposes.

These requests are useful for locking FX rates before executing a conversion. For more information, see [Foreign Exchange](https://docs.nium.com/docs/foreign-exchange).

Quotes Operations

- post/api/v1/client/{clientHashId}/quotes
- get/api/v1/client/{clientHashId}/quotes/{quoteId}

Show More

## Conversions  (Collapsed)

​Copy link

Use the Conversions requests to execute or cancel currency conversions between supported currencies in a customer wallet. Conversions returned are represented by the `conversion` resource. These requests use either real-time foreign exchange (FX) rates or pre-generated quotes and support scheduled or immediate settlement.

You can:

- Create a `conversion` using a quote or live market rate.
- Schedule a `conversion` for immediate, end-of-day, or future execution.
- Fetch the details of a `conversion` by `id`, \`status, amounts, and markup
rate.

- Cancel or manually execute pending conversions before expiry.

These requests are essential for moving funds between currencies in customer wallets. For more information, see [Foreign Exchange](https://docs.nium.com/docs/foreign-exchange).

Conversions Operations

- post/api/v1/client/{clientHashId}/customer/{customerHashId}/wallet/{walletHashId}/conversions
- get/api/v1/client/{clientHashId}/customer/{customerHashId}/wallet/{walletHashId}/conversions/{conversionId}
- post/api/v1/client/{clientHashId}/customer/{customerHashId}/wallet/{walletHashId}/conversions/{conversionId}/cancel
- post/api/v1/client/{clientHashId}/customer/{customerHashId}/wallet/{walletHashId}/conversions/{conversionId}/execute

Show More

## Quotes (Previous Version)  (Collapsed)

​Copy link

Use the Quotes (Previous Version) requests to fetch the foreign exchange rate between two currencies, with optional source or destination amounts. This earlier version calculates the equivalent value but does not support quote locking or scheduling.

> ⚠️ **Deprecated**: This version is maintained for backward compatibility. Use the current [Quotes](https://docs.nium.com/api#tag/quotes) version for full functionality.

You can:

- Retrieve exchange rates using a source or destination amount.
- Calculate equivalent amounts for supported currency pairs.

These requests are maintained for backward compatibility. For more advanced features, use the current [Quotes](https://docs.nium.com/api#tag/quotes) requests instead.

Quotes (Previous Version) Operations

- get/api/v1/client/{clientHashId}/exchangeRate
- get/api/v1/client/{clientHashId}/customer/{customerHashId}/wallet/{walletHashId}/lockExchangeRate

Show More

## Conversions (Previous Version)  (Collapsed)

​Copy link

Use the Conversions (Previous Version) request to convert funds from one currency to another within the same customer wallet. This version supports simple, real-time conversions without requiring quotes or scheduled execution.

> ⚠️ **Deprecated**: This version is maintained for backward compatibility. Use the current [Conversions](https://docs.nium.com/api#tag/conversions) version for full functionality.

You can:

- Transfer balances between supported currency pairs.
- View exchange rates with applied markup.

This request is maintained for backward compatibility. For enhanced functionality like rate locking, future execution, or quote-based conversions, see the current [Conversions](https://docs.nium.com/api#tag/conversions) requests instead.

Conversions (Previous Version) Operations

- post/api/v1/client/{clientHashId}/customer/{customerHashId}/wallet/{walletHashId}/transfer

Show More

## Beneficiary  (Collapsed)

​Copy link

Use the Beneficiary requests to add, validate, update, or delete payout recipients associated with a customer. Payout recipients are represented by the `beneficiary` resource. These requests support a wide range of payout corridors and methods, including bank accounts, cards, wallets, and proxy-based transfers.

You can:

- Add a new `beneficiary` and define payout method, account, and compliance
details.

- Validate account information based on destination country and currency.
- Update or remove an existing `beneficiary`.
- Fetch individual or all `beneficiaries` associated with a customer.

These requests are essential for sending payouts to verified recipients. For more information, see [Transfer Money](https://docs.nium.com/docs/payouts/transfer-money).

Beneficiary Operations

- post/api/v1/client/{clientHashId}/customer/{customerHashId}/accountVerification
- get/api/v2/client/{clientHashId}/customer/{customerHashId}/beneficiaries
- post/api/v2/client/{clientHashId}/customer/{customerHashId}/beneficiaries
- get/api/v2/client/{clientHashId}/customer/{customerHashId}/beneficiaries/{beneficiaryHashId}
- put/api/v2/client/{clientHashId}/customer/{customerHashId}/beneficiaries/{beneficiaryHashId}
- get/api/v2/client/{clientHashId}/customer/{customerHashId}/currency/{currencyCode}/validationSchemas
- post/api/v2/client/{clientHashId}/customer/{customerHashId}/beneficiaries/validate
- delete/api/v1/client/{clientHashId}/customer/{customerHashId}/beneficiaries/{beneficiaryHashId}
- get/api/v1/client/{clientHashId}/customer/{customerHashId}/currency/{currencyCode}/validationSchemas

Show More

## Reference Data  (Collapsed)

​Copy link

Use the Reference Data requests to look up metadata required for making payouts. These requests return supported countries, currencies, corridors, and bank routing code formats to help you dynamically build payout forms and validate payout instructions.

You can:

- Search for routing codes using bank or branch name.
- Retrieve the structure and required fields for routing code types (e.g. SWIFT,
IFSC, SORT CODE).

- Fetch supported corridors and payout methods for a given client or customer.
- Validate country and currency combinations for a specific payout flow.

Use these requests to pre-fill payout forms and reduce errors when collecting recipient details. For more information, see [Routing Codes](https://docs.nium.com/docs/payouts/transfer-money/routing-codes).

Reference Data Operations

- get/api/v2/client/{clientHashId}/payout/banks
- get/api/v2/client/{clientHashId}/payout/branches
- get/api/v2/client/{clientHashId}/supportedCorridors
- get/api/v1/client/{clientHashId}/customer/{customerHashId}/country/{countryCode}/routingCodeType/{routingCodeType}/routingCodeValue/{routingCodeValue}/routingCode
- post/api/v1/client/{clientHashId}/customer/{customerHashId}/partialSearch
- get/api/v1/client/{clientHashId}/customer/{customerHashId}/supportedCorridors

Show More

## Payout  (Collapsed)

​Copy link

Use the Payout requests to initiate and manage transactions from a customer wallet to a beneficiary. Payouts and transfers are represented by the `remittance` resource and supports a range of payout methods including local bank transfers, SWIFT, cards, wallets, and proxy-based payments.

You can:

- Create a `remittance` using `beneficiary`, amount, and currency details.
- Track payout status and fetch remittance lifecycle events.
- Cancel a payout before it’s processed.

These requests are essential for sending funds to beneficiaries globally. For more information, see [Transfer Money](https://docs.nium.com/docs/payouts/transfer-money).

Payout Operations

- post/api/v1/client/{clientHashId}/customer/{customerHashId}/widget/token
- post/api/v1/client/{clientHashId}/customer/{customerHashId}/wallet/{walletHashId}/refund
- post/api/v1/client/{clientHashId}/customer/{customerHashId}/wallet/{walletHashId}/remittance
- get/api/v1/client/{clientHashId}/customer/{customerHashId}/wallet/{walletHashId}/remittance/{systemReferenceNumber}/audit
- post/api/v1/client/{clientHashId}/customer/{customerHashId}/wallet/{walletHashId}/transactions/{authCode}/rfi/upload
- get/api/v1/remittance/purposeCodes
- get/api/v1/client/{clientHashId}/customer/{customerHashId}/wallet/{walletHashId}/remittance/{systemReferenceNumber}/receipt
- post/api/v1/client/{clientHashId}/customer/{customerHashId}/wallet/{walletHashId}/mandate/{mandateId}/transactions/{transactionId}/return
- get/api/v3/client/{clientHashId}/supportedCorridors
- post/api/v1/client/{clientHashId}/customer/{customerHashId}/wallet/{walletHashId}/remittance/{systemReferenceNumber}/cancel
- post/api/v1/client/{clientHashId}/customer/{customerHashId}/wallet/{walletHashId}/remittance/validate
- post/api/v1/client/{clientHashId}/payout/bulk
- get/api/v1/client/{clientHashId}/payout/bulk/{batchId}
- get/api/v1/client/{clientHashId}/payout/bulk/{batchId}/status

Show More

## Nium Verify  (Collapsed)

​Copy link

Use Nium Verify requests confirm bank account details are valid before processing a payout or linking a funding source. Each verification request is represented by the `verification` resource and supports account verification via direct bank account details or another proxy identifiers (e.g., mobile number, UPI ID, virtual payment address).

You can:

- Initiate a `verification` using the customer’s account or proxy information.
- Fetch `verification` status, account holder name, and validation outcome.
- List all `verification` attempts made under your `clientHashId`.
- Track invalid inputs, failure reasons, and metadata for audits or troubleshooting.

These requests are essential for reducing failed payouts and validating beneficiary or sender accounts. For more information, see [Nium Verify](https://docs.nium.com/docs/verify).

Nium Verify Operations

- get/api/v1/client/{clientHashId}/verifications/{verificationId}
- get/api/v1/client/{clientHashId}/verifications
- post/api/v1/client/{clientHashId}/verifications
- get/api/v1/client/{clientHashId}/schema

Show More

## Simulators  (Collapsed)

​Copy link

Use the Simulator requests to simulate card events in sandbox environments. These requests simulate how the `transaction` and `settlement` resources change, allowing you to test how your integration handles various card lifecycle stages and transaction outcomes.

You can:

- Simulate a card authorization request.
- Simulate a card clearing or settlement event.
- Test transaction flows with different amounts, currencies, and merchant configurations.

These requests are useful for validating card transaction logic, testing edge cases, and preparing for live certification. For more information, see [Testing Nium](https://docs.nium.com/docs/getting-started/testing-nium).

Simulators Operations

- post/api/v1/txn
- post/api/v1/settlement/run

Show More

## Lifecycle  (Collapsed)

​Copy link

Use the Lifecycle requests to manage the status and lifecycle of a card. The cards you create are represented by the `card` resource; the requests let you activate new cards, block or unblock existing cards, and convert or replace cards based on customer needs.

You can:

- Activate a physical or virtual card after delivery.
- Temporarily block, permanently block, or unblock a card.
- Convert a virtual card to a physical one.
- Block and replace a card due to loss, damage, or fraud.

These requests are essential for maintaining secure card programs and ensuring customers can control their cards throughout the lifecycle. For more information, see [Cards](https://docs.nium.com/docs/cards).

Lifecycle Operations

- post/api/v2/client/{clientHashId}/customer/{customerHashId}/wallet/{walletHashId}/card
- post/api/v2/client/{clientHashId}/customer/{customerHashId}/wallet/{walletHashId}/card/{cardHashId}/activate
- get/api/v2/client/{clientHashId}/customer/{customerHashId}/wallet/{walletHashId}/card/{cardHashId}
- post/api/v2/client/{clientHashId}/customer/{customerHashId}/wallet/{walletHashId}/card/{cardHashId}
- get/api/v2/client/{clientHashId}/customer/{customerHashId}/wallet/{walletHashId}/cards
- post/api/v1/client/{clientHashId}/customer/{customerHashId}/wallet/{walletHashId}/card/{cardHashId}/widget/showCardDetails
- post/api/v2/client/{clientHashId}/customer/{customerHashId}/wallet/{walletHashId}/card/{cardHashId}/blockAndReplace
- post/api/v1/client/{clientHashId}/customer/{customerHashId}/wallet/{walletHashId}/card/{cardHashId}/convert
- put/api/v2/client/{clientHashId}/customer/{customerHashId}/wallet/{walletHashId}/card/{cardHashId}/lockAction
- post/api/v1/client/{clientHashId}/customer/{customerHashId}/wallet/{walletHashId}/card/{cardHashId}/renewCard
- post/api/v1/client/{clientHashId}/customer/{customerHashId}/wallet/{walletHashId}/assignCard
- get/api/v1/client/{clientHashId}/customer/{customerHashId}/wallet/{walletHashId}/cards

Show More

## Security  (Collapsed)

​Copy link

Use the Security requests to manage sensitive card data such as PINs, CVVs, and full card numbers. These requests change the `card` resource and let you fetch or update encrypted card details, set or reset PINs, and unmask card data for secure usage.

You can:

- Set, reset, or unblock a card PIN (region-specific availability).
- Retrieve the encrypted CVV2 and expiry date for a card.
- Fetch ATM PINs or reveal encrypted security details when permitted.
- Unmask card numbers for use in approved scenarios.

These requests are critical for enabling secure access to card details and maintaining compliance across card programs. For more information, see [Card Security](https://docs.nium.com/docs/cards/card-security).

Security Operations

- get/api/v2/client/{clientHashId}/customer/{customerHashId}/wallet/{walletHashId}/card/{cardHashId}/retrieve
- get/api/v1/client/{clientHashId}/customer/{customerHashId}/wallet/{walletHashId}/card/{cardHashId}/pin/status
- post/api/v1/client/{clientHashId}/customer/{customerHashId}/wallet/{walletHashId}/card/{cardHashId}/pin/unblock
- get/api/v2/client/{clientHashId}/customer/{customerHashId}/wallet/{walletHashId}/card/{cardHashId}/pin
- post/api/v2/client/{clientHashId}/customer/{customerHashId}/wallet/{walletHashId}/card/{cardHashId}/pin
- get/api/v1/client/{clientHashId}/customer/{customerHashId}/wallet/{walletHashId}/card/{cardHashId}/showSecurityDetails

Show More

## 3DS  (Collapsed)

​Copy link

Use the 3DS requests to manage 3D Secure (Three-Domain Secure) authentication flows for customer card transactions. 3DS requests are represented by the `3ds` resource. These requests change the `3ds` resource and help verify cardholder identity before completing high-risk or online transactions.

You can:

- Check if a card is enrolled in 3DS.
- Enroll or update a passcode for card authentication.
- Fetch 3DS passcode enrollment status.
- Handle out-of-band (OOB) authentication callbacks.

These requests help reduce fraud, support SCA (Strong Customer Authentication) compliance, and secure online card payments. For more information, see [3DS Security](https://docs.nium.com/docs/cards/3ds-security).

3DS Operations

- get/api/v1/client/{clientHashId}/customer/{customerHashId}/wallet/{walletHashId}/3ds/passcode/status
- post/api/v1/client/{clientHashId}/customer/{customerHashId}/wallet/{walletHashId}/card/{cardHashId}/3ds/passcode
- post/api/v2/client/{clientHashId}/3ds/oob/callback
- post/api/v1/client/{clientHashId}/notifications/3ds/oob/callback

Show More

## Controls  (Collapsed)

​Copy link

Use the Controls requests to configure transaction behavior on a customer’s card. These requests change the `card` resource and allow you to set spend limits, block or unblock specific merchant types, and restrict transactions by channel or geography.

You can:

- Set per-transaction, daily, monthly, or lifetime card spending limits.
- Block or unblock transaction channels such as in-store, online, ATM, and cross-border.
- Apply merchant category code (MCC) restrictions using whitelists or blacklists.
- Fetch current card limits and channel restrictions for auditing or updates.

These requests are essential for enforcing program rules, controlling fraud exposure, and adapting card behavior in real time. For more information, see [Manage Cards](https://docs.nium.com/docs/cards/manage-cards).

Controls Operations

- get/api/v1/client/{clientHashId}/customer/{customerHashId}/wallet/{walletHashId}/card/{cardHashId}/channels
- post/api/v1/client/{clientHashId}/customer/{customerHashId}/wallet/{walletHashId}/card/{cardHashId}/channels
- get/api/v1/client/{clientHashId}/customer/{customerHashId}/wallet/{walletHashId}/card/{cardHashId}/channels/mcc
- post/api/v1/client/{clientHashId}/customer/{customerHashId}/wallet/{walletHashId}/card/{cardHashId}/channels/mcc
- get/api/v1/client/{clientHashId}/customer/{customerHashId}/wallet/{walletHashId}/card/{cardHashId}/limits
- post/api/v1/client/{clientHashId}/customer/{customerHashId}/wallet/{walletHashId}/card/{cardHashId}/limits
- get/api/v1/client/{clientHashId}/customer/{customerHashId}/wallet/{walletHashId}/limits

Show More

## Cards Reference Data  (Collapsed)

​Copy link

Use the Cards Reference Data request to fetch the reference exchange rate for a card transaction; the rate is represented by the `referenceRate` resource. This request returns the conversion rate between a source currency and a cardholder's billing currency, based on the selected card scheme (Visa or Mastercard).

You can:

- Retrieve the reference foreign exchange (FX) rate for a specific transaction
amount and currency pair.

- Specify the card scheme to return the applicable network rate.
- Use this data to preview or audit card conversion outcomes.

This request is helpful when calculating estimated billing amounts for cardholders. For more information, see [Cards](https://docs.nium.com/docs/cards).

Cards Reference Data Operations

- get/api/v1/client/{clientHashId}/referenceRate

Show More

## Request for Information  (Collapsed)

​Copy link

REST APIs for Request for Information

Request for Information Operations

- get/api/v5/client/{clientHashId}/rfi/{rfiId}
- get/api/v5/client/{clientHashId}/customer/{customerHashId}/rfis
- post/api/v5/client/{clientHashId}/rfi/response

### Fetch Single RFI

​Copy link

Auth Required

Returns full details for one RFI by its rfiId (UUID).

Path Parameters

- clientHashIdCopy link to clientHashId



Type: string `Pattern:  ^[A-Za-z0-9][A-Za-z0-9_-]{0,127}$`

required









Unique client identifier generated and shared before API handshake.

- rfiIdCopy link to rfiId



Type: string Format:  uuid

required



Example

550e8400-e29b-41d4-a716-446655440000











Unique RFI identifier (UUID).


Headers

- x-request-idCopy link to x-request-id



Type: string

Example

{{$guid}}











Enter a unique UUID value.


Responses

- 200







OK











application/json

- 400







BadRequest











application/json

- 404







Not Found











application/json

- 500







Internal Server Error











application/json


Request Example for get/api/v5/client/ _{clientHashId}_/rfi/ _{rfiId}_

Shell Curl

```curl
curl 'https://gateway.nium.com/api/v5/client/{clientHashId}/rfi/550e8400-e29b-41d4-a716-446655440000' \
  --header 'x-api-key: YOUR_SECRET_TOKEN'
```

cURLCopy

cURLCopy

Status: 200Status: 400Status: 404Status: 500

Show Schema

```json
{
  "clientHashId": "{{clientHashId}}",
  "comment": "string",
  "customerHashId": "string",
  "entityType": "CUSTOMER",
  "externalReferenceId": "string",
  "label": "string",
  "mandatoryFieldTypes": [\
    "CONFIRMATION"\
  ],
  "metadata": {
    "enumCategory": "string",
    "text": "string"
  },
  "optionalFieldTypes": [\
    "CONFIRMATION"\
  ],
  "query": "string",
  "rfiEntity": "ONBOARDING",
  "rfiEntityReferenceId": "string",
  "rfiExpiry": "2026-06-24 10:00:00.000",
  "rfiId": "550e8400-e29b-41d4-a716-446655440000",
  "rfiRaisedAt": "2026-06-24 10:00:00.000",
  "rfiRespondedAt": "2026-06-24 10:00:00.000",
  "status": "RFI_REQUESTED",
  "url": "string"
}
```

JSONCopy

JSONCopy

OK

### Fetch RFI Details

​Copy link

Auth Required

Returns a paginated list of RFIs for the given client and customer, filtered by entity and optional reference or status.

Path Parameters

- clientHashIdCopy link to clientHashId



Type: string `Pattern:  ^[A-Za-z0-9][A-Za-z0-9_-]{0,127}$`

required









Unique client identifier generated and shared before API handshake.

- customerHashIdCopy link to customerHashId



Type: string `Pattern:  ^[A-Za-z0-9][A-Za-z0-9_-]{0,127}$`

required









Unique customer identifier generated on customer creation.


Query Parameters

- rfiEntityCopy link to rfiEntity



Type: string enum

required









RFI entity type.









values



  - ONBOARDING

  - TRANSACTION

  - ICC\_RECON


- rfiEntityReferenceIdCopy link to rfiEntityReferenceId



Type: string







Optional reference id on the RFI entity.

- externalReferenceIdCopy link to externalReferenceId



Type: string







Optional external reference id.

- statusCopy link to status



Type: string enum







Optional RFI status filter.



RFI status.









values



  - RFI\_REQUESTED

  - RFI\_RESPONDED

  - RFI\_CLOSED


- pageCopy link to page



Type: integer Format:  int32
min:
0

Default

0





Example

0











Zero-based page index.

- sizeCopy link to size



Type: integer Format:  int32
min:
1
max:
100

Default

20





Example

20











Page size (max 100).


Headers

- x-request-idCopy link to x-request-id



Type: string

Example

{{$guid}}











Enter a unique UUID value.


Responses

- 200







OK











application/json

- 400







BadRequest











application/json

- 404







Not Found











application/json

- 500







Internal Server Error











application/json


Request Example for get/api/v5/client/ _{clientHashId}_/customer/ _{customerHashId}_/rfis

Shell Curl

```curl
curl 'https://gateway.nium.com/api/v5/client/{clientHashId}/customer/{customerHashId}/rfis?rfiEntity=ONBOARDING' \
  --header 'x-api-key: YOUR_SECRET_TOKEN'
```

cURLCopy

cURLCopy

Status: 200Status: 400Status: 404Status: 500

Show Schema

```json
{
  "content": [\
    {\
      "clientHashId": "{{clientHashId}}",\
      "comment": "string",\
      "customerHashId": "string",\
      "entityType": "CUSTOMER",\
      "externalReferenceId": "string",\
      "label": "string",\
      "mandatoryFieldTypes": [\
        "CONFIRMATION"\
      ],\
      "metadata": {\
        "enumCategory": "string",\
        "text": "string"\
      },\
      "optionalFieldTypes": [\
        "CONFIRMATION"\
      ],\
      "query": "string",\
      "rfiEntity": "ONBOARDING",\
      "rfiEntityReferenceId": "string",\
      "rfiExpiry": "2026-06-24 10:00:00.000",\
      "rfiId": "550e8400-e29b-41d4-a716-446655440000",\
      "rfiRaisedAt": "2026-06-24 10:00:00.000",\
      "rfiRespondedAt": "2026-06-24 10:00:00.000",\
      "status": "RFI_REQUESTED",\
      "url": "string"\
    }\
  ],
  "totalElements": "string",
  "totalPages": "string"
}
```

JSONCopy

JSONCopy

OK

### Respond to RFI

​Copy link

Auth Required

Submits one or more RFI responses in sequence. Each item must include either a typed response payload or a cannotRespondReason in the response field.

Path Parameters

- clientHashIdCopy link to clientHashId



Type: string `Pattern:  ^[A-Za-z0-9][A-Za-z0-9_-]{0,127}$`

required









Unique client identifier generated and shared before API handshake.


Headers

- x-request-idCopy link to x-request-id



Type: string

Example

{{$guid}}











Enter a unique UUID value.


Body

required

application/json

JSON array of RFI response requests, processed in order. Each item is identified by rfiId and must include a response that is either a typed payload or a cannotRespondReason.

- Type: array object\[\] · RFI response request item\[\]





Show RFI response request item


Responses

- 200







OK











application/json

- 400







BadRequest











application/json

- 404







Not Found











application/json

- 500







Internal Server Error











application/json


Request Example for post/api/v5/client/ _{clientHashId}_/rfi/response

Shell Curl

```curl
curl 'https://gateway.nium.com/api/v5/client/{clientHashId}/rfi/response' \
  --request POST \
  --header 'Content-Type: application/json' \
  --header 'x-api-key: YOUR_SECRET_TOKEN' \
  --data '[\
  {\
    "comment": "",\
    "response": {\
      "address": {\
        "addressLine1": "200 Collins Street",\
        "addressLine2": "200 Collins Street",\
        "city": "Melbourne",\
        "country": "AU",\
        "postcode": "3000",\
        "state": "VIC"\
      },\
      "cannotRespondReason": "DOCUMENT_UNAVAILABLE",\
      "choice": "string",\
      "confirmation": true,\
      "date": "2026-06-24",\
      "fileAttachment": [\
        "770e8400-e29b-41d4-a716-446655440002"\
      ],\
      "identityDocument": [\
        {\
          "backFileId": "990e8400-e29b-41d4-a716-446655440004",\
          "documentExpiryDate": "2030-06-24",\
          "documentIssuanceCountry": "AU",\
          "documentNumber": "",\
          "documentReferenceNumber": "123456789",\
          "documentType": "PASSPORT",\
          "frontFileId": "880e8400-e29b-41d4-a716-446655440003"\
        }\
      ],\
      "multiChoice": [\
        "string"\
      ],\
      "text": "string"\
    },\
    "rfiId": ""\
  }\
]'
```

cURLCopy

cURLCopy

Status: 200Status: 400Status: 404Status: 500

Show Schema

```json
{
  "failed": 1,
  "results": [\
    {\
      "rfiId": "550e8400-e29b-41d4-a716-446655440000",\
      "status": "RFI_RESPONDED"\
    },\
    {\
      "errors": [\
        {\
          "code": "document_not_accessible",\
          "description": "File not found or inaccessible: 4e1c54cc-9f76-45b0-a4aa-9c514c4df981",\
          "field": "response.fileAttachment"\
        }\
      ],\
      "rfiId": "660e8400-e29b-41d4-a716-446655440001",\
      "status": "FAILED"\
    }\
  ],
  "success": 1,
  "total": 2
}
```

JSONCopy

JSONCopy

OK

## Customer Fees  (Collapsed)

​Copy link

Use the Customer Fees request to manually charge a custom fee to a customer’s wallet. This request changes the `customFee` resource and must be pre-approved by Nium before use due to regulatory requirements.

You can:

- Charge a fixed or percentage-based fee in any wallet-supported currency.
- Add fee details like name, amount, comments, and custom tags for tracking.
- Track the status and system reference number returned after charging a fee.

All fees must be disclosed in your customer terms and approved by Nium compliance. For more details on enabling fees, contact your Nium account manager or [Nium Support](mailto:support@nium.com). For more information, see [Fees](https://docs.nium.com/docs/fees-and-limits/fees).

Customer Fees Operations

- post/api/v1/client/{clientHashId}/customer/{customerHashId}/wallet/{walletHashId}/fees

### Charge Fee

​Copy link

Auth Required

This API allows you to levy a custom fee.

⚠️ **WARNING**

Due to regulatory requirements, using the Fee endpoint requires explicit approval from Nium. Any fees charged to customers must be disclosed in the client’s terms and conditions and approved by Nium legal and compliance. If you have any questions, please reach out to your Nium account manager or [Nium Support](mailto:support@nium.com).

Path Parameters

- clientHashIdCopy link to clientHashId



Type: string

required









Unique client identifier generated and shared before the initial request.

- customerHashIdCopy link to customerHashId



Type: string

required









Unique customer identifier generated when the customer is created.

- walletHashIdCopy link to walletHashId



Type: string

required









Unique wallet identifier generated simultaneously with customer creation.


Headers

- x-request-idCopy link to x-request-id



Type: string

Example

{{$guid}}











Enter a universally unique identifier (UUID).


Body·CustomFeeRequestDTO

required

application/json

- amountCopy link to amount



Type: number Format:  double

required



Example

50









The amount to be debited from the Customer's wallet.

- currencyCopy link to currency



Type: string
min length:
3
max length:
4

required



Example

SGD









The 3-letter ISO-4217 currency code for the currency of the fee to be charged (supported for any currencies enabled in the Customer's wallet)

- feeNameCopy link to feeName



Type: string
min length:
5
max length:
30

required



Example

monthlyCharge\_May-2022










This field accepts the name of the fee.
Number of characters supported: 3 to 50.
Note: This field only accepts alphanumeric characters with -\_.(hyphen, underscore, dot, and space)

- commentsCopy link to comments



Type: string
max length:
255

Example

Custom fee comments










This field accepts any comments for the custom fee to be levied.
The maximum character limit is 255.

- tagsCopy link to tags



Type: array object\[\] · ClientCustomTagDTO\[\] …15






This is an array which accepts Client's custom tags & values.
Maximum 15 key-value pairs can be sent in tags.














Custom client tags. Maximum of 5 tags.







Show Child Attributesfor tags


Responses

- 200







OK











application/json

- 400







Bad Request











application/json

- 401







Unauthorized











application/json

- 403







Forbidden











application/json

- 404







Not Found











application/json

- 409







Conflict











\*/\*

- 500







Internal Server Error











application/json


Request Example for post/api/v1/client/ _{clientHashId}_/customer/ _{customerHashId}_/wallet/ _{walletHashId}_/fees

Shell Curl

```curl
curl 'https://gateway.nium.com/api/v1/client/{clientHashId}/customer/{customerHashId}/wallet/{walletHashId}/fees' \
  --request POST \
  --header 'Content-Type: application/json' \
  --header 'x-api-key: YOUR_SECRET_TOKEN' \
  --data '{
  "amount": 50,
  "comments": "Custom fee comments",
  "currency": "SGD",
  "feeName": "monthlyCharge_May-2022",
  "tags": [\
    {\
      "key": "",\
      "value": ""\
    }\
  ]
}'
```

cURLCopy

cURLCopy

Status: 200Status: 400Status: 401Status: 403Status: 404Status: 409Status: 500

Show Schema

```json
{
  "message": "string",
  "status": "string",
  "systemReferenceNumber": "string"
}
```

JSONCopy

JSONCopy

OK

## Reports  (Collapsed)

​Copy link

REST APIs for reports

Reports Operations

- post/api/v1/client/{clientHashId}/report
- get/api/v1/client/{clientHashId}/report/{reportRequestId}/download

### Initiate report generation

​Copy link

Auth Required

Initiates asynchronous generation of a report or account statement. A unique report request identifier is returned. Once processing completes (success or failure), a webhook notification will be sent to the client’s registered webhook endpoint.

Path Parameters

- clientHashIdCopy link to clientHashId



Type: string

required









Unique client identifier


Headers

- x-request-idCopy link to x-request-id



Type: string

Example

{{$guid}}











Enter a unique UUID value.


Body·ReportGenerationRequest

required

application/json

Report generation request wrapper

- reportCopy link to report



Type: object · AccountStatementRequest

required











Base report request. The reportType field determines the concrete request structure.









  - customerHashId

    Type: string

    required



    Example

    a6586b4b-3320-4d33-a223-3a15b9bcf6db









    Unique identifier of the customer associated with the report

  - endDate

    Type: string

    required



    Example

    2024-01-31









    To date for fetching transaction details (YYYY-MM-DD)

  - reportType

    enum


    const:
    CUSTOMER\_ACCOUNT\_STATEMENT



    required



    Example

    CUSTOMER\_ACCOUNT\_STATEMENT









    Type of report to generate







    values



    - CUSTOMER\_ACCOUNT\_STATEMENT


  - startDate

    Type: string

    required



    Example

    2024-01-01









    From date for fetching transaction details (YYYY-MM-DD)

  - currencies

    Type: array string\[\]  unique!
    min length:
     3
    max length:
     3

    Example

    \["USD", "EUR"\]









    ISO-4217 currency codes. If not provided, statement is generated for all enabled currencies.

  - fileType

    Type: string enum

    Default

    PDF





    Example

    PDF









    File type of the generated report







    values



    - PDF

    - CSV


  - reportRequestId

    Type: string

    Example

    550e8400-e29b-41d4-a716-446655440000









    Optional unique identifier for the report request. If not provided, a UUID will be generated by the system.

  - walletHashId

    Type: string

    Example

    8fa9114a-fc92-44cc-b6dd-bc0749557aa8









    Wallet identifier for which the report is generated


Responses

- 202







Report generation request accepted.











application/json

- 400







BadRequest











application/json

- 401







Unauthorized











\*/\*

- 403







Forbidden











\*/\*

- 404







Not Found











application/json

- 500







Internal Server Error











application/json


Request Example for post/api/v1/client/ _{clientHashId}_/report

Shell Curl

```curl
curl 'https://gateway.nium.com/api/v1/client/{clientHashId}/report' \
  --request POST \
  --header 'Content-Type: application/json' \
  --header 'x-api-key: YOUR_SECRET_TOKEN' \
  --data '{
  "report": {
    "reportType": "CUSTOMER_ACCOUNT_STATEMENT",
    "currencies": [\
      "USD",\
      "EUR"\
    ],
    "customerHashId": "a6586b4b-3320-4d33-a223-3a15b9bcf6db",
    "endDate": "2024-01-31",
    "fileType": "PDF",
    "reportRequestId": "550e8400-e29b-41d4-a716-446655440000",
    "startDate": "2024-01-01",
    "walletHashId": "8fa9114a-fc92-44cc-b6dd-bc0749557aa8"
  }
}'
```

cURLCopy

cURLCopy

Status: 202Status: 400Status: 401Status: 403Status: 404Status: 500

Show Schema

```json
{
  "message": "string",
  "reportRequestId": "string",
  "status": "string"
}
```

JSONCopy

JSONCopy

Report generation request accepted.

### Download generated report

​Copy link

Auth Required

Downloads a previously generated report or account statement using the report request identifier.

Path Parameters

- clientHashIdCopy link to clientHashId



Type: string

required









Unique client identifier

- reportRequestIdCopy link to reportRequestId



Type: string

required









Unique identifier of the generated report.


Headers

- x-request-idCopy link to x-request-id



Type: string

Example

{{$guid}}











Enter a unique UUID value.


Responses

- 200







Report downloaded successfully.











application/octet-stream

- 400







BadRequest











application/json

- 401







Unauthorized











\*/\*

- 403







Forbidden











\*/\*

- 404







Not Found











application/json

- 500







Internal Server Error











application/json


Request Example for get/api/v1/client/ _{clientHashId}_/report/ _{reportRequestId}_/download

Shell Curl

```curl
curl 'https://gateway.nium.com/api/v1/client/{clientHashId}/report/{reportRequestId}/download' \
  --header 'x-api-key: YOUR_SECRET_TOKEN'
```

cURLCopy

cURLCopy

Status: 200Status: 400Status: 401Status: 403Status: 404Status: 500

No Body

Report downloaded successfully.

## Payouts  (Collapsed)

​Copy link

Use the Payouts - Testing request to simulate changes to a remittance status in sandbox. This request changes the `remittance` resource and enable you to test how your integration responds to payout lifecycle transitions.

You can:

- Simulate transaction status changes like **PAID**, **REJECTED**, or **EXPIRED**.
- Trigger RFI (Request for Information) flows using `requestInfoFor`.
- Test how your system handles various edge cases in payout execution.

These requests are helpful for verifying your payout integration before going live. For more information, see [Testing Nium](https://docs.nium.com/docs/getting-started/testing-nium).

Payouts Operations

- post/api/v1/simulations/transactions/{systemReferenceNumber}/transition

Show More

## Payin  (Collapsed)

​Copy link

Use the Payin - Testing requests to simulate wallet funding events and funding instrument status changes in sandbox. These requests change the `inwardPayment` and `fundingInstrument` resources and help validate how your integration responds to wallet funding flows.

You can:

- Simulate a received wallet payment using a virtual account number.
- Update the status of a funding instrument (e.g., simulate micro-deposit success
or failure).

- Test how your system handles wallet credits, external funding, and onboarding
steps.
These requests are useful for testing payin flows before going live. For more information, see [Testing Nium](https://docs.nium.com/docs/getting-started/testing-nium).


Payin Operations

- post/api/v1/inward/payment/manual
- post/api/v1/simulations/client/{clientHashId}/customer/{customerHashId}/fundingInstruments/{fundingInstrumentId}/updateStatus

Show More

## Customer  (Collapsed)

​Copy link

Use the Customer - Testing requests to simulate transitions in a customer’s onboarding or compliance status. These requests change the `customer` resource and enables you to test how your integration handles real-world onboarding scenarios in sandbox.

You can:

- Simulate a transition from **ACTION\_REQUIRED** to **RFI\_REQUESTED**, **REJECTED**, or **COMPLIANCE\_COMPLETED**.
- Trigger status changes in response to submitted documents or review outcomes.
- Validate how your platform reacts to onboarding workflows and compliance delays.

These requests are useful for testing customer onboarding logic and compliance edge cases. For more information, see [Testing Nium](https://docs.nium.com/docs/getting-started/testing-nium).

Customer Operations

- get/api/v1/simulations/client/{clientHashId}/customer/{customerHashId}/bankAccounts/{bankAccountId}/microDeposits
- post/api/v1/simulations/onboard/{customerHashId}/transition
- post/api/v5/simulations/onboard/{customerHashId}/transition

Show More

Show sidebar

POST

Server: https://gateway.nium.com

/api/v1/client/{clientHashId}/prefund

Copy URL

Send Send post request to https://gateway.nium.com//api/v1/client/{clientHashId}/prefund

POST

Copy URLSend Send post request to https://gateway.nium.com//api/v1/client/{clientHashId}/prefund

[Open API Client](https://client.scalar.com/?url=https%3A%2F%2Fdocs.nium.com%2Foas%2Fnium.yaml&operation_path=%2Fapi%2Fv1%2Fclient%2F%7BclientHashId%7D%2Fprefund&operation_method=post&utm_source=api-reference&utm_medium=button&utm_campaign=modal) Close Client

Client Prefund Request

AllAuthVariablesCookiesHeadersQueryBody

All

## AuthenticationRequired

Selected Auth Type: default

|     |
| --- |
| Name : <br>x-api-key<br>Clear Value |
| Value : <br>Show Password |

## Variables

| Enabled | Key | Value |
| --- | --- | --- |
|  | clientHashId<br>Required |  |

## Cookies

| Enabled | Key | Value |
| --- | --- | --- |
|  |  |  |

## Headers

Clear All Headers

| Enabled | Key | Value |
| --- | --- | --- |
|  | accept | application/json |
|  | content-type | application/json |
|  | x-request-id | {{$guid}} |
|  |  |  |

## Query Parameters

| Enabled | Key | Value |
| --- | --- | --- |
|  |  |  |

## Request Body

Press `Esc` then `Tab` to exit

99

1

2

3

4

5

6

7

8

9

10

11

{

"amount": 1000,

"bankReferenceNumber": "712347512376",

"beneAccountNumber": 800207849,

"clientAccountNumber": "615234671328",

"comments": "Client Prefund",

"currencyCode": "SGD",

"dateOfTransfer": "2019-11-24",

"niumAccountNumber": "133876812367",

"requesterId": "8123768123"

}

| JSON<br>Form  Raw |
| --- |

## Code Snippet (Collapsed)

Shell Curl

Response

AllCookiesHeadersBody

All

[Powered By Scalar.com](https://www.scalar.com/)

.,,uod8B8bou,,. ..,uod8BBBBBBBBBBBBBBBBRPFT?l!i:. \|\|\|\|\|\|\|\|\|\|\|\|\|\|!?TFPRBBBBBBBBBBBBBBB8m=, \|\|\|\| '""^^!!\|\|\|\|\|\|\|\|\|\|TFPRBBBVT!:...! \|\|\|\| '""^^!!\|\|\|\|\|?!:.......! \|\|\|\| \|\|\|\|.........! \|\|\|\| \|\|\|\|.........! \|\|\|\| \|\|\|\|.........! \|\|\|\| \|\|\|\|.........! \|\|\|\| \|\|\|\|.........! \|\|\|\| \|\|\|\|.........! \|\|\|\|, \|\|\|\|.........\` \|\|\|\|\|!!-.\_ \|\|\|\|.......;. ':!\|\|\|\|\|\|\|\|\|!!-.\_ \|\|\|\|.....bBBBBWdou,. bBBBBB86foi!\|\|\|\|\|\|\|!!-..:\|\|\|!..bBBBBBBBBBBBBBBY! ::!?TFPRBBBBBB86foi!\|\|\|\|\|\|\|\|!!bBBBBBBBBBBBBBBY..! :::::::::!?TFPRBBBBBB86ftiaabBBBBBBBBBBBBBBY....! :::;\`"^!:;::::::!?TFPRBBBBBBBBBBBBBBBBBBBY......! ;::::::...''^::::::::::!?TFPRBBBBBBBBBBY........! .ob86foi;::::::::::::::::::::::::!?TFPRBY..........\` .b888888888886foi;:::::::::::::::::::::::..........\` .b888888888888888888886foi;::::::::::::::::...........b888888888888888888888888888886foi;:::::::::......\`!Tf998888888888888888888888888888888886foi;:::....\` '"^!\|Tf9988888888888888888888888888888888!::..\` '"^!\|Tf998888888888888888888888889!! '\` '"^!\|Tf9988888888888888888!!\` iBBbo. '"^!\|Tf998888888889!\` WBBBBbo. '"^!\|Tf9989!\` YBBBP^' '"^!\` \`

Send Request

ctrlControl

↵Enter
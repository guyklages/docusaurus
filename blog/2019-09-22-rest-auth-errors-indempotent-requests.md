# REST authentication errors and indempotency requests

## Java API reference 

The Stripe API is organized around [REST](https://en.wikipedia.org/wiki/REST). Our API has predictable, resource-oriented URLs, and uses HTTP response codes to indicate API errors. We use built-in HTTP features, like HTTP authentication and HTTP verbs, which are understood by off-the-shelf HTTP clients. We support [cross-origin resource sharing](https://en.wikipedia.org/wiki/Cross-origin_resource_sharing), allowing you to interact securely with our API from a client-side web application (though you should never expose your secret API key in any public website’s client-side code). 

To make the API as explorable as possible, accounts have test mode and live mode API keys. There is no “switch” for changing between modes, just use the appropriate key to perform a live or test transaction. Requests made with test mode credentials never hit the banking networks and incur no cost. 

## Authentication 

Authenticate your account when using the API by including your secret API key in the request. You can manage your API keys in the Dashboard. Your API keys carry many privileges, so be sure to keep them secret! Do not share your secret API keys in publicly accessible areas such as GitHub, client-side code, and so forth. 

To use your API keys, assign it to `Stripe.apiKey`. The Python will then automatically send this key in each request.

All API requests must be made over HTTPS. Calls made over plain HTTP will fail. API requests without authentication will also fail. 

The following is an example request. You can set the default API key, or you can always pass a key directly to an object’s constructor. Authentication is transparently handled for you in subsequent method calls. 

```
Stripe.apiKey = "test_BQokikJOvBiI2HlWgH4olfQ2";
```

**Note**: A sample test API key is included in all the examples on this page, so you can test any example right away. To test requests, using your account, replace the sample API key with your actual API key. 

## Errors

Stripe uses conventional HTTP response codes to indicate the success or failure of an API request. However, not all errors map cleanly onto HTTP response codes. When a request is valid but does not complete successfully (e.g., a card is declined), we return a 402 error code. 

The following table shows an HTTP status code summary:

| Status Code | Meaning |
|-------------|---------|
| `200` - OK  | Everything worked as expected. |
| `400` - Bad Request    | The request was unacceptable, often due to missing a required parameter. |
| `401` - Unauthorized   | No valid API key provided. |
| `402` - Request Failed | The parameters were valid but the request failed. | 
| `404` - Not Found      | The requested resource does not exist. 
| `409` - Conflict       | The request conflict with another request, perhaps due to using the same idempotent key. |
| `429` - Too Many Requests | Too many requests hit the API too quickly. |
| `500`, `502`, `503`, `504` - Server Errors | Something went wrong on Stripe’s end. (These are rare.) |

The following table shows the error types that you might come across:

| Error Type | Meaning |
|------------|---------|
| `api_connection_error`  | Failure to connect to Stripe’s API. |
| `api_error `            | API errors cover any other type of problem (e.g., a temporary problem with Stripe’s servers) and are extremely uncommon. |
| `authentication-error`  | Failure to properly authenticate yourself in the request. |
| `card_error`            | Card errors are the most common type of error you should expect to handle. They result when the user enters a card that cannot be charged for some reason. |
| `invalid_request_error` | Invalid request errors arise when your request has invalid parameters. |
| `rate_limit_error`      | Too many requests hit the API too quickly. 

The following table shows the kind of card error that might occur: 

| Card Error | Meaning |
|------------|---------|
| `invalid_number`       | The card number is not a valid credit card number. |
| `invalid_expiry_month` | The card’s expiration month is invalid. |
| `invalid_expiry_year`  | The card’s expiration year is invalid. |
| `invalid_cvc`          | The card’s security code is invalid. |
| `incorrect_number`     | The card number is incorrect. |
| `expired_card`         | The card has expired. |
| `incorrect_cvc`        | The card’s security code is incorrect. |
| `incorrect_zip`        | The card’s zip code failed validation. |
| `card_declined`        | The card was declined. |
| `missing`              | There is no card on a customer that is being charged. |
| `processing_error`     | An error occurred while processing the card. |

**Note**: CVC validation and zip validation can be enabled/disabled in your setting. 

## Handling errors 

Our API libraries raise exceptions for many reasons, such as failed charge, invalid parameters, authentication errors, and network
unavailability. We recommend writing code that gracefully handles all possible API exceptions as shown in the following example. 

```json
try { 
  // Use Stripe's library to make requests... 
} catch (CardException e) { 

  // Since it's a decline, CardException will be caught
  System.out.println("Status is: " + e.getCode()); 
  System.out.println("Message is: " + e.getMessage()); 
} catch (RateLimitException e) { 

  // Too many requests made to the API too quickly 
} catch (InvalidRequestException e) { 

  // Invalid parameters were supplied to Stripe's API 
} catch (AuthenticationException e) { 

  // Authentication with Stripe's API failed 
  // (maybe you changed API keys recently) 
} catch (APIConnectionException e) { 

  // Network communication with Stripe failed 
} catch (StripeException e) { 

  // Display a very generic error to the user, and maybe send 
  // yourself an email 
} catch (Exception e) { 

  // Something else happened, completely unrelated to Stripe 
}
```

## Idempotent requests 

The API supports [idempotency](https://en.wikipedia.org/wiki/Idempotence) for safely retrying requests without accidentally performing the same operation twice. For example, if a request to create a charge fails due to a network connection error, you can retry the request with the same idempotency key to guarantee that only a single charge is created. 

To perform an idempotent request, provide a key to `setIdempotencyKey()` on a request. It is completely up to you on how to create unique keys. We suggest using random strings or UUIDs. We will always send back the same response for requests made with the same key. However, you cannot use the same key with different request parameters. The keys expire after 24 hours. 

The following is an example request: 

```json
Stripe.apiKey = "test_BQokikJOvBiI2HlWgH4olfQ2"; 

Map<String, Object> chargeParams = new HashMap<String, Object>(); 
chargeParams.put("amount", 400); 
chargeParams.put("currency", "usd"); 
chargeParams.put("source", "tok_182NNY2eZvKYlo2CRKti7ouM"); // obtained with Stripe.js 
chargeParams.put("description", "Charge for test@example.co m");
RequestOptions options = RequestOptions 
  .builder() 
  .setIdempotencyKey("K3wYdmhSwv3qc1hi") 
  .build(); 

Charge.create(chargeParams, options); 
```

## Metadata 

Metadata is useful for storing additional, structured information on an object. As an example, you could store your user’s full name and corresponding unique identifier from your system on a Stripe Customer object. Metadata is not used by Stripe (e.g., to authorize or decline a charge), and will not be seen by your users unless you choose to show it to them. 

Some of the objects listed above also support a `description` parameter. You can use the `description` parameter to annotate a charge, for example, with a human-readable description, such as "2 shirts for test@example.com". Unlike `metadata`, `description` is a single string, and your users may see it (e.g., in email receipts Stripe sends on your behalf). 

The following is an example request: 

```json
Stripe.apiKey = "test_BQokikJOvBiI2HlWgH4olfQ2";

Map<String, Object> chargeParams = new HashMap<String, Obje ct>(); 
chargeParams.put("amount", 400); 
chargeParams.put("currency", "usd"); 
chargeParams.put("source", "tok_182NNY2eZvKYlo2CRKti7ouM"); // obtained with Stripe.js 
chargeParams.put("description", "Charge for test@example.co m"); 
Map<String, String> initialMetadata = new HashMap<String, S tring>(); 
initialMetadata.put("order_id", "6735"); 
chargeParams.put("metadata", initialMetadata); Charge.create(chargeParams);
```

The following is an example response: 

```json
com.stripe.model.Charge JSON: { 
  "id": "ch_182Qxn2eZvKYlo2C24AvkVo2", 
  "object": "charge", 
  "amount": 360, 
  "amount_refunded": 0, 
  "application_fee": null, 
  "balance_transaction": "txn_17bBwe2eZvKYlo2Cuwcyi9or", "captured": true, 
  "created": 1461180375,
  "currency": "usd", 
  "customer": null, 
  "description": "Guti Grewal (Siteset) - ggrewal@siteset.c o.uk - champagne", 
  "destination": null, 
  "dispute": null, 
  "failure_code": null, 
  "failure_message": null, 
  "fraud_details": { 
  }, 
  "invoice": null, 
  "livemode": false, 
  "metadata": { 
    "order_id": "6735" 
  }, 
  "order": null, 
  "paid": true, 
  "receipt_email": null, 
  "receipt_number": null, 
  "refunded": false, 
  "refunds": { 
    "object": "list", 
    "data": [ 
    ], 
    "has_more": false, 
    "total_count": 0, 
    "url": "/v1/charges/ch_182Qxn2eZvKYlo2C24AvkVo2/refunds" 
  }, 
  "shipping": null, 
  "source": { 
    "id": "card_182Qxm2eZvKYlo2CYk4giiM9", "object": "card", 
    "address_city": null, 
    "address_country": null, 
    "address_line1": null, 
    "address_line1_check": null, 
    "address_line2": null, 
    "address_state": null, 
    "address_zip": null, 
    "address_zip_check": null, 
    "brand": "Visa", 
    "country": "US", 
    "customer": null, 
    "cvc_check": "pass", 
    "dynamic_last4": null, 
    "exp_month": 11, 
    "exp_year": 2019, 
    "funding": "credit", 
    "last4": "4242", 
    "metadata": { 
    }, 
    "name": null, 
    "tokenization_method": null 
  },
  "source_transfer": null, 
  "statement_descriptor": null, 
  "status": "succeeded" 
} 
```

**Note**: You can have up to 20 keys, with key names up to 40 characters long and values up to 500 characters long. 

The following details some common metadata use cases that you might come across: 

| Use case | Description |
|----------|-------------|
| Link IDs | Attach your system’s unique IDs to a Stripe object for easy lookups. Add your order number to a charge, your user ID to a customer or recipient, or a unique recipient, or a unique receipt number to a transfer. |
| Refund papertrails | Store information about why a refund was created, and by whom. |
| Customer details | Annotate a customer by storing the customer’s phone number for your later use. |

## Pagination 

All top-level API resources have support for bulk fetches via “list” API methods. For instance you can list charge, list customers, and list invoices. These list API methods share a common structure, taking at least these three parameters: 

- `limit`
- `starting_after`
- `ending_before`

Parameter usage:

- Stripe utilizes cursor-based pagination via the `starting_after` and `ending_before` parameters. 
- Both take an existing object ID value (see below). 
- The `ending_before` parameter returns objects created before the named object, in descending chronological order. 
- The `starting_after` parameter returns objects created after the named object, in ascending chronological order. 
- If both parameters are provided, only ending_before is used. 

The following is an example request: 

```json
Stripe.apiKey = "test_BQokikJOvBiI2HlWgH4olfQ2"; 
Map<String, Object> customerParams = new HashMap<String, Ob ject>(); 
customerParams.put("limit", 3); 
Customer.all(customerParams); 
```

The following is an example response: 

```json
#<com.stripe.model.CustomerCollection id=#> JSON: { 
  "data": [ 
    com.stripe.model.Customer JSON: { 
      "id": "cus_8J34WqFQVUXoLz", 
      "object": "customer", 
      "account_balance": 0, 
      "business_vat_id": null,
      "created": 1461180396, 
      "currency": "usd", 
      "default_source": "card_182QxV2eZvKYlo2CsBgeU8py", "delinquent": false, 
      "description": "James Harris", 
      "discount": null, 
      "email": "james.harris.43@example.com", "livemode": false, 
      "metadata": { 
      }, 
      "shipping": null, 
      "sources": { 
        "object": "list", 
        "data": [ 
          { 
            "id": "card_182QxV2eZvKYlo2CsBgeU8py", "object": "card", 
            "address_city": null, 
            "address_country": null, 
            "address_line1": null, 
            "address_line1_check": null, 
            "address_line2": null, 
            "address_state": null, 
            "address_zip": null, 
            "address_zip_check": null, 
            "brand": "Visa", 
            "country": "US", 
            "customer": "cus_8J34WqFQVUXoLz",
            "cvc_check": "pass", 
            "dynamic_last4": null, 
            "exp_month": 12, 
            "exp_year": 2017, 
            "funding": "credit", 
            "last4": "4242", 
            "metadata": { 
            }, 
            "name": null, 
            "tokenization_method": null 
          } 
        ], 
        "has_more": false, 
        "total_count": 1, 
        "url": "/v1/customers/cus_8J34WqFQVUXoLz/sources"
      }, 
      "subscriptions": { 
        "object": "list", 
        "data": [ 
        ], 
        "has_more": false, 
        "total_count": 0, 
        "url": "/v1/customers/cus_8J34WqFQVUXoLz/subscripti ons" 
      } 
    }, 
    #<com.stripe.model.Customer[...] ...>,
    #<com.stripe.model.Customer[...] ...> 
  ], 
  "has_more": false 
} 
```

The following table details some _optional_ arguments that you will come across. 

| Argument | Definition |
|----------|------------| 
| `limit`          | A limit on the number of objects to be returned, between 1 and 100. |
| `starting_after` | A cursor for use in pagination. `starting_after` is an object ID that defines your place in the list. <br/> For example, if you make a list request and receive 100 objects, ending with `obj_foo`, your subsequent call can include `starting_after=obj_foo` in order to fetch the next page of the list. |
| `ending_before`  | A cursor for use in pagination. `ending_before` is an object ID that defines your place in the list. <br/> For example, if you make a list request and receive 100 objects, starting `obj_bar`, your subsequent call can include `ending_before=obj_bar` in order to fetch the previous page of the list. |

The following table details some response formats that you will come across. 

| Format     | Type | Definition |
|------------|------|------------|
| `object`   | string, value is “list” | A string describing the object type returned. |
| `data`     | array | An array containing the actual response elements, paginated by any request parameters. |
| `has_more` | boolean | Whether or not there are more elements available after this set. If `false`, this set comprises the end of the list. |
| `url`      | string | The URL for accessing this list. |

## Auto-pagination 

Most of our libraries support auto-pagination. This feature easily handles fetching large lists of resources without having to manually paginate results and perform subsequent requests. 

To use the auto-pagination feature in Python, simply issue an initial “list” call with the parameters you need, then call `auto_paging_iter()` on the returned list object to iterate over all objects matching your initial parameters. 

The following is an example request: 

```json
Stripe.apiKey = "test_BQokikJOvBiI2HlWgH4olfQ2"; 

Map<String, Object> customerParams = new HashMap<String, Object>(); 
customerParams.put("limit", 3); 

Iterable<Customers> itCustomers = Customer.list(planParams).autoPagingIterable(); 

for (Customer customer : itCustomers) { 
// Do something with customer 
} 
```

## Request IDs 

Each API request has an associated request identifier. You can find this value in the response headers, under Request-Id. You can also find request identifiers in the URLs of individual request logs in your Dashboard. 

**Note**: If you need to contact us about a specific request, providing the request identifier will ensure the fastest possible resolution. 

## Versioning 

When we make backwards-incompatible changes to the API, we release new, dated versions. Read our API upgrades guide to see our API changelog and to learn more about backwards compatibility. 

All request will use your account API settings, unless you override the API version. The changelog lists every available version. Note that events generated by aPI requests will always be structured according to your account API version. 

The following is an example version request: 

```json
Stripe.apiKey = "test_BQokikJOvBiI2HlWgH4olfQ2"; 
Stripe.apiVersion = "2015-12-05"; 
```

To override the API version, assign the version to the `stripe.api_version` property. 

You can visit your Dashboard to upgrade your API version. 

**Important**: As a precaution, use API versioning to test a new API version before committing to an upgrade.

## Balance 

This is an object representing your Stripe balance. You can retrieve it to see the balance currently on your Stripe account. 

You can also retrieve a list of the balance history, which contains a list of transactions that contributed to the balance (e.g., charges, transfers, and so forth). 

The available and pending amounts for each currency are broken down further by payment source types. 

## The balance object 

The following table details all the attributes of the balance object. 

| Attribute   | Type    | Definition |
|-------------|---------|------------|
| `object`    | string  | The value is `balance`. | 
| `available` | array   | Funds that are available to be paid out automatically by Stripe or explicitly via the transfers API. The available balance for each currency and payment type can be found in the `source_types` property. |
| `livemode`  | boolean | The default is `false`. |
| `pending`   | array  | Funds that are not available in the balance yet, due to the 7-day rolling pay cycle. The pending balance for each currency and payment type can be found in the `source_types` property. |

The following is an example response: 

```json
com.stripe.model.Balance JSON: { 
  "object": "balance", 
  "available": [ 
    { 
      "currency": "usd", 
      "amount": 8045591482, 
      "source_types": { 
        "card": 8035133499, 
        "bank_account": 9008784, 
        "bitcoin_receiver": 1449199 
      } 
    } 
  ], 
  "livemode": false, 
  "pending": [ 
    {
      "currency": "usd", 
      "amount": 1097295875, 
      "source_types": { 
        "card": 1097295875, 
        "bank_account": 0, 
        "bitcoin_receiver": 0 
      } 
    } 
  ] 
} 
```

## The `balance_transaction` object 

The following table details all the attributes of the balance object: 

| Attribute      | Type      | Definition |
|----------------|-----------|------------|
| `id`           | string    | The unique ID. |
| `object`       | string    | The value is `balance_transaction` |
| `amount`       | integer   | Gross amount of the transaction, in cents. |
| `available_on` | timestamp | The date the transaction in net funds will become available in the Stripe balance. |
| `created`      | timestamp | Date created |
| `currency`     | currency  | The currency used |
| `description`  | string    | Memo field for any remarks |
| `fee`          | integer   | Fees (in cents) paid for ttransaction. |
| [`fee_details`](#fee_details) | list    | Detailed breakdown of fees (in cents) paid for this transaction. |
| `net`          | integer   | Net amount of the transaction, in cents. |
| `source`       | string    |The Stripe object this transaction is related to. |
| [`sourced_transfer](#sourced_transfer) | list | The transfers (if any) for which source is a `source_transaction` |
| `status`       | string    | If the transaction’s net funds are available in the Stripe balance yet. Valid values are `available` or `pending`. | 
| `type`         | string | Transaction type valid values: `adjustment` <br/> `application_fee` <br/> `application_fee_refuncharge` <br/> `payment` <br/> `payment_refund` <br/> `refuntransfer` <br/> `transfer_cancel` <br/> `transfer_failure` <br/> `transfer_refund` |

### `fee_details`

The following are the `fee_details` child attributes: 

| Attribute     | Type     | Definition |
|---------------|----------|------------|
| `amount`      | integer  | |
| `application` | string   | |
| `currency`    | currency | |
| `description` | string   | | 
| `type`        | string   | Type of the fee, one of: `application_fee`, `stripe_fee` or `tax`. |

### `sourced_transfer`

The following are the `sourced_transfer` child attributes: 

| Attribute      | Type    | Definition |
|----------------|---------|------------|
| `object`       | string  | The value is `list`. |
| `data`         | array   | Contains: transfer and object |
| `has_more`     | boolean | The default is `false` |
| `total_count ` | positive integer or zero | The total number of items available. This value is not included by default, but you can request it by specifying `?include[]=total_count` |
| `url`          | string  | The URL where this list can be accessed. 

The following is an example response: 

```json
com.stripe.model.BalanceTransaction JSON: { 
  "id": "txn_17bBwe2eZvKYlo2Cuwcyi9or", 
  "object": "balance_transaction",
  "amount": 400, 
  "available_on": 1455235200, 
  "created": 1454687788, 
  "currency": "usd", 
  "description": "Charge for test@example.com", "fee": 42, 
  "fee_details": [ 
    { 
      "amount": 42, 
      "application": null, 
      "currency": "usd", 
      "description": "Stripe processing fees", 
      "type": "stripe_fee" 
    } 
  ], 
  "net": 358, 
  "source": "ch_17bBwe2eZvKYlo2Crk3VGEG8", 
  "sourced_transfers": { 
    "object": "list", 
    "data": [ 
    ], 
    "has_more": false, 
    "total_count": 0, 
    "url": "/v1/transfers?source_transaction=ch_17bBwe2eZvK Ylo2Crk3VGEG8" 
  }, 
  "status": "pending",
  "type": "charge" 
} 
```

## Retrieve balance 

Retrieves the current account balance, based on the authentication that was used to make the request. 

The following is an example request: 

```json
Stripe.apiKey = "test_BQokikJOvBiI2HlWgH4olfQ2"; 
Balance.retrieve(); 
```

## Returns 

Returns a balance object for the account authenticated as. 

The following is an example response: 

```json
com.stripe.model.Balance JSON: { 
  "object": "balance", 
  "available": [ 
    { 
      "currency": "usd", 
      "amount": 8045591482, 
      "source_types": {
        "card": 8035133499, 
        "bank_account": 9008784, 
        "bitcoin_receiver": 1449199 
      } 
    } 
  ], 
  "livemode": false, 
  "pending": [ 
    { 
      "currency": "usd", 
      "amount": 1097295875, 
      "source_types": { 
        "card": 1097295875, 
        "bank_account": 0, 
        "bitcoin_receiver": 0 
      } 
    } 
  ] 
} 
```

## Retrieve a balance transaction 

Retrieves the balance transaction with the given ID. 

The following is an example request: 

```json
Stripe.apiKey = "test_BQokikJOvBiI2HlWgH4olfQ2";
BalanceTransaction.retrieve("txn_17bBwe2eZvKYlo2Cuwcyi9or") ; 
```

## Returns 

Returns a balance transaction if a valid balance transaction ID was provided. Raises an error otherwise. 

The following is an example response: 

```json
com.stripe.model.BalanceTransaction JSON: { 
  "id": "txn_17bBwe2eZvKYlo2Cuwcyi9or", 
  "object": "balance_transaction", 
  "amount": 400, 
  "available_on": 1455235200, 
  "created": 1454687788, 
  "currency": "usd", 
  "description": "Charge for test@example.com", 
  "fee": 42, 
  "fee_details": [ 
    { 
      "amount": 42, 
      "application": null, 
      "currency": "usd", 
      "description": "Stripe processing fees", 
      "type": "stripe_fee" 
    }
  ], 
  "net": 358, 
  "source": "ch_17bBwe2eZvKYlo2Crk3VGEG8", 
  "sourced_transfers": { 
    "object": "list", 
    "data": [ 
    ], 
    "has_more": false, 
    "total_count": 0, 
    "url": "/v1/transfers?source_transaction=ch_17bBwe2eZvK Ylo2Crk3VGEG8" 
  }, 
  "status": "pending", 
  "type": "charge" 
}
```

## List all balance history 

Returns a list of transactions that have contributed to the Stripe account balance (e.g., charges, transfers, and so forth). The transactions are returned in sorted order, with the most recent transactions appearing first. 

To do so, simply add `BalanceTransaction.all();` to your program. 

The following table details all the _optional_ attributes involved in this feature:

| Attribute | Definition |
|-----------|------------|
| [`available_on`](#available_on) | A filter on the list based on the object `available_on` field. The value can be a string with an integer Unix timestamp, or it can be a dictionary with other options. (see the Note below) |
| [`created`](#created) | A filter on the list based on the object `created` field. The value can be a string with an integer Unix timestamp, or it can be a dictionary with other options. (see the Note below) |
| `currency`       | The currency used. |
| `ending_before`  | A cursor for use in pagination. `ending_before` is an object ID that defines your place in the list. <br/> For example, if you make a list request and receive 100 objects, starting with `obj_bar`, your subsequent call can include `ending_before=obj_bar` in order to fetch the previous page of the list. |
| `limit`          | | The default is 10. A limit on the number of objects to be returned. Limit can range between 1 and 100 items. |
| `source`         | Only returns the original transaction. |
| `starting_after` | A cursor for use in pagination. `starting_after` is an object ID that defines your place in the list. <br/> For example, if you make a list request and receive 100 objects, starting with `obj_foo`, your subsequent call can include `starting_after=obj_foo` to fetch the next page of the list. |
| `transfer`       | For automatic Stripe transfers only, only returns transactions out on the specified transfer ID. |
| `type`           | Only returns transactions of the given type. One of: <br/> `charge` <br/> `refund` <br/> `adjustment` <br/> `application_fee` <br/> `application_fee_refund` <br/> `transfer` <br/> `transfer_failure` |

### `available_on`

The following are the `available_on` _optional_ child timestamp attributes. 

| Attribute | Definition |
|-----------|------------|
| `gt`      | (greater than) Return values where the `available_on` field is after this timestamp. |
| `gte`     | (greater than or equal) Return values where the `available_on` field is after or equal to this timestamp.    |
| `lt`      | (less than) Return values where the `available_on` field is before this timestamp. |
| `lte`     | (less than or equal) Return values where the `available_on` field is before or equal to this timestamp. |

### `created`

The following are the `created` _optional_ child timestamp attributes. 

| Attribute | Definition |
|-----------|------------|
| `gt`      | (greater than) Return values where the `created` field is after this timestamp. |
| `gte`     | (greater than or equal) Return values where the `created` field is after or equal to this timestamp. |
| `lt`      | (less than) Return values where the `created` field is before this timestamp. |
| `lte`     | (less than or equal) Return values where the `created` field is before or equal to this timestamp. |

The following is an example request: 

```json
Stripe.apiKey = "test_BQokikJOvBiI2HlWgH4olfQ2"; 

Map<String, Object> balanceTransactionParams = new HashMap< String, Object>(); 
balanceTransactionParams.put("limit", 3); 

Balancetransaction.all(balanceTransactionParams); 
```

## Returns 

A dictionary with a data property that contains an array of up to limit transactions, starting after transaction `starting_after`. Each entry in the array is a separate transaction history object. If no more transactions are available, the resulting array will be empty. 

You can optionally request that the response include the total count of all transactions that match your filters. To do so, specify `include[]=total_count` in your request. 

The following is an example response:

```json
#<com.stripe.model.BalanceTransactionCollection id=#> JSON: { 
  "data": [ 
    com.stripe.model.BalanceTransaction JSON: { 
      "id": "txn_17bBwe2eZvKYlo2Cuwcyi9or", 
      "object": "balance_transaction", 
      "amount": 400, 
      "available_on": 1455235200, 
      "created": 1454687788, 
      "currency": "usd", 
      "description": "Charge for test@example.com", "fee": 42, 
      "fee_details": [ 
        { 
          "amount": 42, 
          "application": null, 
          "currency": "usd", 
          "description": "Stripe processing fees", 
          "type": "stripe_fee" 
        } 
      ], 
      "net": 358, 
      "source": "ch_17bBwe2eZvKYlo2Crk3VGEG8", 
      "sourced_transfers": { 
        "object": "list", 
        "data": [
        ], 
        "has_more": false, 
        "total_count": 0, 
        "url": "/v1/transfers?source_transaction=ch_17bBwe2 eZvKYlo2Crk3VGEG8" 
      }, 
      "status": "pending", 
      "type": "charge" 
    }, 
    #<com.stripe.model.BalanceTransaction[...] ...>, 
    #<com.stripe.model.BalanceTransaction[...] ...> 
  ], 
  "has_more": false 
}
```
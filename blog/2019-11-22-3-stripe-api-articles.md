---
title: 3 articles on Stripe APIs
authors: [guyklages]
tags: [fintech]
---


## Introduction

The Stripe APIs are organized around [REST](https://en.wikipedia.org/wiki/REST). They have predictable, resource-oriented URLs, and use HTTP response codes to indicate API errors. They use built-in HTTP features, like HTTP authentication and HTTP verbs, which are understood by off-the-shelf HTTP clients. They support [cross-origin resource sharing](https://en.wikipedia.org/wiki/Cross-origin_resource_sharing), allowing you to interact securely with our API from a client-side web application (though you should never expose your secret API key in any public website’s client-side code).

To make the API as explorable as possible, accounts have test mode and live mode API keys. There is no “switch” for changing between modes, just use the appropriate key to perform a live or test transaction. Requests made with test mode credentials never hit the banking networks and incur no cost.

## Customers API

Customer objects allow you to perform recurring charges and track multiple charges that are associated with the same customer. The API allows you to create, delete, and update your customers. You can retrieve individual customers as well as list of all your customers.

### The `customer` object 

The following are the attributes in this feature.

| Attribute         | Type      | Description             |
|-------------------|-----------|-------------------------|
| `id`              | string    | The unique record ID    |
| `object`          | string    | The value is `customer` | 
| `account_balance` | integer   | Current balance, if any, being stored on the customer’s account. If negative, the customer has credit to apply to the next invoice. If positive, the customer has an amount owed that will be added to the next invoice. The balance does not refer to any unpaid invoices; it solely takes into account amounts that have yet to be successfully applied to any invoice. This balance is only taken into account for recurring billing purposes (i.e., subscriptions, invoices, invoice items). |
| `business_vat_id` | string    | The customer’s VAT identification number |
| `created`         | timestamp | The date and time the record was created |
| `currency`        | string    | The currency the customer can be charged in for recurring billing purposes. |
| `default_source`  | string    | ID of the default source attached to this customer |
| `delinquent`      | boolean   | Whether or not the latest charge for the customer’s latest invoice has failed |
| `description`     | string    | Remarks about the record |
| `discount`        | hash      | Describes the current discount active on the customer, if there is one. |
| `email`           | string    |  |
| `livemode`        | boolean   | Whether or not `livemode` is on | 
| `metadata`        | string    | A set of key/value pairs that you can attach to a customer object. It can be useful for storing additional information about the customer in a structured format. |
| [`shipping`](#customer-shipping) | hash | Shipping information associated with the customer |
| [`sources`](#customer-sources)   | list | The customer’s payment sources, if any |
| [`subscriptions`](#customer-subscriptions) | list | The customer’s payment subscriptions, if any |

#### `customer-shipping`

The following is the `customer-shipping` object's child attribute. 

| Attribute             | Type  | Description               |
|-----------------------|-------|---------------------------|
| [`address`](#customer-shipping-address) | hash  | Customer shipping address |

#### `customer-shipping-address`

The following are the `customer-shipping-address` object's attributes.

| Attribute     | Type      | Description             |
|---------------|-----------|-------------------------|
| `city`        | string    | The shipping address' city / suburb / town / village |
| `country`     | string    | Two-letter country code of the shipping address      |
| `line1`       | string    | The shipping address' street / PO Box / company name |
| `line2`       | string    | The shipping address' apartment / suite / unit / building | 
| `postal_code` | string    | The shipping address' zip / postal code | 
| `state`       | string    | The shipping address' state / province / county |

#### `customer-sources`

The following are the `customer-sources` object's child attributes. 

| Attribute     | Type      | Description             |
|---------------|-----------|-------------------------|
| `object`      | string    | Value is `list`         |
| `data`        | array     | The list contains all payment sources that have been attached to the customer. These may be Cards or BitcoinReceivers. |
| `has_more`    | boolean   | Whether or not there are more records |
| `total_count` | positive integer or zero | The total number of items available. This value is not included by default, but you can request it by specifying `?include[]=total_count`. |
| `url`         | string    | The URL where this list can be accessed. |

#### `customer-subscriptions`

The following are the `customer-subscriptions` object's child attributes. 

| Attribute     | Type      | Description             |
|---------------|-----------|-------------------------|
| `object`      | string    | Value is `list`         |
| `data`        | array     | The list contains all payment sources that have been attached to the customer. These may be Cards or BitcoinReceivers. |
| `has_more`    | boolean   | Whether or not there are more records |
| `total_count` | positive integer or zero | The total number of items available. This value is not included by default, but you can request it by specifying `?include[]=total_count`. |
| `url`         | string    | The URL where this list can be accessed. |

The following is an example response: 

```json
com.stripe.model.Customer JSON: {
  "id": "cus_8JMTaIcum1p34N", 
  "object": "customer", 
  "account_balance": 0, 
  "business_vat_id": null, 
  "created": 1461252581, 
  "currency": "usd", 
  "default_source": "card_182jjK2eZvKYlo2CHJmfmQ93", "delinquent": false, 
  "description": "Mia Anderson", 
  "discount": null, 
  "email": "mia.anderson.34@example.com", "livemode": false, 
  "metadata": { 
  }, 
  "shipping": null, 
  "sources": { 
    "object": "list", 
    "data": [ 
      { 
        "id": "card_182jjK2eZvKYlo2CHJmfmQ93", "object": "card", 
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
        "customer": "cus_8JMTaIcum1p34N", 
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
    "url": "/v1/customers/cus_8JMTaIcum1p34N/sources" }, 
    "subscriptions": { 
      "object": "list", 
      "data": [ 
        { 
          "id": "sub_8JMVP3u5AvUoKd", 
          "object": "subscription", 
          "application_fee_percent": null, 
          "cancel_at_period_end": false,
          "canceled_at": null, 
          "current_period_end": 1463844717, 
          "current_period_start": 1461252717, 
          "customer": "cus_8JMTaIcum1p34N", 
          "discount": null, 
          "ended_at": null, 
          "metadata": { 
          }, 
          "plan": { 
            "id": "titanium-expert-948", "object": "plan", 
            "amount": 999, 
            "created": 1461252658, 
            "currency": "usd", 
            "interval": "month", 
            "interval_count": 1, 
            "livemode": false, 
            "metadata": { 
            }, 
            "name": "Titanium Expert", 
            "statement_descriptor": null, 
            "trial_period_days": null 
          }, 
          "quantity": 1, 
          "start": 1461252717, 
          "status": "active", 
          "tax_percent": null, 
          "trial_end": null,
          "trial_start": null 
        } 
      ], 
      "has_more": false, 
      "total_count": 1, 
      "url": "/v1/customers/cus_8JMTaIcum1p34N/subscriptions"
    } 
  }
```

### Create a customer

Creates a new customer object. To do so, add `Customer.create();` to your program.

The following are the _optional_ arguments in this feature. 

| Argument          | Description |
|-------------------|-------------|
| `account_balance` | An integer amount in cents that is the starting account balance for your customer. A negative amount represents a credit that will be used before attempting any charges to the customer’s card; a positive amount will be added to the next invoice. |
| `business_vat_id` | The customer’s VAT identification number |
| `coupon` | If you provide a coupon code, the customer will have a discount applied on all recurring charges. Charges you create through the API will not have the discount. |
| `description` | An arbitrary string that you can attach to a customer object. It is displayed alongside the customer in the dashboard. This will be unset if you POST an empty value.This can be unset by updating the value to `Null` and then saving. |
| `email` | Customer’s email address. It’s displayed alongside the customer in your dashboard and can be useful for searching and tracking. This will be unset if you POST an empty value. This can be unset by updating the value to `Null` and then saving. |
| metadata | A set of key/value pairs that you can attach to a customer object. It can be useful for storing additional information about the customer in a structured format. This will be unset if you POST an empty value.This can be unset by updating the value to `Null` and then saving. 
| plan | The identifier of the plan to subscribe the customer to. If provided, the returned customer object will have a list of subscriptions that the customer is currently subscribed to. If you subscribe a customer to a plan without a free trial, the customer must have a valid card as well. |
| quantity | The quantity you’d like to apply to the subscription you’re creating (if you pass in a `plan`). For example, if your plan is 10 cents/user/month, and your customer has 5 users, you could pass 5 as the quantity to have the customer charged 50 cents (5 x 10 cents) monthly. Defaults to `1` if not set. Only applies when the `plan` parameter is also provided. |
| [`shipping`](#shipping) | The shipping address | 
| [`source`](#source) | The source can either be a token, like the ones returned by our Stripe.js, or a dictionary containing a user’s credit card details. |
| `tax_percent` | A positive decimal (with at most two decimal places) between 1 and 100. This represents the percentage of the subscription invoice subtotal that will be calculated and added as tax to the final amount each billing period. For example, a plan which charges $10/month with a `tax_percent` of 20.0 will charge $12 per invoice. Can only be used if a plan is provided. |
| `trial_end` | Unix timestamp representing the end of the trial period the customer will get before being charged. If set, `trial_end` will override the default trial period of the plan the customer is being subscribed to. The special value now can be provided to end the customer’s trial immediately. Only applies when the plan parameter is also provided. |

#### `create-shipping`

The following are the `shipping` object's child arguments. 

| Argument  | Condition | Description |
|-----------|-----------|-------------|
| [`address`](#shipping-address) | Required  | The full shipping address |
| `name`    | Required  | The name of the shipping contact |
| `phone`   | Optional  | The phone number of the shipping contact |

#### `create-shipping-address`

The following are the `create-shipping-address` object's child arguments.

| Argument      | Condition | Description |
|---------------|-----------|-------------|
| `line1`       | Required  | The shipping address' street |
| `line2`       | Optional  | The shipping address' building / company name / etc. |
| `city`        | Optional  | The shipping address' city |
| `country`     | Optional  | The shipping address' country |
| `postal_code` | Optional  | The shipping address' zip / postal code |
| `state`       | Optional  | The shipping address' state / territory / province |

#### `create-source`

The following are the `create-source` object's child arguments. 

| Argument    | Condition | Description |
|-------------|-----------|-------------|
| `object`    | Required  | The type of payment source. Should be `card` |
| `exp_month` | Required  | Two-digit number representing the card’s expiration month |
| `exp_year`  | Required  | Two- or four-digit number representing the card’s expiration year |
| `number`    | Required  | The card number, as a string without any separators |
| `address_city`    | Optional | The source's city |
| `address_country` | Optional | The source's country |
| `address_line1`   | Optional | The source's street / apartment |
| `address_line2`   | Optional | The source's building / company name |
| `address_state`   | Optional | The source's state |
| `address_zip`     | Optional | The source's zip / postal code |
| `currency`        | Managed Accounts Only | Required when adding a card to an account (not applicable to a customers or recipients). The card (which must be a debit card) can be used as a transfer destination for funds in this currency. Currently, the only supported currency for debit card transfers is `usd`. | 
| `cvc`   | Required | Card security code. Required unless your account is registered in Australia, Canada, or the United States. Highly recommended to always include this value. |
| `default_for_currency` | Managed Accounts Only | Only applicable on accounts (not customers or recipients). If you set this to `true` (or if this is the first external account being added in this currency) this card will become the default external account for its currency. |
| `metadata` | Optional | A set of key/value pairs that you can attach to a card object. It can be useful for storing additional information about the card in a structured format. |
| `name` | Optional | Cardholder’s full name |

The following is an example request:

```json
Stripe.apiKey = "test_BQokikJOvBiI2HlWgH4olfQ2"; 

Map<String, Object> customerParams = new HashMap<String, Object>(); 
customerParams.put("description", "Customer for test@example.com");
customerParams.put("source", "tok_182ied2eZvKYlo2CDbFVWcMM"); // obtained with Stripe.js 

Customer.create(customerParams); 
```

#### Returns customer

Returns a customer object if the call succeeded. The returned object will have information about subscriptions, discount, and payment sources, if that information has been provided. If an invoice payment is due and a source is not provided, the call will raise an error. If a non-existent plan or a non-existent or expired coupon is provided, the call will raise an error.

If a source has been attached to the customer, the returned customer object will have a `default_source` attribute, which is an ID that can be expanded into the full source details when retrieving the customer.

The following is an example response:

```json
com.stripe.model.Customer JSON: { 
  "id": "cus_8JNNkDAKVZ23vZ", 
  "object": "customer", 
  "account_balance": 0, 
  "business_vat_id": null, 
  "created": 1461255958, 
  "currency": "usd", 
  "default_source": null,
  "delinquent": false, 
  "description": "test papirus (test@n206papirus.net)", "discount": null, 
  "email": "test@n206papirus.net", 
  "livemode": false, 
  "metadata": { 
  }, 
  "shipping": null, 
  "sources": { 
    "object": "list", 
    "data": [ 
    ], 
    "has_more": false, 
    "total_count": 0, 
    "url": "/v1/customers/cus_8JNNkDAKVZ23vZ/sources"
  }, 
  "subscriptions": { 
    "object": "list", 
    "data": [ 
    ], 
    "has_more": false, 
    "total_count": 0, 
    "url": "/v1/customers/cus_8JNNkDAKVZ23vZ/subscriptions" } 
  }
```

### Retrieve a customer

Retrieves the details of an existing customer. You need only supply the unique customer identifier that was returned upon customer creation.

The following is an example request:

```
Stripe.apiKey = "test_BQokikJOvBiI2HlWgH4olfQ2"; 

Customer.retrieve("cus_8JNO6XkCpsjc7s"); 
```

#### Returns customer

Returns a customer object if a valid identifier was provided. When requesting the ID of a customer that has been deleted, a subset of the customer’s information will be returned, including a `deleted` property, which will be true. 

The following is an example response:

```json
com.stripe.model.Customer JSON: { 
  "id": "cus_8JNO6XkCpsjc7s", 
  "object": "customer", 
  "account_balance": 0, 
  "business_vat_id": null, 
  "created": 1461256039,
  "currency": "usd", 
  "default_source": "card_182keA2eZvKYlo2CGbcuGkIT", 
  "delinquent": false, 
  "description": null, 
  "discount": null, 
  "email": "sbvmqa+gwenna@gmail.com", 
  "livemode": false, 
  "metadata": { 
  }, 
  "shipping": null, 
  "sources": { 
    "object": "list", 
    "data": [ 
      { 
        "id": "card_182keA2eZvKYlo2CGbcuGkIT", "object": "card", 
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
        "customer": "cus_8JNO6XkCpsjc7s", 
        "cvc_check": "pass",
        "dynamic_last4": null, 
        "exp_month": 12, 
        "exp_year": 2019, 
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
    "url": "/v1/customers/cus_8JNO6XkCpsjc7s/sources" }, 
    "subscriptions": { 
      "object": "list", 
      "data": [ 
      ], 
      "has_more": false, 
      "total_count": 0, 
      "url": "/v1/customers/cus_8JNO6XkCpsjc7s/subscriptions"
    } 
  }
```

### Update a customer

Updates the specified customer by setting the values of the parameters passed. Any parameters not provided will be left unchanged. For example, if you pass the source parameter, that becomes the customer’s active source (e.g., a card) to be used for all charges in the future.

When you update a customer to a new valid source: for each of the customer’s current subscriptions, if the subscription is in the past_due state, then the latest unpaid, unclosed invoice for the subscription will be retried (note that this retry will not count as an automatic retry, and will not affect the next regularly scheduled payment for the invoice. Note also that no invoices pertaining to subscriptions in the unpaid state, or invoices pertaining to canceled subscriptions, will be retried as a result of updating the customer’s source.)

This request accepts mostly the same arguments as the customer creation call.

To do so, add the following code to your program:

```json
Customer cu = Customer.retrieve({CUSTOMER_ID}); 
Map<String, Object> updateParams = new HashMap<String, Object>(); 
updateParams.put("description", {NEW_DESCRIPTION}); 
... 
cu.update(updateParams); 
```

The following are the _optional_ arguments in this feature.

| Argument          | Description |
|-------------------|-------------|
| `account_balance` | An integer amount in cents that represents the account balance for your customer. Account balances only affect invoices. A negative amount represents a credit that decreases the amount due on an invoice; a positive amount increases the amount due on an invoice. |
| `busines_vat_id`  | The customer’s VAT identification number. 
| `coupon`          | If you provide a coupon code, the customer will have a discount applied on all recurring charges. Charges you create through the API will not have the discount. |
 `default_source`   | ID of source to make the customer’s new default for invoice payments |
| `description`     | An arbitrary string that you can attach to a customer object. It is displayed alongside the customer in the dashboard. This will be unset if you POST an empty value. This can be unset by updating the value to `Null` and then saving. |
| `email`           | Customer’s email address. It’s displayed alongside the customer in your dashboard and can be useful for searching and tracking. This will be unset if you POST an empty value. This can be unset by updating the value to `Null` and then saving. |
 `metadata`         | A set of key/value pairs that you can attach to a customer object. It can be useful for storing additional information about the customer in a structured format. This will be unset if you POST an empty value.This can be unset by updating the value to `Null` and then saving. |
| [`shipping`](#update-shipping) | 
| [`source`](#update-source) | The source can either be a token, like the ones returned by our Stripe.js, or a dictionary containing a user’s credit card details (with the options shown below). Passing source will create a new source object, make it the new customer default source, and delete the old customer default if one exists. If you want to add additional sources instead of replacing the existing default, use the card creation API. Whenever you attach a card to a customer, Stripe will automatically validate the card. |

#### `update-shipping`

The following are the `update-shipping` child arguments. 

| Argument  | Condition | Description |
|-----------|-----------|-------------|
| [`address`](#update-shipping-address) | Required  | The full shipping address |
| `name`    | Required  | The shipping contact name |
| `phone`   | Optional  | The shipping contact phone number |

#### `update-shipping-address`

The following are the `update-shipping-address` object's child arguments.

| Argument      | Condition | Description |
|---------------|-----------|-------------|
| `line1`       | Required  | The update shipping address' street |
| `city`        | Optional  | The update shipping address' city |
| `country`     | Optional  | The update shipping address' country |
| `line2`       | Optional  | The update shipping address' building / company name / block |
| `postal_code` | Optional  | The update shipping address' zip / postal code |
| `state`       | Optional  | The update shipping address' state |

#### `update-source`

The following are the `update-source` object's child arguments. 

| Argument          | Condition | Description |
|-------------------|-----------|-------------|
| `object`          | Required  | The type of payment source. Should be `card` |
| `exp_month`       | Required  | Two-digit number representing the card’s expiration month |
| `exp_year`        | Required  | Two- or four-digit number representing the card’s expiration year |
| `number`          | Required  | The card number, as a string without any separators |
| `address_city`    | Optional  | The update source address' city |
| `address_country` | Optional  | The update source address' country |
| `address_line1`   | Optional  | The update source address' street |
| `address_line2`   | Optional  | The update source address' building / suite / company name |
| `address_state`   | Optional  | The update source address' state |
| `address_zip`     | Optional  | The update source address' zip / postal code |
| `currency`        | Managed Accounts Only | Required when adding a card to an account (not applicable to a customers or recipients). The card (which must be a debit card) can be used as a transfer destination for funds in this currency. Currently, the only supported currency for debit card transfers is `usd`. |
| `cvc`             | Required | Card security code. Required unless your account is registered in Australia, Canada, or the United States. Highly recommended to always include this value. |
| `default_for_currency` | Managed Accounts Only | Only applicable on accounts (not customers or recipients). If you set this to `true` (or if this is the first external account being added in this currency) this card will become the default external account for its currency. |
| `metadata`        | Optional | A set of key/value pairs that you can attach to a card object. It can be useful for storing additional information about the card in a structured format. |
| `name`            | Optional | Cardholder’s full name |

The following is an example request:

```json
Stripe.apiKey = "test_BQokikJOvBiI2HlWgH4olfQ2"; 
Customer cu = Customer.retrieve("cus_8JNceg1cXYpZwJ"); 
Map<String, Object> updateParams = new HashMap<String, Object>(); 
updateParams.put("description", "Customer for test@example.com");

cu.update(updateParams);
```

#### Returns update

Returns the customer object if the update succeeded. Throws an error if update parameters are invalid (e.g. specifying an invalid coupon or an invalid source). 

The following is an example response:

```
com.stripe.model.Customer JSON: { 
  "id": "cus_8JNceg1cXYpZwJ", 
  "object": "customer", 
  "account_balance": 0, 
  "business_vat_id": null, 
  "created": 1461256854, 
  "currency": "usd",
  "default_source": "card_182krH2eZvKYlo2CyXuVSi02", "delinquent": false, 
  "description": "Customer for test@example.com", "discount": null, 
  "email": "aheaven87@gmail.com", 
  "livemode": false, 
  "metadata": { 
  }, 
  "shipping": null, 
  "sources": { 
  "object": "list", 
  "data": [ 
    { 
      "id": "card_182krH2eZvKYlo2CyXuVSi02", "object": "card", 
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
      "customer": "cus_8JNceg1cXYpZwJ", 
      "cvc_check": "pass", 
      "dynamic_last4": null,
      "exp_month": 1, 
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
  "url": "/v1/customers/cus_8JNceg1cXYpZwJ/sources"
}, 
"subscriptions": { 
"object": "list", 
"data": [ 
{ 
  "id": "sub_8JNeptwCu8Zddh", 
  "object": "subscription", 
  "application_fee_percent": null, 
  "cancel_at_period_end": false, 
  "canceled_at": null, 
  "current_period_end": 1463848953, 
  "current_period_start": 1461256953, 
  "customer": "cus_8JNceg1cXYpZwJ", 
  "discount": null, 
  "ended_at": null,
  "metadata": { 
  }, 
  "plan": { 
    "id": "ern-monthly", 
    "object": "plan", 
    "amount": 2499, 
    "created": 1461244184, 
    "currency": "usd", 
    "interval": "month", 
    "interval_count": 1, 
    "livemode": false, 
    "metadata": { 
      "plan_id": "2" 
    }, 
    "name": "Monthly Subscription", 
    "statement_descriptor": null, 
    "trial_period_days": null 
  },
  "quantity": 1, 
  "start": 1461256953, 
  "status": "active", 
  "tax_percent": null, 
  "trial_end": null, 
  "trial_start": null 
}, 
{ 
  "id": "sub_8JNdYGbwDkccbh", 
  "object": "subscription",
  "application_fee_percent": null, 
  "cancel_at_period_end": false, 
  "canceled_at": null, 
  "current_period_end": 1463848903, 
  "current_period_start": 1461256903, 
  "customer": "cus_8JNceg1cXYpZwJ", 
  "discount": null, 
  "ended_at": null, 
  "metadata": { 
  }, 
  "plan": { 
    "id": "ern-monthly", 
    "object": "plan", 
    "amount": 2499, 
    "created": 1461244184, 
    "currency": "usd", 
    "interval": "month", 
    "interval_count": 1, 
    "livemode": false, 
    "metadata": { 
      "plan_id": "2" 
    }, 
    "name": "Monthly Subscription", 
    "statement_descriptor": null, 
    "trial_period_days": null 
  }, 
  "quantity": 1, 
  "start": 1461256903,
  "status": "active", 
  "tax_percent": null, 
  "trial_end": null, 
  "trial_start": null 
}, 
{ 
  "id": "sub_8JNcIPeX5FZHLi", 
  "object": "subscription", 
  "application_fee_percent": null, 
  "cancel_at_period_end": false, 
  "canceled_at": null, 
  "current_period_end": 1463848878, 
  "current_period_start": 1461256878, 
  "customer": "cus_8JNceg1cXYpZwJ", 
  "discount": null, 
  "ended_at": null, 
  "metadata": { 
  }, 
  "plan": { 
    "id": "ern-monthly", 
    "object": "plan", 
    "amount": 2499, 
    "created": 1461244184, 
    "currency": "usd", 
    "interval": "month", 
    "interval_count": 1, 
    "livemode": false, 
    "metadata": {
      "plan_id": "2" 
    }, 
    "name": "Monthly Subscription", 
    "statement_descriptor": null, 
    "trial_period_days": null 
  }, 
  "quantity": 1, 
  "start": 1461256878, 
  "status": "active", 
  "tax_percent": null, 
  "trial_end": null, 
  "trial_start": null 
} 
], 
"has_more": false, 
"total_count": 3, 
"url": "/v1/customers/cus_8JNceg1cXYpZwJ/subscriptions" } 
} 
```

### Delete a customer

Permanently deletes a customer. It cannot be undone. Also immediately cancels any active subscriptions on the customer.

To do so, add the following code to your program:

```json
Customer cu = Customer.retrieve({CUSTOMER_ID}); 
cu.delete(); 
```

The following is an example request: 

```json
Stripe.apiKey = "test_BQokikJOvBiI2HlWgH4olfQ2"; 

Customer cu = Customer.retrieve("cus_8JNmQG7nBfcoHK"); cu.delete(); 
```

#### Returns deletion

Returns an object with a deleted parameter on success. If the customer ID does not exist, this call raises an error.

Unlike other objects, deleted customers can still be retrieved through the API, in order to be able to track the history of customers while still removing their credit card details and preventing any further operations to be performed (such as adding a new subscription).

The following is an example response:

```json
com.stripe.model.Object JSON: { 
  "deleted": true, 
  "id": "cus_8JNshRXjBWnJdM" 
}
```

### List all customers

Returns a list of your customers. The customers are returned sorted by creation date, with the most recent customers appearing first.

To do so, add `Customer.all(Map<String, Object> options);` to your program.

The following are the _optional_ arguments in this feature.

| Argument         | Description |
|------------------|-------------|
| [`created`](#list-created) | A filter on the list based on the object `created` field. The value can be a string with an integer Unix timestamp, or it can be a dictionary with the other options. |
| `customer`       | Only return charges for the customer specified by this customer ID |
| `ending_before`  | A cursor for use in pagination. ending_before is an object ID that defines your place in the list. For instance, if you make a list request and receive 100 objects, starting with `obj_bar`, your subsequent call can include `ending_before=obj_bar` in order to fetch the previous page of the list. |
| `limit` | A limit on the number of objects to be returned. Limit can range between 1 and 100 items. Default is 10. |
| `starting_after` | A cursor for use in pagination. `starting_after` is an object ID that defines your place in the list. For example, if you make a list request and receive 100 objects, ending with `obj_foo`, your subsequent call can include `starting_after=obj_foo` to fetch the next page of the list. |

#### `list-created`

The following are the `list-created` object's _optional_ timestamp child arguments. 

| Argument | Description |
|----------|-------------| 
| `gt`     | (greater than) Return values where the `created` field is after this timestamp |
| `gte`    | (greater than or equal) Return values where the `created` field is after or equal to this timestamp |
| `lt`     | (less than) Return values where the `created` field is before this timestamp |
| `lte`    | (less than or equal) Return values where the `created` field is before or equal to this timestamp |

The following is an example request: 

```json
Stripe.apiKey = "test_BQokikJOvBiI2HlWgH4olfQ2"; 

Map<String, Object> customerParams = new HashMap<String, Object>(); 
customerParams.put("limit", 3); 

Customer.all(customerParams); 
```

#### Returns array of customers

A dictionary with a `data` property that contains an array of up to `limit` customers, starting after customer `starting_after`. Each entry in the array is a separate customer object. If no more customers are available, the resulting array will be empty. This request should never raise an error.

You can optionally request that the response include the total count of
all customers that match your filters. To do so, specify `include[]=total_count` in your request.

The following is an example response:

```json
#<com.stripe.model.CustomerCollection id=#> JSON: { 
  "data": [ 
    com.stripe.model.Customer JSON: { 
      "id": "cus_8JO0w4XG8QrzSx", 
      "object": "customer", 
      "account_balance": 0, 
      "business_vat_id": null, 
      "created": 1461258315, 
      "currency": "usd", 
      "default_source": "card_182lEt2eZvKYlo2CpBNb7MFy", "delinquent": false, 
      "description": null, 
      "discount": null, 
      "email": null, 
      "livemode": false, 
      "metadata": { 
      }, 
      "shipping": null, 
      "sources": { 
        "object": "list", 
        "data": [ 
          { 
            "id": "card_182lEt2eZvKYlo2CpBNb7MFy",
            "object": "card", 
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
            "customer": "cus_8JO0w4XG8QrzSx", 
            "cvc_check": "pass", 
            "dynamic_last4": null, 
            "exp_month": 7, 
            "exp_year": 2017, 
            "funding": "unknown", 
            "last4": "1111", 
            "metadata": { 
            }, 
            "name": null, 
            "tokenization_method": null 
          } 
        ], 
        "has_more": false, 
        "total_count": 1, 
        "url": "/v1/customers/cus_8JO0w4XG8QrzSx/sources" },
        "subscriptions": { 
        "object": "list", 
        "data": [ 
        ], 
        "has_more": false, 
        "total_count": 0, 
        "url": "/v1/customers/cus_8JO0w4XG8QrzSx/subscriptions" 
      } 
    }, 
    #<com.stripe.model.Customer[...] ...>, 
    #<com.stripe.model.Customer[...] ...> 
  ], 
  "has_more": false 
}
```

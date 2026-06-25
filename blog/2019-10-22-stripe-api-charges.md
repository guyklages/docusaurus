# Stripe charges API

## Introduction 

The Stripe charges API is organized around [REST](https://en.wikipedia.org/wiki/REST). It has predictable, resource-oriented URLs, and uses HTTP response codes to indicate API errors. It uses built-in HTTP features, like HTTP authentication and HTTP verbs, which are understood by off-the-shelf HTTP clients. It supports [cross-origin resource sharing](https://en.wikipedia.org/wiki/Cross-origin_resource_sharing), allowing you to interact securely with our API from a client-side web application (though you should never expose your secret API key in any public website’s client-side code). 

To make the API as explorable as possible, accounts have test mode and live mode API keys. There is no “switch” for changing between modes, just use the appropriate key to perform a live or test transaction. Requests made with test mode credentials never hit the banking networks and incur no cost. 

## Charges 

To charge a credit or a debit card, you create a charge object. You can retrieve and refund individual charges as well as list all charges. Charges are identified by a unique random ID. 

## The `charge` object 

The following table lists the attributes in the `charge` object.

| Attribute         | Type   | Definition |
|-------------------|--------|------------|
| `id`              | string | The unique ID. |
| `object`          | string | The value is `charge` |
| `amount`          | positive integer or zero | Amount charged in cents | 
| `amount_refunded` | positive integer or zero | Amount in cents refunded (can be less than the amount attributes on the charge if a partial refund was issued) |
| `application_fee` | string | The application fee (if any) for the charge |
| `balance_transaction` | string | ID of the balance transaction that describes the impact of this charge on your account balance (not including refunds or disputes) |
| `captured`        | boolean   | If the charge was created without capturing, this boolean represents whether or not it is still uncaptured or has since been captured |
| `created`         | timestamp | The date the charge was created |
| `currency`        | currency  | Three-letter ISO currency code representing the currency in which the charge was made |
| `customer`        | string    | ID of the customer this charge is for if one exists |
| `description`     | string    | Remarks about the charge |
| `destination`     | string    | The account (if any) the charge was made on behalf of |
| `disputes`        | hash      | Details about the dispute if the charge has been disputed |
| `failure_code`    | string    | Error code explaining reason for charge failure, if available |
| `failure_message` | string    | Message to user further explaining reason for charge failure, if available |
| `fraud_details`   | hash      | Hash with information on fraud assessments for the charge. Assessments reported by you have the key `user_report` and, if set, possible values of `safe` and `fraudulent`. Assessments from Stripe have the key `stripe_report` and, if set, the value `fraudulent`. | 
| `invoice`         | string    | ID of the invoice this charge is for, if one exists |
| `livemode`        | boolean   | Default is `false` | 
| `metadata`        | integer   | A set of key/value pairs that you can attach to a charge object. It can be useful for storing additional information about the charge in a structured format |
| `order`           | string    | ID of the order this charge is for, if one exists |
| `paid`            | boolean   | `true` if the charge succeeded, or was successfully authorized for later capture |
| `receipt_email`   | string    | The email address that the receipt for this charge was sent to |
| `receipt_number`  | string    | The transaction number that appears on email receipts sent for this charge |
| `refunded`        | boolean   | Whether or not the charge has been fully refunded. If the charge is only partially refunded, this attribute will still be `false`. | 
| [`refunds`](#refunds) | list  | A list of refunds that have been applied to the charge |
| [`shipping`](#shipping) | hash | Shipping information for the charge |
| `source`          | hash      | For most Stripe users, the source of every charge is a credit or debit card. This hash is then the card object describing that card. |
| `source_transfer` | string    | The transfer ID which created this charge. Only present if the charge came from another Stripe account. |
| `statement_descriptor` | string | Extra information about a charge. This will appear on your customer’s credit card statement. |
| `status`          | string    | The status of the payment is either `succeeded`, `pending`, or `failed`. |
| `transfer`        | string    | ID of the transfer to the `destination` account (only applicable if the charge was created using the `destination` parameter). |

### `refunds`

The following are the `refunds` object child attributes. 

| Attribute         | Type   | Definition |
|-------------------|--------|------------|
| `object`          | string | The value is `list` | 
| `data`            | string | |

### `shipping`

The following are the `shipping` object child attributes. 

| Attribute             | Type   | Definition |
|-----------------------|--------|------------|
| [`address`](#address) | hash   | Shipping information for the charge |

### `address`

The following are the `address` object child attributes.

| Attribute         | Type   | Definition |
|-------------------|--------|------------|
| `city`            | string | City / Suburb / Town / Village |
| `country`         | string | Two-letter country code |
| `line1`           | string | Address line 1 (Street address / PO Box / Company name) |
| `line2`           | string | Address line 2 (Apartment / Suite / Unit / Building)    |
| `postal_code`     | string | Zip / Postal Code |
| `state`           | string | State / Province / County | 


## Create a charge 

To charge a credit card, you create a charge object. If your API key is in test mode, the supplied payment source (e.g., card or Bitcoin receiver) won’t actually be charged, though everything else will occur as if in live mode. (Stripe assumes that the charge would have completed successfully). To do so, simply add `Charge.create();` to your program. 

The following are the arguments of this feature. 

| Argument   | Condition | Definition |
|------------|-----------|------------|
| `amount`   | Required  | A positive integer in the smallest currency unit (e.g 100 cents to charge $1.00, or 
1 to charge ¥1, a 0-decimal currency) representing how much to charge the card. The minimum amount is $0.50 (or 
equivalent in charge currency). |
| `currency` | Required  | Three-letter ISO code for currency. |
| `application_fee` | Connect only | A fee in cents that will be applied to the charge and transferred to the application owner’s Stripe account. To use an application fee, the request must be made on behalf of another account, using the Stripe-Account header, an OAuth key, or the `destination` parameter. 
| `capture`  | Optional | An arbitrary string which you can attach to a charge object. It is displayed when in the web interface alongside the charge. Note that if you use Stripe to send automatic email receipts to your customers, your receipt emails will include the `description` of the charge(s) that they are describing. Default is `true` | 
| `destination` | Connect Only | An account to make the charge on behalf of. If specified, the charge will be attributed to the destination account for tax reporting, and the funds from the charge will be transferred to the destination account. The ID of the resulting transfer will be returned in the transfer field of the response. |
| `metadata`    | Optional     | A set of key/value pairs that you can attach to a charge object. It can be useful for storing additional information about the customer in a structured format. It’s often a good idea to store an email address in metadata for tracking later. Default is `{}` |
| `receipt_email` | Optional | The email address to send this charge’s receipt to. The receipt will not be sent until the charge is paid. If this charge is for a customer, the email address specified here will override the customer’s email address. Receipts will not be sent for test mode charges. If `receipt_email` is specified for a charge in live mode, a receipt will be sent regardless of your email settings. Default is `None` |
| `shipping`      | Optional | Shipping information for the charge. Helps prevent fraud on charges for physical goods. Default is `{}` | 
| `customer`      | Either `customer` or `source` is required | The ID of an existing customer that will be charged in this request. |
| [`source`](#source) | Either `customer` or `source` is required | A payment source to be charged, such as a credit card. If you also pass a customer ID, the source must be the ID of a source belonging to the customer. Otherwise, if you do not pass a customer ID, the source you provide must either be a token, like the ones returned by Stripe.js, or a dictionary containing a user’s credit card details, with the options described below. Although not all information is required, the extra info helps prevent fraud. |
| `statement_descriptor` | Optional | An arbitrary string to be displayed on your customer’s credit card statement. This may be up to 22 characters. As an example, if your website is `RunClub` and the item you’re charging for is a race ticket, you may want to specify a `statement_descriptor` of `RunClub 5K race ticket`. The statement description may not include `<>"'` characters, and will appear on your customer’s statement in capital letters. Non-ASCII characters are automatically stripped. While most banks display this information consistently, some may display it incorrectly or not at all. Default is `None` |

### `source`

The following are the `source` object child attributes. 

| Attribute   | Condition | Definition |
|-------------|-----------|------------| 
| `exp_month` | Required  | Two-digit number representing the card’s expiration month |
| `exp_year`  | Required  | Two- or four-digit number representing the card’s expiration year |
| `number`    | Required  | The card number, as a string without any separators |
| `object`    | Required  | The type of payment source. Should be `card` |
| `cvc`       | Required  | Card security code. Required unless your account is registered in Australia, Canada, or the United States. Highly recommended to always include this value. |
| `address_city`   | Optional | |
| `address_country | Optional | |
| `address_line1`  | Optional | |
| `address_line2`  | Optional | |

The following is an example request: 

```json
Stripe.apiKey = "test_BQokikJOvBiI2HlWgH4olfQ2"; 

Map<String, Object> chargeParams = new HashMap<String, Object>(); 
chargeParams.put("amount", 400); 
chargeParams.put("currency", "usd"); 
chargeParams.put("source", "tok_182NNY2eZvKYlo2CRKti7ouM");   // obtained with Stripe.js 
chargeParams.put("description", "Charge for test@example.com");
Charge.create(chargeParams); 
```

The following table shows the verification responses for the CVC `source[cvc_check]`:

| Verification  | Meaning |
|---------------|---------|
| `pass`        | The CVC provided is correct.   |
| `fail`        | The CVC provided is incorrect. |
| `unavailable` | The customer’s bank did not check the CVC provided. |
| `unchecked`   | The CVC was provided but has not been checked. Checks are performed once a card is attached to a Customer object, or when a Charge is created. |

The following table shows the verification responses for the ADDRESS LINE `source[address_line1_check]`:

| Verification  | Meaning |
|---------------|---------|
| `pass`        | The first address line provided is correct.   |
| `fail`        | The first address line provided is incorrect. |
| `unavailable` | The customer’s bank did not check the first address line provided. |
| `unchecked`   | The first address line was provided but has not been checked. Checks are performed once a card is attached to a Customer object, or when a Charge is created. |


The following table shows the verification responses for the ADDRESS ZIP `source[address_zip_check]`:

| Verification  | Meaning |
|---------------|---------|
| `pass`        | The ZIP provided is correct.   |
| `fail`        | The ZIP provided is incorrect. |
| `unavailable` | The customer’s bank did not check the ZIP provided. |
| `unchecked`   | The ZIP was provided but has not been checked. Checks are performed once a card is attached to a Customer object, or when a Charge is created. |

## Returns

Returns a charge object if the charge succeeded. Raises an error if something goes wrong. A common source of error is an invalid or expired card, or a valid card with insufficient available balance. 

If the `cvc` parameter is provided, Stripe will attempt to check the CVC’s correctness, and the check’s result will be returned. Similarly, if `address_line1` or `address_zip` are provided, Stripe will try to check the validity of those parameters. Some banks do not support checking one or more of these parameters, in which case Stripe will return an ‘unavailable’ result. Also note that, depending on the bank, charges can succeed even when passed incorrect CVC and address information. 

The following is an example response: 

```json
com.stripe.model.Charge JSON: { 
  "id": "ch_182SZq2eZvKYlo2C1KFpXrGY", 
  "object": "charge", 
  "amount": 1000, 
  "amount_refunded": 0, 
  "application_fee": null, 
  "balance_transaction": "txn_17bBwe2eZvKYlo2Cuwcyi9or", "captured": true, 
  "created": 1461186578, 
  "currency": "usd", 
  "customer": "cus_8J4jsf6GGZJFeO", 
  "description": "Charge for VirtuMedix consultation for sj sdaj wkoqsdkasjkad", 
  "destination": null, 
  "dispute": null, 
  "failure_code": null,
  "failure_message": null, 
  "fraud_details": { 
  }, 
  "invoice": null, 
  "livemode": false, 
  "metadata": { 
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
    "url": "/v1/charges/ch_182SZq2eZvKYlo2C1KFpXrGY/refunds " 
  }, 
  "shipping": null, 
  "source": { 
    "id": "card_182SZp2eZvKYlo2CbbMHL18T", 
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
    "customer": "cus_8J4jsf6GGZJFeO", "cvc_check": "pass", 
    "dynamic_last4": null, 
    "exp_month": 12, 
    "exp_year": 2019, 
    "funding": "credit", 
    "last4": "4242", 
    "metadata": { 
    }, 
    "name": null, 
    "tokenization_method": null 
  }, 
  "source_transfer": null, 
  "statement_descriptor": null, "status": "succeeded" 
} 
```

## Retrieve a charge

Retrieves the details of a charge that has previously been created. Supply the unique charge ID that was returned from your previous request, and Stripe will return the corresponding charge information. The same information is returned when creating or refunding the charge. 

The following is an example request: 

```json
Stripe.apiKey = "test_BQokikJOvBiI2HlWgH4olfQ2"; 

Charge.retrieve("ch_182Shs2eZvKYlo2Ca1bLfus3"); 
```

## Returns 

Returns a charge if a valid identifier was provided, and throws an error otherwise. 

The following is an example response: 

```json
com.stripe.model.Charge JSON: { 
  "id": "ch_182SjH2eZvKYlo2CCh93kJaa", 
  "object": "charge", 
  "amount": 500, 
  "amount_refunded": 0, 
  "application_fee": null, 
  "balance_transaction": "txn_17bBwe2eZvKYlo2Cuwcyi9or", "captured": true,
  "created": 1461187163, 
  "currency": "usd", 
  "customer": "cus_8J4ttJ6RYZBpkt", 
  "description": "Charge for RelyMD consultation for Rakesh Mohan", 
  "destination": null, 
  "dispute": null, 
  "failure_code": null, 
  "failure_message": null, 
  "fraud_details": { 
  }, 
  "invoice": null, 
  "livemode": false, 
  "metadata": { 
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
    "url": "/v1/charges/ch_182SjH2eZvKYlo2CCh93kJaa/refunds" 
  }, 
  "shipping": null, 
  "source": { 
  "id": "card_182SjH2eZvKYlo2C8RjEPYVN", "object": "card", 
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
  "customer": "cus_8J4ttJ6RYZBpkt", "cvc_check": "pass", 
  "dynamic_last4": null, 
  "exp_month": 4, 
  "exp_year": 2016, 
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

## Update a charge 

Updates the specified charge by setting the values of the parameters passed. Any parameters not provided will be left unchanged. 

This request accepts only the `description`, `metadata`, `receipt_email`, `fraud_details`, and `shipping` as arguments. 

To do so, add:

```json
Charge ch = Charge.retrieve({CHARGE_ID}); 
Map<String, Object> updateParams = new HashMap<String, Obje ct>(); 
updateParams.put("description", {NEW_DESCRIPTION}); 
... 
ch.update(updateParams); 
```

The following are the _optional_ arguments of this feature. 

| Attribute      | Definition |
|----------------|------------|
| `description`  | An arbitrary string which you can attach to a charge object. It is displayed when in the web interface alongside the charge. Note that if you use Stripe to send automatic email receipts to your customers, your receipt emails will include the `description` of the charge(s) that they are describing. This will be unset if you POST an empty value.This can be unset by updating the value to `None` and then saving. Default is `None`. |
 `fraud_details` | A set of key/value pairs you can attach to a charge giving information about its riskiness. If you believe a charge is fraudulent, include a `user_report` key with a value of `fraudulent` . If you believe a charge is safe, include a `user_report` key with a value of `safe`. Note that you must refund a charge before setting the 
`user_report` to `fraudulent`. Stripe will use the information you send to improve our fraud detection algorithms.
 Default is `{}` |
| `metadata`     | A set of key/value pairs that you can attach to a charge object. It can be useful for storing additional information about the charge in a structured format. You can unset individual keys if you POST an empty value for that key. You can clear all keys if you POST an empty value for metadata.You can unset an individual key by setting its value to `None` and then saving. To clear all keys, set metadata to `None`, then save. Default is `{}` |
| `receipt_email` | This is the email address that the receipt for this charge will be sent to. If this field is updated, then a new email receipt will be sent to the updated address. Default is `None` |
| `shipping`      | Shipping information for the charge. Helps prevent fraud on charges for physical goods.  Default is `{}` |


## Returns

Returns the charge object if the update succeeded. This call will raise an error if update parameters are invalid. 

The following is an example response:

```json
com.stripe.model.Charge JSON: { 
  "id": "ch_182TAE2eZvKYlo2C0PxBlCrq", 
  "object": "charge", 
  "amount": 2000, 
  "amount_refunded": 0, 
  "application_fee": null, 
  "balance_transaction": "txn_17bBwe2eZvKYlo2Cuwcyi9or", "captured": true, 
  "created": 1461188834, 
  "currency": "usd", 
  "customer": "cus_8J5KKY7sEj2IOp", 
  "description": "Charge for test@example.com", "destination": null, 
  "dispute": null, 
  "failure_code": null, 
  "failure_message": null, 
  "fraud_details": { 
  }, 
  "invoice": null, 
  "livemode": false, 
  "metadata": { 
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
    "url": "/v1/charges/ch_182TAE2eZvKYlo2C0PxBlCrq/refunds " 
  }, 
  "shipping": null, 
  "source": { 
  "id": "card_182T9H2eZvKYlo2CYVWu5ZHC", 
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
  "customer": "cus_8J5KKY7sEj2IOp", 
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
  }, 
  "source_transfer": null, 
  "statement_descriptor": null, 
  "status": "succeeded" 
} 
```

## Capture a charge 

Capture the payment of an existing, uncaptured, charge. This is the second half of the two-step payment flow, where first you created a charge with the capture option set to `false`. 

Uncaptured payments expire exactly seven days after they are created. If they are not captured by that point in time, they will be marked as refunded and will no longer be capturable. 

To do so, add: 

```json
ch = Charge.retrieve({CHARGE_ID}); 
ch.capture();
```

The following are the arguments in this feature. 

| Argument          | Condition | Definition |
|-------------------|-----------|------------| 
| `charge`          | Required  |            |
| `amount`          | Optional  | The amount to capture, which must be less than or equal to the original 
amount. Any additional amount will be automatically refunded. |
| `application_fee` | Optional  | An application fee to add on to this charge. Can only be used with Stripe Connect. |
| `receipt_email`   | Optional  | The email address to send this charge’s receipt to. This will override the previously-specified email address for this charge, if one was set. Receipts will not be sent in test mode. |
| `statement_descriptor Optional. | An arbitrary string to be displayed on your customer’s credit card  
statement. This may be up to 22 characters. As an example, if your website is `RunClub` and the item you’re charging for is a race ticket, you may want to specify a `statement_descriptor` of `RunClub 5K race ticket`. The statement description may not include `<>"'` characters, and will appear on your customer’s statement in capital letters. Non-ASCII characters are automatically stripped. Updating this value will overwrite the previous statement descriptor of this charge. While most banks display this information consistently, some may display it incorrectly or not at all. |

The following is an example request: 

```json
Stripe.apiKey = "test_BQokikJOvBiI2HlWgH4olfQ2";
ch = Charge.retrieve("ch_182TFv2eZvKYlo2Cjxtxxns4"); 
ch.capture(); 
```

## Returns

Returns the charge object, with an updated captured property (set to `true`). Capturing a charge will always succeed, unless the charge is already refunded, expired, captured, or an invalid capture amount is specified, in which case this method will throw an error. 

The following is an example response:

```json
  com.stripe.model.Charge JSON: { 
  "id": "ch_182TIR2eZvKYlo2CBtOAzEA8", 
  "object": "charge", 
  "amount": 4900, 
  "amount_refunded": 0, 
  "application_fee": null, 
  "balance_transaction": "txn_17bBwe2eZvKYlo2Cuwcyi9or", "captured": "true", 
  "created": 1461189343, 
  "currency": "usd", 
  "customer": "cus_8J5TWtg78fnA6G", 
  "description": "Charge for RelyMD consultation for 232311 23 21231231", 
  "destination": null, 
  "dispute": null,
  "failure_code": null, 
  "failure_message": null, 
  "fraud_details": { 
  }, 
  "invoice": null, 
  "livemode": false, 
  "metadata": { 
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
    "url": "/v1/charges/ch_182TIR2eZvKYlo2CBtOAzEA8/refunds " 
  }, 
  "shipping": null, 
  "source": { 
    "id": "card_182TIQ2eZvKYlo2CQLZRW7uf", 
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
    "customer": "cus_8J5TWtg78fnA6G", "cvc_check": "pass", 
    "dynamic_last4": null, 
    "exp_month": 12, 
    "exp_year": 2018, 
    "funding": "credit", 
    "last4": "4242", 
    "metadata": { 
    }, 
    "name": null, 
    "tokenization_method": null 
  }, 
  "source_transfer": null, 
  "statement_descriptor": null, "status": "succeeded" 
}
```

## List all charges

Returns a list of charges you’ve previously created. The charges are returned in sorted order, with the most recent charges appearing first.

The following are the _optional_ arguments in this feature.

| Argument | Definition |
|----------|------------|
A filter on the list based on the 
object created field. The value 

created(*) 
Optional dictionary 
can be a string with an integer Unix timestamp, or it can be a dictionary with the other options. 
Only return charges for the 

customer Optional ending_before Optional 
customer specified by this customer ID. 
A cursor for use in pagination. ending_before is an object ID that defines your place in the list. For instance, if you make a list request and receive 100 objects, starting with obj_bar , your subsequent call can include 
ending_before=obj_bar in order to fetch the previous page

of the list. 
limit 
Optional. 

source(**) 
Default is 10 
Optional 
dictionary. 
Default is 
{object:”all”}. 
A filter on the list based on the source of the charge. The value can be a dictionary with the other options. 
A cursor for use in pagination. starting_after is an object ID that defines your place in the list. For instance, if you make a list request and receive 100 

starting_after Optional 
objects, ending with obj_foo , your subsequent call can include 
starting_after=obj_foo in order to fetch the next page of the list. 

Note: (*) Following are its optional child arguments. 
Argument Type Definition 
gt timestampReturn values where the created field is after this timestamp.
gte timestampReturn values where the created field is after or equal to this timestamp. 
It timestampReturn values where the created field is before this timestamp. 
Ite timestampReturn values where the created field is before or equal to this timestamp. 
(**) Following is its optional child argument. 
Argument Definition 
Return charges that match this source type string. 

object 
Returns 
Available options are all , alipay_account , bitcoin_receiver , or card . 

A dictionary with a data property that contains an array of up to limit charges, starting after charge starting_after . Each entry in the array is a separate charge object. If no more charges are available, the resulting array will be empty. If you provide a non-existent customer ID, this call raises an error. 
You can optionally request that the response include the total count of all charges that match your filters. To do so, specify 
include[]=total_count in your request.
Following is an example response: 
#<com.stripe.model.ChargeCollection id=#> JSON: { "data": [ 
com.stripe.model.Charge JSON: { 
"id": "ch_182TXr2eZvKYlo2CL7W1pRX8", 
"object": "charge", 
"amount": 4900, 
"amount_refunded": 0, 
"application_fee": null, 
"balance_transaction": "txn_17bBwe2eZvKYlo2Cuwcyi9or" , 
"captured": true, 
"created": 1461190299, 
"currency": "usd", 
"customer": "cus_8J5jPkKzifsycT", 
"description": "Premiere", 
"destination": null, 
"dispute": null, 
"failure_code": null, 
"failure_message": null, 
"fraud_details": { 
}, 
"invoice": null, 
"livemode": false, 
"metadata": { 
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
"url": "/v1/charges/ch_182TXr2eZvKYlo2CL7W1pRX8/ref unds" 
}, 
"shipping": null, 
"source": { 
"id": "card_182TXm2eZvKYlo2Cgun0fmfC", 
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
"customer": "cus_8J5jPkKzifsycT", "cvc_check": "pass", 
"dynamic_last4": null, 
"exp_month": 12, 
"exp_year": 2034, 
"funding": "credit", 
"last4": "4242", 
"metadata": { 
}, 
"name": "sergio@willing.com", 
"tokenization_method": null 
}, 
"source_transfer": null, 
"statement_descriptor": null, 
"status": "succeeded" 
}, 
#<com.stripe.model.Charge[...] ...>, #<com.stripe.model.Charge[...] ...> ], 
"has_more": false 
}

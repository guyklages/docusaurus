import { DefinitionProvider, DefTerm, DefinitionPanel } from '@site/src/components/DefTerm';

# Portfolio

## Live company websites

I created and fully owned the following company websites. I used Git, Markdown, Oxygen, Postman, ReadMe, and VS Code to create documentation for developers, DBAs, and technical PMs. Links open into a new browser tab.

<DefinitionProvider>

| Company      | Developer guides | API reference | Collaborated with | Highlight |
|--------------|------------------|---------------|:-----------------:|-----------|
| <DefTerm def="FIS (Fidelity) bought fintech startup Atelio and later dissolved it to return to traditional banking.">Atelio&nbsp;of&nbsp;FIS</DefTerm> | **[Quickstart](https://guyklages.com/atelio/getting-started/quickstart)** | _Site removed._ <br/> **[Similar&nbsp;to&nbsp;Nium's](https://docs.nium.com/api#description/introduction)** | 1 editor, 5 SMEs | [Revamped and reduced the developer pages by 36%](./most-impactful-tech-writing.md#36-page-reduction-from-new-ia) |
| <DefTerm def="Nium is a fintech company that was a struggling startup while I worked there.">Nium</DefTerm>         | **[Getting Started](https://docs.nium.com/docs/getting-started)** | **[Introduction](https://docs.nium.com/api#description/introduction)** | 1 editor, 6 SMEs | [Doubled onboarding of clients with 75% fewer issues](./most-impactful-tech-writing.md#2x-onboarding-75-fewer-issues) |
| <DefTerm def="Couchbase is a NoSQL database company that was a struggling startup while I worked there.">Couchbase</DefTerm>    | **[SQL++&nbsp;Reference](https://docs.couchbase.com/server/current/n1ql/n1ql-language-reference/index.html)** |  | 1 editor, 9 SMEs | [Reduced their writing process by 80%](./most-impactful-tech-writing.md#80-time-saved-on-writing-process) |

<DefinitionPanel/>

</DefinitionProvider>


## My most technical projects

| Developer problem | How I solved it | Company |
|-------------------|-----------------|---------|
| Developers had a hodge-podge of `skill.md`, `instruction.md`, and `.yaml` files that needed structure for their internal agent-driven workflows, server architecture, and usability. | I created a framework of governance and guardrails with templates in Markdown and YAML files to help developers build Copilot Agents that adhere to company rules and standards. | Microsoft |
| Developers created an AI/ML/LLM system to populate the Netflix home screen of titles and needed to share this technology with other Netflix departments but weren't able to install or configure it outside their group. | I tested and created internal documentation for the complex installation and configuration of their tool that populates the Netflix Home screen of titles so other departments can use it as well. | Netflix |
| Developers of Nium's customers weren't able to onboard Nium's products due to the complexity of different steps for different company types in different countries. | I made a step-by-step unified onboarding process that immediately [doubled the number of customers onboarded while reducing helpdesk tickets by 75%](./most-impactful-tech-writing.md#2x-onboarding-75-fewer-issues). | Nium |
| Developers were building internal AI/ML/LLM tools but had difficulty since Apache's documentation didn't cover all of their use cases or needs. | I filled in their documentation gaps and greatly enhanced their internal documentation with more explanations and examples for engineers to use the Apache ecosystem tools for their Big Data and IoT projects. An engineer called my docs "more thorough than Apache's documentation site." | Yahoo |


## 3 Stripe APIs

_(I wrote this for a job interview)_

The Stripe APIs are organized around [REST](https://en.wikipedia.org/wiki/REST). They have predictable, resource-oriented URLs, and use HTTP response codes to indicate API errors. They use built-in HTTP features, like HTTP authentication and HTTP verbs, which off-the-shelf HTTP clients understand. They support [cross-origin resource sharing](https://en.wikipedia.org/wiki/Cross-origin_resource_sharing), allowing you to interact securely with our API from a client-side web application (though you should never expose your secret API key in any public website’s client-side code).

To make the API as explorable as possible, accounts have test mode and live mode API keys. Since nothing switches between modes, use the appropriate key to perform a live or test transaction. Requests made with test mode credentials never hit the banking networks and incur no cost.

##  &nbsp; 

### Customers API

Customer objects allow you to perform recurring charges and track multiple charges from the same customer. The API allows you to create, delete, and update your customers. You can retrieve individual customers as well as list of all your customers.

#### The `customer` object 

The following are the attributes in this feature.

| Attribute         | Type      | Description             |
|-------------------|-----------|-------------------------|
| `id`              | string    | The unique record ID    |
| `object`          | string    | The value is `customer` | 
| `account_balance` | integer   | Current balance, if any, is stored in the customer’s account. If negative, the customer has credit to apply to the next invoice. If positive, the customer has an amount owed that will be added to the next invoice. The balance does not refer to any unpaid invoices; it solely takes into account amounts that have yet to be successfully applied to any invoice. This balance is only taken into account for recurring billing purposes (that is, subscriptions, invoices, invoice items). |
| `business_vat_id` | string    | The customer’s VAT identification number |
| `created`         | timestamp | The record creation date and time |
| `currency`        | string    | The currency used for charging the customer recurring bills. |
| `default_source`  | string    | ID of the default source attached to this customer |
| `delinquent`      | boolean   | The value is `true` if the customer's latest invoice charge failed. |
| `description`     | string    | Remarks about the record |
| `discount`        | hash      | Describes the current discount active on the customer, if there is one. |
| `email`           | string    |  |
| `livemode`        | boolean   | The value is `true` if `livemode` is on. | 
| `metadata`        | string    | A set of key/value pairs that you can attach to a customer object. It can be useful for storing additional information about the customer in a structured format. |
| [`shipping`](#customer-shipping) | hash | Shipping information associated with the customer |
| [`sources`](#customer-sources)   | list | The customer’s payment sources, if any |
| [`subscriptions`](#customer-subscriptions) | list | The customer’s payment subscriptions, if any |

##### `customer-shipping`

The following is the `customer-shipping` object's child attribute. 

| Attribute             | Type  | Description               |
|-----------------------|-------|---------------------------|
| [`address`](#customer-shipping-address) | hash  | Customer shipping address |

##### `customer-shipping-address`

The following are the `customer-shipping-address` object's attributes.

| Attribute     | Type      | Description             |
|---------------|-----------|-------------------------|
| `city`        | string    | The shipping address' city / suburb / town / village |
| `country`     | string    | Two-letter country code of the shipping address      |
| `line1`       | string    | The shipping address' street / PO Box / company name |
| `line2`       | string    | The shipping address' apartment / suite / unit / building | 
| `postal_code` | string    | The shipping address' zip / postal code | 
| `state`       | string    | The shipping address' state / province / county |

##### `customer-sources`

The following are the `customer-sources` object's child attributes. 

| Attribute     | Type      | Description             |
|---------------|-----------|-------------------------|
| `object`      | string    | Value is `list`         |
| `data`        | array     | The list contains all customer payment sources. These may be Cards or BitcoinReceivers. |
| `has_more`    | boolean   | The value is `true` if there are more records. |
| `total_count` | positive integer or zero | The total number of items available. This value is not included by default, but you can request it by specifying `?include[]=total_count`. |
| `url`         | string    | The URL where you can access this list. |

##### `customer-subscriptions`

The following are the `customer-subscriptions` object's child attributes. 

| Attribute     | Type      | Description             |
|---------------|-----------|-------------------------|
| `object`      | string    | The value is `list`.         |
| `data`        | array     | The list contains all customer payment sources. These may be Cards or BitcoinReceivers. |
| `has_more`    | boolean   | The value is `true` if there are more records. |
| `total_count` | positive integer or zero | The total number of items available. This value is not included by default, but you can request it by specifying `?include[]=total_count`. |
| `url`         | string    | The URL where you can access this list. |

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

#### Create a customer

Creates a new customer object. To do so, add `Customer.create();` to your program.

The following are the _optional_ arguments in this feature. 

| Argument          | Description |
|-------------------|-------------|
| `account_balance` | An integer amount in cents that is your customer's starting account balance. A negative amount represents a credit that will be used before attempting any charges to the customer’s card; a positive amount will be added to the next invoice. |
| `business_vat_id` | The customer’s VAT identification number |
| `coupon` | If you provide a coupon code, the customer will have a discount applied on all recurring charges. Charges you create through the API will not have the discount. |
| `description` | An arbitrary string that you can attach to a customer object. The dashboard displays it alongside the customer. This will be unset if you POST an empty value. You can unset this by updating the value to `Null` and then saving. |
| `email` | Customer’s email address. It’s displayed alongside the customer in your dashboard and can be useful for searching and tracking. This will be unset if you POST an empty value. This can be unset by updating the value to `Null` and then saving. |
| `metadata` | A set of key/value pairs that you can attach to a customer object. It can be useful for storing additional information about the customer in a structured format. This will be unset if you POST an empty value. This can be unset by updating the value to `Null` and then saving. 
| `plan` | The identifier of the plan to subscribe the customer to. If provided, the returned customer object will have a list of subscriptions that the customer is currently subscribed to. If you subscribe a customer to a plan without a free trial, the customer must have a valid card as well. |
| `quantity` | The quantity you’d like to apply to the subscription you’re creating (if you pass in a `plan`). For example, if your plan is 10 cents/user/month, and your customer has 5 users, you could pass 5 as the quantity to have the customer charged 50 cents (5 x 10 cents) monthly. Defaults to `1` if not set. Only applies when the `plan` parameter is also provided. |
| [`shipping`](#shipping) | The shipping address | 
| [`source`](#source) | The source can either be a token, like the ones returned by our Stripe.js, or a dictionary containing a user’s credit card details. |
| `tax_percent` | A positive decimal (with at most two decimal places) between 1 and 100. This represents the percentage of the subscription invoice subtotal that will be calculated and added as tax to the final amount each billing period. For example, a plan which charges $10/month with a `tax_percent` of 20.0 will charge $12 per invoice. You can use this only if you provide a plan. |
| `trial_end` | Unix timestamp representing the end of the trial period before the customer is charged. If set, `trial_end` will override the default trial period of the customer's subscribed plan. This field applies only when the `plan` parameter is also provided. |

##### `create-shipping`

The following are the `shipping` object's child arguments. 

| Argument  | Condition | Description |
|-----------|-----------|-------------|
| [`address`](#shipping-address) | Required  | The full shipping address |
| `name`    | Required  | The name of the shipping contact |
| `phone`   | Optional  | The phone number of the shipping contact |

##### `create-shipping-address`

The following are the `create-shipping-address` object's child arguments.

| Argument      | Condition | Description |
|---------------|-----------|-------------|
| `line1`       | Required  | The shipping address' street |
| `line2`       | Optional  | The shipping address' building / company name / etc. |
| `city`        | Optional  | The shipping address' city |
| `country`     | Optional  | The shipping address' country |
| `postal_code` | Optional  | The shipping address' zip / postal code |
| `state`       | Optional  | The shipping address' state / territory / province |

##### `create-source`

The following are the `create-source` object's child arguments. 

| Argument    | Condition | Description |
|-------------|-----------|-------------|
| `object`    | Required  | The payment source type, such as `card` |
| `exp_month` | Required  | Two-digit number representing the card’s expiration month |
| `exp_year`  | Required  | Two- or four-digit number representing the card’s expiration year |
| `number`    | Required  | The card number, as a string without any separators |
| `address_city`    | Optional | The source's city |
| `address_country` | Optional | The source's country |
| `address_line1`   | Optional | The source's street / apartment |
| `address_line2`   | Optional | The source's building / company name |
| `address_state`   | Optional | The source's state |
| `address_zip`     | Optional | The source's zip / postal code |
| `currency`        | Managed Accounts Only | Required when adding a card to an account (not applicable to a customers or recipients). You can use a debit card as a transfer destination for funds in this currency. The only supported currency for debit card transfers is `usd`. | 
| `cvc`   | Required | Card security code. Banks require a `cvc` unless you registered your account in Australia, Canada, or the United States. We highly recommend to always include this value. |
| `default_for_currency` | Managed Accounts Only | Only applicable to accounts, not customers or recipients. If you set this to `true` (or if this is the first external account added in this currency), this card becomes the default external account for its currency. |
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

##### Returns customer

Returns a customer object if the call succeeded. The returned object has information about subscriptions, discount, and payment sources, if provided. If an invoice payment is due without a source, the call raises an error. If a non-existent or expired plan or coupon is provided, the call raises an error.

If the customer has a source, the returned customer object will have a `default_source` attribute, which is an ID that can be expanded into the full source details when retrieving the customer.

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

#### Retrieve a customer

Retrieves the details of an existing customer. You need only supply the unique customer identifier that was returned upon customer creation.

The following is an example request:

```
Stripe.apiKey = "test_BQokikJOvBiI2HlWgH4olfQ2"; 

Customer.retrieve("cus_8JNO6XkCpsjc7s"); 
```

##### Returns customer

Returns a customer object if a valid identifier was provided. When requesting the ID of a deleted customer, a subset of the customer’s information will be returned, including a `deleted` property of `true`.

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

#### Update a customer

Updates the specified customer by setting the values of the parameters passed. Any parameters not provided remain unchanged. For example, if you pass the source parameter, that becomes the customer’s active source (for example, a card) for all charges in the future.

When you update a customer to a new valid source: for each of the customer’s current subscriptions, if the subscription is in the `past_due` state, then the latest unpaid, unclosed invoice for the subscription will be retried.

**Note**: This retry will not count as an automatic retry, and will not affect the next regularly scheduled payment for the invoice.

**Note**: No invoices pertaining to subscriptions in the unpaid state, or invoices pertaining to canceled subscriptions, will be retried as a result of updating the customer’s source.

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
| `description`     | An arbitrary string that you can attach to a customer object. The dashboard displays it alongside the customer. This will be unset if you POST an empty value. You can unset this by updating the value to `Null` and then saving. |
| `email`           | Customer’s email address. It’s displayed alongside the customer in your dashboard and can be useful for searching and tracking. This will be unset if you POST an empty value. This can be unset by updating the value to `Null` and then saving. |
 `metadata`         | A set of key/value pairs that you can attach to a customer object. It can be useful for storing additional information about the customer in a structured format. This will be unset if you POST an empty value. You can unset this by updating the value to `Null` and then saving. |
| [`shipping`](#update-shipping) | 
| [`source`](#update-source) | The source can either be a token, like the ones returned by our Stripe.js, or a dictionary containing a user’s credit card details (with the options shown below). Passing source will create a new source object, make it the new customer default source, and delete the old customer default if one exists. If you want to add additional sources instead of replacing the existing default, use the card creation API. Whenever you attach a card to a customer, Stripe will automatically validate the card. |

##### `update-shipping`

The following are the `update-shipping` child arguments. 

| Argument  | Condition | Description |
|-----------|-----------|-------------|
| [`address`](#update-shipping-address) | Required  | The full shipping address |
| `name`    | Required  | The shipping contact name |
| `phone`   | Optional  | The shipping contact phone number |

##### `update-shipping-address`

The following are the `update-shipping-address` object's child arguments.

| Argument      | Condition | Description |
|---------------|-----------|-------------|
| `line1`       | Required  | The update shipping address' street |
| `city`        | Optional  | The update shipping address' city |
| `country`     | Optional  | The update shipping address' country |
| `line2`       | Optional  | The update shipping address' building / company name / block |
| `postal_code` | Optional  | The update shipping address' zip / postal code |
| `state`       | Optional  | The update shipping address' state |

##### `update-source`

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
| `currency`        | Managed Accounts Only | Required when adding a card to an account (not applicable to a customers or recipients). You can use the debit card as a transfer destination for funds in this currency. The only supported currency for debit card transfers is `usd`. |
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

##### Returns update

Returns the customer object if the update succeeded. Throws an error if update parameters are invalid (for example, specifying an invalid coupon or an invalid source).

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

#### Delete a customer

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

##### Returns deletion

Returns an object with a deleted parameter on success. If the customer ID does not exist, this call raises an error.

Unlike other objects, you can still retrieve deleted customers through the API to be able to track the history of customers while still removing their credit card details and preventing any further operations to be performed (such as adding a new subscription).

The following is an example response:

```json
com.stripe.model.Object JSON: { 
  "deleted": true, 
  "id": "cus_8JNshRXjBWnJdM" 
}
```

#### List all customers

Returns a list of your customers. The customers are returned sorted by creation date, with the most recent customers appearing first.

To do so, add `Customer.all(Map<String, Object> options);` to your program.

The following are the _optional_ arguments in this feature.

| Argument         | Description |
|------------------|-------------|
| [`created`](#list-created) | A filter on the list based on the object `created` field. The value can be a string with an integer Unix timestamp, or it can be a dictionary with the other options. |
| `customer`       | Only return charges for the customer specified by this customer ID |
| `ending_before`  | A cursor for use in pagination. ending_before is an object ID that defines your place in the list. For instance, if you make a list request and receive 100 objects, starting with `obj_bar`, your subsequent call can include `ending_before=obj_bar` to fetch the previous page of the list. |
| `limit` | A limit on the number of returned objects. Limit can range between 1 and 100 items. Default is 10. |
| `starting_after` | A cursor for use in pagination. `starting_after` is an object ID that defines your place in the list. For example, if you make a list request and receive 100 objects, ending with `obj_foo`, your subsequent call can include `starting_after=obj_foo` to fetch the next page of the list. |

##### `list-created`

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

##### Returns array of customers

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

###  &nbsp; 

### Charge API

To charge a credit or a debit card, you create a charge object. You can retrieve and refund individual charges as well as list all charges. You can identify charges by their unique, random ID.

#### The `charge` object 

The following table lists the attributes in the `charge` object.

| Attribute         | Type   | Definition |
|-------------------|--------|------------|
| `id`              | string | The unique ID |
| `object`          | string | The value is `charge` |
| `amount`          | positive integer or zero | Amount charged in cents | 
| `amount_refunded` | positive integer or zero | Amount in cents refunded (can be less than the amount attributes on the charge if a partial refund was issued) |
| `application_fee` | string | The application fee (if any) for the charge |
| `balance_transaction` | string | ID of the balance transaction that describes the impact of this charge on your account balance (not including refunds or disputes) |
| `captured`        | boolean   | This value is `true` if the charge was created without capturing |
| `created`         | timestamp | The charge's creation date |
| `currency`        | currency  | Three-letter ISO currency code of the charge |
| `customer`        | string    | ID of the customer this charge is for if one exists |
| `description`     | string    | Remarks about the charge |
| `destination`     | string    | The account (if any) the charge was made on behalf of |
| `disputes`        | hash      | Details about the dispute, if applicable |
| `failure_code`    | string    | Error code explaining reason for charge failure, if available |
| `failure_message` | string    | Message to user further explaining reason for charge failure, if available |
| `fraud_details`   | hash      | Hash with information on fraud assessments for the charge. Assessments reported by you have the key `user_report` with the valid values of `safe` and `fraudulent`. Assessments from Stripe have the key `stripe_report` with the valid value of `fraudulent`. |
| `invoice`         | string    | ID of the charge's invoice, if one exists |
| `livemode`        | boolean   | Default is `false` |
| `metadata`        | integer   | A set of key/value pairs that you can attach to a charge object for storing additional information about the charge in a structured format |
| `order`           | string    | ID of the charge's order, if one exists |
| `paid`            | boolean   | `true` if the charge succeeded, or was successfully authorized for later capture |
| `receipt_email`   | string    | The email address that receives this charge's receipt |
| `receipt_number`  | string    | The transaction number that appears on email receipts sent for this charge |
| `refunded`        | boolean   | `true` if the charge was fully refunded; `false` if the charge was partially or not refunded | 
| [`refunds`](#refunds) | list  | A list of charge refunds |
| [`shipping`](#shipping) | hash | Shipping information for the charge |
| `source`          | hash      | For most Stripe users, the source of every charge is a credit or debit card. This hash is then the card object describing that card. |
| `source_transfer` | string    | The transfer ID which created this charge. Only present if the charge came from another Stripe account. |
| `statement_descriptor` | string | Extra information about a charge. This will appear on your customer’s credit card statement. |
| `status`          | string    | The status of the payment. One of the valid values: `succeeded`, `pending`, or `failed` |
| `transfer`        | string    | ID of the transfer to the `destination` account (only applicable if you used the `destination` parameter to create the charge) |

##### `refunds`

The following are the `refunds` object child attributes. 

| Attribute         | Type   | Definition |
|-------------------|--------|------------|
| `object`          | string | The value is `list` | 
| `data`            | string | |

##### `shipping`

The following are the `shipping` object child attributes. 

| Attribute             | Type   | Definition |
|-----------------------|--------|------------|
| [`address`](#address) | hash   | Shipping information for the charge |

##### `address`

The following are the `address` object child attributes.

| Attribute         | Type   | Definition |
|-------------------|--------|------------|
| `city`            | string | City / Suburb / Town / Village |
| `country`         | string | Two-letter country code |
| `line1`           | string | Address line 1 (Street address / PO Box / Company name) |
| `line2`           | string | Address line 2 (Apartment / Suite / Unit / Building)    |
| `postal_code`     | string | Zip / Postal Code |
| `state`           | string | State / Province / County | 


#### Create a charge 

To charge a credit card, you create a charge object. If your API key is in test mode, the system won't charge your supplied payment source (for example, card or Bitcoin receiver), though everything else will occur as if in live mode. Stripe assumes that the charge would have completed successfully. To do so, simply add `Charge.create();` to your program.

The following are the arguments of this feature.

| Argument   | Condition | Definition |
|------------|-----------|------------|
| `amount`   | Required  | A positive integer in the smallest currency unit (e.g 100 cents to charge $1.00, or 1 to charge ¥1, a 0-decimal currency) representing how much to charge the card. The minimum amount is $0.50 (or equivalent in charge currency). |
| `currency` | Required  | Three-letter ISO code for currency. |
| `application_fee` | Connect only | A fee in cents that is applied to the charge and transferred to the application owner’s Stripe account. To use an application fee, another account must make the request on behalf, using the Stripe-Account header, an OAuth key, or the `destination` parameter. 
| `capture`  | Optional | An arbitrary string which you can attach to a charge object. The web interface displays it alongside the charge. <br/> **Note**: If you use Stripe to send automatic email receipts to your customers, your receipt emails include the `description` text of those charges. Default is `true` | 
| `destination` | Connect Only | An account to make the charge on behalf of. If specified, the charge is attributed to the destination account for tax reporting, and the funds from the charge are transferred to the destination account. The ID of the resulting transfer will be returned in the transfer field of the response. |
| `metadata`    | Optional     | A set of key/value pairs that you can attach to a charge object. It can be useful for storing additional information about the customer in a structured format. It’s often a good idea to store an email address in metadata for tracking later. Default is `{}` |
| `receipt_email` | Optional | The email address to send this charge’s receipt to. The receipt will not be sent until the charge is paid. If this charge is for a customer, the email address specified here will override the customer’s email address. Receipts will not be sent for test mode charges. If `receipt_email` is specified for a charge in live mode, a receipt will be sent regardless of your email settings. Default is `None` |
| `shipping`      | Optional | Shipping information for the charge. Helps prevent fraud on charges for physical goods. Default is `{}` | 
| `customer`      | Either `customer` or `source` is required | The ID of an existing customer that will be charged in this request. |
| [`source`](#create-source) | Either `customer` or `source` is required | A payment source to be charged, such as a credit card. If you also pass a customer ID, the source must be the ID of a source belonging to the customer. Otherwise, if you do not pass a customer ID, the source you provide must either be a token, like the ones returned by Stripe.js, or a dictionary containing a user’s credit card details, with the options described below. Although not all information is required, the extra info helps prevent fraud. |
| `statement_descriptor` | Optional | An arbitrary string to be displayed on your customer’s credit card statement. This may be up to 22 characters. As an example, if your website is `RunClub` and the item you’re charging for is a race ticket, you may want to specify a `statement_descriptor` of `RunClub 5K race ticket`. The statement description may not include `<>"'` characters, and will appear on your customer’s statement in capital letters. Non-ASCII characters are automatically stripped. While most banks display this information consistently, some may display it incorrectly or not at all. Default is `None` |

##### `create-source`

The following are the `create-source` object child attributes. 

| Attribute   | Condition | Definition |
|-------------|-----------|------------| 
| `exp_month` | Required  | Two-digit number representing the card’s expiration month |
| `exp_year`  | Required  | Two- or four-digit number representing the card’s expiration year |
| `number`    | Required  | The card number, as a string without any separators |
| `object`    | Required  | The payment source. Should be `card` |
| `cvc`       | Required  | Card security code. Required unless you registered your account in Australia, Canada, or the United States. Highly recommended to always include this value. |
| `address_city`    | Optional | The create source address' city |
| `address_country` | Optional | The create source address' country |
| `address_line1`   | Optional | The create source address' street |
| `address_line2`   | Optional | The create source address' suite / apartment / company name |

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
| `pass`        | The provided CVC is correct.   |
| `fail`        | The provided CVC is incorrect. |
| `unavailable` | The customer’s bank did not check the CVC provided. |
| `unchecked`   | The provided CVC was not checked. Checks are performed once a card is attached to a Customer object, or when a Charge is created. |

The following table shows the verification responses for the _Address line_ `source[address_line1_check]`:

| Verification  | Meaning |
|---------------|---------|
| `pass`        | The provided first address line is correct.   |
| `fail`        | The provided first address line is incorrect. |
| `unavailable` | The customer’s bank did not check the first address line provided. |
| `unchecked`   | The provided first address line was not checked. Checks are performed once a card is attached to a Customer object, or when a Charge is created. |


The following table shows the verification responses for the ADDRESS ZIP `source[address_zip_check]`:

| Verification  | Meaning |
|---------------|---------|
| `pass`        | The ZIP provided is correct.   |
| `fail`        | The ZIP provided is incorrect. |
| `unavailable` | The customer’s bank did not check the ZIP provided. |
| `unchecked`   | The ZIP was provided but has not been checked. Checks are performed once a card is attached to a Customer object, or when a Charge is created. |

##### Returns a charge

Returns a charge object if the charge succeeded. Raises an error if something goes wrong. A common source of error is an invalid or expired card, or a valid card with insufficient available balance.

If the `cvc` parameter is provided, Stripe will attempt to check if the CVC is valid, and the check’s result will be returned. Similarly, if `address_line1` or `address_zip` are provided, Stripe will try to check the validity of those parameters. Some banks do not support checking one or more of these parameters, in which case Stripe returns an ‘unavailable’ result. Also note that, depending on the bank, charges can succeed even when passed incorrect CVC and address information.

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

#### Retrieve a charge

Retrieves the details of a charge that has previously been created. Supply the unique charge ID that was returned from your previous request, and Stripe will return the corresponding charge information. The same information is returned when creating or refunding the charge. 

The following is an example request: 

```json
Stripe.apiKey = "test_BQokikJOvBiI2HlWgH4olfQ2"; 

Charge.retrieve("ch_182Shs2eZvKYlo2Ca1bLfus3"); 
```

##### Returns a retrieve

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

#### Update a charge 

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
| `description`  | An arbitrary string which you can attach to a charge object. It is displayed when in the web interface alongside the charge. Note that if you use Stripe to send automatic email receipts to your customers, your receipt emails will include the `description` of the charges that they are describing. This will be unset if you POST an empty value. This can be unset by updating the value to `None` and then saving. Default is `None`. |
 `fraud_details` | A set of key/value pairs you can attach to a charge giving information about its riskiness. If you believe a charge is fraudulent, include a `user_report` key with a value of `fraudulent` . If you believe a charge is safe, include a `user_report` key with a value of `safe`. Note that you must refund a charge before setting the `user_report` to `fraudulent`. Stripe will use the information you send to improve our fraud detection algorithms. Default is `{}` |
| `metadata`     | A set of key/value pairs that you can attach to a charge object. It can be useful for storing additional information about the charge in a structured format. You can unset individual keys if you POST an empty value for that key. You can clear all keys if you POST an empty value for metadata. You can unset an individual key by setting its value to `None` and then saving. To clear all keys, set metadata to `None`, then save. Default is `{}` |
| `receipt_email` | This is the email address that the receipt for this charge will be sent to. If this field is updated, then a new email receipt will be sent to the updated address. Default is `None` |
| `shipping`      | Shipping information for the charge. Helps prevent fraud on charges for physical goods. Default is `{}` |


##### Returns update

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

#### Capture a charge

Capture the payment of an existing, uncaptured charge. This is the second half of the two-step payment flow, where first you created a charge with the capture option set to `false`.

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
| `amount`          | Optional  | The amount to capture, which must be less than or equal to the original amount. Any additional amount will be automatically refunded. |
| `application_fee` | Optional  | An application fee to add on to this charge. Can only be used with Stripe Connect. |
| `receipt_email`   | Optional  | The email address to send this charge’s receipt to. This will override the previously-specified email address for this charge, if one was set. Receipts will not be sent in test mode. |
| `statement_descriptor` | Optional | An arbitrary string to be displayed on your customer’s credit card statement. This may be up to 22 characters. As an example, if your website is `RunClub` and the item you’re charging for is a race ticket, you may want to specify a `statement_descriptor` of `RunClub 5K race ticket`. The statement description may not include `<>"'` characters, and will appear on your customer’s statement in capital letters. Non-ASCII characters are automatically stripped. Updating this value will overwrite the previous statement descriptor of this charge. While most banks display this information consistently, some may display it incorrectly or not at all. |

The following is an example request: 

```json
Stripe.apiKey = "test_BQokikJOvBiI2HlWgH4olfQ2";
ch = Charge.retrieve("ch_182TFv2eZvKYlo2Cjxtxxns4"); 
ch.capture(); 
```

#### Returns capture

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

#### List all charges

Returns a list of charges you’ve previously created. The charges are returned in sorted order, with the most recent charges appearing first.

The following are the _optional_ arguments in this feature.

| Argument | Definition |
|----------|------------|
| [`created`](#list-created) | A filter on the list based on the object `created` field. The value can be a string with an integer Unix timestamp, or it can be a dictionary with the other options. |
| `customer` | Only return charges for the customer specified by this customer ID. 
| `ending_before` | A cursor for use in pagination. `ending_before` is an object ID that defines your place in the list. For example, if you make a list request and receive 100 objects, starting with `obj_bar`, your subsequent call can include `ending_before=obj_bar` to fetch the previous page of the list. |
| `limit` | Default is 10 | 
| [`source`](#list-source) | A filter on the list based on the source of the charge. The value can be a dictionary with the other options. Default is `{object:”all”}` |
| `starting_after` | A cursor for use in pagination. `starting_after` is an object ID that defines your place in the list. For example, if you make a list request and receive 100 objects, ending with `obj_foo`, your subsequent call can include `starting_after=obj_foo` to fetch the next page of the list. |

##### `list-created`

The following are the `list-created` object's _optional_ timestamp child arguments.

| Argument | Definition |
|----------|------------|
| `gt`     | (greater than) Return values where the `created` field is after this timestamp. |
| `gte`    | (greater than or equal) Return values where the `created` field is after or equal to this timestamp. |
| `lt`     | (less than) Return values where the `created` field is before this timestamp. |
| `lte`    | (less than or equal) Return values where the `created` field is before or equal to this timestamp. |

##### `list-source`

The following is the `list-source` object's _optional_ child argument. 

| Argument | Definition |
|----------|------------|
| `object` | Return charges that match this source type string. Valid values are `all`, `alipay_account`, `bitcoin_receiver`, or `card`. |


##### Returns list-all

A dictionary with a `data` property that contains an array of up to `limit` charges, starting after charge `starting_after`. Each entry in the array is a separate charge object. If no more charges are available, the resulting array will be empty. If you provide a non-existent customer ID, this call raises an error.

You can optionally request that the response include the total count of all charges that match your filters. To do so, specify `include[]=total_count` in your request.

The following is an example response: 

```json
#<com.stripe.model.ChargeCollection id=#> JSON: { 
  "data": [ 
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
    #<com.stripe.model.Charge[...] ...>, 
    #<com.stripe.model.Charge[...] ...> 
  ], 
  "has_more": false 
}
```

###  &nbsp; 

### Authentication API

Authenticate your account when using the API by including your secret API key in the request. You can manage your API keys in the Dashboard. Your API keys carry many privileges, so be sure to keep them secret! Do not share your secret API keys in publicly accessible areas such as GitHub, client-side code, and so forth.

To use your API keys, assign it to `Stripe.apiKey`. The Python will then automatically send this key in each request.

All API requests must be made over HTTPS. Calls made over plain HTTP will fail. API requests without authentication will also fail.

The following is an example request. You can set the default API key, or you can always pass a key directly to an object’s constructor. Authentication is transparently handled for you in subsequent method calls.

```
Stripe.apiKey = "test_BQokikJOvBiI2HlWgH4olfQ2";
```

**Note**: A sample test API key is included in all the examples on this page, so you can test any example right away. To test requests, using your account, replace the sample API key with your actual API key.

#### Errors

Stripe uses conventional HTTP response codes to indicate the success or failure of an API request. However, not all errors map cleanly onto HTTP response codes. When a request is valid but does not complete successfully (for example, a card is declined), we return a 402 error code. 

##### HTTP status code

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

##### Error types

The following table shows the error types that you might come across:

| Error Type | Meaning |
|------------|---------|
| `api_connection_error`  | Failure to connect to Stripe’s API. |
| `api_error `            | API errors cover any other type of problem (for example, a temporary problem with Stripe’s servers) and are extremely uncommon. |
| `authentication-error`  | Failure to properly authenticate yourself in the request. |
| `card_error`            | Card errors are the most common type of error you should expect to handle. They result when the user enters a card that cannot be charged for some reason. |
| `invalid_request_error` | Invalid request errors arise when your request has invalid parameters. |
| `rate_limit_error`      | Too many requests hit the API too quickly. 

##### Card errors

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
| `missing`              | The charged customer doesn't have a card. |
| `processing_error`     | An error occurred while processing the card. |

**Note**: CVC validation and zip validation can be enabled/disabled in your setting. 

#### Handling errors 

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

#### Idempotent requests 

The API supports [idempotency](https://en.wikipedia.org/wiki/Idempotence) for safely retrying requests without accidentally performing the same operation twice. For example, if a request to create a charge fails due to a network connection error, you can retry the request with the same idempotency key to guarantee that only a single charge is created.

To perform an idempotent request, provide a key to `setIdempotencyKey()` on a request. It's completely up to you on how to create unique keys. We suggest using random strings or UUIDs. We will always send back the same response for requests made with the same key. However, you cannot use the same key with different request parameters. The keys expire after 24 hours.

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

#### Metadata 

Metadata is useful for storing additional, structured information on an object. As an example, you could store your user’s full name and corresponding unique identifier from your system on a Stripe Customer object. Metadata is not used by Stripe (for example, to authorize or decline a charge), and will not be seen by your users unless you choose to show it to them.

Some of the objects listed above also support a `description` parameter. You can use the `description` parameter to annotate a charge, for example, with a human-readable description, such as "2 shirts for test@example.com". Unlike `metadata`, `description` is a single string, and your users may see it (for example, in email receipts Stripe sends on your behalf).

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

| Use case            | Description |
|---------------------|-------------|
| Link IDs            | Attach your system’s unique IDs to a Stripe object for easy lookups. Add your order number to a charge, your user ID to a customer or recipient, or a unique recipient, or a unique receipt number to a transfer. |
| Refund paper trails | Store information about why a refund was created, and by whom. |
| Customer details    | Annotate a customer by storing the customer’s phone number for your later use. |

#### Pagination

All top-level API resources have support for bulk fetches via “list” API methods. For instance you can list charge, list customers, and list invoices. These list API methods share a common structure, taking at least these three parameters:

- `limit`
- `starting_after`
- `ending_before`

Parameter usage:

- Stripe utilizes cursor-based pagination via the `starting_after` and `ending_before` parameters.
- Both take an existing object ID value (see below).
- The `ending_before` parameter returns objects created before the named object, in descending chronological order.
- The `starting_after` parameter returns objects created after the named object, in ascending chronological order.
- If both parameters are provided, only `ending_before` is used.

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
| `starting_after` | A cursor for use in pagination. `starting_after` is an object ID that defines your place in the list. <br/> For example, if you make a list request and receive 100 objects, ending with `obj_foo`, your subsequent call can include `starting_after=obj_foo` to fetch the next page of the list. |
| `ending_before`  | A cursor for use in pagination. `ending_before` is an object ID that defines your place in the list. <br/> For example, if you make a list request and receive 100 objects, starting `obj_bar`, your subsequent call can include `ending_before=obj_bar` to fetch the previous page of the list. |

The following table details some response formats that you will come across.

| Format     | Type | Definition |
|------------|------|------------|
| `object`   | string, value is “list” | A string describing the object type returned. |
| `data`     | array | An array containing the actual response elements, paginated by any request parameters. |
| `has_more` | boolean | Whether or not there are more elements available after this set. If `false`, this set comprises the end of the list. |
| `url`      | string | The URL for accessing this list. |

#### Autopagination

Most of our libraries support autopagination. This feature easily handles fetching large lists of resources without having to manually paginate results and perform subsequent requests.

To use the autopagination feature in Python, simply issue an initial “list” call with the parameters you need, then call `auto_paging_iter()` on the returned list object to iterate over all objects matching your initial parameters.

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

#### Request IDs

Each API request has an associated request identifier. You can find this value in the response headers, under Request-Id. You can also find request identifiers in the URLs of individual request logs in your Dashboard.

**Note**: If you need to contact us about a specific request, providing the request identifier will ensure the fastest possible resolution. 

#### Versioning

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

#### Balance

This is an object representing your Stripe balance. You can retrieve it to see the balance currently on your Stripe account.

You can also retrieve a list of the balance history, which contains a list of transactions that contributed to the balance (for example, charges, transfers, and so forth).

The available and pending amounts for each currency are broken down further by payment source types.

##### `balance` object

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

##### `balance_transaction`

The following table details all the attributes of the `balance_transaction` object:

| Attribute      | Type      | Definition |
|----------------|-----------|------------|
| `id`           | string    | The unique ID. |
| `object`       | string    | The value is `balance_transaction` |
| `amount`       | integer   | Gross amount of the transaction, in cents. |
| `available_on` | timestamp | The date the transaction in net funds will become available in the Stripe balance. |
| `created`      | timestamp | Date created |
| `currency`     | currency  | The currency used |
| `description`  | string    | Memo field for any remarks |
| `fee`          | integer   | Fees (in cents) paid for transaction. |
| [`fee_details`](#fee_details) | list    | Detailed breakdown of fees (in cents) paid for this transaction. |
| `net`          | integer   | Net amount of the transaction, in cents. |
| `source`       | string    |The Stripe object this transaction is related to. |
| [`sourced_transfer](#sourced_transfer) | list | The transfers (if any) for which source is a `source_transaction` |
| `status`       | string    | If the transaction’s net funds are available in the Stripe balance yet. Valid values are `available` or `pending`. | 
| `type`         | string | Transaction type valid values: <br/> `adjustment` <br/> `application_fee` <br/> `application_fee_refuncharge` <br/> `payment` <br/> `payment_refund` <br/> `refuntransfer` <br/> `transfer_cancel` <br/> `transfer_failure` <br/> `transfer_refund` |

##### `fee_details`

The following are the `fee_details` child attributes:

| Attribute     | Type     | Definition |
|---------------|----------|------------|
| `amount`      | integer  | |
| `application` | string   | |
| `currency`    | currency | |
| `description` | string   | | 
| `type`        | string   | Type of the fee, one of: `application_fee`, `stripe_fee` or `tax`. |

##### `sourced_transfer`

The following are the `sourced_transfer` child attributes:

| Attribute      | Type    | Definition |
|----------------|---------|------------|
| `object`       | string  | The value is `list`. |
| `data`         | array   | Contains: transfer and object |
| `has_more`     | boolean | The default is `false` |
| `total_count ` | positive integer or zero | The total number of items available. This value is not included by default, but you can request it by specifying <br/> `?include[]=total_count` |
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

#### Retrieve balance

Retrieves the current account balance, based on the authentication that was used to make the request.

The following is an example request:

```json
Stripe.apiKey = "test_BQokikJOvBiI2HlWgH4olfQ2"; 
Balance.retrieve(); 
```

##### Returns retrieve

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

#### Retrieve a balance transaction

Retrieves the balance transaction with the given ID.

The following is an example request:

```json
Stripe.apiKey = "test_BQokikJOvBiI2HlWgH4olfQ2";
BalanceTransaction.retrieve("txn_17bBwe2eZvKYlo2Cuwcyi9or") ; 
```

##### Returns retrieve balance

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

#### List all balance history

Returns a list of transactions that have contributed to the Stripe account balance (for example, charges, transfers, and so forth). The transactions are returned in sorted order, with the most recent transactions appearing first.

To do so, simply add `BalanceTransaction.all();` to your program.

The following table details all the _optional_ attributes involved in this feature:

| Attribute | Definition |
|-----------|------------|
| [`available_on`](#available_on) | A filter on the list based on the object `available_on` field. The value can be a string with an integer Unix timestamp, or it can be a dictionary with other options. (see the Note below) |
| [`created`](#created) | A filter on the list based on the object `created` field. The value can be a string with an integer Unix timestamp, or it can be a dictionary with other options. (see the Note below) |
| `currency`       | The currency used. |
| `ending_before`  | A cursor for use in pagination. `ending_before` is an object ID that defines your place in the list. <br/> For example, if you make a list request and receive 100 objects, starting with `obj_bar`, your subsequent call can include `ending_before=obj_bar` to fetch the previous page of the list. |
| `limit`          | The default is 10. A limit on the number of objects to be returned. Limit can range between 1 and 100 items. |
| `source`         | Only returns the original transaction. |
| `starting_after` | A cursor for use in pagination. `starting_after` is an object ID that defines your place in the list. <br/> For example, if you make a list request and receive 100 objects, starting with `obj_foo`, your subsequent call can include `starting_after=obj_foo` to fetch the next page of the list. |
| `transfer`       | For automatic Stripe transfers only, only returns transactions out on the specified transfer ID. |
| `type`           | Only returns transactions of the given type. One of: <br/> `charge` <br/> `refund` <br/> `adjustment` <br/> `application_fee` <br/> `application_fee_refund` <br/> `transfer` <br/> `transfer_failure` |

##### `available_on`

The following are the `available_on` _optional_ child timestamp attributes. 

| Attribute | Definition |
|-----------|------------|
| `gt`      | (greater than) Return values where the `available_on` field is after this timestamp. |
| `gte`     | (greater than or equal) Return values where the `available_on` field is after or equal to this timestamp.    |
| `lt`      | (less than) Return values where the `available_on` field is before this timestamp. |
| `lte`     | (less than or equal) Return values where the `available_on` field is before or equal to this timestamp. |

##### `created`

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

##### Returns list all balance history

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

---

## Kubernetes `kubectl` Debug Operations

_(I wrote this for an interview's assignment with that company's style guide)_

Major and alternative cloud providers support Kubernetes, offering fully managed services that handle the control plane. Use `kubectl`, a command-line utility, to communicate with a cluster's control plane via the Kubernetes API. Every `kubectl` command has the following syntax:

```bash
kubectl [command] [TYPE] [NAME] [flags]
```

The following table lists all `kubectl` commands for debugging your cluster:

|  CLI Command                               | Description |
|--------------------------------------------|-------------|
| `kubectl get pods --namespace <namespace>` | Get a list of pods and their status by specifying the `namespace`.                    |
| `kubectl logs <pod-name>`                  | Retrieve the logs of a specific pod.                                                  |
| `kubectl logs -f <pod-name>`               | Stream or "follow" logs in real-time.                                                 |
| `kubectl exec <pod-name>`                  | Debug a container from the inside or explore the environment of the container itself. |
| `kubectl exec -it <pod-name> -- /bin/bash` | Open an interactive terminal session inside a running pod's container.                |

### Handle Errors

#### Issues Inside a Container

If you experience issues inside a container, use the following syntax:

```shell
kubectl debug -it <pod-name> --image=busybox --target=<container-name>
```

What you see first:

```text
Defaulting debug container name to debugger-xxxxx.
Targeting container "your-app-container". If you don't see logs for this container, try something else.
```

Use `kubectl debug` to diagnose the following symptoms in a running (or crash-looping) container:

- Container lacks a shell
- Container constantly crashes
- Container requires node-level host troubleshooting

#### Pod Doesn't Terminate

A stuck pod is often caused by:

- stuck finalizers
- a hung kubelet
- a volume that won't unmount

To troubleshoot this, try `kubectl delete pod <name> --grace-period=0 --force` or investigate finalizers directly.

### References

- [Getting started with Kubernetes](https://kubernetes.io/docs/reference/generated/kubectl/kubectl-commands#-strong-getting-started-strong-)

- [What is Kubernetes](https://kubernetes.io/docs/concepts/overview/)
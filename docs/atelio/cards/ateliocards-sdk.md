import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem'; 

# Atelio cards SDK

## Overview

We provide the `AtelioCards` SDK in the [Atelio Web SDK](https://www.npmjs.com/package/bond-sdk-web) to shield you from the burden and compliance requirements needed when handling personal data.

Anyone that wants to store or process card details (that include the PAN, CVV, expiry date, and PINs), you have to comply with [PCI DSS data security](https://www.pcisecuritystandards.org/) requirements. To achieve compliance requires a lot of overhead. To reduce this overhead, we provide our AtelioCard SDK that takes care of vaulting and tokenizing sensitive card information for you. Using our SDK, you can easily allow your customers to retrieve their card details, and set and reset PINs without having to develop code that is compliant from scratch. The SDK takes care of preventing anyone not authorized from seeing your customers' sensitive card details.

The SDK relies heavily on [Promises](https://developers.google.com/web/fundamentals/getting-started/primers/promises) which makes it easy to handle the asynchronous requests that are made to the API. The SDK provides a `AtelioCards` object containing several methods which map to the calls and parameters that are described in detail in [Atelio Web SDK Documentation](https://docs.atelio.com/embedded/docs/web-sdk-documentation).

To use the SDK, you can either build the repo yourself or install it.


## Requirements

To build the repo (with or without sample files), you need [Node.js **v6.3.0 or above**](https://nodejs.org/).

Node installation includes [NPM](https://www.npmjs.com/) which is responsible for dependency management.


## Importing the package

You can import the package into your code using either [NPM](https://www.npmjs.com/package/bond-sdk-web) or CDN.

### Using NPM

To import the package using Node Package Management (NPM), do the following:

1. Install the package by entering the following in a terminal window: `npm install bond-sdk-web`
2. Import the package into your JavaScript code as follows:

```javascript title="JavaScript"
import { AtelioCards } from 'bond-sdk-web';
```

### Using CDN

To import the package using a Content Delivery Network (CDN), you can use either JavaScript or HTML. For additional information, see [CDN](https://cybernews.com/resources/web-hosting-glossary/#cdn).

<Tabs>
    <TabItem value="javascript" label="JavaScript">

        ```javascript
        import AtelioCards from 'https://cdn.atelio.com/sdk/web/v1/bond-sdk-web.js';
        ```
    </TabItem>
    <TabItem value="html" label="HTML">

    ```html
    <script type="text/javascript" src="https://cdn.atelio.com/sdk/cards/v1/bond-sdk-cards.js"></script>
    ```
    </TabItem>
</Tabs>

### Using the AtelioCards SDK

The snippets and descriptions below are generic examples of how you can use the SDK to execute a request.

For details regarding specific methods, see the [SDK documentation](https://docs.atelio.com/embedded/docs/web-sdk-documentation).

#### 1. Authorize the calls using temporary tokens

Before executing any request, you need to authorize the calls to the Atelio API and to initialize AtelioCards. Make an authorized call from your backend with the correct `customer_id` or `business_id` to receive temporary tokens (identity, authorization). 

**Note:** These are short-lived tokens lasting for a maximum of five API calls or up to five minutes.

<Tabs>
    <TabItem value="curl" label="cURL">

        ```curl
        curl --request POST \
        --url https://sandbox.atelio.com/api/v0.1/auth/key/temporary \
        --header 'Content-Type: application/json' \
        --header 'Identity: YOUR_IDENTITY' \
        --header 'Authorization: YOUR_AUTHORIZATION' \
        --data '{"customer_id": "YOUR_CUSTOMER_ID"}'
        ```
    </TabItem>
    <TabItem value="ruby" label="Ruby">

        ```ruby
        uri = URI.parse("https://sandbox.atelio.com/api/v0.1/auth/key/temporary")
        params = {'customer_id' => 'YOUR_CUSTOMER_ID'}
        headers = {
            'Content-Type'=>'application/json',
            'Identity'=>'YOUR_IDENTITY',
            'Authorization'=>'YOUR_AUTHORIZATION'
        }

        http = Net::HTTP.new(uri.host, uri.port)
        response = http.post(uri.path, params.to_json, headers)
        output = response.body
        puts output
        ```
    </TabItem>
    <TabItem value="python" label="Python">

        ```python
        import requests

        url = "https://sandbox.atelio.com/api/v0.1/auth/key/temporary"

        headers = { "Content-type": "application/json", "Identity": "YOUR_IDENTITY", "Authorization": "YOUR_AUTHORIZATION" }

        payload = { 'customer_id': 'YOUR_CUSTOMER_ID' }

        response = requests.post(url, headers=headers, json=payload)

        print(response.text)
        ```
    </TabItem>
    <TabItem value="javascript" label="JavaScript">

        ```javascript
        // Client-side example for quick testing.
        // You would call this from your backend in production

        fetch("https://sandbox.atelio.com/api/v0.1/auth/key/temporary", {
        method: "POST",
        headers: {
            "Content-type": "application/json",
            "Identity": "YOUR_IDENTITY",
            "Authorization": "YOUR_AUTHORIZATION",
        },
        body: {
            "customer_id": "YOUR_CUSTOMER_ID",
        },
        });
        ```
    </TabItem>
    <TabItem value="csharp" label="C#">

        ```csharp
        var client = new RestClient("https://sandbox.atelio.com/api/v0.1/auth/key/temporary");
        var request = new RestRequest(Method.POST);
        request.AddHeader("Content-Type", "application/json");
        request.AddHeader("Identity", "YOUR_IDENTITY");
        request.AddHeader("Authorization", "YOUR_AUTHORIZATION");
        request.AddParameter("application/json", {"customer_id": "YOUR_CUSTOMER_ID"}, ParameterType.RequestBody);
        IRestResponse response = client.Execute(request);
        ```
    </TabItem>
    <TabItem value="java" label="Java">

        ```java
        OkHttpClient client = new OkHttpClient();

        Request request = new Request.Builder()
        .url("https://sandbox.atelio.com/api/v0.1/auth/key/temporary")
        .addHeader("Content-Type", "application/json")
        .addHeader("Identity", "YOUR_IDENTITY")
        .addHeader("Authorization", "YOUR_AUTHORIZATION")
        .post(RequestBody
                        .create(MediaType
                            .parse("application/json"),
                                "{\"customer_id\": \"" + YOUR_CUSTOMER_ID + "\"}"
                        ))
        .build();

        Response response = client.newCall(request).execute();
        ```
    </TabItem>
</Tabs>

> 📘 **Note**
>
> For a business resource, use `business_id` in place of the `customer_id`.

#### 2. Initialize AtelioCards

Call the constructor using:

```javascript title="JavaScript"
const bondCards = new AtelioCards({ live: false });
```

**Note:** use `live: true` to access the live environment.

#### 3. Make a request

You can now use the various methods from the SDK to reveal/manage PCI-sensitive data for a particular card ID.

Following the Promises notation, use:

- `.then()` to handle all successful requests
- `.catch()` to handle all failed requests

Most of the calls take an object as the only parameter but refer to the API documentation to tailor the request as needed.

The following is an example of a request:

```javascript title="JavaScript"
bondCards
  .show({
    cardId: 'YOUR_CARD_ID',
    identity: 'YOUR_IDENTITY',
    authorization: 'YOUR_AUTHORIZATION',
    field: "number",
    htmlSelector: "#num",
  })
  .then((data) => {
    // Handle data
  })
  .catch((error) => {
    // Handle an error
  })
```

#### 4. Control loading

You can control loading using the methods from the SDK:

1. Show the loader.
2. Wait for a response.
3. Hide it when needed.

The following is an example:

```javascript title="JavaScript"
  // Handle show loading
  bondCards
    .showMultiple(configuration)
    .then((data) => {
      // Handle hide loading
    })
    .catch((error) => {
      // Handle hide loading
    });
```

> 👍 **Check out the demo app**
>
> To see more examples of using the AtelioCards SDK, you can check out the [Atelio SDK demo](https://github.com/bond-tech/bond-sdk-demo) on GitHub.


## Displaying card details

### Card details in HTML

You can use `AtelioCards` to insert iFrames with relevant card details into an HTML page using `<div>` elements with IDs.

The following pseudocode inserts the retrieved card details in a page:

```html title="HTML"
<div class="field">
   Card Number
   <div id="num" class="card-field"></div>
   <div id="num_copy_btn"></div>
</div>
<div class="field">
   Expiration Date
   <div id="exp" class="card-field"></div>
   <div id="exp_copy_btn"></div>
</div>
<div class="field">
   CVV2
   <div id="cvv" class="card-field"></div>
   <div id="cvv_copy_btn"></div>
</div>
```

### Card details in JavaScript

There are two methods to display card details in JavaScript:

- Using [atelioCards.show](https://docs.atelio.com/embedded/docs/web-sdk-documentation#ateliocardsshow)
- Using [atelioCards.showMultiple](https://docs.atelio.com/embedded/docs/web-sdk-documentation#ateliocardsshowmultiple)

<Tabs>
    <TabItem value="single" label="JavaScript using atelioCards.show">

        ```javascript
        atelioCards
        .show({
            cardId: 'YOUR_CARD_ID',
            identity: 'YOUR_IDENTITY',
            authorization: 'YOUR_AUTHORIZATION',
            field: "number",
            htmlSelector: "#num",
        })
        .then((data) => {
            // Handle data
            atelioCards.copy({
            iframe: data,
            htmlSelector: '#num-copy-btn',
            callback: (status) => {
                if (status === 'success') {
                console.log('copied!')
                } else {
                console.log('error!')
                }
            },
            format: {
                replaceThis: "\\W",
                withThis: "",
            },
            text: 'Copy data',
            css: cssBtn,
            })
            .then((data) => {
                    // Handle data
                })
            .catch((error) => {
                    // Handle an error
                })
        })
        .catch((error) => {
            // Handle an error
        })
        ```
    </TabItem>
    <TabItem value="multiple" label="JavaScript using atelioCards.show.Multiple">

        ```javascript
        const hashMap = {
        number: 'num',
        expiry: 'exp',
        cvv: 'cvv',
        }

        atelioCards
        .showMultiple({
            cardId: 'YOUR_CARD_ID',
            identity: 'YOUR_IDENTITY',
            authorization: 'YOUR_AUTHORIZATION',
            fields: {
            number: {
                htmlSelector: "#num",
                format: {
                replaceThis: "(\\d{4})(\\d{4})(\\d{4})(\\d{4})",
                withThis: "$1-$2-$3-$4",
                },
                css,
            },
            expiry: {
                htmlSelector: "#exp",
                format: {
                replaceThis: "(\\d{2})(\\d{4})",
                withThis: "$1/$2",
                },
                css,
            },
            cvv: {
                htmlSelector: "#cvv",
                css,
            }
            },
        })
        .then((data) => {
            // Handle data
            return Promise.allSettled(data.map((iframe) => {
            return atelioCards.copy({
                iframe,
                htmlSelector: `#${hashMap[iframe.params.name]}-copy-btn`,
                callback: (status) => {
                if (status === 'success') {
                    console.log('copied!')
                } else {
                    console.log('error!')
                }
                },
                text: 'Copy data',
                css: cssBtn,
            })
            }))
        })
        .catch((error) => {
            // Handle an error
        });
        ```
    </TabItem>
</Tabs>

### AtelioCards in script files

1. [Import the SDK](https://docs.atelio.com/embedded/docs/set-a-cards-pin#1-importing-the-sdk)
2. [Get temporary security tokens](https://docs.atelio.com/embedded/docs/set-a-cards-pin#2-getting-temporary-security-tokens)
3. [Initialize the AtelioCards class](https://docs.atelio.com/embedded/docs/set-a-cards-pin#3-initializing-the-bondcards-class)

#### 1. Import the SDK

| Import using | JavaScript |
|--------------|------------|
| `node.js`    | `import { BondCards } from 'bond-sdk-web';` |
| the CDN      | `import { BondCards } from 'cdn.atelio.com/sdk/web/v1/bond-sdk-web.js';` |

#### 2. Get temporary security tokens

Use the following sample code with the API to get temporary tokens by making a call to the backend.

<Tabs>
    <TabItem value="curl" label="cURL">

        ```curl
        curl --request POST \
        --url https://sandbox.atelio.com/api/v0.1/auth/key/temporary \
        --header 'Content-Type: application/json' \
        --header 'Identity: YOUR_IDENTITY' \
        --header 'Authorization: YOUR_AUTHORIZATION' \
        --data '{"customer_id": "YOUR_CUSTOMER_ID"}'
        ```
    </TabItem>
    <TabItem value="ruby" label="Ruby">

        ```ruby
        uri = URI.parse("https://sandbox.atelio.com/api/v0.1/auth/key/temporary")
        params = {'customer_id' => 'YOUR_CUSTOMER_ID'}
        headers = {
            'Content-Type'=>'application/json',
            'Identity'=>'YOUR_IDENTITY',
            'Authorization'=>'YOUR_AUTHORIZATION'
        }

        http = Net::HTTP.new(uri.host, uri.port)
        response = http.post(uri.path, params.to_json, headers)
        output = response.body
        puts output
        ```
    </TabItem>
    <TabItem value="javascript" label="JavaScript">

        ```javascript
        // NODE
        const fetch = require('node-fetch');

        let url = 'https://sandbox.atelio.com/api/v0.1/auth/key/temporary';
        let options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Identity': 'YOUR_IDENTITY',
            'Authorization': 'YOUR_AUTHORIZATION'
        },
        body: { 'customer_id': 'YOUR_CUSTOMER_ID' }
        };

        fetch(url, options)
        .then(res => res.json())
        .then(json => console.log(json))
        .catch(err => console.error('error:' + err));
        ```
    </TabItem>
    <TabItem value="python" label="Python">

        ```python
        import requests

        url = "https://sandbox.atelio.com/api/v0.1/auth/key/temporary"

        headers = { "Content-type": "application/json", "Identity": "YOUR_IDENTITY", "Authorization": "YOUR_AUTHORIZATION" }

        payload = { 'customer_id': 'YOUR_CUSTOMER_ID' }

        response = requests.post(url, headers=headers, json=payload)

        print(response.text)
        ```
    </TabItem>
    <TabItem value="csharp" label="C#">

        ```csharp
        var client = new RestClient("https://sandbox.atelio.com/api/v0.1/auth/key/temporary");
        var request = new RestRequest(Method.POST);
        request.AddHeader("Content-Type", "application/json");
        request.AddHeader("Identity", "YOUR_IDENTITY");
        request.AddHeader("Authorization", "YOUR_AUTHORIZATION");
        request.AddParameter("application/json", {"customer_id": "YOUR_CUSTOMER_ID"}, ParameterType.RequestBody);
        IRestResponse response = client.Execute(request);
        ```
    </TabItem>
    <TabItem value="java" lable="Java">

        ```java
        OkHttpClient client = new OkHttpClient();

        Request request = new Request.Builder()
        .url("https://sandbox.atelio.com/api/v0.1/auth/key/temporary")
        .addHeader("Content-Type", "application/json")
        .addHeader("Identity", "YOUR_IDENTITY")
        .addHeader("Authorization", "YOUR_AUTHORIZATION")
        .post(RequestBody
                        .create(MediaType
                            .parse("application/json"),
                                "{\"customer_id\": \"" + YOUR_CUSTOMER_ID + "\"}"
                        ))
        .build();

        Response response = client.newCall(request).execute();
        ```
    </TabItem>
</Tabs>

> 📘 **Note**
>
> For a business resource, use `business_id` in place of the customer\_id\`.

#### 3. Initialize the AtelioCards class

Initialize the `AtelioCards` class using the following JavaScript:

```javascript title="JavaScript"
const bondCards = new AtelioCards({ live: false });
```

Pass `{live: true}` when using the `live` environment.

#### 4. Display a PIN

On an event such as a button click or page load, you can call `bondCards.show()` for each of the fields whose data you want to display using appropriate parameter values.

You need to send the following:

- `card_id`
- Temporary Identity and Authorization tokens
- Field type:
  - `number` for the credit card number
  - `expiry` for the expiry date
  - `cvv` for the card verification value
- The HTML/CSS selector of the div/field where you want the iFrame to be inserted

### `.show` example

```javascript title="JavaScript"
bondCards
  .showPIN({
    cardId: 'YOUR_CARD_ID',
    identity: 'YOUR_IDENTITY',
    authorization: 'YOUR_AUTHORIZATION',
    reset: true // (optional) Reset the PIN and show new PIN
    htmlSelector: "#pin",
    css: {'font-size': '14px'} // (optional) An object of CSS rules to apply to the response.
  })
  .then((data) => {
    // The iFrame with revealed data will already be inserted.
    // But you can get a reference to it here and handle data further if you like.
  })
  .catch((error) => {
    // Handle an error
  });
```

### Formatting examples

You can manipulate card numbers and expiry dates in a number of ways, as shown in the table below.

| Change required | Replace this: | With this: |
| --- | --- | --- |
| To separate card number using dashes:<br/>`4111111111111111` --\> `4111-1111-1111-1111` | `'(\\d{4})(\\d{4})(\\d{4})(\\d{4})',` | `'$1-$2-$3-$4'` |
| To separate card number using spaces:<br/>`4111111111111111` --\> `4111 1111 1111 1111` | `'(\\d{4})(\\d{4})(\\d{4})(\\d{4})',` | `'$1 $2 $3 $4'` |
| To remove spaces:<br/>`4111 1111 1111 1111` --\> `4111111111111111` | `' '` | `''` |
| To remove the first two dashes:<br/>`4111-1111-1111-1111` --\> `411111111111-1111` | `'-'` | `"", count: 2` |
| To separate card expiry month and year using a slash:<br/>`122021` --\> `12/2021` | `'(\\d{2})(\\d{4})'` | `'$1/$2'` |


## Setting a card's PIN

### Setting a card PIN in HTML

You can use `BondCards` from the [Atelio Web SDK](https://www.npmjs.com/package/bond-sdk-web) to insert `<form>` fields with IDs into an HTML page to capture PIN details using `<div>` elements. The following pseudocode captures PIN details.

```html title="HTML"
<form id="cc-form">
  <div class="field">
    New PIN
    <div id="cc-new-pin" class="card-field"></div>
  </div>
</form>
```

### AtelioCards SDK in script files

Before you can use the `AtelioCards` SDK in you scripts, you need to:

1. [Import the SDK](https://docs.atelio.com/embedded/docs/set-a-cards-pin#1-importing-the-sdk)
2. [Get temporary security tokens](https://docs.atelio.com/embedded/docs/set-a-cards-pin#2-getting-temporary-security-tokens)
3. [Initialize the BondCards class](https://docs.atelio.com/embedded/docs/set-a-cards-pin#3-initializing-the-bondcards-class)

#### 1. Import the SDK

| Import using | JavaScript |
|--------------|------------|
| `node.js`    | `import { BondCards } from 'bond-sdk-web';` |
| the CDN      | `import { BondCards } from 'cdn.atelio.com/sdk/web/v1/bond-sdk-web.js';` |

#### 2. Get temporary security tokens

Use the following sample code with the API to get temporary tokens by making a call to the backend:

<Tabs>
    <TabItem value="curl" label="cURL">

        ```curl
        curl --request POST \
        --url https://sandbox.atelio.com/api/v0.1/auth/key/temporary \
        --header 'Content-Type: application/json' \
        --header 'Identity: YOUR_IDENTITY' \
        --header 'Authorization: YOUR_AUTHORIZATION' \
        --data '{"customer_id": "YOUR_CUSTOMER_ID"}'
        ```
    </TabItem>
    <TabItem value="python" label="Python">

        ```python
        import requests

        url = "https://sandbox.atelio.com/api/v0.1/auth/key/temporary"

        headers = { "Content-type": "application/json", "Identity": "YOUR_IDENTITY", "Authorization": "YOUR_AUTHORIZATION" }

        payload = { 'customer_id': 'YOUR_CUSTOMER_ID' }

        response = requests.post(url, headers=headers, json=payload)

        print(response.text)
        ```
    </TabItem>
    <TabItem value="ruby" label="Ruby">

        ```ruby
        uri = URI.parse("https://sandbox.atelio.com/api/v0.1/auth/key/temporary")
        params = {'customer_id' => 'YOUR_CUSTOMER_ID'}
        headers = {
            'Content-Type'=>'application/json',
            'Identity'=>'YOUR_IDENTITY',
            'Authorization'=>'YOUR_AUTHORIZATION'
        }

        http = Net::HTTP.new(uri.host, uri.port)
        response = http.post(uri.path, params.to_json, headers)
        output = response.body
        puts output
        ```
    </TabItem>
    <TabItem value="javascript" label="JavaScript NODE">

        ```javascript
        // NODE
        const fetch = require('node-fetch');

        let url = 'https://sandbox.atelio.com/api/v0.1/auth/key/temporary';
        let options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Identity': 'YOUR_IDENTITY',
            'Authorization': 'YOUR_AUTHORIZATION'
        },
        body: { 'customer_id': 'YOUR_CUSTOMER_ID' }
        };

        fetch(url, options)
        .then(res => res.json())
        .then(json => console.log(json))
        .catch(err => console.error('error:' + err));
        ```
    </TabItem>
    <TabItem value="jsclient" label="JavaScript Client-side">
        ```javascript
        // Client-side example for quick testing.
        // You would call this from your backend in production

        fetch("https://sandbox.atelio.com/api/v0.1/auth/key/temporary", {
        method: "POST",
        headers: {
            "Content-type": "application/json",
            "Identity": "YOUR_IDENTITY",
            "Authorization": "YOUR_AUTHORIZATION",
        },
        body: {
            "customer_id": "YOUR_CUSTOMER_ID",
        },
        });
        ```
    </TabItem>
    <TabItem value="java" label="Java">

        ```java
        OkHttpClient client = new OkHttpClient();

        Request request = new Request.Builder()
        .url("https://sandbox.atelio.com/api/v0.1/auth/key/temporary")
        .addHeader("Content-Type", "application/json")
        .addHeader("Identity", "YOUR_IDENTITY")
        .addHeader("Authorization", "YOUR_AUTHORIZATION")
        .post(RequestBody
                        .create(MediaType
                            .parse("application/json"),
                                "{\"customer_id\": \"" + YOUR_CUSTOMER_ID + "\"}"
                        ))
        .build();

        Response response = client.newCall(request).execute();
        ```
    </TabItem>
    <TabItem value="csharp" label="C#">

        ```csharp
        var client = new RestClient("https://sandbox.atelio.com/api/v0.1/auth/key/temporary");
        var request = new RestRequest(Method.POST);
        request.AddHeader("Content-Type", "application/json");
        request.AddHeader("Identity", "YOUR_IDENTITY");
        request.AddHeader("Authorization", "YOUR_AUTHORIZATION");
        request.AddParameter("application/json", {"customer_id": "YOUR_CUSTOMER_ID"}, ParameterType.RequestBody);
        IRestResponse response = client.Execute(request);
        ```
    </TabItem>
</Tabs>

#### 3. Initialize the AtelioCards class

```javascript title="JavaScript"
const bondCards = new AtelioCards({ live: true });
```

#### 4. Call `bondCards.field()`

On an event such as a page load, you can call `bondCards.field()` for each `<div>` where you want a user to enter PIN data.

You need to send the following:

- HTML/CSS selector of the `<div>` where you want the form field to be inserted
- Field type:
  - `new_pin`

#### Example call of `bondCards.field()`

```javascript title="JavaScript"
bondCards
  .field({
    selector: "#cc-new-pin",
    type: "new_pin",
  })
  .catch((error) => {
    console.error("error", error);
  });
```

#### 5. Add an event listener

Add an event listener to call `AtelioCards` when the form is submitted.

You need to send the following:

- `card_id`
- Temporary Identity and Authorization tokens.
- Form field values (`new_pin` is a required field).
- A callback function you want executed when the HTTP request has completed successfully.
- A callback function you want triggered when a field is invalid or upon an error.

#### Example of adding an event listener

```javascript title="JavaScript"
document.querySelector("#cc-form").addEventListener("submit", (e) => {
  e.preventDefault();
  bondCards.submit({
    cardId: 'YOUR_CARD_ID',
    identity: 'YOUR_IDENTITY',
    authorization: 'YOUR_AUTHORIZATION',
    newPin: document.getElementById("cc-new-pin").value,
    successCallback: function (status, data) {
      console.log('Successfully set new pin as: ', data.new_pin);
    },
    errorCallback: function (errors) {
      console.log(errors);
    },
  });
});
```

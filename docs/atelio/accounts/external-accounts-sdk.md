# External accounts SDK

## Overview

The linking external accounts SDK provided by Bond allows you to create an application that acts as a building block for your software solution when you need to interact with a customer's external account. For example, without having to write the code yourself, you can use the SDK to:

- Link to an external account.
- Make micro-deposits to verify the account.
- Delete the link to an external account.

The [v0 accounts](https://docs.bond.tech/v0/docs/account) API allows you to link a customer's Bond card to their verified external bank account. The customer can then transfer funds back and forth between their card account and the linked external account. Transfers to and from linked external accounts will also work with deposit accounts in API v0.1. Once the link is established, we use the `linked_account_id` identifier to represent the customer's external account.

The linking external account SDK provided by Bond is a JavaScript wrapper that uses [Promises](https://web.dev/promises/) which makes it easy for you to handle the asynchronous, external account requests made to our API. See the full documentation [here](https://github.com/bond-tech/bond-sdk-web#bond-external-accounts-javascript-sdk).

The SDK provides a `BondExternalAccounts` class that contains several methods that map to the calls and parameters described in the [Linking accounts API documentation](https://docs.atelio.com/embedded/reference/accounts-1).

You may also complete external account linking with the Plaid Link Web SDK; this flow will also be detailed in this guide.

## Getting the SDK

Using `npm` you can get the SDK with

```shell title="Shell"
npm install --save bond-sdk-web
```

or via our [CDN](https://cdn.bond.tech/sdk/web/v1/bond-sdk-web.js).


## Using the SDK

Listed below are some examples of how to use the SDK for external accounts.

### Node.js import

You can import the `BondExternalAccounts` named export from bond-web-sdk using the following statement.

```javascript title="JavaScript"
import { BondExternalAccounts } from 'bond-sdk-web';
```

### Browser import

The `BondExternalAccounts` package can be referenced from within a browser via the SDK.

```html title="HTML"
  <script src="https://cdn.bond.tech/sdk/web/v1/bond-sdk-web.js"></script>
  <script>
    import sdk from 'https://cdn.skypack.dev/bond-sdk-web';
  </script>
```

### Initializing the Bond account connection

The following code is an example of using the SDK to initialize `BondAccountConnection` in Node.

```javascript title="JavaScript"
const bondExternalAccounts = new BondExternalAccounts({ live: false });
```

passing `{ live: true }` if using the `live` environment.

For browser imports, you can initialize the connection using the following code snippet in a script tag or file:

```javascript title="JavaScript"
let bondExternalAccounts = new sdk.BondExternalAccounts({ live: false });
```

### Getting temporary security tokens

Use the sample code shown below with the API to get temporary tokens by making a call to the `/auth/key/temporary` endpoint.

```curl title="cURL"
curl --request POST \
  --url https://sandbox.bond.tech/api/v0.1/auth/key/temporary \
  --header 'Content-Type: application/json' \
  --header 'Identity: YOUR_IDENTITY' \
  --header 'Authorization: YOUR_AUTHORIZATION' \
  --data '{"customer_id": "YOUR_CUSTOMER_ID"}'
```

A successful `201` response will contain a temporary Identity token and a temporary Authorization token to use in your headers for client-side requests.

```json title="JSON"
{
    "Identity": "TEMP_IDENTITY_TOKEN",
    "Authorization": "TEMP_AUTH_TOKEN"
}
```

### Linking an external account with Bond SDK

Account linking starts a flow to connect an external account through online identity verification and account selection.

#### Account linking using OAuth

> 🚧 **Bond SDK OAuth account linking**
>
> Please note that implementing an OAuth flow via the Bond SDK requires pre-registering a redirectUri with the Bond Support team and requires localStorage access within the user's browser.

Linking external accounts can be done via OAuth with a two-step process.

Please note that implementing an OAuth flow via the Bond SDK requires pre-registering a redirectUri with the Bond Support team and requires localStorage access within the user's browser. When using the Bond SDK, Bond provides the Plaid instance for complete external account linking through Plaid's API. For more details on this redirectUri configuration, see [here](https://plaid.com/docs/link/oauth/).

Initiate the Bond SDK flow in your app with:

```javascript title="JavaScript"
bondExternalAccounts
  .linkAccount({
    customerId: CUSTOMER_ID, // or business_id: BUSINESS_ID
    identity: TEMP_IDENTITY_TOKEN,
    authorization: TEMP_AUTH_TOKEN,
    redirectUri: REGISTERED_REDIRECT_URI,
  })
  .then(data => {
    // code...
  })
  .catch(error => {
    // code...
  });
```

Once the OAuth flow is initiated, the user will be navigated to the selected institution's site to continue the verification process. Upon completion, they will be redirected back to the configured redirectUri.

From this page, the SDK is re-initialized to finalize the account linking process:

```javascript title="JavaScript"
bondExternalAccounts
  .handleOAuthRedirect({
    identity: TEMP_IDENTITY_TOKEN,
    authorization: TEMP_AUTH_TOKEN,
  })
```

#### Account linking without OAuth

Alternatively, a non-OAuth account linking flow can be initiated in one step with:

```javascript title="JavaScript"
bondExternalAccounts
  .linkAccount({
    customerId: CUSTOMER_ID, // or business_id: BUSINESS_ID
    identity: TEMP_IDENTITY_TOKEN,
    authorization: TEMP_AUTH_TOKEN,
  })
```

Once the account linking flow has been initiated, you should see the following view in your app:

![1245](https://files.readme.io/dd55243-Screenshot_2022-12-14_at_1.22.52_PM.png)

Plaid external account linking view in browser sandbox.

For more details, see [Linking external accounts with Plaid](doc:link-an-external-account).

> 📘 **Using the Bond SDK in mobile apps**
>
> Using the Bond SDK in a mobile app can be done by using an in-app browser such as `expo-web-browser`. The Bond SDK does not currently support a Plaid Link configuration for mobile webviews.

### Making micro deposits

The following code is an example of using the SDK to make micro deposits.

```javascript title="JavaScript"
bondExternalAccounts
  .microDeposit({
    accountId: ACCOUNT_ID,
    linkedAccountId: LINKED_ACCOUNT_ID,
    identity: TEMP_IDENTITY_TOKEN,
    authorization: TEMP_AUTH_TOKEN,
  })
  .then(data => {
    // code...
  })
  .catch(error => {
    // code...
  });
```

### Deleting linked external accounts

The following code is an example of using the SDK to delete linked external accounts.

```javascript title="JavaScript"
bondExternalAccounts
  .deleteExternalAccount({
    accountId: "LINKED_ACCOUNT_ID",
    identity: "TEMP_IDENTITY_TOKEN",
    authorization: "TEMP_AUTH_TOKEN",
  })
  .then(data => {
    // code...
  })
  .catch(error => {
    // code...
  });
```


## External account response fields

When retrieving external account information through the SDK, the response includes several fields that provide details about the account. In addition to standard fields such as `bank_name`, `routing_number`, and `account_number`, the following fields are now available:

| Field | Description |
| --- | --- |
| `verification_status` | Indicates the current verification status of the external account. Possible values: <br/> - `pending_automatic_verification` <br/> - `pending_manual_verification` <br/> - `verification_failed` <br/> - `verified` |
| `mask` | The last four digits of the account number, which can be displayed to users for account recognition without exposing the full account number. |

These fields are particularly useful for:

- Displaying account verification status to users in your UI
- Showing a masked account number for account recognition
- Determining if an account is ready for transfers

Example response when retrieving an external account:

```json title="JSON"
{
  "id": "ea-123456789",
  "customer_id": "cus-987654321",
  "type": "checking",
  "status": "active",
  "verification_status": "pending_manual_verification",
  "bank_name": "Example Bank",
  "routing_number": "123456789",
  "account_number": "987654321",
  "mask": "4321",
  "date_updated": "2025-04-20",
  "date_created": "2025-04-19"
}
```

## More information

For a complete specification and interactive examples, see the [Bond SDK repo on GitHub](https://github.com/bond-tech/bond-sdk-web).

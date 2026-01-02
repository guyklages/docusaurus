import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem'; 

# External accounts with Plaid

## Overview

Atelio's platform's API allows you to link a verified external bank account of a customer or business to an Atelio card account. Your customer or business can then transfer funds back and forth between their Atelio and external accounts. Once the link is established, the customer's external account is represented by an `account` object with an `account_id` identifier.

To list and remove external accounts, see [Managing external accounts](https://docs.atelio.com/embedded/docs/link-an-external-account#manage-external-accounts).


## How it works

Brands will use [Plaid Link](https://plaid.com/docs/link/) to enable the customer or business to immediately connect their external bank account to the Atelio platform.

The prerequisite steps required in the process are as follows:

1. Have a [Plaid account](https://dashboard.plaid.com/signup/). In previous external account linking workflows, Atelio managed the Plaid accounts directly; this workflow supports an independent Plaid account
2. Enable Atelio as an [integration](https://dashboard.plaid.com/developers/integrations) for your brand.


## Process flow

Atelio uses processor tokens for external account linking. This requires first generating the processor token for an external account and then using it to add the account to Atelio. You will need the `client_id` and `secret` from your [Plaid dashboard](https://dashboard.plaid.com/developers/keys).

The following steps will largely use Python for code examples. Examples in other languages can be found on Plaid's [token flow](https://plaid.com/docs/api/token) and [processor token](https://plaid.com/docs/api/processors/#processor-token-endpoints) API documentation.

1. [Create](https://docs.atelio.com/embedded/docs/link-an-external-account#create-a-link-token) a Plaid `link_token`.
2. [Launch](https://docs.atelio.com/embedded/docs/link-an-external-account#launch-the-link-plaid-flow) the link Plaid flow on the front end and receive a `public_token` and `account_id`.
3. [Exchange](https://docs.atelio.com/embedded/docs/link-an-external-account#exchange-the-public-token-for-an-access-token) the `public_token` for an `access_token`.
4. [Send](https://docs.atelio.com/embedded/docs/link-an-external-account#send-a-final-request-to-plaid) a final request to Plaid.
5. [Send](https://docs.atelio.com/embedded/docs/link-an-external-account#send-the-processor-token-to-atelio) the processor token to Atelio.

There will be references to a `client` variable which can be initialized like:

Python

```javascript
import plaid
from plaid.api import plaid_api

api_key = {
  'clientId': 'YOUR_CLIENT_ID',
  'secret': 'YOUR_SECRET',
  'plaidVersion' = '2020-09-14'
}

configuration = plaid.Configuration(
  host=plaid.Environment.Sandbox,
  api_key=api_key
)
api_client = plaid.ApiClient(configuration)
client = plaid_api.PlaidApi(api_client)
```

### Create a link token

Generate a Plaid `link_token` For more details, see [Plaid's documentation](https://plaid.com/docs/api/tokens/#linktokencreate).

When creating a link token, you must specify one of the following owner types:

- `business_id` \- For linking accounts to a business.
- `pbb_user_id` \- For Pay by Bank users.
- `customer_id` \- For individual customers.

#### Example Python code

```python
from plaid.model.country_code import CountryCode
from plaid.model.depository_account_subtype import DepositoryAccountSubtype
from plaid.model.depository_account_subtypes import DepositoryAccountSubtypes
from plaid.model.depository_filter import DepositoryFilter
from plaid.model.link_token_account_filters import LinkTokenAccountFilters
from plaid.model.link_token_create_request import LinkTokenCreateRequest
from plaid.model.link_token_create_request_user import LinkTokenCreateRequestUser
from plaid.model.products import Products

request = LinkTokenCreateRequest(
    products=[Products('auth')],
    client_name="Plaid Test App",
    country_codes=[CountryCode('US')],
    redirect_uri='https://domainname.com/oauth-page.html',
    language='en',
    webhook='https://sample-webhook-uri.com',
    link_customization_name='default',
    account_filters=LinkTokenAccountFilters(
        depository=DepositoryFilter(
            account_subtypes=DepositoryAccountSubtypes(
                [DepositoryAccountSubtype('checking'), DepositoryAccountSubtype('savings')]
            )
        )
    ),
    user=LinkTokenCreateRequestUser(
        client_user_id=‘YOUR_CLIENT_ID’
    ),
)

response = client.link_token_create(request).
link_token = response['link_token']
```

### Launch the link Plaid flow

Use the `link_token` to launch the frontend Plaid flow for connecting an account. After the Plaid flow is completed, Plaid returns a `public_token`. More details can be found on [Plaid’s website](https://plaid.com/docs/api/tokens/#itempublic_tokenexchange), including example callback functions. However, in the most basic sense, the JavaScript code may look like:

```javascript
const handler = Plaid.create({
  token: data['link_token'],
  onSuccess: (public_token, metadata) => {
    // Use public_token and metadata.account_id for steps 3 and 4
  },
  onLoad: () => {
  },
  onExit: (err, metadata) => {
  },
  onEvent: (eventName, metadata) => {
  },
  //required for OAuth; if not using OAuth, set to null or omit:
  // receivedRedirectUri: 'http://localhost:3001/oauth-link',
});

handler.open();
```

### Exchange the public token for an access token

Exchange the `public_token` for an `access_token`. For more information, see [Plaid's /processor/token/create](https://plaid.com/docs/api/processors/#processortokencreate).

#### Example Python code

```python
from plaid.model.item_public_token_exchange_request import ItemPublicTokenExchangeRequest

exchange_request = ItemPublicTokenExchangeRequest(public_token=public_token)
exchange_token_response = client.item_public_token_exchange(exchange_request)
access_token = exchange_token_response['access_token']
```

### Send a final request to Plaid

Use the `access_token` to send a final request to Plaid and receive the `processor_token`. For more information, see [Plaid's /processor/token/create](https://plaid.com/docs/api/processors/#processortokencreate).

#### Example Python code

```python
from plaid.model.processor_token_create_request import ProcessorTokenCreateRequest

create_request = ProcessorTokenCreateRequest(
    access_token=access_token,
    account_id=account_id,  # metadata.account_id from step 2
    processor='bond’
)
create_response = client.processor_token_create(create_request)
processor_token = create_response['processor_token']
```

### Send the processor token to Atelio

> 📘 **Note**
>
> If you wish to use a processor token, then it needs to be generated from outside our service.
>
> Also, removing the `access_token` in Plaid will revoke the `processor_token`.

Finally, you will use our API to add the linked account by calling the [CreateAccountUsingProcessorToken](https://docs.atelio.com/embedded/reference/post-accounts-ptoken) endpoint, which takes a payload with the following parameters:

| Parameter         | Required | Description |
| ----------------- | -------- | ----------- |
| `customer_id`     | Yes      | The ID of the customer whose account will be linked.  | 
| `processor_token` | Yes      | Processor token provided by Plaid (`processor_token`) |

Create account using a token:

```curl
curl --request POST \
  --url https://sandbox.atelio.com/api/v0.1/accounts/processor_tokens \
  --header 'Identity: <YOUR_IDENTITY>' \
  --header 'Authorization: <YOUR_AUTHORIZATION>' \
  --header 'Content-Type: application/json' \
  --data '{"processor_token": "processor-sandbox-922e5514-dba6-46e0-be38-4f691aa7888d", "customer_id": "e3dbc230-eba2-482a-95b9-791f5386e4b0"}'
```

The following is an example of a successful `201` JSON response:

```json
{
   "account_id": "5b655bc5-04c9-4e69-bc4a-7c6c57b4febc",
   "date_created": "2023-08-07T19:45:22.596051+00:00",
   "date_updated": "2023-08-07T19:45:22.596058+00:00",
   "customer_id": "e3dbc230-eba2-482a-95b9-791f5386e4b0",
   "status": "active",
   "verification_status": "instantly_verified",
   "type": "external",
   "link_type": "plaid",
   "linked_account_id": "5b655bc5-04c9-4e69-bc4a-7c6c57b4febc"
}
```

If a `422` error code is returned, ensure that Atelio is enabled as an [integration](https://dashboard.plaid.com/developers/integrations).

> ❗️ **Warning**
>
> Do not remove the `access_token` in Plaid, otherwise it will revoke the `processor_token`.


## Update mode for linked accounts

If a user needs to update their linked account (for example, if their credentials have changed or they need to re-authenticate), you can use the update mode functionality. Similar to creating a link token, you must specify one of the following owner types:

- `business_id` \- For updating business-linked accounts.
- `pbb_user_id` \- For updating Pay by Bank user-linked accounts.
- `customer_id` \- For updating individual customer-linked accounts.

You'll also need to provide the `linked_account_id` of the account that needs to be updated.


## Manage external accounts

> 📘 **Note**
>
> To link external accounts, you need to use the v0 APIs.

You can use the Atelio API to effectively manage external accounts, including linking and removing these accounts. .

### Listing linked accounts

To list all external accounts associated with a customer, call GetExternalAccounts and provide the body parameter as shown in the table below.

| Parameter | Type | Description |
| --- | --- | --- |
| `list_full_account` | string | Returns the account and routing numbers for the external account. Options are: <br/> - `true` — returns account and routing number. <br/> - `false` — does not return account and routing number. |

#### Example request

An example of a request to retrieve linked accounts is shown below.

<Tabs>
    <TabItem value="curl" label="cURL" Default>

        ```curl
        curl --request GET \
            --url 'https://sandbox.atelio.com/api/v0.1/accounts/931e2341-c3eb-4681-97d4-f6e09d90da14/external_accounts?list_full_account=true' \
            --header 'Authorization: <YOUR_AUTHORIZATION>' \
            --header 'Identity: <YOUR_IDENTITY>'
        ```
    </TabItem>
    <TabItem value="ruby" label="Ruby">

        ```ruby
        require 'uri'
        require 'net/http'
        require 'openssl'

        url = URI("https://sandbox.atelio.com/api/v0/accounts/931e2341-c3eb-4681-97d4-f6e09d90da14/external_accounts?list_full_account=true")

        http = Net::HTTP.new(url.host, url.port)
        http.use_ssl = true

        request = Net::HTTP::Get.new(url)
        request["Identity"] = '<YOUR_IDENTITY>'
        request["Authorization"] = '<YOUR_AUTHORIZATION>'

        response = http.request(request)
        puts response.read_body
        ```
    </TabItem>
    <TabItem value="javascript" label="JavaScript">
    
        ```javascript
        const options = {
        method: 'GET',
        headers: {Identity: '<YOUR_IDENTITY>', Authorization: '<YOUR_AUTHORIZATION>'}
        };

        fetch('https://sandbox.atelio.com/api/v0/accounts/931e2341-c3eb-4681-97d4-f6e09d90da14/external_accounts?list_full_account=true', options)
        .then(response => response.json())
        .then(response => console.log(response))
        .catch(err => console.error(err));
        ```
    </TabItem>
    <TabItem value="python" label="Python">

        ```python
        import requests

        url = "https://sandbox.atelio.com/api/v0/accounts/931e2341-c3eb-4681-97d4-f6e09d90da14/external_accounts"

        querystring = {"list_full_account":"true"}

        headers = {
            "Identity": "<YOUR_IDENTITY>",
            "Authorization": "<YOUR_AUTHORIZATION>"
        }

        response = requests.request("GET", url, headers=headers, params=querystring)

        print(response.text)
        ```
    </TabItem>
    <TabItem value="csharp" label="C#">

        ```csharp
        var client = new RestClient("https://sandbox.atelio.com/api/v0/accounts/931e2341-c3eb-4681-97d4-f6e09d90da14/external_accounts?list_full_account=true");
        var request = new RestRequest(Method.GET);
        request.AddHeader("Identity", "<YOUR_IDENTITY>");
        request.AddHeader("Authorization", "<YOUR_AUTHORIZATION>");
        IRestResponse response = client.Execute(request);
        ```
    </TabItem>
    <TabItem value="java" label="Java">

        ```java
        OkHttpClient client = new OkHttpClient();

        Request request = new Request.Builder()
        .url("https://sandbox.atelio.com/api/v0/accounts/931e2341-c3eb-4681-97d4-f6e09d90da14/external_accounts?list_full_account=true")
        .get()
        .addHeader("Identity", "<YOUR_IDENTITY>")
        .addHeader("Authorization", "<YOUR_AUTHORIZATION>")
        .build();

        Response response = client.newCall(request).execute();
        ```
    </TabItem>
</Tabs>

#### Example response

The following is an example of a JSON response to a successful request to retrieve information for all linked accounts associated with the `customer_id`. The response now includes a `bank_logo` field that contains the bank's logo in base64-encoded format when available.

```json
[
    {
        "linked_account_id": "f02ad0f9-1945-4cbc-b1b7-0e96b0189842",
        "plaid_access_token": "access-sandbox-04159b72-7e5a-47f1-b2b8-f5a05464332a",
        "customer_id": "0c9d3027-a22c-4653-a341-146fa689eb48",
        "card_id": "edf4905f-2067-465e-b495-ad4f349eb8ae",
        "date_created": "2021-02-11 12:01:36.122439-08",
        "date_updated": "2021-02-11 12:01:36.122456-08",
        "status": "active",
        "verification_status": "instantly_verified",
        "bank_name": "Chase",
        "bank_logo": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAA...",
        "account_number": "2222333344445555",
        "routing_number": "011401533",
        "account_type": "checking",
        "account_category": "depository"
    },
    {
        "linked_account_id": "133f6934-d3b7-4711-8600-0a8119b48c6c",
        "plaid_access_token": "access-sandbox-9a4ac1ee-8d85-464d-bb39-e4a9427008e0",
        "customer_id": "0c9d3027-a22c-4653-a341-146fa689eb48",
        "card_id": "d48c4f5e-a535-4740-829b-ff1c8feb70ea",
        "date_created": "2021-01-13 10:38:07.148335-08",
        "date_updated": "2021-02-09 13:40:32.090811-08",
        "status": "active",
        "verification_status": "instantly_verified",
        "bank_name": "Bank of America",
        "bank_logo": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAA...",
        "account_number": "1111222233330000",
        "routing_number": "011401533",
        "account_type": "savings",
        "account_category": "depository"
    }
]
```

### Remove external accounts

When a customer no longer wants their external bank account to be associated with a Plaid item, you can revoke their Plaid `access_token`.

To revoke an `access_token`, call DeleteExternalAccount and provide the body parameters as shown in the table below.

| Parameter    | Required | Type   | Description |
| ------------ | -------- | ------ | ----------- |
| `account_id` | Yes      | string | Card account ID, for example `9dc86a8a-4c12-4107-84a8-e7cf6a76586f`. |

#### Example request

An example of a request to to remove an external account is shown below.

cURL Ruby JavaScript Python C# Java

```curl
curl --request DELETE \
     --url https://sandbox.atelio.com/api/v0.1/accounts/9dc86a8a-4c12-4107-84a8-e7cf6a76586f \
     --header 'Authorization: <YOUR_AUTHORIZATION>' \
     --header 'Identity: <YOUR_IDENTITY>'
```

```ruby
require 'uri'
require 'net/http'
require 'openssl'

url = URI("https://sandbox.atelio.com/api/v0/accounts/9dc86a8a-4c12-4107-84a8-e7cf6a76586f/external_accounts/8dd4e2de-33be-4bb3-9a19-25069033a5e2")

http = Net::HTTP.new(url.host, url.port)
http.use_ssl = true

request = Net::HTTP::Delete.new(url)
request["Identity"] = '<YOUR_IDENTITY>'
request["Authorization"] = '<YOUR_AUTHORIZATION>'

response = http.request(request)
puts response.read_body
```

```javascript
const options = {
  method: 'DELETE',
  headers: {Identity: '<YOUR_IDENTITY>', Authorization: '<YOUR_AUTHORIZATION>'}
};

fetch('https://sandbox.atelio.com/api/v0/accounts/9dc86a8a-4c12-4107-84a8-e7cf6a76586f/external_accounts/8dd4e2de-33be-4bb3-9a19-25069033a5e2', options)
  .then(response => response.json())
  .then(response => console.log(response))
  .catch(err => console.error(err));
```

```python
import requests

url = "https://sandbox.atelio.com/api/v0/accounts/9dc86a8a-4c12-4107-84a8-e7cf6a76586f/external_accounts/8dd4e2de-33be-4bb3-9a19-25069033a5e2"

headers = {
    "Identity": "<YOUR_IDENTITY>",
    "Authorization": "<YOUR_AUTHORIZATION>"
}

response = requests.request("DELETE", url, headers=headers)

print(response.text)
```

```csharp
var client = new RestClient("https://sandbox.atelio.com/api/v0/accounts/9dc86a8a-4c12-4107-84a8-e7cf6a76586f/external_accounts/8dd4e2de-33be-4bb3-9a19-25069033a5e2");
var request = new RestRequest(Method.DELETE);
request.AddHeader("Identity", "<YOUR_IDENTITY>");
request.AddHeader("Authorization", "<YOUR_AUTHORIZATION>");
IRestResponse response = client.Execute(request);
```

```java
OkHttpClient client = new OkHttpClient();

Request request = new Request.Builder()
  .url("https://sandbox.atelio.com/api/v0/accounts/9dc86a8a-4c12-4107-84a8-e7cf6a76586f/external_accounts/8dd4e2de-33be-4bb3-9a19-25069033a5e2")
  .delete(null)
  .addHeader("Identity", "<YOUR_IDENTITY>")
  .addHeader("Authorization", "<YOUR_AUTHORIZATION>")
  .build();

Response response = client.newCall(request).execute();
```

#### Example response

Once the `access_token` is revoked, Atelio deletes the external account, like the following JSON message:

```json
{
    "deleted_at": "2021-04-01T04:07:53.685055+00:00",
    "date_created": "2021-04-01T04:07:08.598071+00:00",
    "linked_account_id": "13eaf2ec-2b1b-4cd2-ba67-89266be37cb3",
    "account_id": "b7d9ba73-8189-4df3-a550-0c417c693f4a",
    "customer_id": "cfd0bb6e-d0da-4d4e-8e06-819eeb4d0284",
    "bank_name": "Casino Royale",
    "status": "removed"
}
```

**Note:** If the customer wants to reconnect their Atelio card account to this external bank account, the account must be relinked.
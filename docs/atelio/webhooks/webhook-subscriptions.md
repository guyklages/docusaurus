import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# Webhook subscriptions

## Creating a subscription 

To set up an active event subscription, pass a list containing one or more events to the `webhooks` API for which you want to be notified.

To create a subscription, use the `POST /webhooks` operation and provide the parameters as shown in the table below.

| Parameter | Type | Description |
|-----------| --- | --- |
| `url`     | string | URL to which the event should be sent. |
| `description` | string | Freeform description of the webhook's intended use, for example `Jun 28 2021 KYC approved update`. |
| `events`  | array&nbsp;of&nbsp;strings | One or more events to enable.<br/>For a list of events, see [Event types](https://docs.atelio.com/embedded/docs/event-subscriptions#event-types). |
| `version` | string | The version of the webhook event envelope to use. |
| `status`  | string | The status to set of the webhook, either `STATUS_ENABLED` or `STATUS_DISABLED`. |

> 📘 **Note** 
>
> You can also use wildcards when creating webhooks. For example, to refer to all **card** webhooks, use `card*`.

The following is an example of a request to create webhook subscriptions.

<Tabs>
    <TabItem value="curl" label="cURL" default>

        ```curl
        curl --request POST \
            --url https://sandbox.atelio.com/api/v0.1/webhooks \
            --header 'Accept: application/json' \
            --header 'Authorization: <YOUR_AUTHORIZATION>' \
            --header 'Content-Type: application/json' \
            --header 'Identity: <YOUR_IDENTITY>' \
            --data '
        {
            "events": [\
                "card.created",\
                "kyc.verification.success",\
                "kyc.verification.failure",\
                "kyc.verification.error",\
                "kyc.verification.timeout"\
            ],
            "url": "https://hostname.com/webhook/route",
            "description": "KYC state changes.",
            "version": "0.1",
            "status": "STATUS_ENABLED"
        }
        '
        ```
    </TabItem>
    <TabItem value="ruby" label="Ruby">

        ```ruby
        require 'uri'
        require 'net/http'
        require 'openssl'

        url = URI("https://sandbox.atelio.com/api/v0.1/webhooks")

        http = Net::HTTP.new(url.host, url.port)
        http.use_ssl = true

        request = Net::HTTP::Post.new(url)
        request["Accept"] = 'application/json'
        request["Content-Type"] = 'application/json'
        request["Identity"] = '<YOUR_IDENTITY>'
        request["Authorization"] = '<YOUR_AUTHORIZATION>'
        request.body = "{\"events\":[\"card.created\",\"kyc.verification.success\",\"kyc.verification.failure\",\"kyc.verification.error\",\"kyc.verification.timeout\"],\"url\":\"https://hostname.com/webhook/route\",\"description\":\"KYC state changes.\",\"version\":\"0.1\",\"status\":\"STATUS_ENABLED\"}"

        response = http.request(request)
        puts response.read_body
        ```
    </TabItem>
    <TabItem value="javascript" label="JavaScript">

        ```javascript
        const options = {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            Identity: '<YOUR_IDENTITY>',
            Authorization: '<YOUR_AUTHORIZATION>'
        },
        body: JSON.stringify({
            events: [\
            'card.created',\
            'kyc.verification.success',\
            'kyc.verification.failure',\
            'kyc.verification.error',\
            'kyc.verification.timeout'\
            ],
            url: 'https://hostname.com/webhook/route',
            description: 'KYC state changes.',
            version: '0.1',
            status: 'STATUS_ENABLED'
        })
        };

        fetch('https://sandbox.atelio.com/api/v0.1/webhooks', options)
        .then(response => response.json())
        .then(response => console.log(response))
        .catch(err => console.error(err));
        ```
    </TabItem>
    <TabItem value="python" label="Python">

        ```python
        import requests

        url = "https://sandbox.atelio.com/api/v0.1/webhooks"

        payload = {
            "events": ["card.created", "kyc.verification.success", "kyc.verification.failure", "kyc.verification.error", "kyc.verification.timeout"],
            "url": "https://hostname.com/webhook/route",
            "description": "KYC state changes.",
            "version": "0.1",
            "status": "STATUS_ENABLED"
        }
        headers = {
            "Accept": "application/json",
            "Content-Type": "application/json",
            "Identity": "<YOUR_IDENTITY>",
            "Authorization": "<YOUR_AUTHORIZATION>"
        }

        response = requests.post(url, json=payload, headers=headers)

        print(response.text)
        ```
    </TabItem>
    <TabItem value="csharp" label="C#">

        ```csharp
        var client = new RestClient("https://sandbox.atelio.com/api/v0.1/webhooks");
        var request = new RestRequest(Method.POST);
        request.AddHeader("Accept", "application/json");
        request.AddHeader("Content-Type", "application/json");
        request.AddHeader("Identity", "<YOUR_IDENTITY>");
        request.AddHeader("Authorization", "<YOUR_AUTHORIZATION>");
        request.AddParameter("application/json", "{\"events\":[\"card.created\",\"kyc.verification.success\",\"kyc.verification.failure\",\"kyc.verification.error\",\"kyc.verification.timeout\"],\"url\":\"https://hostname.com/webhook/route\",\"description\":\"KYC state changes.\",\"version\":\"0.1\",\"status\":\"STATUS_ENABLED\"}", ParameterType.RequestBody);
        IRestResponse response = client.Execute(request);
        ```
    </TabItem>
    <TabItem value="java" label="Java">

        ```java
        OkHttpClient client = new OkHttpClient();

        MediaType mediaType = MediaType.parse("application/json");
        RequestBody body = RequestBody.create(mediaType, "{\"events\":[\"card.created\",\"kyc.verification.success\",\"kyc.verification.failure\",\"kyc.verification.error\",\"kyc.verification.timeout\"],\"url\":\"https://hostname.com/webhook/route\",\"description\":\"KYC state changes.\",\"version\":\"0.1\",\"status\":\"STATUS_ENABLED\"}");
        Request request = new Request.Builder()
        .url("https://sandbox.atelio.com/api/v0.1/webhooks")
        .post(body)
        .addHeader("Accept", "application/json")
        .addHeader("Content-Type", "application/json")
        .addHeader("Identity", "<YOUR_IDENTITY>")
        .addHeader("Authorization", "<YOUR_AUTHORIZATION>")
        .build();

        Response response = client.newCall(request).execute();
        ```
    </TabItem>
</Tabs>

The following is an example of a response to a successful request to create webhook subscriptions.

JSON

```json
{
  "webhook_subscription": {
    "id": "487a7f29-7b80-467d-b20d-7b60c3a14cf0",
    "url": "https://hostname.com/webhook/route",
    "description": "KYC state changes.",
    "events": [\
      "card.created",\
          "kyc.verification.success",\
          "kyc.verification.failure",\
          "kyc.verification.error",\
          "kyc.verification.timeout"\
    ],
    "version": "0.1",
    "secret": "whsec_ira5jceuzhxxBxoWckAU0hLFQe79bSMZ",
    "status": "STATUS_ENABLED",
    "created_time": "2022-06-09T18:23:37.585421Z",
    "updated_time": "2022-06-09T18:23:37.585421Z"
  }
}
```

The response contains a unique webhook "secret" string, (in this example, `whsec_ira5jceuzhxxBxoWckAU0hLFQe79bSMZ`), that you should store securely. This string is used to [verify the signature](doc:signatures#signature-verification) of requests from the `webhooks` API to the provided callback URL and can be retrieved at any time using the `webhooks` API.

For a complete specification and interactive examples, see [Creating a webhook subscription](ref:post_webhooks).

## Managing subscriptions 

Use the operations shown below to manage webhook subscriptions:

- [Retrieving subscriptions](https://docs.atelio.com/embedded/docs/managing-subscriptions#retrieving-all-subscriptions)
- [Updating a subscription](https://docs.atelio.com/embedded/docs/managing-subscriptions#updating-a-subscription)
- [Removing a subscription](https://docs.atelio.com/embedded/docs/managing-subscriptions#removing-a-subscription)

> 📘 **Note** 
>
> You can also use wildcards when managing webhooks. For example, to refer to all **card** webhooks, use `card*`.

### Retrieving all subscriptions 

To retrieve a list of all webhook subscriptions, use the `GET /webhooks`.

The following is an example of a request to retrieve a list of all subscriptions.

<Tabs>
    <TabItem value="curl" label="cURL" default>

        ```curl
        curl --request GET \
            --url https://sandbox.atelio.com/api/v0.1/webhooks \
            --header 'Authorization: <YOUR_AUTHORIZATION>' \
            --header 'Identity: <YOUR_IDENTITY>'
        ```
    </TabItem>
    <TabItem value="ruby" label="Ruby">

        ```ruby
        require 'uri'
        require 'net/http'
        require 'openssl'

        url = URI("https://sandbox.atelio.com/api/v0.1/webhooks")

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

        fetch('https://sandbox.atelio.com/api/v0.1/webhooks', options)
        .then(response => response.json())
        .then(response => console.log(response))
        .catch(err => console.error(err));
        ```
    </TabItem>
    <TabItem value="python" label="Python">

        ```python
        import requests

        url = "https://sandbox.atelio.com/api/v0.1/webhooks"

        headers = {
            "Identity": "<YOUR_IDENTITY>",
            "Authorization": "<YOUR_AUTHORIZATION>"
        }

        response = requests.get(url, headers=headers)

        print(response.text)
        ```
    </TabItem>
    <TabItem value="csharp" label="C#">

        ```csharp
        var client = new RestClient("https://sandbox.atelio.com/api/v0.1/webhooks");
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
        .url("https://sandbox.atelio.com/api/v0.1/webhooks")
        .get()
        .addHeader("Identity", "<YOUR_IDENTITY>")
        .addHeader("Authorization", "<YOUR_AUTHORIZATION>")
        .build();

        Response response = client.newCall(request).execute();
        ```
    </TabItem>
</Tabs>

> 📘 **Secret string**
>
> The request to retrieve all webhook subscriptions also returns the [secret webhook string](doc:signatures#signature-verification) associated with each subscription in the response.

The following is a response to a successful all-subscriptions request.

```json
{
  "webhook_subscriptions": [
    {
      "id": "487a7f29-7b80-467d-b20d-7b60c3a14cf0",
      "url": "https://hostname.com/webhook/route",
      "description": "Account history is ready.",
      "events": [
        "account.history.ready"
      ],
      "version": "0.1",
      "secret": "string",
      "status": "enabled",
      "created_time": "2022-06-09T18:23:37.585421Z",
      "updated_time": "2022-06-09T18:23:37.585421Z"
    }
  ]
}
```

For a complete specification and interactive examples, see [Retrieving all webhook subscriptions](ref:get_webhooks) in the Bond API reference.

### Updating a subscription 

To update a subscription, use the `PATCH /webhooks/{webhook_id}` operation and provide the body parameters as shown in the table below.

> 📘 **Note**
>
> When you update a `webhook_id`, the list of webhook events that you supply in the API call replaces the existing list associated with that `webhook_id`.

| Parameter | Type | Description |
| --- | --- | --- |
| `url` | string | URL to which the event should be sent, for example, `www.bondjames.com`. |
| `description` | string | Freeform description of the webhook's intended use. |
| `events` | array of strings | One or more events to update.<br/>For a list of events, see [Event types](https://docs.atelio.com/embedded/docs/event-subscriptions#event-types). |
| `version` | string | The version of the webhook event envelope to use. |
| `status` | string | The status to set of the webhook, either `STATUS_ENABLED` or `STATUS_DISABLED`. |

The following is an example of a request to update the webhook ID `40515057-7e8c-4ae1-b8d9-61ea3378cad5` to subscribe to only the `account.history.ready` event.

<Tabs>
    <TabItem value="curl" label="cURL" default>

        ```curl
        curl --request PATCH \
            --url https://sandbox.atelio.com/api/v0.1/webhooks/40515057-7e8c-4ae1-b8d9-61ea3378cad5 \
            --header 'Authorization: <YOUR_AUTHORIZATION>' \
            --header 'Content-Type: application/json' \
            --header 'Identity: <YOUR_IDENTITY>' \
            --data '
        {
            "events": [\
                "account.history.ready"\
            ]
        }
        '
        ```
    </TabItem>
    <TabItem value="ruby" label="Ruby">

        ```ruby
        require 'uri'
        require 'net/http'
        require 'openssl'

        url = URI("https://sandbox.atelio.com/api/v0.1/webhooks/40515057-7e8c-4ae1-b8d9-61ea3378cad5")

        http = Net::HTTP.new(url.host, url.port)
        http.use_ssl = true

        request = Net::HTTP::Patch.new(url)
        request["Content-Type"] = 'application/json'
        request["Identity"] = '<YOUR_IDENTITY>'
        request["Authorization"] = '<YOUR_AUTHORIZATION>'
        request.body = "{\"events\":[\"account.history.ready\"]}"

        response = http.request(request)
        puts response.read_body
        ```
    </TabItem>
    <TabItem value="javascript" label="JavaScript">

        ```javascript
        const options = {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
            Identity: '<YOUR_IDENTITY>',
            Authorization: '<YOUR_AUTHORIZATION>'
        },
        body: JSON.stringify({events: ['account.history.ready']})
        };

        fetch('https://sandbox.atelio.com/api/v0.1/webhooks/40515057-7e8c-4ae1-b8d9-61ea3378cad5', options)
        .then(response => response.json())
        .then(response => console.log(response))
        .catch(err => console.error(err));
        ```
    </TabItem>
    <TabItem value="python" label="Python">

        ```python
        import requests

        url = "https://sandbox.atelio.com/api/v0.1/webhooks/40515057-7e8c-4ae1-b8d9-61ea3378cad5"

        payload = {"events": ["account.history.ready"]}
        headers = {
            "Content-Type": "application/json",
            "Identity": "<YOUR_IDENTITY>",
            "Authorization": "<YOUR_AUTHORIZATION>"
        }

        response = requests.patch(url, json=payload, headers=headers)

        print(response.text)
        ```
    </TabItem>
    <TabItem value="csharp" label="C#">

        ```csharp
        var client = new RestClient("https://sandbox.atelio.com/api/v0.1/webhooks/40515057-7e8c-4ae1-b8d9-61ea3378cad5");
        var request = new RestRequest(Method.PATCH);
        request.AddHeader("Content-Type", "application/json");
        request.AddHeader("Identity", "<YOUR_IDENTITY>");
        request.AddHeader("Authorization", "<YOUR_AUTHORIZATION>");
        request.AddParameter("application/json", "{\"events\":[\"account.history.ready\"]}", ParameterType.RequestBody);
        IRestResponse response = client.Execute(request);
        ```
    </TabItem>
    <TabItem value="java" label="Java">

        ```java
        OkHttpClient client = new OkHttpClient();

        MediaType mediaType = MediaType.parse("application/json");
        RequestBody body = RequestBody.create(mediaType, "{\"events\":[\"account.history.ready\"]}");
        Request request = new Request.Builder()
        .url("https://sandbox.atelio.com/api/v0.1/webhooks/40515057-7e8c-4ae1-b8d9-61ea3378cad5")
        .patch(body)
        .addHeader("Content-Type", "application/json")
        .addHeader("Identity", "<YOUR_IDENTITY>")
        .addHeader("Authorization", "<YOUR_AUTHORIZATION>")
        .build();

        Response response = client.newCall(request).execute();
        ```
    </TabItem>
</Tabs>

The following is a response to a successful subscription update request.

JSON

```json
{
  "webhook_subscription": {
    "id": "487a7f29-7b80-467d-b20d-7b60c3a14cf0",
    "url": "https://hostname.com/webhook/route",
    "description": "Account history is ready.",
    "events": [\
      "account.history.ready"\
    ],
    "version": "0.1",
    "secret": "whsec_ira5jceuzhxxBxoWckAU0hLFQe79bSMZ",
    "status": "STATUS_ENABLED",
    "created_time": "2022-06-09T18:23:37.585421Z",
    "updated_time": "2022-06-09T18:23:37.585421Z"
  }
}
```

For a complete specification and interactive examples, see [Updating a webhook subscription](ref:patch_webhooks) in the Atelio API reference.

### Removing a subscription

To remove an event subscription, use the `DELETE /webhooks/{webhook_id}` operation with no further parameters.

The following is an example of a request to remove the webhook subscription ID `40515057-7e8c-4ae1-b8d9-61ea3378cad5`.

<Tabs>
    <TabItem value="curl" label="cURL" default>

        ```curl
        curl --request DELETE \
            --url https://sandbox.atelio.com/api/v0.1/webhooks/webhook_id \
            --header 'Authorization: <YOUR_AUTHORIZATION>' \
            --header 'Identity: <YOUR_IDENTITY>'
        ```
    </TabItem>
    <TabItem value="ruby" label="Ruby">

        ```ruby
        require 'uri'
        require 'net/http'
        require 'openssl'

        url = URI("https://sandbox.atelio.com/api/v0.1/webhooks/webhook_id")

        http = Net::HTTP.new(url.host, url.port)
        http.use_ssl = true

        request = Net::HTTP::Delete.new(url)
        request["Identity"] = '<YOUR_IDENTITY>'
        request["Authorization"] = '<YOUR_AUTHORIZATION>'

        response = http.request(request)
        puts response.read_body
        ```
    </TabItem>
    <TabItem value="javascript" label="Javascript">

        ```javascript
        const options = {
        method: 'DELETE',
        headers: {Identity: '<YOUR_IDENTITY>', Authorization: '<YOUR_AUTHORIZATION>'}
        };

        fetch('https://sandbox.atelio.com/api/v0.1/webhooks/webhook_id', options)
        .then(response => response.json())
        .then(response => console.log(response))
        .catch(err => console.error(err));
        ```
    </TabItem>
    <TabItem value="python" label="Python">

        ```python
        import requests

        url = "https://sandbox.atelio.com/api/v0.1/webhooks/webhook_id"

        headers = {
            "Identity": "<YOUR_IDENTITY>",
            "Authorization": "<YOUR_AUTHORIZATION>"
        }

        response = requests.delete(url, headers=headers)

        print(response.text)
        ```
    </TabItem>
    <TabItem value="csharp" label="C#">

        ```csharp
        var client = new RestClient("https://sandbox.atelio.com/api/v0.1/webhooks/webhook_id");
        var request = new RestRequest(Method.DELETE);
        request.AddHeader("Identity", "<YOUR_IDENTITY>");
        request.AddHeader("Authorization", "<YOUR_AUTHORIZATION>");
        IRestResponse response = client.Execute(request);
        ```
    </TabItem>
    <TabItem value="java" label="Java">

        ```java
        OkHttpClient client = new OkHttpClient();

        Request request = new Request.Builder()
        .url("https://sandbox.atelio.com/api/v0.1/webhooks/webhook_id")
        .delete(null)
        .addHeader("Identity", "<YOUR_IDENTITY>")
        .addHeader("Authorization", "<YOUR_AUTHORIZATION>")
        .build();

        Response response = client.newCall(request).execute();
        ```
    </TabItem>
</Tabs>

The following is an example of a successful response to a subscription removal request.

JSON

```json
{
  "webhook_subscription": {
    "id": "487a7f29-7b80-467d-b20d-7b60c3a14cf0",
    "url": "https://hostname.com/webhook/route",
    "description": "Account history is ready.",
    "events": [\
      "account.history.ready"\
    ],
    "version": "0.1",
    "secret": "whsec_ira5jceuzhxxBxoWckAU0hLFQe79bSMZ",
    "status": "STATUS_ENABLED",
    "created_time": "2022-06-09T18:23:37.585421Z",
    "updated_time": "2022-06-09T18:23:37.585421Z"
  }
}
```

For a complete specification and interactive examples, see [Deleting a webhook subscription](ref:delete_webhooks) in the Atelio API reference.

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# Quickstart



## Overview

Regardless of which Atelio product you want to set up, you'll need to create an API key first.

## Creating an API key

To create an API key, do the following:

1. [Create an API key](https://docs.atelio.com/embedded/docs/quickstart#create-an-api-key)
2. [Save your API keys](https://docs.atelio.com/embedded/docs/quickstart#save-your-api-keys)
3. [Verify an API key](https://docs.atelio.com/embedded/docs/quickstart#verify-an-api-key)

### Create an API Key

Depending on your product, either log in or create an account:

| Products | Actions |
| --- | --- |
| Accounts, Cards, Pay by Bank | [Log in](https://atelio.com/) or [create an account](https://signup.atelio.com/) . |
| Identity - COMING SOON | Log in or create an account. |

Once you login, navigate to the **Developers** page. Select the **Create API key** button and name your key.

> 📘 **Naming restrictions**
>
> - At least three characters
> - No more than 128 characters
> - Must not contain any of the following characters: `/ \ ^ ( ) ? ! + $ . , * -` or spaces

### Save your API keys 

After creating your Identity key, a pop-up displays two keys:

- Authorization
- Identity

For each key, select the **Copy** button and paste it somewhere on your local machine that's easy for you to remember.

> 🚧 **Warning**
>
> If you lose the Authorization key, it can't be retrieved. Make sure to store a copy in a safe place.

You can view and deactivate your keys from the following pages:

| Products | Links |
| --- | --- |
| Accounts, Cards, Pay by Bank | [API Keys](https://portal.atelio.com/developers/api-keys) |
| Identity - COMING SOON | API Keys |

### Verify an API Key

You can verify your API key, by using the `GET auth/key/IDENTITY` endpoint.

Include your identity and authorization information in the request header.

A successful request returns a `200` response code with your key's non-secret data.

<Tabs>
    <TabItem value="curl" label="cURL" default>

        ```curl
        curl --location --request GET 'https://sandbox.atelio.com/api/v0.1/auth/key/<YOUR_IDENTITY>' \
        --header 'Identity: <YOUR_IDENTITY>' \
        --header 'Authorization: <YOUR_AUTHORIZATION>'
        ```  
    </TabItem>
    <TabItem value="python" label="Python">

        ```python
        import requests

        url = "https://sandbox.atelio.com/api/v0.1/auth/key/<YOUR_IDENTITY>"

        payload = {}
        headers = {
        'Identity': '<YOUR_IDENTITY>',
        'Authorization': '<YOUR_AUTHORIZATION>'
        }

        response = requests.request("GET", url, headers=headers, data = payload)
        ```
    </TabItem>
    <TabItem value="ruby" label="Ruby">
        ```ruby
        require "uri"
        require "net/http"

        url = URI("https://sandbox.atelio.com/api/v0.1/auth/key/<YOUR_IDENTITY>")

        https = Net::HTTP.new(url.host, url.port);
        https.use_ssl = true

        request = Net::HTTP::Get.new(url)
        request["Identity"] = "<YOUR_IDENTITY>"
        request["Authorization"] = "<YOUR_AUTHORIZATION>"

        response = https.request(request)
        ```
    </TabItem>
    <TabItem value="javascript" label="JavaScript">
        ```javascript
        const data = null;

        const xhr = new XMLHttpRequest();

        xhr.addEventListener("readystatechange", function () {
        if (this.readyState === this.DONE) {
            console.log(this.responseText);
        }
        });

        xhr.open("GET", "https://sandbox.atelio.com/api/v0.1/auth/key/<YOUR_IDENTITY>");
        xhr.setRequestHeader("Identity", <YOUR_IDENTITY>);
        xhr.setRequestHeader("Authorization", <YOUR_AUTHORIZATION>);

        xhr.send(data);
        ```
    </TabItem>
    <TabItem value="csharp" label="C#">
        ```csharp
        var client = new RestClient("https://sandbox.atelio.com/api/v0.1/auth/key/<YOUR_IDENTITY>");
        var request = new RestRequest(Method.GET);
        request.AddHeader("identity", <YOUR_IDENTITY>);
        request.AddHeader("authorization", <YOUR_AUTHORIZATION>);
        IRestResponse response = client.Execute(request);
        ```
    </TabItem>
    <TabItem value="java" label="Java">
        ```java
        OkHttpClient client = new OkHttpClient();

        Request request = new Request.Builder()
        .url("https://sandbox.atelio.com/api/v0.1/auth/key/<YOUR_IDENTITY>")
        .get()
        .addHeader("identity", <YOUR_IDENTITY>)
        .addHeader("authorization", <YOUR_AUTHORIZATION>)
        .build();

        Response response = client.newCall(request).execute();
        ```
    </TabItem>
</Tabs>


## Next steps

After creating and verifying an API key, your next step depends on which product you're using:

| For product | Next step |
| --- | --- |
| - Cards<br/>- Accounts | [Creating a customer](https://docs.atelio.com/embedded/docs/create-a-customer-2) |
| - Identity | [Creating a flow](https://docs.atelio.com/embedded/docs/atelio-identity-portal) |
| - Pay by Bank | [Set up payments](https://docs.atelio.com/embedded/docs/pay-by-bank-payments) |


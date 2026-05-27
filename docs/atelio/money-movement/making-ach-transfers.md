import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem'; 

# Making ACH transfers

## Introduction

To execute an internal transfer, use the `POST /transfers` endpoint and provide the body parameters as shown in the following table.

[▶ Run in Postman](https://www.postman.com/bond-technologies/workspace/bond-api)

| Parameter         | Required  | Type   | Description |
| ----------------- | --------- | ------ | ----------- |
| `account_id`      | Yes       | string | Bond account UUID (36 characters) for the transfer destination account, for example `6f0e7dcb-6073-42df-bf02-ce71bd5fac3b`.<br/>Use the `external_account_id`. |
| `ach_class_code`  | Yes       | string | ACH [SEC](https://docs.bond.tech/v0/docs/loading-funds#ach-standard-entry-class-codes) code. |
| `ach_description` | Yes       | string | Freeform, alphanumeric description (maximum 10 characters) of the ACH transfer. Describes the purpose of the transfer and is displayed on the receiver's account statement. |
| `ach_direction`   | Yes       | string | ACH transfer direction of the money movement. Valid values are `debit` or `credit`.<br/>The direction is in reference to the funds at the receiving account. An ACH `debit` "pulls" funds to the originating account, debiting the receiver. An ACH `credit` "pushes" funds from the originator to the receiver, crediting the receiver. |
| `ach_network`     | Yes       | string | ACH transfer network. Either `ach` or `same-day-ach` |
| `amount`          | Yes       | string | Transfer amount as a decimal string with two digits of precision, for example `175.00`.<br/>Currently only USD is supported. |
| `origination_account_id` | Yes | string | Bond account UUID (36 characters) for the originating account, for example `6f0e7dcb-6073-42df-bf02-ce71bd5fac3b`.<br/>Use the `card_account_id`. |
| `type`            | Yes       | string | The type of transfer being initiated. Use `ach`. |

> 📘 **Note**
>
> The Transfers endpoint is idempotent and repeated requests using the same `Idempotency-Key` within a 24 hour period will fail.

## Example request

The following is an example of a request to transfer $175.00.


<Tabs>
    <TabItem value="curl" label="cURL">

        ```curl
        curl --request POST \
            --url https://sandbox.bond.tech/api/v0/transfers \
            --header 'Accept: application/json' \
            --header 'Authorization: <YOUR_AUTHORIZATION>' \
            --header 'Content-Type: application/json' \
            --data '
        {
            "type": "ach",
            "amount": "175.00",
            "origination_account_id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
            "account_id": "9dc86a8a-4c12-4107-84a8-e7cf6a76586f",
            "ach_class_code": "WEB",
            "ach_direction": "credit",
            "ach_network": "ach",
            "ach_description": "GIFT"
        }'
        ```
    </TabItem>
    <TabItem value="csharp" label="C#">

        ```csharp
        var client = new RestClient("https://sandbox.bond.tech/api/v0/transfers");
        var request = new RestRequest(Method.POST);
        request.AddHeader("Accept", "application/json");
        request.AddHeader("Content-Type", "application/json");
        request.AddHeader("Authorization", "<YOUR_AUTHORIZATION>");
        request.AddParameter("application/json", "{\"type\":\"ach\",\"amount\":\"175.00\",\"origination_account_id\":\"3fa85f64-5717-4562-b3fc-2c963f66afa6\",\"account_id\":\"9dc86a8a-4c12-4107-84a8-e7cf6a76586f\",\"ach_class_code\":\"CIE\",\"ach_direction\":\"credit\",\"ach_network\":\"ach\",\"ach_description\":\"GIFT\"}", ParameterType.RequestBody);
        IRestResponse response = client.Execute(request);
        ```
    </TabItem>
    <TabItem value="java" label="Java">

        ```java
        OkHttpClient client = new OkHttpClient();

        MediaType mediaType = MediaType.parse("application/json");
        RequestBody body = RequestBody.create(mediaType, "{\"type\":\"ach\",\"amount\":\"175.00\",\"origination_account_id\":\"3fa85f64-5717-4562-b3fc-2c963f66afa6\",\"account_id\":\"9dc86a8a-4c12-4107-84a8-e7cf6a76586f\",\"ach_class_code\":\"CIE\",\"ach_direction\":\"credit\",\"ach_network\":\"ach\",\"ach_description\":\"GIFT\"}");
        Request request = new Request.Builder()
        .url("https://sandbox.bond.tech/api/v0/transfers")
        .post(body)
        .addHeader("Accept", "application/json")
        .addHeader("Content-Type", "application/json")
        .addHeader("Authorization", "<YOUR_AUTHORIZATION>")
        .build();

        Response response = client.newCall(request).execute();
        ```
    </TabItem>
    <TabItem value="javascript" label="JavaScript">

        ```javascript
        const options = {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            Authorization: '<YOUR_AUTHORIZATION>'
        },
        body: JSON.stringify({
            type: 'ach',
            amount: '175.00',
            origination_account_id: '3fa85f64-5717-4562-b3fc-2c963f66afa6',
            account_id: '9dc86a8a-4c12-4107-84a8-e7cf6a76586f',
            ach_class_code: 'CIE',
            ach_direction: 'credit',
            ach_network: 'ach',
            ach_description: 'GIFT'
        })
        };

        fetch('https://sandbox.bond.tech/api/v0/transfers', options)
        .then(response => response.json())
        .then(response => console.log(response))
        .catch(err => console.error(err));
        ```
    </TabItem>
    <TabItem value="python" label="Python">

        ```python
        import requests

        url = "https://sandbox.bond.tech/api/v0/transfers"

        payload = {
            "type": "ach",
            "amount": "175.00",
            "origination_account_id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
            "account_id": "9dc86a8a-4c12-4107-84a8-e7cf6a76586f",
            "ach_class_code": "CIE",
            "ach_direction": "credit",
            "ach_network": "ach",
            "ach_description": "GIFT"
        }
        headers = {
            "Accept": "application/json",
            "Content-Type": "application/json",
            "Authorization": "<YOUR_AUTHORIZATION>"
        }

        response = requests.request("POST", url, json=payload, headers=headers)

        print(response.text)
        ```
    </TabItem>
    <TabItem value="ruby" label="Ruby">

        ```ruby
        require 'uri'
        require 'net/http'
        require 'openssl'

        url = URI("https://sandbox.bond.tech/api/v0/transfers")

        http = Net::HTTP.new(url.host, url.port)
        http.use_ssl = true

        request = Net::HTTP::Post.new(url)
        request["Accept"] = 'application/json'
        request["Content-Type"] = 'application/json'
        request["Authorization"] = '<YOUR_AUTHORIZATION>'
        request.body = "{\"type\":\"ach\",\"amount\":\"175.00\",\"origination_account_id\":\"3fa85f64-5717-4562-b3fc-2c963f66afa6\",\"account_id\":\"9dc86a8a-4c12-4107-84a8-e7cf6a76586f\",\"ach_class_code\":\"CIE\",\"ach_direction\":\"credit\",\"ach_network\":\"ach\",\"ach_description\":\"GIFT\"}"

        response = http.request(request)
        puts response.read_body
        ```
    </TabItem>
</Tabs>

## Example response

The response shown below includes the unique `transfer_id` representing the transfer. Note that the transfer `amount` is expressed as a decimal string in cents.

```json title="JSON"
{
  "date_created": "2020-10-09T17:14:09.686688",
  "transfer_id": "4ead6cdc-77eb-45fa-9959-3f166385a60a",
  "origination_account_id": "6f0e7dcb-6073-42df-bf02-ce71bd5fac3b",
  "account_id": "225641a5-f6e4-4ae1-b5e0-326e6b98842e",
  "type": "ach",
  "ach_direction": "credit",
  "ach_class_code": "WEB",
  "ach_network": "ach",
  "ach_description": "GIFT",
  "status": "pending",
  "ach_return_code": null,
  "failure_reason": null,
  "amount_in_cents": "17500",
  "iso_currency_code": "USD"
}
```

A successful request results in a `completed` status.

For a complete specification with interactive examples, see [Creating a transfer](https://docs.bond.tech/v0/reference/post_transfers) in the Atelio API Reference.

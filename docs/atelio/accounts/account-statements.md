import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem'; 

# Account statements

## Overview

Atelio allows you to build your own statements with our Statement Data API. These statements are built within our account-centric architecture, which ensures that as a transaction is settled, it is immediately grouped into your next statement.

Since reporting requirements and data vary between deposit account statements and credit account statements, we offer data for both. If your account type is `deposit` or is `security_deposit`, you receive deposit account statement data; if the account type is `credit` you receive the credit account statement data.

| Statements | Endpoints |
| --- | --- |
| Build | [build compliant deposit account statements](https://docs.atelio.com/embedded/docs/deposit-account-statements) for your end users. |
| Retrieve | \- [GetStatementData](https://docs.atelio.com/embedded/reference/get-statements-yyyy-mm) \- retrieve the statement data for an account by year and month. <br/> \- [GetAllStatements:](https://docs.atelio.com/embedded/reference/get-statements) \- retrieve all statements for a specific account by ID. |
| Regenerate | \- [Statement Regeneration](https://docs.atelio.com/embedded/docs/statement-regeneration) \- learn about scenarios where statements may need to be regenerated and how to handle them. |


## Build Statements

Atelio provides APIs that allow you to create compliant statements for your end users with ease. In this guide, you'll learn how to use Atelio's APIs and statement templates to build and customize statements for your users.

### Before you start

To create a statement, you'll need:

- The `account_id` for the account you want to create it for.
- The [GetAccounts](https://docs.atelio.com/embedded/reference/get-accounts) endpoint to retrieve the `account_id`.

To create a credit application, you'll need:

- The customer ID of the customer you want to create it for.
- The [RetrieveCustomer](https://docs.atelio.com/embedded/reference/get_customers_id) endpoint to get the `customer_id` using their `brand_person_id`.

### Integration flow

To create statements for your users, do the following steps:

1. [Gather statement data](https://docs.atelio.com/embedded/docs/account-statements#gather-statement-data)
2. [Get disclosures](https://docs.atelio.com/embedded/docs/account-statements#get-disclosures)
3. [Build a template](https://docs.atelio.com/embedded/docs/account-statements#build-a-template)
4. [Substitute template values](https://docs.atelio.com/embedded/docs/account-statements#substitute-template-values)
5. [Distribute the statement](https://docs.atelio.com/embedded/docs/account-statements#distribute-the-statement)

After completing these steps, you'll have compliant statements ready to distribute to your end users.

### Gather statement data

First, you'll want to gather the necessary statement data. This requires the following endpoints:

- [GetStatement](https://docs.atelio.com/embedded/reference/get-statements-yyyy-mm): Retrieves the statement by year and month by `account_id`.
- [GetCustomer](https://docs.atelio.com/embedded/reference/get_customers_id): Retrieves a customer by `customer_id`.
- [GetAccount](https://docs.atelio.com/embedded/reference/get-accounts-by-id): Retrieves an account by `account_id`

#### Get statement

> 📘 **Get statement calls**
>
> For this API call, the statement month you use for the `{mm}` path variable is the month the statement period **started**, not ended. The value will depend on whether the statement period ends before or at the end of the month.
>
> As an example, for the statement ending EOD on July 27th 2022 for account with ID `057c6074-a02d-4a5a-bad9-bbc64b047df7`, you would use `06` as the month value:
>
> `/accounts/057c6074-a02d-4a5a-bad9-bbc64b047df7/statements/2022/06`
>
> However, if the statement coincides with the end of the month, such as EOD on July 31st 2022, the statement period will begin on July 1st 2022, and the month value would be `07`:
>
> `/accounts/057c6074-a02d-4a5a-bad9-bbc64b047df7/statements/2022/07`

First, call [GetStatement](https://docs.atelio.com/embedded/reference/get-statements-yyyy-mm) to retrieve the statement for the billing month and customer information to print on the statement. The following request retrieves statement data for the statement ending on February 20th, 2022.

#### Example request

```curl title="cURL"
curl --request GET \
     --url https://sandbox.atelio.com/api/v0.1/accounts/057c6074-a02d-4a5a-bad9-bbc64b047df7/statements/2022/02 \
     --header 'accept: application/json'
```

#### Example responses

We'll reference the response to this API call as `statement_response`.

The `statement_response` will depend on the account type (deposit or credit), as shown below:

Deposit statement `responseCredit` statement response:

```json title="JSON"
{
  "statement_id": "c11fc6d8-9865-45b7-b3de-583257abe33e",
  "account_id": "654dc482-96f9-4012-b2e3-fb73a5a17c97",
  "statement_month": "2022-02",
  "type": "deposit",
  "statement_start_date": "2022-01-21",
  "statement_end_date": "2022-02-20",
  "fees": 0,
  "transactions": [
    {
      "transaction_date": "2022-02-13",
      "settled_date": "2022-02-13",
      "amount": 1458,
      "transaction_description": "atm fee",
      "transaction_type": "Fee"
    }
  ],
  "deposit": {
    "beginning_balance": 1000057,
    "withdrawals": 20057,
    "deposits": 325000,
    "ending_balance": 1305000
  }
}
```

Credit statement `responseCredit` statement response:

```json title="JSON"
{
  "statement_id": "38677cf1-6f3f-4c5b-96dc-77d0bc724eda",
  "account_id": "654dc482-96f9-4012-b2e3-fb73a5a17c97",
  "statement_month": "2022-02",
  "type": "credit",
  "statement_start_date": "2022-01-21",
  "statement_end_date": "2022-02-20",
  "fees": 0,
  "transactions": [
    {
      "transaction_id": "c6671a52-f942-4a3b-99ce-d98496c1f6d3",
      "transaction_date": "2022-02-13",
      "settled_date": "2022-02-13",
      "amount": 1458,
      "transaction_description": "Amazon LLC",
      "transaction_type": "Purchase"
    }
  ],
  "credit": {
    "payment_due_date": "2022-03-15",
    "previous_balance": 78515,
    "new_balance": 850,
    "available_credit": 150,
    "credit_limit": 1000,
    "minimum_payment_due": 35,
    "interest_charged": 0,
    "purchases": 850,
    "payments_and_credits": 247
  }
}
```

#### Get customer information

Next, call [GetCustomer](https://docs.atelio.com/embedded/docs/get_customers_id) to retrieve the customer's information to include in the statement disclosures from Atelio's Operations and Compliance team. We'll reference the response to this API call as `customer_response`. A sample `customer_response` is shown below:

Customer response:

```json title="JSON"
{
  "customer_id": "8559dec0-2edb-4c3c-a3c5-32de10174c34",
  "brand_person_id": "7b18da9e-0217-4ecb-8454-8c0ab8bedc14",
  "atelio_brand_id": "e2b37ab8-5e6e-4538-bbe0-35121b481845",
  "date_created": "2020-10-26T21:48:57.287919",
  "dob": "1997-12-25",
  "first_name": "James",
  "middle_name": "Herbert",
  "last_name": "Atelio",
  "ssn": "XXX-XX-6789",
  "phone": "650-123-4567",
  "email": "james@mi6.gov.uk",
  "kyc_requests_available": 3,
  "addresses": [
    {
      "address_id": "9e8241d2-ac5e-41c6-8b38-b3fe44387266",
      "address_type": "PHYSICAL",
      "street": "345 California St.",
      "street2": "Suite 600",
      "city": "San Francisco",
      "state": "CA",
      "zip_code": "94104-2657",
      "country": "US",
      "is_primary": true,
      "date_created": "2020-10-26T21:48:57.287919"
    },
    {
      "address_id": "242c459e-6bd5-4158-89ee-550f0bdd133d",
      "address_type": "MAILING",
      "street": "111 Lake Tahoe Rd.",
      "street2": "",
      "city": "San Francisco",
      "state": "CA",
      "zip_code": "12345",
      "country": "US",
      "is_primary": false,
      "date_created": "2020-10-26T21:48:57.287919"
    }
  ]
}
```

#### Retrieve account details

Next, call [GetAccount](https://docs.atelio.com/embedded/reference/get-accounts-by-id) to get the account details to include in the statement. We'll reference the response to this API call as `account_response`. 

The following are example JSON messages of the `account_response` for the different account types:

<Tabs>
    <TabItem value="depo" label="Deposit Account">

        ```json
        {
        "account_id": "057c6074-a02d-4a5a-bad9-bbc64b047df7",
        "date_updated": "2020-08-16T19:39:34Z",
        "date_created": "2020-08-15T19:39:34Z",
        "program_id": "e242686d-3bb7-4543-8438-0aa682e14696",
        "customer_id": "1114ae62-5fe1-4b21-b4fb-f2b158d8e21e",
        "type": "deposit",
        "status": "active",
        "description": "string",
        "routing_number": "547897762",
        "account_number": "574771265",
        "balance": {
            "current_balance": 1000,
            "available_balance": 950,
            "previous_statement_balance": 17312,
            "currency": "USD"
        },
        "cards": [
            "7c45101a-82de-49e5-b01d-50151b54312d"
        ],
        "deposit": {}
        }
        ```
    </TabItem>
    <TabItem value="cred" label="Credit Account">

        ```json
        {
        "account_id": "057c6074-a02d-4a5a-bad9-bbc64b047df7",
        "date_updated": "2020-08-16T19:39:34Z",
        "date_created": "2020-08-15T19:39:34Z",
        "customer_id": "1114ae62-5fe1-4b21-b4fb-f2b158d8e21e",
        "type": "credit",
        "status": "active",
        "balance": {
            "current_balance": 45412,
            "available_balance": 48312,
            "previous_statement_balance": 17312,
            "currency": "USD"
        },
        "program_id": "232e9951-e03a-47b2-9c9a-64ec0c02b69f",
        "description": "",
        "routing_number": "547897762",
        "account_number": "574771265",
        "cards": [\
            "5145b38c-2d63-46be-bb68-3815d50ae4a6"\
        ],
        "credit": {
            "credit_limit": 1000,
            "security_deposit_account_id": "3abc7efb-5827-48bb-8931-be6fe08f905c",
            "statement": {
            "close_date": "2020-08-05",
            "balance": 187575
            },
            "apr": {
            "purchase": 11.99,
            "cash_advance": 19.99,
            "penalty": 2.99,
            "balance_transfer": 14.99
            },
            "payment": {
            "due_date": "2020-08-05",
            "minimum_payment_percent": 9.99,
            "minimun_payment": 35
            }
        }
        }
        ```
    </TabItem>
    <TabItem value="sda" label="Security Deposit Account">

        ```json
        {
        "account_id": "057c6074-a02d-4a5a-bad9-bbc64b047df7",
        "date_updated": "2020-08-16T19:39:34Z",
        "date_created": "2020-08-15T19:39:34Z",
        "customer_id": "1114ae62-5fe1-4b21-b4fb-f2b158d8e21e",
        "type": "credit",
        "status": "active",
        "balance": {
            "current_balance": 45412,
            "available_balance": 48312,
            "previous_statement_balance": 17312,
            "currency": "USD"
        },
        "program_id": "232e9951-e03a-47b2-9c9a-64ec0c02b69f",
        "description": "",
        "routing_number": "547897762",
        "account_number": "574771265",
        "cards": [\
            "5145b38c-2d63-46be-bb68-3815d50ae4a6"\
        ],
        "credit": {
            "credit_limit": 1000,
            "security_deposit_account_id": "3abc7efb-5827-48bb-8931-be6fe08f905c",
            "statement": {
            "close_date": "2020-08-05",
            "balance": 187575
            },
            "apr": {
            "purchase": 11.99,
            "cash_advance": 19.99,
            "penalty": 2.99,
            "balance_transfer": 14.99
            },
            "payment": {
            "due_date": "2020-08-05",
            "minimum_payment_percent": 9.99,
            "minimun_payment": 35
            }
        }
        }
        ```
    </TabItem>
</Tabs>

> 📘 **Bulk API Calls**
>
> If you are making bulk API calls to our services at the end of a month to create statements for all your users, you will need to limit your request frequency in order to avoid being rate-limited by our APIs.
>
> **Atelio's global rate limit across all your API calls is 1000 API calls per minute**, so you should aim to stay very well below that as you're executing bulk API requests to pull data for statements.

### Get disclosures

Statements for consumer programs are required to contain certain disclosures to inform your users of specific rights. Depending on your program, your disclosures may be different. Contact your Atelio operations point-of-contact to get the relevant disclosures for your program.

### Build a template

By providing you with the data you need to create your statements, we allow you to customize and style your statements to match the branding of your product. However, we encourage you to start with the example HTML templates below, so that you can ensure that it fits the basic structure that is expected from compliant statements.

**Example credit statement**:

Credit statement template

```html title="HTML"
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8">
    <title>Monthly Account Statement</title>
  </head>
  <body>
    <h1>Monthly Account Statement</h1>
    <h2>Account Summary</h2>
    <p>$customer_name</p>
    <p>$customer_address</p>
    <h4>Summary of Account Activity</h4>
    <p>Previous balance: $previous_balance</p>
    <p>Payments and Credits: $payments_and_credits</p>
    <p>Purchases: $purchases</p>
    <p>Fees: $fees</p>
    <p>New balance as of $end_date: $new_balance</p>
    <h4>Credit Limit</h4>
    <p>Credit Limit: $credit_limit</p>
    <p>Available Credit: $available_credit</p>
    <p>Statement Start Date: $start_date</p>
    <p>Statement Closing Date: $end_date</p>
    <h4>Payment Information</h4>
    <p>New balance as of $end_date: $new_balance</p>
    <p>Payment Due: $payment_due</p>
    <p>Payment Due Date: $payment_due_date</p>
    <p><b>Late Payment Warning</b>: If we do not receive your payment by the date listed above, you may have to pay a late fee of up to $late_fee</p>
    <h4>Questions?</h4>
    <p>Call Customer Service: $customer_service_number</p>
    <p>Lost or Stolen Credit Card: $lost_stolen_number</p>
    <hr>
    <p>$bank_address</p>
    <p>Account Number: $account_number</p>
    <p>New Balance: $new_balance</p>
    <p>Minimum Payment Due: $new_balance</p>
    <p>Payment Due Date: $payment_due_date</p>
    <p>AMOUNT ENCLOSED: </p>
    <div style='border: 1px solid #000; padding: 20px'></div>
    <p>Please send billing inquiries and correspondence to: $billing_inquiry_address </p>
    <h4>Your rights</h4>
    INSERT YOUR RIGHTS SECTION
    <hr>
    <p>Billing period: $start_date - $end_date</p>
    <table>
      <tr>
        <th>Transactions</th>
      </tr>
      <tr>
        <th>Transaction Date</th>
        <th>Posted Date</th>
        <th>Description</th>
        <th>Amount</th>
      </tr>
      $transaction_rows
    </table>
  </body>
</html>
```

**Example deposit account statement:**

Deposit statement template

```html title="HTML"
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8">
    <title>Monthly Account Statement</title>
  </head>
  <body>
    <h1>Monthly Account Statement</h1>
    <h2>Account Summary</h2>
    <p>$customer_name</p>
    <p>$customer_address</p>
    <h4>Summary of Account Activity</h4>
    <p>Previous balance: $previous_balance</p>
    <p>Payments and Credits: $payments_and_credits</p>
    <p>Purchases: $purchases</p>
    <p>Fees: $fees</p>
    <p>New balance as of $end_date: $new_balance</p>
    <h4>Questions?</h4>
    <p>Call Customer Service: $customer_service_number</p>
    <p>Lost or Stolen Credit Card: $lost_stolen_number</p>
    <hr>
    <p>Please send billing inquiries and correspondence to: $billing_inquiry_address </p>
    <h4>Your rights</h4>
    INSERT YOUR RIGHTS SECTION
    <hr>
    <p>Statement period: $start_date - $end_date</p>
    <table>
      <tr>
        <th>Transactions</th>
      </tr>
      <tr>
        <th>Transaction Date</th>
        <th>Posted Date</th>
        <th>Description</th>
        <th>Amount</th>
      </tr>
      $transaction_rows
    </table>
  </body>
</html>
```

### Substitute template values

Once you have a statement that's ready for your users, you can substitute values into your statement based on the statement data you retrieved earlier.

In addition to the data you retrieved earlier in `statement_response`, `customer_response`, and `account_response`, note that there are also the following static values common across all statements:

- `customer_service_number`: The general customer service number end-users should use for your program
- `lost_stolen_number`: The number end-users should use for for lost/stolen cards

Below is an example of substituting data into the template and converting into a PDF.

> 📘 **Note**
>
> For security purposes, the script below masks the account numbers provided in the `account_response` before substitution into the HTML statement template. It is important to do this for every statement, as `account_response` uses full account numbers.

```python title="Python"
from string import Template

template = t = Template(template_str)
statement_str = t.substitute(
    previous_balance=statement_response['data'][0]['credit']['previous_balance'],
    payments_and_credits=statement_response['data'][0]['credit']['payments_and_credits'],
    purchases=statement_response['data'][0]['credit']['purchases'],
    fees=statement_response['data'][0]['fees'],
    start_date=statement_response['data'][0]['statement_start_date'],
    end_date=statement_response['data'][0]['statement_end_date'],
    new_balance=statement_response['data'][0]['credit']['new_balance'],
    credit_limit=statement_response['data'][0]['credit']['credit_limit'],
    available_credit=statement_response['data'][0]['credit']['available_credit'],
    payment_due=statement_response['data'][0]['credit']['new_balance'],
    payment_due_date=statement_response['data'][0]['credit']['payment_due_date'],
    account_number=f'XXXXXXXXXXX{account_response['data'][0]['account_number'][:-4]}',
    late_fee=your_late_fee,
    customer_service_number=customer_service_number,
    lost_stolen_number=lost_stolen_number,
    bank_address=bank_address.replace('\n', '<br/>'),
    billing_inquiry_address=billing_inquiry_address,
    transaction_rows=''.join([f'''<tr>\
        <td>{tx['transaction_date']}</td>\
        <td>{tx['settled_date']}</td>\
        <td>{tx['transaction_description']}</td>\
        <td>{tx['amount']}</td>\
    </tr>''' for tx in statement_response['data'][0]['transactions']])
)

import pdfkit
pdfkit.from_string(statement,'example_statement.pdf')
```

### Distribute the statement

Once the statement PDF has been constructed, you can deliver it via email after the close date of the payment period is completed. You'll be expected to deliver the statement to the end-user within 2 calendar days of the statement data being made available (i.e. within two days of the statement end date).

> 📘 **Statement Regeneration**
>
> In some cases, statements may need to be regenerated due to data processing issues or other factors. For information on handling statement regeneration scenarios, see [Statement Regeneration](https://docs.atelio.com/embedded/docs/statement-regeneration).

## Retrieve deposit account statement data

To retrieve a statement for a single account, use the [GetStatement](https://docs.atelio.com/embedded/reference/get-statements-yyyy-mm) endpoint and provide the parameters as shown in the table below.

| Parameter | Required | Type   | Description |
| --------- | -------- | ------ | ----------- |
| `year`    | Yes      | string | Year for which to retrieve data, for example `2022`. |
| `month`   | Yes      | string | Month for which to retrieve data, for example, `09`. |

The following request retrieves data for a single month

cURLRubyPythonJavaScriptC#Java
<Tabs>
    <TabItem value="curl" label="cURL">

        ```curl
        curl --request GET \
            --url https://sandbox.atelio.com/api/v0.1/accounts/c11fc6d8-9865-45b7-b3de-583257abe33e/statements/2022/09 \
            --header 'Accept: application/json' \
            --header 'Authorization: YOUR-AUTHENTICATION' \
            --header 'Identity: <YOUR_IDENTITY>'
        ```
    </TabItem>
    <TabItem value="ruby" label="Ruby">

        ```ruby
        require 'uri'
        require 'net/http'
        require 'openssl'

        url = URI("https://sandbox.atelio.com/api/v0.1/accounts/c11fc6d8-9865-45b7-b3de-583257abe33e/statements/2022/09")

        http = Net::HTTP.new(url.host, url.port)
        http.use_ssl = true

        request = Net::HTTP::Get.new(url)
        request["Accept"] = 'application/json'
        request["Identity"] = '<YOUR_IDENTITY>'
        request["Authorization"] = 'YOUR-AUTHENTICATION'

        response = http.request(request)
        puts response.read_body
        ```
    </TabItem>
    <TabItem value="python" label="Python">

        ```python
        import requests

        url = "https://sandbox.atelio.com/api/v0.1/accounts/c11fc6d8-9865-45b7-b3de-583257abe33e/statements/2022/09"

        headers = {
            "Accept": "application/json",
            "Identity": "<YOUR_IDENTITY>",
            "Authorization": "YOUR-AUTHENTICATION"
        }

        response = requests.get(url, headers=headers)

        print(response.text)
        ```
    </TabItem>
    <TabItem value="javascript" label="JavaScript">

        ```javascript
        const options = {
        method: 'GET',
        headers: {
            Accept: 'application/json',
            Identity: '<YOUR_IDENTITY>',
            Authorization: 'YOUR-AUTHENTICATION'
        }
        };

        fetch('https://sandbox.atelio.com/api/v0.1/accounts/c11fc6d8-9865-45b7-b3de-583257abe33e/statements/2022/09', options)
        .then(response => response.json())
        .then(response => console.log(response))
        .catch(err => console.error(err));
        ```
    </TabItem>
    <TabItem value="csharp" label="C#">

        ```csharp
        var client = new RestClient("https://sandbox.atelio.com/api/v0.1/accounts/c11fc6d8-9865-45b7-b3de-583257abe33e/statements/2022/09");
        var request = new RestRequest(Method.GET);
        request.AddHeader("Accept", "application/json");
        request.AddHeader("Identity", "<YOUR_IDENTITY>");
        request.AddHeader("Authorization", "YOUR-AUTHENTICATION");
        IRestResponse response = client.Execute(request);
        ```
    </TabItem>
    <TabItem value="java" label="Java">

    ```java
    OkHttpClient client = new OkHttpClient();

    Request request = new Request.Builder()
    .url("https://sandbox.atelio.com/api/v0.1/accounts/c11fc6d8-9865-45b7-b3de-583257abe33e/statements/2022/09")
    .get()
    .addHeader("Accept", "application/json")
    .addHeader("Identity", "<YOUR_IDENTITY>")
    .addHeader("Authorization", "YOUR-AUTHENTICATION")
    .build();

    Response response = client.newCall(request).execute();
    ```
    </TabItem>
</Tabs>

Upon success, Atelio returns `200` status with the statement details.

```json title="JSON"
{
  "statement_id": "c11fc6d8-9865-45b7-b3de-583257abe33e",
  "account_id": "654dc482-96f9-4012-b2e3-fb73a5a17c97",
  "statement_month": "2022-02",
  "type": "deposit",
  "statement_start_date": "2022-01-21",
  "statement_end_date": "2022-02-20",
  "fees": 0,
  "transactions": [
    {
      "transaction_id": "cea15fcb-48dd-4c3d-a0d5-564ea360c6c9",
      "transaction_date": "2022-02-13",
      "settled_date": "2022-02-13",
      "amount": 1458,
      "transaction_description": "atm fee",
      "transaction_type": "Fee"
    }
  ],
  "deposit": {
    "beginning_balance": 1000057,
    "withdrawals": 20057,
    "deposits": 325000,
    "ending_balance": 1305000
  }
}
```

The response is composed of two parts:

- General statement attributes
- Statement-type-specific data

The general attribute descriptions are listed in the following table:

| Attribute                                | Description |
| ---------------------------------------- | ----------- |
| `account_id`                             | UUID that identifies the customer's Brand account. In this case, it is a deposit account ID. |
| `fees`                                   | The total amount of fees paid during the statement period. |
| `type`                                   | The type of statement, either `deposit` or `credit`. |
| `statement_id`                           | UUID of the statement. |
| `statement_month`                        | The month of the statement, for example `09`. |
| `statement_end_date`                     | The end date for the statement period, for example `2022-01-21`. |
| `statement_start_date`                   | The beginning date for the statement period, for example `2022-01-21`. |
| | |
| `transactions[].amount`                  | Transaction amount in cents, for example `6599`. |
| `transactions[].settled_date`            | Date the transaction settled. for example `2022-02-13`. |
| `transactions[].transaction_date`        | Date the transaction occurred, for example `2022-02-13`. |
| `transactions[].transaction_description` | Description for the transaction, for example `atm fee`. |
| `transactions[].transaction_id`          | UUID of the transaction, for example `cea15fcb-48dd-4c3d-a0d5-564ea360c6c9`. |
| `transactions[].transaction_type`        | The transaction type, for example `Fee`. |

The attributes specific to a deposit account are listed in the following table:

| Attribute                   | Description |
| --------------------------- | ----------- |
| `deposit.beginning_balance` | The balance at the beginning of the statement period. |
| `deposit.deposits`          | All deposits to this account during the payment period. |
| `deposit.ending_balance`    | The account balance at the end of the statement period. |
| `deposit.withdrawals`       | All withdrawals from this account during the payment period. |

### Retrieve all statements for an account

To retrieve all statements for a single account, call the [GetStatements](https://docs.atelio.com/embedded/reference/get-statements) endpoint and provide the parameters as shown in the table below.

| Parameter         | Type   | Description |
| ----------------- | ------ | ----------- |
| `ending_before`   | string | UUID of the last statement to end at, for example, `c11fc6d8-9865-45b7-b3de-583257abe33e`. |
| `limit`           | string | Maximum number of statements to retrieve. |
| `starting_before` | string | UUID of the first statement to start at, for example, `1b8c7986-bd5a-4923-9d62-fe3a3671f891`. |

An example of a successful request for multiple statements for an account is shown below.

cURLRubyPythonJavaScriptC#Java

<Tabs>
    <TabItem value="curl" label="cURL">

        ```curl
        curl --request GET \
            --url 'https://sandbox.atelio.com/api/v0.1/accounts/c11fc6d8-9865-45b7-b3de-583257abe33e/statements?starting_after=1b8c7986-bd5a-4923-9d62-fe3a3671f891&ending_before=e3cbfb61-61f3-4ec7-a82d-622c45c641a3&limit=10' \
            --header 'Accept: application/json' \
            --header 'Authorization: YOUR-AUTHENTICATION' \
            --header 'Identity: <YOUR_IDENTITY>'
        ```
    </TabItem>
    <TabItem value="ruby" label="Ruby">

        ```ruby
        require 'uri'
        require 'net/http'
        require 'openssl'

        url = URI("https://sandbox.atelio.com/api/v0.1/accounts/c11fc6d8-9865-45b7-b3de-583257abe33e/statements?starting_after=1b8c7986-bd5a-4923-9d62-fe3a3671f891&ending_before=e3cbfb61-61f3-4ec7-a82d-622c45c641a3&limit=10")

        http = Net::HTTP.new(url.host, url.port)
        http.use_ssl = true

        request = Net::HTTP::Get.new(url)
        request["Accept"] = 'application/json'
        request["Identity"] = '<YOUR_IDENTITY>'
        request["Authorization"] = 'YOUR-AUTHENTICATION'

        response = http.request(request)
        puts response.read_body
        ```
    </TabItem>
    <TabItem value="python" label="Python">

        ```python
        import requests

        url = "https://sandbox.atelio.com/api/v0.1/accounts/c11fc6d8-9865-45b7-b3de-583257abe33e/statements?starting_after=1b8c7986-bd5a-4923-9d62-fe3a3671f891&ending_before=e3cbfb61-61f3-4ec7-a82d-622c45c641a3&limit=10"

        headers = {
            "Accept": "application/json",
            "Identity": "<YOUR_IDENTITY>",
            "Authorization": "YOUR-AUTHENTICATION"
        }

        response = requests.get(url, headers=headers)

        print(response.text)
        ```
    </TabItem>
    <TabItem value="javascript" label="JaveScript">

        ```javascript
        const options = {
        method: 'GET',
        headers: {
            Accept: 'application/json',
            Identity: '<YOUR_IDENTITY>',
            Authorization: 'YOUR-AUTHENTICATION'
        }
        };

        fetch('https://sandbox.atelio.com/api/v0.1/accounts/c11fc6d8-9865-45b7-b3de-583257abe33e/statements?starting_after=1b8c7986-bd5a-4923-9d62-fe3a3671f891&ending_before=e3cbfb61-61f3-4ec7-a82d-622c45c641a3&limit=10', options)
        .then(response => response.json())
        .then(response => console.log(response))
        .catch(err => console.error(err));
        ```
    </TabItem>
    <TabItem value="csharp" label="C#">

        ```csharp
        var client = new RestClient("https://sandbox.atelio.com/api/v0.1/accounts/c11fc6d8-9865-45b7-b3de-583257abe33e/statements?starting_after=1b8c7986-bd5a-4923-9d62-fe3a3671f891&ending_before=e3cbfb61-61f3-4ec7-a82d-622c45c641a3&limit=10");
        var request = new RestRequest(Method.GET);
        request.AddHeader("Accept", "application/json");
        request.AddHeader("Identity", "<YOUR_IDENTITY>");
        request.AddHeader("Authorization", "YOUR-AUTHENTICATION");
        IRestResponse response = client.Execute(request);
        ```
    </TabItem>
    <TabItem value="java" label="Java">

        ```java
        OkHttpClient client = new OkHttpClient();

        Request request = new Request.Builder()
        .url("https://sandbox.atelio.com/api/v0.1/accounts/c11fc6d8-9865-45b7-b3de-583257abe33e/statements?starting_after=1b8c7986-bd5a-4923-9d62-fe3a3671f891&ending_before=e3cbfb61-61f3-4ec7-a82d-622c45c641a3&limit=10")
        .get()
        .addHeader("Accept", "application/json")
        .addHeader("Identity", "<YOUR_IDENTITY>")
        .addHeader("Authorization", "YOUR-AUTHENTICATION")
        .build();

        Response response = client.newCall(request).execute();
        ```
    </TabItem>
</Tabs>

Upon success, the API returns a `200` response with the statement details, such as the following example:

```json title="JSON"
{
  "page": 1,
  "pages": 1,
  "count": 1,
  "next_page": 0,
  "data": [
    {
      "statement_id": "c11fc6d8-9865-45b7-b3de-583257abe33e",
      "statement_month": "2022-02",
      "type": "deposit",
      "statement_start_date": "2022-01-21",
      "statement_end_date": "2022-02-20",
      "fees": 0,
      "transactions": [
        {
          "transaction_id": "e3cbfb61-61f3-4ec7-a82d-622c45c641a3",
          "transaction_date": "2022-02-13",
          "settled_date": "2022-02-13",
          "amount": 1458,
          "transaction_description": "atm fee",
          "transaction_type": "Fee"
        }
      ],
      "deposit": {
        "beginning_balance": 1000057,
        "withdrawals": 20057,
        "deposits": 325000,
        "ending_balance": 1305000
      }
    }
  ]
}
```

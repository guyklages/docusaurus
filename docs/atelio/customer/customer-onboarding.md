# Customer onboarding


## Overview

Every consumer that is issued a financial product on Atelio's platform must have a corresponding customer object. This customer object stores crucial information about the consumer, such as their name, address, and other sensitive details that are required for regulatory compliance.

### Supported operations

You can use the Customer API endpoints to perform the following operations to create and manage customers on the Atelio platform.

- [Manage customers](https://docs.atelio.com/embedded/docs/customer-onboarding#manage-customers)
- [Retrieve customers](https://docs.atelio.com/embedded/docs/customer-onboarding#retrieve-customers)
- [Fraud operations](https://docs.atelio.com/embedded/docs/customer-onboarding#fraud-operations)


## Manage customers

Use the operations below to manage customers:

- [Create a Customer](https://docs.atelio.com/embedded/docs/customer-onboarding#create-a-customer): Creates an individual customer.
- [Delete a Customer](https://docs.atelio.com/embedded/docs/customer-onboarding#delete-a-customer): Deletes an individual customer.
- [Update a Customer](https://docs.atelio.com/embedded/docs/customer-onboarding#update-a-customer): Updates a customer's information.

### Create a customer

The first thing your customer will need to do is submit their details, such as their name and address in your onboarding flow. After your customer enters this information, you'll see that a Customer resource has been created. This Customer resource gives you a way to reference and call customer accounts, and to facilitate account management.

#### `customer` object

To create an instance of a customer object, use the [CreateCustomer](https://docs.atelio.com/embedded/reference/post_customers) operation and provide the parameters as shown in the table below.

| Parameter     | Required | Type   | Description |
| ------------- | -------- | ------ | ----------- |
| `dob`         | Yes      | date   | Birthday in `YYYY-MM-DD` format. |
| `first_name`  | Yes      | string | First name, between 2 and 50 characters. Must start with a letter and can only be letters, spaces, and apostrophes. |
| `middle_name` |          | string | Middle name, between 2 and 50 characters. Must start with a letter and can only be letters, spaces, and apostrophes. |
| `last_name`   |          | string | Last name, between 2 and 50 characters. Must start with a letter and can only be letters, spaces, and apostrophes. |
| `ssn`         |          | string | Unique Social Security Number associated with the customer |
| `phone`       |          | string | User's phone number. Must be only numbers or dash-separated. |
| `phone_country_code` |   | string | Country dialing code. Between one and three digits. |
| `email`       |          | string | User's valid email address. |
| `addresses`   | At least one primary address | array | Array of objects detailing the physical or mailing addresses (see `address` Object table below). |

#### `addresses` object

The `addresses` array within the Customer object has the following structure.

| Parameter      | Required | Type   | Description |
| -------------- | -------- | ------ | ----------- |
| `address_type` | Yes      | string | Either `MAILING` or `PHYSICAL`. |
| `street`       | Yes      | string | Freeform name between 1 and 40 characters. May contain only alphanumeric and these special characters `. , _ - #` |
| `street2`      |          | string | Freeform name maximum 40 characters. |
| `city`         | Yes      | string | City name, freeform between 2 and 40 characters. |
| `state`        | Yes      | string | Two-character US state code. Non-US state code maximum 20 characters. |
| `zip_code`     | Yes      | string | Five-digit or nine-digit U.S. zip code in the `#####-####` format.<br/>Non-U.S. state code between 2 and 20 characters. |
| `country`      | Yes      | string | ISO 3166-1 alpha-2 country code, maximum two characters. |
| `is_primary`   | Yes      | boolean | Is this the primary address; either `true` or `false`. |

An example of a request to create a customer is shown below.

**Example request**

CreateCustomer

```
curl --request POST \
     --url https://sandbox.atelio.com/api/v0.1/customers/ \
     --header 'Accept: application/json' \
     --header 'Authorization: YOUR-AUTHENTICATION' \
     --header 'Content-Type: application/json' \
     --header 'Identity: YOUR-IDENTITY' \
     --data '
{
     "addresses": [
          {
               "address_type": "MAILING",
               "street": "345 California Ave.",
               "street2": "Suite 600",
               "city": "San Francisco",
               "state": "CA",
               "zip_code": "12345-1234",
               "country": "US",
               "is_primary": true
          }
     ],
     "email": "james@mi6.gov.uk",
     "dob": "1997-12-25",
     "first_name": "James",
     "last_name": "Bond",
     "ssn": "XXX-XX-9999",
     "phone": "555-111-2222",
     "phone_country_code": "1"
}
'
```

#### Example response

The JSON response contains all the information related to the newly created customer. It includes the `customer_id`, which is a unique Atelio platform identifier for your customer. The `customer_id` is used in subsequent API calls to retrieve and update customers and to issue [cards](https://docs.atelio.com/embedded/docs/secured-charge-card-overview). The following is an example of a response to a successful request to create a customer.

```json
{
  "customer_id": "b3f7f6c9-503e-4457-b0ca-31f65131cfff",
  "brand_person_id": "ac6ee2d3-5a03-4043-a4aa-dda51836b9fd",
  "bond_brand_id": "8c7e08c8-0320-444c-b834-007cd9e18c0e",
  "business_id": "null",
  "dob": "1997-12-25",
  "first_name": "James",
  "middle_name": "Herbert",
  "last_name": "Bond",
  "ssn": "XXX-XX-9999",
  "phone": "555-111-2222",
  "phone_country_code": "1",
  "email": "james@mi6.gov.uk",
  "addresses": [
    {
      "address_id": "5ff2a5f8-2d96-4c89-9edc-ec762ac3844c",
      "address_type": "MAILING",
      "street": "345 California Ave.",
      "street2": "Suite 600",
      "city": "San Francisco",
      "state": "CA",
      "zip_code": "12345-1234",
      "country": "US",
      "is_primary": true,
      "date_created": "2021-10-11T17:54:26.784367+00:00",
      "deliverability": "deliverable"
    }
  ],
  "date_created": "2021-06-02T13:38:27.965404+00:00"
}
```

#### Trying to create a customer with a missing field

If you try to create a customer with a missing field, you receive a JSON error message such as the following.

JSON

```
{
       'Message': {'last_name': ['Missing data for required field.']},
       'Status': 400,
       'Code': 'create_customer_schema',0
       'Type': 'Request Error'
}
```

### Delete a customer

To delete a customer, use the [Delete Customer](https://docs.atelio.com/embedded/reference/delete_customers) operation with no other parameters, as in the following example.

**Example request**

DeleteCustomer

```
curl --request DELETE \
     --url https://sandbox.atelio.com/api/v0.1/customers/931e2341-c3eb-4681-97d4-f6e09d90da14 \
     --header 'Authorization: YOUR-AUTHORIZATION' \
     --header 'Identity: YOUR-IDENTITY'
```

If the request is successful, you receive the following response:

`Customer resource deleted`

### Update a customer

Most customer details can't be updated after they've passed KYC (which is a part of a successful credit application submission) as the new information needs to be verified before any update can occur.

> 📘 **Note**
>
> Only `email_address`, `phone_number`, and secondary address can be updated after a customer has passed KYC.

Other fields require additional information to be confirmed. If you need to update information for a customer that has passed KYC, contact Atelio directly.

To update a customer that has not yet passed KYC, use the [Update Customer](https://docs.atelio.com/embedded/reference/patch_customers) endpoint and provide the relevant, optional parameters that you want to update, as in the following table.

| Parameter     | Required | Type   | Description |
| ------------- | -------- | ------ | ----------- |
| `dob`         |          | date   | Birthday in YYYY-MM-DD format, for example `1994-03-20`. |
| `first_name`  |          | string | First name, between 2 and 50 characters. Must start with a letter and can only be letters, spaces, and apostrophes. |
| `middle_name` |          | string | Middle name, between 2 and 50 characters. Must start with a letter and can only be letters, spaces, and apostrophes. |
| `last_name`   |          | string | Last name, between 2 and 50 characters. Must start with a letter and can only be letters, spaces, and apostrophes. |
| `ssn`         |          | string | Unique Social Security Number associated with the customer |
| `phone`       |          | string | User's phone number. Must be only numbers or hyphens. |
| `phone_country_code` |   | string | Country dialing code. Between one and three digits. |
| `email`       |          | string | User's email address. |
| `addresses`   | At least one primary address | array | Array of object(s) detailing the physical or mailing addresses (see `address` Object table below). |

The `addresses` array within `customer_id` has the following structure.

| Parameter      | Required | Type   | Description |
| -------------- | -------- | ------ | ----------- |
| `address_type` | Yes      | string | Either `MAILING` or `PHYSICAL`. |
| `street`       | Yes      | string | Freeform name between 1 and 40 characters. May contain only alphanumeric and these special characters `. , _ - #` |
| `street2`      |          | string | Freeform name maximum 40 characters. |
| `city`         | Yes      | string | City name, freeform between 2 and 40 characters. |
| `state`        | Yes      | string | Two-character US state code. Non-US state code maximum 20 characters. |
| `zip_code`     | Yes      | string | Five-digit or nine-digit U.S. zip code in the `#####-####` format.<br/>Non-U.S. state code between 2 and 20 characters. |
| `country`      | Yes      | string | ISO 3166-1 alpha-2 country code, maximum two characters. |
| `is_primary`   | Yes      | boolean | Is this the primary address; either `true` or `false`. |

An example of a request to update a customer's `state` is shown below.

**Example request**

UpdateCustomer

```
curl --request PATCH \
     --url https://sandbox.atelio.com/api/v0.1/customers/5fec3f30-dc2e-4b20-9e07-53c31400bbe3 \
     --header 'Accept: application/json' \
     --header 'Authorization: YOUR-AUTHENTICATION' \
     --header 'Content-Type: application/json' \
     --header 'Identity: YOUR-IDENTITY' \
     --data '
{
     "addresses": [
          {
               "address_type": "PHYSICAL",
               "street": "345 California Ave.",
               "street2": "Suite 600",
               "city": "San Francisco",
               "state": "CA",
               "zip_code": "12345-1234",
               "country": "US",
               "is_primary": true
          }
     ],
     "dob": "1997-12-25",
     "first_name": "James",
     "last_name": "Bond",
     "middle_name": "Herbert",
     "ssn": "XXX-XX-9999",
     "phone": "555-111-2222",
     "phone_country_code": "1",
     "email": "james@mi6.gov.uk"
}
'
```

**Example response**

The following is an example of a response to a successful request to update a customer.

JSON

```
{
       "customer_id":"931e2341-c3eb-4681-97d4-f6e09d90da14",
       "bond_brand_id":"e0cb152c-51dc-44b0-af3c-5c68341068da",
       "brand_person_id":"8dd4e2de-33be-4bb3-9a19-25069033a5e2",
       "date_created":"2021-02-11T13:26:50.553841+00:00"
       "dob":"1961-03-03",
       "first_name":"sam",
       "middle_name":"amazed",
       "last_name":"McKorkindale",
       "kyc_requests_available":3,
       "addresses":[...]
}
```

## Retrieve customers

Use the Customer API to retrieve customers using optional query parameters or a single customer by their `customer_id`.

To retrieve all customers, use the [Get All Customers](https://docs.atelio.com/embedded/reference/get_customers) operation and provide the optional query parameters from the following table.

| Query parameter | Type | Description |
| --- | --- | --- |
| `page` | int32 | The required page number to return. |
| `per_page` | int32 | Number of customers to return per page. One of: `1`, `2`, `5`, `10`, `20`, `50` |

The following is an example of a request to retrieve all customers.

**Example request**

GetAllCustomers

```
curl --request GET \
     --url 'https://sandbox.atelio.com/api/v0.1/customers?page=1&per_page=20' \
     --header 'Accept: application/json' \
     --header 'Authorization: YOUR-AUTHENTICATION' \
     --header 'Identity: YOUR-IDENTITY'
```

**Example response**

The following JSON is an example of a response to a successful request to retrieve all customers.

```json
[
  {
    "customer_id": "8559dec0-2edb-4c3c-a3c5-32de10174c34",
    "brand_person_id": "7b18da9e-0217-4ecb-8454-8c0ab8bedc14",
    "bond_brand_id": "e2b37ab8-5e6e-4538-bbe0-35121b481845",
    "date_created": "2020-10-26T21:48:57.287919",
    "dob": "1997-12-25",
    "first_name": "James",
    "middle_name": "Herbert",
    "last_name": "Bond",
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
        "deliverability": "deliverable",
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
        "deliverability": "undeliverable",
        "date_created": "2020-10-26T21:48:57.287919"
      }
    ]
  },
  {
    "customer_id": "3cf29100-4396-4c90-b4b0-6edfeca0ee3f",
    "brand_person_id": "1ea85e01-c35f-4675-9f74-e39fa877bc53",
    "bond_brand_id": "e2b37ab8-5e6e-4538-bbe0-35121b481845",
    "date_created": "2020-10-27T22:48:57.287919",
    "dob": "1997-12-25",
    "first_name": "Christine",
    "middle_name": "J",
    "last_name": "Smith",
    "ssn": "XXX-XX-6789",
    "phone": "650-124-4567",
    "email": "james@mi6.gov.uk",
    "addresses": [
      {
        "address_id": "acf383d1-8510-47ed-ad28-0ca72f33bc33",
        "address_type": "PHYSICAL",
        "street": "345 California St.",
        "street2": "",
        "city": "San Francisco",
        "state": "CA",
        "zip_code": "94104-2657",
        "country": "US",
        "is_primary": true,
        "deliverability": "deliverable_missing_unit",
        "date_created": "2020-10-27T22:48:57.287919"
      },
      {
        "address_id": "47dc4547-b306-4f49-94c4-4ad89cbb9dac",
        "address_type": "MAILING",
        "street": "111 Lake Tahoe Rd.",
        "street2": "",
        "city": "San Francisco",
        "state": "CA",
        "zip_code": "12345",
        "country": "US",
        "is_primary": false,
        "deliverability": "undeliverable",
        "date_created": "2020-10-27T22:48:57.287919"
      }
    ]
  }
]
```

### Retrieve a single customer

To retrieve a single customer, use the Get Customer endpoint with no other parameters, as shown in the example below.

**Example request**

GetCustomer

```
curl --request GET \
     --url https://sandbox.atelio.com/api/v0.1/customers/931e2341-c3eb-4681-97d4-f6e09d90da14 \
     --header 'Authorization: YOUR-AUTHORIZATION' \
     --header 'Identity: YOUR-IDENTITY'
```

**Example response**

The following is an example of a response to a successful request to retrieve a customer.

JSON

```
{
  "customer_id": "8559dec0-2edb-4c3c-a3c5-32de10174c34",
  "brand_person_id": "7b18da9e-0217-4ecb-8454-8c0ab8bedc14",
  "bond_brand_id": "e2b37ab8-5e6e-4538-bbe0-35121b481845",
  "date_created": "2020-10-26T21:48:57.287919",
  "dob": "1997-12-25",
  "first_name": "James",
  "middle_name": "Herbert",
  "last_name": "Bond",
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
      "deliverability": "deliverable",
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
      "deliverability": "undeliverable",
      "date_created": "2020-10-26T21:48:57.287919"
    }
  ]
}
```

## Customer-program relationships

When a customer undergoes KYC verification, a relationship is automatically created between the customer and the program. This relationship is tracked in the platform and ensures that customers are properly associated with the specific programs they're enrolled in. Each customer can be associated with multiple programs, and these associations are maintained throughout the customer lifecycle.

The customer-program relationship is established during:

- KYC verification process
- Credit application submission
- Other program enrollment processes

This relationship is important for regulatory compliance and ensures proper tracking of which customers are participating in which programs.

## Fraud operations

In cases where you need to manage customer accounts due to suspected fraud or security concerns, Atelio provides API endpoints for freezing, unfreezing, and closing customer accounts. These operations can be performed on individual customers or in bulk for multiple customers simultaneously.

### Freeze customer accounts

When suspicious activity is detected, you can freeze a customer's accounts to prevent further transactions until the situation is resolved.

cURL

```
curl --request POST \
  --url https://sandbox.atelio.com/api/v0.1/customers/freeze \
  --header 'Accept: application/json' \
  --header 'Authorization: <YOUR_AUTHORIZATION>' \
  --header 'Content-Type: application/json' \
  --header 'Identity: <YOUR_IDENTITY>' \
  --data '{
    "requested_by": "fraud.analyst@yourcompany.com",
    "customer_ids": ["123e4567-e89b-12d3-a456-426614174000"],
    "comments": "Suspicious transaction pattern detected",
    "source": "Fraud Detection System"
  }'
```

### Unfreeze customer accounts

After resolving fraud concerns, you can unfreeze customer accounts to restore normal functionality.

**Example request**

UnfreezeCustomer

```
curl --request POST \
  --url https://sandbox.atelio.com/api/v0.1/internal/accounts/unfreeze/bulk \
  --header 'Accept: application/json' \
  --header 'Authorization: <YOUR_AUTHORIZATION>' \
  --header 'Content-Type: application/json' \
  --header 'Identity: <YOUR_IDENTITY>' \
  --data '{
    "requested_by": "customer.service@yourcompany.com",
    "customer_ids": ["123e4567-e89b-12d3-a456-426614174000"],
    "comments": "Customer identity verified, false positive",
    "source": "Customer Service"
  }'
```

**Example response**

The following JSON is an example of a response to a successful request to unfreeze customer accounts:

```json
{
  "processed_customer_ids": [
    {
      "customer_id": "123e4567-e89b-12d3-a456-426614174000"
    }
  ],
  "failed_customer_ids": []
}
```

### Close customer accounts

In cases where fraud is confirmed or for other security reasons, you may need to permanently close customer accounts.

**Example request**

CloseCustomer

```
curl --request POST \
  --url https://sandbox.atelio.com/api/v0.1/internal/accounts/close/bulk \
  --header 'Accept: application/json' \
  --header 'Authorization: <YOUR_AUTHORIZATION>' \
  --header 'Content-Type: application/json' \
  --header 'Identity: <YOUR_IDENTITY>' \
  --data '{
    "requested_by": "compliance@yourcompany.com",
    "customer_ids": ["123e4567-e89b-12d3-a456-426614174000"],
    "comments": "Confirmed fraudulent activity",
    "source": "Compliance"
  }'
```

**Example response**

The following JSON is an example of a response to a successful request to close customer accounts:

```json
{
  "processed_customer_ids": [
    {
      "customer_id": "123e4567-e89b-12d3-a456-426614174000"
    }
  ],
  "failed_customer_ids": []
}
```

For more detailed information about fraud operations, including request parameters, response formats, and best practices, see [Fraud Operations](https://docs.atelio.com/embedded/docs/fraud-operations).

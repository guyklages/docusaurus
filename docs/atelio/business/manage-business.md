# Manage business


## Overview

Use the following endpoints to manage businesses:

- [Create a Business](https://docs.atelio.com/embedded/docs/manage-businesses#create-a-business)
- [Delete a Business](https://docs.atelio.com/embedded/docs/manage-businesses#delete-a-business)
- [Update a Business](https://docs.atelio.com/embedded/docs/manage-businesses#update-a-business)


## Create a business

After your business enters its information, you'll see that a Business resource has been created. This Business resource gives you a way to reference and call business accounts, and to facilitate account management.

To create an instance of a business object, use the [Create a business](https://docs.atelio.com/embedded/reference/post_businesses) endpoint. The following request creates a new business with the details, including the tax ID (EIN), business name, contact info, address, and beneficial owners.

### Example request

CreateBusiness

```
curl --request POST \
  --url https://sandbox.atelio.com/api/v0.1/businesses \
  --header 'Accept: application/json' \
  --header 'Authorization: <YOUR_API_KEY>' \
  --header 'Content-Type: application/json' \
  --header 'Identity: <YOUR_IDENTITY>' \
  --data '{
    "ein": "12-1234567",
    "legal_business_name": "John Doe Business Corporation",
    "dba_business_name": "John'\''s",
    "business_type": "cooperative",
    "date_established": "2020-01-01",
    "phone": "+14157485052",
    "email": "info@business.com",
    "website": "<https://www.business.com>",
    "industry_type": "Financial",
    "number_of_employees": "0-50",
    "addresses": [
      {
        "address_type": "MAILING",
        "street": "345 California Ave.",
        "street2": "Suit 600",
        "city": "San Francisco",
        "state": "CA",
        "zip_code": "12345-1234",
        "country": "US",
        "is_primary": true
      }
    ],
    "beneficial_owners": [
      {
        "dob": "1980-04-04",
        "first_name": "John",
        "middle_name": "O'\''Shea",
        "last_name": "Doe",
        "addresses": [
          {
            "address_type": "MAILING",
            "street": "345 California Ave.",
            "street2": "Suit 600",
            "city": "San Francisco",
            "state": "CA",
            "zip_code": "12345-1234",
            "country": "US",
            "is_primary": true
          }
        ]
      }
    ]
}'
```

### Example response

Upon success, Atelio returns a `201` status including the created business object and unique IDs assigned to the business, addresses, and beneficial owners.

JSON

```
{
  "ein": "12-1234567",
  "phone": "+14085557788",
  "email": "user@example.com",
  "website": "https://www.specter.com",
  "legal_business_name": "World Domination Inc.",
  "dba_business_name": "World Domination Inc.",
  "business_type": "limited_liability_company",
  "industry_type": "Financial",
  "kyb_status": "approved",
  "number_of_employees": "0-50",
  "addresses": [
    {
      "address_type": "MAILING",
      "street": "345 California Ave.",
      "street2": "Suit 600",
      "city": "San Francisco",
      "state": "CA",
      "zip_code": "12345-1234",
      "country": "US",
      "is_primary": true
    },
    {
      "address_type": "PHYSICAL",
      "street": "123 California Ave.",
      "street2": "Suit 100",
      "city": "San Francisco",
      "state": "CA",
      "zip_code": "12345-1234",
      "country": "US",
      "is_primary": false
    }
  ],
  "beneficial_owners": [
    {
      "first_name": "James",
      "last_name": "Bond",
      "dob": "1970-12-12",
      "addresses": [
        {
          "address_type": "MAILING",
          "street": "345 California Ave.",
          "street2": "Suit 600",
          "city": "San Francisco",
          "state": "CA",
          "zip_code": "12345-1234",
          "country": "US",
          "is_primary": true
        }
      ]
    },
    {
      "first_name": "Le",
      "last_name": "Chiffre",
      "dob": "1980-04-04",
      "addresses": [
        {
          "address_type": "MAILING",
          "street": "345 California Ave.",
          "street2": "Suit 600",
          "city": "San Francisco",
          "state": "CA",
          "zip_code": "12345-1234",
          "country": "US",
          "is_primary": true
        }
      ]
    }
  ]
}
```


## Delete a business

To delete a business, use the [Delete a Business](https://docs.atelio.com/embedded/reference/delete_business) endpoint with no further parameters, as shown in the example below.

### Example request

DeleteBusiness

```
curl --request DELETE \
  --url https://sandbox.atelio.com/api/v0.1/businesses/68954424-a754-4919-9aab-3dfc613b0a1f \
  --header 'Identity: <YOUR_IDENTITY>' \
  --header 'Authorization: <YOUR_AUTHORIZATION>' \
```


## Update a business

To update a business, use the [Update a Business](https://docs.atelio.com/embedded/reference/patch_business) endpoint and provide the relevant, optional parameters that you want to update, as shown in the following table.

| Parameter | Type | Description |
| --- | --- | --- |
| `business_type` | string | The type of business. Valid values: `cooperative`, `corporation`, `limited_liability_company`, `limited_partnership`, `nonprofit_organization`, `partnership`, `sole_proprietorship`. |
| `dba_business_name` | string | Doing Business As name (trade name). |
| `ein` | string | Unique type of tax identification number used to identify the business with the IRS. |
| `email` | string | The business' email address. |
| `date_established` | date | Date of incorporation in `YYYY-MM-DD` format. |
| `legal_business_name` | string | Legal name of the business. |
| `phone` | string | The business' phone number. |
| `website` | string | The business' official website. |

An example of a request to update a `business_type` to `cooperative` is shown below.

### Example request

UpdateBusiness

```
curl --request PATCH \
     --url https://sandbox.atelio.com/api/v0.1/businesses/5e9d3360-c788-435e-9488-949c446639d9 \
     --header 'Accept: application/json' \
     --header 'Authorization: <YOUR_AUTHENTICATION>' \
     --header 'Content-Type: application/json' \
     --header 'Identity: <YOUR_IDENTITY>' \
     --data @- <<EOF
{
     "ein": "12-1234567",
     "legal_business_name": "John Doe Business Corporation",
     "dba_business_name": "John's",
     "business_type": "limited_liability_company",
     "date_established": "2020-01-01",
     "phone": "+14157485052",
     "email": "info@business.com",
     "website": "<https://www.business.com>"
}
EOF
```

### Example response

The following is an example of a successful response to a request to update the business type to `cooperative`.

JSON

```
{
  "ein": "12-1234567",
  "phone": "+14085557788",
  "email": "user@example.com",
  "website": "https://www.specter.com",
  "legal_business_name": "World Domination Inc.",
  "dba_business_name": "World Domination Inc.",
  "business_type": "limited_liability_company",
  "kyb_status": "approved",
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
    },
    {
      "address_type": "PHYSICAL",
      "street": "123 California Ave.",
      "street2": "Suite 100",
      "city": "San Francisco",
      "state": "CA",
      "zip_code": "12345-1234",
      "country": "US",
      "is_primary": false
    }
  ],
  "beneficial_owners": [
    {
      "first_name": "James",
      "last_name": "Atelio",
      "dob": "1970-12-12",
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
      ]
    },
    {
      "first_name": "Le",
      "last_name": "Chiffre",
      "dob": "1980-04-04",
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
      ]
    }
  ]
}
```

For a complete specification and interactive examples, see [Update a business](https://docs.atelio.com/embedded/reference/patch_business) in the Atelio API Reference.

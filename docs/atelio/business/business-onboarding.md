import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem'; 

# Business onboarding


## Overview

The Atelio platform provides the ability for you to have a Business as a Customer to whom you can provide financial services, such as cards. You do so by creating a business resource.

A business must comprise at least one Beneficial Owner that you add to the Business resource.

In many ways the business is treated as an entity in the same way as a regular customer is treated, but the verification check used for a business is a KYB process which is also performed as part of the credit application submission. Running this process validates the legal business entity itself, but each Beneficial Owner also needs to be verified using the KYC process.

### Onboarding process

To bring a business on board, you need to:

1. [Create a Business](https://docs.atelio.com/embedded/docs/managing-businesses#retrieving-businesses) using the business' information.
2. [Create one or more Beneficial Owners](https://docs.atelio.com/embedded/docs/beneficial-owners) for the business. If the business fails the KYB, you cannot provide them with a card.

### Supported operations

You can use the Business API endpoints to perform the following operations to create and manage businesses on the Atelio platform.

<details>
    <summary>Businesses</summary>
    - [CreateBusiness](https://docs.atelio.com/embedded/reference/post_businesses) - Creates a business
    - [UpdateBusiness](https://docs.atelio.com/embedded/reference/patch_business) - Updates the details of a business
    - [DeleteBusiness](https://docs.atelio.com/embedded/reference/delete_business) - Deletes a business
    - ---
    - [GetAllBusinesses](https://docs.atelio.com/embedded/reference/get_businesses) - Retrieves all businesses associated with a brand
    - [GetBusiness](https://docs.atelio.com/embedded/reference/get_business) - Retrieves a business by ID
</details>

<details>
    <summary>Business addresses</summary>
    - [CreateBusinessAddress](https://docs.atelio.com/embedded/reference/post_business_addresses) - Creates an address for a business
    - [UpdateBusinessAddress](https://docs.atelio.com/embedded/reference/patch_business_address) - Updates a business address
    - [DeleteBusinessAddress](https://docs.atelio.com/embedded/reference/delete_business_address) - Deletes an address associated with a business
    - ---
    - [GetAllBusinessesAddresses](https://docs.atelio.com/embedded/reference/get_business_addresses) - Retrieves all business addresses associated with a business
    - [GetBusinessAddress](https://docs.atelio.com/embedded/reference/get_business_address) - Retrieves a business address by ID
</details>

<details>
    <summary>Beneficial owners</summary>
    - [CreateBeneficialOwner](https://docs.atelio.com/embedded/reference/post_beneficial_owners) - Creates a beneficial owner for a business
    - [UpdateBeneficialOwner](https://docs.atelio.com/embedded/reference/patch_beneficial_owner) - Updates a beneficial for a business
    - [DeleteBeneficialOwner](https://docs.atelio.com/embedded/reference/delete_beneficial_owner) - Deletes a beneficial owner associated with a business
    - [StartBeneficialOwnerKYC](https://docs.atelio.com/embedded/reference/post_beneficial_owner_kyc) - Started the KYC process for a beneficial owner
    - ---
    - [GetAllBeneficialOwners](https://docs.atelio.com/embedded/reference/get_beneficial_owners) - Retrieves all beneficial owners associated with a business
    - [GetBeneficialOwner](https://docs.atelio.com/embedded/reference/get_beneficial_owner) - Retrieves a beneficial owner associated with a business
</details>

<details>
    <summary>Beneficial owner addresses</summary>
    - [CreateBeneficialOwnerAddress](https://docs.atelio.com/embedded/reference/post_beneficial_owner_addresses) - Creates an address for the beneficial owner of a business
    - [UpdateBeneficialOwnerAddress](https://docs.atelio.com/embedded/reference/patch_beneficial_owner_address) - Updates an address for the beneficial owner of a business
    - [DeleteBeneficialOwnerAddress](https://docs.atelio.com/embedded/reference/delete_beneficial_owner_address) - Deletes an address for the beneficial owner of a business
    - ---
    - [GetAllBeneficialOwnerAddresses](https://docs.atelio.com/embedded/reference/get_beneficial_owner_addresses) - Retrieves all beneficial owner addresses associated with a business
    - [GetBeneficialOwnerAddress](https://docs.atelio.com/embedded/reference/get_beneficial_owner_address) - Retrieves the address of a single beneficial owner associated with a business
</details>

## Manage businesses

To manage a business, use the following endpoints:

- [Create a business](https://docs.atelio.com/embedded/docs/business-onboarding#create-a-business)
- [Delete a business](https://docs.atelio.com/embedded/docs/business-onboarding#delete-a-business)
- [Update a business](https://docs.atelio.com/embedded/docs/business-onboarding#update-a-business)

### Create a business

After your business enters its information, you'll see that a Business resource has been created. This Business resource gives you a way to reference and call business accounts, and to facilitate account management.

To create an instance of a business object, use the [CreateBusiness](https://docs.atelio.com/embedded/reference/post_businesses) endpoint. The following request creates a new business with the details, including the tax ID (EIN), business name, contact info, address, and beneficial owners.

**Example request**

CreateBusiness

```json
curl --request POST \
  --url https://sandbox.atelio.com/api/v0.1/businesses \
  --header 'Accept: application/json' \
  --header 'Authorization: YOUR_API_KEY' \
  --header 'Content-Type: application/json' \
  --header 'Identity: YOUR_IDENTITY' \
  --data '{
    "ein": "12-1234567",
    "legal_business_name": "John Doe Business Corporation",
    "dba_business_name": "John'\''s",
    "business_type": "cooperative",
    "date_established": "2020-01-01T00:00:00.000Z",
    "phone": "+14157485052",
    "email": "info@business.com",
    "website": "www.business.com",
    "industry_type": "Financial",
    "number_of_employees": "0-50",
    "addresses": [\
      {\
        "address_type": "MAILING",\
        "street": "345 California Ave.",\
        "street2": "Suite 600",\
        "city": "San Francisco",\
        "state": "CA",\
        "zip_code": "12345-1234",\
        "country": "US",\
        "is_primary": true\
      }\
    ],
    "beneficial_owners": [\
      {\
        "dob": "1980-04-04",\
        "first_name": "John",\
        "middle_name": "O'\''Shea",\
        "last_name": "Doe",\
        "addresses": [\
          {\
            "address_type": "MAILING",\
            "street": "345 California Ave.",\
            "street2": "Suite 600",\
            "city": "San Francisco",\
            "state": "CA",\
            "zip_code": "12345-1234",\
            "country": "US",\
            "is_primary": true\
          }\
        ]\
      }\
    ]
}'
```

**Example response**

Upon success, Atelio returns a `201` status including the created business object and unique IDs assigned to the business, addresses, and beneficial owners.

JSON

```json
{
  "addresses": [\
    {\
      "address_id": "12348579-5d05-4e3e-a5e3-e61e3a5b1234",\
      "address_type": "MAILING",\
      "city": "San Francisco",\
      "country": "US",\
      "date_created": "2019-08-24T14:15:22Z",\
      "date_updated": "2019-08-24T14:15:22Z",\
      "is_primary": true,\
      "state": "CA",\
      "street": "345 California Ave.",\
      "street2": "Suite 600",\
      "zip_code": "12345-1234"\
    },\
    {\
      "address_id": "67898579-5d05-6789-a5e3-e61e3a5b6789",\
      "address_type": "PHYSICAL",\
      "city": "San Francisco",\
      "country": "US",\
      "date_created": "2019-08-24T14:15:22Z",\
      "date_updated": "2019-08-24T14:15:22Z",\
      "is_primary": false,\
      "state": "CA",\
      "street": "123 California Ave.",\
      "street2": "Suite 100",\
      "zip_code": "12345-1234"\
    }\
  ],
  "beneficial_owners": [\
    {\
      "addresses": [\
        {\
          "address_id": "12347777-5d05-4e3e-a5e3-e61e3a5b7777",\
          "address_type": "MAILING",\
          "city": "San Francisco",\
          "country": "US",\
          "date_created": "2019-08-24T14:15:22Z",\
          "date_updated": "2019-08-24T14:15:22Z",\
          "is_primary": true,\
          "state": "CA",\
          "street": "345 California Ave.",\
          "street2": "Suite 600",\
          "zip_code": "12345-1234"\
        }\
      ],\
      "beneficial_owner_id": "45628579-5d05-4562-a5e3-e61e3a5b4562",\
      "date_created": "2019-08-24T14:15:22Z",\
      "date_updated": "2019-08-24T14:15:22Z",\
      "dob": "1970-12-12",\
      "first_name": "James",\
      "last_name": "Bond"\
    },\
    {\
      "addresses": [\
        {\
          "address_id": "88887777-5d05-4e3e-a5e3-e61e88887777",\
          "address_type": "MAILING",\
          "city": "San Francisco",\
          "country": "US",\
          "date_created": "2019-08-24T14:15:22Z",\
          "date_updated": "2019-08-24T14:15:22Z",\
          "is_primary": true,\
          "state": "CA",\
          "street": "345 California Ave.",\
          "street2": "Suite 600",\
          "zip_code": "12345-1234"\
        }\
      ],\
      "beneficial_owner_id": "12345678-5d05-4562-a5e3-e61e12345678",\
      "date_created": "2019-08-24T14:15:22Z",\
      "date_updated": "2019-08-24T14:15:22Z",\
      "dob": "1980-04-04",\
      "first_name": "Le",\
      "last_name": "Chiffre"\
    }\
  ],
  "business_id": "96df8579-5d05-4e3e-a5e3-e61e3a5bdb38",
  "business_type": "limited_liability_company",
  "date_created": "2019-08-24T14:15:22Z",
  "date_updated": "2019-08-24T14:15:22Z",
  "dba_business_name": "World Domination Inc.",
  "ein": "12-1234567",
  "email": "user@example.com",
  "industry_type": "Financial",
  "kyb_status": "approved",
  "legal_business_name": "World Domination Inc.",
  "number_of_employees": "0-50",
  "phone": "+14085557788",
  "website": "https://www.specter.com"
}
```

#### Required Parameters for Business Creation

When creating a business, the following parameters are required:

| Parameter | Type | Description |
| --- | --- | --- |
| `ein` | string | Unique type of tax identification number used to identify the business with the IRS, for example `12-1234599`. |
| `legal_business_name` | string | Freeform, alphanumeric, legal name of the business. |
| `industry_type` | string | Must be one of: `Technology`, `Finance, Banking, and Insurance`, `E-Commerce and Retail`, `Transportation`, `Real Estate and Construction`, `Other`. |

### Delete a business

To delete a business, use the [DeleteBusiness](https://docs.atelio.com/embedded/reference/delete_business) endpoint, as shown in the following example.

**Example request**

DeleteBusiness

```curl
curl --request DELETE \
  --url https://sandbox.atelio.com/api/v0.1/businesses/68954424-a754-4919-9aab-3dfc613b0a1f \
  --header 'Identity: <YOUR_IDENTITY>' \
  --header 'Authorization: <YOUR_AUTHORIZATION>' \
```

### Update a business

To update a business, use the [UpdateBusiness](https://docs.atelio.com/embedded/reference/patch_business) endpoint and provide the relevant, optional parameters that you want to update, as shown in the following table.

| Parameter | Type | Description |
| --- | --- | --- |
| `ein` | string | Unique type of tax identification number used to identify the business with the IRS, for example `12-1234599`. |
| `legal_business_name` | string | Freeform, alphanumeric, legal name of the business. |
| `dba_business_name` | string | Freeform, alphanumeric, doing-business-as name (trade name). |
| `business_type` | string | Select one of: `cooperative`, `limited_liability_company`, `sole_proprietorship`, `partnership`, `limited_partnership`, `corporation`, `nonprofit_organization`. |
| `date_established` | date | Date of incorporation in `YYYY-MM-DD` format, for example `2021-06-28`. |
| `phone` | string | Freeform number, for example `01-324-5556684`. |
| `email` | string | Business contact email, for example `jim_smith@acme.com`. |
| `website` | string | The official website, for example `www.acme.com`. |
| `industry_type` | string | Must be one of: `Technology`, `Finance, Banking, and Insurance`, `E-Commerce and Retail`, `Transportation`, `Real Estate and Construction`, `Other`. |

An example of a request to update a `business_type` to `cooperative` is shown below.

**Example request**

UpdateBusiness

```curl
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
     "date_established": "2020-01-01T00:00:00.000Z",
     "phone": "+14157485052",
     "email": "info@business.com",
     "website": "www.business.com",
     "industry_type": "Technology"
}
EOF
```

**Example response**

Below is an example of a successful response to a request to update the business type to `limited_liability_company`.

JSON

```json
{
  "addresses": [\
    {\
      "address_id": "12348579-5d05-4e3e-a5e3-e61e3a5b1234",\
      "address_type": "MAILING",\
      "city": "San Francisco",\
      "country": "US",\
      "date_created": "2019-08-24T14:15:22Z",\
      "date_updated": "2019-08-24T14:15:22Z",\
      "is_primary": true,\
      "state": "CA",\
      "street": "345 California Ave.",\
      "street2": "Suite 600",\
      "zip_code": "12345-1234"\
    },\
    {\
      "address_id": "67898579-5d05-6789-a5e3-e61e3a5b6789",\
      "address_type": "PHYSICAL",\
      "city": "San Francisco",\
      "country": "US",\
      "date_created": "2019-08-24T14:15:22Z",\
      "date_updated": "2019-08-24T14:15:22Z",\
      "is_primary": false,\
      "state": "CA",\
      "street": "123 California Ave.",\
      "street2": "Suite 100",\
      "zip_code": "12345-1234"\
    }\
  ],
  "beneficial_owners": [\
    {\
      "addresses": [\
        {\
          "address_id": "12347777-5d05-4e3e-a5e3-e61e3a5b7777",\
          "address_type": "MAILING",\
          "city": "San Francisco",\
          "country": "US",\
          "date_created": "2019-08-24T14:15:22Z",\
          "date_updated": "2019-08-24T14:15:22Z",\
          "is_primary": true,\
          "state": "CA",\
          "street": "345 California Ave.",\
          "street2": "Suite 600",\
          "zip_code": "12345-1234"\
        }\
      ],\
      "beneficial_owner_id": "45628579-5d05-4562-a5e3-e61e3a5b4562",\
      "date_created": "2019-08-24T14:15:22Z",\
      "date_updated": "2019-08-24T14:15:22Z",\
      "dob": "1970-12-12",\
      "first_name": "James",\
      "last_name": "Atelio"\
    },\
    {\
      "addresses": [\
        {\
          "address_id": "88887777-5d05-4e3e-a5e3-e61e88887777",\
          "address_type": "MAILING",\
          "city": "San Francisco",\
          "country": "US",\
          "date_created": "2019-08-24T14:15:22Z",\
          "date_updated": "2019-08-24T14:15:22Z",\
          "is_primary": true,\
          "state": "CA",\
          "street": "345 California Ave.",\
          "street2": "Suite 600",\
          "zip_code": "12345-1234"\
        }\
      ],\
      "beneficial_owner_id": "12345678-5d05-4562-a5e3-e61e12345678",\
      "date_created": "2019-08-24T14:15:22Z",\
      "date_updated": "2019-08-24T14:15:22Z",\
      "dob": "1980-04-04",\
      "first_name": "Le",\
      "last_name": "Chiffre"\
    }\
  ],
  "business_id": "96df8579-5d05-4e3e-a5e3-e61e3a5bdb38",
  "business_type": "limited_liability_company",
  "date_created": "2019-08-24T14:15:22Z",
  "date_updated": "2019-08-24T14:15:22Z",
  "dba_business_name": "World Domination Inc.",
  "ein": "12-1234567",
  "email": "user@example.com",
  "industry_type": "Technology",
  "kyb_status": "approved",
  "legal_business_name": "World Domination Inc.",
  "phone": "+14085557788",
  "website": "https://www.specter.com"
}
```

For a complete specification and interactive examples, see [Update a business](https://docs.atelio.com/embedded/reference/patch_business) in the Atelio API Reference.


## Retrieve businesses

Use the Business API to retrieve business information using optional query parameters or a single business by their `business_id`.

### Retrieve all businesses

To retrieve all businesses, use the [GetAllBusinesses](https://docs.atelio.com/embedded/reference/get_businesses) endpoint with no other parameters, as shown in the following example.

You can also filter businesses by various parameters, including KYB status.

**Example request**

<Tabs>
    <TabItem value="getall" label="Get all businesses" Default>

        ```curl
        curl --request GET \
            --url https://sandbox.atelio.com/api/v0.1/businesses \
            --header 'Identity: <YOUR_IDENTITY>' \
            --header 'Authorization: <YOUR_AUTHORIZATION>' \
        ```
    </TabItem>
    <TabItem value="withkyb" label="Get all business with KYB status filter">
    
        ```curl
        curl --request GET \
            --url https://sandbox.atelio.com/api/v0.1/businesses?kyb_status=Approved \
            --header 'Identity: <YOUR_IDENTITY>' \
            --header 'Authorization: <YOUR_AUTHORIZATION>' \
        ```
    </TabItem>
</Tabs>

Valid values for `kyb_status` are:

| Value          | Description |
|----------------|-------------|
| `approved`     | Returns businesses that have passed KYB verification. |
| `error`        | Returns businesses that contain an error in their KYB verification. |
| `initiated`    | Returns businesses where KYB verification has been started. |
| `rejected`     | Returns businesses that have failed KYB verification. |
| `under+review` | Returns businesses that require manual review. |
| `warning`      | Returns businesses that have a warning in their verification. |

The KYB status filter works with both Persona and Middesk KYB verification providers.

**Example response**

The following JSON is an example of a successful request to retrieve all businesses.

```json
{
  "addresses": [\
    {\
      "address_id": "12348579-5d05-4e3e-a5e3-e61e3a5b1234",\
      "address_type": "MAILING",\
      "city": "San Francisco",\
      "country": "US",\
      "date_created": "2019-08-24T14:15:22Z",\
      "date_updated": "2019-08-24T14:15:22Z",\
      "is_primary": true,\
      "state": "CA",\
      "street": "345 California Ave.",\
      "street2": "Suite 600",\
      "zip_code": "12345-1234"\
    },\
    {\
      "address_id": "67898579-5d05-6789-a5e3-e61e3a5b6789",\
      "address_type": "PHYSICAL",\
      "city": "San Francisco",\
      "country": "US",\
      "date_created": "2019-08-24T14:15:22Z",\
      "date_updated": "2019-08-24T14:15:22Z",\
      "is_primary": false,\
      "state": "CA",\
      "street": "123 California Ave.",\
      "street2": "Suite 100",\
      "zip_code": "12345-1234"\
    }\
  ],
  "beneficial_owners": [\
    {\
      "addresses": [\
        {\
          "address_id": "12347777-5d05-4e3e-a5e3-e61e3a5b7777",\
          "address_type": "MAILING",\
          "city": "San Francisco",\
          "country": "US",\
          "date_created": "2019-08-24T14:15:22Z",\
          "date_updated": "2019-08-24T14:15:22Z",\
          "is_primary": true,\
          "state": "CA",\
          "street": "345 California Ave.",\
          "street2": "Suite 600",\
          "zip_code": "12345-1234"\
        }\
      ],\
      "beneficial_owner_id": "45628579-5d05-4562-a5e3-e61e3a5b4562",\
      "date_created": "2019-08-24T14:15:22Z",\
      "date_updated": "2019-08-24T14:15:22Z",\
      "dob": "1970-12-12",\
      "first_name": "James",\
      "last_name": "Atelio"\
    },\
    {\
      "addresses": [\
        {\
          "address_id": "88887777-5d05-4e3e-a5e3-e61e3a5b88887777",\
          "address_type": "MAILING",\
          "city": "San Francisco",\
          "country": "US",\
          "date_created": "2019-08-24T14:15:22Z",\
          "date_updated": "2019-08-24T14:15:22Z",\
          "is_primary": true,\
          "state": "CA",\
          "street": "345 California Ave.",\
          "street2": "Suite 600",\
          "zip_code": "12345-1234"\
        }\
      ],\
      "beneficial_owner_id": "12345678-5d05-4562-a5e3-e61e12345678",\
      "date_created": "2019-08-24T14:15:22Z",\
      "date_updated": "2019-08-24T14:15:22Z",\
      "dob": "1980-04-04",\
      "first_name": "Le",\
      "last_name": "Chiffre"\
    }\
  ],
  "business_id": "96df8579-5d05-4e3e-a5e3-e61e3a5bdb38",
  "business_type": "limited_liability_company",
  "date_created": "2019-08-24T14:15:22Z",
  "date_updated": "2019-08-24T14:15:22Z",
  "dba_business_name": "World Domination Inc.",
  "ein": "12-1234567",
  "email": "user@example.com",
  "industry_type": "Financial",
  "kyb_status": "approved",
  "legal_business_name": "World Domination Inc.",
  "phone": "+14085557788",
  "website": "https://www.specter.com"
}
```

### Retrieve a single business

To retrieve a single business, use the [GetBusiness](https://docs.atelio.com/embedded/reference/get_business) endpoint, as shown in the following example.

**Example request**

```curl
curl --request GET \
  --url https://sandbox.atelio.com/api/v0.1/businesses/5e9d3360-c788-435e-9488-949c446639d9 \
  --header 'Identity: <YOUR_IDENTITY>' \
  --header 'Authorization: <YOUR_AUTHORIZATION>' \
```

**Example response**

The following JSON is an example of a response to a successful request to retrieve a business.

```json
{
  "addresses": [\
    {\
      "address_id": "12348579-5d05-4e3e-a5e3-e61e3a5b1234",\
      "address_type": "MAILING",\
      "city": "San Francisco",\
      "country": "US",\
      "date_created": "2019-08-24T14:15:22Z",\
      "date_updated": "2019-08-24T14:15:22Z",\
      "is_primary": true,\
      "state": "CA",\
      "street": "345 California Ave.",\
      "street2": "Suite 600",\
      "zip_code": "12345-1234"\
    },\
    {\
      "address_id": "67898579-5d05-6789-a5e3-e61e3a5b6789",\
      "address_type": "PHYSICAL",\
      "city": "San Francisco",\
      "country": "US",\
      "date_created": "2019-08-24T14:15:22Z",\
      "date_updated": "2019-08-24T14:15:22Z",\
      "is_primary": false,\
      "state": "CA",\
      "street": "123 California Ave.",\
      "street2": "Suite 100",\
      "zip_code": "12345-1234"\
    }\
  ],
  "beneficial_owners": [\
    {\
      "addresses": [\
        {\
          "address_id": "12347777-5d05-4e3e-a5e3-e61e3a5b7777",\
          "address_type": "MAILING",\
          "city": "San Francisco",\
          "country": "US",\
          "date_created": "2019-08-24T14:15:22Z",\
          "date_updated": "2019-08-24T14:15:22Z",\
          "is_primary": true,\
          "state": "CA",\
          "street": "345 California Ave.",\
          "street2": "Suite 600",\
          "zip_code": "12345-1234"\
        }\
      ],\
      "beneficial_owner_id": "45628579-5d05-4562-a5e3-e61e3a5b4562",\
      "date_created": "2019-08-24T14:15:22Z",\
      "date_updated": "2019-08-24T14:15:22Z",\
      "dob": "1970-12-12",\
      "first_name": "James",\
      "last_name": "Atelio"\
    },\
    {\
      "addresses": [\
        {\
          "address_id": "88887777-5d05-4e3e-a5e3-e61e88887777",\
          "address_type": "MAILING",\
          "city": "San Francisco",\
          "country": "US",\
          "date_created": "2019-08-24T14:15:22Z",\
          "date_updated": "2019-08-24T14:15:22Z",\
          "is_primary": true,\
          "state": "CA",\
          "street": "345 California Ave.",\
          "street2": "Suite 600",\
          "zip_code": "12345-1234"\
        }\
      ],\
      "beneficial_owner_id": "12345678-5d05-4562-a5e3-e61e12345678",\
      "date_created": "2019-08-24T14:15:22Z",\
      "date_updated": "2019-08-24T14:15:22Z",\
      "dob": "1980-04-04",\
      "first_name": "Le",\
      "last_name": "Chiffre"\
    }\
  ],
  "business_id": "96df8579-5d05-4e3e-a5e3-e61e3a5bdb38",
  "business_type": "limited_liability_company",
  "date_created": "2019-08-24T14:15:22Z",
  "date_updated": "2019-08-24T14:15:22Z",
  "dba_business_name": "World Domination Inc.",
  "ein": "12-1234567",
  "email": "user@example.com",
  "industry_type": "Financial",
  "kyb_status": "approved",
  "legal_business_name": "World Domination Inc.",
  "phone": "+14085557788",
  "website": "https://www.specter.com"
}
```


## Manage business addresses

To manage business addresses, use the following:

- [Create a business address](https://docs.atelio.com/embedded/docs/business-onboarding#create-a-business-address)
- [Retrieve all business addresses](https://docs.atelio.com/embedded/docs/business-onboarding#retrieve-all-business-addresses)
- [Update a business address](https://docs.atelio.com/embedded/docs/business-onboarding#update-a-business-address)
- [Delete a business address](https://docs.atelio.com/embedded/docs/business-onboarding#delete-a-business-address)

### Create a business address

To create a business address, use the [CreateBusinessAddress](https://docs.atelio.com/embedded/reference/post_business_addresses) endpoint and provide parameters as shown in the following table.

| Parameter      | Required | Type    | Description |
| -------------- | ---------| ------- | ----------- |
| `address_type` | Yes      | string  | `MAILING` or `PHYSICAL` |
| `street`       | Yes      | string  | Business' street, between 8 and 30 characters. May contain only alphanumeric characters and `. , _ - #` |
| `street2`      |          | string  | Second line for the business' address; must be between 3 and 20 characters. |
| `city`         | Yes      | string  | Business' city; maximum of 20 characters. |
| `state`        | Yes      | string  | For U.S. states: must use the [2-letter state code](https://en.wikipedia.org/wiki/List_of_states_and_territories_of_the_United_States)<br/>For non-U.S.: maximum of 20 characters. |
| `zip_code`     | Yes      | string  | For U.S.: must be a 5-digit or hyphenated 9-digit zip code.<br/>For non-US: must be between 2 and 20 characters. |
| `country`      | Yes      | string  | Business' country code in [ISO 3166-1 alpha 2](https://en.wikipedia.org/wiki/ISO_3166-1_alpha-2) format. |
| `is_primary`   | Yes      | boolean | Is this the business' primary address; either `true` or `false`. |

The following is an example of a request to create a business address.

**Example request**

```curl
curl --request POST \
     --url https://sandbox.atelio.com/api/v0.1/businesses/002e0f0e-e39d-4351-876c-afcad30d9c37/addresses \
     --header 'Authorization: <YOUR_AUTHORIZATION>' \
     --header 'Content-Type: application/json' \
     --header 'Identity: <YOUR_IDENTITY>' \
     --data '
{
     "address_type": "PHYSICAL",
     "street": "345 Dan Diego Ave.",
     "street2": "Suite 111",
     "city": "San Francisco",
     "state": "CA",
     "zip_code": "12345-1234",
     "country": "US",
     "is_primary": false
}
```

**Example response**

The following JSON is an example of a response to a successful request to create a business address.

```json
{
  "address_type": "MAILING",
  "city": "San Francisco",
  "country": "US",
  "is_primary": true,
  "state": "CA",
  "street": "345 California Ave.",
  "street2": "Suite 600",
  "zip_code": "12345-1234"
}
```

### Retrieve all business addresses

To retrieve all business addresses, use the [RetrieveAllBusinessAddresses](https://docs.atelio.com/embedded/reference/get_business_addresses) endpoint, as in the following example.

**Example request**

```curl
curl --request GET \
     --url https://sandbox.atelio.com/api/v0.1/businesses/002e0f0e-e39d-4351-876c-afcad30d9c37/addresses \
     --header 'Authorization: <YOUR_AUTHORIZATION>' \
     --header 'Identity: <YOUR_IDENTITY>'
```

**Example response**

The following JSON is an example of a response to a successful request to retrieve all business addresses.

```json
{
  "data": [\
    {\
      "address_id": "12348579-5d05-4e3e-a5e3-e61e3a5b1234",\
      "address_type": "MAILING",\
      "city": "San Francisco",\
      "country": "US",\
      "date_created": "2019-08-24T14:15:22Z",\
      "date_updated": "2019-08-24T14:15:22Z",\
      "is_primary": true,\
      "state": "CA",\
      "street": "345 California Ave.",\
      "street2": "Suite 600",\
      "zip_code": "12345-1234"\
    },\
    {\
      "address_id": "67898579-5d05-6789-a5e3-e61e3a5b6789",\
      "address_type": "PHYSICAL",\
      "city": "San Francisco",\
      "country": "US",\
      "date_created": "2019-08-24T14:15:22Z",\
      "date_updated": "2019-08-24T14:15:22Z",\
      "is_primary": false,\
      "state": "CA",\
      "street": "123 California Ave.",\
      "street2": "Suite 100",\
      "zip_code": "12345-1234"\
    }\
  ],
  "page_info": {
    "page": 1,
    "page_size": 2,
    "pages": 1
  }
}
```

**Example request for a single business address**

To retrieve a single business address, use the [GetBusinessAddress](https://docs.atelio.com/embedded/reference/get_business_address) endpoint, as in the following example.

```curl
curl --request GET \
     --url https://sandbox.atelio.com/api/v0.1/businesses/002e0f0e-e39d-4351-876c-afcad30d9c37/addresses/12348579-5d05-4e3e-a5e3-e61e3a5b1234 \
     --header 'Authorization: <YOUR_AUTHORIZATION>' \
     --header 'Identity: <YOUR_IDENTITY>'
```

### Update a business address

To update a business address, use the [UpdateBusinessAddress](https://docs.atelio.com/embedded/reference/patch_business_address) endpoint and provide the parameters that you want to update, as in the following table.

| Parameter      | Required | Type.   | Description |
| -------------- | ---------| ------- | ----------- |
| `address_type` | Yes      | string  | Either `MAILING` or `PHYSICAL` |
| `street`       | Yes      | string  | Business' street, between 8 and 30 characters. May contain only alphanumeric characters and `. , _ - #` |
| `street2`      |          | string  | Second line for the business' address; must be between 3 and 20 characters. |
| `city`         | Yes      | string  | Business' city; maximum of 20 characters. |
| `state`        | Yes      | string  | For U.S. states: must use the [2-letter state code](https://en.wikipedia.org/wiki/List_of_states_and_territories_of_the_United_States)<br/>For non-U.S.: maximum of 20 characters. |
| `zip_code`     | Yes      | string  | For U.S.: must be a 5-digit or hyphenated 9-digit zip code.<br/>For non-US: must be between 2 and 20 characters. |
| `country`      | Yes      | string  | Business' country code in [ISO 3166-1 alpha 2](https://en.wikipedia.org/wiki/ISO_3166-1_alpha-2) format. |
| `is_primary`   | Yes      | boolean | Is this the business' primary address; either `true` or `false`. |

The following cURL is an example of a request to update a business address.

**Example request**

```curl
curl --request PATCH \
     --url https://sandbox.atelio.com/api/v0.1/businesses/002e0f0e-e39d-4351-876c-afcad30d9c37/addresses/12348579-5d05-4e3e-a5e3-e61e3a5b1234 \
     --header 'Authorization: <YOUR_AUTHORIZATION>' \
     --header 'Content-Type: application/json' \
     --header 'Identity: <YOUR_IDENTITY>' \
     --data '
{
     "address_type": "MAILING",
     "street": "345 Michigan Ave.",
     "street2": "Suite 1345",
     "city": "San Francisco",
     "state": "CA",
     "zip_code": "12345-1234",
     "country": "US",
     "is_primary": false
}
```

**Example response**

The follosing JSON is an example of a response to a successful request to update a business address.

```json
{
  "address_type": "MAILING",
  "city": "San Francisco",
  "country": "US",
  "is_primary": true,
  "state": "CA",
  "street": "345 California Ave.",
  "street2": "Suite 600",
  "zip_code": "12345-1234"
}
```

### Delete a business address

To delete a business address, use the [DeleteBusinessAddress](https://docs.atelio.com/embedded/reference/delete_business_address) endpoint, as in the following cURL example.

**Example request**

```curl
curl --request DELETE \
     --url https://sandbox.atelio.com/api/v0.1/businesses/002e0f0e-e39d-4351-876c-afcad30d9c37/addresses/12348579-5d05-4e3e-a5e3-e61e3a5b1234 \
     --header 'Authorization: <YOUR_AUTHORIZATION>' \
     --header 'Identity: <YOUR_IDENTITY>'
```

**Example responses**

The following JSON is an example response to a successful request to delete a business address.

```json
{
      "address_id": "12348579-5d05-4e3e-a5e3-e61e3a5b1234",
      "address_type": "MAILING",
      "city": "San Francisco",
      "country": "US",
      "date_created": "2019-07-24T14:15:22Z",
      "date_deleted": "2019-08-24T14:15:22Z",
      "is_primary": true,
      "state": "CA",
      "street": "345 California Ave.",
      "street2": "Suite 600",
      "zip_code": "12345-1234"
}
```

If you try to delete a primary business address, the following JSON is an example of a response to a failed request:

```json
{
    "Message": "A business must have atleast one active address",
    "Status": 400,
    "Code": "business_address_del_err",
    "Type": "Request Error"
}
```

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem'; 

# Beneficial owners (BO)

> 📘 **Note**
> A business must have one or more Beneficial Owners (BO).

## Create a beneficial owner

To add a Beneficial Owner (BO) to a business, use the [CreateBeneficialOwner](https://docs.atelio.com/embedded/reference/post_beneficial_owners) endpoint and provide parameters as shown in the following tables.

| Parameter.    | Required | Type.  | Description |
| ------------- |----------| ------ | ----------- |
| `dob`         | Yes      | string | Beneficial owner's date of birth in `YYYY-MM-DD` format. |
| `first_name`  | Yes      | string | Beneficial owner's first name, between 1 and 20 characters. Must start with a letter and can only contain letters, spaces, and apostrophes. |
| `middle_name` |          | string | Beneficial owner's middle name, between 1 and 20 characters. Must start with a letter and can only contain letters, spaces, and apostrophes. |
| `last_name`   | Yes      | string | Beneficial owner's last name, between 2 and 20 characters. Must start with a letter and can only contain letters, spaces, and apostrophes. |
| [addresses](https://docs.atelio.com/embedded/docs/beneficial-owners#addresses-array) | Yes | array | One or more of the beneficial owner's addresses. , see the Addresses object table below. |

### `addresses` array 

The `addresses` array contains the following parameters.

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

The following is an example of a request to create a Beneficial Owner of a business.

### Example request

```curl
curl --request POST \
  --url https://sandbox.atelio.com/api/v0.1/businesses/96df8579-5d05-4e3e-a5e3-e61e3a5bdb38/beneficial_owners \
  --header 'Authorization: <YOUR_AUTHORIZATION>' \
  --header 'Content-Type: application/json' \
  --header 'Identity: <YOUR_IDENTITY>' \
  --data '
{
  "addresses": [\
    {\
      "address_type": "PHYSICAL",\
      "street": "5 California Ave.",\
      "street2": "Suite 770",\
      "city": "San Francisco",\
      "state": "CA",\
      "zip_code": "12345-1234",\
      "country": "US",\
      "is_primary": true\
    }\
  ],
  "dob": "1992-03-23",
  "first_name": "Boris",
  "middle_name": "Jim",
  "last_name": "Pasakovitch"
}
```

### Example response

A successful response contains all the information related to the new Beneficial Owner in a JSON file. It also includes a `beneficial_owner_id`, which is the unique Atelio identifier for the Beneficial Owner that must be provided in API calls, such as when initiating a [KYC](https://docs.atelio.com/embedded/docs/beneficial-owner-verification) request.

The following is an example of a response to a successful request to add a Beneficial Owner.

```json
{
  "first_name": "New",
  "last_name": "Owner",
  "dob": "1999-10-10",
  "address": [\
    {\
      "address_type": "PHYSICAL",\
      "street": "345 California St.",\
      "street2": "Suite 600",\
      "city": "San Francisco",\
      "state": "CA",\
      "zip_code": "94104-2657",\
      "country": "US",\
      "is_primary": true\
    }\
  ]
}
```

### When missing a field

If you try to add a Beneficial Owner with a missing field, you receive a JSON response similar to the following.

```json
{
     'Message': "{'last_name': ['Missing data for required field.']}",
      'Status': 400,
      'Code': 'create_beneficial_owner_schema',
      'Type': 'Request Error'
}
```

## Manage beneficial owners

Use the following to manage Beneficial Owners:

- [Retrieve a beneficial owner](https://docs.atelio.com/embedded/docs/beneficial-owners#retrieve-a-beneficial-owner)
- [Updating a Beneficial Owner](https://docs.atelio.com/embedded/docs/managing-beneficial-owners#updating-a-beneficial-owner)
- [Deleting a Beneficial Owner](https://docs.atelio.com/embedded/docs/managing-beneficial-owners#deleting-a-beneficial-owner)

### Retrieve a beneficial owner

To retrieve a single beneficial owner, use the [GetBusinessOwner](https://docs.atelio.com/embedded/reference/get_beneficial_owner) endpoint, as in the following example.

#### Example request

```curl
curl --request GET \
  --url https://sandbox.atelio.com/api/v0.1/businesses/96df8579-5d05-4e3e-a5e3-e61e3a5bdb38/beneficial_owners/4943fc81-e7e8-43b5-8be6-9c43fcec505a \
  --header 'Authorization: <YOUR_AUTHORIZATION>' \
  --header 'Identity: <YOUR_IDENTITY>'
```

#### Example response

The following JSON is an example of a successful request to retrieve a beneficial owner.

```json
{
  "beneficial_owner_id": "12345678-5d05-4562-a5e3-e61e12345678",
  "first_name": "New",
  "last_name": "Owner",
  "date_created": "2019-08-24T14:15:22Z",
  "dob": "1999-10-10",
  "address": [\
    {\
      "date_created": "2019-08-24T14:15:22Z",\
      "address_id": "12374791-5d05-4e3e-a5e3-e61e3817622134",\
      "address_type": "PHYSICAL",\
      "street": "345 California St.",\
      "street2": "Suite 600",\
      "city": "San Francisco",\
      "state": "CA",\
      "zip_code": "94104-2657",\
      "country": "US",\
      "is_primary": true,\
    }\
  ]
}
```

### Retrieve all beneficial owners

To retrieve all beneficial owners, use the [GetAllBeneficialOwners](https://docs.atelio.com/embedded/reference/get_beneficial_owners) endpoint, as in the following example.

#### Example request

```curl
curl --request GET \
  --url https://sandbox.atelio.com/api/v0.1/businesses/96df8579-5d05-4e3e-a5e3-e61e3a5bdb38/beneficial_owners \
  --header 'Authorization: <YOUR_AUTHORIZATION>' \
  --header 'Identity: <YOUR_IDENTITY>'
```

#### Example response

The following JSON is an example of a successful request to retrieve all beneficial owners for a business.

```json
{
  "page_info": {
    "page_size": 2,
    "page": 1,
    "pages": 1
  },
  "data": [\
    {\
      "beneficial_owner_id": "4943fc81-e7e8-43b5-8be6-9c43fcec505a",\
      "first_name": "David",\
      "last_name": "Letterman",\
      "date_created": "2019-08-24T14:15:22.000Z",\
      "date_updated": "2019-08-24T14:15:22.000Z",\
      "dob": "1980-04-04",\
      "address": [\
        {\
          "address_id": "12348579-5d05-4e3e-a5e3-e61e3a5b1234",\
          "address_type": "MAILING",\
          "street": "345 California Ave.",\
          "street2": "Suite 600",\
          "city": "San Francisco",\
          "state": "CA",\
          "zip_code": "12345-1234",\
          "country": "US",\
          "is_primary": true,\
        }\
      ]\
    },\
    {\
      "beneficial_owner_id": "29ec6db6-4e12-4521-8ba7-7afc5c4730dd",\
      "first_name": "Conan",\
      "last_name": "O'Brian",\
      "date_created": "2019-08-24T14:15:22.000Z",\
      "date_updated": "2019-08-24T14:15:22.000Z",\
      "dob": "1980-04-04",\
      "address": [\
        {\
          "address_id": "12348579-5d05-4e3e-a5e3-e61e3a5b1234",\
          "address_type": "MAILING",\
          "street": "345 California Ave.",\
          "street2": "Suite 600",\
          "city": "San Francisco",\
          "state": "CA",\
          "zip_code": "12345-1234",\
          "country": "US",\
          "is_primary": true,\
        }\
      ]\
    }\
  ]
}
```

### Update a beneficial owner

To update a beneficial owner, use the [UpdateBeneficialOwner](https://docs.atelio.com/embedded/reference/patch_beneficial_owner) endpoint and provide the relevant parameters, as in the following table.

| Parameter | Type | Description |
| --- | --- | --- |
| `dob` | string | Date of birth in `YYYY-MM-DD` format. |
| `first_name` | string | Beneficial owner's first name, between 1 and 20 characters. Must start with a letter and can only contain letters, spaces, and apostrophes. |
| `middle_name` | string | Beneficial owner's middle name, between 1 and 20 characters. Must start with a letter and can only contain letters, spaces, and apostrophes. |
| `last_name` | string | Beneficial owner's last name, between 2 and 20 characters. Must start with a letter and can only contain letters, spaces, and apostrophes. |

#### Example request

```curl
curl --request PATCH \
  --url https://sandbox.atelio.com/api/v0.1/businesses/4943fc81-e7e8-43b5-8be6-9c43fcec505a/beneficial_owners/12348579-5d05-4e3e-a5e3-e61e3a5b1234 \
  --header 'Authorization: <YOUR_AUTHORIZATION>' \
  --header 'Content-Type: application/json' \
  --header 'Identity: <YOUR_IDENTITY>'
```

#### Example response

The following JSON is an example of a response to a successful request to update a beneficial owner.

```json
{
  "first_name": "New",
  "last_name": "Owner",
  "dob": "1999-10-10",
  "address": [\
    {\
      "address_type": "PHYSICAL",\
      "street": "345 California St.",\
      "street2": "Suite 600",\
      "city": "San Francisco",\
      "state": "CA",\
      "zip_code": "94104-2657",\
      "country": "US",\
      "is_primary": true\
    }\
  ]
}
```

### Delete a Beneficial Owner

To delete a Beneficial Owner, use the [DeleteBeneficialOwner](https://docs.atelio.com/embedded/reference/delete_beneficial_owner) endpoint, as shown in the following example.

#### Example request

```curl
curl --request DELETE \
  --url https://sandbox.atelio.com/api/v0.1/businesses/96df8579-5d05-4e3e-a5e3-e61e3a5bdb38/beneficial_owners/96df8579-5d05-4e3e-a5e3-e61e3a5bdb38 \
  --header 'Authorization: <YOUR_AUTHORIZATION>' \
  --header 'Identity: <YOUR_IDENTITY>'
```

#### Example response

The following JSON is an example of a response to a successful request to delete a beneficial owner.

```json
{
    "beneficial_owner_id":"4943fc81-e7e8-43b5-8be6-9c43fcec505a",
    "first_name":"David",
    "last_name":"Letterman",
    "date_created":"2019-08-24T14:15:22Z",
    "date_deleted":"2019-10-24T14:15:22Z",
    "dob": "1999-10-10",
    "address":[\
        {\
            "date_created":"2019-08-24T14:15:22Z",\
            "date_deleted":"2019-10-24T14:15:22Z",\
            "address_id":"12348579-5d05-4e3e-a5e3-e61e3a5b1234",\
            "address_type":"MAILING",\
            "street":"345 California Ave.",\
            "street2":"Suite 600",\
            "city":"San Francisco",\
            "state":"CA",\
            "zip_code":"12345-1234",\
            "country":"US",\
            "is_primary":true,\
        }\
    ]
}
```

## Manage beneficial owner's addresses

The following can be done to manage beneficial owner addresses:

- [Create a beneficial owner address](https://docs.atelio.com/embedded/docs/beneficial-owners#create-a-beneficial-owners-address)
- [Get all beneficial owner addresses](https://docs.atelio.com/embedded/docs/beneficial-owners#get-addresses-associated-with-a-beneficial-owner)
- [Get a beneficial owner's address](https://docs.atelio.com/embedded/docs/managing-beneficial-owner-addresses#retrieve-a-beneficial-owners-address)
- [Update a beneficial owner's address](https://docs.atelio.com/embedded/docs/managing-beneficial-owner-addresses#update-a-beneficial-owners-address)
- [Delete a beneficial owner's address](https://docs.atelio.com/embedded/docs/managing-beneficial-owner-addresses#delete-a-beneficial-owners-address)

### Create a beneficial owner's address

To create a beneficial owner's address, use the [CreateBeneficialOwnerAddress](https://docs.atelio.com/embedded/reference/post_beneficial_owner_addresses) endpoint and provide parameters in the following table.

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

#### Example request

```curl
curl --request GET \
     --url https://sandbox.atelio.com/api/v0.1/businesses/12348579-5d05-4e3e-a5e3-e61e3a5b1234/beneficial_owners/002e0f0e-e39d-4351-876c-afcad30d9c37/addresses/3a7fe4e4-79a4-4a58-942a-c3d00a2406a6 \
     --header 'Accept: application/json' \
     --header 'Authorization: <YOUR_AUTHENTICATION>' \
     --header 'Identity: <YOUR_IDENTITY>'
```

#### Example response

The following JSON is an example of a response to a successful request to create a beneficial owner's address.

```json
{
  "date_created": "2019-08-24T14:15:22Z",
  "address_id": "12348579-5d05-4e3e-a5e3-e61e3a5b1234",
  "address_type": "MAILING",
  "street": "345 California Ave.",
  "street2": "Suite 600",
  "city": "San Francisco",
  "state": "CA",
  "zip_code": "12345-1234",
  "country": "US",
  "is_primary": true,
}
```

### Get all of the beneficial owner's addresses

To retrieve all addresses associated with a beneficial owner, use the [GetAllBeneficialOwnerAddress](https://docs.atelio.com/embedded/reference/get_beneficial_owner_addresses) endpoint, as shown in the following example.

#### Example request

```curl
curl --request GET \
     --url https://sandbox.atelio.com/api/v0.1/businesses/12348579-5d05-4e3e-a5e3-e61e3a5b1234/beneficial_owners/7b18da9e-0217-4ecb-8454-8c0ab8bedc14/addresses/e2b37ab8-5e6e-4538-bbe0-35121b481845 \
     --header 'Accept: application/json' \
     --header 'Authorization: YOUR-AUTHENTICATION' \
     --header 'Identity: <YOUR_IDENTITY>'
```

#### Example response

The following JSON is an example of a response to a successful request to retrieve all business addresses associated with a beneficial owner.

```json
{
  "page_info": {
    "page_size": 2,
    "page": 1,
    "pages": 1
  },
  "data": [\
    {\
      "date_created": "2019-08-24T14:15:22.000Z",\
      "date_updated": "2020-06-24T14:15:22.000Z",\
      "address_id": "12348579-5d05-4e3e-a5e3-e61e3a5b1234",\
      "address_type": "MAILING",\
      "street": "345 California Ave.",\
      "street2": "Suite 600",\
      "city": "San Francisco",\
      "state": "CA",\
      "zip_code": "12345-1234",\
      "country": "US",\
      "is_primary": true,\
    },\
    {\
      "date_created": "2019-08-24T14:15:22.000Z",\
      "date_updated": "2021-04-24T14:15:22.000Z",\
      "address_id": "12348579-5d05-4e3e-a5e3-e61e3a5b1234",\
      "address_type": "MAILING",\
      "street": "123 Oregon Ave.",\
      "street2": "Suite 100",\
      "city": "San Portier",\
      "state": "AL",\
      "zip_code": "12345-1234",\
      "country": "US",\
      "is_primary": false,\
    }\
  ]
}
```

### Get a beneficial owner's address

To retrieve a single business address associated with a beneficial owner, use the [GetBeneficialOwnerAddresses](https://docs.atelio.com/embedded/reference/get_beneficial_owner_address) endpoint, as in the following example.

#### Example request

The following cURL is an example of a request to retrieve an address associated with a beneficial owner.

```curl
curl --request GET \
     --url https://sandbox.atelio.com/api/v0.1/businesses/002e0f0e-e39d-4351-876c-afcad30d9c37/beneficial_owners/3a7fe4e4-79a4-4a58-942a-c3d00a2406a6/addresses/148050c1-3dee-41fb-a924-7cae7518b402 \
     --header 'Accept: application/json' \
     --header 'Identity: <YOUR_IDENTITY>' \
     --header 'Authorization: <YOUR_AUTHORIZATION>'
```

### Update a beneficial owner's address

To update a beneficial owner's address, use the [UpdateBeneficialOwnerAddress](https://docs.atelio.com/embedded/reference/patch_beneficial_owner_address) endpoint and provide the optional parameters that you want to update, as shown in the following table.

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

#### Example request

```curl
curl --request PATCH \
     --url https://sandbox.atelio.com/api/v0.1/businesses/002e0f0e-e39d-4351-876c-afcad30d9c37/beneficial_owners/3a7fe4e4-79a4-4a58-942a-c3d00a2406a6/addresses/148050c1-3dee-41fb-a924-7cae7518b402 \
     --header 'Accept: application/json' \
     --header 'Identity: <YOUR_IDENTITY>' \
     --header 'Authorization: <YOUR_AUTHORIZATION>' \
     --header 'Content-Type: application/json'
```

#### Example response

The following JSON is an example of a response to a successful request to update a beneficial owner's address.

```json
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
```

### Delete a beneficial owner's address 

To delete a Beneficial Owner's address, use the [DeleteBeneficialOwnerAddress](https://docs.atelio.com/embedded/reference/delete_beneficial_owner_address) endpoint, as shown in the following example.

#### Example request

```curl
curl --request DELETE \
     --url https://sandbox.atelio.com/api/v0.1/businesses/12348579-5d05-4e3e-a5e3-e61e3a5b1234/beneficial_owners/7b18da9e-0217-4ecb-8454-8c0ab8bedc14/addresses/8559dec0-2edb-4c3c-a3c5-32de10174c34 \
     --header 'Accept: application/json' \
     --header 'Authorization: <YOUR_AUTHENTICATION>' \
     --header 'Identity: <YOUR_IDENTITY>'
```

#### Example response

The following JSON is an example of a response to a successful request to delete a beneficial owner's address.

```json
{
    "date_created": "2019-08-24T14:15:22Z",
    "date_deleted": "2019-08-19:22:22Z",
     "address_id": "12348579-5d05-4e3e-a5e3-e61e3a5b1234",
     "address_type": "MAILING",
     "street": "345 California Ave.",
     "street2": "Suite 600",
     "city": "San Francisco",
     "state": "CA",
     "zip_code": "12345-1234",
     "country": "US",
     "is_primary": true,
}
```

## Verify beneficial owners

Before a business is fully verified, you also need to authenticate and verify all beneficial owners. This is done using the KYC process which validates their identity and documents, and ensures that they're compliant with federal regulations.

Atelio supports KYC verification for both U.S. and foreign beneficial owners, with different validation requirements based on the beneficial owner's address.

### Start a KYC process 

> 📘 **Note**
>
> Most of a customer's details can't be updated after they've passed KYC as the new information needs to be verified before the update can occur. If you need to update information for a customer that has passed KYC, contact Atelio directly.
>
> For details, see [Updating a customer](doc:managing-customers#updating-a-customer).

To initiate KYC on a beneficial owner, use the [StartBeneficialOwnerKYC](ref:https://docs.atelio.com/embedded/reference/post_beneficial_owner_kyc) endpoint and provide the parameters, as in the following table.

| Parameter    | Required | Type   | Description |
| ------------ |----------| ------ | ----------- |
| `program_id` | Yes      | string | Program UUID. |
| `ssn`        | Required for U.S. BO. <br/> Optional for foreign BO. | string | Beneficial owner's social security number, in the `#########` or `###-##-####` format. |
| `phone`      | Required for U.S. BO. <br/> Optional for foreign BO. | string | Beneficial owner's phone number, in the `#########` or `###-###-####` format. |
| `phone_country_code` |  | string | Beneficial owner's phone number's country code, as specified by the [ISO dialing number](https://www.bws.net/toolbox/country-codes). |
| `email`      | Required for U.S. BO. <br/> Optional for foreign BO. | string | Beneficial owner's email address. |
| `ip`         | Conditionally required based on the program ID. <br/> Required for U.S. BO. <br/> Optional for foreign BO. | string | Valid IPV4 dot-separated address, for example `192.168.1.139` |

The combination of `beneficial_owner_id` and `program_id` in the request indicates that Atelio will do a verification check on a particular beneficial owner on behalf of a particular bank partnered with the brand.

The KYC request for the beneficial owner is asynchronous (meaning that the reply is not always immediate), so you must configure a [webhook](https://docs.atelio.com/embedded/docs/webhook) to listen for KYC events.

The following is an example of a request to start a KYC on a beneficial owner.

```curl
curl --request POST \
     --url https://sandbox.atelio.com/api/v0.1/businesses/business_id/beneficial_owners/beneficial_owner_id/verification-kyc \
     --header 'Authorization: <YOUR_AUTHORIZATION>' \
     --header 'Content-Type: application/json' \
     --header 'Identity: <YOUR_IDENTITY>' \
     --data '
{
     "program_id": "72585109-8222-4221-b15b-48e87ffed790",
     "ssn": "123-45-6789",
     "phone": "555-111-2222",
     "phone_country_code": "1",
     "email": "james@atelio.com",
     "ip": "192.168.1.139",
     "kyc_retry_request": false
}
```

The results of the KYC will be sent via [webhook events](https://docs.atelio.com/embedded/docs/kyc#kyc-webhook-events). 

For information on subscribing to Atelio webhook events, see [Event subscriptions](https://docs.atelio.com/embedded/docs/event-subscriptions) and [Accepting webhook requests](https://docs.atelio.com/embedded/docs/signatures).

#### Example request

```json
{
    "beneficial_owner_id": "2d5a1e70-2662-42a3-bb90-52e9bd450a62",
    "kyc_status": "initialized"
}
```

#### Example responses

The following are examples of possible KYC responses.

success failure error timeout documents_required under_review_foreign_bo

<Tabs>
    <TabItem value="success" label="Success" Default>

        ```json
        {
            "event": "kyc.verification.success",
            "beneficial_owner_id": "a5bcf5a8-c4e0-4025-8183-5346176ee3db",
            "occurred_at": "2021-02-02-00:50:58.484840+00:00"
        }
        ```
    </TabItem>
    <TabItem value="failure" label="Failure">

        ```json
        {
            "event": "kyc.verification.failure",
            "beneficial_owner_id": "a5bcf5a8-c4e0-4025-8183-5346176ee3db",
            "occurred_at": "2021-02-02-00:50:58.484840+00:00",
            "reasons": {
                "ofac": "failed",
                "bureau": "passed",
                "mobile": "passed",
                "ip": "passed",
                "email": "passed"
            }
        }
        ```
    </TabItem>
    <TabItem value="error" label="Error">

        ```json
        {
            "event": "kyc.verification.error",
            "beneficial_owner_id": "a5bcf5a8-c4e0-4025-8183-5346176ee3db",
            "occurred_at": "2021-02-02-00:50:58.484840+00:00"
        }
        ```
    </TabItem>
    <TabItem value="timeout" label="Timeout">

        ```json
        {
            "event": "kyc.verification.timeout",
            "beneficial_owner_id": "a5bcf5a8-c4e0-4025-8183-5346176ee3db",
            "occurred_at": "2021-02-02-00:50:58.484840+00:00"
        }
        ```
    </TabItem>
    <TabItem value="doc_required" label="documents_required">
        ```text
        {
            "event": "kyc.verification.documents_required",
            "customer_id": "a5bcf5a8-c4e0-4025-8183-5346176ee3db",
            "occurred_at": "2021-02-02-00:50:58.484840+00:00",
            "documents":[\
            {\
                "document_type": "government_id",\
                "upload_link": "https://withpersona.com/verify?template-id=tmpl_111111111111111111111111&reference-id=a5bcf5a8-c4e0-4025-8183-5346176ee3db",\
                "status": "required"\
            },\
            {\
                "document_type": "utility_bill",\
                "upload_link": "https://withpersona.com/verify?template-id=tmpl_222222222222222222222222&reference-id=a5bcf5a8-c4e0-4025-8183-5346176ee3db",\
                "status": "required"\
            },\
            {\
                "document_type": "social_security_card",\
                "upload_link": "https://withpersona.com/verify?template-id=tmpl_333333333333333333333333&reference-id=a5bcf5a8-c4e0-4025-8183-5346176ee3db",\
                "status": "required"\
            },\
            ]
        }
        ```
    </TabItem>
    <TabItem value="under_review_foreign_bo" label="under_review_foreign_bo">

        ```json
        {
            "event": "kyc.verification.under_review",
            "beneficial_owner_id": "a5bcf5a8-c4e0-4025-8183-5346176ee3db",
            "occurred_at": "2021-02-02-00:50:58.484840+00:00",
            "reasons": "Foreign Beneficial Owner"
        }
        ```
    </TabItem>
</Tabs>

After a customer has been successfully vetted, further KYC attempts are not be allowed. The KYC service responds with an error and displays the timestamp of the previous successful KYC request

### KYC webhook events 

We provide a `kyc.verification.status``passed`/`failed` response to the `callback_url` configured in the webhook. If the `kyc.verification.status` is `passed`, the Business Owner's information has been validated and they are eligible to access the services provided by the bank. You can now create a card for the Business Owner.

| Event enum values | Description |
| --- | --- |
| `kyc.verification.error` | KYC failed to complete due to a server error. Send a\<br/>```undefined<br/>POST /businesses/{business_id}/beneficial_owners/<br/>{beneficial_owner_id}/verification-kyc<br/>```<br/>to retry. |
| `kyc.verification.failure` | KYC failed due to low confidence in the identity validation. |
| `kyc.verification.success` | KYC passed. |
| `kyc.verification.timeout` | KYC failed to complete due to a connection timeout. Send a<br/>```undefined<br/>POST /businesses/{business_id}/beneficial_owners/<br/>{beneficial_owner_id}/verification-kyc<br/>```<br/>to retry. |
| `kyc.verification.document_required` | KYC requires further information to continue. This includes a `documents` field that indicates the types of documents required. |
| `kyc.verification.under_review` | KYC documents have been submitted and are under review, or a foreign beneficial owner's KYC has been routed to manual review for alternative verification methods. |

Sometimes these events may include a description field in the payload prompting further action, as shown in the following `PO Box` failure example.

```json
{
    "event": "kyc.verification.failure",
    "customer_id": "a5bcf5a8-c4e0-4025-8183-5346176ee3db",
    "occurred_at": "2021-02-02-00:50:58.484840+00:00",
    "error_code": "po_box_failure",
    "description": "Customer address is a PO Box. Request a new address"
}
```

If the response is `kyc.verification.document_required`, this means that the customer must upload the required identity documents for verification.

For a complete specification and interactive examples, see [CreateWebhookSubscription](https://docs.atelio.com/embedded/reference/post_webhooks) in the Atelio API Reference.

### Retrieve KYC status

To retrieve the KYC status for a beneficial owner, use the [GetBeneficiaryOwnerKYC](https://docs.atelio.com/embedded/reference/get_beneficial_owner_kyc) operation and the following parameter.

| Parameter    | Required | Type   | Description |
| ------------ | ---------| ------ | ----------- |
| `program_id` | Yes      | string | Unique program identifier (credit/debit, and so on) for a brand. |

The following is an example of a succesful KYC status request.

```curl
curl --request GET \
     --url 'https://sandbox.atelio.com/api/v0.1/customers/931e2341-c3eb-4681-97d4-f6e09d90da14/verification-kyc?program_id=72585109-8222-4221-b15b-48e87ffed790' \
     --header 'Authorization: <YOUR_AUTHORIZATION>' \
     --header 'Identity: <YOUR_IDENTITY>'
```

The JSON response includes the overall status of the KYC and failure reasons if applicable, as shown in the example below.

```json
{
    "customer_id": "d856bf10-d4a6-4153-b8f8-2b93072dd8da",
    "brand_id": "ce027c9c-39c6-47f4-a12d-abb543f7cf63",
    "kyc_status": "passed",
    "results": {
        "ofac": "passed",
        "bureau": "passed",
        "email": "passed",
        "ip": "passed",
        "mobile": "passed"
    },
    "health": {
        "overall": "SERVICE_GOOD",
        "ofac": "SERVICE_GOOD",
        "bureau": "SERVICE_GOOD",
        "email": "SERVICE_GOOD",
        "ip": "SERVICE_GOOD",
        "mobile": "SERVICE_GOOD"
    },
    "info": {
        "ofac": {
            "name_matched": false,
            "dob_matched": false
        },
        "bureau": {
            "application_status": "Pass"
        },
        "phone": {
            "first_name_match": 100,
            "last_name_match": 100,
            "address_match": null,
            "service_status": "ACTIVE",
            "service_type": "CONTRACT",
            "service_duration": "UNKNOWN",
            "service_ported_duration": "NONE"
        }
    }
}
```

### KYC exceptions

#### Documents required

A KYC process may require one or more documents to be submitted. When this happens, a webhook is sent with the type of document required and the KYC status is set to `kyc.verification.document_required`. For details on uploading documents, see [KYC document upload](https://docs.atelio.com/embedded/docs/beneficial-owner-documentation-upload).

Depending on whether the documents are approved or they need to be reviewed, the status changes to either `kyc.verification.success` or `kyc.verification.under_review` respectively, and a webhook is sent.

#### Documents under review

After you upload the required documents and they need to be reviewed, a webhook is sent and the KYC status is set to `kyc.verification.under_review`. You don’t need to take any further action. Once the review is complete, a webhook is sent and the status is updated to either `kyc.verification.success` or `kyc.verification.failure`.

#### Foreign beneficial owner review

For foreign beneficial owners (non-US addresses), failed KYC attempts are automatically routed to manual review instead of failing immediately. When this occurs, the following happen:

1. A `kyc.verification.under_review` webhook is sent with `reasons: "Foreign Beneficial Owner"`.
2. The KYC status is set to `under_review`.
3. Compliance teams can evaluate the beneficial owner using alternative verification methods.
4. Once manual review is complete, a final webhook is sent with either `kyc.verification.success` or `kyc.verification.failure`.

This process allows businesses to onboard foreign beneficial owners who may not have traditional U.S. verification data available.

### Upload BO documentation

As part of the KYC check, you might receive a webhook event (`kyc.verification.document_required`) asking for documents to be uploaded for validation. This might happen, for example, when a beneficial owner’s name does not match with the name in an SSN lookup. You can upload documents by using the [upload links](https://docs.atelio.com/embedded/docs/beneficial-owner-documentation-upload#document-upload-links).

The KYC response may request fewer than three documents. In this case, provide the relevant body parameters for the requested document(s) and ignore the parameters for the other documents.

After the beneficial owner has submitted _all_ of the required documents requested, a `kyc.verification.under_review` webhook event is sent, as shown in the following JSON example.

```json
{
    "event": "kyc.verification.under_review",
    "customer_id": "a5bcf5a8-c4e0-4025-8183-5346176ee3db",
    "occurred_at": "2021-02-02-00:50:58.484840+00:00"
}
```

After the necessary checks on the submitted documents have been completed, a `kyc.verification.success` or `kyc.verification.failed` webhook event is sent.

| Types | Description |
| --- | --- |
| Supported file types | .jpg, .png, .heic, .pdf |
| Supported document types | Government ID, Proof of address, Social security card. |

#### Document upload links

The Atelio platform provides HTML upload links for each requested document so that you can offer your customers a seamless experience as part of the verification process. Clicking on an upload link triggers the steps that guide a beneficial owner through the document upload process.

#### Using the links to upload documents

The specific documents needed to verify an identity are indicated in the `kyc.verification.documents_required` webhook event.

Each required document contains a secure link indicated by `upload_link`, and the documents must be uploaded as base64-encoded strings. Each document contains a `status`, which can be either:

- `submitted` \- the document has been uploaded.
- `required` \- the document has not been uploaded.

The following JSON is an example of a `kyc.verification.documents_required` webhook event.

```json
{
    "event": "kyc.verification.document_required",
    "customer_id": "a5bcf5a8-c4e0-4025-8183-5346176ee3db",
    "occurred_at": "2021-02-02-00:50:58.484840+00:00",
    "documents":[\
      {\
        "document_type": "government_id",\
        "upload_link": "https://withpersona.com/verify?template-id=tmpl_111111111111111111111111&reference-id=a5bcf5a8-c4e0-4025-8183-5346176ee3db",\
        "status": "required"\
      },\
      {\
        "document_type": "proof_of_address",\
        "upload_link": "https://withpersona.com/verify?template-id=tmpl_222222222222222222222222&reference-id=a5bcf5a8-c4e0-4025-8183-5346176ee3db",\
        "status": "required"\
      },\
      {\
        "document_type": "social_security_card",\
        "upload_link": "https://withpersona.com/verify?template-id=tmpl_333333333333333333333333&reference-id=a5bcf5a8-c4e0-4025-8183-5346176ee3db",\
        "status": "required"\
      },\
    ]
}
```

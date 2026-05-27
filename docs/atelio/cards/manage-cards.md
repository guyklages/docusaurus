# Manage cards

## Introduction

The Cards API provides a set of endpoints for managing cards, including:

- [Retrieving the information of a single card](https://docs.atelio.com/embedded/docs/manage-cards#retrieve-a-cards-information)
- [Retrieving the information of all the card's of a customer or a business](https://docs.atelio.com/embedded/docs/manage-cards#retrieve-all-cards-information)
- [Activating a card](https://docs.atelio.com/embedded/docs/manage-cards#activate-a-card)
- [Changing the status of a card](https://docs.atelio.com/embedded/docs/manage-cards#change-the-status-of-a-card)
- [Reissuing a card](https://docs.atelio.com/embedded/docs/manage-cards#reissue-a-card)
- [Closing a card](https://docs.atelio.com/embedded/docs/manage-cards#close-a-card)

### Retrieve a card's information

To retrieve details associated with a card, use the [GetCard](https://docs.atelio.com/embedded/reference/get_cards_id) endpoint.

#### Example request to get a card

```curl title="cURL"
curl --request GET \
  --url https://sandbox.atelio.com/api/v0.1/cards/2742ff7f-7455-4066-8b45-ae12d3acca34 \
  --header 'Authorization: <YOUR_AUTHORIZATION>' \
  --header 'Identity: <YOUR_IDENTITY>'
```

#### Example response

Upon success, Atelio returns a `200` status with the card details.

```json title="JSON"
{
  "card_id": "057c6074-a02d-4a5a-bad9-bbc64b047df7",
  "date_updated": "2020-08-16T19:39:34Z",
  "date_created": "2020-08-15T19:39:34Z",
  "customer_id": "c8940088-21e8-451c-987c-0a0398db3ee5",
  "account_id": "26bdeb70-157c-4c44-a04a-3727793b9779",
  "expiry_date": "tok_live_7g3eARzeEBJw89rJRCHqHv",
  "last_four": "6270",
  "card_number": "tok_live_q8kwTYb3YCYzngeRHHTs9p",
  "cvv": "tok_live_c95od7AsFWYN1ecaaRYtFU",
  "status": "active",
  "card_design_id": "12",
  "date_physical_card_activated": "2021-05-11T19:39:34Z",
}
```

### Retrieve all cards' information

To retrieve details associated with all cards for a customer or a business using the `customer_id`, use the [GetAllCards](https://docs.atelio.com/embedded/reference/get_cards) endpoint.

The following example retrieves card profile information for all cards for a customer.

#### Example request to get all cards

```curl title="cURL"
curl --request GET \
     --url 'https://sandbox.atelio.com/api/v0.1/cards?customer_id=057c6074-a02d-4a5a-bad9-bbc64b047df7&show_closed=true&page=1&count=10&order_by=asc' \
     --header 'Accept: application/json' \
     --header 'Authorization: YOUR-AUTHENTICATION' \
     --header 'Identity: <YOUR_IDENTITY>'
```

#### Example response

Upon success, Atelio returns a `200` status with all of the cards associated with the customer.

```json title="JSON"
{
  "page": 1,
  "pages": 1,
  "count": 5,
  "has_more": false,
  "cards": [
    {
      "card_id": "057c6074-a02d-4a5a-bad9-bbc64b047df7",
      "date_updated": "2020-08-16T19:39:34Z",
      "date_created": "2020-08-15T19:39:34Z",
      "customer_id": "c8940088-21e8-451c-987c-0a0398db3ee5",
      "account_id": "26bdeb70-157c-4c44-a04a-3727793b9779",
      "expiry_date": "tok_live_7g3eARzeEBJw89rJRCHqHv",
      "last_four": "6270",
      "card_number": "tok_live_q7kwTYb5YCYznpgRHHTs9p",
      "cvv": "tok_live_c94od3AsFWYQ1ecaaMYtFU",
      "status": "active",
      "card_design_id": "12",
      "date_physical_card_activated": "2021-05-11T19:39:34Z",
    }
  ]
}
```

### Activate a card

A physical card is always issued as inactive and must be activated before use.

To activate a card, use the [ActivateCard](https://docs.atelio.com/embedded/reference/post_cards_activate) endpoint.

#### Example request to activate a card

```curl title="cURL"
curl --request POST \
     --url https://sandbox.atelio.com/api/v0.1/cards/c8940088-21e8-451c-987c-0a0398db3ee5/activate \
     --header 'Accept: application/json' \
     --header 'Authorization: YOUR-AUTHENTICATION' \
     --header 'Identity: <YOUR_IDENTITY>'
```

#### Example response

Upon success, Atelio returns a `200` status with the card activation details.

```json title="JSON"
{
  "card_id": "057c6074-a02d-4a5a-bad9-bbc64b047df7",
  "date_updated": "2020-08-16T19:39:34Z",
  "date_created": "2020-08-15T19:39:34Z",
  "customer_id": "c8940088-21e8-451c-987c-0a0398db3ee5",
  "account_id": "26bdeb70-157c-4c44-a04a-3727793b9779",
  "expiry_date": "tok_live_7g3eARzeEBJw89rJRCHqHv",
  "last_four": "6270",
  "card_number": "tok_live_c8940088-21e8-451c-987c-0a0398db3ee5",
  "cvv": "tok_live_26bdeb70-157c-4c44-a04a-3727793b9779",
  "status": "active",
  "card_design_id": "12"
}
```

### Change the status of a card

To change the status of a card, use the [UpdateCard](https://docs.atelio.com/embedded/reference/patch_cards) endpoint and set the required status parameter to `Active` or `Inactive`. The following request sets the card to `inactive`

> 📘 **Note**
>
> You can only change the status of a physical card after you have [activated](https://docs.atelio.com/embedded/reference/post_cards_activate) it.

#### Example request to update a card

```curl title="cURL"
curl --request PATCH \
     --url https://sandbox.atelio.com/api/v0.1/cards/c8940088-21e8-451c-987c-0a0398db3ee5 \
     --header 'Accept: application/json' \
     --header 'Authorization: YOUR-AUTHENTICATION' \
     --header 'Content-Type: application/json' \
     --header 'Identity: <YOUR_IDENTITY>' \
     --data '
{
     "status": "inactive"
}
'
```

#### Example response

Upon success, Atelio returns a `200` status with the updated status.

```json title="JSON"
{
  "card_id": "057c6074-a02d-4a5a-bad9-bbc64b047df7",
  "date_updated": "2020-08-16T19:39:34Z",
  "date_created": "2020-08-15T19:39:34Z",
  "customer_id": "c8940088-21e8-451c-987c-0a0398db3ee5",
  "account_id": "26bdeb70-157c-4c44-a04a-3727793b9779",
  "business_id": "f65f3ff2-ff5a-46a0-a277-b5892aa5a690",
  "expiry_date": "0331",
  "last_four": "6270",
  "card_number": "tok_live_f65f3ff2-ff5a-46a0-a277-b5892aa5a690",
  "cvv": "tok_live_pc8940088-21e8-451c-987c-0a0398db3ee5",
  "status": "inactive",
  "card_design_id": "7"
}
```

### Reissue a card

Use the [ReissueCard](https://docs.atelio.com/embedded/reference/post_cards_reissue) endpoint and provide the following required parameter:

| Parameter      | Types of reissue |
| -------------- | ---------------- |
| `reissue_type` | - `same_card_number` \- issue a card with the same card number as the old card. <br/> - `same_card_number_updated_expiry` \- issue a card with the same card number but a new expiry date. <br/> - `new_card_number` \- issue a card with a different number from the old card. |

> 🚧 **Note**
>
> For all three reissue types, the old card **will not** work anymore once reissued, and the cardholder will be unable to transact with an old physical card until they receive the new card.

If the customer's card is lost or stolen, we recommend using `new_card_number` to create a new primary account number (PAN) for the new card.

Creating a new PAN is especially relevant for recurring payment or card-on-file use cases. Because merchants are not allowed to store CVVs for saved cards, they are unable to check CVV when they process an authorization for a saved card. This makes it important to reissue a lost or stolen card with a new card number and details. However, if the old card is damaged or still in the user's possession, use `same_card_number` or `same_card_number_updated_expiry` to change the expiry without creating a new PAN.

> 🚧 **Note**
>
> When a card is reissued, it defaults to an inactive status. You **must** [activate the new card](https://docs.atelio.com/embedded/docs/activating-a-card) to be able to use it.

Once the correct reissue type has been identified, you can make the request to the `/cards/{card_id}/reissue` endpoint. An example of a request to reissue the card ID `2742ff6a-7455-4066-8b45-ae12d3acca34` with the same card number but with a new expiry date is shown below:

#### Example request

```curl title="cURL"
curl --request POST \
  --url https://sandbox.atelio.com/api/v0.1/cards/2742ff6a-7455-4066-8b45-ae12d3acca34/reissue \
  --header 'Authorization: <YOUR_AUTHORIZATION>' \
  --header 'Content-Type: application/json' \
  --header 'Identity: <YOUR_IDENTITY>'
  {
  "reissue_type": "same_card_number_updated_expiry"
}
```

#### Example response

Upon success, Atelio returns a `200` status with the reissue status.

```json title="JSON"
{
  "card_id": "057c6074-a02d-4a5a-bad9-bbc64b047df7",
  "date_updated": "2020-08-16T19:39:34Z",
  "date_created": "2020-08-15T19:39:34Z",
  "customer_id": "c8940088-21e8-451c-987c-0a0398db3ee5",
  "account_id": "26bdeb70-157c-4c44-a04a-3727793b9779",
  "expiry_date": "tok_live_7g3eARzeEBJw89rJRCHqHv",
  "last_four": "6270",
  "card_number": "tok_live_q7kwTYb5YCYznpgRHHTs9p",
  "cvv": "tok_live_c94od3AsFWYQ1ecaaMYtFU",
  "status": "reissue",
  "card_design_id": null
}
```

### Close a card

To close a card, use the `CloseCard` endpoint and provide the `card_id` of the card account to be closed as a path parameter.

> 🚧 **Note**
>
> To close a card, the Account the card is associated with must have a $0 balance.

An example close account request is shown below.

#### Example request

```curl title="cURL"
curl --request POST \
  --url https://sandbox.atelio.com/api/v0.1/cards/close/card_id \
  --header 'Authorization: <YOUR_AUTHORIZATION>' \
  --header 'Identity: <YOUR_IDENTITY>'
```

#### Example response

A successful `200` response shows that the card account status has been updated to `Closed` as shown in the example below.

```json title="JSON"
{
  "card_id": "057c6074-a02d-4a5a-bad9-bbc64b047df7",
  "date_updated": "2020-08-16T19:39:34Z",
  "date_created": "2020-08-15T19:39:34Z",
  "customer_id": "c8940088-21e8-451c-987c-0a0398db3ee5",
  "account_id": "26bdeb70-157c-4c44-a04a-3727793b9779",
  "expiry_date": "tok_live_7g3eARzeEBJw89rJRCHqHv",
  "last_four": "6270",
  "card_number": "tok_live_q7kwTYb5YCYznpgRHHTs9p",
  "cvv": "tok_live_c94od3AsFWYQ1ecaaMYtFU",
  "status": "closed",
  "card_design_id": null
}
```

## Setting card restrictions

You can place a restriction on the maximum transaction amount for a card.

### Set a transaction restriction

To place a restriction on a card, use the [CreateRestriction](https://docs.atelio.com/embedded/reference/restrictions) endpoint and provide the parameters shown in the table below.

| Parameter          | Required | Type   | Description |
| ------------------ | -------- | ------ | ----------- |
| `max_amount`       | Yes      | string | Value of the transaction restriction in decimal format with two decimal places, maximum value `100,000.00`, for example `175.00`. |
| `restriction_type` | Yes      | string | Currently, only `amount` is supported. |

> 📘 **Note**
>
> Restrictions can be placed at the program level or at the card level. To place restrictions at the program level, contact Atelio.

The following request restricts the transaction amount on a card to $175.00.

#### Example request to create a restriction

```curl title="cURL"
curl --request POST \
     --url https://sandbox.atelio.com/api/v0.1/cards/card_id/restrictions/ \
     --header 'Authorization: <YOUR_AUTHORIZATION>' \
     --header 'Content-Type: application/json' \
     --header 'Identity: <YOUR_IDENTITY>' \
     --data '
{
     "restriction_type": "amount",
     "max_amount": "175.00"
}
```

#### Example response

Upon success, Atelio returns a `200` status with the transaction card restriction details.

```json title="JSON"
{
  "uuid": "b7492825-adce-4164-b8ba-5676943b6237",
  "card_id": "dab45fde-3450-4fbf-b671-9605756c1c8c",
  "restriction_type": "amount",
  "max_amount": "string",
  "date_created": "2020-06-29T14:59:38.386930",
  "date_updated": "2020-06-30T14:59:38.386930"
}
```

> 📘 **Note**
>
> Cards can only have one amount restriction. When you set a new card restriction, any existing restriction is overwritten.

### Retrieve all card restrictions

To retrieve a list of all restrictions set on a card, use the [GetAllCardRestrictions](https://docs.atelio.com/embedded/reference/get_cards_restrictions) endpoint

#### Example request to retrieve card restrictions

```curl title="cURL"
curl --request GET \
     --url https://sandbox.atelio.com/api/v0.1/cards/a593e8c1-bcd3-4747-a903-2a829fa4e3fe/restrictions \
     --header 'Accept: application/json' \
     --header 'Authorization: YOUR-AUTHENTICATION' \
     --header 'Identity: <YOUR_IDENTITY>'
```

#### Example response

Upon success, Atelio returns a `200` status with the card restriction details.

```json title="JSON"
{
  "card": "string",
  "restrictions": [
    {
      "uuid": "846b9f2a-0e34-4783-ac74-83bb89781a05",
      "card_id": "a593e8c1-bcd3-4747-a903-2a829fa4e3fe",
      "restriction_type": "amount",
      "max_amount": "100.00",
      "date_created": "2020-06-29T14:59:38.386930",
      "date_updated": "2020-06-29T14:59:38.386930"
    }
  ]
}
```

### Retrieve a card restriction

To retrieve a specific restriction on a card, use the [GetCardRestriction](https://docs.atelio.com/embedded/reference/get_cards_restrictions_id) endpoint.

#### Example request to get a card transaction

```curl title="cURL"
curl --request GET \
     --url https://sandbox.atelio.com/api/v0.1/cards/dab45fde-3450-4fbf-b671-9605756c1c8c/restrictions/b7492825-adce-4164-b8ba-5676943b6237 \
     --header 'Accept: application/json' \
     --header 'Authorization: YOUR-AUTHENTICATION' \
     --header 'Identity: <YOUR_IDENTITY>'
```

#### Example response

Upon success, Atelio returns a `200` status with the restriction details for the specific card.

```json title="JSON"
{
  "uuid": "b7492825-adce-4164-b8ba-5676943b6237",
  "card_id": "dab45fde-3450-4fbf-b671-9605756c1c8c",
  "restriction_type": "amount",
  "max_amount": "string",
  "date_created": "2020-06-29T14:59:38.386930",
  "date_updated": "2020-06-30T14:59:38.386930"
}
```

### Edit a card restriction

To edit a specific card restriction, use the [UpdateCardRestriction](https://docs.atelio.com/embedded/reference/patch_cards_restrictions) endpoint and provide the parameters shown in the table below.

| Parameter          | Required | Type   | Description |
| ------------------ | -------- | ------ | ----------- |
| `max_amount`       | Yes      | string | Value of the transaction restriction in decimal format with two decimal places, maximum value `100,000.00`, for example `175.00`. |
| `restriction_type` | Yes      | string | Currently, only `amount` is supported. |

#### Example request to update a card restriction

```curl title="cURL"
curl --request PATCH \
     --url https://sandbox.atelio.com/api/v0.1/cards/dab45fde-3450-4fbf-b671-9605756c1c8c/restrictions/b7492825-adce-4164-b8ba-5676943b6237 \
     --header 'accept: application/json' \
     --header 'content-type: application/json' \
     --data '
{
  "restriction_type": "amount",
  "max_amount": "100"
}
'
```

#### Example response

Upon success, Atelio returns a `200` status with the updated card details.

```json title="JSON"
{
  "uuid": "b7492825-adce-4164-b8ba-5676943b6237",
  "card_id": "dab45fde-3450-4fbf-b671-9605756c1c8c",
  "restriction_type": "amount",
  "max_amount": "100",
  "date_created": "2020-06-29T14:59:38.386930",
  "date_updated": "2020-06-30T14:59:38.386930"
}
```

### Remove a card restriction

To remove a specific card restriction, use the [RemoveCardRestriction](https://docs.atelio.com/embedded/reference/delete_cards_restrictions) endpoint.

#### Example request to remove a card restriction

```curl title="cURL"
curl --request DELETE \
  --url https://sandbox.atelio.com/api/v0.1/cards/card_id/restrictions/restriction_id \
  --header 'Authorization: <YOUR_AUTHORIZATION>' \
  --header 'Identity: <YOUR_IDENTITY>'
```

#### Example response

Upon success, Atelio returns a `200` status with details of the removed restriction.

```json title="JSON"
{
    "Status": "Card Restriction Removed"
}
```

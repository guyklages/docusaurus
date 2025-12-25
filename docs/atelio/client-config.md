# Client Configuration

## Introduction

The Client Configuration API allows you to retrieve configuration details for a client in the Atelio platform. This endpoint returns client information along with feature-specific configuration settings.

## Get Client Configuration

Retrieves the configuration for a client.

```undefined
GET /client/config
```

### Response

The response includes client identification information and feature-specific configuration settings.

#### Response Structure

JSON

```json
{
  "id": "550e8400-e29b-41d4-a716-446655440000",
  "name": "Example Client",
  "email": "client@example.com",
  "program_id": "program-123456",
  "config": {
    "onboarding": {
      "card_setup_required": true,
      "money_movement_required": true,
      "kyb_vendor": "persona"
    },
    "commercial_credit_card": {
      "money_movement_required": true
    },
    "pay_by_bank": {
      "watchlist_program_id": "watchlist-123456"
    }
  }
}
```

#### Response Fields

| Field | Type | Description |
| --- | --- | --- |
| [config](https://docs.atelio.com/embedded/docs/client-config#config-object) | object | Configuration settings for various features. |
| `email` | string | The client's email address. |
| `id` | UUID | The unique identifier for the client. |
| `name` | string | The client's name. |
| `program_id` | string | The program ID associated with the client. |

#### Config Object

The `config` object contains feature-specific configuration settings organized into sections:

| Field | Type | Description |
| --- | --- | --- |
| `card_setup_required` | boolean | Whether card setup is required during onboarding. |
| `kyb_vendor` | string | The vendor used for Know Your Business verification. |
| `money_movement_required` | boolean | Whether money movement setup is required for onboarding or credit cards. |
| `watchlist_program_id` | string | The program ID used for watchlist screening in Pay By Bank. |

## Example Request

Bash

```shell
curl -X GET \
  https://api.atelio.com/client/config \
  -H 'Authorization: Bearer <YOUR_AUTH_TOKEN>' \
  -H 'Identity: <YOUR_IDENTITY_TOKEN>'
```

## Example Response

JSON

```json
{
  "id": "550e8400-e29b-41d4-a716-446655440000",
  "name": "Acme Corporation",
  "email": "acme@example.com",
  "program_id": "program-789012",
  "config": {
    "onboarding": {
      "card_setup_required": true,
      "money_movement_required": false,
      "kyb_vendor": "persona"
    },
    "commercial_credit_card": {
      "money_movement_required": true
    },
    "pay_by_bank": {
      "watchlist_program_id": "watchlist-345678"
    }
  }
}
```

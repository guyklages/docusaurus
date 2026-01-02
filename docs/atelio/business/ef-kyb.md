import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem'; 

# KYB

## Introduction

KYB focuses on businesses. This process includes validating the identity of a business and its beneficial owners after the necessary information has been submitted. Verifying business documentation and information ensures adherence to federal regulations and establishes a trustworthy business environment.

After your business has provided the information necessary to create a business resource and you have added any beneficial owners, you need to authenticate and verify that information. Using the `Business` object, you can perform a number of checks and screenings to ensure compliance. This process is controlled by the Atelio platforms's KYB service.

### Sandbox scenarios

In general, running a KYB in the sandbox results in a manual approval needed. However, if you'd like to test other KYB results, you can use the following `ein` property of a Business resource to trigger different KYB statuses.

| Trigger EIN | Result |
| --- | --- |
| `11-1111111` | Auto-pass after filling out the Persona inquiry.<br/>- \*Note:\*\* Auto-pass will occur about five minutes after completing the Persona inquiry. |
| `22-2222222` | Auto-reject after filling out the Persona inquiry |
| Any other EIN | KYB will be sent for manual approval |

### Various process flows

There are three different KYB process flows that are tied to different sponsor banks:

| Flow name | Sponsor bank | Remarks |
| --- | --- | --- |
| Original | Middesk + LexisNexis | Designed for v0 endpoints. |
| Unified KYB+UBO | Persona Widget | KYB 2.0 for commercial deposit accounts. |
| New flow | Middesk + Persona | Supported by Atelio's commercial onboarding widget. |

### General process flow

| Step | Description |
| --- | --- |
| 1. Obtain the `business_id` | Obtain the `business_id` by using the Business API to either:<br/>- [Retrieve an existing business](https://docs.atelio.com/embedded/reference/get_business)<br/>- [Create a new business](https://docs.atelio.com/embedded/reference/post_businesses) |
| 2. [Start KYB process](https://docs.atelio.com/embedded/docs/ef-kyb#start-kyb-process) | Initiate the KYB process on a business by calling the [StartKYB](https://docs.atelio.com/embedded/reference/post_kyb_2) endpoint. |
| 3. [Listen for webhook events](https://docs.atelio.com/embedded/docs/ef-kyb#listen-for-webhook-events) | View your webhook events to check if KYB passed. |
| 4. [Get KYB status](https://docs.atelio.com/embedded/docs/ef-kyb#get-kyb-status) | Retrieve the KYB status using the [GetKYBStatus](https://docs.atelio.com/embedded/reference/get_kyb) endpoint. |
| 5. [Get KYB history](https://docs.atelio.com/embedded/docs/ef-kyb#get-kyb-history) | (optional) View the history of KYB verification attempts for a business using the KYB history endpoint. |


## Start KYB process

Starting the KYB process involves validating your business's identity and documents to ensure compliance with federal regulations.

> 🚧 **Requirement**
>
> Before running KYB, make sure that the business resource contains **`ein`** and **`phone`** values and that these are correct.
>
> See [Retrieving a business](doc:managing-businesses#retrieving-businesses) to view the `ein` and `phone` status, and [Updating a business](doc:managing-businesses#updating-a-business) to modify them if necessary.

### Prerequisites

Before starting, you need the following requirements:

| Requirement | Description |
| --- | --- |
| A program ID | This is shared with you as part of the onboarding or go-live process. For details on what a program ID represents, see [Issue consumer secured charge card](https://docs.atelio.com/embedded/docs/issue-consumer-secured-charge-cards) . |
| A business ID | Retrieve your `business_id` by either: <br/>- [Retrieving an existing business](https://docs.atelio.com/embedded/reference/get_business)<br/>- [Creating a new business](https://docs.atelio.com/embedded/reference/post_businesses) |
| A registered webhook | We use [webhooks](https://docs.atelio.com/embedded/docs/webhook) to notify you of events that have happened as a result of certain API Requests or real-world events that have taken place. Our webhooks are provided for your convenience, and any information that is provided via webhook may also be obtained from our API. This guide will mainly deal with webhooks that pertain to the KYC/KYB process. |

To start the KYB process, use the [StartKYB](https://docs.atelio.com/embedded/reference/post_kyb_2) endpoint.

The following is an example of a request to initiate a KYB process for the business ID `002e0f0e-e39d-4351-876c-afcad30d9c37`:

### Example request of `StartKYB`

```curl
curl --request POST \
  --url https://sandbox.atelio.com/api/v0.1/businesses/002e0f0e-e39d-4351-876c-afcad30d9c37/verification-kyb \
  --header 'Authorization: <YOUR_AUTHORIZATION>' \
  --header 'Identity: <YOUR_IDENTITY>' \
  --header 'Program ID: <YOUR_PROGRAM_ID>'
```

### Example response

When you initiate a KYB process, the KYB service responds with an `initiated` message similar to the one shown below.

JSON

```json
{
    "business_id": "002e0f0e-e39d-4351-876c-afcad30d9c37",
    "kyb_status": "initiated"
}
```


## Listen for webhook events

After initiating KYB, Atelio sends the results via a [webhook](https://docs.atelio.com/embedded/docs/webhook). If a business fails the KYB check and can't pass a manual check, you can't issue them a card.

The following table lists the possible responses to a KYB request:

| Event enum values | Description |
| --- | --- |
| `kyb.verification.approved` | KYB passed. |
| `kyb.verification.error` | KYB failed due to a server error. To retry, send a `POST /businesses/{business_id}/verification-kyb`. |
| `kyb.verification.initiated` | The KYB process has been started. |
| `kyb.verification.rejected` | KYB failed due to low confidence in identity validation. |
| `kyb.verification.warning` | KYB requires manual review. The response contains any business information which could not be verified. |

### Example event responses

<Tabs>
    <TabItem value="approved" label="Approved" Default>

        ```json
        {
            "event": "kyb.verification.approved",
            "business_id": "002e0f0e-e39d-4351-876c-afcad30d9c37",
            "occurred_at": "2021-02-02-00:50:58.484840+00:00"
        }
        ```
    </TabItem>
    <TabItem value="rejected" label="Rejected">

        ```json
        {
            "event": "kyb.verification.rejected",
            "business_id": "002e0f0e-e39d-4351-876c-afcad30d9c37",
            "occurred_at": "2021-02-02-00:50:58.484840+00:00",
            "details" :[
                {
                "code": "rejected_address",
                "reason" : "address verification failed"
                },
                {
                "code": "rejected_tin",
                "reason" : "TIN verification failed"
                },
                {
                "code": "rejected_name",
                "reason" : "name verification failed"
                },
                {
                "code": "rejected_watchlist",
                "reason" : "watchlist verification failed."
                }
            ]
            }
        ```
    </TabItem>
    <TabItem value="warning" label="Warning">

        ```json
        {
        "event":"kyb.verification.warning",
        "business_id":"002e0f0e-e39d-4351-876c-afcad30d9c37",
        "occurred_at":"2021-02-02-00:50:58.484840+00:00"
        }
        ```
    </TabItem>
    <TabItem value="error" label="Error">

        ```json
        {
            "event": "kyb.verification.error",
            "business_id": "002e0f0e-e39d-4351-876c-afcad30d9c37",
            "occurred_at": "2021-02-02-00:50:58.484840+00:00"
        }
        ```
    </TabItem>
</Tabs>

## Get KYB status

To retrieve the KYB status of a business, use the [GetKYBStatus](https://docs.atelio.com/embedded/reference/post_kyb_2) endpoint.

The following is an example of a KYB status retrieval request:

### Example request of `GetKYBStatus`

```curl
curl --request GET \
  --url https://sandbox.atelio.com/api/v0.1/businesses/002e0f0e-e39d-4351-876c-afcad30d9c37/verification-kyb \
  --header 'Authorization: <YOUR_AUTHORIZATION>' \
  --header 'Identity: <YOUR_IDENTITY>' \
  --header 'Program ID: <YOUR_PROGRAM_ID>'
```

### Example response

<Tabs>
    <TabItem value="rejected" label="Rejected" Default>

        ```json
        {
        "business_id": "002e0f0e-e39d-4351-876c-afcad30d9c37",
        "kyb_status": "rejected",
        "details" :
        [
            {
            "code": "rejected_address",
            "reason" : "address verification failed"
            },
            {
            "code": "rejected_tin",
            "reason" : "TIN verification failed"
            },
            {
            "code": "rejected_name",
            "reason" : "name verification failed"
            },
            {
            "code": "rejected_watchlist",
            "reason" : "watchlist verification failed."
            }
        ]
        }
        ```
    </TabItem>
    <TabItem value="approved" label="Approved">

        ```json
        {
        "business_id": "002e0f0e-e39d-4351-876c-afcad30d9c37",
        "kyb_status": "approved",
        }
        ```
    </TabItem>
</Tabs>

## Get KYB history

You can retrieve the history of KYB verification attempts for a business using the KYB history endpoint. This is useful for auditing purposes or troubleshooting verification issues.

To retrieve the KYB history, send a GET request to the `/businesses/{business_id}/kyb-history` endpoint.

### Example request of `kyb-history`

```curl
curl --request GET \
  --url https://sandbox.atelio.com/api/v0.1/businesses/{business_id}/kyb-history \
  --header 'Authorization: <YOUR_AUTHORIZATION>' \
  --header 'Identity: <YOUR_IDENTITY>'
```

### Example response

The JSON response includes pagination information and an array of KYB verification records:

```json
{
  "page_info": {
    "page_size": 10,
    "page": 1,
    "pages": 2
  },
  "data": [
    {
      "vendor_kyb_id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
      "vendor": "persona",
      "business_id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
      "brand_id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
      "program_id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
      "verification_name": "Business Verification",
      "status": "approved",
      "reason": ["No issues found"],
      "requirement": null,
      "verification_metadata": {"example_key": "example_value"},
      "event_id": "event_12345",
      "verification_type": "kyb_v2"
    }
  ]
}
```

The endpoint supports pagination with the following query parameters:

- `page`: The page number to retrieve (default: 1)
- `count`: The number of records per page (default: 100)

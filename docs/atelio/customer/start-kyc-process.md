import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# Start KYC process

## Introduction

Starting the KYC process involves validating your customer's identity and documents to ensure compliance with federal regulations.


## Before you start

- **You need a program ID** Start by retrieving your program ID from the Atelio Portal under the Developers tab. For more information on what a program ID represents, please see Card program ID.
- **Create a customer or retrieve an existing customer**: First, use the Customer API [to retrieve an existing customer](https://docs.atelio.com/embedded/reference/get_customers_id) or [create a new one](https://docs.atelio.com/embedded/reference/post_customers), then obtain their `customer_id`endpoint to get the `customer_id` using their `brand_person_id`.
- **Register webhooks**: We use [webhooks](https://docs.atelio.com/embedded/docs/webhook) to signal asynchronously that work has been done in response to certain API requests. These webhooks are for convenience and any information provided asynchronously by the webhooks can also be queried using synchronous API requests. For this guide, we are interested in webhooks, specifically for the KYC process.


## KYC process flow

1. **Start KYC process**: Initiate the KYC process on a customer by calling the [StartKYC](https://docs.atelio.com/embedded/reference/post_verification_kyc) endpoint. For a [secured charge card program](https://docs.atelio.com/embedded/docs/secured-charge-card-overview), you'll use the [SubmitCreditApplication](https://docs.atelio.com/embedded/reference/credit-applications-submit) API to submit the credit application, which enables Atelio to automatically start the KYC process.
2. **Get KYC status** Retrieve the KYC status using the [GetKYCStatus](https://docs.atelio.com/embedded/reference/get_verification_kyc) endpoint.
3. After a KYC is successfully initialized, it will reach Atelio's automatic evaluation process. If the customer information provided is sufficient to fulfill KYC obligations, and the customer will be eligible for Atelio's financial products. Learn more about Atelio's evaluation process below.

### Initiate KYC

To initiate a KYC request, call [StartKYC](https://docs.atelio.com/embedded/reference/post_verification_kyc) and provide the parameters in the following table.

> 📘 **Note**
>
> The KYC endpoint is idempotent, so repeated requests using the same `Idempotency-Key` within a 24 hour period will fail.

| Parameter | Type | Description |
| --- | --- | --- |
| `program_id` **required** | string | Program UUID, for example `72585109-8222-4221-b15b-48e87ffed790`. |
| `ssn` | string | Social security number of the form ######### or ###-##-####, for example 123-45-6789. |
| `phone` | string | Numeric or numeric/dashes, for example `555-111-2222`. |
| `phone_country_code` | string | Numeric, between 1 and 3 digits, for example `325`. |
| `email` | string | Valid email address, for example `nick.smith@goldfinger.com` |
| `ip`\ **conditionally required based on program configuration** | string | Valid IPV4 dot-separated address, for example `192.168.1.139`.<br/>Can be conditionally required based on `program_id`. |

The combination of `customer_id` and `program_id` in the request indicates that Atelio will do a verification check on a particular customer on behalf of a particular bank partnered with the brand.

The KYC request for the customer is asynchronous (meaning that the reply is not always immediate), so you must configure a [webhook](https://docs.atelio.com/embedded/docs/webhook) to listen for KYC events.

**Example request**

StartKYC

```curl
curl --request POST \
     --url https://sandbox.atelio.com/api/v0.1/customers/2df10ec1-130f-41bb-b0cf-f3af48350eb7/verification-kyc \
     --header 'Accept: application/json' \
     --header 'Authorization: YOUR-AUTHENTICATION' \
     --header 'Content-Type: application/json' \
     --header 'Identity: <YOUR_IDENTITY>' \
     --data '
{
     "program_id": "72585109-8222-4221-b15b-48e87ffed790",
     "ip": "24.54.101.22"
}
'
```

**Example response**

The results of the KYC will be sent via [webhook events](https://docs.atelio.com/embedded/docs/kyc#kyc-webhook-events). For information on subscribing to Atelio platform webhook events, see [Event subscriptions](https://docs.atelio.com/embedded/docs/event-subscriptions) and [Accepting webhook requests](https://docs.atelio.com/embedded/docs/signatures).

KYC submitted

```json
{
  "customer_id": "2df10ec1-130f-41bb-b0cf-f3af48350eb7",
  "kyc_status": "submitted"
}
```

The following are some event responses:

<Tabs>
    <TabItem value="success" label="Success" default>

        ```json
        {
            "event": "kyc.verification.success",
            "customer_id": "a5bcf5a8-c4e0-4025-8183-5346176ee3db",
            "occurred_at": "2021-02-02-00:50:58.484840+00:00"
        }
        ```
    </TabItem>
    <TabItem value="failure" label="Failure">

        ```json
        {
            "event": "kyc.verification.failure",
            "customer_id": "a5bcf5a8-c4e0-4025-8183-5346176ee3db",
            "occurred_at": "2021-02-02-00:50:58.484840+00:00"
        }
        ```
    </TabItem>
    <TabItem value="error" label="Error">

        ```json
        {
            "event": "kyc.verification.error",
            "customer_id": "a5bcf5a8-c4e0-4025-8183-5346176ee3db",
            "occurred_at": "2021-02-02-00:50:58.484840+00:00"
        }
        ```
    </TabItem>
    <TabItem value="timeout" label="Timeout">

        ```json
        {
            "event": "kyc.verification.timeout",
            "customer_id": "a5bcf5a8-c4e0-4025-8183-5346176ee3db",
            "occurred_at": "2021-02-02-00:50:58.484840+00:00"
        }
        ```
    </TabItem>
    <TabItem value="documents_required" label="Documents required">

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
    <TabItem value="reenter_info" label="Reenter information">

        ```json
        {
        "customer_id": "ef096b64-7409-40cd-9879-badd905dc6a5",
        "event": "kyc.verification.reenter_information",
        "description": "Re enter the below information for this customer's KYC attempt on program a2a0f2fc-ea8f-4ada-ad22-a1fbb0ca138a",
        "fields": [\
            "first_name",\
            "last_name",\
            "ssn"\
        ]
        }
        ```
    </TabItem>
</Tabs>

After a customer has been successfully vetted, further KYC attempts are not allowed. The KYC service responds with an error and displays the timestamp of the previous successful KYC request.

### Retrieve the KYC status

To retrieve the KYC status for a customer, call [GetKYCStatus](https://docs.atelio.com/embedded/reference/get_verification_kyc) and provide the `program_id`.

An example of a request to retrieve the KYC status is shown below.

**Example request**

Get KYC status

```curl
curl --request GET \
     --url 'https://sandbox.atelio.com/api/v0.1/customers/931e2341-c3eb-4681-97d4-f6e09d90da14/verification-kyc?program_id=72585109-8222-4221-b15b-48e87ffed790' \
     --header 'Authorization: <YOUR_AUTHORIZATION>' \
     --header 'Identity: <YOUR_IDENTITY>'
```

**Example response**

The response includes the overall status of the KYC and failure reasons if applicable, as shown in the example below.

JSON

```json
{
    "customer_id": "d856bf10-d4a6-4153-b8f8-2b93072dd8da",
    "brand_id": "ce027c9c-39c6-47f4-a12d-abb543f7cf63",
    "kyc_status": "passed"
}
```

The following table provides a list of possible KYC statuses.

| Status&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; | Description |
| ------------------- | ----------- |
| `passed`            | Successful KYC. Signaled by the `kyc.verification.success` webhook event. |
| `failed`            | Unsuccessful KYC. Signaled by the `kyc.verification.failure` event. |
| `document required` | KYC requires additional supporting information. Signaled by the `kyc.verification.document_required` event. |
| `under review`      | KYC has been flagged for further review. Signaled by the `kyc.verification.under_review` webhook. |
| `error`             | KYC request has encountered a server error. Signaled by the `kyc.verification.error` webhook. Use the [Start KYC](ref:post_verification_kyc) endpoint to retry. |
| `expired`           | KYC request has encountered a networking error. Signaled by the `kyc.verification.timeout` webhook. Use the [Start KYC](ref:post_verification_kyc) endpoint to retry. |


## KYC webhook events

We provide a `kyc.verification.status``passed`/`failed` response to the `callback_url` configured in the webhook. If the `kyc.verification.status` is `passed`, the customer's information has been validated and they are eligible to access the services provided by the bank. You can now create a card for the customer.

| `kyc.verification`<br/>values | Description |
| --- | --- |
| `.document_required` | KYC requires further information to continue. This includes a `documents` field that indicates the types of documents required. See [documents required](https://docs.atelio.com/embedded/docs/kyc-documentation#example-webhook). |
| `.error` | KYC failed to complete due to server error. <br/>Send a `POST /customer/{customer_id}/verification-kyc` to retry |
| `.failure` | KYC failed due to low confidence in identity validation |
| `.reenter_information` | This is optional and will be sent at the same time as `kyc.verification.document_required`<br/>Customer might have entered information incorrectly, and can potentially resolve the exception by reentering their information. This includes an 'incorrect\_information' field that indicates the specific piece of information that should be checked by the customer. |
| `.success` | KYC passed |
| `.timeout` | KYC failed to complete due to connection timeout to the KYC vendor (Persona). <br/>Send a `POST /customer/{customer_id}/verification-kyc` request to retry.<br/>If the customer does not upload documents within 28 days, the customer's KYC attempt expires and a `kyc.verification.timeout` webhook is sent to any subscribed listeners. A new KYC must be initialized for customers when this happens.<br/>You can differentiate between the two webhook cases by checking if the `kyc.verification.document_required` webhook was sent and/or by tracking completed KYC process steps using a flag or timestamp on your backend. |
| `.under_review` | KYC documents have been submitted and are under review. |

> 📘 **`kyc.verification.timeout` events**
>
> To distinguish between timeout events due to connection issues vs. document upload expiry timeouts, you may need to check to see if a `kyc.verification.document_required` webhook was sent for that customer and have some sort of flag or timestamp on your backend to track completion of KYC process steps. Worth noting, however, is that whether the `document_required` webhook is sent depends on how the customer failed or abandoned their KYC process. Some customers can just abandon their KYC without reaching the document collection step, in which case their KYC will expire without the `document_required` webhook being sent.

For further information, see [Webhooks](https://docs.atelio.com/embedded/docs/webhook) and [Webhook events and subscriptions](https://docs.atelio.com/embedded/docs/event-subscriptions).

For a complete specification and interactive examples, see [Create webhook subscription](https://docs.atelio.com/embedded/reference/post_webhooks) in the Atelio API Reference.

## KYC exceptions

### Documents required

A KYC process may require one or more documents to be submitted. When this happens, a webhook is sent with the type of document required and the KYC status is set to `kyc.verification.document_required`. For details on uploading documents, see [KYC document upload](doc:kyc-documentation).

Depending on whether the documents are approved or they need to be reviewed, the status changes to either `kyc.verification.success` or `kyc.verification.under_review` respectively, and a webhook is sent.

### Documents under review

After you upload the required documents and they need to be reviewed, a webhook is sent and the KYC status is set to `kyc.verification.under_review`. You don’t need to take any further action. Once the review is complete, a webhook is sent and the status is updated to either `kyc.verification.success` or `kyc.verification.failure`.

### Reenter Information

In some cases, you will receive a webhook to reenter KYC information at the same time as the documents required webhook. This indicates that the user may have mistakenly entered incorrect information, and the exception can be resolved if they make a correction. You can still follow the Documents required path if you would like.

We recommend showing the customer the information that might need to be changed in your UI. If they change that information, call the [Update a Customer](ref:patch_customers) endpoint to update that in Atelio, then submit the KYC again.

In the event of an SSN being corrected by the customer, you do not need to use the Update a Customer endpoint. You can just submit the KYC again using the updated SSN.

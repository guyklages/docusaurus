import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# KYC sandbox scenarios


## Trigger KYC Scenarios

As a way to trigger certain actions in the sandbox, Atelio provides predefined Social Security Numbers. Using a specific SSN causes the related action to be triggered. For example, using the SSN `333-33-3333` causes KYC to generate a request for `government_id`, and can also be used for document upload testing.

In general, running a KYC in the sandbox results in a passing status and a corresponding `kyc.verification.success` webhook event. However, for testing purposes you might want to trigger other KYC scenarios.

The table below shows the predefined SSNs and what each of them triggers.

| Social&nbsp;Security&nbsp;Number | Triggered action |
| --- | --- |
| `000-00-0000` | Assigns the `under_review` status to the KYC attempt and sends a `kyc.verification.under_review` webhook event. |
| `111-11-1111` | Assigns a status of `document_required` and sends a `kyc.verification.document_required` webhook event prompting for an SSN verification and government ID. |
| `222-22-2222` | Assigns a status of `document_required` and sends a `kyc.verification.document_required` webhook event prompting for a government ID and proof of address. |
| `333-33-3333` | Assigns a status of `document_required` and sends a `kyc.verification.document_required` webhook event with a document request for a `government_id`. |
| `444-44-4444` | Assigns a status of `document_required` and sends a `kyc.verification.document_required` webhook event prompting for an SSN verification, government ID, and proof of address. |


## Manually overriding KYC status

Atelio gives you the ability to manually override the KYC status of a customer or Beneficial Owner in the sandbox to either `passed` or `failed`, and sending a corresponding webhook event. Doing so can assist you in testing your apps that require a customer or Beneficial Owner to have a specific KYC status.

To trigger KYC pass/failure, use the [SimulateKYCPass](https://docs.atelio.com/embedded/reference/post_simulate_kyc_pass) or [SimulateKYCFail](https://docs.atelio.com/embedded/reference/post_simulate_kyc_fail) operations and provide the `customer_id` and `program_id`.

### Example request

An example of a request to change the KYC status to `passed` is shown below.

KYC pass

```curl
curl --request POST \
     --url https://sandbox.atelio.com/api/v0.1/simulate/kyc-pass \
     --header 'Accept: application/json' \
     --header 'Authorization: <YOUR_AUTHORIZATION>' \
     --header 'Content-Type: application/json' \
     --header 'Identity: <YOUR_IDENTITY>' \
     --data '
{
     "customer_id": "931e2341-c3eb-4681-97d4-f6e09d90da14",
     "program_id": "b1dc430b-3892-47f0-a27c-ec05f8c428db"
}
'
```

### Example response

When the request is submitted, a webhook event is sent, an example of which is shown below.

JSON

```json
{
  "event": "kyc.verification.success",
  "customer_id": "931e2341-c3eb-4681-97d4-f6e09d90da14",
  "occurred_at": "2021-10-17T11:25:37.369236+00:00"
}
```

The following is an example of a response to a successful request to change the KYC status.

<Tabs>
    <TabItem value='passed' label='Passed' Default>

        ```json
        {
        "customer_id": "931e2341-c3eb-4681-97d4-f6e09d90da14",
        "kyc_status": "passed"
        }
        ```
    </TabItem>
    <TabItem value='failed' label='Failed'>

        ```json
        {
        "customer_id": "931e2341-c3eb-4681-97d4-f6e09d90da14",
        "kyc_status": "failed"
        }
        ```
    </TabItem>
</Tabs>


## Resuming an inquiry

Persona may require resuming inquiries in certain scenarios. If so, see [Persona's documentation](https://docs.withpersona.com/docs/inquiries-resuming-inquiries) .

Bond provides a pass-through endpoint ( [resume\_payload](https://docs.atelio.com/embedded/reference/post_resume_payload) ) to fetch a session token to resume a Persona inquiry.

This is not a new change from the legacy KYC flow, but it is important to implement as part of this flow.

> 📘 **Note**
>
> For integrations leveraging Persona's Hosted Flow (e.g. opening the `upload_link` provided directly in the documents array), you won't be able to get feedback on whether the inquiry may be resumed. In these cases, you are welcome to provide a session token via [query params](https://docs.withpersona.com/docs/inquiries-resuming-inquiries#hosted-flow) for all inquiries, even if they do not need to be resumed.

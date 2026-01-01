# Upload KYC documentation


## Introduction

As part of the KYC check, you might receive a webhook event (`kyc.verification.document_required`) asking for documents to be uploaded for validation. This might happen, for example, when a customer’s name does not match with the name in an SSN lookup. You can upload documents using the [upload links](https://docs.atelio.com/embedded/docs/kyc-documentation#document-upload-links).

### Documents submission process

The basic document process is as follows:

1. Upload the requested docs using either the links provided. The KYC response may request fewer than three documents. In this case, provide the relevant body parameters for the requested document(s) and ignore the parameters for the other documents.
2. Following the upload, you'll receive a message similar to the following:

JSON

```
{
    "customer_id": "a5bcf5a8-c4e0-4025-8183-5346176ee3db",
    "num_documents_submitted": 2
}
```

3. After your customer has submitted **all** the required documents requested, a `kyc.verification.under_review` webhook event is sent, as shown in the example below.

JSON

```
{
    "event": "kyc.verification.under_review",
    "customer_id": "a5bcf5a8-c4e0-4025-8183-5346176ee3db",
    "occurred_at": "2021-02-02-00:50:58.484840+00:00"
}
```

4. After the necessary checks on the submitted documents have been completed, a `kyc.verification.success` or `kyc.verification.failed` webhook event is sent.

### Supported document format types

| File types | Document types |
| ---------- | -------------- |
| - `.heic` <br/> - `.jpg` <br/> - `.pdf` <br/> - `.png` | - Government ID <br/> - Proof of address <br/> - Social security card |

## Document upload links

Atelio provides a fully hosted solution for uploading KYC documentation so that you can offer your customers a seamless experience as part of the verification process. In our webhook response, we provide HTTPS links that you can embed/forward your customer to that can collect the documents safely and securely. Loading the link triggers the steps that guide a customer through the document upload process.

### Using the links to upload documents

The specific documents needed to verify an identity are indicated in the `kyc.verification.documents_required` webhook event. Each required document contains a secure link indicated by `upload_link`. The documents must be uploaded as base64-encoded strings. Each document also contains a `status`, which can be either `submitted` or `required` and indicates if a document has been uploaded or not.

An example of a `kyc.verification.documents_required` webhook event is shown in the example below.

**Example respnse**

JSON

```
{
    "event": "kyc.verification.document_required",
    "customer_id": "a5bcf5a8-c4e0-4025-8183-5346176ee3db",
    "occurred_at": "2021-02-02-00:50:58.484840+00:00",
    "documents":[\
      {\
        "document_type": "government_id",\
        "upload_link": "https://withpersona.com/verify?template-id=tmpl_111111111111111111111111&inquiry-id=a5bcf5a8-c4e0-4025-8183-5346176ee3db",\
        "status": "required"\
      },\
      {\
        "document_type": "proof_of_address",\
        "upload_link": "https://withpersona.com/verify?template-id=tmpl_222222222222222222222222&inquiry-id=a5bcf5a8-c4e0-4025-8183-5346176ee3db",\
        "status": "required"\
      },\
      {\
        "document_type": "social_security_card",\
        "upload_link": "https://withpersona.com/verify?template-id=tmpl_333333333333333333333333&inquiry-id=a5bcf5a8-c4e0-4025-8183-5346176ee3db",\
        "status": "required"\
      },\
    ]
}
```

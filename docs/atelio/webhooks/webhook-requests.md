import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# Webhook requests

## Introduction

This guide describes how to accept and handle webhook events.

## Configuring a callback URL 

The webhook callback URL used for an event subscription needs to be configured on the your system to accept an HTTPS `POST` request in JSON format. After verifying the request signature provided in the headers, the preconfigured endpoint needs to return a `200` (OK) or `201` (created) HTTP response code to the Webhooks API request made using the `atelio.com` domain. All webhook requests come from this domain which must be whitelisted on your system for further authentication.

> 📘 **Webhook authentication**
>
> Verify the webhook signature before handling the request.

## Webhook event examples 

<Tabs>
    <TabItem value="success" label="KYC success" default>

        ```json
        {
            "event": "kyc.verification.success",
            "customer_id": "931e2341-c3eb-4681-97d4-f6e09d90da14",
            "occurred_at": "2021-10-20T10:27:20.154286+00:00"
        }
        ```
    </TabItem>
    <TabItem value="failure" label="KYC failure">

        ```json
        {
            "event": "kyc.verification.failure",
            "customer_id": "931e2341-c3eb-4681-97d4-f6e09d90da14",
            "occurred_at": "2021-10-20T10:35:34.781911+00:00"
        }
        ```
    </TabItem>
</Tabs>

## Signature verification

The request from the Webhooks API to the developer's system also contains the `Bond-Signature` header used for verifying the request. The request should only be processed if the signature can be verified. This header takes the form of `Bond-Signature: t={timestamp},v1={version 1 digest},v2={new version 2 digest}` and contains:

- timestamp `t` formed at the time of the request
- signature digest of fixed version `v1`
- signature digest of the new version `v2`

The following is an example of this header.

JSON

```json
{
     'Bond-Signature':
     't=1598980451,v1=3095c22f29d051e548cffd90c899369985f6e2b6,v2=536e828135322f29d051e548cffd90c69985f'
}
```

The signature digest is generated using keyed-hashing for message authentication [HMAC](https://en.wikipedia.org/wiki/HMAC), using the SHA-256 hash algorithm. For details, see the implementation of the [hmac module](https://docs.python.org/3/library/hmac.html) in Python's standard library or others in the code snippets below. You should calculate and verify the signature digest before processing the request.

The signature digest is calculated by encoding the webhook `secret` provided during event subscription, the timestamp `t` found in the header, and the event `payload`, all as byte strings using UTF-8 encoding. The procedure for doing this is as follows:

1. Encode the webhook `secret`.
2. Encode the concatenation of the timestamp `t` as a string, the character `.` (period), and:

   - `v1`: the event JSON payload (the request body) as a string
   - `v2`: the raw request BODY with no modifications
3. Compute an HMAC using SHA-256 from the encoded webhook secret and encoded string from step 2.
4. Compare this calculated signature digest with `v1` or `v2` from the header, depending on whether you used JSON or the raw request `BODY`.

If the computed digest matches the provided digest, then the request can be processed.

For code examples of signature verification, see [Signature verification examples](https://docs.atelio.com/embedded/docs/signatures#signature-verification-examples). Note that the `v1` signature is prepared using `python` style JSON parsing which may result in different strings in other languages and parsing strategies. We now recommend using a `v2` digest based on the raw `BODY` which is unambiguous across languages and server frameworks.

## Event handling

The request from the Atelio platform to your system contains the event subscription as the body. This provides all the relevant information concerning this event. The event enum label is also shown, as seen in the example below.

JSON

```json
{
    "event": "event.label",
    "customer_id": "customer_uuid",
    "verification": "verification_status",
    "occurred_at": "timestamp",
}
```

Events should be processed and recorded following your business logic. In rare cases, the event may be received more than once, so event processing should be idempotent. One way to accomplish this, is to not process any events that have already been received and logged.

> 📘 **Handling duplicate webhooks**
>
> Use the combination of `occurred_at` and `event` to match a webhook that your server receives with one that you have already processed to identify a possible duplicate.

## Error handling

If a `200` or `201` response code is not received, the Webhooks API retries the request using exponential backoff for up to three days. This adds up to approximately eight retry attempts until a successful response is returned.

If you see that your server is not responding with `200` or `201` for webhooks, check which events are not being accepted by your server.

## Signature verification examples  

<Tabs>
    <TabItem value="go" label="Go">

        ```go
        import (
            "strings"
            "crypto/hmac"
            "crypto/sha256"
            "encoding/hex"
        )

        func validate_signature_v2(body string, timestamp int, secret string, signature string) bool {
            digest := hmac.New(sha256.New, []byte(secret))
            digest.Write([]byte(fmt.Sprintf("%d.%s", timestamp, body)))
            sigmac, _ := hex.DecodeString(signature)
            return hmac.Equal(digest.Sum(nil), sigmac)
        }

        # retrieving values from header stored in "sigheader"
        values := make(map[string]string)
        for _, kvp := range strings.Split(sigheader, ",") {
            data := strings.Split(kvp, "=")
            values[data[0]] = data[1]
        } # values has keys t, v1, v2
        ```
    </TabItem>
    <TabItem value="javascript" label="JavaScript">

        ```javascript
        function validate_signature_v2(body, timestamp, secret, signature) {
            const text = `${timestamp}.${body}`;
            const digest = Buffer.from(
                crypto.createHmac('sha256', secret).update(text).digest('hex'), "utf8"
            );
            return crypto.timingSafeEqual(digest, Buffer.from(signature, 'utf8'));
        }

        // retrieving values from header stored in "sigheader"
        let values = Object.fromEntries(
            sigheader.split(",").map((kvp) => (kvp.split("=")))
        ); // values has keys t, v1, v2
        ```
    </TabItem>
    <TabItem value="python" label="Python">

        ```python
        def validate_signature_v2(
            body: Union[str, bytes], timestamp: int, secret: str, signature: str
        ) -> bool:
            to_digest = f"{timestamp}.".encode(encoding="UTF-8")
            if isinstance(body, str):
                to_digest += body.encode(encoding="UTF-8")
            else:
                to_digest += body
            digest = hmac.new(
                secret.encode(encoding="UTF-8"),
                to_digest,
                "sha256",
            ).hexdigest()
            return hmac.compare_digest(digest, signature)

        # retrieving values from header stored in "sigheader"
        values = {kvp[0]: kvp[1] for kvp in [kvp.split("=") for kvp in sigheader.split(",")]}
        # values has keys t, v1, v2
        ```
    </TabItem>
    <TabItem value="ruby" label="Ruby">

        ```ruby
        def validate_signature_v2(body, timestamp, secret, signature)
            digest = OpenSSL::Digest.new('sha256')
            message = timestamp + "." + body
            return OpenSSL::HMAC.hexdigest(digest, secret, message) == signature
            # timing attack safe?
        end

        # retrieving values from header stored in "sigheader"
        values = {}
        sigheader.split(",").map!{|kvp| kvp.split("=") }.each{|k, v| values[k]=v}
        # values has keys t, v1, v2
        ```
    </TabItem>
</Tabs>

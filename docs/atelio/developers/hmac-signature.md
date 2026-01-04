# HMAC signature

## Introduction

Some API calls require the extra security of using an HMAC signature.

**Note**: For each API request, a unique HMAC signature must be created.


## Setting the Authorization Header

Notate your Brand ID, which you can find in the [Developers tab in the portal](https://identity.atelio.com/).

Create an API key, as detailed in the [Quickstart](https://docs.atelio.com/embedded/docs/quickstart)

Create the HMAC signature. This signature must be created for every Identity API request.

1. Construct the request URI details in the following format: `{timestamp}{HttpVerb}{requestPath}{queryParameters}`


    1. `timestamp` in Unix timestamp format.
    2. `HttpVerb` is either `DELETE`, `GET`, `PATCH`, `POST`, or `PUT`.
    3. `requestPath` without the leading forward-slash (`/`).
    4. `queryParameters` starts with a single question mark (`?`), lists key-value pairs sorted by key, and separates the parameters with ampersands (`&`).

    Example: `1745601487832GETidentity/v0.1/sample/endpoint?queryParamOne=sample&queryParamTwo=sample`

2. If the request contains a body or payload, concatenate it to the request URI details generated above.

#### Example:

```curl title="cURL"
1745609221667POSTidentity/v0.1/post-endpoint{
  "example": "value"
}
```

3. Create a base64 Hash using the concatenated request URI and body.
4. Create the hmacSHA by signing the base64 Hash, using your API Authorization secret retrieved from the portal and using the [HmacSha256](https://datatracker.ietf.org/doc/html/rfc4868) algorithm. The following are common libraries to sign the secret:
    1. `Javascript` \- crypto-js
    2. `Java` \- [javax.crypto](https://docs.oracle.com/en/java/javase/21/docs/api/java.base/javax/crypto/package-summary.html) base library
5. Prefix the hmacSHA with additional details: `FIS {brandId}:{Identity}:v1:{timestamp}:{hmacSHA}`.
    1. `brandId` \- The brand ID as retrieved from the portal.
    2. `Identity` \- The API Key Identity as created in the portal.
    3. `Timestamp` \- The Unix timestamp.
6. Add an HTTP header to the request, with the following:
    1. HTTP Header key `Authorization`
    2. HTTP Header value using the prefixed HmacSHA as created in the previous step; for example, `FIS 09544237-fa3b-4a93-bf2e-f8c46b550a4d:4f3ef0f0-ed19-4f88-9a04-22ce4e663e99:v1:1745601066920:9nSvwsFp7iv7JTnS9uYbW4XnG/9Aq5wpsuTaIcW46pA=`

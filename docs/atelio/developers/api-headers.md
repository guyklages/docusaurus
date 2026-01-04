# API headers

## Introduction

HTTP headers are an important part of the API request and response as they represent the metadata associated with the API request and response. Headers carry information for:

- Request and response bodies
- Request authorization
- Response caching
- Response cookies

Other than the above categories, headers also carry other information regarding HTTP connection types, proxies, and many others. Most of these headers are for management of connections between client, server, and proxies, and they do not require explicit validation through testing.

Headers are mostly classified as request headers and response headers. You need to set the request headers when you are sending the request for testing an API. You also need to ensure that the correct headers are being returned in the response headers.

The header fields are transmitted after the request line (in case of a request HTTP message) or the response line (in case of a response HTTP message), which is the first line of a message. Header fields are colon-separated key-value pairs in clear-text string format, terminated by a carriage return (CR) and line feed (LF) character sequence. The end of the header section is indicated by an empty field line, resulting in the transmission of two consecutive CR-LF pairs.

> 📘 **Note**
>
> Header field names are not case sensitive.


## Example header

The following is an example of a header.

```curl title="cURL"
curl --request GET \
     --url 'https://sandbox.bond.tech/api/v0.1/customers?page=3&per_page=5' \
     --header 'Authorization: <YOUR_AUTHORIZATION>' \
     --header 'Identity: <YOUR_IDENTITY>'
```

## Common headers

Depending on the API, certain header fields may be required or optional and this is shown in the [API Reference Guide](ref:authentication).

The following table describes the headers that you will encounter the most.

| Header | Description |
| --- | --- |
| `Accept-Charset` | Tells the server about which character sets are acceptable by the client. |
| `Authorization`&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; | Carries the API key credentials containing the authentication information of the client for the resource being requested. |
| `Cache-Control` | The cache policy defined by the server for this response. A cached response can be stored by the client and re-used until the time defined by the Cache-Control header. |
| `Content-Type` | Indicates the media type (text/html or text/JSON) of the response sent to the client by the server. This helps the client to process the response body correctly. |
| `Idempotency-Key` | A unique string that makes POST requests idempotent, preventing duplicate operations when retrying requests. The key expires after 24 hours. Used for operations like transfers and KYC verification. |

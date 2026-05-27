# Consumer secured charge card

## Introduction

The Atelio consumer secured charge card widget is an embeddable solution that provides a user-facing experience for onboarding, issuing, and managing secured charge cards. With minimal integration effort, the embedded solution provides a rapid way to augment existing applications with a user interface built on the Atelio API platform.

The Atelio UI allows for customizable logos, colors, card art, and copy to provide a consistent brand experience designed to mesh with a wide variety of existing applications.

## Web and mobile support

The Atelio app is embeddable via a secured URL and designed to work in web applications (via an [iframe](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/iframe)) or native mobile applications (via [WebViews](https://developer.apple.com/documentation/webkit/wkwebview)). It utilizes a responsive UI with full support for desktop, tablet, and mobile screens.

## Authentication strategy

The embedded experience is designed to authenticate via Atelio-issued embed tokens. These tokens are generated with a Brand's API keys and passed to the Atelio app via URL parameters within the iframe / WebView. Since there is no user-facing authentication within the Atelio App, these tokens must be retrieved by the parent app within an existing authenticated user session.

> 📘 **Note**
>
> Since Atelio embed tokens must be issued with API keys, they should only be generated from a separate backend service to avoid storing these keys within the client application.

A typical authentication sequence will follow this pattern:

- User logs into the parent app with their credentials
- User visits a tab with the embedded Atelio app
- Parent app silently retrieves Atelio embed tokens
- Parent app mounts the Atelio app in iframe with embed tokens

Once a user's session is initialized with a pair of embed tokens, the Atelio app is able to maintain a continuous auth session via rotating refresh tokens directly via the Atelio APIs. This enables the Atelio API to issue short-lived tokens while removing the need for the parent app to directly manage refresh token requests.

## Generating tokens

In order to authenticate a user session, the first step is to issue a pair of embed tokens that can be used to mount the embedded Atelio app. The tokens are requested from the Atelio API with an existing set of API keys.

When issuing a set of tokens, the user scope is defined by a request body parameter `person_id`. This should be a Brand-defined 36-character UUID that Atelio will store to identify this user moving forward. Future tokens generated for this user must be issued for the same `person_id` in order to persist the user's data.

cURL

```curl
curl --request POST \
  --url https://api.embedded.atelio.com/api/auth/token \
  --header 'Identity: <YOUR_IDENTITY>' \
  --header 'Authorization: <YOUR_AUTHORIZATION>' \
  --header 'Content-Type: application/json' \
  --data '{
    "person_id": "<YOUR_INTERNAL_USER_ID>"
  }'
```

A successful response will include an `access_token` and a `refresh_token`.

JSON

```json
{
    "refresh_token": "eyJhbGciOiJIUzI...",
    "access_token": "eyJhbGciOiJIUzI1..."
}
```

When logging out a user, the `refresh_token`can be invalidated.

cURL

```curl
curl --request POST \
  --url https://api.embedded.atelio.com/api/auth/token/revoke \
  --header 'Content-Type: application/json' \
  --data '{
    "refresh_token": "eyJhbGciOiJIUzI..."
  }'
```

## Mounting the Atelio App

To initialize an authenticated session within the embedded app, mount the Atelio app within an iframe or Webview and pass the two embed tokens as URL parameters.

HTML

```html
<main>
  <iframe src=`https://embedded.atelio.com/?access_token=${access_token}&refresh_token=${refresh_token}` allow="clipboard-read; clipboard-write" id="bond_frame"></iframe>
</main>
```

The provided tokens will identify both the active user and the brand. The Atelio app will automatically load a custom brand theme and app configuration.

_Note: The Atelio embedded app includes copy buttons, e.g. for account/routing numbers. Be sure to include the`allow="clipboard-read; clipboard-write"` attribute when mounting the app to enable those._

## Handling expired sessions

In most circumstances, the Atelio app will be able to renew expired access tokens with the active refresh token. Refresh tokens have a 24-hour lifespan and are cycled every time an access token is renewed. Provided a user is active within a 24-hour window, the auth session can be extended indefinitely unless it is explicitly revoked. In the event that the Atelio app encounters an expired or invalid refresh token, it will emit an error via the `window.postMessage` method.

The parent app can listen for this event and reload the app with a new set of tokens.

JavaScript

```javascript
window.addEventListener("message", (event) => {
  if (event.origin === "https://embedded.atelio.com") {
     const message = JSON.parse(event.data);
     if (message.event === 'invalidToken') {
       // fetch fresh tokens and remount the Atelio app
     }
  }
}, false);
```

## Pre-populating customer info

The Atelio Embedded App contains an onboarding flow allowing a user to apply for a card, including entering personal information to perform KYC. If the brand had previously collected some or all of that information, this flow can be streamlined by pre-populating any information already collected. This can be done by hitting the Atelio API's [create customer endpoint](https://docs.atelio.com/embedded/reference/post_customers) prior to mounting the app, and supplying the `person_id` in that request as the `brand_person_id`.

cURL

```curl
curl --request POST \
  --url https://api.atelio.com/api/v0.1/customers \
  --header 'Identity: <YOUR_IDENTITY>' \
  --header 'Authorization: <YOUR_AUTHORIZATION>' \
  --header 'Content-Type: application/json' \
  --data '{
    "brand_person_id": "<YOUR_INTERNAL_USER_ID>",
    "first_name": "Mary",
    "last_name": "Smiles",
    "dob": "1988-12-19"
  }'
```

Partial information may be submitted; any information submitted will be used to pre-populate the form, and any fields that were not pre-populated will start out blank. Note that the `brand_person_id` **must** match the `person_id` supplied when generating tokens for the form to be pre-populated. Also note that even though the information is used to pre-populate the form, the user will still have the opportunity to change their information in the Embedded App's onboarding flow.

## Native Mobile Implementation

### Downloads

For parent web applications, the Atelio app will support file downloads by default. When used in a native mobile application via a `Webview`, web downloads are blocked on iOS / Android by default. On these devices, the parent application can implement another `postMessage` listener to capture download events and handle the file download appropriately on the device.

All user statements are emitted as a base64 source, while some legal agreements are downloadable via URL.

JavaScript

```javascript
window.addEventListener("message", (event) => {
  if (event.origin === "https://embedded.atelio.com") {
     const message = JSON.parse(event.data);
     if (message.event === 'downloadPdf') {
       if (message.payload.isBase64) {
         // save to device as <message.payload.filename> from base64 source <message.payload.source>
       } else {
       	 // save to device as <message.payload.filename> hosted at URL <message.payload.source>
       }
     }
  }
}, false);
```

### Media Playback 

To ensure full support for camera previews in some KYC flows, `allowsInlineMediaPlayback` should be enabled on the `Webview`that contains the embedded application. This property defaults to false on iOS webskit browsers and can cause camera previews to incorrectly open as a live broadcast. More information about this property is available [here](https://developer.apple.com/documentation/webkit/wkwebviewconfiguration/1614793-allowsinlinemediaplayback).

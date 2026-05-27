# Web SDK documentation

## BondCards

[BondCards SDK](https://docs.atelio.com/embedded/docs/web-sdk-documentation#bondcards-1) allows developers to make all calls to the APIs that securely store PCI data with a single function.

The SDK repo is `https://github.com/bond-tech/bond-sdk-web`.

### Typedefs

- [`FieldType`](https://docs.atelio.com/embedded/docs/web-sdk-documentation#fieldtype--codestringcode)—String
- [`FieldParams`](https://docs.atelio.com/embedded/docs/web-sdk-documentation#fieldparams--codeobjectcode)—Object
- [`successCallback`](https://docs.atelio.com/embedded/docs/web-sdk-documentation#successcallback--codefunctioncode)—Function
- [`errorCallback`](https://docs.atelio.com/embedded/docs/web-sdk-documentation#errorcallback--codefunctioncode)—Function

### BondCards

**Kind**: global class

- [new BondCards](https://docs.atelio.com/embedded/docs/web-sdk-documentation#new-bondcards)
- [bondCards.show](https://docs.atelio.com/embedded/docs/web-sdk-documentation#bondcardsshow)
- [bondCards.showMultiple](https://docs.atelio.com/embedded/docs/web-sdk-documentation#bondcardsshowmultiple)
- [bondCards.copy](https://docs.atelio.com/embedded/docs/web-sdk-documentation#bondcardscopy)
- [bondCards.field](https://docs.atelio.com/embedded/docs/web-sdk-documentation#bondcardsfield)
- [bonCards.submit](https://docs.atelio.com/embedded/docs/web-sdk-documentation#bondcardssubmit)
- [bondCards.reset](https://docs.atelio.com/embedded/docs/web-sdk-documentation#bondcardsreset)

### new BondCards

`new BondCards({ live: false })`

Create a BondCards instance.

| Parameter | Type | Default | Description |
| --- | --- | --- | --- |
| `live` | boolean | `false` | Sets the Bond platform environment, `true` to work with live, `false` for sandbox. |

### bondCards.show

`bondCards.show(cardId, identity, authorization, field, [htmlWrapper], htmlSelector, [css]) ⇒ <code>Promise</code>`

Display appropriate card data.

**Kind**: instance method of [`BondCards`](https://docs.atelio.com/embedded/docs/web-sdk-documentation#BondCards)

**Returns**: `Promise`—Returns a Promise that, when fulfilled, will either return an iFrame with the appropriate data or an error.

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| `cardId` | string |  | Unique ID used to identify a specific card |
| `identity` | string |  | Temporary identity token allowing the call |
| `authorization` | string |  | Temporary Authorization token |
| `field` | `number`/`cvv`/`expiry` |  | Field to get/show |
| `[htmlWrapper]` | string | `"text"` | Expected type of response data. 'image' is wrapped in an HTML tag. 'text' is inserted into an element inside the `iframe` |
| `htmlSelector` | string |  | Selector for the field/element where the iframe will be placed |
| `[css]` | object |  | Object of the CSS rules to apply to the response |

### bondCards.showMultiple

`bondCards.showMultiple(cardId, identity, authorization, fields) ⇒ <code>Promise</code>`

Display appropriate card data.

**Kind**: instance method of [`BondCards`](https://docs.atelio.com/embedded/docs/web-sdk-documentation#BondCards)

**Returns**: `Promise`—Returns a Promise that, when fulfilled, will either return list of iFrames with the appropriate data or an error.

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| `cardId` | string |  | Unique ID used to identify a specific card |
| `identity` | string |  | Temporary identity token that allows the call |
| `authorization` | string |  | Temporary Authorization token |
| `fields` | object |  | Object containing the requested fields |

### bondCards.copy

`bondCards.copy(iframe, htmlSelector, [css], [text], [callback]) ⇒ <code>Promise</code>`

Copy card data (one of number, expiry, cvv).

**Kind**: instance method of [`BondCards`](https://docs.atelio.com/embedded/docs/web-sdk-documentation#BondCards)

**Returns**: `Promise`—Returns a Promise that, when fulfilled, will either return an iFrame with the appropriate data or an error.

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| `iframe` | object |  | Iframe object returned from show method |
| `htmlSelector` | string |  | Selector for the field/element where the iframe will be placed |
| `[css]` | object |  | An object of CSS rules to apply to the response |
| `[text]` | string |  | Text of button |
| `[callback]` | function | `function() {}` | Function to call when copy handler called |

### bondCards.field

`bondCards.field(selector, type, [css], [placeholder], [successColor], [errorColor], [color], [lineHeight], [fontSize], [fontFamily], [disabled], [readOnly], [autoFocus]) ⇒ <code>Promise</code>`

Initialize a field in a form to submit for card manipulation.

**Kind**: instance method of [`BondCards`](https://docs.atelio.com/embedded/docs/web-sdk-documentation#BondCards)

**Returns**: `Promise`—Returns a Promise that, when fulfilled, will either initialize the field or return an error.

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| `selector` | string |  | CSS selector that points to the element where the field will be added |
| `type` | 'new\_pin' \| 'confirm\_pin' |  | Type of the field targeted |
| `[css]` | object | `{}` | Object of CSS rules to apply to the field |
| `[placeholder]` | string |  | Text to display when the field is empty |
| `[successColor]` | string |  | Text color when the field is valid |
| `[errorColor]` | string |  | Text color when the field is invalid |
| `[color]` | string |  | Text color |
| `[lineHeight]` | string |  | Line height value |
| `[fontSize]` | string |  | Size of text |
| `[fontFamily]` | string |  | Font family used in the text |
| `[disabled]` |  |  | Specifies that the input field is disabled |
| `[readOnly]` |  |  | Specifies that the input field is read only |
| `[autoFocus]` | string |  | Specifies that the input field should automatically be in focus when the page loads |
| `[hideValue]` | bool | `true` | Specifies that the input field should be masked with \*\*\*\* |

### bondCards.submit

`bondCards.submit(cardId, identity, authorization, newPin, confirmPin, callback, callback) ⇒ <code>Promise</code>`

Show appropriate card data.

**Kind**: instance method of [`BondCards`](https://docs.atelio.com/embedded/docs/web-sdk-documentation#BondCards)

**Returns**: `Promise`—Returns a Promise that, when fulfilled, will either return an iFrame with the appropriate data or an error.

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| `cardId` | string |  | Unique ID used to identify a specific card |
| `identity` | string |  | Temporary identity token allowing the call |
| `authorization` | string |  | Temporary Authorization token |
| `newPin` | string |  | New pin number |
| `confirmPin` | string |  | Repeated new pin number |
| `successCallback` | [successCallback](https://docs.atelio.com/embedded/docs/web-sdk-documentation#successcallback--codefunctioncode) |  | Function that will be executed when the HTTPRequest finishes successfully |
| `errorCallback` | [errorCallback](https://docs.atelio.com/embedded/docs/web-sdk-documentation#errorcallback--codefunctioncode) |  | Function Error handling callback. Triggered if one of the fields has an invalid value on submission. By default, pushes the error messages to the console |

### bondCards.reset()

Reset the form or a field.

**Kind**: Instance method of `BondCards`

### FieldType : `String`

**Kind**: global typedef

**Value**: `number` \| `cvv` \| `expiry`

### FieldParams : `Object`

**Kind**: global typedef

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| `[htmlWrapper]` | string | `"text"` | Expected type of response data. 'image' is wrapped in an HTML tag. 'text' is inserted into an element inside the `iframe` |
| `htmlSelector` | string |  | Selector for the field/element where the iframe will be placed |
| `[css]` | object | `{}` | Object of CSS rules to apply to the field |

### successCallback : `function`

**Kind**: global typedef

| Param | Type | Description |
| --- | --- | --- |
| `status` | string | HTTP status code of HTTPRequest |
| `response` | object | Response object |

### errorCallback : `function`

**Kind**: global typedef

|  |  |  |
| --- | --- | --- |
| `errors` | object | Object with error messages |


## BondExternalAccounts

For a complete specification and interactive examples, see [Linking external accounts](https://dash.readme.com/project/bond-baas-api/v0.1/refs/get_plaid_linked_account) in the Bond API Reference.

**Kind**: global class

- [new BondExternalAccounts](https://docs.atelio.com/embedded/docs/web-sdk-documentation#new-bondexternalaccounts)
- [bondExternalAccounts.linkAccount](https://docs.atelio.com/embedded/docs/web-sdk-documentation#bondexternalaccountslinkaccount)
- [bondExternalAccounts.microDeposit](https://docs.atelio.com/embedded/docs/web-sdk-documentation#bondexternalaccountsmicrodeposit)
- [bondExternalAccounts.deleteAccount](https://docs.atelio.com/embedded/docs/web-sdk-documentation#bondexternalaccountsdeleteexternalaccount)

### new BondExternalAccounts

`new BondExternalAccounts({ live: false })`

Create a BondExternalAccounts instance.

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| `live` | boolean | `false` | Sets the Bond environment, `true` to work with live, `false` for sandbox. |

### bondExternalAccounts.linkAccount 

`bondExternalAccounts.linkAccount({ customerId | businessId, identity, authorization })` ⇒ Promise

Connect external account.

**Kind**: instance method of `BondExternalAccounts`.

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| `[customerId]` | string |  | Customer to link an account for (supply only one of `customerId` or `businessId`) |
| `[businessId]` | string |  | Business to link an account for (supply only one of `customerId` or `businessId`) |
| `identity` | string |  | Temporary identity token allowing the call |
| `authorization` | string |  | Temporary Authorization token |

### bondExternalAccounts.microDeposit

`bondExternalAccounts.microDeposit({ linkedAccountId, identity, authorization })` ⇒ Promise

Micro deposit.

**Kind**: instance method of `BondExternalAccounts`

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| `linkedAccountId` | string |  | Linked account ID requiring a microdeposit |
| `identity` | string |  | Temporary identity token allowing the call |
| `authorization` | string |  | Temporary Authorization token |

### bondExternalAccounts.deleteExternalAccount

`bondExternalAccounts.deleteExternalAccount({ linkedAccountId, identity, authorization })` ⇒ Promise

Micro deposit.

**Kind**: instance method of `BondExternalAccounts`

|  |  |  |  |
| --- | --- | --- | --- |
| `linkedAccountId` | string |  | Linked account to delete |
| `identity` | string |  | Temporary identity token allowing the call |
| `authorization` | string |  | Temporary Authorization token |

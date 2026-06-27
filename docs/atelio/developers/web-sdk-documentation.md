# Web SDK documentation

## BondCards

[BondCards SDK](#bondcards-1) allows developers to make all calls to the APIs that securely store PCI data with a single function.

The SDK repo is `https://github.com/bond-tech/bond-sdk-web`.

### Typedefs

- [`FieldType`](#fieldtype--codestringcode)—String
- [`FieldParams`](#fieldparams--codeobjectcode)—Object
- [`successCallback`](#successcallback--codefunctioncode)—Function
- [`errorCallback`](#errorcallback--codefunctioncode)—Function

### BondCards

**Kind**: global class

- [new BondCards](#new-bondcards)
- [bondCards.show](#bondcardsshow)
- [bondCards.showMultiple](#bondcardsshowmultiple)
- [bondCards.copy](#bondcardscopy)
- [bondCards.field](#bondcardsfield)
- [bonCards.submit](#bondcardssubmit)
- [bondCards.reset](#bondcardsreset)

### new BondCards

`new BondCards({ live: false })`

Create a BondCards instance.

| Parameter | Type | Default | Description |
| --- | --- | --- | --- |
| `live` | boolean | `false` | Sets the Bond platform environment, `true` to work with live, `false` for sandbox. |

### bondCards.show

`bondCards.show(cardId, identity, authorization, field, [htmlWrapper], htmlSelector, [css])` ⇒ Promise

Display appropriate card data.

**Kind**: instance method of [`BondCards`](#BondCards)

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

`bondCards.showMultiple(cardId, identity, authorization, fields)` ⇒ Promise

Display appropriate card data.

**Kind**: instance method of [`BondCards`](#BondCards)

**Returns**: `Promise`—Returns a Promise that, when fulfilled, will either return list of iFrames with the appropriate data or an error.

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| `cardId` | string |  | Unique ID used to identify a specific card |
| `identity` | string |  | Temporary identity token that allows the call |
| `authorization` | string |  | Temporary Authorization token |
| `fields` | object |  | Object containing the requested fields |

### bondCards.copy

`bondCards.copy(iframe, htmlSelector, [css], [text], [callback])` ⇒ Promise`

Copy card data (one of number, expiry, cvv).

**Kind**: instance method of [`BondCards`](#BondCards)

**Returns**: `Promise`—Returns a Promise that, when fulfilled, will either return an iFrame with the appropriate data or an error.

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| `iframe` | object |  | Iframe object returned from show method |
| `htmlSelector` | string |  | Selector for the field/element where the iframe will be placed |
| `[css]` | object |  | An object of CSS rules to apply to the response |
| `[text]` | string |  | Text of button |
| `[callback]` | function | `function() {}` | Function to call when copy handler called |

### bondCards.field

`bondCards.field(selector, type, [css], [placeholder], [successColor], [errorColor], [color], [lineHeight], [fontSize], [fontFamily], [disabled], [readOnly], [autoFocus])` ⇒ Promise

Initialize a field in a form to submit for card manipulation.

**Kind**: instance method of [`BondCards`](#BondCards)

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

`bondCards.submit(cardId, identity, authorization, newPin, confirmPin, callback, callback)` ⇒ Promise

Show appropriate card data.

**Kind**: instance method of [`BondCards`](#BondCards)

**Returns**: `Promise` —- Returns a Promise that, when fulfilled, will either return an iFrame with the appropriate data or an error.

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| `cardId` | string |  | Unique ID used to identify a specific card |
| `identity` | string |  | Temporary identity token allowing the call |
| `authorization` | string |  | Temporary Authorization token |
| `newPin` | string |  | New pin number |
| `confirmPin` | string |  | Repeated new pin number |
| `successCallback` | [successCallback](#successcallback--codefunctioncode) |  | Function that will be executed when the HTTPRequest finishes successfully |
| `errorCallback` | [errorCallback](#errorcallback--codefunctioncode) |  | Function Error handling callback. Triggered if one of the fields has an invalid value on submission. By default, pushes the error messages to the console |

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

| Param | Type | Description |
| --- | --- | --- |
| `errors` | object | Object with error messages |


## BondExternalAccounts

For a complete specification and interactive examples, see [Linking external accounts](https://dash.readme.com/project/bond-baas-api/v0.1/refs/get_plaid_linked_account) in the Bond API Reference.

**Kind**: global class

- [new BondExternalAccounts](#new-bondexternalaccounts)
- [bondExternalAccounts.linkAccount](#bondexternalaccountslinkaccount)
- [bondExternalAccounts.microDeposit](#bondexternalaccountsmicrodeposit)
- [bondExternalAccounts.deleteAccount](#bondexternalaccountsdeleteexternalaccount)

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

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| `linkedAccountId` | string |  | Linked account to delete |
| `identity` | string |  | Temporary identity token allowing the call |
| `authorization` | string |  | Temporary Authorization token |

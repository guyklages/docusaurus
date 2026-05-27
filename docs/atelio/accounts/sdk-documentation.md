# SDK documentation

## Classes

**Kind**: global class

- [`bondExternalAccounts`](https://docs.atelio.com/embedded/docs/sdk-documentation#new-bondexternalaccounts)
- [`bondExternalAccounts.linkAccount`](https://docs.atelio.com/embedded/docs/sdk-documentation#bondexternalaccountslinkaccount)
- [`bondExternalAccounts.microDeposit`](https://docs.atelio.com/embedded/docs/sdk-documentation#bondexternalaccountsmicrodeposit)


## `bondExternalAccounts`

Create a `BondExternalAccounts` instance.

| Parameter     | Type   | Description                |
| ------------- | ------ | -------------------------- |
| `BondEnvType` | String | Sets the Bond environment. |


## `bondExternalAccounts.linkAccount`

`bondExternalAccounts.linkAccount({ customerId | businessId, identity, authorization })` ⇒ Promise

Connect external account.

**Kind**: instance method of `BondExternalAccounts`.

| Parameter | Type | Description |
| --- | --- | --- |
| `customerId` | string | Sets the Bond Customer ID; use only one of `customerId` or `businessId` |
| `businessId` | string | Sets the Bond Business ID; use only one of `customerId` or `businessId` |
| `identity` | string | Sets the temporary Identity. |
| `authorization` | string | Sets the temporary Authorization token. |


## `bondExternalAccounts.microDeposit`

`bondExternalAccounts.microDeposit({ linkedAccountId, identity, authorization })` ⇒ Promise

Micro deposit.

**Kind**: instance method of `BondExternalAccounts`

| Parameter | Type | Default |
| --- | --- | --- |
| `linkedAccountId` | string | Sets the linked account ID. |
| `identity` | string | Sets the Identity token. |
| `authorization` | string | Sets the Authorization token. |

For a complete specification and interactive examples, see [Linking external accounts](ref:accounts) in the Bond API Reference.

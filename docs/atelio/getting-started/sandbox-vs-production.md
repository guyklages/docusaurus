# Sandbox vs Production

The tables below list the key differences between Atelio's sandbox and live environments:

## API URLs

### Atelio Studio

The following core platform constructs use the following API URLs:

- Card management
- Deposit account management
- Money movement

| Environment | URL |
| --- | --- |
| Production | `https://api.atelio.com/api/v0.1/` |
| Sandbox | `https://sandbox.atelio.com/api/v0.1/` |

### Embedded app

The following products use the following API URLs:

- Commercial embedded card servicing app
- Commercial embedded onboarding app
- Consumer embedded CBC app
- Pay by Bank

#### Token generation

| Environment | URL |
| --- | --- |
| Production | `https://api.embedded.atelio.com/api/auth/token` |
| Sandbox | `https://api-sandbox.embedded.atelio.com/api/auth/token` |

#### Front end

| Environment | URL |
| --- | --- |
| Production | `https://embedded.atelio.com` |
| Sandbox | `https://embedded-sandbox.atelio.com` |

### Identity

| Environment | URL |
| --- | --- |
| Production | `https://api.prod.live.atelio.com/identity/v0.1` |
| Sandbox | `https://api.sandbox.atelio.com/identity/v0.1` |

## Features

### Accounts and Credit  

| Feature | Supported in Sandbox | Supported in Production |
| --- | --- | --- |
| [Create, submit, and update a credit application](https://docs.atelio.com/embedded/reference/post-credit-applications) | ✅ | ✅ |
| [Create an account](https://docs.atelio.com/embedded/reference/post-accounts) | ✅ | ✅ |
| [Create a secured charge card](https://docs.atelio.com/embedded/reference/post_cards) | ✅ | ✅ |
| [Activate a card](https://docs.atelio.com/embedded/reference/post_cards_activate) | ✅ | ✅ |
| [Reissue a card](https://docs.atelio.com/embedded/reference/post_cards_reissue) | ✅ | ✅ |
| [Activate/deactivate a card](https://docs.atelio.com/embedded/docs/changing-a-cards-status) | ✅ | ✅ |
| [Close a card](https://docs.atelio.com/embedded/reference/post_cards_close) | ✅ | ✅ |
| [Transactions](https://docs.atelio.com/embedded/reference/transactions) | ✅ | ✅ |
| [Statements](https://docs.atelio.com/embedded/docs/statements-1) | ✅ | ✅ |
| [Link an external account (v0)](https://docs.atelio.com/embedded/reference/linking-an-external-account-without-the-atelio-sdk) | ✅ | ✅ |
| [Retrieve all linked accounts](https://docs.atelio.com/v0/reference/get_external_accounts) | ✅ | ✅ |
| [Initiate an account-to-account transfer](https://docs.atelio.com/embedded/reference/post-transfer) | ✅ | ✅ |

### Identity 

| Feature | Supported in Sandbox | Supported in Production |
| --- | --- | --- |
|  |  |  |
|  |  |  |

### KYC and KYB

| Feature | Supported in Sandbox | Supported in Production |
| --- | --- | --- |
| [Create and update a Customer](ref:post_customers) | ✅ | ✅ |
| [Create and update a Business](ref:post_businesses) | ✅ | ✅ |
| [Run KYC (Know-Your-Customer)](ref:post_verification_kyc) | ✅ **1** | ✅ |
| [Simulate KYC Passed](ref:post_simulate_kyc_pass) | ✅ | ❎ |
| [Simulate KYC Failed](ref:post_simulate_kyc_fail) | ✅ | ❎ |
| [Run KYB (Know-Your-Business)](doc:know-your-business) | ✅ **2** | ✅ |

1. You can trigger various KYC states using [trigger KYC scenario SSNs](https://docs.atelio.com/embedded/docs/trigger-kyc-scenarios). You can also manually override KYC pass/fail states using the [Simulate KYC Passed](https://docs.atelio.com/embedded/reference/post_simulate_kyc_pass) and [Simulate KYC Failed](https://docs.atelio.com/embedded/reference/post_simulate_kyc_fail) operations.
2. You will not be able to simulate KYB pass/fail as you can with KYC. To successfully run KYB, you must still validate the identity of your business and its documents to ensure that they're compliant with federal regulations.

### Simulation and Webhooks 

| Feature | Supported in Sandbox | Supported in Production |
| --- | --- | --- |
| [Simulating an authorization](doc:simulating-card-authorization) | ✅ | ❎ |
| [Simulating a settlement](ref:post_settle) | ✅ | ❎ |
| [Webhook subscriptions](ref:post_webhooks) | ✅ | ✅ |
| ACH transfers | ✅ **1** | ✅ **2** |
| Real money transactions | ❎ **3** | ✅ |
| Non-standard card transactions (cash withdrawals, purchase returns) | ❎ | ✅ |
| ACH returns | ❎ | ✅ |
| Card issue fees | ❎ | ✅ |
| ATM withdrawal fees | ❎ | ✅ |
| Adding to mobile wallets (and associated `card.wallet.*` webhooks) | ❎ | ✅ |

1. In sandbox, ACH transfers will settle within an hour.
2. ACH transfers will settle according to their same-day or standard settlement windows.
3. Sandbox does not allow the use of real money for transactions. You can simulate authorization and settlement for card transactions using the [simulate API](https://docs.atelio.com/embedded/reference/simulate) , and transfer funds using the [transfers API](https://docs.atelio.com/embedded/reference/transfer) .

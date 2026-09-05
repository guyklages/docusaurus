import { DefinitionProvider, DefTerm, DefinitionPanel } from '@site/src/components/DefTerm';

# Guides and API reference


## Live company websites

- I created and fully owned the following company websites.
- Tools: Git, Markdown, Oxygen, Postman, ReadMe, and VS Code.
- Audience: Fintech developers, DBAs, and technical PMs.
- Links open into a new browser tab.

<DefinitionProvider>

| Company      | Developer guides | API reference | Collaborated with | Highlight |
|--------------|------------------|---------------|:-----------------:|-----------|
| <DefTerm def="FIS (Fidelity) bought fintech startup Atelio and later dissolved it to return to traditional banking.">Atelio&nbsp;of&nbsp;FIS</DefTerm> | _Product discontinued_ <br/> **[My copy](https://guyklages.com/atelio/getting-started/quickstart)** | _Product discontinued._ <br/> **[Similar&nbsp;to&nbsp;Nium's](https://docs.nium.com/api#description/introduction)** | 1 editor, 5 SMEs | [Revamped and reduced the developer pages by 40%](./most-impactful-tech-writing.md#69-fewer-pages-via-new-ia) |
| <DefTerm def="Nium is a fintech company that was a struggling startup while I worked there.">Nium</DefTerm>         | **[Getting Started](https://docs.nium.com/docs/getting-started)** | **[Introduction](https://docs.nium.com/api#description/introduction)** | 1 editor, 6 SMEs | [70% more onboarding of clients with 70% fewer issues](./most-impactful-tech-writing.md#70-more--70-fewer) |
| <DefTerm def="Couchbase is a NoSQL database company that was a struggling startup while I worked there.">Couchbase</DefTerm>    | **[SQL++&nbsp;Reference](https://docs.couchbase.com/server/current/n1ql/n1ql-language-reference/index.html)** |  | 1 editor, 9 SMEs | [Reduced their writing process by 80%](./most-impactful-tech-writing.md#80-time-saved-on-writing) |

<DefinitionPanel/>

</DefinitionProvider>


## My most technical projects

| Developer problem | How I solved it | Company |
|-------------------|-----------------|---------|
| Developers had a hodge-podge of `skill.md`, `instruction.md`, and `.yaml` files that needed structure for their internal agent-driven workflows, server architecture, and usability. | I created a framework of governance and guardrails with templates in Markdown and YAML files to help developers build Copilot Agents that adhere to company rules and standards. | Microsoft |
| Developers created an AI/ML/LLM system to populate the Netflix home screen of titles and needed to share this technology with other Netflix departments but weren't able to install or configure it outside their group. | I tested and created internal documentation for the complex installation and configuration of their tool that populates the Netflix Home screen of titles so other departments can use it as well. | Netflix |
| Developers of Nium's customers weren't able to onboard Nium's products due to the complexity of different steps for different company types in different countries. | I made a step-by-step unified onboarding process that immediately saw [70% more customers onboarded while reducing helpdesk tickets by 70%](./most-impactful-tech-writing.md#70-more--70-fewer). | Nium |
| Developers were building internal AI/ML/LLM tools but had difficulty since Apache's documentation didn't cover all of their use cases or needs. | I filled in their documentation gaps and greatly enhanced their internal documentation with more explanations and examples for engineers to use the Apache ecosystem tools for their Big Data and IoT projects. An engineer called my docs _"more thorough than Apache's documentation site."_ | Yahoo |

---

## Developer guides

### Atelio

To interact with the guides, see [my copy of the defunct Atelio website](/atelio/getting-started/client-config).

Comprehensive list of the fintech developer guides I wrote and owned:

| Category          | Developer guides |
|-------------------|------------------|
| Getting started   | [Client configuration](/atelio/getting-started/client-config) • [Quickstart](/atelio/getting-started/quickstart) • [Postman](/atelio/getting-started/postman-collection) • [Sandbox](/atelio/getting-started/sandbox-vs-production) • [Webhooks](https://guyklages.com/atelio/webhooks/webhook) • [Errors](/atelio/getting-started/errors) • [Glossary](/atelio/getting-started/glossary) • [FAQ](/atelio/getting-started/faq) |
| Widgets           | [Consumer secured charge card](/atelio/widgets/consumer-secured-charge-card) • [Pay by Bank app overview](/atelio/widgets/pay-by-bank-app-overview) |
| Customers         | [KYC](/atelio/customer/kyc) • [Start KYC process](/atelio/customer/start-kyc-process) • [KYC sandbox scenarios](/atelio/customer/kyc-sandbox-scenarios) • [Upload KYC docs](/atelio/customer/upload-kyc-documentation) • [Customer onboarding](/atelio/customer/customer-onboarding) |
| Business          | [Manage business](/atelio/business/manage-business) • [KYB](/atelio/business/ef-kyb) • [Business onboarding](/atelio/business/business-onboarding) • [Beneficial owners](/atelio/business/beneficial-owners) |
| Accounts          | [Accounts overview](/atelio/accounts/account-overview) • [Credit accounts](/atelio/accounts/credit-accounts) • [Deposit accounts](/atelio/accounts/deposit-accounts) • [External accounts with Plaid](/atelio/accounts/link-an-external-account) • [External accounts SDK](/atelio/accounts/external-accounts-sdk) • [SDK documentation](/atelio/accounts/sdk-documentation) • [Account statements](/atelio/accounts/account-statements) |
| Cards             | [Secured charge card](/atelio/cards/secured-charge-card-overview) • [Consumer secured charge card](/atelio/cards/consumer-secured-charge-card) • [Commercial secured charge card](/atelio/cards/commercial-secured-charge-card) • [Multi-card](/atelio/cards/multi-card) • [Manage cards](/atelio/cards/manage-cards) • [Card reissue FAQ](/atelio/cards/card-reissue-faq) • [Atelio cards SDK](/atelio/cards/ateliocards-sdk) |
| Identity          | [Identity overview](/atelio/identity/identity-overview) • [Identity integration guide](/atelio/identity/identity-integration-guide) • [Identity user guide](/atelio/identity/identity-user-guide) • [Pricing and bundling](/atelio/identity/pricing-and-bundling) |
| Money movement    | [Pay by Bank payments](/atelio/money-movement/pay-by-bank-payments) • [Money movement](/atelio/money-movement) • [Transactions](/atelio/money-movement/transactions-overview) • [Account transfers](/atelio/money-movement/account-transfers) |
| Developers        | [Error handling](/atelio/developers/error-handling) • [HMAC signature](/atelio/developers/hmac-signature) • [API headers](/atelio/developers/api-headers) • [Web SDK documentation](/atelio/developers/web-sdk-documentation) |

### Nium

To interact with the guides, see [Nium's live website](https://docs.nium.com).

Comprehensive list of the fintech developer guides I wrote and owned:

| Category          | Developer guides |
|-------------------|------------------|
| Getting Started   | [Key Concepts](https://docs.nium.com/docs/getting-started/key-concepts) • [Postman Collection](https://docs.nium.com/docs/getting-started/postman-collection) • [Parent-Child Hierarchy](https://docs.nium.com/docs/getting-started/parent-child-hierarchy) • [Glossary](https://docs.nium.com/docs/getting-started/glossary) • [Currency and Country Codes](https://docs.nium.com/docs/getting-started/currency-and-country-codes) • [Testing Nium](https://docs.nium.com/docs/getting-started/testing-nium) • [Error Responses](https://docs.nium.com/docs/getting-started/error-responses) |
| Onboarding        | [Customer Onboarding](https://docs.nium.com/docs/onboarding/customer-onboarding) • [User Management](https://docs.nium.com/docs/onboarding/user-management) • [Corporate Customers](https://docs.nium.com/docs/onboarding/corporate-customers) • [Individual Customers](https://docs.nium.com/docs/onboarding/individual-customers) |
| Wallets           | [Wallet to Wallet Transfers](https://docs.nium.com/docs/wallets/wallet-to-wallet-transfers) |
| Payins            | [Fund a Wallet](https://docs.nium.com/docs/payins/fund-wallet) • [Virtual Accounts](https://docs.nium.com/docs/payins/virtual-account-number) • [Prefund Account](https://docs.nium.com/docs/payins/program-client-and-client-prefund-account) |
| Payouts           | [Transfer Money](https://docs.nium.com/docs/payouts/transfer-money) • [Beneficiaries](https://docs.nium.com/docs/payouts/beneficiaries) • [Card Widget](https://docs.nium.com/docs/payouts/get-a-card-widget) • [Batch Payouts](https://docs.nium.com/docs/payouts/bulk-payouts) |
| Cards             | [Card Lifecycle](https://docs.nium.com/docs/cards/card-lifecycle) • [Manage Cards](https://docs.nium.com/docs/cards/manage-cards) • [Card Transactions](https://docs.nium.com/docs/cards/card-transactions) • [Card Widget](https://docs.nium.com/docs/cards/card-widget) |
| Transactions      | [Transaction Statuses](https://docs.nium.com/docs/transactions/transaction-statuses) • [Transaction Response Labels](https://docs.nium.com/docs/transactions/response-labels) • [Requests for Information](https://docs.nium.com/docs/transactions/transaction-rfis) |
| Reports           | [Daily Reports](https://docs.nium.com/docs/reports/daily-reports) • [Client Reports](https://docs.nium.com/docs/reports/client-reports) • [Customer Account Statements](https://docs.nium.com/docs/reports/customer-account-statements) |
| Use Cases         | [Financial Institutions](https://docs.nium.com/docs/use-cases/financial-institutions) • [Payroll](https://docs.nium.com/docs/use-cases/payroll) • [Spend Management](https://docs.nium.com/docs/use-cases/spend-management) |
| Developers        | [Hosted Components](https://docs.nium.com/docs/developers/pre-built-forms) • [Notifications and Webhooks](https://docs.nium.com/docs/developers/notifications-and-webhooks) • [FAQs](https://docs.nium.com/docs/developers/faqs) |


### Couchbase

I wrote or vastly improved nearly all pages under [Couchbase's SQL++ for Query Reference](https://docs.couchbase.com/cloud/n1ql/n1ql-language-reference/index.html) by adding:
  - More detailed explanations
  - Example indexes
  - Example SQL++ queries
  - Diagrams

| Operators  | Functions | <div style={{ width: '200px' }}>Statements (A-D)</div> | Statements (E-U) | SELECT |
|------------|-----------|------------------|------------------|--------|
| [Arithmetic](https://docs.couchbase.com/cloud/n1ql/n1ql-language-reference/arithmetic.html) <br/><br/><br/> [Collection](https://docs.couchbase.com/cloud/n1ql/n1ql-language-reference/collectionops.html) <br/><br/> [Comparison](https://docs.couchbase.com/cloud/n1ql/n1ql-language-reference/comparisonops.html) <br/><br/> [Conditional](https://docs.couchbase.com/cloud/n1ql/n1ql-language-reference/conditionalops.html) <br/><br/> [Construction](https://docs.couchbase.com/cloud/n1ql/n1ql-language-reference/constructionops.html) <br/><br/><br/> [Logical](https://docs.couchbase.com/cloud/n1ql/n1ql-language-reference/logicalops.html) <br/><br/><br/> [Nested](https://docs.couchbase.com/cloud/n1ql/n1ql-language-reference/nestedops.html) <br/><br/><br/> [Sequence](https://docs.couchbase.com/cloud/n1ql/n1ql-language-reference/sequenceops.html) <br/><br/> [String](https://docs.couchbase.com/cloud/n1ql/n1ql-language-reference/stringops.html) | [Aggregate](https://docs.couchbase.com/cloud/n1ql/n1ql-language-reference/aggregatefun.html) <br/> [Array](https://docs.couchbase.com/cloud/n1ql/n1ql-language-reference/arrayfun.html) <br/><br/> [Bitwise](https://docs.couchbase.com/cloud/n1ql/n1ql-language-reference/bitwisefun.html) <br/><br/> [Comparison](https://docs.couchbase.com/cloud/n1ql/n1ql-language-reference/comparisonfun.html) <br/> [Conditional for X](https://docs.couchbase.com/cloud/n1ql/n1ql-language-reference/condfununknown.html) <br/> [Conditional for Int](https://docs.couchbase.com/cloud/n1ql/n1ql-language-reference/condfunnum.html) <br/><br/> [Date](https://docs.couchbase.com/cloud/n1ql/n1ql-language-reference/datefun.html) <br/><br/> [JSON](https://docs.couchbase.com/cloud/n1ql/n1ql-language-reference/jsonfun.html) <br/><br/> [Miscellaneous Utility](https://docs.couchbase.com/cloud/n1ql/n1ql-language-reference/metafun.html) <br/><br/> [Number](https://docs.couchbase.com/cloud/n1ql/n1ql-language-reference/numericfun.html) <br/><br/> [Object](https://docs.couchbase.com/cloud/n1ql/n1ql-language-reference/objectfun.html) <br/><br/> [Pattern-Matching](https://docs.couchbase.com/cloud/n1ql/n1ql-language-reference/patternmatchingfun.html) <br/> [Search](https://docs.couchbase.com/cloud/n1ql/n1ql-language-reference/searchfun.html) <br/><br/> [String](https://docs.couchbase.com/cloud/n1ql/n1ql-language-reference/stringfun.html) <br/><br/> [Token](https://docs.couchbase.com/cloud/n1ql/n1ql-language-reference/tokenfun.html) <br/> [Type](https://docs.couchbase.com/cloud/n1ql/n1ql-language-reference/typefun.html) <br/><br/> [User-Defined](https://docs.couchbase.com/cloud/n1ql/n1ql-language-reference/userfun.html) <br/><br/> [Vector](https://docs.couchbase.com/cloud/n1ql/n1ql-language-reference/vectorfun.html) <br/><br/> [Window](https://docs.couchbase.com/cloud/n1ql/n1ql-language-reference/windowfun.html) | [ADVISE](https://docs.couchbase.com/cloud/n1ql/n1ql-language-reference/advise.html) <br/> [ALTER BUCKET](https://docs.couchbase.com/cloud/n1ql/n1ql-language-reference/alterbucket.html) <br/> [ALTER GROUP](https://docs.couchbase.com/cloud/n1ql/n1ql-language-reference/altergroup.html) <br/> [ALTER INDEX](https://docs.couchbase.com/cloud/n1ql/n1ql-language-reference/alterindex.html) <br/> [ALTER SEQUENCE](https://docs.couchbase.com/cloud/n1ql/n1ql-language-reference/altersequence.html) <br/> [ALTER USER](https://docs.couchbase.com/cloud/n1ql/n1ql-language-reference/alteruser.html) <br/> [ALTER VECTOR INDEX](https://docs.couchbase.com/cloud/n1ql/n1ql-language-reference/altervectorindex.html) <br/><br/> [BEGIN TRANSACTION](https://docs.couchbase.com/cloud/n1ql/n1ql-language-reference/begin-transaction.html) <br/> [BUILD INDEX](https://docs.couchbase.com/cloud/n1ql/n1ql-language-reference/build-index.html) <br/><br/> [COMMIT TRANSACTION](https://docs.couchbase.com/cloud/n1ql/n1ql-language-reference/commit-transaction.html) <br/> [CREATE BUCKET](https://docs.couchbase.com/cloud/n1ql/n1ql-language-reference/createbucket.html) <br/> [CREATE COLLECTION](https://docs.couchbase.com/cloud/n1ql/n1ql-language-reference/createcollection.html) <br/> [CREATE FUNCTION](https://docs.couchbase.com/cloud/n1ql/n1ql-language-reference/createfunction.html) <br/> [CREATE GROUP](https://docs.couchbase.com/cloud/n1ql/n1ql-language-reference/creategroup.html) <br/> [CREATE INDEX](https://docs.couchbase.com/cloud/n1ql/n1ql-language-reference/createindex.html) <br/> [CREATE PRIMARY INDEX](https://docs.couchbase.com/cloud/n1ql/n1ql-language-reference/createprimaryindex.html) <br/> [CREATE SEQUENCE](https://docs.couchbase.com/cloud/n1ql/n1ql-language-reference/createsequence.html) <br/> [CREATE SCOPE](https://docs.couchbase.com/cloud/n1ql/n1ql-language-reference/createscope.html) <br/> [CREATE USER](https://docs.couchbase.com/cloud/n1ql/n1ql-language-reference/createuser.html) <br/> [CREATE VECTOR INDEX](https://docs.couchbase.com/cloud/n1ql/n1ql-language-reference/createvectorindex.html) <br/><br/> [DELETE](https://docs.couchbase.com/cloud/n1ql/n1ql-language-reference/delete.html) <br/> [DROP BUCKET](https://docs.couchbase.com/cloud/n1ql/n1ql-language-reference/dropbucket.html) <br/> [DROP COLLECTION](https://docs.couchbase.com/cloud/n1ql/n1ql-language-reference/dropcollection.html) <br/> [DROP FUNCTION](https://docs.couchbase.com/cloud/n1ql/n1ql-language-reference/dropfunction.html) <br/> [DROP GROUP](https://docs.couchbase.com/cloud/n1ql/n1ql-language-reference/dropgroup.html) <br/> [DROP INDEX](https://docs.couchbase.com/cloud/n1ql/n1ql-language-reference/dropindex.html) <br/> [DROP PRIMARY INDEX](https://docs.couchbase.com/cloud/n1ql/n1ql-language-reference/dropprimaryindex.html) <br/> [DROP SEQUENCE](https://docs.couchbase.com/cloud/n1ql/n1ql-language-reference/dropsequence.html) <br/> [DROP VECTOR INDEX](https://docs.couchbase.com/cloud/n1ql/n1ql-language-reference/dropvectorindex.html) <br/> [DROP SCOPE](https://docs.couchbase.com/cloud/n1ql/n1ql-language-reference/dropscope.html) <br/> [DROP USER](https://docs.couchbase.com/cloud/n1ql/n1ql-language-reference/dropuser.html)  |  [EXECUTE](https://docs.couchbase.com/cloud/n1ql/n1ql-language-reference/execute.html) <br/> [EXECUTE FUNCTION](https://docs.couchbase.com/cloud/n1ql/n1ql-language-reference/execfunction.html) <br/> [EXPLAIN](https://docs.couchbase.com/cloud/n1ql/n1ql-language-reference/explain.html) <br/> [EXPLAIN FUNCTION](https://docs.couchbase.com/cloud/n1ql/n1ql-language-reference/explainfunction.html) <br/><br/> [GRANT](https://docs.couchbase.com/cloud/n1ql/n1ql-language-reference/grant.html) <br/><br/> [INFER](https://docs.couchbase.com/cloud/n1ql/n1ql-language-reference/infer.html) <br/> [INSERT](https://docs.couchbase.com/cloud/n1ql/n1ql-language-reference/insert.html) <br/><br/> [MERGE](https://docs.couchbase.com/cloud/n1ql/n1ql-language-reference/merge.html) <br/><br/> [PREPARE](https://docs.couchbase.com/cloud/n1ql/n1ql-language-reference/prepare.html) <br/><br/> [REVOKE](https://docs.couchbase.com/cloud/n1ql/n1ql-language-reference/revoke.html) <br/> [ROLLBACK TRANSACTION](https://docs.couchbase.com/cloud/n1ql/n1ql-language-reference/rollback-transaction.html) <br/><br/> [SAVEPOINT](https://docs.couchbase.com/cloud/n1ql/n1ql-language-reference/savepoint.html) <br/> [SET TRANSACTION](https://docs.couchbase.com/cloud/n1ql/n1ql-language-reference/set-transaction.html) <br/><br/> [UPDATE](https://docs.couchbase.com/cloud/n1ql/n1ql-language-reference/update.html) <br/> [UPDATE STATISTICS](https://docs.couchbase.com/cloud/n1ql/n1ql-language-reference/updatestatistics.html) <br/> [UPSERT](https://docs.couchbase.com/cloud/n1ql/n1ql-language-reference/upsert.html) <br/> [USING AI](https://docs.couchbase.com/cloud/n1ql/n1ql-language-reference/using-ai.html) | [Syntax](https://docs.couchbase.com/cloud/n1ql/n1ql-language-reference/select-syntax.html) <br/> [Clause](https://docs.couchbase.com/cloud/n1ql/n1ql-language-reference/selectclause.html) <br/><br/> [WITH](https://docs.couchbase.com/cloud/n1ql/n1ql-language-reference/with.html) <br/> [WITH RECURSIVE](https://docs.couchbase.com/cloud/n1ql/n1ql-language-reference/with-recursive.html) <br/><br/> [FROM](https://docs.couchbase.com/cloud/n1ql/n1ql-language-reference/from.html) <br/><br/> [USE](https://docs.couchbase.com/cloud/n1ql/n1ql-language-reference/hints.html) <br/><br/> [JOIN](https://docs.couchbase.com/cloud/n1ql/n1ql-language-reference/join.html) <br/> [JOIN Comma-Separated](https://docs.couchbase.com/cloud/n1ql/n1ql-language-reference/comma.html) <br/><br/> [NEST](https://docs.couchbase.com/cloud/n1ql/n1ql-language-reference/nest.html) <br/> [UNNEST](https://docs.couchbase.com/cloud/n1ql/n1ql-language-reference/unnest.html) <br/><br/> [LET](https://docs.couchbase.com/cloud/n1ql/n1ql-language-reference/let.html) <br/><br/> [WHERE](https://docs.couchbase.com/cloud/n1ql/n1ql-language-reference/where.html) <br/><br/> [GROUP BY](https://docs.couchbase.com/cloud/n1ql/n1ql-language-reference/groupby.html) <br/> [WINDOW](https://docs.couchbase.com/cloud/n1ql/n1ql-language-reference/window.html) <br/><br/> [UNION, INTERSECT, EXCEPT](https://docs.couchbase.com/cloud/n1ql/n1ql-language-reference/union.html) <br/><br/> [ORDER BY](https://docs.couchbase.com/cloud/n1ql/n1ql-language-reference/orderby.html) <br/><br/> [LIMIT](https://docs.couchbase.com/cloud/n1ql/n1ql-language-reference/limit.html) <br/> [OFFSET](https://docs.couchbase.com/cloud/n1ql/n1ql-language-reference/offset.html) |

---

## API

### Atelio

_(Discontinued product)_

Nearly identical to [Nium's APIs](#nium).

### Nium

Nium has added more API endpoints and supported languages for fintech developers after I left.

The following are the Nium API endpoints I documented with code samples in:

- C
- cURL
- HTTP
- Java
- JavaScript
- Python

| Category  | APIs |
|-----------|------|
| Clients   | [Client Prefund Account](https://docs.nium.com/api#tag/client-prefund-account) • [Client Settings](https://docs.nium.com/api#tag/client-settings) • [Client Transactions](https://docs.nium.com/api#tag/client-transactions/GET/api/v1/client/{clientHashId}/transactions) |
| Customers | [User Management](https://docs.nium.com/api#tag/user-management) • [Customer Account - Individual](https://docs.nium.com/api#tag/customer-account-individual) • [Customer Account - Corporate](https://docs.nium.com/api#tag/customer-account-corporate) • [Customer Management](https://docs.nium.com/api#tag/customer-management) • [Accounts](https://docs.nium.com/api#tag/accounts) • [Files](https://docs.nium.com/api#tag/files) |
| Wallets   | [Customer Wallet Balance](https://docs.nium.com/api#tag/customer-wallet-balance) • [Wallet to Wallet Transfers](https://docs.nium.com/api#tag/wallet-to-wallet-transfers) |
| Payins    | [Customer Funding](https://docs.nium.com/api#tag/customer-funding) • [Customer Virtual Accounts](https://docs.nium.com/api#tag/customer-virtual-accounts) |
| Payouts   | [Beneficiary](https://docs.nium.com/api#tag/beneficiary) • [Payout](https://docs.nium.com/api#tag/payout) |
| Cards     | [Simulators](https://docs.nium.com/api#tag/simulators) • [Lifecycle](https://docs.nium.com/api#tag/lifecycle) • [Security](https://docs.nium.com/api#tag/security) • [Controls](https://docs.nium.com/api#tag/controls) |
| RFIs      | [Request for Information](https://docs.nium.com/api#tag/request-for-information) |
| Reports   | [Reports](https://docs.nium.com/api#tag/reports)
| Testing   | [Payouts](https://docs.nium.com/api#tag/payouts) • [Payins](https://docs.nium.com/api#tag/payin) • [Customer](https://docs.nium.com/api#tag/customer) |

---

## Kubernetes `kubectl`

_(I wrote this for an interview's assignment with that company's style guide)_

Major and alternative cloud providers support Kubernetes, offering fully managed services that handle the control plane. Use `kubectl`, a command-line utility, to communicate with a cluster's control plane via the Kubernetes API. Every `kubectl` command has the following syntax:

```bash
kubectl [command] [TYPE] [NAME] [flags]
```

The following table lists all `kubectl` commands for debugging your cluster:

| <div style={{ width: '380px' }}>CLI Command</div> | Description |
|---------------------------------------------------|-------------|
| `kubectl get pods --namespace <namespace>`        | Get a list of pods and their status by specifying the `namespace`.                    |
| `kubectl logs <pod-name>`                         | Retrieve the logs of a specific pod.                                                  |
| `kubectl logs -f <pod-name>`                      | Stream or "follow" logs in real-time.                                                 |
| `kubectl exec <pod-name>`                         | Debug a container from the inside or explore the environment of the container itself. |
| `kubectl exec -it <pod-name> -- /bin/bash`        | Open an interactive terminal session inside a running pod's container.                |

### Handle Errors

#### Issues Inside a Container

If you experience issues inside a container, use the following syntax:

```shell
kubectl debug -it <pod-name> --image=busybox --target=<container-name>
```

What you see first:

```text
Defaulting debug container name to debugger-xxxxx.
Targeting container "your-app-container". If you don't see logs for this container, try something else.
```

Use `kubectl debug` to diagnose the following symptoms in a running (or crash-looping) container:

- Container lacks a shell
- Container constantly crashes
- Container requires node-level host troubleshooting

#### Pod Doesn't Terminate

A stuck pod is often caused by:

- stuck finalizers
- a hung kubelet
- a volume that won't unmount

To troubleshoot this, try `kubectl delete pod <name> --grace-period=0 --force` or investigate finalizers directly.

### References

- [Getting started with Kubernetes](https://kubernetes.io/docs/reference/generated/kubectl/kubectl-commands#-strong-getting-started-strong-)

- [What is Kubernetes](https://kubernetes.io/docs/concepts/overview/)


## Appendix

### Years of DITA

<DefinitionProvider>

| Company                                    | From     | Until    | Years | DITA | AEM  | Oxygen <br/> XML | XMetaL | Pages |
|--------------------------------------------|:--------:|:--------:|:-----:|:----:|:----:|:----------------:|:------:|:-----:|
| <DefTerm def="ChargePoint makes chargers for electric vehicles, and I wrote internal manuals for the manager of those chargers (such as a store manager at Target) to adjust the charging settings for cars parked in their parking lot. PDF guides for online dashboards.">ChargePoint</DefTerm>    | Nov 2018 | May 2019 |  0.5  |  ✅  |      |        ✅        |        |       |
| <DefTerm def="Couchbase makes Big Data NoSQL databases, and I owned all of the SQL++ reference pages. I documented new features and revamped the pre-existing pages by elaborating their explanations, by adding index and query examples, and by adding diagrams.">Couchbase</DefTerm>                                     | Apr 2017 | May 2018 |  1.2  |  ✅  |      |        ✅        |        |       |
| <DefTerm def="The Wells Fargo department I worked in was responsible for their developer portal and banking APIs. I documented how to register, subscribe, generate, and test API keys.">Wells Fargo</DefTerm>   | Jan 2017 | Mar 2017 |  0.2  |  ✅  |  ✅  |                  |        |       |
| <DefTerm def="The VMware department I worked in was responsible for their UEM virtualization products. I documented the user guides, design guides, deployment guides, knowledge base articles, and blog posts of their AppStacks, App Volumes, and AppSense PDFs.">VMware</DefTerm>                                     | Aug 2016 | Dec 2016 |  0.3  |  ✅  |  ✅  |                  |        |       |
| <DefTerm def="The Visa department I worked in was responsible for their fintech portal APIs. I documented how to register, subscribe, generate, and test API keys.">Visa</DefTerm> | Mar 2016 | Jun 2016 |  0.3  |  ✅  |  ✅  |                  |        |       |
| <DefTerm def="The Hitachi department I worked in was creating a realtime text message monitoring system to look for crime patterns. I documented their PDF user guides, deployment guides, and configuration guides.">Hitachi</DefTerm> | Aug 2015 | Feb 2016 |  0.5  |  ✅  |      |                  |   ✅   |       |
| <DefTerm def="The Apple department I worked in was responsible for the robots that assembled iPads. I documented how to activate, configure, operate, and troubleshoot these robots for their corresponding team in China.">Apple</DefTerm>        | Feb 2015 | Jun 2015 |  0.3  |  ✅  |      |                  |        |  ✅   |
| <DefTerm def="The NICE department I worked in was responsible for their employee monitoring tool. I documented how to install, configure, use, and troubleshoot their software.">NICE Systems</DefTerm> | May 2014 | Jul 2014 |  0.2  |  ✅  |      |        ✅        |        |       |
| <DefTerm def="The Veteran Affairs Medical Center's epidemiology department was converting from paper forms to electronic forms for their clinical trials. I documented user guides and wrote class materials to train PMs how to use the new system.">V.A. Medical</DefTerm> | Feb 2011 | Sep 2012 |  1.6  |  ✅  |      |                  |        |       |
| <DefTerm def="The ADP Payroll department I worked in was responsible for garnishments, payroll, AP/AR, GL, and reimbursements. I documented their processes and created database reports to automate big parts of their workflow.">ADP Payroll</DefTerm>  | Oct 2008 | Dec 2010 |  2.2  |  ✅  |      |                  |   ✅   |       |
|              |          |          |       | ==== | ==== |   ======         | ====== | ===== |
|              |          |          |       |  7.2 | 0.8  |    1.9           |  2.7   |  0.3  |

<DefinitionPanel/>

</DefinitionProvider>

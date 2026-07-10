# Developer advocacy

## Talks

| Venue | Topic | Audience | Crowd size | Remarks |
|-------|-------|----------|------------|---------|
| San Jose Convention Center | Couchbase Connect - Hands-on query walkthrough | Developers <br/> techy PMs | 300+ | Projected a PowerPoint presentation while speaking and leading the crowd to build queries on their laptops while I did on my laptop |
| Monthly MeetUp groups | NoSQL vs SQL databases | Developers <br/> DBAs | 20+ | Discussed various index and query types and use cases of Big Data |
| Monthly MeetUp groups | Fintech solutions | Developers <br/> PMs | 10+ | Discussed financial applications and how Nium can help |

## Blog posts

### API

| Title | Audience | Remarks |
|-------|----------|---------|
| [Stripe API authentication](/blog/2019/09/22/stripe-api-authentication) | Fintech developers | Authentication, errors, idempotent requests, pagination, etc. |
| [Stripe API charges](/blog/2019/10/22/stripe-api-charges) | Fintech developers | Charges object, creating, retrieving, updating, etc. |
| [Stripe API customers](/blog/2019/11/22/stripe-api-customers) | Fintech developers | Customers object, creating, retrieving, updating, etc. |

### SDK

| Title | Audience | Code samples | Remarks |
|-------|----------|--------------|---------|
| [Android SDK for online payments](/blog/2020/04/04/android-sdk-online-payments) | Fintech developers | Java | Using Android Pay, collecting credit card info and payments, setting up an app, creating & using tokens, testing & deploying |
| [iOS SDK for Apple Pay payments](/blog/2020/05/05/ios-sdk-apple-pay-payments) | Fintech developers | Swift <br/> Objective-C | Using Apple Pay, collecting credit card info, creating tokens, sending tokens to your server |
| [Atelio web SDK documentation](https://guyklages.com/atelio/developers/web-sdk-documentation) | Fintech developers |  | Requirements, importing, displaying, setting card PIN |

### KB

| Title | Audience |
|-------|----------|
| [AppStack exclusions are not excluded from Writables Volumes](/blog/2018/02/18/KB-appstack-exclusions-not-excluded-from-writables) | VMware developers | 
| [After AppStack rescan, AppStacks is disabled or unprovisioned](/blog/2018/02/16/KB-appstacks-disabled-after-rescan) | VMware developers |
| [Writables are not created upon login in a multi-vCenter environment](/blog/2018/02/14/KB-writables-not-created) | VMware developers |
| [How to install and use Log Collection with AppVolumes](/blog/2018/02/12/KB-log-collection-usage) | VMware developers |
| [Printers with ThinPrint default conflicts](/blog/2018/02/10/KB-managing-printers-with-thinprint-conflicts) | VMware developers |
| [How to allowlist blocked application](/blog/2018/02/08/KB-allowlist-blocked-apps) | VMware developers |
| [`Run Once` configurations that run multiple times](/blog/2018/02/04/KB-run-once) | VMware developers |
| [How to replace an expired UEM licence file](/blog/2018/02/02/KB-change-uem-license-file) | VMware developers |

## Dev problems I've solved

| Developer problem | How I solved it | Company |
|-------------------|-----------------|---------|
| Developers had a hodge-podge of `skill.md` and `instruction.md` and various `.yaml` files and needed structure for their internal agent-driven workflows, server architecture, and usability. | I Created a framework of governance and guardrails with templates in Markdown and YAML files to make it easier for developers to build Copilot Agents | Microsoft |
| Metaverse developers had trouble making 3-D objects behave the way they wanted. | I improved the Metaverse documentation with explanations and examples for faster building. | Meta |
| Developers created an AI/ML/LLM system to populate the Netflix home screen of titles and needed to share this technology with other Netflix departments but weren't able to install or configure it outside their group. | I tested and created internal documentation for the complex installation and configuration of their tool that populates the Netflix Home screen of titles so other departments can use it as well | Netflix |
| Developers of Nium's customers weren't able to onboard Nium's products due to the complexity of different steps for different company types in different countries. | I made a step-by-step unified onboarding process that immediately **[doubled the number of customers onboarded while reducing helpdesk tickets by 75%](./most-impactful-technical-writing.md#2x-customers-onboarded)**. | Nium |
| Developers were building internal AI/ML/LLM tools but had difficulty since Apache's documentation didn't cover all of their use cases or needs. | I filled in their documentiona gaps and greatly enhanced their internal documentation with more explanations and examples for engineers to use the Apache ecosystem tools for their Big Data and IoT projects. My docs were called, "more thorough than Apache's documentation site." | Yahoo |
| AdWordsAPI developers had trouble finding what they needed since the Confluence pages hadn't been updated in many months or years and some were simply obsolete. | I improved the completeness and accuracy of the AdWords API department's documentation to be **[the highest rated department in all of Google](https://guyklages.com/portfolio/most-impactful-technical-writing#1-dept-in-documention)** | Google |
| Customer developers had trouble writing queries since the documentation was sparse and had no example queries of usage. | I vastly improved their documentation by elaborating on the explanations and usage as well as adding many example queries, which **[Reduced helpdesk tickets by 30%](https://guyklages.com/portfolio/most-impactful-technical-writing#30-fewer-helpdesk-tickets)** | Couchbase |
| Developers couldn't keep up with the ever-growing queue of helpdesk tickets since their process didn't call customers at the best time to reach them. | I redesigned their Helpdesk system to call them during the timespan the specified and at the number (home or work) specified; and I answered many calls myself instead of creating a ticket. These **[Reduced helpdesk tickets by 88%](https://guyklages.com/portfolio/most-impactful-software-engineering#88-drop-in-helpdesk-queue)** | Microsoft |


## Community contributions

### Couchbase.com/forums

Moderator
- Helped facilitate community discussions by enforcing forum guidelines
- Removed spam, ads, and self-promotion posts
- Ensured posts remain respectful and on-topic
- Moved, edited, or merged threads so questions are properly categorized and easier to find

Developer advocate
- Assisted developers
- Escalated technical questions to the right engineering teams
- Replied to posts with technical answers 
- Replied to dozens of forum posts via email due to privacy issues
- (In the future, I'll post the non-private parts in the forum so everyone can benefit)

Driver of growth
- Gathered customer and potential customer feedback which influenced the product
- Identified friction points of customers and potential customers and addressed them
- Generated dozens of "leads" and "pipeline influence"
- Noticed stalled or immature forum categories and designed plans to grow them

<!--
- Discord comments posted
- GitHub issues reported
- StackOverflow answers posted
- Actual snippets and GitHub repos
-->

## Feedback loops

On the [Couchbase SQL++ for Query Reference](https://docs.couchbase.com/cloud/n1ql/n1ql-language-reference/index.html) and Atelio documentation pages, I added a feedback mechanism that:

- asks **_Is this page helpful? Yes/No_**
- has a **_Leave Additional Feedback?_** link to send entered text to the technical writer for triage and ticket making


## Code samples I wrote

### SDK quickstarts

| Post | Audience | Code samples | Remarks |
|------|----------|--------------|---------|
| [Android SDK for online payments](/blog/2020/04/04/android-sdk-online-payments) | Fintech developers | Java | Using Android Pay, collecting credit card info and payments, setting up an app, creating & using tokens, testing & deploying |
| [iOS SDK for Apple Pay payments](/blog/2020/05/05/ios-sdk-apple-pay-payments) | Fintech developers | Swift <br/> Objective-C | Using Apple Pay, collecting credit card info, creating tokens, sending tokens to your server |
| [Atelio SDK for cards](https://guyklages.com/atelio/cards/ateliocards-sdk) | Fintech developers | cURL <br/> Ruby <br/> Python <br/> JavaScript <br/> C# <br/> Java | Requirements, importing, displaying, setting card PIN |

### API sandbox demos

| Sandbox demo | Company |
|--------------|---------|
| [Sandbox vs Production](https://guyklages.com/atelio/getting-started/sandbox-vs-production) | Atelio of FIS |
| [Testing services](https://docs.nium.com/docs/getting-started/testing-nium) | Nium    |


### Postman collections

| Postman collection | Company |
|--------------------|---------|
| [Atelio APIs](https://guyklages.com/atelio/getting-started/postman-collection) | Atelio of FIS |
| [Nium APIs](https://docs.nium.com/docs/getting-started/postman-collection) | Nium |

### Nium API reference

After me, Nium has added more APIs and languages to their website. The following are the APIs I created with code samples in:

- C
- cURL
- HTTP
- Java
- JavaScript
- Python

| **CUSTOMER**              | **ACCOUNTS**                          | **CARDS**                             | **WALLET**               |
|---------------------------|---------------------------------------|---------------------------------------|--------------------------|
| _Customer onboarding_ <br/> [List customers][COL] <br/> [Create customers][COC] <br/> [Get customer][COG] <br/> [Update customer][COU] <br/> [Submit KYC for entity][COS] <br/> [Fetch public corp details][COP] <br/> [Fetch exhaustive corp details][COE] | | | |

[COC]: https://docs.nium.com/api#tag/customer-onboarding-v5/POST/api/v5/client/{clientHashId}/customers
[COE]: https://docs.nium.com/api#tag/customer-onboarding-v5/GET/api/v5/client/{clientHashId}/corporate/exhaustiveDetailsSearch
[COG]: https://docs.nium.com/api#tag/customer-onboarding-v5/GET/api/v5/client/{clientHashId}/customer/{customerHashId}
[COL]: https://docs.nium.com/api#tag/customer-onboarding-v5/GET/api/v5/client/{clientHashId}/customers
[COP]: https://docs.nium.com/api#tag/customer-onboarding-v5/GET/api/v5/client/{clientHashId}/corporate/publicDetails
[COS]: https://docs.nium.com/api#tag/customer-onboarding-v5/POST/api/v5/client/{clientHashId}/customer/{customerHashId}/submitKyc
[COU]: https://docs.nium.com/api#tag/customer-onboarding-v5/PUT/api/v5/client/{clientHashId}/customer/{customerHashId}

<!--
| Customer onboarding       | 1                                     | Simulators                            | Customer Wallet Balance  |
| 1                         | 2                                     | 1                                     | 1  |
| 2                         | 3                                     | 2                                     | 2  |
| 3                         | 4                                     |                                       | 3  |
| 4                         | 5                                     | Lifecycle                             | 4  |
| 5                         | 6                                     | 1                                     |    |
| 6                         |                                       | 2                                     | `Wallet-to-Wallet Xfer`  |
| 7                         | **<div align="center">PAYINS</div>**  | 3                                     |    |
| 8                         | Customer Funding                      | 4                                     | Customer Wallet Transactions |
|                           | 1                                     | 5                                     | 10 |
| Customer Accounts - Ind.  | 2                                     | 6                                     | 11 |
| 1                         | 3                                     | 7                                     |    |
| 2                         | 4                                     | 8                                     | **<div align="center">REPORTS</div>** |
| 3                         | 5                                     | 9                                     | 1  |
| 4                         | 6                                     | 10                                    | 2  |
| 5                         | 7                                     | 11                                    |    |
| 6                         |                                       |                                       | **<div align="center">TESTING</div>** |
| 7                         | Customer Virtual Account              | Security                              | 1  |
| Customer Accounts - Corp. | 1                                     | 1                                     | 2  |
| 1                         | 2                                     | 2                                     | 3  |
| 2                         | 3                                     | 3                                     | 4  |
| 3                         | 4                                     | 4                                     | 5  |
| 4                         | 5                                     | 5                                     | |
| 5                         |                                       | 6                                     | **<div align="center">CUSTOMER</div>** |
| 6                         | **<div align="center">PAYOUTS</div>** |                                       | User Management                        |
| 7                         | 1                                     | **<div align="center">CLIENTS</div>** | [List Users][CUL]      |
| 8                         | 2                                     | Client Prefund                        | [Create User][CUC]     |
| 9                         | 3                                     | 1                                     | [Get User][CUG]        | 
|                           | 4                                     | 2                                     | [Submit User KYC][CUS] |
| Customer Management       | 5                                     | 3                                     | |
| 1                         | 6                                     |                                       | |
| 2                         | 7                                     | Client Settings                       | |
| 3                         | 8                                     | 1                                     | |
| 4                         |                                       | 2                                     | |
| 5                         |                                       | 3                                     | |
| 6                         |                                       | `Client transaction`                  | | 
-->

[CUC]: https://docs.nium.com/api#tag/user-management/POST/api/v1/client/{clientHashId}/users
[CUG]: https://docs.nium.com/api#tag/user-management/GET/api/v1/client/{clientHashId}/user/{userHashId}
[CUL]: https://docs.nium.com/api#tag/user-management/GET/api/v1/client/{clientHashId}/users
[CUS]: https://docs.nium.com/api#tag/user-management/POST/api/v1/client/{clientHashId}/userKyc

### SQL indexes and queries

- While at Couchbase, there was a potential customer who wanted to buy if he could see examples of a new ANSI Index that was shipping in the latest version. 
  - The problem was that the default database that comes with Couchbase Server didn't contain enough specialized indexed fields to demonstrate the power of the new ANSI Index, and Couchbase executives didn't want to change any part of their example database. 
  - So, I created the indexes needed to make a query that could use the new ANSI Index and then made sample queries that used the new ANSI Indexes with my newly made indexed fields; and then I made a script so anyone could replicate those creation steps. 
  - I did this ad hoc "patch" again a few weeks later for a different customer who had a different use case. 
  - A few months later, Couchbase modified their example database to include these and other index types for all customers.
- All the **_SQL indexes_** and ***SQL queries*** on all pages under [SQL++ for Query Reference](https://docs.couchbase.com/cloud/n1ql/n1ql-language-reference/index.html)

| Operators  | Functions | <div style={{ width: '200px' }}>Statements (A-D)</div> | Statements (E-U) | SELECT |
|------------|-----------|------------------|------------------|--------|
| [Arithmetic](https://docs.couchbase.com/cloud/n1ql/n1ql-language-reference/arithmetic.html) <br/><br/> [Collection](https://docs.couchbase.com/cloud/n1ql/n1ql-language-reference/collectionops.html) <br/> [Comparison](https://docs.couchbase.com/cloud/n1ql/n1ql-language-reference/comparisonops.html) <br/> [Conditional](https://docs.couchbase.com/cloud/n1ql/n1ql-language-reference/conditionalops.html) <br/> [Construction](https://docs.couchbase.com/cloud/n1ql/n1ql-language-reference/constructionops.html) <br/><br/> [Logical](https://docs.couchbase.com/cloud/n1ql/n1ql-language-reference/logicalops.html) <br/><br/> [Nested](https://docs.couchbase.com/cloud/n1ql/n1ql-language-reference/nestedops.html) <br/><br/> [Sequence](https://docs.couchbase.com/cloud/n1ql/n1ql-language-reference/sequenceops.html) <br/> [String](https://docs.couchbase.com/cloud/n1ql/n1ql-language-reference/stringops.html) | [Aggregate](https://docs.couchbase.com/cloud/n1ql/n1ql-language-reference/aggregatefun.html) <br/> [Array](https://docs.couchbase.com/cloud/n1ql/n1ql-language-reference/arrayfun.html) <br/><br/> [Bitwise](https://docs.couchbase.com/cloud/n1ql/n1ql-language-reference/bitwisefun.html) <br/><br/> [Comparison](https://docs.couchbase.com/cloud/n1ql/n1ql-language-reference/comparisonfun.html) <br/> [Conditional for X](https://docs.couchbase.com/cloud/n1ql/n1ql-language-reference/condfununknown.html) <br/> [Conditional for Int](https://docs.couchbase.com/cloud/n1ql/n1ql-language-reference/condfunnum.html) <br/><br/> [Date](https://docs.couchbase.com/cloud/n1ql/n1ql-language-reference/datefun.html) <br/><br/> [JSON](https://docs.couchbase.com/cloud/n1ql/n1ql-language-reference/jsonfun.html) <br/><br/> [Miscellaneous Utility](https://docs.couchbase.com/cloud/n1ql/n1ql-language-reference/metafun.html) <br/><br/> [Number](https://docs.couchbase.com/cloud/n1ql/n1ql-language-reference/numericfun.html) <br/><br/> [Object](https://docs.couchbase.com/cloud/n1ql/n1ql-language-reference/objectfun.html) <br/><br/> [Pattern-Matching](https://docs.couchbase.com/cloud/n1ql/n1ql-language-reference/patternmatchingfun.html) <br/> [Search](https://docs.couchbase.com/cloud/n1ql/n1ql-language-reference/searchfun.html) <br/><br/> [String](https://docs.couchbase.com/cloud/n1ql/n1ql-language-reference/stringfun.html) <br/><br/> [Token](https://docs.couchbase.com/cloud/n1ql/n1ql-language-reference/tokenfun.html) <br/> [Type](https://docs.couchbase.com/cloud/n1ql/n1ql-language-reference/typefun.html) <br/><br/> [User-Defined](https://docs.couchbase.com/cloud/n1ql/n1ql-language-reference/userfun.html) <br/><br/> [Vector](https://docs.couchbase.com/cloud/n1ql/n1ql-language-reference/vectorfun.html) <br/><br/> [Window](https://docs.couchbase.com/cloud/n1ql/n1ql-language-reference/windowfun.html) | [ADVISE](https://docs.couchbase.com/cloud/n1ql/n1ql-language-reference/advise.html) <br/> [ALTER BUCKET](https://docs.couchbase.com/cloud/n1ql/n1ql-language-reference/alterbucket.html) <br/> [ALTER GROUP](https://docs.couchbase.com/cloud/n1ql/n1ql-language-reference/altergroup.html) <br/> [ALTER INDEX](https://docs.couchbase.com/cloud/n1ql/n1ql-language-reference/alterindex.html) <br/> [ALTER SEQUENCE](https://docs.couchbase.com/cloud/n1ql/n1ql-language-reference/altersequence.html) <br/> [ALTER USER](https://docs.couchbase.com/cloud/n1ql/n1ql-language-reference/alteruser.html) <br/> [ALTER VECTOR INDEX](https://docs.couchbase.com/cloud/n1ql/n1ql-language-reference/altervectorindex.html) <br/><br/> [BEGIN TRANSACTION](https://docs.couchbase.com/cloud/n1ql/n1ql-language-reference/begin-transaction.html) <br/> [BUILD INDEX](https://docs.couchbase.com/cloud/n1ql/n1ql-language-reference/build-index.html) <br/><br/> [COMMIT TRANSACTION](https://docs.couchbase.com/cloud/n1ql/n1ql-language-reference/commit-transaction.html) <br/> [CREATE BUCKET](https://docs.couchbase.com/cloud/n1ql/n1ql-language-reference/createbucket.html) <br/> [CREATE COLLECTION](https://docs.couchbase.com/cloud/n1ql/n1ql-language-reference/createcollection.html) <br/> [CREATE FUNCTION](https://docs.couchbase.com/cloud/n1ql/n1ql-language-reference/createfunction.html) <br/> [CREATE GROUP](https://docs.couchbase.com/cloud/n1ql/n1ql-language-reference/creategroup.html) <br/> [CREATE INDEX](https://docs.couchbase.com/cloud/n1ql/n1ql-language-reference/createindex.html) <br/> [CREATE PRIMARY INDEX](https://docs.couchbase.com/cloud/n1ql/n1ql-language-reference/createprimaryindex.html) <br/> [CREATE SEQUENCE](https://docs.couchbase.com/cloud/n1ql/n1ql-language-reference/createsequence.html) <br/> [CREATE SCOPE](https://docs.couchbase.com/cloud/n1ql/n1ql-language-reference/createscope.html) <br/> [CREATE USER](https://docs.couchbase.com/cloud/n1ql/n1ql-language-reference/createuser.html) <br/> [CREATE VECTOR INDEX](https://docs.couchbase.com/cloud/n1ql/n1ql-language-reference/createvectorindex.html) <br/><br/> [DELETE](https://docs.couchbase.com/cloud/n1ql/n1ql-language-reference/delete.html) <br/> [DROP BUCKET](https://docs.couchbase.com/cloud/n1ql/n1ql-language-reference/dropbucket.html) <br/> [DROP COLLECTION](https://docs.couchbase.com/cloud/n1ql/n1ql-language-reference/dropcollection.html) <br/> [DROP FUNCTION](https://docs.couchbase.com/cloud/n1ql/n1ql-language-reference/dropfunction.html) <br/> [DROP GROUP](https://docs.couchbase.com/cloud/n1ql/n1ql-language-reference/dropgroup.html) <br/> [DROP INDEX](https://docs.couchbase.com/cloud/n1ql/n1ql-language-reference/dropindex.html) <br/> [DROP PRIMARY INDEX](https://docs.couchbase.com/cloud/n1ql/n1ql-language-reference/dropprimaryindex.html) <br/> [DROP SEQUENCE](https://docs.couchbase.com/cloud/n1ql/n1ql-language-reference/dropsequence.html) <br/> [DROP VECTOR INDEX](https://docs.couchbase.com/cloud/n1ql/n1ql-language-reference/dropvectorindex.html) <br/> [DROP SCOPE](https://docs.couchbase.com/cloud/n1ql/n1ql-language-reference/dropscope.html) <br/> [DROP USER](https://docs.couchbase.com/cloud/n1ql/n1ql-language-reference/dropuser.html)  |  [EXECUTE](https://docs.couchbase.com/cloud/n1ql/n1ql-language-reference/execute.html) <br/> [EXECUTE FUNCTION](https://docs.couchbase.com/cloud/n1ql/n1ql-language-reference/execfunction.html) <br/> [EXPLAIN](https://docs.couchbase.com/cloud/n1ql/n1ql-language-reference/explain.html) <br/> [EXPLAIN FUNCTION](https://docs.couchbase.com/cloud/n1ql/n1ql-language-reference/explainfunction.html) <br/><br/> [GRANT](https://docs.couchbase.com/cloud/n1ql/n1ql-language-reference/grant.html) <br/><br/> [INFER](https://docs.couchbase.com/cloud/n1ql/n1ql-language-reference/infer.html) <br/> [INSERT](https://docs.couchbase.com/cloud/n1ql/n1ql-language-reference/insert.html) <br/><br/> [MERGE](https://docs.couchbase.com/cloud/n1ql/n1ql-language-reference/merge.html) <br/><br/> [PREPARE](https://docs.couchbase.com/cloud/n1ql/n1ql-language-reference/prepare.html) <br/><br/> [REVOKE](https://docs.couchbase.com/cloud/n1ql/n1ql-language-reference/revoke.html) <br/> [ROLLBACK TRANSACTION](https://docs.couchbase.com/cloud/n1ql/n1ql-language-reference/rollback-transaction.html) <br/><br/> [SAVEPOINT](https://docs.couchbase.com/cloud/n1ql/n1ql-language-reference/savepoint.html) <br/> [SET TRANSACTION](https://docs.couchbase.com/cloud/n1ql/n1ql-language-reference/set-transaction.html) <br/><br/> [UPDATE](https://docs.couchbase.com/cloud/n1ql/n1ql-language-reference/update.html) <br/> [UPDATE STATISTICS](https://docs.couchbase.com/cloud/n1ql/n1ql-language-reference/updatestatistics.html) <br/> [UPSERT](https://docs.couchbase.com/cloud/n1ql/n1ql-language-reference/upsert.html) <br/> [USING AI](https://docs.couchbase.com/cloud/n1ql/n1ql-language-reference/using-ai.html) | [Syntax](https://docs.couchbase.com/cloud/n1ql/n1ql-language-reference/select-syntax.html) <br/> [Clause](https://docs.couchbase.com/cloud/n1ql/n1ql-language-reference/selectclause.html) <br/><br/> [WITH](https://docs.couchbase.com/cloud/n1ql/n1ql-language-reference/with.html) <br/> [WITH RECURSIVE](https://docs.couchbase.com/cloud/n1ql/n1ql-language-reference/with-recursive.html) <br/><br/> [FROM](https://docs.couchbase.com/cloud/n1ql/n1ql-language-reference/from.html) <br/><br/> [USE](https://docs.couchbase.com/cloud/n1ql/n1ql-language-reference/hints.html) <br/><br/> [JOIN](https://docs.couchbase.com/cloud/n1ql/n1ql-language-reference/join.html) <br/> [JOIN Comma-Separated](https://docs.couchbase.com/cloud/n1ql/n1ql-language-reference/comma.html) <br/><br/> [NEST](https://docs.couchbase.com/cloud/n1ql/n1ql-language-reference/nest.html) <br/> [UNNEST](https://docs.couchbase.com/cloud/n1ql/n1ql-language-reference/unnest.html) <br/><br/> [LET](https://docs.couchbase.com/cloud/n1ql/n1ql-language-reference/let.html) <br/><br/> [WHERE](https://docs.couchbase.com/cloud/n1ql/n1ql-language-reference/where.html) <br/><br/> [GROUP BY](https://docs.couchbase.com/cloud/n1ql/n1ql-language-reference/groupby.html) <br/> [WINDOW](https://docs.couchbase.com/cloud/n1ql/n1ql-language-reference/window.html) <br/><br/> [UNION, INTERSECT, EXCEPT](https://docs.couchbase.com/cloud/n1ql/n1ql-language-reference/union.html) <br/><br/> [ORDER BY](https://docs.couchbase.com/cloud/n1ql/n1ql-language-reference/orderby.html) <br/><br/> [LIMIT](https://docs.couchbase.com/cloud/n1ql/n1ql-language-reference/limit.html) <br/> [OFFSET](https://docs.couchbase.com/cloud/n1ql/n1ql-language-reference/offset.html) |


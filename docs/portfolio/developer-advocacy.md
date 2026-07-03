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

| Developer problem I solved | Company |
|----------------------------|---------|
| Created a framework of governance and guardrails with templates in Markdown and YAML files to make it easier for developers to build Copilot Agents | Microsoft |
| Improved the Metaverse documentation with examples for faster building | Meta |
| Created internal documentation for the complex installation and configuration of their tool that populates the Netflix Home screen of titles so other departments can use it as well | Netflix |
| Created **[a clear onboarding process with sections of customer types](https://docs.nium.com/docs/onboarding)** for common onboarding steps and for region-specific parameter and example pages, which doubled the number of people onboarded per month with 75% fewer issues | Nium |
| Filled in their documentiona gaps and greatly enhanced their internal documentation with more explanations and examples for engineers to use the Apache ecosystem tools for their Big Data and IoT projects. My docs were called, "more thorough than Apache's documentation site." | Yahoo |
| Improved the completeness and accuracy of the AdWords API department's documentation to be **[the highest rated department in all of Google](https://guyklages.com/portfolio/hardest-problems-ive-solved#1-department-in-documention)** | Google |
| **[Reduced helpdesk tickets by 30%](https://guyklages.com/portfolio/hardest-problems-ive-solved#30-fewer-helpdesk-tickets)** by vastly improving their documentation by elaborating the explanations and adding example queries | Couchbase |
| **[Reduced helpdesk tickets by 88%](https://guyklages.com/portfolio/hardest-problems-ive-solved#88-drop-in-helpdesk-queue)** by redesigning their Helpdesk system and by answering many calls myself instead of creating a ticket | Microsoft |


## Community contributions

- Replied to [3 posts on Couchbase's forum](https://www.couchbase.com/forums/u/guy.klages/activity) 
- Replied to dozens of forum posts via email due to privacy issues
- In the future, I'll post the non-private parts in the forum so everyone can benefit.

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

### SQL indexes and queries

- All the **_SQL indexes_** and ***SQL queries*** on all pages under [SQL++ for Query Reference](https://docs.couchbase.com/cloud/n1ql/n1ql-language-reference/index.html)
- While at Couchbase, there was a potential customer who wanted to buy if he could see examples of a new ANSI Index that was shipping in the latest version. 
  - The problem was that the default database that comes with Couchbase Server didn't contain enough specialized indexed fields to demonstrate the power of the new ANSI Index, and Couchbase didn't want to change any part of their example database. 
  - So, I created the indexes needed to make a query that could use the new ANSI Index and then made sample queries that used the new ANSI Indexes with my newly made indexed fields; and then I made a script so anyone could replicate those creation steps. 
  - I did this ad hoc "patch" again a few weeks later for a different customer who had a different use case. 
  - A few months later, Couchbase modified their example database to include these and other index types for all customers.

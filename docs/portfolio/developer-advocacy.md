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
| Developers of Nium's customers weren't able to onboard Nium's products due to the complexity of different steps for different company types in different countries. | I made a step-by-step unified onboarding process that immediately [doubled the number of customers onboarded while reducing helpdesk tickets by 75%](./hardest-problems-ive-solved.md#2x-onboarding-75-fewer-issues). | Nium |
| Developers were building internal AI/ML/LLM tools but had difficulty since Apache's documentation didn't cover all of their use cases or needs. | I filled in their documentiona gaps and greatly enhanced their internal documentation with more explanations and examples for engineers to use the Apache ecosystem tools for their Big Data and IoT projects. My docs were called, "more thorough than Apache's documentation site." | Yahoo |
| AdWordsAPI developers had trouble finding what they needed since the Confluence pages hadn't been updated in many months or years and some were simply obsolete. | I improved the completeness and accuracy of the AdWords API department's documentation to be **[the highest rated department in all of Google](https://guyklages.com/portfolio/hardest-problems-ive-solved#1-department-in-documention)** | Google |
| Customer developers had trouble writing queries since the documentation was sparse and had no example queries of usage. | I vastly improved their documentation by elaborating on the explanations and usage as well as adding many example queries, which **[Reduced helpdesk tickets by 30%](https://guyklages.com/portfolio/hardest-problems-ive-solved#30-fewer-helpdesk-tickets)** | Couchbase |
| Developers couldn't keep up with the ever-growing queue of helpdesk tickets since their process didn't call customers at the best time to reach them. | I redesigned their Helpdesk system to call them during the timespan the specified and at the number (home or work) specified; and I answered many calls myself instead of creating a ticket. These **[Reduced helpdesk tickets by 88%](https://guyklages.com/portfolio/hardest-problems-ive-solved#88-drop-in-helpdesk-queue)** | Microsoft |


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
  - The problem was that the default database that comes with Couchbase Server didn't contain enough specialized indexed fields to demonstrate the power of the new ANSI Index, and Couchbase executives didn't want to change any part of their example database. 
  - So, I created the indexes needed to make a query that could use the new ANSI Index and then made sample queries that used the new ANSI Indexes with my newly made indexed fields; and then I made a script so anyone could replicate those creation steps. 
  - I did this ad hoc "patch" again a few weeks later for a different customer who had a different use case. 
  - A few months later, Couchbase modified their example database to include these and other index types for all customers.

# Developer advocacy

## Talks

#### Nium

| Venue | <div style={{ width: '150px' }}>Topic</div> | <div style={{ width: '150px' }}>Audience</div> | Crowd size | Remarks |
|-------|-------|----------|:----------:|---------|
| Monthly [Nium events](https://www.nium.com/events) | - Fintech Meetup <br/> - Money20/20 <br/> - Money&nbsp;Street&nbsp;Fest | - Developers <br/> - PMs <br/> - payment leaders <br/> - treasury teams | 20+ | Panel discussions about trust, compliance, payments stack, other financial topics, and how Nium can help |

#### Couchbase

| Venue | Topic | <div style={{ width: '130px' }}>Audience</div> | Crowd size | Remarks |
|-------|-------|----------|:----------:|---------|
| San Jose Convention Center | [Couchbase Connect](https://www.couchbase.com/resources/webcasts-and-events/) Hands-on query walkthrough | - Developers <br/> - techy PMs | 300+ | Projected a PowerPoint presentation while speaking and leading the crowd to build queries on their laptops while I did on mine |
| Monthly [MeetUp](https://www.meetup.com/find/?keywords=Couchbase&source=EVENTS) groups | Couchbase NoSQL vs SQL | - Developers <br/> - DBAs | 20+ | Discussed index and query types and Big Data use cases |

## Published articles

#### LinkedIn (21,000+ followers)

| Title                                                                                         | Target audience |
|-----------------------------------------------------------------------------------------------|-----------------|
| [Gmail agent for job auto-replies](/blog/gmail-agent-for-job-auto-replies)                    | Job hunters     |
| [15 passive ways for employers to find you](/blog/15-passive-ways-for-employers-to-find-you)  | Everyone        |
| [13 active ways for employers to find you](/blog/13-active-ways-for-employers-to-find-you)    | Job hunters     |
| [The healthier doughnut](/blog/the-healthier-doughnut)                                        | Everyone        |

#### Fintech blog posts

FIS/Atelio

- Pay by Bank payment method allows payments without credit/debit card info
- Consumer Secured Charge Card is an embeddable solution for many use cases
- Identity solves for use cases across key customer channels

Nium

- Client Prefund Account APIs let you track those funds across all currencies
- Wallet-to-Wallet Transfers APIs move funds across different clients
- Customer Virtual Accounts APIs manage virtual account numbers for a customer's wallet

## API

| Company                                    | API categories                                                              |
|--------------------------------------------|-----------------------------------------------------------------------------|
| Atelio                                     | _(Discontinued product)_ Nearly identical to Nium                           |
| **[Nium](./guides-api-reference.md#nium)** | Cards, Clients, Customers, Payins, Payouts, Reports, RFIs, Testing, Wallets |

## SDK

#### ROAM -- for fintech developers

| Title | <div style={{ width: '120px' }}>Code samples</div> | Contents |
|-------|--------------|----------|
| **[SDK for Android payments](./roam-android-sdk-online-payments.md)** | Java | Using Android Pay, collecting credit card info and payments, setting up an app, creating & using tokens, testing & deploying |
| **[SDK for iOS Apple Pay payments](./roam-ios-sdk-apple-pay-payments.md)** | - Swift <br/> - Objective-C | Using Apple Pay, collecting credit card info, creating tokens, sending tokens to your server |

#### Atelio -- for fintech developers

| Title | <div style={{ width: '120px' }}>Code samples</div> | Contents |
|-------|--------------|----------|
| **[SDK for web documentation](https://guyklages.com/atelio/developers/web-sdk-documentation)** |  | Requirements, importing, displaying, setting card PIN |

## KB

| Company and audience                            | Products                             |
|-------------------------------------------------|--------------------------------------|
| **[VMware for UEM developers](./kb-vmware.md)** | AppStack, AppVolumes, ThinPrint, UEM |


## Dev problems I've solved

| Developer problem | How I solved it | Company |
|-------------------|-----------------|---------|
| Developers had a hodgepodge of `skill.md` and `instruction.md` and various `.yaml` files and needed structure for their internal agent-driven workflows, server architecture, and usability. | I Created a framework of governance and guardrails with templates in Markdown and YAML files to make it easier for developers to build Copilot Agents | Microsoft |
| Metaverse developers had trouble making 3-D objects behave the way they wanted. | I improved the Metaverse documentation with explanations and examples for faster building. | Meta |
| Developers created an AI/ML/LLM system to populate the Netflix home screen of titles and needed to share this technology with other Netflix departments but weren't able to install or configure it outside their group. | I tested and created internal documentation for the complex installation and configuration of their tool that populates the Netflix Home screen of titles so other departments can use it as well | Netflix |
| Customers' developers weren't able to onboard Nium's products due to the complexity of different steps for different company types in different countries. | I made a step-by-step unified onboarding process that immediately saw **[70% more onboarded while 70% fewer helpdesk tickets](./most-impactful-tech-writing.md#70-more--70-fewer)**. | Nium |
| Developers were building internal AI/ML/LLM tools but had difficulty since Apache's documentation didn't cover all of their use cases or needs. | I filled in their documentation gaps and greatly enhanced their internal documentation with more explanations and examples for engineers to use the Apache ecosystem tools for their Big Data and IoT projects. An engineer said my docs are _"more thorough than Apache's documentation site."_ | Yahoo |
| AdWordsAPI developers had trouble finding what they needed since the AdWords department hadn't updated their Confluence pages in many years and some were simply obsolete. | I improved the completeness and accuracy of the AdWords API department's documentation to be the **[highest rated department in all of Google](./most-impactful-tech-writing.md#1-dept-in-documentation)**. | Google |
| Customer developers had trouble writing queries since the documentation was sparse and had no example queries of usage. | I vastly improved their documentation by elaborating on the explanations and adding many example queries, which **[Reduced helpdesk tickets by 30%](./most-impactful-tech-writing.md#30-fewer-helpdesk-tickets)** | Couchbase |
| Developers couldn't keep up with the ever-growing queue of helpdesk tickets since their process didn't call customers at the best time to reach them. | I redesigned their Helpdesk system to call them during the time range the customer specified and at the number (home or work) specified; and I answered many calls myself instead of creating a ticket. These **[Reduced helpdesk tickets by 92%](./most-impactful-software-engineering.md#92-drop-in-helpdesk-queue)** | Microsoft |

## Dev tools I've built

| Developer problem | How I solved it | Company |
|-------------------|-----------------|---------|
| Since Couchbase is schemaless and query performance is index-dependent in a way that isn't always obvious from the query syntax alone, developers routinely write a SQL++ query that works fine against a small local dataset, then silently full-scans a multi-million-document bucket in production; and it's often not discovered until someone notices latency or cost spike. <br/><br/> My Couchbase documentation work detailed this exactly in the [Adaptive Index](https://docs.couchbase.com/server/7.6/n1ql/n1ql-language-reference/adaptive-indexing.html) and [GSI Indexing / Index Pushdown](https://docs.couchbase.com/server/current/indexes/index_pushdowns.html) pages. | Query preflight checker. <br/><br/> I built a small CLI tool that takes a SQL++ query and a target bucket, and warns _before_ the query runs in production whether it will trigger a full primary index scan instead of using a covering secondary index. | Couchbase |
| Since Couchbase documents in the same collection have no enforced schema, teams coming from a relational background often created a kind of silent drift that's easy to introduce and hard to notice in a schemaless system. | Schema drift detector. <br/><br/> I built a tool that samples a collection and reports fields that are inconsistently typed or present across documents, catching that kind of silent drift. | Couchbase |

## Community contributions

#### Websites

- Atelio ............ Dev Portal _(product discontinued)_
- Nium ............. [Dev Portal](https://app.nium.com/)
- Couchbase ... [Forums](https://www.couchbase.com/forums)

#### Roles I performed at those websites

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
- After replying to sensitive matters in email, I learned to post a 2nd reply without sensitive info in the forum so everyone can benefit

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

## Marketing contributions

At Couchbase, Nium, and FIS/Atelio, I've helped the marketing department in the following ways:

| Category                                         | Description |
|--------------------------------------------------|-------------|
| Technically credible content                     | - Blog posts <br/> - Tutorials <br/> - Training videos |
| Developer feedback loop                          | - Forums <br/> - Discord <br/> - Conference hallway conversations <br/> - Support threads (objections, confuses them, etc.) |
| Organic reach                                    | - Conference talks <br/> - Meetups <br/> - Community presence |
| Customer stories                                 | - Deep relationships have surfaced genuine use cases and testimonials orgnically <br/> - Helped Marketing turn those into case studies and proof points |
| Launch support and technical narrative           | - When shipping a new feature, I turned "what we built" into "why it matters and how to use it" <br/> - Deep-dive blog posts <br/> - Demos and workshops |
| Event strategy by informed community knowledge   | I informed Marketing which developer-specific meetups and communities would have a good chance of reaching the target audience |


## Feedback loops

On the [Couchbase SQL++ for Query Reference](https://docs.couchbase.com/cloud/n1ql/n1ql-language-reference/index.html) and Atelio documentation pages, I added a feedback mechanism that:

- asks **_Is this page helpful? Yes/No_**
- has a **_Leave Additional Feedback?_** box to send entered text to the technical writer for triage and ticket making


## Code samples I wrote

### SDK quickstarts

| Post | Audience | <div style={{ width: '120px' }}>Code samples</div> | Remarks |
|------|----------|--------------|---------|
| [Android SDK for online payments](./roam-android-sdk-online-payments.md) | Fintech developers | Java | Using Android Pay, collecting credit card info and payments, setting up an app, creating & using tokens, testing & deploying |
| [iOS SDK for Apple Pay payments](./roam-ios-sdk-apple-pay-payments.md) | Fintech developers | - Swift <br/> - Objective-C | Using Apple Pay, collecting credit card info, creating tokens, sending tokens to your server |
| [Atelio SDK for cards](https://guyklages.com/atelio/cards/ateliocards-sdk) | Fintech developers | - cURL <br/> - Ruby <br/> - Python <br/> - JavaScript <br/> - C# <br/> - Java | Requirements, importing, displaying, setting card PIN |

### API sandbox demos

- [Atelio (of FIS) Sandbox vs Production](https://guyklages.com/atelio/getting-started/sandbox-vs-production)
- [Nium Testing services](https://docs.nium.com/docs/getting-started/testing-nium)

### Postman collections

- [Atelio (of FIS) Postman collections](https://guyklages.com/atelio/getting-started/postman-collection)
- [Nium Postman collections](https://docs.nium.com/docs/getting-started/postman-collection)

### Nium API reference

Nium has added more API endpoints and supported languages after I left. **[These are the Nium API endpoints](./guides-api-reference.md#nium)** I documented with code samples in:

- C
- cURL
- HTTP
- Java
- JavaScript
- Python

### SQL indexes and queries

- While at Couchbase, there was a potential customer who wanted to buy if he could see examples of a new ANSI Index that was shipping in the latest version.
  - The problem was that the default database that comes with Couchbase Server didn't contain enough specialized indexed fields to demonstrate the power of the new ANSI Index, and Couchbase executives didn't want to change any part of their example database. 
  - So, I created the indexes needed to make a query that could use the new ANSI Index and then made sample queries that used the new ANSI Indexes with my newly made indexed fields; and then I made a script so anyone could replicate those creation steps. 
  - I did this ad hoc "patch" again a few weeks later for a different customer who had a different use case. 
  - A few months later, Couchbase modified their example database to include these and other index types for all customers.
- I wrote or vastly improved nearly all pages under [SQL++ for Query Reference](https://docs.couchbase.com/cloud/n1ql/n1ql-language-reference/index.html) by adding:
  - Examples
  - Diagrams
  - Indexes and queries

| Operators  | Functions | <div style={{ width: '200px' }}>Statements (A-D)</div> | Statements (E-U) | SELECT |
|------------|-----------|------------------|------------------|--------|
| [Arithmetic](https://docs.couchbase.com/cloud/n1ql/n1ql-language-reference/arithmetic.html) <br/><br/><br/> [Collection](https://docs.couchbase.com/cloud/n1ql/n1ql-language-reference/collectionops.html) <br/><br/> [Comparison](https://docs.couchbase.com/cloud/n1ql/n1ql-language-reference/comparisonops.html) <br/><br/> [Conditional](https://docs.couchbase.com/cloud/n1ql/n1ql-language-reference/conditionalops.html) <br/><br/> [Construction](https://docs.couchbase.com/cloud/n1ql/n1ql-language-reference/constructionops.html) <br/><br/><br/> [Logical](https://docs.couchbase.com/cloud/n1ql/n1ql-language-reference/logicalops.html) <br/><br/><br/> [Nested](https://docs.couchbase.com/cloud/n1ql/n1ql-language-reference/nestedops.html) <br/><br/><br/> [Sequence](https://docs.couchbase.com/cloud/n1ql/n1ql-language-reference/sequenceops.html) <br/><br/> [String](https://docs.couchbase.com/cloud/n1ql/n1ql-language-reference/stringops.html) | [Aggregate](https://docs.couchbase.com/cloud/n1ql/n1ql-language-reference/aggregatefun.html) <br/> [Array](https://docs.couchbase.com/cloud/n1ql/n1ql-language-reference/arrayfun.html) <br/><br/> [Bitwise](https://docs.couchbase.com/cloud/n1ql/n1ql-language-reference/bitwisefun.html) <br/><br/> [Comparison](https://docs.couchbase.com/cloud/n1ql/n1ql-language-reference/comparisonfun.html) <br/> [Conditional for X](https://docs.couchbase.com/cloud/n1ql/n1ql-language-reference/condfununknown.html) <br/> [Conditional for Int](https://docs.couchbase.com/cloud/n1ql/n1ql-language-reference/condfunnum.html) <br/><br/> [Date](https://docs.couchbase.com/cloud/n1ql/n1ql-language-reference/datefun.html) <br/><br/> [JSON](https://docs.couchbase.com/cloud/n1ql/n1ql-language-reference/jsonfun.html) <br/><br/> [Miscellaneous Utility](https://docs.couchbase.com/cloud/n1ql/n1ql-language-reference/metafun.html) <br/><br/> [Number](https://docs.couchbase.com/cloud/n1ql/n1ql-language-reference/numericfun.html) <br/><br/> [Object](https://docs.couchbase.com/cloud/n1ql/n1ql-language-reference/objectfun.html) <br/><br/> [Pattern-Matching](https://docs.couchbase.com/cloud/n1ql/n1ql-language-reference/patternmatchingfun.html) <br/> [Search](https://docs.couchbase.com/cloud/n1ql/n1ql-language-reference/searchfun.html) <br/><br/> [String](https://docs.couchbase.com/cloud/n1ql/n1ql-language-reference/stringfun.html) <br/><br/> [Token](https://docs.couchbase.com/cloud/n1ql/n1ql-language-reference/tokenfun.html) <br/> [Type](https://docs.couchbase.com/cloud/n1ql/n1ql-language-reference/typefun.html) <br/><br/> [User-Defined](https://docs.couchbase.com/cloud/n1ql/n1ql-language-reference/userfun.html) <br/><br/> [Vector](https://docs.couchbase.com/cloud/n1ql/n1ql-language-reference/vectorfun.html) <br/><br/> [Window](https://docs.couchbase.com/cloud/n1ql/n1ql-language-reference/windowfun.html) | [ADVISE](https://docs.couchbase.com/cloud/n1ql/n1ql-language-reference/advise.html) <br/> [ALTER BUCKET](https://docs.couchbase.com/cloud/n1ql/n1ql-language-reference/alterbucket.html) <br/> [ALTER GROUP](https://docs.couchbase.com/cloud/n1ql/n1ql-language-reference/altergroup.html) <br/> [ALTER INDEX](https://docs.couchbase.com/cloud/n1ql/n1ql-language-reference/alterindex.html) <br/> [ALTER SEQUENCE](https://docs.couchbase.com/cloud/n1ql/n1ql-language-reference/altersequence.html) <br/> [ALTER USER](https://docs.couchbase.com/cloud/n1ql/n1ql-language-reference/alteruser.html) <br/> [ALTER VECTOR INDEX](https://docs.couchbase.com/cloud/n1ql/n1ql-language-reference/altervectorindex.html) <br/><br/> [BEGIN TRANSACTION](https://docs.couchbase.com/cloud/n1ql/n1ql-language-reference/begin-transaction.html) <br/> [BUILD INDEX](https://docs.couchbase.com/cloud/n1ql/n1ql-language-reference/build-index.html) <br/><br/> [COMMIT TRANSACTION](https://docs.couchbase.com/cloud/n1ql/n1ql-language-reference/commit-transaction.html) <br/> [CREATE BUCKET](https://docs.couchbase.com/cloud/n1ql/n1ql-language-reference/createbucket.html) <br/> [CREATE COLLECTION](https://docs.couchbase.com/cloud/n1ql/n1ql-language-reference/createcollection.html) <br/> [CREATE FUNCTION](https://docs.couchbase.com/cloud/n1ql/n1ql-language-reference/createfunction.html) <br/> [CREATE GROUP](https://docs.couchbase.com/cloud/n1ql/n1ql-language-reference/creategroup.html) <br/> [CREATE INDEX](https://docs.couchbase.com/cloud/n1ql/n1ql-language-reference/createindex.html) <br/> [CREATE PRIMARY INDEX](https://docs.couchbase.com/cloud/n1ql/n1ql-language-reference/createprimaryindex.html) <br/> [CREATE SEQUENCE](https://docs.couchbase.com/cloud/n1ql/n1ql-language-reference/createsequence.html) <br/> [CREATE SCOPE](https://docs.couchbase.com/cloud/n1ql/n1ql-language-reference/createscope.html) <br/> [CREATE USER](https://docs.couchbase.com/cloud/n1ql/n1ql-language-reference/createuser.html) <br/> [CREATE VECTOR INDEX](https://docs.couchbase.com/cloud/n1ql/n1ql-language-reference/createvectorindex.html) <br/><br/> [DELETE](https://docs.couchbase.com/cloud/n1ql/n1ql-language-reference/delete.html) <br/> [DROP BUCKET](https://docs.couchbase.com/cloud/n1ql/n1ql-language-reference/dropbucket.html) <br/> [DROP COLLECTION](https://docs.couchbase.com/cloud/n1ql/n1ql-language-reference/dropcollection.html) <br/> [DROP FUNCTION](https://docs.couchbase.com/cloud/n1ql/n1ql-language-reference/dropfunction.html) <br/> [DROP GROUP](https://docs.couchbase.com/cloud/n1ql/n1ql-language-reference/dropgroup.html) <br/> [DROP INDEX](https://docs.couchbase.com/cloud/n1ql/n1ql-language-reference/dropindex.html) <br/> [DROP PRIMARY INDEX](https://docs.couchbase.com/cloud/n1ql/n1ql-language-reference/dropprimaryindex.html) <br/> [DROP SEQUENCE](https://docs.couchbase.com/cloud/n1ql/n1ql-language-reference/dropsequence.html) <br/> [DROP VECTOR INDEX](https://docs.couchbase.com/cloud/n1ql/n1ql-language-reference/dropvectorindex.html) <br/> [DROP SCOPE](https://docs.couchbase.com/cloud/n1ql/n1ql-language-reference/dropscope.html) <br/> [DROP USER](https://docs.couchbase.com/cloud/n1ql/n1ql-language-reference/dropuser.html)  |  [EXECUTE](https://docs.couchbase.com/cloud/n1ql/n1ql-language-reference/execute.html) <br/> [EXECUTE FUNCTION](https://docs.couchbase.com/cloud/n1ql/n1ql-language-reference/execfunction.html) <br/> [EXPLAIN](https://docs.couchbase.com/cloud/n1ql/n1ql-language-reference/explain.html) <br/> [EXPLAIN FUNCTION](https://docs.couchbase.com/cloud/n1ql/n1ql-language-reference/explainfunction.html) <br/><br/> [GRANT](https://docs.couchbase.com/cloud/n1ql/n1ql-language-reference/grant.html) <br/><br/> [INFER](https://docs.couchbase.com/cloud/n1ql/n1ql-language-reference/infer.html) <br/> [INSERT](https://docs.couchbase.com/cloud/n1ql/n1ql-language-reference/insert.html) <br/><br/> [MERGE](https://docs.couchbase.com/cloud/n1ql/n1ql-language-reference/merge.html) <br/><br/> [PREPARE](https://docs.couchbase.com/cloud/n1ql/n1ql-language-reference/prepare.html) <br/><br/> [REVOKE](https://docs.couchbase.com/cloud/n1ql/n1ql-language-reference/revoke.html) <br/> [ROLLBACK TRANSACTION](https://docs.couchbase.com/cloud/n1ql/n1ql-language-reference/rollback-transaction.html) <br/><br/> [SAVEPOINT](https://docs.couchbase.com/cloud/n1ql/n1ql-language-reference/savepoint.html) <br/> [SET TRANSACTION](https://docs.couchbase.com/cloud/n1ql/n1ql-language-reference/set-transaction.html) <br/><br/> [UPDATE](https://docs.couchbase.com/cloud/n1ql/n1ql-language-reference/update.html) <br/> [UPDATE STATISTICS](https://docs.couchbase.com/cloud/n1ql/n1ql-language-reference/updatestatistics.html) <br/> [UPSERT](https://docs.couchbase.com/cloud/n1ql/n1ql-language-reference/upsert.html) <br/> [USING AI](https://docs.couchbase.com/cloud/n1ql/n1ql-language-reference/using-ai.html) | [Syntax](https://docs.couchbase.com/cloud/n1ql/n1ql-language-reference/select-syntax.html) <br/> [Clause](https://docs.couchbase.com/cloud/n1ql/n1ql-language-reference/selectclause.html) <br/><br/> [WITH](https://docs.couchbase.com/cloud/n1ql/n1ql-language-reference/with.html) <br/> [WITH RECURSIVE](https://docs.couchbase.com/cloud/n1ql/n1ql-language-reference/with-recursive.html) <br/><br/> [FROM](https://docs.couchbase.com/cloud/n1ql/n1ql-language-reference/from.html) <br/><br/> [USE](https://docs.couchbase.com/cloud/n1ql/n1ql-language-reference/hints.html) <br/><br/> [JOIN](https://docs.couchbase.com/cloud/n1ql/n1ql-language-reference/join.html) <br/> [JOIN Comma-Separated](https://docs.couchbase.com/cloud/n1ql/n1ql-language-reference/comma.html) <br/><br/> [NEST](https://docs.couchbase.com/cloud/n1ql/n1ql-language-reference/nest.html) <br/> [UNNEST](https://docs.couchbase.com/cloud/n1ql/n1ql-language-reference/unnest.html) <br/><br/> [LET](https://docs.couchbase.com/cloud/n1ql/n1ql-language-reference/let.html) <br/><br/> [WHERE](https://docs.couchbase.com/cloud/n1ql/n1ql-language-reference/where.html) <br/><br/> [GROUP BY](https://docs.couchbase.com/cloud/n1ql/n1ql-language-reference/groupby.html) <br/> [WINDOW](https://docs.couchbase.com/cloud/n1ql/n1ql-language-reference/window.html) <br/><br/> [UNION, INTERSECT, EXCEPT](https://docs.couchbase.com/cloud/n1ql/n1ql-language-reference/union.html) <br/><br/> [ORDER BY](https://docs.couchbase.com/cloud/n1ql/n1ql-language-reference/orderby.html) <br/><br/> [LIMIT](https://docs.couchbase.com/cloud/n1ql/n1ql-language-reference/limit.html) <br/> [OFFSET](https://docs.couchbase.com/cloud/n1ql/n1ql-language-reference/offset.html) |

## Meetup events I attend

| Event                                                                             | City    | Frequency | Remarks    |
|-----------------------------------------------------------------------------------|---------|-----------|------------|
| [Agents & APIs Developer Meetup](https://www.postman.com/events/?region=NA)       | SF      | Monthly   | by Postman |
| [AI Tinkerers - SF](https://sf.aitinkerers.org/)                                  | SF      | Monthly   |            |
| [Global AI Makers](https://www.meetup.com/global-ai-makers-san-francisco/events/) | SF      | Monthly   |            |
| [SF AI Code & Coffee](https://www.meetup.com/sf-code-coffee/events/)              | SF      | Monthly   |            |
| [Toastmasters](https://toastmasters.org/find-a-club?q=Alameda%2C+CA+94502&radius=5&n=&advanced=0&latitude=37.733343&longitude=-122.242083&autocomplete=False&zoom=0)                                                   | Alameda | Weekly    |            |
| [Write the Docs](https://www.meetup.com/write-the-docs-bay-area/events/)          | SF      | Monthly   |            |


## Reddit communities I'm in

| r/                                                           | Description                                        |
|--------------------------------------------------------------|----------------------------------------------------|
| [LocalLLaMA](https://www.reddit.com/r/LocalLLaMA/)           | Locally hostable AI                                |
| [MachineLearning](https://www.reddit.com/r/MachineLearning/) | AI & ML                                            |
| [ChatGPTCoding](https://www.reddit.com/r/ChatGPTCoding/)     | For building and learning with AI-assisted coding  |
| [ClaudeCode](https://www.reddit.com/r/ClaudeCode/)           | For building and learning with AI-assisted coding  |
| [StableDiffusion](https://www.reddit.com/r/StableDiffusion)  | Open-source, local AI photorealistic art from text |

---
slug: docs-from-scratch
title: How to build documentation from scratch
authors: [guyklages]
tags: [database, fintech]
---

After helping many companies build their documentation from nothing (some without a help center), I decided to share what I've learned as the best course of action, in what order, and why. Each industry has its own quirks, so I've listed a few examples below:

- [API-first payment platform](#api-first-payment-platform)
- [Database SQL reference](#database-sql-reference)


## API-first payment platform

The ordering principle is to sequence by a developer’s path to value and by what reduces support load.

| Step          | Description     | Example:&nbsp;&nbsp;Nium |
|---------------|-----------------|--------------------------|
| 1. Get the first successful API call working | Write a quickstart that takes a developer from signup to a sandbox call that works, with auth, base URLs, and a copy-paste request. <br/><br/> Time-to-first-call is the metric that matters most for an API product. | [Quickstart](https://docs.nium.com/docs/getting-started) |
| 2. Write the reference for the highest-revenue flows | Payments products have a few core flows, such as onboarding customers, creating accounts or wallets, and sending a payout. <br/><br/> Document those, with request and response examples and error codes. | [Onboarding](https://docs.nium.com/docs/onboarding) |
| 3. Add the concepts that prevent support tickets | Developers in financial services get stuck on domain concepts more than syntax. Cover things like KYC/KYB states, webhooks and event lifecycles, idempotency, sandbox versus production, and regional or currency constraints. <br/><br/> Choose what to write by asking support and solutions engineers for their top repeat questions. | [KYC](https://docs.nium.com/docs/onboarding/customer-onboarding/submit-kyc-api) • [KYB](https://docs.nium.com/docs/onboarding/customer-onboarding/au-onboarding/required-documents) <br/> [Webhooks](https://docs.nium.com/docs/developers/notifications-and-webhooks) <br/> [Sandbox vs Prod](https://docs.nium.com/docs/getting-started/testing-nium#sandbox-and-production) |
| 4. Build the structure and navigation | The structure follows the audience’s tasks: Get started, Guides by use case, API reference, Webhooks, Changelog. Settle this after writing the first few pages, once you know what content exists. | [Getting started](https://docs.nium.com/docs/getting-started) <br/> [Use cases](https://docs.nium.com/docs/use-cases) <br/> [API reference](https://docs.nium.com/api) |
| 5. Set up the system that keeps it accurate | Put docs in version control, review them in pull requests, tie doc updates to the release process, and publish a changelog. <br/><br/> A small, accurate set of docs is better than a large one that has gone stale. | [Changelog](https://docs.nium.com/changelog) |
| 6. Measure and iterate | Track search queries with no results, page feedback, support-ticket deflection, and drop-off in the quickstart. |  |

## Database SQL reference

Without pageview data, you need proxies for usage. Here are the ones I’d use, roughly in order of reliability.

| Step          | Description     | Example:&nbsp;&nbsp;Couchbase |
|---------------|-----------------|--------------------------|
| 1. Real usage signals that already exist | - Support tickets, forums, and Stack Overflow: Count which functions people ask about. <br/> - Query logs or telemetry: If the product records which functions run, this is the closest thing to pageviews. <br/> - Sales engineers and solutions architects: Ask which functions they demo or explain repeatedly. <br/> - Competitor and standard docs: Functions that appear in the SQL standard, or that are heavily documented for Postgres or MySQL, are likely what users expect to find. | `system:completed_requests` |
| 2. Group by category and cover whole categories | Functions are rarely looked up in isolation. Developers browse by task: string, date and time, aggregate, array, JSON/object, type conversion, conditional. <br/><br/> Document the most-used category in full before touching the next one. A category page with consistent coverage is more useful than a scattering of well-written entries. | - [String functions](https://docs.couchbase.com/cloud/n1ql/n1ql-language-reference/stringfun.html) <br/> - [Date functions](https://docs.couchbase.com/cloud/n1ql/n1ql-language-reference/datefun.html) <br/> - [Aggregate functions](https://docs.couchbase.com/cloud/n1ql/n1ql-language-reference/aggregatefun.html) <br/> - [Array functions](https://docs.couchbase.com/cloud/n1ql/n1ql-language-reference/arrayfun.html) <br/> - [JSON functions](https://docs.couchbase.com/cloud/n1ql/n1ql-language-reference/jsonfun.html) <br/> - [Type functions](https://docs.couchbase.com/cloud/n1ql/n1ql-language-reference/typefun.html) |
| 3. Prioritize by the cost of getting it wrong | Some functions deserve early attention regardless of popularity: <br/> - Those with surprising behavior <br/> - Those that behave differently from the SQL standard or from other databases. <br/> - Those that are easy to misuse in ways that hurt performance or correctness. | - `NULL` vs `MISSING` handling <br/> - type coercion <br/> - timezone quirks <br/> - date-format quirks <br/> - other dialects like SQL++ |
| 4. Use a template to make the long tail cheap | Fix the entry structure up front: syntax, arguments, return type, `NULL`/`MISSING` behavior, example, and related functions. <br/><br/> Then the low-priority functions can be written quickly and consistently, and engineers can contribute drafts that follow the template. | - [SELECT](https://docs.couchbase.com/cloud/n1ql/n1ql-language-reference/selectintro.html) <br/> - [CREATE INDEX](https://docs.couchbase.com/cloud/n1ql/n1ql-language-reference/createindex.html) <br/> - [INSERT](https://docs.couchbase.com/cloud/n1ql/n1ql-language-reference/insert.html) |
| 5. Treat the first release as a baseline | Ship with the order above, then collect analytics and search data and re-prioritize. |  |

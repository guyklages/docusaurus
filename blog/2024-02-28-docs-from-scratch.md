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

| Step          | Description     | Example:&nbsp;Nium |
|---------------|-----------------|--------------------|
| 1. Get the first successful API call working | Write a quickstart that takes a developer from signup to a sandbox call that works, with auth, base URLs, and a copy-paste request. <br/><br/> Time-to-first-call is the metric that matters most for an API product. | [Quickstart](https://docs.nium.com/docs/getting-started) |
| 2. Write the reference for the highest-revenue flows | Payments products have a few core flows, such as onboarding customers, creating accounts or wallets, and sending a payout. <br/><br/> Document those, with request and response examples and error codes. | [Onboarding](https://docs.nium.com/docs/onboarding) |
| 3. Add the concepts that prevent support tickets | Developers in financial services get stuck on domain concepts more than syntax. Cover things like KYC/KYB states, webhooks and event lifecycles, idempotency, sandbox versus production, and regional or currency constraints. <br/><br/> Choose what to write by asking support and solutions engineers for their top repeat questions. | [KYC](https://docs.nium.com/docs/onboarding/customer-onboarding/submit-kyc-api) • [KYB](https://docs.nium.com/docs/onboarding/customer-onboarding/au-onboarding/required-documents) <br/> [Webhooks](https://docs.nium.com/docs/developers/notifications-and-webhooks) <br/> [Sandbox vs Prod](https://docs.nium.com/docs/getting-started/testing-nium#sandbox-and-production) |
| 4. Build the structure and navigation | The structure follows the audience’s tasks: Get started, Guides by use case, API reference, Webhooks, Changelog. Settle this after writing the first few pages, once you know what content exists. | [Getting started](https://docs.nium.com/docs/getting-started) <br/> [Use cases](https://docs.nium.com/docs/use-cases) <br/> [API reference](https://docs.nium.com/api) |
| 5. Set up the system that keeps it accurate | Put docs in version control, review them in pull requests, tie doc updates to the release process, and publish a changelog. <br/><br/> A small, accurate set of docs is better than a large one that has gone stale. | [Changelog](https://docs.nium.com/changelog) |
| 6. Measure and iterate | Track search queries with no results, page feedback, support-ticket deflection, and drop-off in the quickstart. |  |

## Database SQL reference

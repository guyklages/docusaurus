# Pricing and bundling

## Introduction

Atelio offers a modern approach to digital verification tailored to the needs of financial institutions. Pricing and capabilities are aligned to specific use cases, providing transparency, predictability, and alignment with your customer workflows.

Each use case includes a curated set of verifications that maximize automation, deliver strong risk signals, and ensure compliance with industry regulations — all without requiring you to manage dozens of vendors or tuning configurations.

## Pricing bundles

The platform comes out of the box with everything needed to verify your customers, this includes:

- A customer management portal.
- Self-service workflow configuration and branding.
- Ability to test the product with simulated or real data before buying.
- The ability to send an SMS message to a customer to begin the verification process. _(coming soon)_
- Case manager to review manual decisions.
- A hosted customer verification experience.
- APIs to recreate the verification experience or retrieve the results.

We don’t charge for these foundational capabilities and we want to give you the flexibility on how you consume experiences, whether you want to build your own UI or use our APIs.

The way we price our solution is based on the use case and the depth of verification that is required to support that use case. We currently offer the following bundles each designed for a distinct point in the customer lifecycle:

### Bundle descriptions

| Bundle Name | Availability | Description | Common Use Cases |
| --- | --- | --- | --- |
| **Standard customer verification** | ✅ | Used to do a full verification to confirm the identity of individuals through digital or in person channels and includes both an API or hosted experience. | In-branch verification, digital account opening, loan offer acceptance, gambling/crypto withdrawal |
| **Standard customer verification (without documents)** | ✅ | Used when you want to verify a customer passively without prompting them for ID scan, selfie or supporting documents. | Pre-qualification flows, instant account offers, gig worker signups, gambling/crypto deposits. |
| **Existing customer step-up** | 🔜 | Used in support channels (call center, in-branch, online) when the identity of a known existing customer needs to be confirmed with additional certainty. | Verify customers on the phone in a call center, re-verifying customers during money movement or login when a new device is detected. |
| **Customer data updates** | 🔜 | Used when a customer updates their address via online or assisted channels. This is used to mitigate the behavior of a bad actor updating account information on file such as the phone number to perform account takeover | Phone, email, name, or address updates online, in branch, or call center. |
| **Custom packages** | ✅ | If you have a custom flow or want to mix and match capabilities across use cases, our team can work with you to scope and configure your bundle appropriately. | Enterprise customers with pre-established systems and components. Access providers with very specific needs. Specialized use cases. |

### Bundle contents

Our bundles cover the following steps:

- [Screening](https://docs.atelio.com/embedded/docs/pricing-and-bundling#screening)
- [Device and behavior](https://docs.atelio.com/embedded/docs/pricing-and-bundling#device-and-behavior)
- [Ownership](https://docs.atelio.com/embedded/docs/pricing-and-bundling#ownership)
- [Fraud](https://docs.atelio.com/embedded/docs/pricing-and-bundling#fraud)
- [Identification](https://docs.atelio.com/embedded/docs/pricing-and-bundling#identification)
- [Sanctions](https://docs.atelio.com/embedded/docs/pricing-and-bundling#sanctions)

#### Screening

| Scenario              | Standard customer verification | Standard customer verification (without Docs) | Description |
| --------------------- | --- | --- | --- |
| Global&nbsp;Blocklist | 🔜 | 🔜 | Flags known fraudulent customers, devices, government ID documents, and selfies across the Atelio network of clients. |
| Client Blocklist      | ✅ | ✅ | Blocks client identified IP address, SSN, email and phone numbers. |

#### Device and behavior

| Scenario | Standard customer verification | Standard customer verification (without Docs) | Description |
| --- | --- | --- | --- |
| Device | ✅ | ✅ | Looks for known device blacklisting, use of proxy or VPN to misrepresent customers location, or jail broken phones. Establishes a device fingerprint which can be used to baseline the customer for future verifications. |
| Behavioral | 🔜 | 🔜 | Looks for irregular patterns indicating the customer is actually a bot or AI impersonating a real human. Establishes a behavioral fingerprint which can be used to baseline the customer for future verifications. |

#### Ownership

| Scenario | Standard customer verification | Standard customer verification (without Docs) | Description |
| --- | --- | --- | --- |
| Phone OTP (Optional) | ✅ | ✅ | This sends an SMS to your customer. <br/> `{{Client Name}} verification code: {{code}}. Do not share with anyone. Secured by Atelio` <br/> Can be configured on or off by clients who may already run a phone OTP in their application. |

#### Fraud

| Scenario | Standard customer verification | Standard customer verification (without Docs) | Description |
| --- | --- | --- | --- |
| Email | ✅ | ✅ | Looks for signs the email is created from an untrusted domain or newly created for the purposes of committing fraud. |
| Phone | ✅ | ✅ | Searches carrier and other authoritative records to determine the phone number supplied matches the person being verified. Also checks for signs the phone number was recently moved to a new device (SIM Swap) or person (Port forwarding), which are high |
| Synthetic | 🔜 | 🔜 | Searches authoritative data sources to find patterns that indicate an identity has been created using a combination of real and fake information. |

#### Identification

| Scenario | Standard customer verification | Standard customer verification (without Docs) | Description |
| --- | --- | --- | --- |
| Verified Data Sources | ✅ | ✅ | Searches authoritative data sources such as credit bureau header data, among others in order to confirm a match between SSN, Name, Date of Birth and Address. Also looks to ensure the SSN is valid and was created with a date that is consistent to the customers date of birth. |
| Government&nbsp;ID&nbsp;capture | ✅ |  | Compare the Government ID provided and whether it matches the appropriate template for the ID type. This also includes verifying the bar code and ensuring there are no signs of forgery or tampering. |
| Selfie | ✅ |  | Checks for liveliness and the presence of deep fakes, and compares the captured selfie to the picture on the government identification document for a match. For existing customers where a selfie is already collected, the system can re-verify using that selfie (Coming soon). |
| Supporting Docs | 🔜 |  | Collection of additional supporting documentation to verify proof of address when there is a mismatch between the data provided and the verified data sources and government ID. |

#### Sanctions

| Scenario | Standard customer verification | Standard customer verification (without Docs) | Description |
| -------- | ------------------------------ | --------------------------------------------- | ----------- |
| Sanctions List | 🔜 | 🔜 | Searches over 300 international sanctions lists. |
| Politically&nbsp;Exposed&nbsp;Person | 🔜 | 🔜 |  |


## Vendor approach

Atelio leverages both FIS data along with best-in-class third-party providers to deliver our verifications. We A/B test each verification across key metrics — including automation rate, risk signal quality, and cost efficiency — and may swap providers to maximize performance. You don’t need to worry about managing vendors; we do that for you.

We are also continuously adding new capabilities to our platform. Upcoming additions may include support for mobile driver’s licenses (mDL), passkeys, and supporting documents OCR extraction. You will always have access to our latest capabilities within the relevant use cases.


## Billing & pricing

Our goal is to ensure you are only paying to verify customers who are interested in your product, not automated bots and known scammers. To do that we perform the initial Blocklist, OTP, and device checks and remove bad actors early without your institution incurring a cost. To make pricing simple you are only charged if a customer is able to complete the entire verification flow and we get to an automated decision of Review, Approved, or Declined. This ensures that you only pay for meaningful verification events, aligned to your business needs.


## Invoicing

FIS (parent company of Atelio) will send a PDF invoice at the end of the month for all charges incurred for the previous month.


## Flexibility and Transparency

Our bundled, use case-based approach is designed to:

- Simplify integration and deployment
- Offer predictable pricing and clear coverage
- Ensure you are equipped with the best fraud coverage for your business and use cases that evolves and improves over time as technology advances

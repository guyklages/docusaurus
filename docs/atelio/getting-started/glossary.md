# Glossary

## A

| Term  | Description |
| ----- | ----------- |
| **account** | (1) **Bank account** is a relationship involving a line of credit established in a particular name (such as a person, multiple people, or a business entity). The credit is usually by deposit, and monetary withdrawals may be made against it. Embedded finance uses two types of deposit accounts: FBO (For-Benefit-Of) accounts and sub-accounts. <br/>(2) **User account** is an item a client creates and signs into to access the FIS Developer Platform. Users can be assigned to an Administrator, Business Manager, or Developer role, with each role having its own set of permissions. <br/>(3) **Card account** is a type that gets created automatically when a developer creates a customer card using its API. The card account is a resource that stores broader account information, such as what bank accounts are connected to the card. |
| **ACH** | Automated Clearing House (ACH) is an electronic network that coordinates electronic payments and automated money transfers between financial institutions, rather than using paper checks, wire transfers, or card networks. <br/>ACH transfers are more common for smaller, domestic transactions, such as person-to-person payments, bill payments, or paycheck deposits. <br/>Unlike wire transfers, ACH transfers are typically free, but slower, because they are processed by the clearing house. |
| **ACH&nbsp;Operator** | The entity that processes transactions through the ACH network. Currently there are two operators in the U.S. - the Federal Reserve Bank and the Electronic Payments Network (EPN). |
| **acquirer** | See [acquiring bank](#a) |
| **acquiring&nbsp;bank** | Also known as an “acquirer.” A bank where a merchant holds an account. When a customer makes a purchase from the merchant, the acquiring bank communicates with the payment card network and the issuing bank (the customer’s bank), and authorizes or refuses the transaction based on their responses. <br/>If the transaction is approved, funds are transferred from the customer’s account at the issuing bank to the merchant’s account at the acquiring bank at the completion of the transaction. |
| **AML** | Anti-Money Laundering (AML) refers to the laws, regulations and procedures intended to prevent criminals from disguising illegally obtained funds as legitimate income. AML Examinations are conducted by Office of the Comptroller of the Currency (OCC). |
| **API** | Application Programing Interface (API) is a computing interface that defines interactions between software intermediaries, enabling them to interact with each other. An API defines the kinds of calls or requests a developer can make, how to make them, the data formats to use, conventions to follow, and so on. |
| **API Key** | A unique identifier used to authenticate API requests associated with a developer’s project. An API key is required for every API call, but different members of the same organization can share the same key. There are different API keys for test versus live environments |
| **APM** | Alternative Payment Method (APM) is also known as AMOP (Alternative Method of Payment).<br/>A payment method other than cash, check, or a debit or credit card offered through a traditional card network. <br/>Types of APM include prepaid cards, loyalty or rewards programs, digital wallets (PayPal, Google Pay, and Apple Pay), and all other electronic or online forms of payment such as bank transfers, electronic checks, bill payments, or cryptocurrency. |
| **authentication** | (1) During a transaction involving a payment card, a merchant must confirm the identity of, or authenticate, the individual presenting the card to make sure they are in fact the cardholder. The merchant may require the cardholder to provide a signature, PIN, or the CVV number of their card, as well as Multi-Factor Authentication (MFA) for additional security. <br/>(2) In a more general cybersecurity sense, the process of determining that a user is actually who they say they are to grant them access to a system. Typically users must provide a user name and password as a primary means of authentication, though they may have to provide Multi-Factor Authentication (MFA) for additional security. Developers use API keys to authenticate their requests. |
| **authorization** <a id="authorization"></a> | (1) During a transaction involving a payment card, the financial institution that issued the card must approve, or authorize, the payment request by performing security checks and confirming that the cardholder has sufficient funds to make the purchase. <br/>(2) In a more general cybersecurity sense, the process of controlling which parts of a system a given user is allowed to access. The FIS Developer Platform uses API keys to authorize developers to send information on behalf of their customers. FIS Developer Platform Administrators can also authorize other members within their organization to access the platform by creating accounts for them and applying a user role to their account. |

## B

| Term  | Description |
| ----- | ----------- |
| **BaaS** | Banking as a Service (BaaS) is a modular approach to supplying complete banking processes that allows non-financial institutions (brands) to easily embed financial services into their products without needing to build banking infrastructure or obtain a license. <br/>BaaS provides the technological foundation and services (such as program management) that enable distribution of embedded finance products. |
| **beneficiary** | An individual person or other legal entity who receives money or other benefits from a benefactor. |
| **BIN** | Bank Identification Number (BIN) is also known as an IIN (Issuer Identification Number). The initial six to 10 digits that appear on a payment card, identifying the bank or entity that issued the card, that issuer’s location, and the card type (such as credit, debit, or gift). |
| **BO** | A beneficial owner is a person or entity that has the power to control or own an interest in a legal entity, such as a company, trust, or foundation. This can be done directly, such as through shareholdings, or indirectly, such as through a bank or broker. |
| **BOND Portal** | The primary system of record for bank and brand partnerships, and provides the operating tools you need to build personal financial products seamlessly and simply. |
| **BOND Studio** | Banking-as-a-service APIs and SDKs giving the developers the tools to build financial innovations with just a few lines of code, and the bank partners to make it a reality. |
| **brand** | A non-bank or non-financial institution business; an entity that doesn’t have its own banking charter. A brand may be a fintech, an ISV (Independent Software Vendor), or a non-software company. Examples: DoorDash, Amazon, X. |
| **brokered&nbsp;deposit** | A bank deposit that a third-party broker makes on behalf of an individual or another company. |
| **BSA** | (1) Bank Secrecy Act (BSA) is U.S. legislation aimed toward preventing criminals from using financial institutions to hide or launder money. <br/>(2) One of the Bond platform services handling know-your-customer (KYC) and know-your-business (KYB), which are required by the Bank Secrecy Act. <br/>(3) A BSA officer, also known as a BSA compliance officer, works for a financial institution to ensure compliance with BSA regulations. BSA officers are responsible for detecting and preventing money laundering. |
| **Business&nbsp;Manager** | An FIS Developer Platform user assigned to a “Business Manager” role can manage their organization’s customers and review transactions and analytics. |

## C

| Term  | Description |
| ----- | ----------- |
| **capture** | In a financial transaction, the process of transferring funds from the customer’s account at the issuing bank to the merchant’s account at the acquiring bank in order to make a payment. When this transfer is complete, the payment is considered settled. |
| **card issuer** | A financial institution that supplies its customers with credit or debit cards that are connected to their accounts. |
| **card network** | Also known as a “card scheme.” A company that enables financial institutions to issue payment cards (such as debit or credit cards) to their account-holding customers (cardholders).<br/>Card networks set the rules for how these cards are used, such as interchange fee rates.<br/>Examples: Visa, Mastercard, American Express. |
| **CBDC** | Central Bank Digital Currency (CBDC) is a digital version of a country's currency that is issued by the country's central bank. CBDCs are similar to cryptocurrencies, but they are centralized, while cryptocurrencies are decentralized. CBDCs are legal tender and can be used to buy goods and services almost anywhere in the issuing country. |
| **CCA** | Credit Card Account |
| **chargeback** | When a cardholder disputes a payment with their card issuer. If the card issuer accepts the dispute, the cardholder is credited with the amount of their payment and the money is debited from the person or company they paid.<br/>Chargebacks can happen for a number of reasons, including fraud, duplicate billing, or non-shipment of goods. |
| **charter** | A license, usually granted by a governmental body, that legally permits a financial institution to offer banking services such as accepting and storing deposits and issuing loans. Chartered financial institutions have a fiduciary responsibility to comply with the law and protect banking information by performing due diligence and monitoring for fraud. |
| **CNP** | Cardholder Not Present (CNP) is a type of card payment where the customer who owns the card is not physically present, such as online or over the phone payments. |
| **Code Connect** | An API platform that provides a central access point for all FIS solutions. Code Connect also enables banks and fintech partners to publish and manage their own APIs, so that they can easily integrate, leverage, and deliver solutions to FIS clients.<br/>Learn more: [https://codeconnect.fisglobal.com/](https://codeconnect.fisglobal.com/) |
| **community&nbsp;bank** | A type of smaller financial institution that only conducts business in local areas. Community banks working with FIS use the HORIZON core banking system. |
| **consumer&nbsp;secured&nbsp;charge&nbsp;card** | A card product running on credit rails that pairs a special type of deposit account called a security deposit account (SDA) with a card. Customers fund the SDA, and the available balance in the account dictates the spending limit on the card. This card product has advantages over debit in higher interchange and the ability to furnish data to credit bureaus, and has advantages over unsecured credit in higher approval rates, lower credit risk due to the good-funds model, and lower capital requirements to operate. |
| **continuous accounting** | The practice of updating banking ledgers in real time, recording debits and credits to an account as transactions occur. Many businesses use continuous accounting software to update their ledgers automatically, enabling them to avoid the delays and errors associated with manually reconciling their accounts. |
| **core banking** | A system of technology that provides the minimum, basic functionality that a bank needs to operate, such as interacting with customers, creating and managing accounts, enabling monetary transactions, and issuing loans. All of this functionality is available in one place, in real time.<br/>FIS has several core banking products that target different banking tiers: IBS, Horizon, and MBP. |
| **CP** | Cardholder Present (CP) is a type of card payment where the customer who owns the card is physically present, such as a payment at a cash register in a shop. |
| **CBC** | Credit Building Card is a particular use case of a Consumer Secured Charge Card dedicated to helping customers build credit history. This construct is especially appealing to customers who do not have strong credit histories and/or who want to build a credit profile without taking on the risk of a loan or unsecured line of credit. |
| **custodian** | A bank that provides an account for a company to safeguard its assets. Bank ownership of the account mitigates risk for the company and provides the licensing required for money transmission. See also “FBO account.” |
| **customer** | See [End user](#e) |
| **CVV** | Card Verification Value (CVV) number is generated by debit card issuers (banks or other financial institutions) based on the following details: <br/>\- DEBIT CARD NUMBER <br/>\- SERVICE CODE <br/>This number is vital for completing online transactions and should never be shared with anyone. |

## D

| Term  | Description |
| ----- | ----------- |
| **deposit network** | A bank network that provides additional protection for account holders with balances above the $250,000 per-bank FDIC limit, by spreading out the account balances over multiple banks within the network. An example is the "Intrafi Deposit Network" used by FDIC banks. |
| **Durbin&nbsp;Amendment** | A U.S. federal law that caps the interchange fees that merchants must pay to a customer’s (cardholder’s) bank when accepting the customer’s debit card as part of a transaction. The law only applies to financial institutions that have over $10 billion in assets. As a consequence, these larger financial institutions may be less likely to participate in embedded finance programs because their revenue will be capped compared to regional or middle-tier financial institutions or community banks. |

## E

| Term  | Description |
| ----- | ----------- |
| **embedded&nbsp;finance** | The ability for non-financial institutions (brands) to offer customers integrated financial products distributed through non-bank software. BaaS provides the technological foundation and services (such as program management) that enable distribution of embedded finance products. Embedded finance still needs to leverage the charter of a financial institution. |
| **end user** | Also known as a "customer.” Any consumer or business that is an indirect user of our products, usually through one of our clients (a direct user of our products, such as a bank, fintech, or ISV). For example, if a bank uses an FIS banking app, the bank is an FIS client and an individual with an account at that bank who uses the app for transactions would be a customer. |
| **endpoint** | The part of an API's URL that describes or names the domain of objects or functions that can be manipulated or invoked by calling specific actions. |
| **EPN** | Electronic Payments Network (EPN) is one of two Automated Clearing House (ACH) Operators in US. |

## F

| Term  | Description |
| ----- | ----------- |
| **FBO&nbsp;account** | For-Benefit-Of account is a type of custodial bank account that allows a brand to manage funds on behalf of, or “for the benefit of,” its customers without assuming legal ownership of that account. It is an umbrella/parent account that holds aggregate deposit balances and transaction information for multiple child accounts on a separate ledger. In an embedded finance model, a brand opens an FBO account at a sponsor bank, and the account contains sub-accounts for individuals or businesses. The opposite of an FBO is an on-core account. |
| **FDIC** | Federal Deposit Insurance Corporation (FDIC) is one of two agencies that provide deposit insurance to depositors in U.S. depository institutions. |
| **fintech** | Financial technology has multiple meanings:<br/>(1) The technology that enables businesses and their customers to perform financial transactions, such as transferring money.<br/>(2) The companies that provide this financial technology to businesses and customers. Examples: NerdWallet, Carta, Affirm. See also “brand.” |

## H

| Term  | Description |
| ----- | ----------- |
| **headless&nbsp;core&nbsp;banking** | A set of APIs that provide banking capabilities without a user interface (“head”). The clients that consume these APIs build their own UI using the APIs. In contrast, regular core banking products such as IBS, HORIZON, and MBP have both APIs and user interfaces. |

## I

| Term  | Description |
| ----- | ----------- |
| **IBS** | Integrated Banking Solution is an FIS core banking product that offers a comprehensive banking solution for financial institutions within a single platform.<br/>Learn more: [https://www.fisglobal.com/en/products/fis-ibs](https://www.fisglobal.com/en/products/fis-ibs) |
| **idempotent** | Also known as "idempotence" and “idempotency” means that if you make the same API call to a server multiple times, the result is always the same (additional identical calls have no effect). This helps ensure the integrity of data on the server, preventing duplicate transactions and errors. |
| **IIN** | Issuer Identification Number. See [BIN](#b) |
| **inquiry** | A single instance of an identity verification check. |
| **interchange&nbsp;fees** | Fees that merchants must pay when accepting customers’ credit and debit cards for transactions. Credit card companies determine the interchange fee rates for their cards, and merchants pay the fee to the bank that issued the customer’s card. |
| **ISO** | Independent Sales Organization, also known as an “MSP," is a company that resells the payment services of other parties, such as merchant accounts and payment processing, to merchants.<br/>Unlike payment facilitators, which manage the full online payments experience for merchants (including underwriting and compliance), ISOs tend to be more strictly focused on the sales aspect. ISOs may work with multiple payment processors, whereas a payment facilitator typically only works with one. |
| **issuing bank** | Also known as an “issuer” is a bank where a customer holds an account. When the customer makes a purchase from a merchant, funds are transferred from the customer’s account at the issuing bank to the merchant’s account at the acquiring bank. |

## K

| Term  | Description |
| ----- | ----------- |
| **KYB** | Know-Your-Business (KYB) is the compliance financial institutions put into their policies and procedures to verify the identity of the company they plan to have a business relationship with. |
| **KYC** | Know-Your-Customer (KYC) is the compliance financial institutions put into their policies and procedures to verify their customer's identity. |

## L

| Term  | Description |
| ----- | ----------- |
| **LFI** | Large Financial Institution (LFI) is the largest type of bank, based on the size of its assets (examples: Chase, Citi).<br/>LFIs typically have their own engineering workforce and build their own BaaS capabilities in-house. They may work with FIS for ledgering and program management.<br/>LFIs working with FIS use the MBP core banking system. |

## M 

| Term  | Description |
| ----- | ----------- |
| **MBP** | Modern Banking Platform<br/>Learn more: [https://www.fisglobal.com/banking/fis-modern-banking-platform](https://www.fisglobal.com/banking/fis-modern-banking-platform) |
| **merchant** | A brand that has an account under a custodial [FBO](#f) account at a sponsor bank to manage its customer funds. The FBO account is maintained by a payment facilitator. |
| **MSFI** | Merchant Service Financial Institution (MSFI) is a financial institution that sells products or services, such as merchant accounts, to its business clients. The financial institution may refer a merchant to Worldpay, which then sells to and services the merchant, or they may sell directly to the merchant, with Worldpay providing the backend processing services. |
| **MSP** | Member Service Provider, also known as an “ISO," is a company that resells the payment services of other parties, such as merchant accounts and payment processing, to merchants.<br/>Unlike payment facilitators, which manage the full online payments experience for merchants (including underwriting and compliance), ISOs tend to be more strictly focused on the sales aspect. MSPs may work with multiple payment processors, whereas a payment facilitator typically only works with one. |

## N

| Term  | Description |
| ----- | ----------- |
| **NACHA** | National Automated Clearing House Association (NACHA) manages the development, administration, and governance of the ACH Network. |
| **NAICS** | The North American Industry Classification System (NAICS) is a classification of business establishments by type of economic activity which is 6 digits in length. |
| **neobank** | Also known as an “online bank,” “Internet-only bank,” “virtual bank,” or “digital bank.” A type of direct bank that operates exclusively online, without traditional physical branch networks. |
| **NOC** | Notification of Change (NOC) is used to notify the sender of an ACH payment to correct or change information related to a customer's bank account. |
| **NPS** | Net Promoter Score (NPS) is a customer experience metric that uses a survey to evaluate how likely customers are to recommend a product or service to others.<br/>Learn more: [https://www.hotjar.com/net-promoter-score/](https://www.hotjar.com/net-promoter-score/) |

## O

| Term  | Description |
| ----- | ----------- |
| **OCC** | Office of Comptroller of the Currency (OCC) is the official US Government agency to ensure a safe and sound federal banking system for all Americans. |
| **ODFI** | Originating Depository Financial Institution (ODFI) is the banking institution that acts on your behalf to initiate an ACH transfer. |
| **OFAC** | Office of Foreign Asset Control (OFAC) is an office of the U.S. Department of the Treasury. OFAC administers and enforces economic and trade sanctions based on U.S. foreign policy and national security goals. It also provides guidance for businesses to be able to comply with the regulations. FIS is committed to complying with the letter and spirit of all sanctions and programs administered by OFAC. |
| **on-core account** | A bank account that is opened directly on a bank’s core, or backend system. These accounts offer banks greater visibility into account activity for regulatory/compliance needs. However, they do not provide the same flexibility as an [FBO](#f) account, as they are limited to core banking functionality and can be expensive to operate and maintain. |
| **open banking** | A banking practice that provides third-party financial service providers with open but secure access to customer banking, transaction, and other financial data from financial and non-financial institutions through the use of APIs (Application Programming Interfaces). The financial institution data is shared only with customers’ consent. |
| **orchestration**&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; | The configuration of multiple tasks into one complete, end-to-end process or job. Orchestration is an essential function in embedded finance, providing access to data and capabilities through available APIs, widgets, and low/no code components on a single platform. Developers use the platform to access embedded finance products, capabilities, data, or services that they can connect into a workflow that meets the needs of their brand’s end users. |
| **originator** | An institution or individual who works with a borrower to complete a loan transaction. |

## P  

| Term  | Description |
| ----- | ----------- |
| **PAN** | Primary Account Number (PAN) is the unique card identification number on a debit, credit, or other payment card. It is not the same as a bank account number. |
| **payfac** | Payment Facilitator (payfac) is a company that provides software, hardware, and services that enable merchants to accept online payments without having to deal directly with sponsor banks and payment processors. A payfac maintains an FBO account at a sponsor bank, with sub-accounts for its merchant customers. It manages the full online payments experience for merchants, taking on all the responsibilities and risks of becoming a payment processor, including underwriting, compliance, and investment in new technology. Examples: Toast, Square, and Stripe. |
| **payment gateway** | When a customer presents a payment card for a purchase, a payment gateway collects, verifies, and authorizes the card information and sends it to a payment processor, which then works with the customer’s and merchant’s banks to complete the transaction. Usually the payment gateway is a portal that processes online transactions, but it may also include physical [POS](#p) terminals that read payment cards. |
| **payment&nbsp;processor** | A company that coordinates and provides the technology for online financial transactions between merchants, their customers, and their respective bank accounts. This includes authentication, security, validations, the actual transfer of funds, and sometimes [POS](#p) hardware. A payment processor that has a relationship with a sponsor bank may also act as a payment facilitator. |
| **Payrix** | A full-service payments product that specializes in serving SaaS companies, especially SMBs, who want to embed payments into their platform. FIS acquired Payrix in 2022. |
| **PCI DSS** | Payment Card Industry Data Security Standard (PCI DSS) is the technical and operational standard with which credit card companies must comply to secure and protect cardholder data transmitted through credit and debit card transactions. |
| **POP** | Payment Orchestration Platform (POP) is a single platform where all steps of payment transaction processing can occur, providing a more convenient experience for merchants. |
| **POS** | Point of Sale (POS) is a machine that merchants use to process customer credit or debit card transactions. There is also POS software that operates independent of proprietary hardware terminals. |
| **PSP** | Payment Service Provider (PSP) is an offering that lets customers accept payments online through a secure payment gateway, passing the payment information to the acquiring bank to start the transfer of funds from a customer to a merchant. |

## R 

| Term  | Description |
| ----- | ----------- |
| **RDFI** | Receiving Depository Financial Institution (RDFI) is the banking institution that acts on behalf of the recipient of the transfer in context of an ACH transaction. |
| **receiver** | The person or institution who receives money from another person or institution. |
| **RTP** | Real-Time Payments (RTP) is an electronic payment network that coordinates money transfers between financial institutions in the US. Unlike [ACH](#a) , it operates in real time, at any time. However, it is a newer technology, and fewer banks support it at this time compared to ACH or wire transfers. |

## S 

| Term  | Description |
| ----- | ----------- |
| **SDA** | Security Deposit Account (also known as Secure Deposit Account) is a credit card account that's backed by a cash deposit. The deposit serves as collateral for the credit card company. |
| **sender** | The person or institution who sends money to another person or institution. |
| **settlement** | The last step of a financial transaction, after an issuing bank has authorized payment from a customer’s account to a merchant’s account at the acquiring bank. A payment is settled when the money has been deducted from the customer’s account and transferred to the merchant’s account. |
| **sponsor&nbsp;bank** | A licensed financial institution that handles fund transfers and may provide additional banking services for a brand’s customers within a BaaS model, which lets the brand avoid having to obtain a license/charter themselves. The sponsor bank has the fiduciary responsibility to protect banking information by performing due diligence and monitoring for fraud. Bond currently works with two sponsor banks: Evolve Bank and Trust, and CBW Bank. |
| **subaccount** | Also known as a “virtual account.” In an embedded finance model, subaccounts are children of a custodial [FBO](#f) account that a brand uses to manage its customer funds at a sponsor bank. Subaccounts benefit from FDIC insurance and regulatory oversight provided by the sponsor bank where the account is held. |
| **submerchant** | A merchant (brand) that has a subaccount under a custodial [FBO](#f) account at a sponsor bank to manage its customer funds. The FBO account is maintained by a payment facilitator. |

## T

| Term  | Description |
| ----- | ----------- |
| **tokenization** | The replacement of sensitive cardholder data with a unique identifier (a token), used to process a transaction. This creates greater security and reduces a merchant's PCI DSS obligations surrounding the storage of customer data, because the merchant only stores tokens, not actual card data. |
| **transaction** | A record of any money that moves in or out of a bank account. Types of transactions include cash withdrawals (debits) or deposits (credits), debit card payments, loan payments, online payments, and wire transfers. |

## V 

| Term  | Description |
| ----- | ----------- |
| **virtual&nbsp;ledger** | Also known as a “digital ledger.” An API-enabled, cost-effective, flexible ledger that is loosely linked to traditional core banking systems. Virtual ledgers are updated in real time, enabling better experiences for transaction posting, calculating balances, and reconciliation. They also allow software providers to easily offer banking products from multiple banks that may use differing bank cores. Some example apps where virtual ledgers power experiences are Dave, Stash, and Acorns. |

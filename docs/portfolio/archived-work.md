# Archive of all work samples

<!-- This page is reference tables (API endpoints, SQL keywords), not prose —
     repeated terms are expected, so word-repetition checks don't apply. -->
<!-- vale Vale.Repetition = NO -->
<!-- vale write-good.Illusions = NO -->

## Nium API reference

Nium has added more API endpoints and supported languages after I left. The following are the API endpoints I documented with code samples in:

- C
- cURL
- HTTP
- Java
- JavaScript
- Python

|              |               |                              |               |
|---------------------------|---------------------------------------|---------------------------------------|--------------------------|
| **<div align="center">CUSTOMERS</div>** <br/> _Customer onboarding_ <br/> [List customers][COL] <br/> [Create customers][COC] <br/> [Get customer][COG] <br/> [Update customer][COU] <br/> [Submit KYC for entity][COS] <br/> [Fetch public corp details][COP] <br/> [Fetch exhaustive corp details][COE] <br/><br/> _Customer account - individual_ <br/> [Unified add customer][CIA] <br/> [Customer update][CIU] <br/> [Fetch indv cust RFI details][CIF] <br/> [Respond to RFI][CIR] <br/> [Upload document][CID] <br/> [Add customer - MyInfo][CIM] <br/> [Add customer - eDoc verify][CIE] <br/><br/> _Customer account - corporate_ <br/> [Fetch corp details by Biz ID][CCE] <br/> [Onboard corporate customer][CCO] <br/> [Fetch corp cust RFI details][CCF] <br/> [Respond to RFI for corp cust][CCR] <br/> [Upload doc for corp customer][CCD] <br/> [Regenerate KYC URL][CCK] <br/> [Fetch corp constants][CCC] <br/> [Update corp customer][CCU] <br/> [Fetch public corp cust details][CCP] <br/><br/> _Customer management_ <br/> [Customer list][CML] <br/> [Customer details][CMD] <br/> [Block/Unblock customer][CMB] <br/> [Acct statement][CMS] <br/> [Acct statement of a wallet][CMW] <br/> [Manage customer tags][CMT] <br/><br/>  |   **<div align="center">LINKED BANK ACCOUNTS</div>** <br/> [Fetch all accounts][AFA] <br/> [Fetch an account][AF1] <br/> [Create an account][ACA] <br/> [Confirm acct authentication][AAU] <br/> [Delete account][ADA] <br/> [Update account][AUA] <br/><br/> **<div align="center">PAYINS</div>** <br/> _Customer funding_ <br/> [Confirm funding instrument][PFC] <br/> [Get funding instr. details][PFF] <br/> [Get funding instr. list][PFL] <br/> [Delete funding instr.][PFD] <br/> [Add funding instr.][PFA] <br/> [Fund wallet][PFW] <br/> [Approve or reject funds][PFR] <br/><br/> _Customer virtual accounts_ <br/> [Assign payment ID][PVA] <br/> [Manage virtual acct tags][PVT] <br/> [Virtual account details][PVD] <br/> [Acct ownership certificate][PVO] <br/> [Verification of consent][PVV] <br/><br/> **<div align="center">PAYOUTS</div>** <br/> [Account verification][OAV] <br/> [Beneficiary list][OBL] <br/> [Add beneficiary][OAB] <br/> [Beneficiary details][OBD] <br/> [Update beneficiary][OUB] <br/> [Bene validation schema][OBV] <br/> [Delete beneficiary][ODB] <br/><br/><br/><br/>   |   **<div align="center">CARDS</div>** <br/> _Simulators_ <br/> [Simulate authorize card][CSA] <br/> [Simulate settlemet][CSS] <br/><br/> _Lifecycle_ <br/> [Add card][CLA] <br/> [Activate card][CLC] <br/> [Card details][CLD] <br/> [Update card details][CLU] <br/> [Card list][CLL] <br/> [Get card details widget][CLW] <br/> [Block and replace card][CLB] <br/> [Convert to physical card][CLP] <br/> [Lock/Unlock card][CLO] <br/> [Renew card][CLR] <br/> [Assign card][CLS] <br/><br/> _Security_ <br/> [Fetch card data encrypted][CEE] <br/> [Fetch PIN status][CES] <br/> [Unblock PIN][CEU] <br/> [Fetch ATM PIN][CEP] <br/> [Set/Reset PIN][CER] <br/> [Show sec details encryp][CED] <br/><br/> **<div align="center">CLIENTS</div>** <br/> _Prefund account_ <br/> [Client prefund request][CPR] <br/> [Fetch prefund request][CPF] <br/> [Client prefund balances][CPB] <br/><br/> _Client settings_ <br/> [Client details][CTD] <br/> [Fee details][CTF] <br/> [Get max and avail limits][CTL] <br/> [Client transactions][CTT]   |   **<div align="center">WALLETS</div>** <br/> _Wallet balance_ <br/> [Get wallet balance][WBG] <br/> [Update wallet][WBU] <br/> [Fetch wallet][WBF] <br/> [Add wallet][WBA] <br/><br/> _Wallet transfers_ <br/> [Wallet-to-wallet xfer][WTW] <br/> [Transactions][WTT] <br/> [Update biz trans flag][WTF] <br/> [Trans geo-tagging][WTG] <br/> [Download trans receipt][WTD] <br/> [Upload trans receipt][WTU] <br/> [Manage trans tags][WTM] <br/><br/> **<div align="center">REPORTS</div>** <br/> [Initiate report][RIR] <br/> [Download report][RDR] <br/><br/> **<div align="center">TESTING</div>** <br/> [Sim payout trans][TOT] <br/> [Sim payin recv][TIR] <br/> [Sim payin funding][TIF] <br/><br/> **<div align="center">CUSTOMERS</div>** <br/> _User management_ <br/> [List users][CUL] <br/> [Create user][CUC] <br/> [Get user][CUG] <br/> [Submit user KYC][CUK] <br/><br/><br/><br/><br/> |

[AAU]: https://docs.nium.com/api#tag/accounts/POST/api/v1/client/{clientHashId}/customer/{customerHashId}/bankAccounts/{bankAccountId}/confirm
[ACA]: https://docs.nium.com/api#tag/accounts/POST/api/v1/client/{clientHashId}/customer/{customerHashId}/bankAccounts
[ADA]: https://docs.nium.com/api#tag/accounts/DELETE/api/v1/client/{clientHashId}/customer/{customerHashId}/bankAccounts/{bankAccountId}
[AF1]: https://docs.nium.com/api#tag/accounts/GET/api/v1/client/{clientHashId}/customer/{customerHashId}/bankAccounts/{bankAccountId}
[AFA]: https://docs.nium.com/api#tag/accounts/GET/api/v1/client/{clientHashId}/customer/{customerHashId}/bankAccounts
[AUA]: https://docs.nium.com/api#tag/accounts/PUT/api/v1/client/{clientHashId}/customer/{customerHashId}/bankAccounts/{bankAccountId}

[CCC]: https://docs.nium.com/api#tag/customer-account-corporate/GET/api/v2/client/{clientHashId}/onboarding/constants
[CCD]: https://docs.nium.com/api#tag/customer-account-corporate/POST/api/v1/client/{clientHashId}/customer/{customerHashId}/corporate/documents
[CCE]: https://docs.nium.com/api#tag/customer-account-corporate/GET/api/v2/client/{clientHashId}/corporate/lookup
[CCF]: https://docs.nium.com/api#tag/customer-account-corporate/GET/api/v1/client/{clientHashId}/corporate/rfi
[CCK]: https://docs.nium.com/api#tag/customer-account-corporate/POST/api/v1/client/{clientHashId}/customer/{customerHashId}/regenerateKYCURL
[CCO]: https://docs.nium.com/api#tag/customer-account-corporate/POST/api/v1/client/{clientHashId}/corporate
[CCP]: https://docs.nium.com/api#tag/customer-account-corporate/GET/api/v1/client/{clientHashId}/corporate/lookup
[CCR]: https://docs.nium.com/api#tag/customer-account-corporate/POST/api/v1/client/{clientHashId}/corporate/rfi
[CCU]: https://docs.nium.com/api#tag/customer-account-corporate/POST/api/v1/client/{clientHashId}/customer/{customerHashId}/corporate

[CED]: https://docs.nium.com/api#tag/security/GET/api/v1/client/{clientHashId}/customer/{customerHashId}/wallet/{walletHashId}/card/{cardHashId}/showSecurityDetails
[CEE]: https://docs.nium.com/api#tag/security/GET/api/v2/client/{clientHashId}/customer/{customerHashId}/wallet/{walletHashId}/card/{cardHashId}/retrieve
[CEP]: https://docs.nium.com/api#tag/security/GET/api/v2/client/{clientHashId}/customer/{customerHashId}/wallet/{walletHashId}/card/{cardHashId}/pin
[CER]: https://docs.nium.com/api#tag/security/POST/api/v2/client/{clientHashId}/customer/{customerHashId}/wallet/{walletHashId}/card/{cardHashId}/pin
[CES]: https://docs.nium.com/api#tag/security/GET/api/v1/client/{clientHashId}/customer/{customerHashId}/wallet/{walletHashId}/card/{cardHashId}/pin/status
[CEU]: https://docs.nium.com/api#tag/security/POST/api/v1/client/{clientHashId}/customer/{customerHashId}/wallet/{walletHashId}/card/{cardHashId}/pin/unblock

[CIA]: https://docs.nium.com/api#tag/customer-account-individual/POST/api/v4/client/{clientHashId}/customer
[CID]: https://docs.nium.com/api#tag/customer-account-individual/POST/api/v1/client/{clientHashId}/customer/{customerHashId}/uploadDocuments
[CIE]: https://docs.nium.com/api#tag/customer-account-individual/POST/api/v3/client/{clientHashId}/customer
[CIF]: https://docs.nium.com/api#tag/customer-account-individual/GET/api/v1/client/{clientHashId}/customer/{customerHashId}/rfi
[CIM]: https://docs.nium.com/api#tag/customer-account-individual/POST/api/v1/client/{clientHashId}/customer-min-data
[CIR]: https://docs.nium.com/api#tag/customer-account-individual/POST/api/v1/client/{clientHashId}/customer/{customerHashId}/rfi
[CIU]: https://docs.nium.com/api#tag/customer-account-individual/POST/api/v1/client/{clientHashId}/customer/{customerHashId}/updateCustomer

[CLA]: https://docs.nium.com/api#tag/lifecycle/POST/api/v2/client/{clientHashId}/customer/{customerHashId}/wallet/{walletHashId}/card
[CLB]: https://docs.nium.com/api#tag/lifecycle/POST/api/v2/client/{clientHashId}/customer/{customerHashId}/wallet/{walletHashId}/card/{cardHashId}/blockAndReplace
[CLC]: https://docs.nium.com/api#tag/lifecycle/POST/api/v2/client/{clientHashId}/customer/{customerHashId}/wallet/{walletHashId}/card/{cardHashId}/activate
[CLD]: https://docs.nium.com/api#tag/lifecycle/GET/api/v2/client/{clientHashId}/customer/{customerHashId}/wallet/{walletHashId}/card/{cardHashId}
[CLL]: https://docs.nium.com/api#tag/lifecycle/GET/api/v2/client/{clientHashId}/customer/{customerHashId}/wallet/{walletHashId}/cards
[CLO]: https://docs.nium.com/api#tag/lifecycle/PUT/api/v2/client/{clientHashId}/customer/{customerHashId}/wallet/{walletHashId}/card/{cardHashId}/lockAction
[CLP]: https://docs.nium.com/api#tag/lifecycle/POST/api/v1/client/{clientHashId}/customer/{customerHashId}/wallet/{walletHashId}/card/{cardHashId}/convert
[CLR]: https://docs.nium.com/api#tag/lifecycle/POST/api/v1/client/{clientHashId}/customer/{customerHashId}/wallet/{walletHashId}/card/{cardHashId}/renewCard
[CLS]: https://docs.nium.com/api#tag/lifecycle/POST/api/v1/client/{clientHashId}/customer/{customerHashId}/wallet/{walletHashId}/assignCard
[CLU]: https://docs.nium.com/api#tag/lifecycle/POST/api/v2/client/{clientHashId}/customer/{customerHashId}/wallet/{walletHashId}/card/{cardHashId}
[CLW]: https://docs.nium.com/api#tag/lifecycle/POST/api/v1/client/{clientHashId}/customer/{customerHashId}/wallet/{walletHashId}/card/{cardHashId}/widget/showCardDetails

[CMB]: https://docs.nium.com/api#tag/customer-management/PUT/api/v1/client/{clientHashId}/customer/{customerHashId}/block
[CMD]: https://docs.nium.com/api#tag/customer-management/GET/api/v2/client/{clientHashId}/customer/{customerHashId}
[CML]: https://docs.nium.com/api#tag/customer-management/GET/api/v3/client/{clientHashId}/customers
[CMS]: https://docs.nium.com/api#tag/customer-management/GET/api/v1/client/{clientHashId}/customer/{customerHashId}/accounts/statement
[CMT]: https://docs.nium.com/api#tag/customer-management/POST/api/v1/client/{clientHashId}/customer/{customerHashId}/tags
[CMW]: https://docs.nium.com/api#tag/customer-management/GET/api/v1/client/{clientHashId}/customer/{customerHashId}/wallet/{walletHashId}/statement

[COC]: https://docs.nium.com/api#tag/customer-onboarding-v5/POST/api/v5/client/{clientHashId}/customers
[COE]: https://docs.nium.com/api#tag/customer-onboarding-v5/GET/api/v5/client/{clientHashId}/corporate/exhaustiveDetailsSearch
[COG]: https://docs.nium.com/api#tag/customer-onboarding-v5/GET/api/v5/client/{clientHashId}/customer/{customerHashId}
[COL]: https://docs.nium.com/api#tag/customer-onboarding-v5/GET/api/v5/client/{clientHashId}/customers
[COP]: https://docs.nium.com/api#tag/customer-onboarding-v5/GET/api/v5/client/{clientHashId}/corporate/publicDetails
[COS]: https://docs.nium.com/api#tag/customer-onboarding-v5/POST/api/v5/client/{clientHashId}/customer/{customerHashId}/submitKyc
[COU]: https://docs.nium.com/api#tag/customer-onboarding-v5/PUT/api/v5/client/{clientHashId}/customer/{customerHashId}

[CPB]: https://docs.nium.com/api#tag/client-prefund-account/GET/api/v1/client/{clientHashId}/balances
[CPF]: https://docs.nium.com/api#tag/client-prefund-account/GET/api/v1/client/{clientHashId}/prefundList
[CPR]: https://docs.nium.com/api#tag/client-prefund-account/POST/api/v1/client/{clientHashId}/prefund

[CSA]: https://docs.nium.com/api#tag/simulators/POST/api/v1/txn
[CSS]: https://docs.nium.com/api#tag/simulators/POST/api/v1/settlement/run

[CTD]: https://docs.nium.com/api#tag/client-settings/GET/api/v1/client/{clientHashId}
[CTF]: https://docs.nium.com/api#tag/client-settings/GET/api/v3/client/{clientHashId}/fees
[CTL]: https://docs.nium.com/api#tag/client-settings/GET/api/v1/client/{clientHashId}/payin/limits
[CTT]: https://docs.nium.com/api#tag/client-transactions/GET/api/v1/client/{clientHashId}/transactions

[CUC]: https://docs.nium.com/api#tag/user-management/POST/api/v1/client/{clientHashId}/users
[CUG]: https://docs.nium.com/api#tag/user-management/GET/api/v1/client/{clientHashId}/user/{userHashId}
[CUK]: https://docs.nium.com/api#tag/user-management/POST/api/v1/client/{clientHashId}/userKyc
[CUL]: https://docs.nium.com/api#tag/user-management/GET/api/v1/client/{clientHashId}/users

[OAB]: https://docs.nium.com/api#tag/beneficiary/POST/api/v2/client/{clientHashId}/customer/{customerHashId}/beneficiaries
[OAV]: https://docs.nium.com/api#tag/beneficiary/POST/api/v1/client/{clientHashId}/customer/{customerHashId}/accountVerification
[OBD]: https://docs.nium.com/api#tag/beneficiary/GET/api/v2/client/{clientHashId}/customer/{customerHashId}/beneficiaries/{beneficiaryHashId}
[OBL]: https://docs.nium.com/api#tag/beneficiary/GET/api/v2/client/{clientHashId}/customer/{customerHashId}/beneficiaries
[OBV]: https://docs.nium.com/api#tag/beneficiary/GET/api/v2/client/{clientHashId}/customer/{customerHashId}/currency/{currencyCode}/validationSchemas
[ODB]: https://docs.nium.com/api#tag/beneficiary/DELETE/api/v1/client/{clientHashId}/customer/{customerHashId}/beneficiaries/{beneficiaryHashId}
[OUB]: https://docs.nium.com/api#tag/beneficiary/PUT/api/v2/client/{clientHashId}/customer/{customerHashId}/beneficiaries/{beneficiaryHashId}

[PFA]: https://docs.nium.com/api#tag/customer-funding/POST/api/v2/client/{clientHashId}/customer/{customerHashId}/wallet/{walletHashId}/fundingInstruments
[PFC]: https://docs.nium.com/api#tag/customer-funding/POST/api/v1/client/{clientHashId}/customer/{customerHashId}/fundingInstruments/{fundingInstrumentId}/confirmFundingInstrument
[PFD]: https://docs.nium.com/api#tag/customer-funding/DELETE/api/v1/client/{clientHashId}/customer/{customerHashId}/fundingInstruments/{fundingInstrumentId}
[PFF]: https://docs.nium.com/api#tag/customer-funding/GET/api/v1/client/{clientHashId}/customer/{customerHashId}/fundingInstruments/{fundingInstrumentId}/fundingInstrumentDetails
[PFL]: https://docs.nium.com/api#tag/customer-funding/GET/api/v1/client/{clientHashId}/customer/{customerHashId}/fundingInstruments
[PFR]: https://docs.nium.com/api#tag/customer-funding/PATCH/api/v2/client/{clientHashId}/customer/{customerHashId}/wallet/{walletHashId}/fund/{systemReferenceNumber}
[PFW]: https://docs.nium.com/api#tag/customer-funding/POST/api/v2/client/{clientHashId}/customer/{customerHashId}/wallet/{walletHashId}/fund

[PVA]: https://docs.nium.com/api#tag/customer-virtual-accounts/POST/api/v2/client/{clientHashId}/customer/{customerHashId}/wallet/{walletHashId}/paymentId
[PVD]: https://docs.nium.com/api#tag/customer-virtual-accounts/GET/api/v2/client/{clientHashId}/customer/{customerHashId}/wallet/{walletHashId}/paymentIds
[PVO]: https://docs.nium.com/api#tag/customer-virtual-accounts/GET/api/v1/client/{clientHashId}/customer/{customerHashId}/accountOwnershipCertificate
[PVT]: https://docs.nium.com/api#tag/customer-virtual-accounts/POST/api/v1/client/{clientHashId}/customer/{customerHashId}/wallet/{walletHashId}/paymentId/tags
[PVV]: https://docs.nium.com/api#tag/customer-virtual-accounts/PUT/api/v1/client/{clientHashId}/customer/{customerHashId}/wallet/{walletHashId}/paymentId/consent

[RDR]: https://docs.nium.com/api#tag/reports/GET/api/v1/client/{clientHashId}/report/{reportRequestId}/download
[RIR]: https://docs.nium.com/api#tag/reports/POST/api/v1/client/{clientHashId}/report

[TIF]: https://docs.nium.com/api#tag/payin/POST/api/v1/simulations/client/{clientHashId}/customer/{customerHashId}/fundingInstruments/{fundingInstrumentId}/updateStatus
[TIR]: https://docs.nium.com/api#tag/payin/POST/api/v1/inward/payment/manual
[TOT]: https://docs.nium.com/api#tag/payouts/POST/api/v1/simulations/transactions/{systemReferenceNumber}/transition

[WBA]: https://docs.nium.com/api#tag/customer-wallet-balance/POST/api/v1/client/{clientHashId}/customer/{customerHashId}/wallet
[WBF]: https://docs.nium.com/api#tag/customer-wallet-balance/GET/api/v1/client/{clientHashId}/customer/{customerHashId}/wallet
[WBG]: https://docs.nium.com/api#tag/customer-wallet-balance/GET/api/v1/client/{clientHashId}/customer/{customerHashId}/wallet/{walletHashId}
[WBU]: https://docs.nium.com/api#tag/customer-wallet-balance/PUT/api/v1/client/{clientHashId}/customer/{customerHashId}/wallet/{walletHashId}

[WTD]: https://docs.nium.com/api#tag/customer-wallet-transactions/GET/api/v1/client/{clientHashId}/customer/{customerHashId}/wallet/{walletHashId}/transactions/{transactionId}/receipt
[WTF]: https://docs.nium.com/api#tag/customer-wallet-transactions/PUT/api/v1/client/{clientHashId}/customer/{customerHashId}/wallet/{walletHashId}/transactions/{transactionId}/business
[WTG]: https://docs.nium.com/api#tag/customer-wallet-transactions/PUT/api/v1/client/{clientHashId}/customer/{customerHashId}/wallet/{walletHashId}/transactions/{transactionId}/location
[WTM]: https://docs.nium.com/api#tag/customer-wallet-transactions/POST/api/v1/client/{clientHashId}/customer/{customerHashId}/wallet/{walletHashId}/transactions/{transactionId}/tags
[WTT]: https://docs.nium.com/api#tag/customer-wallet-transactions/GET/api/v1/client/{clientHashId}/customer/{customerHashId}/wallet/{walletHashId}/transactions
[WTU]: https://docs.nium.com/api#tag/customer-wallet-transactions/POST/api/v1/client/{clientHashId}/customer/{customerHashId}/wallet/{walletHashId}/transactions/{transactionId}/receipt
[WTW]: https://docs.nium.com/api#tag/wallet-to-wallet-transfers/POST/api/v1/client/{clientHashId}/customer/{customerHashId}/wallet/{walletHashId}/transfers

## SQL indexes and queries

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


## Various types of PDF guides

To make the following guides, I used Microsoft Word or Adobe FrameMaker to create PDFs for customers and developers. Links open into a new browser tab.

| Company    | Industry            | Guide | Collaborated with |
|------------|---------------------|-------|-------------------|
| Couchbase  | NoSQL database      | <a href="/files/Couchbase_Differences-between-server-versions.pdf" target="_blank" rel="noopener noreferrer">Differences between server versions</a> | 1 editor, 3 SMEs |
| NICE       | Enterprise software | <a href="/files/NICE_Performance-Management_architecture-and-system-overview-2014.pdf" target="_blank" rel="noopener noreferrer">Performance Management architecture and system overview</a> <br/> <a href="/files/NICE_Writers-style-guide-2014.pdf" target="_blank" rel="noopener noreferrer">Writers style guide</a> | 1 editor, 3 SMEs |
| <a id="vmware"></a> VMware     | Virtualization software | <a href="/files/VMware_App-Volumes-user-guide-2016.pdf" target="_blank" rel="noopener noreferrer">App Volumes User Guide</a> <br/> <a href="/files/VMware_UEM_admin-guide-2016.pdf" target="_blank" rel="noopener noreferrer">UEM Administration Guide</a> | 1 editor, 3 SMEs |
| Hitachi    | Enterprise software | <a href="/files/Hitachi_Cloud-Enterprise_Deployment-guide-2015.pdf" target="_blank" rel="noopener noreferrer">Cloud Enterprise Deployment Guide</a> | 1 editor, 4 SMEs |
| TEDx       | Events and Media | <a href="/files/TEDx_BeaconStreet-Adventure-Toolkit-Guide-2013.pdf" target="_blank" rel="noopener noreferrer">TEDx BeaconStreet Adventure Toolkit Guide</a> | 1 graphic artist |
| ROAM Data  | Fintech payments | <a href="/files/ROAM_Android-SDK_Online-Payments.pdf" target="_blank" rel="noopener noreferrer">ROAM Android SDK Online Payments</a> <br/> <a href="/files/ROAM_iOS-SDK-for-Apple-Pay-payments.pdf" target="_blank" rel="noopener noreferrer">ROAM iOS SDK for Apple Pay payments</a> <br/> <a href="/files/ROAM_Deployment-Guide-v.1.0.0.pdf" target="_blank" rel="noopener noreferrer">ROAM Deployment Guide 1.0.0</a> <br/> <a href="/files/ROAM_Language-Tool-v.1.0.0-Install-guide-2013.pdf" target="_blank" rel="noopener noreferrer">ROAM Language Tool Install Guide</a> <br/> <a href="/files/ROAM_ROAMsupport-v5.0.5-User-Guide-2013.pdf" target="_blank" rel="noopener noreferrer">ROAMsupport User Guide</a> <br/> <a href="/files/ROAM_TSP-Monitor-Tool-v.1.0.2-Quickstart-2013.pdf" target="_blank" rel="noopener noreferrer">ROAM TSP Monitor Tool Quickstart</a>   | 1 editor, 5 SMEs |
| Edutainme  | Software training | <a href="/files/Edutainme_How-to-set-up-MediaWiki-1.26-with-Lighttpd-1.4-on-Ubuntu-14.pdf" target="_blank" rel="noopener noreferrer">Texts Markdown editor - an example with MediaWiki</a> | 1, editor, 2 SMEs |
| HP         | Office hardware | <a href="/files/HP_3100-Fax-Series_User-Guide-2008.pdf" target="_blank" rel="noopener noreferrer">HP 3100 Fax Series User Guide</a> | 1 editor, 2 SMEs |
| SIOS       | High-Availability | <a href="/files/SIOS_LifeKeeper_install-and-config-guide-2018.pdf" target="_blank" rel="noopener noreferrer">LifeKeeper Install and Configuration Guide</a> | 1 editor, 3 SMEs |
| Talk Group | ESL | <a href="/files/TalkGroup_Club-News-vol1.pdf" target="_blank" rel="noopener noreferrer">Talk Group 洋腔洋调 Club News vol 1</a> <br/> <a href="/files/TalkGroup_textbooks.pdf" target="_blank" rel="noopener noreferrer">Talk Group 洋腔洋调 textbooks</a> | 2 translaters, 1 artist |


## In-app help

### Tools used

- Help+Manual
- HelpNDoc
- Help Edit

### Use cases

| Use case | Year | Company |
|----------|------|---------|
| Tool Tip Text on web application when a user seems stuck    | 2023 | Nium <br/> <sup> _San Francisco, CA_ </sup> |
| In-app help files and Tool Tip Text on Windows game WordZap | 2014 | MICA Games <br/> <sup> _Bellevue, WA_ </sup> |


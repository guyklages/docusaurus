# ACH return codes

List of possible ACH return codes.

## `R0x`

| ACH return code | Description |
|-----------------|-------------|
| `R01` | Insufficient Funds |
| `R02` | Account Closed |
| `R03` | No Account/Unable to Locate Account |
| `R04` | Invalid Account number |
| `R05` | Unauthorized Corporate Debit to Consumer Account |
| `R06` | Returned per ODFI Request |
| `R07` | Authorization Revoked By Customer |
| `R08` | Payment Stopped |
| `R09` | Uncollected Funds |

## `R1x`

| ACH return code | Description |
|-----------------|-------------|
| `R10` | Customer Advises Not Authorized |
| `R11` | Check Truncation Entry Return (Specify) |
| `R12` | Account Sold to Another DFI |
| `R13` | Invalid ACH Routing Number |
| `R14` | Rep. Payee Deceased/Incapacitated |
| `R15` | Beneficiary or Account Holder Deceased |
| `R16` | Account Frozen/Entry returned per OFAC instruction |
| `R17` | File Record Edit Criteria (Specify) (Not Currently Supported by CU\*BASE) |
| `R18` | Improper Effective Entry Date |
| `R19` | Amount Field Error |

## `R2x`

| ACH return code | Description |
|-----------------|-------------|
| `R20` | Non-Transaction Account |
| `R21` | Invalid Company Identification |
| `R22` | Invalid Individual ID Number |
| `R23` | Credit Entry Refused by Receiver |
| `R24` | Duplicate Entry |
| `R25` | Addenda Error |
| `R26` | Mandatory Field Error |
| `R27` | Trace number error |
| `R28` | Routing number or check digit error |
| `R29` | Corporate Customer Advises Not Authorized |

## `R3x`

| ACH return code | Description |
|-----------------|-------------|
| `R30` | RDFI not participant in check truncation program |
| `R31` | Permissible Return Entry (CCD, CTX) |
| `R32` | RDFI non-settlement |
| `R33` | Return of XCK Entry |
| `R35` | Return of improper debit entry |
| `R36` | Return of improper credit entry |
| `R37` | Source Document Presented for Payment (ARC, POP, BOC) |
| `R38` | Stop Payment on Source Document (ARC, BOC) |
| `R39` | Improper Source Document (ARC, POP, BOC) |

## `R4x`

| ACH return code | Description |
|-----------------|-------------|
| `R40` | Return of ENR Entry by Federal Government Agency |
| `R41` | Invalid Transaction Code |
| `R42` | Routing Number/Check Digit error |
| `R43` | Invalid DFI Account number |
| `R44` | Invalid individual ID Number/Identification number |
| `R45` | Invalid Individual Name/Company Name |
| `R46` | Invalid Representative Payee Indicator |
| `R47` | Duplicate Enrollment |

## `R5x`

| ACH return code | Description |
|-----------------|-------------|
| `R50` | State Law Affecting RCK Acceptance |
| `R51` | Item related to RCK entry is ineligible or RCK entry is improper |
| `R52` | Stop Payment on Item (RCK) |
| `R53` | Item and RCK entry presented for payment |

## `R6x`

| ACH return code | Description |
|-----------------|-------------|
| `R61` | Misrouted Return |
| `R62` | Return of erroneous or reversing debit |
| `R67` | Duplicate return |
| `R68` | Untimely return |
| `R69` | Field Error(s) |

## `R7x`

| ACH return code | Description |
|-----------------|-------------|
| `R70` | Permissible return entry not accepted/return not requested by ODFI |
| `R71` | Misrouted dishonored return |
| `R72` | Untimely dishonored return |
| `R73` | Timely Original Return |
| `R74` | Corrected Return |
| `R75` | Return not a duplicate |
| `R76` | No errors found |
| `R77` | Non-acceptance of R62 Dishonored Return |

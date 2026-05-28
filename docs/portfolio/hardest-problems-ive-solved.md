# Hardest problems I've solved

## Technical writing

### Reduced pages by 36% from new IA

#### <mark>Nium -- Revamped the information architecture and reduced dev pages by 36%</mark>

| Before (May 2024) | After (July 2025) |
|-------------------|-------------------|
| PROBLEM: <br/> Short pages were hastily written by engineers who used more pages than needed <br/> <br/> Total of 50 pages| MY SOLUTION: <br/> I revamped and streamlined the information architecture to improve the flow and group related topics. <br/> <br/> Total of 32 pages |
| ![Before](../../static/img/Nium_ca_50pgs.png) | ![After](../../static/img/Nium_ca_32pgs.png) |

### Doubled onboarding with 75% fewer issues

#### <mark>Nium -- Doubled the number of people onboarded with 75% fewer issues</mark>

| Before (Oct 2022) | After (Dec 2022) |
|-------------------|------------------|
| PROBLEM: <br/> New clients were unable to onboard themselves due to the unclear method to them–-and even to Nium. <br/> <br/> Each region (AU, EU, HK, SG, UK, US) contains five very complex spreadsheets describing various steps of onboarding for various client types and situations: | MY SOLUTION: <br/> I created two sections (Individual and Corporate) of customers with pages of common onboarding steps and sections for region-specific parameter and example pages. <br/> <br/> Immediately saw twice as many customers onboarded and only a quarter of the Helpdesk requests for onboarding |
| ![Before](../../static/img/Nium_onboarding-before.png) | ![After](../../static/img/Nium_onboarding-after.png) |

### Fewer obsolete pages; automated reminders

#### <mark> Yahoo -- Reduced obsolete pages by 30% and added automation to reduce further</mark>

| Before (May 2019) | After (Dec 2019) |
|-------------------|------------------|
| PROBLEM: <br/> Too&nbsp;many&nbsp;obsolete&nbsp;and&nbsp;disorganized&nbsp;document&nbsp;pages. <br/> - Going to have an audit on all documentation pages. <br/> - Most in Confluence, needing to be in Markdown+Git. <br/> - Many pages were obsolete but not clear which ones. <br/> - Many pages were not in easily discoverable places. <br/> - Many related pages/topics could be combined. <br/> - Moving forward, how to prevent "stale" pages? | MY SOLUTION: <br/> Implement reminders to review pages that haven't been edited for a certain number of days. <br/> - I reviewed pages with SMEs, archived obsolete pages, merged similar pages, organized them by product, and migrated them to Markdown in Yahoo's Git repo. <br/> - I suggested a system of three tags on every page: <br/> &nbsp;&nbsp;&nbsp;-`Owner` <br/> &nbsp;&nbsp;&nbsp;-`LastModified` <br/> &nbsp;&nbsp;&nbsp;-`DaysTillStale` <br/> - A daily script looks for pages that haven't been edited in that page's time limit and sends an email to the owner of that page to review it (or the owner's manager). |
| | - Total number of pages reduced by 30%. <br/> - Automated a reminder to page owners when a page hasn't been edited in a preset number of days. |

### 0 help from engineers

#### <mark> Couchbase -- Needed a Linux install but no engineer was available to help</mark>

| Before (Apr 2018) | After (Apr 2018) |
|-------------------|------------------|
| PROBLEM: <br/> Need to document features before testing is done. <br/> - Couchbase Server v6.0 was still being coded. <br/> - Less than half of v6.0 had completed QA testing. <br/> - Documentation was needed for an upcoming conference. <br/> - There wasn't an installed instance I could use. | MY SOLUTION: <br/> Install the Alpha version to use it and document it. <br/> <br/> (it was like installing Linux in 1996 before Google) <br/> <br/> 1.  Find an unused server I could reformat. <br/> 2.  Download and install Ubuntu 18.0. <br/> 3.  Find, download and install dependency files. <br/> 4.  Find, download and compile CB v6.0 source code. <br/> 5.  Run Couchbase Server and create queries that use the new ANSI indexing and other new features. |
| 



## Software development

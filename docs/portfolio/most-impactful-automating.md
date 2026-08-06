# Most impactful automating


## Overview

| Accomplishment  | Year | Company |
|-----------------|------|---------|
| [Reduced obsolete pages by 40% and added automation to prevent obsolete pages](#40-fewer-pages) | 2019 | Yahoo <br/> <sup> _Sunnyvale, CA_ </sup> |
| [Made a database to automate reports; saved >50% of the employees' time and effort](#db-saved-50-time-effort) | 2009 | ADP Payroll <br/> <sup> _Seattle, WA_ </sup> |
| [Automated their label printing system; freed up 40% of staff's time](#40-increase-in-productivity) | 1999 | Bridgestone <br/> <sup> _Bloomington, IL_ </sup> |

## 40% fewer pages

#### Yahoo (Sunnyvale, CA) –– <mark> Reduced obsolete pages by 40% and added automation to prevent obsolete pages </mark>

| Before (May 2019) | After (Dec 2019) |
|-------------------|------------------|
| PROBLEM: <br/> Too&nbsp;many&nbsp;obsolete&nbsp;and&nbsp;disorganized&nbsp;document&nbsp;pages. <br/> - Going to have an audit on all documentation pages. <br/> - Most in Confluence, needing to be in Markdown. <br/> - Many pages were obsolete but not clear which ones. <br/> - Many pages were not in easily discoverable places. <br/> - Many related pages/topics could be combined. <br/> - Moving forward, how to prevent "stale" pages? | MY SOLUTION: <br/> Implement reminders to review unmodified pages of a specified number of days. <br/> - I reviewed pages with SMEs <br/> - Archived obsolete pages <br/> - Merged similar pages <br/> - Organized pages by product <br/> - Migrated them to Markdown in Yahoo's GitHub <br/> - I suggested a system of tags on every page: <br/> &nbsp;&nbsp;&nbsp;&nbsp;-`Owner`, `LastModified`, `DaysTillStale` <br/> - A daily script looks for pages that haven't been edited in that page's time limit and sends an email to the owner (or owner's manager) of that page to review it. |
| Originally had 1,439 pages <br/> I revamped to 849 pages | RESULTS: <br/> - Total number of pages reduced by 40%. <br/> - Automated a timely reminder for page owners to review. |


## DB saved 50% time, effort

#### ADP Payroll (Seattle, WA) –– <mark> Made a database to automate reports; saved >50% of the employees' time and effort </mark>

| Before (Mar 2009) | After (Aug 2009) |
|-------------------|------------------|
| PROBLEM: <br/> Payroll Specialists had very manual and labor-intensive reports to create. <br/> <br/> They had everything in various spreadsheets and documents, which took a long time to sift through when compiling data needed for weekly reports. | MY SOLUTION: <br/> Use a database to unify and create reports. <br/> <br/> 1. I created a Microsoft Access database to connect all of their spreadsheets and documents into one cohesive place. <br/> 2. I made reports that ran automatically on the schedule they needed them. |
| | RESULTS: <br/> This new system freed up at least 50% of their time which allowed them to do other things. |


## 40% increase in productivity

#### Bridgestone (Bloomington, IL) –– <mark> Automated their label printing system; freed up 40% of staff's time </mark>

| Before (May 1999) | After (May 1999) |
|-------------------|------------------|
| PROBLEM: <br/> Staff didn't have enough time to do everything needed. <br/> <br/> 1. Staff would print the labels needed for a single part of a particular batch.  (5 min) <br/> <br/> 2. Staff would wait 15 - 20 minutes until that part finished before printing labels for the next part because their SQL application would print only one part at a time. <br/> <br/> 3. Staff would go back to Step 1, repeating the long wait times throughout the day. | MY SOLUTION: <br/> Change how their SQL Server application operates to select and print labels of all steps of a batch at a single time. <br/> <br/> I re-designed their software to print the labels of all steps of a given batch at a single time, so the staff were available to do other things while all the needed labels printed on their own. |
| | RESULTS: <br/> The staff's waiting time (40% of the day) became productive time on other tasks |


## Simplifying

Some things can't be fully automated, but they can be vastly simplified or mostly automated.


## 80% time saved on writing

#### Couchbase (Santa Clara, CA) –– <mark> Reduced the writing process of a new feature from 4-6 weeks to 4-5 days </mark>

| Before (Mar 2017) | After (Aug 2017) |
|-------------------|------------------|
| PROBLEM: <br/> Turnaround&nbsp;time&nbsp;to&nbsp;add&nbsp;features&nbsp;took&nbsp;way&nbsp;too&nbsp;long. <br/> 1.  Writers authored a feature in Oxygen. (2-3d) <br/> 2.  Webpage staged for engineer review. (2-3h) <br/> 3.  Engineers eventually gave feedback. (3-5d) <br/> 4.  Webpage updated. (1-2d) <br/> <br/> Time for iteration: 6-13d <br/> x 2-4 iterations (going to Step 2) <br/> ======================== <br/> Total of 4 - 6 _weeks_ per feature | MY SOLUTION: <br/> Google Docs for synchronous writing/editing. <br/> 1. I authored a single feature in Google Docs and shared it with all engineers involved. (2-3d) <br/> 2. While engineers discussed how the feature will be finalized, I started on the next feature. <br/> 3. After the engineers finalized a feature's text, I imported it in Oxygen and staged it only _once_. (2-3h) <br/> ====================== <br/> Total of 4 - 5 _days_ per feature | 
| | RESULTS: <br/> Average time saved:  5 weeks → 1 week (80%) |
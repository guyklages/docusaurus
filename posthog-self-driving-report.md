# PostHog Self-driving setup report

## Summary
This run reviewed the site’s existing PostHog web instrumentation and Self-driving prerequisites. No PostHog project configuration was changed because the required GitHub App connection was not completed and subsequent PostHog MCP requests returned `INVALID_API_KEY`.

## What was found

| Area | Finding |
|---|---|
| Application type | Docusaurus web site using `posthog-js` |
| Existing analytics | Client initialization is in `src/theme/Root/index.js`; it does not override replay or exception capture defaults |
| Existing product events | Homepage feature interaction, recommendation interaction, GitHub profile click, and page-feedback events |
| Session Replay / Error Tracking / Surveys | No observed recordings, active error issues, or surveys in the available probes; supplied project state did not confirm any enabled product |
| Connected tools | No issue-tracker integrations were selected |
| Custom scouts | Declined; candidates proposed for page-feedback completion and portfolio engagement |

## Changes made to the project

No server-side PostHog changes were applied. The GitHub App prerequisite was checked and was absent before authorization was cancelled. Product enablement, native signal sources, scout configuration, and Replay Vision scanners were intentionally not attempted after PostHog MCP authentication became invalid.

## Files modified or created

| File | Change |
|---|---|
| `posthog-self-driving-report.md` | Created this blocked-setup handoff report |

No application source files were modified.

## Follow-ups

- [ ] Re-authenticate the PostHog MCP connection; project API calls currently return `INVALID_API_KEY`.
- [ ] Install the PostHog GitHub App and grant access to this repository: https://us.posthog.com/api/environments/587000/integrations/authorize?kind=github
- [ ] Re-run Self-driving setup after GitHub is verified to enable Session Replay, Error Tracking, and Support; configure native signal sources; tune scouts; and create the two Replay Vision monitors.
- [ ] Connect an inbound Support channel (email, inbox, or Slack) after Support is enabled, so conversations can reach the inbox.

## What happens next

After the prerequisites are completed and setup is re-run, fresh Self-driving checks are normally picked up within about 30 minutes. Findings will then begin appearing in the [Self-driving inbox](https://us.posthog.com/project/587000/inbox).

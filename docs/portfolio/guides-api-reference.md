import { DefinitionProvider, DefTerm, DefinitionPanel } from '@site/src/components/DefTerm';

# Guides and API reference


## Live company websites

I created and fully owned the following company websites. I used Git, Markdown, Oxygen, Postman, ReadMe, and VS Code to create documentation for developers, DBAs, and technical PMs. Links open into a new browser tab.

<DefinitionProvider>

| Company      | Developer guides | API reference | Collaborated with | Highlight |
|--------------|------------------|---------------|:-----------------:|-----------|
| <DefTerm def="FIS (Fidelity) bought fintech startup Atelio and later dissolved it to return to traditional banking.">Atelio&nbsp;of&nbsp;FIS</DefTerm> | _Product discontinued_ <br/> **[My copy](https://guyklages.com/atelio/getting-started/quickstart)** | _Product discontinued._ <br/> **[Similar&nbsp;to&nbsp;Nium's](https://docs.nium.com/api#description/introduction)** | 1 editor, 5 SMEs | [Revamped and reduced the developer pages by 40%](./most-impactful-tech-writing.md#69-fewer-pages-via-new-ia) |
| <DefTerm def="Nium is a fintech company that was a struggling startup while I worked there.">Nium</DefTerm>         | **[Getting Started](https://docs.nium.com/docs/getting-started)** | **[Introduction](https://docs.nium.com/api#description/introduction)** | 1 editor, 6 SMEs | [70% more onboarding of clients with 70% fewer issues](./most-impactful-tech-writing.md#70-more--70-fewer) |
| <DefTerm def="Couchbase is a NoSQL database company that was a struggling startup while I worked there.">Couchbase</DefTerm>    | **[SQL++&nbsp;Reference](https://docs.couchbase.com/server/current/n1ql/n1ql-language-reference/index.html)** |  | 1 editor, 9 SMEs | [Reduced their writing process by 80%](./most-impactful-tech-writing.md#80-time-saved-on-writing) |

<DefinitionPanel/>

</DefinitionProvider>


## My most technical projects

| Developer problem | How I solved it | Company |
|-------------------|-----------------|---------|
| Developers had a hodge-podge of `skill.md`, `instruction.md`, and `.yaml` files that needed structure for their internal agent-driven workflows, server architecture, and usability. | I created a framework of governance and guardrails with templates in Markdown and YAML files to help developers build Copilot Agents that adhere to company rules and standards. | Microsoft |
| Developers created an AI/ML/LLM system to populate the Netflix home screen of titles and needed to share this technology with other Netflix departments but weren't able to install or configure it outside their group. | I tested and created internal documentation for the complex installation and configuration of their tool that populates the Netflix Home screen of titles so other departments can use it as well. | Netflix |
| Developers of Nium's customers weren't able to onboard Nium's products due to the complexity of different steps for different company types in different countries. | I made a step-by-step unified onboarding process that immediately saw [70% more customers onboarded while reducing helpdesk tickets by 70%](./most-impactful-tech-writing.md#70-more--70-fewer). | Nium |
| Developers were building internal AI/ML/LLM tools but had difficulty since Apache's documentation didn't cover all of their use cases or needs. | I filled in their documentation gaps and greatly enhanced their internal documentation with more explanations and examples for engineers to use the Apache ecosystem tools for their Big Data and IoT projects. An engineer called my docs _"more thorough than Apache's documentation site."_ | Yahoo |

---

## API

### Atelio

_(Discontinued product)_

Nearly identical to [Nium's APIs](#nium).

### Nium

APIs for fintech developers.

| Category  | APIs |
|-----------|------|
| Clients   | [Client Prefund Account](https://docs.nium.com/api#tag/client-prefund-account) • [Client Settings](https://docs.nium.com/api#tag/client-settings) • [Client Transactions](https://docs.nium.com/api#tag/client-transactions/GET/api/v1/client/{clientHashId}/transactions) |
| Customers | [User Management](https://docs.nium.com/api#tag/user-management) • [Customer Account - Individual](https://docs.nium.com/api#tag/customer-account-individual) • [Customer Account - Corporate](https://docs.nium.com/api#tag/customer-account-corporate) • [Customer Management](https://docs.nium.com/api#tag/customer-management) • [Accounts](https://docs.nium.com/api#tag/accounts) • [Files](https://docs.nium.com/api#tag/files) |
| Wallets   | [Customer Wallet Balance](https://docs.nium.com/api#tag/customer-wallet-balance) • [Wallet to Wallet Transfers](https://docs.nium.com/api#tag/wallet-to-wallet-transfers) |
| Payins    | [Customer Funding](https://docs.nium.com/api#tag/customer-funding) • [Customer Virtual Accounts](https://docs.nium.com/api#tag/customer-virtual-accounts) |
| Payouts   | [Beneficiary](https://docs.nium.com/api#tag/beneficiary) • [Payout](https://docs.nium.com/api#tag/payout) |
| Cards     | [Simulators](https://docs.nium.com/api#tag/simulators) • [Lifecycle](https://docs.nium.com/api#tag/lifecycle) • [Security](https://docs.nium.com/api#tag/security) • [Controls](https://docs.nium.com/api#tag/controls) |
| RFIs      | [Request for Information](https://docs.nium.com/api#tag/request-for-information) |
| Reports   | [Reports](https://docs.nium.com/api#tag/reports)
| Testing   | [Payouts](https://docs.nium.com/api#tag/payouts) • [Payins](https://docs.nium.com/api#tag/payin) • [Customer](https://docs.nium.com/api#tag/customer) |

---

## Kubernetes `kubectl`

_(I wrote this for an interview's assignment with that company's style guide)_

Major and alternative cloud providers support Kubernetes, offering fully managed services that handle the control plane. Use `kubectl`, a command-line utility, to communicate with a cluster's control plane via the Kubernetes API. Every `kubectl` command has the following syntax:

```bash
kubectl [command] [TYPE] [NAME] [flags]
```

The following table lists all `kubectl` commands for debugging your cluster:

| <div style={{ width: '380px' }}>CLI Command</div> | Description |
|---------------------------------------------------|-------------|
| `kubectl get pods --namespace <namespace>`        | Get a list of pods and their status by specifying the `namespace`.                    |
| `kubectl logs <pod-name>`                         | Retrieve the logs of a specific pod.                                                  |
| `kubectl logs -f <pod-name>`                      | Stream or "follow" logs in real-time.                                                 |
| `kubectl exec <pod-name>`                         | Debug a container from the inside or explore the environment of the container itself. |
| `kubectl exec -it <pod-name> -- /bin/bash`        | Open an interactive terminal session inside a running pod's container.                |

### Handle Errors

#### Issues Inside a Container

If you experience issues inside a container, use the following syntax:

```shell
kubectl debug -it <pod-name> --image=busybox --target=<container-name>
```

What you see first:

```text
Defaulting debug container name to debugger-xxxxx.
Targeting container "your-app-container". If you don't see logs for this container, try something else.
```

Use `kubectl debug` to diagnose the following symptoms in a running (or crash-looping) container:

- Container lacks a shell
- Container constantly crashes
- Container requires node-level host troubleshooting

#### Pod Doesn't Terminate

A stuck pod is often caused by:

- stuck finalizers
- a hung kubelet
- a volume that won't unmount

To troubleshoot this, try `kubectl delete pod <name> --grace-period=0 --force` or investigate finalizers directly.

### References

- [Getting started with Kubernetes](https://kubernetes.io/docs/reference/generated/kubectl/kubectl-commands#-strong-getting-started-strong-)

- [What is Kubernetes](https://kubernetes.io/docs/concepts/overview/)


## Appendix

### Years of DITA

<DefinitionProvider>

| Company                                    | From     | Until    | Years | DITA | AEM  | Oxygen <br/> XML | XMetaL | Pages |
|--------------------------------------------|:--------:|:--------:|:-----:|:----:|:----:|:----------------:|:------:|:-----:|
| <DefTerm def="ChargePoint makes chargers for electric vehicles (EVs), and I wrote internal manuals for the manager of those chargers (such as a store supervisor at Target) to adjust the settings for EVs charging in their parking lot while their owner shops. Guides include PDFs and online dashboards.">ChargePoint</DefTerm>    | Nov 2018 | May 2019 |  0.5  |  ✅  |      |        ✅        |        |       |
| <DefTerm def="Couchbase makes Big Data NoSQL databases, and I owned all of the SQL++ reference pages. I documented new features and revamped the pre-existing pages by elaborating their explanations, by adding index and query examples, and by adding diagrams.">Couchbase</DefTerm>                                     | Apr 2017 | May 2018 |  1.2  |  ✅  |      |        ✅        |        |       |
| <DefTerm def="The Wells Fargo department I worked in was responsible for their developer portal and banking APIs. I documented how to register, subscribe, generate, and test API keys.">Wells Fargo</DefTerm>   | Jan 2017 | Mar 2017 |  0.2  |  ✅  |  ✅  |                  |        |       |
| <DefTerm def="The VMware department I worked in was responsible for their UEM virtualization products. I documented the user guides, design guides, deployment guides, knowledge base articles, and blog posts of their AppStacks, App Volumes, and AppSense PDFs.">VMware</DefTerm>                                     | Aug 2016 | Dec 2016 |  0.3  |  ✅  |  ✅  |                  |        |       |
| <DefTerm def="The Visa department I worked in was responsible for their fintech portal APIs. I documented how to register, subscribe, generate, and test API keys.">Visa</DefTerm> | Mar 2016 | Jun 2016 |  0.3  |  ✅  |  ✅  |                  |        |       |
| <DefTerm def="The Hitachi department I worked in was creating a realtime text message monitoring system to look for crime patterns. I documented their PDF user guides, deployment guides, and configuration guides.">Hitachi</DefTerm> | Aug 2015 | Feb 2016 |  0.5  |  ✅  |      |                  |   ✅   |       |
| <DefTerm def="The Apple department I worked in was responsible for the robots that assembled iPads. I documented how to activate, configure, operate, and troubleshoot these robots for their corresponding team in China.">Apple</DefTerm>        | Feb 2015 | Jun 2015 |  0.3  |  ✅  |      |                  |        |  ✅   |
| <DefTerm def="The NICE department I worked in was responsible for their employee monitoring tool. I documented how to install, configure, use, and troubleshoot their software.">NICE Systems</DefTerm> | May 2014 | Jul 2014 |  0.2  |  ✅  |      |        ✅        |        |       |
| <DefTerm def="The Veteran Affairs Medical Center's epidemiology department was converting from paper forms to electronic forms for their clinical trials. I documented user guides and wrote class materials to train PMs how to use the new system.">V.A. Medical</DefTerm> | Feb 2011 | Sep 2012 |  1.6  |  ✅  |      |                  |        |       |
| <DefTerm def="The ADP Payroll department I worked in was responsible for garnishments, payroll, AP/AR, GL, and reimbursements. I documented their processes and created database reports to automate big parts of their workflow.">ADP Payroll</DefTerm>  | Oct 2008 | Dec 2010 |  2.2  |  ✅  |      |                  |   ✅   |       |
|              |          |          |       | ==== | ==== |   ======         | ====== | ===== |
|              |          |          |       |  7.2 | 0.8  |    1.9           |  2.7   |  0.3  |

<DefinitionPanel/>

</DefinitionProvider>

---
title: KB - Replace a UEM license file
authors: [guyklages]
tags: [vm]
---

## Symptoms

How can you replace an expired UEM license file?

## Resolution

VMware UEM stores the license file locally on each computer where the UEM agent is installed.

The license file is stored in the installation folder of the UEM agent. The default location of the license file is `C:\Program Files\Immidio\Flex Profiles\FlexEngine.lic`

The process of changing the license file is straightforward and you have two options:

- Change the license file automatically when upgrading to a newer version of UEM
- Change the license file manually

| Option | Description |
|:------:|-------------|
| 1      | If you run a newer version of the UEM installer, the MSI installer will ask you for a license file. If you specify a new license file, the MSI installer will copy that new license file to the local installation folder of UEM during the upgrade. This works for both manual and unattended MSI installations. |
| 2      | If you have a new license file, you can simply rename that file to “FlexEngine.lic” and copy it to the installation folder of the UEM agent, overwriting the exiting license file. This needs to be done for each computer where the UEM agent is installed. |

With the release of UEM 9.0 a change has been made to the license file check; on computers where the Horizon Agent is installed, a UEM license file is not needed. In this case the MSI installer will not ask you for a license file.

---
title: KB - Log collection usage
authors: [guyklages]
tags: [vm]
---

This KB describes how to install and use Log Collection with App Volumes.


## Introduction

Currently, no method exists to collect Agent and Manager logs to a central location.

With the log collector, every agent and manager will periodically push their log files to a fileshare.

To start collecting logs, every Agent and Manager will call a `.bat` file depending on the bit version:

- 32-bit: `C:\Program Files (x86)\CloudVolumes\DctLogCollector\support.bat`
- 64-bit: `C:\Program Files\CloudVolumes\DctLogCollector\support.bat`

The Agent and Manager are configured to periodically push the log files to a fileshare; but if you need to manually collect logs, running the `.bat` file alone would also push log files to the fileshare.
 
## Configuration of the Log Fileshare

To make the Agent and Manager aware of the fileshare, configure the Log Fileshare in the following way.

To create a Log Fileshare, go to `http://localhost/log_fileshares/new` and input the following Log Fileshare fields:

| Field              | Description |
|--------------------|-------------|
| Host name          | This is host and folder name for your Log Fileshare. <br/> For example, `\\10.33.99.231\uem\logs` <br/> Make sure your path ends with a `logs` folder. |
| Username           | Username of the Log Fileshare |
| Password           | Password of the Log Fileshare |
| Domain             | Domain of the Log Fileshare   |
| Agent Time         | The agent will periodically push log files to the fileshare. This parameter sets how much time delay is required. Time is denoted in minutes. |

Other Fileshare actions

| Fileshare action | Go to  |
|------------------|-------------|
| Edit             | `http://localhost/log_fileshares/edit` |
| View or delete   | `http://localhost/log_fileshares` |

**Note**:  Every setup can have only one Log Fileshare.

## Agent log collection

The Agent will request for the Log Fileshare credentials by sending a GET request to:
```
<manager’s ip address>/log_fileshares/active
```

After the Agent gets these details, the Agent will run the log collector periodically, based on the time configured.

**Note**:  While the collection is running, the user’s desktop CPU usage will spike until the collection ends.

**Note**:  The tool’s performance has not yet been tested and validated at large scale.

## Manager log collection

The Manager has a ruby job running called `collect_logs` which will periodically call the `support.bat` file with the required parameters.

To configure the time for the manager to collect logs, change the duration in the `clock.yml` file. The Manager logs are collected every 12 hours.
 
## Switching off log collection

You can deactivate log collection by unchecking the **Is active** checkbox in the _Log Fileshare configuration_ page. 
 
## Running batch scripts on Agents and Managers

In Windows, no setup is required. The `.bat` script is shipped with the Agent and Manager images. In order to collect Agent logs, make sure https is enabled; otherwise, this feature will be turned off in the Agent. 

**Note**: The `.bat` script needs administration privileges to run.

The `.bat` script can be run from:

```
C:\Program Files (x86)\CloudVolumes\DctLogCollector\support.bat
```
 
The following are the parameters for `support.bat`:

| Parameter      | Description |
|----------------|-------------|
| `-destination` | Destination of the log files on the machine |
| `-fhhost`      | Location of the folder on hostname of the fileshare. <br/> For example, `\\xx.xx.xx.xx\logs` <br/> (Make sure the folder named `logs` exists) |
| `-fhuname`     | Username of the fileshare owner |
| `-fhdomain`    | Domain under which the fileshare is located |
| `-fhpwd`       | Password of the username for the fileshare owner |

Example of running the script:

```
support.bat -destination C:\Logs -fhhost \\10.33.99.231\uem\logs -fhdomain <domain> -fhuname <username> -fhpwd <password>
```

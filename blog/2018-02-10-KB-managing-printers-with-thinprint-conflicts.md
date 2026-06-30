---
title: KB - Printers with ThinPrint conflicts
authors: [guyklages]
tags: [vm]
---

## Symptoms

At logon, printers are recreated, but the default printer is not being retained at each login. Also printers set to Default by UEM are not the Default anymore.

Users have to manually set their default printer again.  

The user is connecting through VMware View or Horizon client from a PC or Thin Client.

## Cause

This is caused by ThinPrint default printer redirection.

Default behavior of ThinPrint is to redirect the default local printer to the user session. This overwrites the default printer setting from the session.

## Resolution

This can be solved by changing the behavior of ThinPrint.

You have three options: 

| Option | Description |
|:------:|-------------|
| 1      | Disable the default ThinPrint printer redirection completely in View Clients, detailed at https://kb.vmware.com/kb/2012770 |
| 2      | Disable only the default ThinPrint printer on a VMware View Client, detailed at https://kb.vmware.com/kb/2003626 |
| 3      | Use the View ADM template to disable printer redirection. <br/> Use the view client adm template (`vdm_client.adm`) by adding the template to an existing or new GPO. <br/> Under **user configuration > administrative templates > VMware View Client Configuration/RDP settings**, select **Disable redirect printers**. |

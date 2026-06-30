---
title: KB - Writables not created
authors: [guyklages]
tags: [vm]
---

Part of the writables are not created upon login in a multi-vCenter environment 

## Symptoms

AppVolumes 2.11 and above is configured to work with more than one vCenter.

Writables are created for an AD group and the writable creation is delayed until login time.

When logging in to VMs in one of the vCenters with a user which is part of the AD group, a writable is created for that user.

When logging in to a VM on another vCenter, a writable is NOT created for the user, and no writable is attached to the user.

The following log can be found in the Manager log corresponding to the login attempt:

```
DEBUG Cvo: Culling "DOMAIN\GROUP" because it does not have files accessible to the machine manager running "Computer <DOMAIN\MACHINE$>"
```

## Cause

When creating a writable volume for a group account, a writable volume is actually created for the group account, not a single user. Then this writable will be used as a source template for the direct writables which will be created for the users in the group.

When a user logs in, this writable is cloned.

Only one copy of the group writable is created on one of the vCenters that accepted the job and started the writable creation task.

Logging into a VM:

- on the same vCenter will create the writable successfully.
- on another vCenter will not create the writable, as this file is not accessible from another vCenter.

## Resolution

Storage used for the writable volumes should be common between vCenters, otherwise logging in to different vCenters will result in different writables splitting user data between separate VMDKs.

You need to follow these steps to import the group writable entry from the other vCenter:

1. Open the writable volumes screen by clicking **Volumes > Writables**
2. Click on **Import Writables**
3. Choose the common writables datastore related to the vCenter which is not able to create the writable volumes.
4. Click on the **Import** button and wait for the writables to be imported.
    **Note**:  Each writable will have a separate record for each vCenter.
5. Log into a VM on the other vCenter. That will automatically create the writable using the group writable record for this vCenter.


**Important**:  Do not forget to perform this import operation after all writables are created!

**Note**:  Each writable must have as many records as the number of vCenters

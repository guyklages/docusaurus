---
title: KB - AppStacks disabled after rescan
authors: [guyklages]
tags: [vm]
---

## Symptoms

After running an AppStack rescan, you experience one of these symptoms:

- AppStacks appears as disabled 
- AppStacks appears as unprovisioned in the manager UI

## Cause

This issue occurs because a separate AppVolumes deployment is configured to use the same datastore, which is not supported.

AppVolumes modifies the metadata of AppStacks, especially in version 3.0. When rescanning, the system reads the metadata of the AppStacks on the datastore and reflects the changes in the UI.

## Resolution

To resolve this issue, change the configuration of the second AppVolumes deployment to point to another path on the datastore, use another datastore, or stop the service/server.

To prevent this issue from recurring, move the AppStacks on the production datastore to a different path on the datastore, import them, and recreate the assignments.

---
title: KB - AppStack not excluded from Writables
authors: [guyklages]
tags: [vm]
---

## Symptoms

Exclusions added to AppStack `snapvol.cfg` files are not excluded from Writables Volumes.

Writable Volumes still capture files that could be excluded in AppStack `snapvol.cfg` files. This could cause potential conflicts and unexpected behaviors.

## Resolution

These symptoms are caused because writable policy affects the whole system while AppStack policy affects only AppStacks.

Since AppStack exclusions will not apply to a writable, those exclusions need to be listed in `snapvol.cfg` files in order to prevent core applications and services from being broken.  So, it’s necessary to list the same exclusions in both AppStacks AND writable `snapvol.cfg` files when attaching a writable.

To exclude a location, edit the `snapvol.cfg` file to add the full path that is to be excluded.  Paths can be listed in any order, for example:

```
# File system exclusions

exclude_path=\ProgramData\ntuser.pol
exclude_path=\ProgramData\tempntuser.pol
exclude_path=\ProgramData\VMware
```

For more information about the `snapvol.cfg` file, see
http://blogs.vmware.com/euc/2016/03/app-volumes-snapvol-cfg-writable-volume-customize-configure.html.

**Note**: Introducing a writable volume without the explicit exclusions added, re-breaks the same core apps and services.  Re-adding the exclusions to the writable via the zip file method fixes this.

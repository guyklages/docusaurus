---
title: KB - `Run Once` unwanted behavior
authors: [guyklages]
tags: [vm]
---

## Symptoms

The checkbox `Run Once` for UEM configurations (like shortcuts) can still run multiple times when a Local User Profile is used. This could be unwanted behavior of UEM, and this KB describes how to change this behavior to really run once.

## Resolution

User Environment Manager has support for a `runOnceSpecial` attribute in UEM XML configuration files (like shortcuts and printer mappings for example).

If this attribute is used, it only has effect if `run-once` is enabled, and the User Profile type is `local`.

This is how the behavior works technically:

- If no `run once` flag file exists matching `.[L-computername.1]`, we check for `.[L-*.1]`.
- If match is found, we consider the UEM action as having run before, but we also create `.[L-computername.1]` (in the standard way, so at logoff) to ensure that run-once logic remains working correctly in case the special attribute is cleared later on.

How to enable:

- Manually edit the UEM configuration file (i.e. the `Notepad.XML` file for the shortcut to Notepad)
- Add the XML-attribuut: `runOnceSpecial="1"`
- The result looks something like this: `... runOnce="1 "runOnceSpecial="1" ...`

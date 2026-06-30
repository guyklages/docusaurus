---
title: KB - How to allowlist blocked applications
authors: [guyklages]
tags: [vm]
---

## Introduction

VMware User Environment Manager comes with built-in templates for some common applications such as Office and Adobe Reader, which are optimized and typically work for most customers.

In some scenarios, customers want to create those templates themselves by using the UEM Application Profiler. The problem is that the Application Profiler has a built-in blacklist to make sure customers use the provided templates.

If you want to work around this limitation, there is an option available to allowlist those applications and still use the Application Profiler to create your own UEM Configuration files.

## Solution

Add the following registry key to be able to profile applications that are blocked by default:

``` 
[HKEY_CURRENT_USER\Software\Immidio\Application Profiler\2.0\Profiling\Options\WhiteListedApps]
```

Create a `reg_sz` value with a random name, for instance `1` and make the value the executable name, as in:

"1"="acrord32.exe" <br/>
"2"="winword.exe" <br/>
"3"="outlook.exe"

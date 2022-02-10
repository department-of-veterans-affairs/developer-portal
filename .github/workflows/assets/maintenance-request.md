---
name: Maintenance Request
about: Request a change to Lab/Sandbox or the Production environment.
title: __mr_summary__ (YYYY/MM/DD HH:MM ET)
labels: maintenance-request
assignees: golavarr-va
---

# MAINTENANCE REQUEST

```
Environment ... dsva-production
Product ....... developer-portal
Start ......... __proposed_start_date_time__
End ........... __proposed_end_date_time__
Release Tag ... __release_tag__
--
Rollback Tag .. __rollback_tag__
```

**SLA OR PERFORMANCE IMPACTS**

<!-- Is this change expected to temporarily cause product outages or impact its performance? Enter "N/A" if not applicable. -->

- N/A

**WHAT MAINTAINERS SEE NOW VS AFTER**

<!-- Describe the initial state vs the final state of the product after the updates. For an application, this could be current version vs future version. -->

MAINTAINER_NOTES

**WHAT USERS SEE NOW VS AFTER**

<!-- Describe how this maintenance will impact end-users of the product. -->

USER_NOTES

**DEPLOYMENT PROCEDURE**

<!-- List the deployment steps you will follow in this MR. -->

1. `DEPLOYMENT_COMMAND`

**ROLLBACK PROCEDURE**

<!-- List the rollback steps you will follow in this MR. -->

1. `ROLLBACK_COMMAND`

# 2. Allowed Pod Disruption

Date: 2022-07-19

## Status

Accepted

## Context

Node recycling maintenance occurs in cloud platform explained [here](https://user-guide.cloud-platform.service.justice.gov.uk/documentation/other-topics/pod-distruption-budgets-cluster-maintenance.html#settin%5B%E2%80%A6%5Dnumber)

## Decision

Don't enable PodDisruptionBudget

## Consequences

There will be downtime when this occurs, while downtime there will be no reduction or contracted hours changes processed resulting in delayed workload calculations for the staff which changed

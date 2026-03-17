---
template_version: "3.0.0"
---

# EPIC-002 Personalized Matcha Recommendations

> **State**: Planned  
> **Lifecycle**: v0.7 Build Execution (See `README.md`)  
> **Epic Lead**: Product Engineering Agent

---

## Session State (The "Brain Dump")

- **Last Action**: Epic scaffolded for recommendation system
- **Stopping Point**: Ready to design recommendation logic
- **Next Steps**: Implement `GET /api/recommendations`
- **Context**: Recommendations are based on user matcha taste preferences.

---

## Objective & Scope

> **Goal**: Provide personalized cafe recommendations based on user matcha preferences.

### Deliverables

- [ ] User preference onboarding storage
- [ ] Recommendation API endpoint
- [ ] Recommendation ranking logic
- [ ] UI section showing recommended cafes

### Out of Scope

- Machine learning ranking
- Social recommendations
- Trending cafes algorithm

---

## Context & IDs

- **Business Rules**: `BR-002`, `BR-003`
- **User Journeys**: `UJ-101`
- **APIs**: `API-002`
- **Data Model**: `DBT-001`, `DBT-101`, `DBT-301`
- **Tests**: `TEST-001`, `TEST-301`

---

# Execution Plan (The 5 Phases)

## Phase A: Plan

- [ ] **Context Loaded**: Read PRD and SoT docs
- [ ] **Strategy**: Build preference storage first, then recommendation API

---

## Phase B: Design

- [ ] **Specs Updated**: Confirm schema for `Matcha Preferences`
- [ ] **Architecture**:

Recommendation logic uses:

User Preferences

Cafe attributes

Review ratings
= Match Score


---

# Phase C: Build (The "Context Window")

## Context Window 1: Preferences Backend

- [ ] **Step 1**: Store preferences in `DBT-101`
- [ ] **Step 2**: Create onboarding preference form
- [ ] **Test**: Run `TEST-001`

---

## Context Window 2: Recommendation Engine

- [ ] **Step 1**: Implement `/api/recommendations`
- [ ] **Step 2**: Compute match score
- [ ] **Step 3**: Rank cafes

Example output:

```json
[
  {
    "cafe": "Matcha House",
    "score": 0.91
  }
]


 Test: Run TEST-301

Phase D: Validate

 Run automated tests

 Validate recommendation flow

 Confirm // @implements API-002

Phase E: Finish (Harvest)

 Spec updates finalized

 Tests passing

 Session State updated

Agent Observations
#	Observation	Proposed Action	Triage
1	Recommendation ranking may need weighting	Add BR rule	Pending
Change Log
Date	Agent	Action
2026-03-14	Product Agent	Created EPIC
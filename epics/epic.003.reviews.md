---
template_version: "3.0.0"
---

# EPIC-003 Matcha Reviews

> **State**: Planned  
> **Lifecycle**: v0.7 Build Execution  
> **Epic Lead**: Product Engineering Agent

---

## Session State (The "Brain Dump")

- **Last Action**: Epic initialized
- **Stopping Point**: Ready to implement review API
- **Next Steps**: Create `POST /api/reviews`
- **Context**: Users can review matcha drinks at cafes.

---

## Objective & Scope

> **Goal**: Allow users to submit and view matcha reviews for cafes.

### Deliverables

- [ ] Review submission API
- [ ] Reviews database storage
- [ ] Review display on cafe page
- [ ] Rating system

### Out of Scope

- Review moderation tools
- Social commenting

---

## Context & IDs

- **Business Rules**: `BR-101`, `BR-401`
- **User Journeys**: `UJ-104`
- **APIs**: `API-003`
- **Data Model**: `DBT-102`
- **Tests**: `TEST-002`, `TEST-102`

---

# Execution Plan (The 5 Phases)

## Phase A: Plan

- [ ] Load system context
- [ ] Build backend first

---

## Phase B: Design

Review object structure:


User
Cafe
Rating
Flavor Notes
Photo


---

# Phase C: Build (The "Context Window")

## Context Window 1: Review Backend

- [ ] **Step 1**: Create `POST /api/reviews`
- [ ] **Step 2**: Validate user authentication
- [ ] **Step 3**: Save review to `DBT-102`

- [ ] **Test**: Run `TEST-102`

---

## Context Window 2: Review UI

- [ ] **Step 1**: Add review form
- [ ] **Step 2**: Display reviews on cafe page
- [ ] **Test**: Verify `UJ-104`

---

# Phase D: Validate

- [ ] Run unit tests
- [ ] Validate authentication rule
- [ ] Confirm `// @implements API-003`

---

# Phase E: Finish (Harvest)

- [ ] Spec consistency check
- [ ] Test pass verification
- [ ] Session state updated

### Agent Observations

| # | Observation | Proposed Action | Triage |
|---|-------------|-----------------|--------|
| 1 | Reviews might require spam protection | Add rate limit rule | Pending |

---

# Change Log

| Date | Agent | Action |
|------|------|--------|
| 2026-03-14 | Product Agent | Created EPIC |
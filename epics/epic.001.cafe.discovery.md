---
template_version: "3.0.0"
---

# EPIC-001 Cafe Discovery

> **State**: Planned  
> **Lifecycle**: v0.7 Build Execution (See `README.md`)  
> **Epic Lead**: Product Engineering Agent

---

## Session State (The "Brain Dump")

> **Crucial**: Update this section before ending every session.

- **Last Action**: Epic created and initial execution plan defined
- **Stopping Point**: Ready to begin Phase A planning
- **Next Steps**: Implement backend endpoint `GET /api/cafes`
- **Context**: This feature enables users to discover cafes serving matcha drinks.

---

## Objective & Scope

> **Goal**: Allow users to browse and discover cafes that serve matcha drinks.

### Deliverables

- [ ] API endpoint to fetch matcha cafes
- [ ] Database queries for cafe discovery
- [ ] Frontend cafe list or map view
- [ ] Filtering support (location / rating)
- [ ] Integration with user journeys

### Out of Scope

- Personalized recommendations
- Reviews
- Favorites system

---

## Context & IDs

> **Rule**: List all referenced IDs from `SoT/`.

- **Business Rules**: `BR-001`
- **User Journeys**: `UJ-102`
- **APIs**: `API-001`
- **Data Model**: `DBT-002`
- **Tests**: `TEST-101`, `TEST-201`

---

# Execution Plan (The 5 Phases)

## Phase A: Plan

- [ ] **Context Loaded**: Read `PRD.md`, `SoT/`, and `README.md`
- [ ] **Strategy**: Build backend API first, then implement frontend discovery UI

---

## Phase B: Design

- [ ] **Specs Updated**: Confirm API contract for `API-001`
- [ ] **Architecture**:
  - Backend route `/api/cafes`
  - Query cafes table
  - Return list of cafes serving matcha

Example response:

```json
[
  {
    "id": "cafe_123",
    "name": "Matcha House",
    "location": "New York",
    "rating": 4.7
  }
]
Phase C: Build (The "Context Window")
Context Window 1: Backend API

 Step 1: Create route GET /api/cafes

 Step 2: Query DBT-002 Cafes table

 Step 3: Filter cafes where has_matcha = true

 Test: Run integration test TEST-101

Context Window 2: Frontend Discovery UI

 Step 1: Create /discover page

 Step 2: Fetch data from /api/cafes

 Step 3: Render cafe cards

Example UI:

Cafe Name
Rating
Location
View Details


 Test: Verify flow matches UJ-102

Phase D: Validate

 Automated Tests: Run npm test

 Manual Check:

Open /discover

Confirm cafes load correctly

 Code Traceability:

Ensure code includes:

 // @implements API-001
 // @implements TEST-101

Phase E: Finish (Harvest)

 Temp Cleanup

 Spec Finalization

 Session Audit

 Agent Observations

Agent Observations
#	Observation	Proposed Action	Triage
1	Cafes need geolocation fields for maps	Update DBT-002 schema	Pending
Change Log
Date	Agent	Action
2026-03-14	Product Agent	Created EPIC
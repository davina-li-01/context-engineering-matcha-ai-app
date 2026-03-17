---
version: 1.0
purpose: Source of Truth for business rules and operational constraints.
id_prefix: BR-XXX
last_updated: 2026-03-14
authority: This is a SoT file - IDs here are referenced by PRD.md, SoT.API_CONTRACTS.md, EPICs, and code
---

# Business Rules (SoT File)

> **Purpose**: Complete specifications for business constraints, pricing rules, and enforcement policies.  
> **ID Prefix**: BR-XXX  
> **Status**: Active SoT file  
> **Cross-References**: Referenced by PRD.md, SoT.API_CONTRACTS.md, SoT.USER_JOURNEYS.md, SoT.TESTING.md, EPICs  

---

# Navigation by Category

### Pricing & Entitlements (BR-001 to BR-099)

- [BR-001](#br-001-matcha-only-cafe-listings) - Matcha-only cafe listings
- [BR-002](#br-002-preference-onboarding-required) - Preference onboarding required
- [BR-003](#br-003-personalized-recommendations-priority) - Personalized recommendations priority

### Data & Security (BR-101 to BR-199)

- [BR-101](#br-101-user-review-authentication) - User review authentication

### User Permissions (BR-201 to BR-299)

- [BR-201](#br-201-user-can-save-favorite-cafes) - User can save favorite cafes

### Compliance & Legal (BR-301 to BR-399)

*(None currently defined)*

### Performance & Limits (BR-401 to BR-499)

- [BR-401](#br-401-review-rate-limit) - Review rate limit

---

# BR-001: Matcha-only Cafe Listings

**ID**: BR-001  
**Category**: Data  
**Status**: Active  
**Severity**: Critical  
**Created**: 2026-03-14  
**Last Updated**: 2026-03-14  

### Rule Statement

Only cafes that serve at least one matcha drink MUST appear in MatchaMap search and recommendation results.

### Rationale

**Business Driver**

MatchaMap is designed specifically for matcha discovery. Including cafes without matcha offerings would dilute the product experience.

**User Impact**

Users can trust that every cafe in the platform serves matcha.

### Enforcement

**Location**: Server  
**Timing**: During cafe data ingestion and search queries.

### Related IDs

- [API-001](SoT.API_CONTRACTS.md#api-001) - Cafe listing endpoint  
- [UJ-101](SoT.USER_JOURNEYS.md#uj-101) - Discover matcha cafes  

### Error Handling

**Error Code**

`BR_001_VIOLATION`

**User Message**

"This cafe does not currently offer matcha drinks."

**Recovery**

Cafe listing must be updated to include a matcha drink before appearing in results.

---

# BR-002: Preference Onboarding Required

**ID**: BR-002  
**Category**: Permissions  
**Status**: Active  
**Severity**: High  
**Created**: 2026-03-14  
**Last Updated**: 2026-03-14  

### Rule Statement

Users MUST complete the matcha taste preference onboarding survey before receiving personalized recommendations.

### Rationale

**Business Driver**

The recommendation system depends on taste preferences to generate accurate results.

**User Impact**

Users must answer a short survey before accessing recommendation features.

### Enforcement

**Location**: Client and Server  
**Timing**: On first app session and before accessing recommendations.

### Related IDs

- [API-002](SoT.API_CONTRACTS.md#api-002) - Recommendations endpoint  
- [UJ-101](SoT.USER_JOURNEYS.md#uj-101) - Preference onboarding journey  

### Error Handling

**Error Code**

`BR_002_VIOLATION`

**User Message**

"Please complete your matcha preference profile to see recommendations."

**Recovery**

User is redirected to onboarding survey.

---

# BR-003: Personalized Recommendations Priority

**ID**: BR-003  
**Category**: Data  
**Status**: Active  
**Severity**: High  
**Created**: 2026-03-14  
**Last Updated**: 2026-03-14  

### Rule Statement

Cafe recommendations MUST prioritize taste compatibility with the user's matcha preference profile over geographic proximity.

### Rationale

**Business Driver**

MatchaMap differentiates itself by offering personalized discovery rather than simple location search.

**User Impact**

Users receive higher quality matcha recommendations tailored to their taste.

### Enforcement

**Location**: Server (Recommendation engine)

**Timing**

When generating personalized cafe recommendations.

### Related IDs

- [API-002](SoT.API_CONTRACTS.md#api-002) - Recommendation endpoint  
- [UJ-101](SoT.USER_JOURNEYS.md#uj-101) - Discover matcha cafes  

### Error Handling

**Error Code**

`BR_003_VIOLATION`

**User Message**

"Unable to generate personalized recommendations."

**Recovery**

Fallback to location-based cafe discovery.

---

# BR-101: User Review Authentication

**ID**: BR-101  
**Category**: Data  
**Status**: Active  
**Severity**: High  
**Created**: 2026-03-14  
**Last Updated**: 2026-03-14  

### Rule Statement

Users MUST be authenticated before submitting matcha drink reviews.

### Rationale

**Business Driver**

Prevents spam reviews and ensures review accountability.

**User Impact**

Users must create an account or log in before posting reviews.

### Enforcement

**Location**

Server

**Timing**

When submitting a review.

### Related IDs

- [API-003](SoT.API_CONTRACTS.md#api-003) - Review submission endpoint  
- [UJ-104](SoT.USER_JOURNEYS.md#uj-104) - Submit review journey  

### Error Handling

**Error Code**

`BR_101_VIOLATION`

**User Message**

"You must log in to submit a review."

**Recovery**

Prompt login or account creation.

---

# BR-201: User Can Save Favorite Cafes

**ID**: BR-201  
**Category**: Permissions  
**Status**: Active  
**Severity**: Medium  
**Created**: 2026-03-14  
**Last Updated**: 2026-03-14  

### Rule Statement

Users MUST be able to save cafes to a personal favorites list.

### Rationale

**Business Driver**

Saving cafes encourages repeat engagement and long-term user retention.

**User Impact**

Users can create a personalized list of matcha cafes they want to revisit.

### Enforcement

**Location**

Client and Server

**Timing**

When user selects "Save Cafe".

### Related IDs

- [API-004](SoT.API_CONTRACTS.md#api-004) - Save favorite endpoint  
- [UJ-103](SoT.USER_JOURNEYS.md#uj-103) - Save cafe journey  

### Error Handling

**Error Code**

`BR_201_VIOLATION`

**User Message**

"Unable to save cafe."

**Recovery**

Retry action or refresh session.

---

# BR-401: Review Rate Limit

**ID**: BR-401  
**Category**: Performance  
**Status**: Active  
**Severity**: Medium  
**Created**: 2026-03-14  
**Last Updated**: 2026-03-14  

### Rule Statement

A user MUST NOT submit more than 10 reviews within a 24-hour period.

### Rationale

**Business Driver**

Prevents spam reviews and abuse.

**User Impact**

Users may occasionally be asked to wait before submitting additional reviews.

### Enforcement

**Location**

Server

**Timing**

During review submission.

### Related IDs

- [API-003](SoT.API_CONTRACTS.md#api-003) - Review submission endpoint  

### Error Handling

**Error Code**

`BR_401_VIOLATION`

**User Message**

"You have reached the daily review limit."

**Recovery**

User can submit additional reviews after 24 hours.

---

# Deprecated Rules

*(None currently)*

---

# Cross-Reference Index

### Rules by API

- API-001 enforces: BR-001  
- API-002 enforces: BR-002, BR-003  
- API-003 enforces: BR-101, BR-401  

### Rules by Severity

Critical

- BR-001

High

- BR-002
- BR-003
- BR-101

Medium

- BR-201
- BR-401

---

# Update Protocol

### When to Add New BR-XXX IDs

1. New business constraint affecting product behavior  
2. New pricing or subscription rule  
3. Legal or compliance requirement  

### Bidirectional Reference Checklist

When adding a new BR-XXX:

- [ ] Update SoT.API_CONTRACTS.md
- [ ] Update SoT.USER_JOURNEYS.md
- [ ] Update SoT.TESTING.md
- [ ] Update EPIC documentation
- [ ] Update SoT.UNIQUE_ID_SYSTEM.md registry

---

*End of SoT.BUSINESS_RULES.md — Authoritative source for all BR-XXX IDs*
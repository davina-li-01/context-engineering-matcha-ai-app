---
version: 1.0
purpose: Source of Truth for user journeys and product flows.
id_prefix: UJ-XXX
last_updated: 2026-03-14
authority: This is a SoT file - IDs here are referenced by PRD.md, EPICs, API contracts, and testing.
---

# User Journeys (SoT File)

> **Purpose**: Defines how users interact with the product through structured journeys.  
> **ID Prefix**: UJ-XXX  
> **Status**: Active SoT file  
> **Cross-References**: Referenced by PRD.md, SoT.BUSINESS_RULES.md, SoT.API_CONTRACTS.md, SoT.TESTING.md, EPICs

---

# Navigation

### Core User Flows

- [UJ-101](#uj-101-onboard-and-set-matcha-preferences) – Onboard and set matcha preferences
- [UJ-102](#uj-102-discover-matcha-cafes) – Discover matcha cafes
- [UJ-103](#uj-103-save-a-favorite-cafe) – Save a favorite cafe
- [UJ-104](#uj-104-submit-a-matcha-review) – Submit a matcha review

---

# UJ-101: Onboard and Set Matcha Preferences

**ID**: UJ-101  
**Status**: Active  
**Priority**: Critical  
**Created**: 2026-03-14  
**Last Updated**: 2026-03-14  

---

## Journey Overview

A new user signs up for MatchaMap and completes a short onboarding survey to establish their matcha taste preferences.

These preferences power personalized recommendations.

---

## Actors

Primary Actor

- User

Supporting Systems

- Recommendation Engine
- User Profile Service

---

## Entry Conditions

- User opens the app for the first time.
- User account may or may not exist yet.

---

## Steps

1. User opens MatchaMap.
2. User is prompted to create an account or log in.
3. User begins matcha preference onboarding.
4. User answers questions such as:
   - preferred sweetness level
   - matcha strength
   - milk vs no milk
   - hot vs iced preference
5. System stores preference data in the user profile.
6. User completes onboarding.
7. User is redirected to personalized cafe discovery.

---

## Business Rules Enforced

- [BR-002](SoT.BUSINESS_RULES.md#br-002-preference-onboarding-required)

---

## Success Outcome

User profile now contains matcha taste preferences and the system can generate personalized recommendations.

---

## Failure Scenarios

User skips onboarding.

**Resolution**

User is reminded that onboarding is required before recommendations can be generated.

---

# UJ-102: Discover Matcha Cafes

**ID**: UJ-102  
**Status**: Active  
**Priority**: Critical  
**Created**: 2026-03-14  
**Last Updated**: 2026-03-14  

---

## Journey Overview

Users explore nearby cafes that serve matcha drinks and receive personalized recommendations based on their taste preferences.

---

## Actors

Primary Actor

- User

Supporting Systems

- Recommendation Engine
- Cafe Database
- Location Services

---

## Entry Conditions

- User has completed onboarding.
- User is logged in.

---

## Steps

1. User opens the discovery page.
2. System detects user location or prompts for location access.
3. System retrieves cafes that serve matcha.
4. Recommendation engine ranks cafes based on:
   - taste compatibility
   - popularity
   - proximity
5. System displays recommended cafes on a list or map.
6. User taps a cafe to view details.

---

## Business Rules Enforced

- [BR-001](SoT.BUSINESS_RULES.md#br-001-matcha-only-cafe-listings)
- [BR-003](SoT.BUSINESS_RULES.md#br-003-personalized-recommendations-priority)

---

## Success Outcome

User finds a cafe that matches their matcha preferences.

---

## Failure Scenarios

Location cannot be detected.

**Resolution**

User manually enters location.

---

# UJ-103: Save a Favorite Cafe

**ID**: UJ-103  
**Status**: Active  
**Priority**: Medium  
**Created**: 2026-03-14  
**Last Updated**: 2026-03-14  

---

## Journey Overview

Users save cafes they like so they can easily revisit them later.

---

## Actors

Primary Actor

- User

Supporting Systems

- Favorites Service
- User Profile Database

---

## Entry Conditions

- User is logged in.
- User is viewing a cafe page.

---

## Steps

1. User opens a cafe detail page.
2. User taps the "Save Cafe" button.
3. System adds cafe to the user's favorites list.
4. User receives confirmation message.
5. Cafe appears in user's saved cafes list.

---

## Business Rules Enforced

- [BR-201](SoT.BUSINESS_RULES.md#br-201-user-can-save-favorite-cafes)

---

## Success Outcome

Cafe is successfully stored in user's favorites.

---

## Failure Scenarios

Network error occurs during save.

**Resolution**

System prompts user to retry.

---

# UJ-104: Submit a Matcha Review

**ID**: UJ-104  
**Status**: Active  
**Priority**: High  
**Created**: 2026-03-14  
**Last Updated**: 2026-03-14  

---

## Journey Overview

Users write reviews about matcha drinks they tried at cafes to help other users discover quality matcha.

---

## Actors

Primary Actor

- User

Supporting Systems

- Review Service
- Moderation System

---

## Entry Conditions

- User is logged in.
- User is viewing a cafe page.

---

## Steps

1. User taps "Write Review".
2. User selects the matcha drink they tried.
3. User provides:
   - rating
   - flavor notes
   - optional photo
4. User submits the review.
5. System stores review and attaches it to the cafe page.

---

## Business Rules Enforced

- [BR-101](SoT.BUSINESS_RULES.md#br-101-user-review-authentication)
- [BR-401](SoT.BUSINESS_RULES.md#br-401-review-rate-limit)

---

## Success Outcome

Review is successfully published and visible to other users.

---

## Failure Scenarios

User exceeds daily review limit.

**Resolution**

User receives limit message and can try again later.

---

# Cross-Reference Index

### Journeys by Business Rule

BR-001

- UJ-102

BR-002

- UJ-101

BR-003

- UJ-102

BR-101

- UJ-104

BR-201

- UJ-103

BR-401

- UJ-104

---

# Update Protocol

### When to Add New UJ-XXX IDs

1. New feature introduces a user interaction flow
2. Existing flow significantly changes
3. Product expansion creates a new journey

---

### Bidirectional Reference Checklist

When adding a new UJ-XXX:

- [ ] Update PRD.md
- [ ] Update SoT.BUSINESS_RULES.md
- [ ] Update SoT.API_CONTRACTS.md
- [ ] Update SoT.TESTING.md
- [ ] Update EPIC documentation

---

*End of SoT.USER_JOURNEYS.md — Authoritative source for all UJ-XXX user flows*
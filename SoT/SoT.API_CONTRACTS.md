---
version: 1.0
purpose: Source of Truth for API endpoint specifications and contracts.
id_prefix: API-XXX
last_updated: 2026-03-14
authority: This is a SoT file - IDs here are referenced by PRD.md, SoT.USER_JOURNEYS.md, SoT.TESTING.md, EPICs, and code
---

# API Contracts (SoT File)

> **Purpose**: Specifications for all API endpoints and integrations.  
> **ID Prefix**: API-XXX  
> **Status**: Active SoT file  
> **Cross-References**: Referenced by PRD.md, SoT.USER_JOURNEYS.md, SoT.BUSINESS_RULES.md, SoT.TESTING.md, EPICs

---

# Navigation by Category

### Public APIs (API-001 to API-099)

- [API-001](#api-001-get-matcha-cafes) – Get matcha cafes
- [API-002](#api-002-get-personalized-recommendations) – Get personalized cafe recommendations
- [API-003](#api-003-submit-matcha-review) – Submit matcha review
- [API-004](#api-004-save-favorite-cafe) – Save favorite cafe

### Internal APIs (API-101 to API-199)

*(None yet)*

### Webhooks (API-201 to API-299)

*(None yet)*

### Background Jobs (API-301 to API-399)

*(None yet)*

---

# API-001: Get Matcha Cafes

**ID**: API-001  
**Category**: Public  
**Status**: Active  
**Created**: 2026-03-14  
**Last Updated**: 2026-03-14  

---

## Specification

**Method**

GET

**Path**

`/api/v1/cafes`

**Auth**

None

---

## Purpose

Returns a list of cafes that serve matcha drinks.

This endpoint powers the main cafe discovery feed.

---

## Request

### Parameters

location: string
radius: number (optional)
limit: number (optional)


Example

/api/v1/cafes?location=boston&radius=10


---

## Response

**Success (200)**

{
success: true,
data: [
{
id: "cafe_123",
name: "Matcha Garden",
location: "Boston, MA",
rating: 4.7
}
]
}


**Errors**

- 400 Invalid parameters
- 500 Server error

---

## Related IDs

- [UJ-102](SoT.USER_JOURNEYS.md#uj-102-discover-matcha-cafes) – Discover matcha cafes
- [BR-001](SoT.BUSINESS_RULES.md#br-001-matcha-only-cafe-listings)

---

# API-002: Get Personalized Recommendations

**ID**: API-002  
**Category**: Public  
**Status**: Active  
**Created**: 2026-03-14  
**Last Updated**: 2026-03-14  

---

## Specification

**Method**

GET

**Path**

`/api/v1/recommendations`

**Auth**

Bearer Token

---

## Purpose

Returns cafes ranked according to the user's matcha taste preferences.

---

## Request

### Parameters

user_id: string
location: string
limit: number (optional)


---

## Response

**Success (200)**

{
success: true,
data: [
{
cafe_id: "cafe_123",
match_score: 0.92,
name: "Kyoto Matcha Bar"
}
]
}


**Errors**

- 401 Unauthorized
- 422 Preference profile missing
- 500 Server error

---

## Related IDs

- [UJ-101](SoT.USER_JOURNEYS.md#uj-101-onboard-and-set-matcha-preferences)
- [UJ-102](SoT.USER_JOURNEYS.md#uj-102-discover-matcha-cafes)
- [BR-002](SoT.BUSINESS_RULES.md#br-002-preference-onboarding-required)
- [BR-003](SoT.BUSINESS_RULES.md#br-003-personalized-recommendations-priority)

---

# API-003: Submit Matcha Review

**ID**: API-003  
**Category**: Public  
**Status**: Active  
**Created**: 2026-03-14  
**Last Updated**: 2026-03-14  

---

## Specification

**Method**

POST

**Path**

`/api/v1/reviews`

**Auth**

Bearer Token

---

## Purpose

Allows authenticated users to submit reviews for matcha drinks at cafes.

---

## Request

### Body

{
cafe_id: string,
user_id: string,
rating: number,
flavor_notes: string,
photo_url: string (optional)
}


---

## Response

**Success (200)**

{
success: true,
data: {
review_id: "rev_456"
}
}


**Errors**

- 401 Unauthorized
- 422 Invalid review data
- 429 Review rate limit exceeded

---

## Related IDs

- [UJ-104](SoT.USER_JOURNEYS.md#uj-104-submit-a-matcha-review)
- [BR-101](SoT.BUSINESS_RULES.md#br-101-user-review-authentication)
- [BR-401](SoT.BUSINESS_RULES.md#br-401-review-rate-limit)

---

# API-004: Save Favorite Cafe

**ID**: API-004  
**Category**: Public  
**Status**: Active  
**Created**: 2026-03-14  
**Last Updated**: 2026-03-14  

---

## Specification

**Method**

POST

**Path**

`/api/v1/favorites`

**Auth**

Bearer Token

---

## Purpose

Allows users to save cafes to their favorites list.

---

## Request

### Body

{
user_id: string,
cafe_id: string
}


---

## Response

**Success (200)**

{
success: true,
message: "Cafe saved to favorites"
}


**Errors**

- 401 Unauthorized
- 404 Cafe not found
- 500 Server error

---

## Related IDs

- [UJ-103](SoT.USER_JOURNEYS.md#uj-103-save-a-favorite-cafe)
- [BR-201](SoT.BUSINESS_RULES.md#br-201-user-can-save-favorite-cafes)

---

# Deprecated Endpoints

*(None currently)*

---

# Cross-Reference Index

## Endpoints by Journey

UJ-101 calls

- API-002

UJ-102 calls

- API-001
- API-002

UJ-103 calls

- API-004

UJ-104 calls

- API-003

---

## Endpoints by Business Rule

BR-001 enforced by

- API-001

BR-002 enforced by

- API-002

BR-003 enforced by

- API-002

BR-101 enforced by

- API-003

BR-201 enforced by

- API-004

BR-401 enforced by

- API-003

---

# Update Protocol

### When to Add New API-XXX IDs

1. New public or internal API endpoint
2. New webhook integration
3. New background processing job

---

### Bidirectional Reference Checklist

When adding a new API-XXX:

- [ ] Update SoT.USER_JOURNEYS.md "APIs Used"
- [ ] Update SoT.BUSINESS_RULES.md if rule enforced
- [ ] Update SoT.TESTING.md with endpoint tests
- [ ] Update EPIC documentation
- [ ] Update SoT.UNIQUE_ID_SYSTEM.md if used

---

*End of SoT.API_CONTRACTS.md — Authoritative source for all API-XXX IDs*
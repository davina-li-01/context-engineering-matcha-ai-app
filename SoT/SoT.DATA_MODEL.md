---
version: 1.0
purpose: Source of Truth for database schema and data model specifications.
id_prefix: DBT-XXX
last_updated: 2026-03-14
authority: This is a SoT file - IDs here are referenced by PRD.md, SoT.API_CONTRACTS.md, SoT.USER_JOURNEYS.md, EPICs
---

# Data Model (SoT File)

> **Purpose**: Database tables, views, and relationships for the product.  
> **ID Prefix**: DBT-XXX  
> **Status**: Active SoT file  
> **Cross-References**: Referenced by PRD.md, SoT.API_CONTRACTS.md, SoT.USER_JOURNEYS.md, SoT.BUSINESS_RULES.md, SoT.TESTING.md

---

# Navigation by Category

### Core Tables (DBT-001 to DBT-099)

- [DBT-001](#dbt-001-users) - Users
- [DBT-002](#dbt-002-cafes) - Cafes

### Feature Tables (DBT-101 to DBT-199)

- [DBT-101](#dbt-101-matcha-preferences) - Matcha Preferences
- [DBT-102](#dbt-102-reviews) - Reviews

### Junction Tables (DBT-201 to DBT-299)

- [DBT-201](#dbt-201-favorites) - Favorites

### Views (DBT-301 to DBT-399)

- [DBT-301](#dbt-301-cafe-recommendations-view) - Cafe Recommendations View

---

# DBT-001: Users

**ID**: DBT-001  
**Category**: Core  
**Status**: Active  
**Created**: 2026-03-14  
**Last Updated**: 2026-03-14  

### Purpose

Stores user accounts for MatchaMap including authentication references and profile metadata.

### Columns

| Column | Type | Required | Description |
|------|------|------|-------------|
| `id` | UUID | Yes | Primary key |
| `email` | TEXT | Yes | User email address |
| `created_at` | TIMESTAMPTZ | Yes | Account creation time |
| `updated_at` | TIMESTAMPTZ | Yes | Last profile update |

### Key Indexes

- Primary key on `id`
- Unique index on `email`

### Related IDs

- [API-002](SoT.API_CONTRACTS.md#api-002-get-personalized-recommendations)
- [API-003](SoT.API_CONTRACTS.md#api-003-submit-matcha-review)
- [API-004](SoT.API_CONTRACTS.md#api-004-save-favorite-cafe)
- [UJ-101](SoT.USER_JOURNEYS.md#uj-101-onboard-and-set-matcha-preferences)

### Foreign Keys

- Referenced by DBT-101 (user_id)
- Referenced by DBT-102 (user_id)
- Referenced by DBT-201 (user_id)

---

# DBT-002: Cafes

**ID**: DBT-002  
**Category**: Core  
**Status**: Active  
**Created**: 2026-03-14  
**Last Updated**: 2026-03-14  

### Purpose

Stores cafe locations that serve matcha drinks.

### Columns

| Column | Type | Required | Description |
|------|------|------|-------------|
| `id` | UUID | Yes | Primary key |
| `name` | TEXT | Yes | Cafe name |
| `location` | TEXT | Yes | City or address |
| `latitude` | FLOAT | No | Latitude coordinate |
| `longitude` | FLOAT | No | Longitude coordinate |
| `has_matcha` | BOOLEAN | Yes | Whether cafe serves matcha |
| `rating` | FLOAT | No | Average user rating |
| `created_at` | TIMESTAMPTZ | Yes | Creation timestamp |
| `updated_at` | TIMESTAMPTZ | Yes | Last update |

### Key Indexes

- Primary key on `id`
- Index on `location`
- Index on `has_matcha`

### Related IDs

- [API-001](SoT.API_CONTRACTS.md#api-001-get-matcha-cafes)
- [API-002](SoT.API_CONTRACTS.md#api-002-get-personalized-recommendations)
- [UJ-102](SoT.USER_JOURNEYS.md#uj-102-discover-matcha-cafes)
- [BR-001](SoT.BUSINESS_RULES.md#br-001-matcha-only-cafe-listings)

### Foreign Keys

- Referenced by DBT-102 (cafe_id)
- Referenced by DBT-201 (cafe_id)

---

# DBT-101: Matcha Preferences

**ID**: DBT-101  
**Category**: Feature  
**Status**: Active  
**Created**: 2026-03-14  
**Last Updated**: 2026-03-14  

### Purpose

Stores each user's matcha taste preferences used for personalized recommendations.

### Columns

| Column | Type | Required | Description |
|------|------|------|-------------|
| `id` | UUID | Yes | Primary key |
| `user_id` | UUID | Yes | Associated user |
| `sweetness_level` | INTEGER | Yes | Preferred sweetness |
| `matcha_strength` | INTEGER | Yes | Matcha intensity preference |
| `milk_preference` | TEXT | Yes | Milk or no milk |
| `temperature_preference` | TEXT | Yes | Hot or iced |
| `created_at` | TIMESTAMPTZ | Yes | Creation timestamp |

### Key Indexes

- Primary key on `id`
- Index on `user_id`

### Related IDs

- [API-002](SoT.API_CONTRACTS.md#api-002-get-personalized-recommendations)
- [UJ-101](SoT.USER_JOURNEYS.md#uj-101-onboard-and-set-matcha-preferences)
- [BR-002](SoT.BUSINESS_RULES.md#br-002-preference-onboarding-required)

### Foreign Keys

- References DBT-001 (user_id → id)

---

# DBT-102: Reviews

**ID**: DBT-102  
**Category**: Feature  
**Status**: Active  
**Created**: 2026-03-14  
**Last Updated**: 2026-03-14  

### Purpose

Stores user-submitted reviews of matcha drinks at cafes.

### Columns

| Column | Type | Required | Description |
|------|------|------|-------------|
| `id` | UUID | Yes | Primary key |
| `user_id` | UUID | Yes | User submitting review |
| `cafe_id` | UUID | Yes | Cafe reviewed |
| `rating` | INTEGER | Yes | Numeric rating |
| `flavor_notes` | TEXT | No | User tasting notes |
| `photo_url` | TEXT | No | Optional photo |
| `created_at` | TIMESTAMPTZ | Yes | Review creation time |

### Key Indexes

- Primary key on `id`
- Index on `cafe_id`
- Index on `user_id`

### Related IDs

- [API-003](SoT.API_CONTRACTS.md#api-003-submit-matcha-review)
- [UJ-104](SoT.USER_JOURNEYS.md#uj-104-submit-a-matcha-review)
- [BR-101](SoT.BUSINESS_RULES.md#br-101-user-review-authentication)
- [BR-401](SoT.BUSINESS_RULES.md#br-401-review-rate-limit)

### Foreign Keys

- References DBT-001 (user_id → id)
- References DBT-002 (cafe_id → id)

---

# DBT-201: Favorites

**ID**: DBT-201  
**Category**: Junction  
**Status**: Active  
**Created**: 2026-03-14  
**Last Updated**: 2026-03-14  

### Purpose

Stores cafes saved by users as favorites.

### Columns

| Column | Type | Required | Description |
|------|------|------|-------------|
| `id` | UUID | Yes | Primary key |
| `user_id` | UUID | Yes | User who saved cafe |
| `cafe_id` | UUID | Yes | Saved cafe |
| `created_at` | TIMESTAMPTZ | Yes | Save timestamp |

### Key Indexes

- Primary key on `id`
- Composite index on `user_id + cafe_id`

### Related IDs

- [API-004](SoT.API_CONTRACTS.md#api-004-save-favorite-cafe)
- [UJ-103](SoT.USER_JOURNEYS.md#uj-103-save-a-favorite-cafe)
- [BR-201](SoT.BUSINESS_RULES.md#br-201-user-can-save-favorite-cafes)

### Foreign Keys

- References DBT-001 (user_id → id)
- References DBT-002 (cafe_id → id)

---

# DBT-301: Cafe Recommendations View

**ID**: DBT-301  
**Category**: View  
**Status**: Active  
**Created**: 2026-03-14  
**Last Updated**: 2026-03-14  

### Purpose

Computed view used to generate cafe recommendation rankings for users.

Combines cafe data with user preferences and review scores.

### Columns

| Column | Type | Description |
|------|------|-------------|
| `cafe_id` | UUID | Recommended cafe |
| `user_id` | UUID | User receiving recommendation |
| `match_score` | FLOAT | Taste compatibility score |
| `rank` | INTEGER | Recommendation ranking |

### Related IDs

- [API-002](SoT.API_CONTRACTS.md#api-002-get-personalized-recommendations)
- [BR-003](SoT.BUSINESS_RULES.md#br-003-personalized-recommendations-priority)

---

# Deprecated Tables

*(None currently)*

---

# Cross-Reference Index

### Tables by API

- API-001 accesses: DBT-002  
- API-002 accesses: DBT-001, DBT-002, DBT-101, DBT-301  
- API-003 accesses: DBT-102  
- API-004 accesses: DBT-201  

### Tables by Journey

- UJ-101 uses: DBT-001, DBT-101  
- UJ-102 uses: DBT-002, DBT-301  
- UJ-103 uses: DBT-201  
- UJ-104 uses: DBT-102  

---

# Update Protocol

### When to Add New DBT-XXX IDs

1. New core data entity
2. New feature table
3. Many-to-many relationship table
4. Analytical or recommendation view

### Bidirectional Reference Checklist

When adding a new DBT-XXX:

- [ ] Update SoT.API_CONTRACTS.md
- [ ] Update SoT.USER_JOURNEYS.md
- [ ] Update SoT.BUSINESS_RULES.md
- [ ] Update SoT.TESTING.md
- [ ] Update EPIC documentation
- [ ] Update SoT.UNIQUE_ID_SYSTEM.md if maintained

---

*End of SoT.DATA_MODEL.md — Authoritative source for all DBT-XXX IDs*

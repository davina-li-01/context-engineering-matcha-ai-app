# MatchaMap · Product Requirements Document (PRD)

**Authority & Workflow**

- `README.md` — repository orientation (always read first).
- `PRD.md` — this file. Owns the strategic narrative from v0.1 → v1.0.
- `CLAUDE.md` — agent behavior. Confirms how to implement what this PRD asks for.
- `epics/EPIC-{XX}-<slug>.md` — execution window. Updates IDs created/modified when advancing v0.7+.
- See `README.md` for gate criteria and rituals.

**Template Usage**

1. Replace placeholders (`{}`) with product-specific data.
2. Maintain strict version headers (v0.1 → v1.0). Never delete prior versions; append revisions.
3. Use SoT IDs (BR-XXX, CFD-XXX, etc.) whenever referencing research, rules, or technical decisions.
4. Log lifecycle transitions in the change log table below. Reference EPIC IDs for execution notes.

---

# PRD Metadata

| Field | Value |
|------|------|
| **Current Lifecycle Gate** | v0.1 |
| **Last Updated** | 2026-03-14 |
| **Last Editor** | Davina Li |
| **Status** | Discovery |
| **Next Target Gate** | v0.2 |
| **Related EPIC** | EPIC-01 |
| **SoT Snapshot** | BR-001, BR-002 |

---

# Lifecycle Change Log

| Version | Date | Editor | Summary | Linked IDs / EPIC |
|------|------|------|------|------|
| v0.1 Spark | 2026-03-14 | Davina Li | Defined problem and product vision for matcha discovery platform | CFD-001 |
| v0.2 Market Definition | TBD | TBD | ICP + segmentation | BR-### |
| v0.3 Commercial Model | TBD | TBD | Pricing & positioning hypotheses | BR-### |
| v0.4 User Journeys | TBD | TBD | Journey mapping | UJ-### |
| v0.5 Red Team Review | TBD | TBD | Risks and mitigations | RISK-### |
| v0.6 Architecture | TBD | TBD | Stack and API contracts | API-### |
| v0.7 Build Execution | TBD | TBD | Epic backlog | EPIC-### |
| v0.8 Release & Deployment | TBD | TBD | Deployment readiness | DEP-### |
| v0.9 Go-to-Market | TBD | TBD | Launch strategy | GTM-### |
| v1.0 Market Adoption | TBD | TBD | Optimization strategy | KPI-### |

---

# v0.1 Spark — Problem & Outcomes

## Spark Summary

MatchaMap is a web application that helps users discover high-quality matcha drinks based on their taste preferences and location. The platform combines personalized recommendations, cafe discovery, and community reviews to solve the problem of inconsistent matcha quality.

---

## Problem Statement

**Who is hurting?**

Matcha drinkers who want to find high-quality matcha cafes.

**What pain exists today?**

- Matcha quality varies dramatically between cafes
- Cafe review platforms do not highlight matcha quality
- Users rely on social media or word of mouth to find good matcha

**Why now?**

Matcha consumption is rapidly increasing due to:

- wellness trends
- specialty coffee culture
- social media exposure

Yet there is **no platform focused specifically on matcha discovery**.

---

## Desired Outcomes

- Users easily find cafes that serve high-quality matcha.
- Users receive personalized matcha recommendations based on taste.
- Users contribute reviews that improve discovery for others.

---

## Initial Success Signals

Metric:  
Users completing matcha taste preference onboarding (Target: 70%)

Metric:  
Weekly matcha cafe searches per user (Target: 3+)

Insight IDs:

CFD-001 — Informal research showing users rely heavily on social media for matcha recommendations.

---

## Constraints & Non-goals

Constraints

- Initial dataset of cafes may be limited
- Matcha quality data may rely on user reviews

Non-goals

- General restaurant discovery
- Food delivery services
- Non-matcha beverage discovery

---

## Open Questions

- Should recommendations prioritize **taste compatibility or distance**?
Answer: There should be a separate parameter page that indicates a users preference on what they want to focus on. 
- Should cafes be curated manually initially?
Answer: There should be a mini quiz on matcha preferences and also one of the questions being for users to add and rank matcha they like already. 
- Should matcha powder brand be included in the dataset?
Answer: For future iterations potentially, but for the first version no.

---

# v0.2 Market Definition — ICP & Segments

## Market Thesis

Matcha consumption continues to grow globally, but no discovery platform specializes in matcha quality or taste preferences. MatchaMap addresses this gap by combining personalization and location discovery.

---

## Primary Segments

| Segment | Description | Size / TAM | Urgency | Source |
|------|------|------|------|------|
| Casual Matcha Drinkers | People who occasionally drink matcha lattes | Large | Medium | CFD-001 |
| Matcha Enthusiasts | Users who care about ceremonial grade matcha | Medium | High | CFD-002 |
| Cafe Explorers | Food & drink enthusiasts seeking specialty cafes | Large | Medium | CFD-003 |

---

## Not For

- Generic restaurant discovery
- Coffee-only discovery apps
- Food delivery platforms

---

## Enabling Business Rules

BR-001 — Only cafes serving matcha drinks appear in search results.

BR-002 — Users must complete preference onboarding to receive personalized recommendations.

BR-003 — Recommendations prioritize taste compatibility with user profile.

---

## Research & Evidence

CFD-001 — Social media search trends showing high interest in matcha cafes.

CFD-002 — Interview feedback from matcha drinkers indicating difficulty finding high-quality matcha.

---

# v0.3 Commercial Model — Pricing & Positioning

## Anchor Competitors

| Competitor | Positioning | Pricing | Reference |
|------|------|------|------|
| Yelp | General restaurant discovery | Free | CFD-004 |
| Google Maps | Location discovery | Free | CFD-004 |

---

## Monetization Strategy

Model

Freemium discovery platform.

Revenue Sources

- Featured cafe listings
- Affiliate partnerships with cafes
- Premium discovery filters

Primary KPI

Monthly Active Users.

---

## Moat Thesis

MatchaMap focuses specifically on matcha taste preferences and quality, creating a niche discovery platform unavailable on generic review sites.

Supporting IDs

BR-001, CFD-002

---

# v0.4 User Journeys — From Pain to Value

| ID | Persona | Trigger | Key Steps | Pain | Value |
|------|------|------|------|------|------|
| UJ-101 | Casual drinker | Wants matcha nearby | Open app → discover cafes | Hard to find good matcha | Personalized recommendations |

---

## Journey Narratives

### UJ-101 — Discover Matcha Cafe

Step Flow

User opens app  
→ enters preferences  
→ views map of recommended cafes  
→ selects cafe  
→ visits cafe

Dependencies

BR-001  
API-001

---

# v0.5 Red Team Review — Risks & Mitigations

| ID | Risk | Impact | Likelihood | Mitigation |
|------|------|------|------|------|
| RISK-001 | Limited cafe data | High | Medium | Start with curated cafe list and preference form|

---

# v0.6 Architecture — Technical Blueprint

System Overview

Web-based platform for matcha discovery and recommendation.

---

## API Contracts

API-001 — GET /cafes  
Returns cafes serving matcha.

API-002 — GET /recommendations  
Returns personalized matcha cafe recommendations.

API-003 — POST /review  
Submit matcha drink review.

---

# v0.7 Build Execution — Plan for Delivery

| EPIC | Objective | Status |
|------|------|------|
| EPIC-01 | Matcha preference onboarding | Planned |
| EPIC-02 | Cafe discovery map | Planned |
| EPIC-03 | Recommendation engine | Planned |
| EPIC-04 | User reviews | Planned |

---

# v0.8 Release & Deployment — Operational Readiness

Release checklist

- Deployment environments configured
- Monitoring established
- Runbooks documented

---

# v0.9 Go-to-Market — Launch

Launch strategy

- Partner with popular matcha cafes
- Promote through social media
- Encourage early reviews

---

# v1.0 Market Adoption — Growth

Adoption goals

- 50 users
- active cafe discovery in major cities

Future expansion

- additional cities
- advanced recommendation algorithms
- community-driven matcha rankings
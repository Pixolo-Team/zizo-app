# Zizo App – Copilot Instructions & Coding Standards

This document defines **mandatory coding rules** for the Zizo App repository.  
All contributors (human or AI) must follow these rules strictly.

Zizo is a **football-first, production-grade product**.  
Code quality, consistency, and clarity are non-negotiable.

---

## 1. Imports Rules (MANDATORY)

- ✅ Always use the project alias (`@/`) for imports
- ❌ Never use relative imports like `../../`

### ✅ Correct
```ts
import { getTournamentsRequest } from "@/services/tournament.service";
```

❌ Incorrect
```ts
import { getTournaments } from "../../services/tournament";
```

---


## 2. File Naming Rules
All file names must be kebab-case

File names must clearly describe their responsibility

✅ Correct
tournament.service.ts
football-tournaments.request.ts
organizer-profile.component.tsx

❌ Incorrect
```ts
TournamentService.ts
getTournaments.ts
OrganizerProfile.tsx
```

Special rule
Only UI components (.tsx) may use PascalCase
Utility, service, and logic files must always be kebab-case


## 3. Function Naming Rules
All function names must:
start with a verb
use camelCase


✅ Correct
```ts
getTournamentsRequest()
createTournamentService()
formatPrizeData()
```

❌ Incorrect
```ts
tournaments()
TournamentCreate()
dataFormatter()
```


## 4. API Call Functions
Any function that makes an API / Supabase / HTTP call:

must end with Request

✅ Correct
```ts
getTournamentsRequest()
getTournamentDetailsRequest()
createTournamentLeadRequest()
```

❌ Incorrect
```ts
getTournaments()
fetchTournament()
loadTournamentData()
```


## 5. Service Layer Rules
Business logic functions must live in service files

All service functions must end with Service

✅ Correct
```ts
createTournamentService()
mapTournamentListingService()
validateOrganizerService()
```


❌ Incorrect
```ts
createTournament()
tournamentMapper()
validateOrganizer()
```


## 6. Data Type Naming Rules (STRICT)
ALL data types must end with Data

Applies to:
interfaces
types
DTOs

API responses

✅ Correct
```ts
interface TournamentData {}
interface TournamentListingItemData {}
type OrganizerProfileData = {}
```

❌ Incorrect
```ts
interface Tournament {}
interface OrganizerProfile {}
type TournamentItem = {}
```


## 7. JS Doc Comments (MANDATORY)
Every exported function must have a JSDoc comment

At minimum: one-line explanation

✅ Correct
```ts
/**
 * Fetches published tournaments with filters applied
 */
export async function getTournamentsRequest() {}
```

❌ Incorrect
```ts
export async function getTournamentsRequest() {}
```


## 8. Commenting Rules
Use comments to explain WHY, not WHAT
Add comments for:
complex logic
business rules
edge cases
Avoid redundant comments

✅ Good
// External ref ID ensures idempotent imports from Google Sheets
❌ Bad
```ts
// Increment i
i++;
```

## 9. Console Logs (STRICT)
❌ No console.log, console.error, console.warn in final code

Temporary logs must be removed before commit

Allowed only:
During local debugging

Never in committed code

## 10. Error Handling Rules
Always handle API errors explicitly

Never swallow errors silently

Errors must be returned or thrown in a predictable structure

✅ Correct
```ts
return { data: null, error };
```

❌ Incorrect
```ts
catch (e) {
  return null;
}
```


## 11. General Code Quality Rules
Keep functions small and focused

One responsibility per function

Avoid deeply nested logic

Prefer clarity over cleverness

Optimize for readability and maintenance

## 12. AI (Copilot) Specific Rules
When generating code, Copilot must:

Follow all naming conventions above

Never introduce:

unused variables

commented-out code

console logs

Match existing project patterns exactly

Ask for clarification if unsure

## Final Rule (Non-Negotiable)
If code does not follow these rules, it is considered incorrect,
even if it works.

Zizo is built for scale, clarity, and trust — the code must reflect that.
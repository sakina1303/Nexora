# Architecture & Workflow Explanation

## Architecture
- **Frontend:** React (Vite), functional components, API integration
- **Backend:** Node.js (Express), Prisma ORM, RESTful API
- **Database:** (Configured via Prisma)

## Workflow
- Feature branches for new features/bugfixes
- Frequent, meaningful commits (see commit history)
- Pull Requests trigger CI (lint, test)
- Dependabot checks for outdated dependencies

## Design Decisions
- Chose Vite for fast frontend dev
- Used ESLint/Prettier for code quality
- Used Jest for unit/integration tests
- Cypress for E2E (template provided)

## Challenges
- Ensuring CI works for both frontend and backend
- Keeping scripts idempotent
- Coordinating API and DB integration

---

See `.github/workflows/ci.yml` and `.github/dependabot.yml` for automation details.

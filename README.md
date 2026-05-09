# fullstack-starter

A reusable full-stack template I am building as a learning project.
The goal is to end up with a working scaffold that I can clone,
rename, swap database credentials, and start any future personal
project on top of, without rebuilding the foundation each time.

## Status

**Work in progress.** This template is being built one milestone
at a time. See [PROGRESS.md](./PROGRESS.md) for what is currently
working and what is next.

## Planned stack

### Backend
- Node.js (24 LTS, 22 acceptable)
- Express
- TypeScript
- MySQL 8 with Knex.js (query builder and migrations)

### Frontend
- Vue 3
- Vite
- TypeScript
- SCSS

### Tooling and infrastructure
- Docker and Docker Compose (development and production)
- Adminer (database GUI)
- Prettier (formatting)
- ESLint (linting)
- Conventional Commits

## Architecture

- Monorepo with `backend/` and `frontend/` folders.
- Backend layers: `routes` -> `controllers` -> `services`,
  with `helpers/`, `middleware/`, `config/`, `migrations/`,
  and `seeds/` as supporting folders.
- All API endpoints under `/api/v1/...`.
- Standardised response shape:
  `{ success: boolean, data: any | null, error: string | null }`.

## Out of scope (for now)

These are intentionally not included in the first version of the
template. They will be added in later iterations:

- Authentication and authorisation
- Automated tests
- Validation libraries (Zod, Joi, etc.) — validation is hand-written
  using TypeScript type guards in `src/helpers/validators.ts`.

## Setup

Full setup instructions will be added in the final milestone.
For now, the project is being assembled step by step.

## License

To be decided.

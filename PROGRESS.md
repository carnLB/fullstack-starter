# Progress — fullstack-starter

Môj učebný denník. Píšem si sem, čo je hotové, kde som skončil a čo ide
ďalej. Keď sa po pauze vrátim k projektu, prvé otvorím tento súbor.

---

## Práve teraz

**Aktuálny míľnik:** 6 — Prvý reálny endpoint (`GET /api/v1/users`)
**Stav:** Pred štartom.
**Ďalej:** rozdeliť kód do vrstiev route → controller → service. Vytvoriť
`src/routes/users.routes.ts`, `src/controllers/users.controller.ts`,
`src/services/users.service.ts`. Endpoint vráti všetkých používateľov
z tabuľky `users` cez Knex builder API (`db('users').select('*')`).

**Posledná otázka, ktorú som si položil:** žiadna otvorená.

---

## Hotové míľniky

### Míľnik 5 — Prvá migrácia (Knex) _(2026-06-01)_
- `backend/knexfile.js` (plain JS, nie .ts kvôli stabilite Knex CLI integrácie).
  Importuje connection z `process.env` priamo, nie z `src/config/env.ts`.
- `ts-node@10.9.2` ako devDep — Knex CLI ho potrebuje pre `.ts` migrácie.
- npm skripty: `migrate:make`, `migrate:latest`, `migrate:rollback`, `migrate:status`.
- Prvá migrácia: `20260531220544_create_users_table.ts`
  (id BIGINT PK auto-increment, name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL UNIQUE, created_at TIMESTAMP default NOW()).
- `migrate:latest` + `migrate:rollback` + `migrate:latest` otestované —
  tabuľka sa korektne vytvára aj maže.
- **Naučené koncepty:** Knex schema builder (`createTable`, `increments`,
  `string`, `timestamp`, `notNullable`, `unique`, `defaultTo(knex.fn.now())`),
  `up()` / `down()` ako párové operácie, `knex_migrations` tabuľka eviduje
  spustené migrácie.
- **Naučené lekcie:**
  - **Knex CLI + TypeScript je krehké** — `knexfile.ts` s importom z `env.ts`
    nefungoval (ts-node loader fail). Riešenie: `knexfile.js` (plain JS),
    `require('ts-node/register')` v ňom pre migrácie samotné.
  - **Pri pridaní devDep cez host `npm install`** sa balíček nemusí dostať
    do kontajnera ani s `--build --renew-anon-volumes`, ak npm install
    z nejakého dôvodu zlyhal. Fallback: `docker exec ... npm install --save-dev <pkg>`.
  - **Jedna logická zmena = jedna migrácia.** Duplicitné `migrate:make`
    vytvorí dva súbory rovnakého mena s rôznymi timestamps — treba zmazať
    duplikáty pred `migrate:latest`.

### Míľnik 4 — Backend pripojenie na MySQL _(2026-05-16)_
- Závislosti: `knex` (query builder) + `mysql2` (driver), oba runtime deps.
- `src/config/env.ts`: central env reader s `requireEnv` a `envAsNumber`,
  **fail-fast** validáciou pri boote.
- `src/config/database.ts`: single Knex inštancia (singleton cez Node
  module caching), `client: 'mysql2'`, connection pool min 0 / max 10.
- `src/index.ts`: nový `GET /api/v1/db-check` cez `db.raw('SELECT 1')`,
  refactored aby používal `env.port`.
- `docker-compose.yml`: backend dostáva `DB_HOST=db`, `DB_PORT=3306`
  (vnútorný!), `DB_NAME/USER/PASSWORD` z `.env`. `depends_on: db: service_healthy`
  zaisťuje, že backend čaká na DB pred štartom.
- **Naučené koncepty:** Knex factory + connection pool, singleton cez
  module caching, host vs. container port pri DB pripojení (`db:3306`
  z kontajnera, `localhost:3307` z hosta), fail-fast env validácia,
  `async` Express handler + try/catch (Express 4 sám async chyby nechytí),
  `err instanceof Error` ako type guard pre `unknown` v `catch`.
- **Naučená lekcia:** pri pridaní nových npm balíkov (knex/mysql2)
  treba pri rebuild-e Compose-u použiť `--renew-anon-volumes`, inak
  starý anonymous volume "prebije" čerstvý `node_modules` z image-u.
  Symptóm: `Cannot find module 'X'` aj po `--build`.

### Míľnik 3 — Backend hello-world _(2026-05-10)_
- `backend/` priečinok (monorepo: `backend/` + neskôr `frontend/`).
- `package.json`, `tsconfig.json` (target ES2022, module/moduleResolution = node16, strict).
- Dependencies: `express` (runtime); `typescript`, `tsx`, `@types/express`, `@types/node` (dev).
- npm skripty: `dev` (`tsx watch`), `build` (`tsc`), `start` (`node dist/...`), `typecheck`.
- `src/helpers/response.ts`: `ApiResponse` interface + `success()` a `error()` builders.
- `src/index.ts`: Express app s `GET /api/v1/health`.
- `Dockerfile` (Node 22 Alpine) + `.dockerignore`.
- Backend ako tretí service v `docker-compose.yml`.
- **Hot reload v kontajneri:** bind mount + anonymous volume na `/app/node_modules` + `CHOKIDAR_USEPOLLING=true` kvôli Windows/WSL2.

### Míľnik 2 — Docker Compose s MySQL + Adminerom _(2026-05-10)_
- `docker-compose.yml` so službami `db` (MySQL 8.0) a `adminer`.
- `.env` (gitignored) a `.env.example` (template).
- Named volume `db_data` zaisťuje, že DB prežije `docker compose down`.
- Healthcheck na `db`; Adminer čaká cez `depends_on: condition: service_healthy`.
- **Lokálne porty:** DB `3307`, Adminer `8081`, backend `3000`.

### Míľnik 1 — Foundation setup _(2026-05-09)_
- Vytvorené lokálne git repo a GitHub public repo `carnLB/fullstack-starter`.
- Configy: `.gitignore`, `.gitattributes`, `.editorconfig`, `.prettierrc.json`.
- **Rozhodnutie:** `indent_size = 4` (PSR-12 návyk z PHP).
- **Rozhodnutie:** public repo — žiadne tajomstvá v projekte; `.env` súbory navždy v `.gitignore`, `.env.example` ako šablóna.

---

## Roadmapa (11 míľnikov)

1. **Foundation setup** — _Hotové (2026-05-09)._
2. **Docker Compose + MySQL + Adminer** — _Hotové (2026-05-10)._
3. **Backend hello-world** — _Hotové (2026-05-10)._
4. **Backend pripojenie na MySQL** — _Hotové (2026-05-16)._
5. **Prvá migrácia** — _Hotové (2026-06-01)._
6. **Prvý reálny endpoint** — _Ďalej._ `GET /api/v1/users` s vrstvami route → controller → service.
7. **Validácia + POST endpoint** — manuálne TS type guards v `helpers/validators.ts`.
8. **Frontend služba** — Vue 3 + Vite, fetch `/api/v1/users`, zobrazenie.
9. **Production build** — `docker-compose.prod.yml`, Express servuje built frontend.
10. **Polish na template** — `.env.example`, plný README, npm scripts.
11. **Production hardening** — _Posledný míľnik pred reálnym deploy-om._
    Startup DB check, graceful shutdown (`SIGTERM`), centrálny error middleware,
    async wrapper, request logging (pino/morgan), `/health` vs `/ready` (liveness/readiness),
    Helmet, CORS, rate limiting, body size limits, connection retry, structured logging.

---

## Otvorené otázky / poznámky do budúcna

- _Po dokončení template-u (M11 hotové) sa pýtať na praktický návod
  nasadenia na VPS (DigitalOcean / Hetzner): doména, TLS cez Caddy/Traefik,
  managed DB._
- _Testovacia tabuľka `persistence_test` z M2 v DB stále existuje vedľa
  `users`. Knex migrácie ju ignorujú. Zmazať v Adminer-i pri ďalšom otvorení._
- _Workflow pri zmene `package.json` deps: `docker compose up -d --build
  --renew-anon-volumes backend`. Ak to nezaberie, fallback je
  `docker exec ... npm install --save-dev <pkg>`._
- _Knex CLI workflow: vždy `docker exec fullstack-starter-backend npm run migrate:<cmd>`.
  Migrácie sa vykonávajú v sieti kontajnera (`DB_HOST=db`), nie z hosta._
- _Pri klonovaní template-u v budúcnosti: zmeniť názov v `README.md`,
  vytvoriť nový GitHub repo a prepnúť remote cez
  `git remote set-url origin <novy-url>`._

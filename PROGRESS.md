# Progress — fullstack-starter

Môj učebný denník. Píšem si sem, čo je hotové, kde som skončil a čo ide
ďalej. Keď sa po pauze vrátim k projektu, prvé otvorím tento súbor.

---

## Práve teraz

**Aktuálny míľnik:** 4 — Backend pripojenie na MySQL (Knex)
**Stav:** Pred štartom.
**Ďalej:** doinštalovať `knex` + `mysql2` + `dotenv` v `backend/`. Vytvoriť
`src/config/database.ts` s Knex inštanciou. Pridať endpoint
`GET /api/v1/db-check`, ktorý spustí `SELECT 1` a vráti výsledok
cez náš štandardizovaný response.

**Posledná otázka, ktorú som si položil:** žiadna otvorená.

---

## Hotové míľniky

### Míľnik 3 — Backend hello-world _(2026-05-10)_
- `backend/` priečinok (monorepo: `backend/` + neskôr `frontend/`).
- `package.json`, `tsconfig.json` (target ES2022, module/moduleResolution = node16, strict).
- Dependencies: `express` (runtime); `typescript`, `tsx`, `@types/express`, `@types/node` (dev).
- npm skripty: `dev` (`tsx watch`), `build` (`tsc`), `start` (`node dist/...`), `typecheck`.
- `src/helpers/response.ts`: `ApiResponse` interface + `success()` a `error()` builders.
- `src/index.ts`: Express app s `GET /api/v1/health` → `{ success: true, data: { status: 'ok' }, error: null }`.
- `Dockerfile` (Node 22 Alpine) + `.dockerignore`.
- Backend ako tretí service v `docker-compose.yml`.
- **Hot reload v kontajneri:** bind mount `./backend:/app` + anonymous volume na `/app/node_modules` + `CHOKIDAR_USEPOLLING=true` kvôli Windows/WSL2.
- **Naučené:** TS imports (default vs named), `interface`, `unknown` vs `any`, union types, Express middleware/routes/handler signatures, `Request`/`Response` typy, Dockerfile (FROM/WORKDIR/COPY/RUN/EXPOSE/CMD), Docker layer caching, `build:` vs `image:`, bind-mount + anonymous volume trick.

### Míľnik 2 — Docker Compose s MySQL + Adminerom _(2026-05-10)_
- `docker-compose.yml` so službami `db` (MySQL 8.0) a `adminer`.
- `.env` (gitignored) a `.env.example` (template) s DB credentials.
- Named volume `db_data` zaisťuje, že DB prežije `docker compose down`.
- Healthcheck na `db`; Adminer čaká cez `depends_on: condition: service_healthy`.
- **Lokálne porty:** DB `3307`, Adminer `8081`, backend `3000` (3306/8080 boli na hosti obsadené).
- Test perzistencie OK: `down` + `up` zachovala testovaciu tabuľku.
- **Naučené koncepty:** YAML 2 medzery, `HOST:CONTAINER` port mapping,
  named volumes, container-to-container DNS cez service name,
  rozdiely `stop` / `down` / `down -v`.

### Míľnik 1 — Foundation setup _(2026-05-09)_
- Vytvorené lokálne git repo a GitHub public repo `carnLB/fullstack-starter`.
- Configy: `.gitignore`, `.gitattributes`, `.editorconfig`, `.prettierrc.json`.
- Štruktúra README a PROGRESS denníka.
- **Rozhodnutie:** `indent_size = 4` (PSR-12 návyk z PHP, preferujem vzduch v kóde).
- **Rozhodnutie:** public repo — žiadne tajomstvá v projekte; `.env` súbory navždy v `.gitignore`, `.env.example` ako šablóna.
- **Pri klonovaní template-u v budúcnosti:** zmeniť názov v `README.md`, vytvoriť nový GitHub repo a prepnúť remote cez `git remote set-url origin <novy-url>`.

---

## Roadmapa (10 míľnikov)

1. **Foundation setup** — _Hotové (2026-05-09)._
2. **Docker Compose + MySQL + Adminer** — _Hotové (2026-05-10)._
3. **Backend hello-world** — _Hotové (2026-05-10)._
4. **Backend pripojenie na MySQL** — _Ďalej._ Knex, dotenv, `GET /api/v1/db-check`.
5. **Prvá migrácia** — `create_users_table` cez Knex.
6. **Prvý reálny endpoint** — `GET /api/v1/users` s vrstvami route → controller → service.
7. **Validácia + POST endpoint** — manuálne TS type guards v `helpers/validators.ts`.
8. **Frontend služba** — Vue 3 + Vite, fetch `/api/v1/users`, zobrazenie.
9. **Production build** — `docker-compose.prod.yml`, Express servuje built frontend.
10. **Polish na template** — `.env.example`, plný README, npm scripts.

---

## Otvorené otázky / poznámky do budúcna

- _Po dokončení template-u sa pýtať na praktický návod nasadenia na VPS
  (DigitalOcean / Hetzner): doména, TLS cez Caddy/Traefik, managed DB._
- _V M4 reálne použijeme `depends_on: db: condition: service_healthy`
  aj na backend service (DB pripojenie potrebuje DB hotovú)._
- _Testovacia tabuľka `persistence_test` v DB je z M2 — zmazať v Adminer-i
  alebo nechať tak, prepíše sa pri prvej Knex migrácii v M5._
- _Ak by sa rebuild backend image-u zdal pomalý — `docker compose up -d --build backend` rebuilduje iba ten._

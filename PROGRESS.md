# Progress — fullstack-starter

Môj učebný denník. Píšem si sem, čo je hotové, kde som skončil a čo ide
ďalej. Keď sa po pauze vrátim k projektu, prvé otvorím tento súbor.

---

## Práve teraz

**Aktuálny míľnik:** 3 — Backend hello-world (Express + TypeScript)
**Stav:** Pred štartom.
**Ďalej:** vytvoriť `backend/` priečinok, `package.json`, `tsconfig.json`,
minimálny Express server v TypeScripte a endpoint `GET /api/v1/health`,
ktorý vráti `{ success: true, data: { status: "ok" }, error: null }`.

**Posledná otázka, ktorú som si položil:** žiadna otvorená.

---

## Hotové míľniky

### Míľnik 2 — Docker Compose s MySQL + Adminerom _(2026-05-10)_
- `docker-compose.yml` so službami `db` (MySQL 8.0) a `adminer`.
- `.env` (gitignored) a `.env.example` (template) s DB credentials.
- Named volume `db_data` zaisťuje, že DB prežije `docker compose down`.
- Healthcheck na `db`; Adminer čaká cez `depends_on: condition: service_healthy`.
- **Lokálne porty zmenené:** DB beží na `3307`, Adminer na `8081`
  (defaultné 3306/8080 boli na hosti obsadené). Pri `connect-e z hosta`
  treba `localhost:3307`. Z **kontajnera v Compose sieti** je to vždy `db:3306`.
- Test perzistencie OK: `down` + `up` zachovala testovaciu tabuľku.
- **Naučené koncepty:** YAML konvencia 2 medzery, `HOST:CONTAINER` port mapping,
  named volumes vs bind mounts, container-to-container DNS cez service name,
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
3. **Backend hello-world** — _Ďalej._ Express + TS, endpoint `GET /api/v1/health`.
4. **Backend pripojenie na MySQL** — Knex, endpoint `GET /api/v1/db-check`.
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
- _V M3/M4 budeme potrebovať backend kontajner — vtedy reálne použijeme
  `depends_on: db: condition: service_healthy` aj na backend service._
- _Testovacia tabuľka `persistence_test` v DB je z M2 — zmazať ju buď
  ručne v Adminer-i, alebo nechať tak, prepíše sa pri prvej `migrate:latest`
  v M5 (Knex migrácie netrappia o ad-hoc tabuľky)._

# Progress — fullstack-starter

Môj učebný denník. Píšem si sem, čo je hotové, kde som skončil a čo ide
ďalej. Keď sa po pauze vrátim k projektu, prvé otvorím tento súbor.

---

## Práve teraz

**Aktuálny míľnik:** 2 — Docker Compose s MySQL a Adminerom
**Stav:** Pred štartom.
**Ďalej:** vytvoriť `docker-compose.yml`, spustiť MySQL kontajner, otvoriť Adminer v prehliadači a overiť pripojenie k DB.

**Posledná otázka, ktorú som si položil:** žiadna otvorená.

---

## Hotové míľniky

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
2. **Docker Compose + MySQL + Adminer** — _Ďalej._
3. **Backend hello-world** — Express + TS, endpoint `GET /api/v1/health`.
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

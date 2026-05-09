# Progress — fullstack-starter

Môj učebný denník. Píšem si sem, čo je hotové, kde som skončil a čo ide
ďalej. Keď sa po pauze vrátim k projektu, prvé otvorím tento súbor.

---

## Práve teraz

**Aktuálny míľnik:** 1 — Foundation setup
**Stav:** Prebieha — zostáva prvý commit a push na GitHub.
**Ďalej po dokončení M1:** Míľnik 2 — Docker Compose s MySQL a Adminerom.

**Posledná otázka, ktorú som si položil:** žiadna otvorená.

---

## Hotové míľniky

_Zatiaľ žiadny — Míľnik 1 sa sem zapíše po dokončení._

---

## Roadmapa (10 míľnikov)

1. **Foundation setup** — prázdne repo, configy, README, GitHub. _Prebieha._
2. **Docker Compose + MySQL + Adminer** — DB beží lokálne, GUI cez prehliadač.
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

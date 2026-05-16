// ============================================================
// Knex database client — single connection pool shared by app.
//
// Knex is a "query builder" — instead of writing raw SQL strings,
// we describe queries with fluent JS methods (.where, .select, ...)
// and Knex compiles them into safe, parameterised SQL for the
// configured client (mysql2 in our case).
//
// Because Node caches modules, every file that imports `db`
// gets the SAME instance — and therefore the SAME pool.
// ============================================================

import knex from 'knex';
import { env } from './env';

export const db = knex({
    // Driver used to talk to MySQL. Must match the package installed.
    client: 'mysql2',

    connection: {
        host: env.db.host,
        port: env.db.port,
        user: env.db.user,
        password: env.db.password,
        database: env.db.name,
    },

    // Connection pool configuration.
    pool: {
        // Keep zero open connections when idle (no resource waste).
        min: 0,
        // Cap concurrent connections at 10 — sensible default for
        // small/medium apps. Raise if many concurrent requests.
        max: 10,
    },
});

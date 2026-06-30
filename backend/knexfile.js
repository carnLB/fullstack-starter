// ============================================================
// Knex CLI configuration (JavaScript form).
//
// Why .js and not .ts:
//   Knex CLI + TypeScript loader integration is fragile.
//   Keeping this as plain JavaScript avoids the ts-node dance.
//   The file is tiny and only read by the CLI, not by runtime.
//
// We read DB credentials from process.env. In Docker, Compose
// sets these from .env when starting the container. Knex CLI
// runs inside the container via `docker exec`, so it sees the
// same env vars the backend does — one source of truth.
//
// Register ts-node so the .ts MIGRATION files can be loaded
// when running migrate:latest etc.
// ============================================================

require('ts-node/register');

module.exports = {
    development: {
        client: 'mysql2',
        connection: {
            host: process.env.DB_HOST,
            port: Number(process.env.DB_PORT) || 3306,
            user: process.env.DB_USER,
            password: process.env.DB_PASSWORD,
            database: process.env.DB_NAME,
        },
        migrations: {
            directory: './migrations',
            extension: 'ts',
            tableName: 'knex_migrations',
        },
        seeds: {
            directory: './seeds',
            extension: 'ts',
        },
    },
};

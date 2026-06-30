import type { Knex } from 'knex';

// ============================================================
// Migration: create_users_table
//
// Creates the `users` table — id, name, email (unique),
// created_at. This is the foundational table used by M6
// (GET /users) and M7 (POST /users).
// ============================================================

export async function up(knex: Knex): Promise<void> {
    await knex.schema.createTable('users', (table) => {
        // Auto-increment primary key. `increments` is shorthand
        // for `bigIncrements` on MySQL — gives us a BIGINT PK.
        table.increments('id').primary();

        // Display name. Required.
        table.string('name', 255).notNullable();

        // Email. Required and unique (used as login identifier).
        // The unique constraint also creates an index, so lookups
        // by email are fast.
        table.string('email', 255).notNullable().unique();

        // Audit trail: when was this row created.
        // knex.fn.now() compiles to the DB-specific "current
        // timestamp" function (CURRENT_TIMESTAMP for MySQL).
        table
            .timestamp('created_at')
            .notNullable()
            .defaultTo(knex.fn.now());
    });
}

// Reverse the change in `up`. `migrate:rollback` calls this.
// In our case, drop the whole table.
export async function down(knex: Knex): Promise<void> {
    await knex.schema.dropTable('users');
}

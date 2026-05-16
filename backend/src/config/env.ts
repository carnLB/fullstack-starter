// ============================================================
// Single source of truth for environment configuration.
//
// Reads from process.env at startup, validates required values,
// and exposes a typed object the rest of the app imports.
//
// Fail-fast: if a required variable is missing or malformed,
// the server crashes at boot with a clear message — BEFORE
// serving any request.
// ============================================================

// Returns the value of a required env variable, or throws.
// Use this for anything the app cannot run without (e.g. DB credentials).
function requireEnv(key: string): string {
    const value = process.env[key];
    if (value === undefined || value === '') {
        throw new Error(
            `Missing required environment variable: ${key}. ` +
                `Check your .env file or docker-compose configuration.`,
        );
    }
    return value;
}

// Returns the env variable as a number, or falls back if unset.
// Throws if set but not numeric (so we never silently use NaN).
function envAsNumber(key: string, fallback: number): number {
    const raw = process.env[key];
    if (raw === undefined || raw === '') {
        return fallback;
    }
    const parsed = Number(raw);
    if (Number.isNaN(parsed)) {
        throw new Error(`Environment variable ${key} must be a number, got: "${raw}"`);
    }
    return parsed;
}

// ------------------------------------------------------------
// Exported configuration object
// ------------------------------------------------------------
// Other files import this and access env.port, env.db.host, etc.
// TypeScript infers a precise type from the object literal below.
export const env = {
    // HTTP server
    port: envAsNumber('PORT', 3000),

    // Database
    db: {
        host: requireEnv('DB_HOST'),
        port: envAsNumber('DB_PORT', 3306),
        name: requireEnv('DB_NAME'),
        user: requireEnv('DB_USER'),
        password: requireEnv('DB_PASSWORD'),
    },
};

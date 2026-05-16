// ============================================================
// Entry point for the backend server.
// Wires up Express, registers routes, and starts listening.
// ============================================================

import express, { Request, Response } from 'express';
import { success, error } from './helpers/response';
import { env } from './config/env';
import { db } from './config/database';

const app = express();

// Built-in middleware: parse JSON request bodies.
app.use(express.json());

// ============================================================
// Routes
// ============================================================

// Health check — confirms the server is alive and responding.
// Does NOT touch the database.
app.get('/api/v1/health', (req: Request, res: Response) => {
    res.status(200).json(success({ status: 'ok' }));
});

// Database check — runs a trivial SELECT 1 query to verify
// the connection pool, credentials, and network path all work.
app.get('/api/v1/db-check', async (req: Request, res: Response) => {
    try {
        // Knex .raw() returns a driver-specific shape.
        // For the mysql2 driver, the result is [rows, fields].
        // We pick rows (the first element) for the response payload.
        const result = await db.raw('SELECT 1 AS one');
        const rows = result[0];

        res.status(200).json(
            success({
                db: 'connected',
                rows,
            }),
        );
    } catch (err) {
        // In strict TypeScript (4.4+), caught errors are typed as
        // `unknown`. We must narrow before reading .message.
        const message = err instanceof Error ? err.message : 'Unknown error';

        // Log the full error server-side; show only a short summary
        // to the client (never expose stack traces in API responses).
        console.error('DB check failed:', err);

        res.status(500).json(error(`Database check failed: ${message}`));
    }
});

// ============================================================
// Server startup
// ============================================================

app.listen(env.port, () => {
    console.log(`Backend listening on http://localhost:${env.port}`);
});

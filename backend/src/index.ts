// ============================================================
// Entry point for the backend server.
// Wires up Express, registers routes, and starts listening.
// ============================================================

import express, { Request, Response } from 'express';
import { success } from './helpers/response';

// Create the Express app instance.
const app = express();

// ------------------------------------------------------------
// Built-in middleware
// ------------------------------------------------------------

// Parse JSON request bodies into req.body.
// Without this, POST/PUT requests with a JSON body would leave
// req.body as undefined.
app.use(express.json());

// ============================================================
// Routes
// ============================================================

// Health check endpoint.
// Used by load balancers, monitoring tools, and developers
// to confirm that the server is alive and responding.
//
// Response shape (standardised):
//   { success: true, data: { status: "ok" }, error: null }
app.get('/api/v1/health', (req: Request, res: Response) => {
    res.status(200).json(success({ status: 'ok' }));
});

// ============================================================
// Server startup
// ============================================================

// Read PORT from env; fall back to 3000 if unset.
// process.env values are always strings, so we coerce to number.
// In M4 we will introduce dotenv to load values from .env file.
const PORT = Number(process.env.PORT) || 3000;

app.listen(PORT, () => {
    console.log(`Backend listening on http://localhost:${PORT}`);
});

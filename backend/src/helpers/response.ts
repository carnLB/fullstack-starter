// ============================================================
// Standardised API response shape used by every endpoint.
//
// Why: the front-end can rely on these three fields regardless
// of what happened on the back-end. No more guessing whether
// the payload sits in `data`, `result`, or the root body.
//
// Note: `data` is typed as `unknown` for now (M3, hello-world).
// In M6, when we have real endpoints returning typed data
// (e.g. users from the DB), we will tighten this with generics.
// ============================================================

// Interface = a TypeScript "shape" describing what fields
// an object has and what types they should be. It does NOT
// produce any runtime code; it lives only at compile time.
export interface ApiResponse {
    success: boolean;
    data: unknown;
    error: string | null;
}

// Build a successful response.
// The function returns an object literal that conforms to ApiResponse.
// TypeScript will complain at compile time if we forget a field
// or use a wrong type.
export function success(data: unknown): ApiResponse {
    return {
        success: true,
        data,
        error: null,
    };
}

// Build an error response.
//
// `message` should be a human-readable string suitable for end
// users. Internal details (stack traces, raw SQL errors, etc.)
// belong in the server logs, NEVER in the response body.
export function error(message: string): ApiResponse {
    return {
        success: false,
        data: null,
        error: message,
    };
}

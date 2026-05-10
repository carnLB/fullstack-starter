# ============================================================
# Backend Dockerfile (development)
#
# Goals:
#   - Run the Express + TypeScript server with hot reload
#   - Keep the image small (Alpine-based Node)
#   - Cache npm install to avoid reinstalling on every code change
#
# In milestone 9 we will add a separate prod Dockerfile that:
#   - Builds the TS to dist/ in a builder stage
#   - Uses a minimal runtime image with only dist/ and prod deps
# ============================================================

# Use Node 22 LTS on Alpine Linux.
# Alpine is a tiny Linux distro (~5 MB) — keeps the image small.
FROM node:22-alpine

# Set the working directory inside the container.
# All subsequent COPY, RUN, CMD use this as their cwd.
# WORKDIR creates the directory if it does not exist.
WORKDIR /app

# Copy ONLY the package manifests first.
# This way, the next "RUN npm install" layer is cached
# whenever package.json / package-lock.json have not changed.
COPY package.json package-lock.json ./

# Install dependencies (including devDeps — we need tsx, typescript).
# In a prod image we would use --omit=dev to skip devDeps.
RUN npm install

# Copy the rest of the source code.
# .dockerignore prevents copying node_modules and dist.
COPY . .

# Document the port the container listens on.
# This is METADATA ONLY; it does NOT publish the port.
# Actual publishing happens in docker-compose.yml via "ports:".
EXPOSE 3000

# Default command at container start: dev script with hot reload.
# Form is "exec form" (array) — preferred over "shell form" (string)
# because it does not spawn a shell, signals (Ctrl+C) reach Node directly.
CMD ["npm", "run", "dev"]

# Docker Configurations

This directory contains Dockerfiles, docker-compose files, and related configurations for containerizing applications and development services within the monorepo.

Refer to the main [Enterprise Portal Architecture & Development Standards](../../../README.md) for overall guidelines.

## Purpose

- Provide consistent and reproducible development environments.
- Simplify the setup of local development dependencies (e.g., databases, message queues, mock servers).
- Define images for building and deploying applications.

## Potential Files (To Be Developed)

- **`docker-compose.yml` (Root Level or in `tooling/docker/`):**
  - For orchestrating local development services (e.g., PostgreSQL, Redis, Keycloak, mock API servers).
- **`apps/[app-name]/Dockerfile`:**
  - Dockerfile specific to building a production-ready image for each Next.js application.
  - Should leverage multi-stage builds for smaller, more secure images.
- **`packages/[package-name]/Dockerfile` (Less Common):**
  - If a specific package needs to be containerized for testing or other purposes.
- **Base Docker Images:**
  - Potentially a `Dockerfile.base` that sets up Node.js, pnpm, and other common dependencies for faster application builds.

## Considerations

- **Development Workflow:** How developers will use Docker for local setup (e.g., `docker-compose up -d`).
- **Build Process:** How Docker images are built in CI/CD pipelines.
- **Caching:** Utilizing Docker layer caching and Turborepo's remote caching to speed up image builds.
- **Security:** Ensuring Docker images are secure and follow best practices (e.g., non-root users, minimal base images).

## Example Snippet for a Next.js App Dockerfile

```dockerfile
# Dockerfile in apps/member-portal/Dockerfile

# Base image with Node.js and pnpm
FROM --platform=linux/amd64 node:20-slim AS base
ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
RUN corepack enable

WORKDIR /app

# Build stage
FROM base AS builder
COPY . .

# Restore pnpm workspace dependencies
RUN pnpm install --frozen-lockfile --filter=member-portal...

# Build the specific application
RUN pnpm --filter=member-portal build

# Prune devDependencies for production image
RUN pnpm deploy --filter=member-portal --prod /app/deploy/member-portal

# Production image
FROM base AS runner
WORKDIR /app/member-portal

COPY --from=builder /app/deploy/member-portal . # Copy only production files

# Expose port and set command
EXPOSE 3000
CMD ["pnpm", "start"]

```

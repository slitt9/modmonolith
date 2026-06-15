# Process

Agents **must** read this file, `../logs/Changelog.md`, and `../memory/Recall.md` **before** any code changes.

## Pre-edit Checklist

1. Read Process, Changelog, and Recall.
2. Identify affected module(s): `auth` / `users` / `shared`.
3. Verify no cross-module repository imports.
4. Check for schema/session impact.
5. Plan smallest possible diff.

## Post-edit Review

1. Smoke-test: register, login, logout, protected `/`.
2. Update `Changelog.md` (date + scope + files).
3. Update `Recall.md` if routes, modules, or config changed.
4. Note microservice extraction implications.

## Module Boundaries

| Module | Owns                  | May Import          |
|--------|-----------------------|---------------------|
| users  | User persistence      | `shared/database`   |
| auth   | Auth + sessions       | `users.service`, `shared/*` |
| shared | DB, middleware, views | Node/stdlib only    |

**Never** import another module's repository.

## Common Tasks

- **New route**: Add to `*.routes.js`, controller, service. Update Recall.
- **New module**: `src/modules/<name>/` (routes/controller/service). Mount in `app.js`. Document in Recall.
- **Schema change**: Update `schema.sql`. Document migration in Changelog.
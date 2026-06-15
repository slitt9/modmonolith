# Changelog

All notable changes to this project. Agents update this after every edit session.

## [Unreleased]

### Added

- Initial modular monolith scaffold with Express, EJS, SQLite
- Users module (repository + service)
- Auth module (register, login, logout, protected home)
- Shared database, middleware, and view partials
- Agent workflow docs (`Process.md`, `Recall.md`, Cursor rule)

## 2026-06-15

### Added

- Project bootstrap: `package.json`, config, server, app shell
- Registration and login with bcrypt password hashing and express-session
- SQLite persistence for users and sessions
- Smoke test script at `scripts/smoke-test.js`

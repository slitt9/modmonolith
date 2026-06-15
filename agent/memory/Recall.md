# Recall

Quick-reference for agents. Update when architecture, routes, or config change.

## Module map

```
src/
├── server.js          → bootstrap (init DB, listen)
├── app.js             → Express config, mount modules
├── config/index.js    → env-based settings
├── modules/
│   ├── auth/          → registration, login, logout, home route
│   └── users/         → user CRUD (internal service)
└── shared/
    ├── database/      → SQLite singleton + schema
    ├── middleware/    → errorHandler, requireAuth, flash
    └── views/         → EJS partials (head, foot, flash)
```


## Dependencies

- `auth` → `users.service`, `shared/*`
- `users` → `shared/database` only
- `shared` → no domain modules

## Routes

| Method | Path       | Auth | Handler          |
|--------|------------|------|------------------|
| GET    | `/`        | yes  | Home             |
| GET    | `/register`| no   | Register form    |
| POST   | `/register`| no   | Create user      |
| GET    | `/login`   | no   | Login form       |
| POST   | `/login`   | no   | Create session   |
| POST   | `/logout`  | yes  | Destroy session  |

## Config

| Variable       | Default                     | Notes                     |
|----------------|-----------------------------|---------------------------|
| `PORT`         | `3001`                      | -                         |
| `SESSION_SECRET`| `dev-secret-change-in-prod`| Change in production      |
| `DB_PATH`      | `data/app.db`               | Users table               |

Sessions use separate `data/sessions.db`.

## Future Microservices

- **users-service**: `modules/users` + users table
- **auth-service**: `modules/auth` + sessions
- **web/gateway**: `app.js` + EJS + cookies

Preserve interfaces: `findByEmail`, `create`, `emailExists`, `findById`.
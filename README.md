# Commercial Web App Prototype

Full-stack prototype featuring:
- **Frontend**: dark, responsive UI with animations and custom cursor.
- **Backend**: Node.js + Express API with JWT authentication.
- **Database**: PostgreSQL schema for users, products, and contacts.
- **Architecture**: modular layers and scalable service patterns.

## Project Structure

- `backend/` Express REST API
- `frontend/` static web app consuming API
- `database.sql` PostgreSQL schema + seed data

## Run

### 1) Database
Create a PostgreSQL database and run:

```bash
psql -d your_db_name -f database.sql
```

### 2) Backend

```bash
cd backend
cp .env.example .env
npm install
npm run dev
```

### 3) Frontend
Use any static server from repo root, e.g.:

```bash
python3 -m http.server 8080
```
Then open `http://localhost:8080/frontend`.

## API Summary

- `POST /api/auth/register`
- `POST /api/auth/login`
- `GET /api/users/me` (auth)
- `GET /api/products`
- `GET /api/products/:id`
- `POST /api/contact`

## Security
- Password hashing with bcrypt.
- JWT auth middleware.
- Helmet + CORS + rate limiting.
- Input validation via express-validator.

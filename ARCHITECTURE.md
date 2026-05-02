# Scalable Architecture Design

## Backend Layers
1. **Routes**: endpoint definitions and validation.
2. **Controllers**: HTTP-specific orchestration.
3. **Services**: business logic for auth and domain use-cases.
4. **Data Access**: PostgreSQL pool abstraction.

## Scalability Patterns
- Stateless API nodes behind load balancer.
- PostgreSQL with read replicas for catalog-heavy reads.
- Add Redis for token deny-list and caching product catalog.
- Move contact processing to async queue workers for high traffic.
- Keep DTO/validation layer stable for versioned APIs (`/api/v1/...`).

## Security
- JWT authentication with expirations.
- Bcrypt password hashing.
- Helmet, CORS policy, and rate limiting.
- Strict input validation on every write endpoint.

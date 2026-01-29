# GQL – Games & Achievements API

A GraphQL API built with **NestJS**, **Apollo**, and **MongoDB**. It manages games and their achievements with pagination and filtering.

## Tech stack

- **NestJS** – backend framework  
- **GraphQL** – Apollo Server with code-first schema  
- **Mongoose** – MongoDB ODM  
- **TypeScript**

## Prerequisites

- Node.js (v18+)
- MongoDB (local or Atlas)
- npm or yarn

## Setup

### 1. Install dependencies

```bash
npm install
```

### 2. Environment

Create a `.env` file in the project root:

```env
DATABASE_URI=mongodb://localhost:27017/gql
```

Use your own MongoDB connection string (e.g. MongoDB Atlas).

## Running the app

```bash
# development (watch mode)
npm run dev

# one-off run
npm run start

# production
npm run build
npm run start:prod
```

The server runs at **http://localhost:3001**.  
GraphQL playground (Apollo Sandbox) is at **http://localhost:3001/graphql**.

## API overview

### Queries

| Query           | Description                          |
|----------------|--------------------------------------|
| `getGames(offset, limit)` | Paginated list of games          |
| `getSingleGame(id)`       | One game by ID                    |

### Mutations

| Mutation                    | Description              |
|----------------------------|--------------------------|
| `createGame(input)`        | Create a game            |
| `createAchievements(input)`| Create an achievement    |

### Types

- **Game** – `id`, `name`, `genre`, `achievements(offset, limit, difficulty)`
- **Achievement** – `id`, `title`, `description`, `points`, `difficulty` (EASY | MEDIUM | HARD)

### Example query

```graphql
query GetGames($offset: Int!, $limit: Int!) {
  getGames(offset: $offset, limit: $limit) {
    id
    name
    genre
    achievements(offset: 0, limit: 10, difficulty: HARD) {
      title
      points
      difficulty
    }
  }
}
```

Variables:

```json
{
  "offset": 0,
  "limit": 5
}
```

### Example mutation

```graphql
mutation CreateGame($input: CreateGameInput!) {
  createGame(input: $input) {
    id
    name
    genre
  }
}
```

## Project structure

```
src/
├── app.module.ts
├── main.ts
├── schema.gql              # Generated GraphQL schema
├── achievements/
│   ├── achievements.module.ts
│   ├── achievements.resolver.ts
│   ├── achievements.service.ts
│   ├── inputs/
│   ├── schemas/            # Mongoose schemas
│   └── types/              # GraphQL types
├── games/
│   ├── games.module.ts
│   ├── games.resolver.ts
│   ├── games.service.ts
│   ├── args/               # GraphQL args (e.g. AchievementsArgs)
│   ├── input/
│   ├── schema/
│   └── types/
└── common/
    └── args/               # Shared args (e.g. PaginationArgs)
```

## Scripts

| Script          | Description        |
|-----------------|--------------------|
| `npm run dev`   | Start in watch mode|
| `npm run build` | Build for production|
| `npm run start` | Start (no watch)   |
| `npm run lint`  | Run ESLint         |
| `npm run format`| Format with Prettier|
| `npm run test`  | Unit tests         |

## License

UNLICENSED (private)

## Author
Kamalov Quvomiddin

https://t.me/kamalovq

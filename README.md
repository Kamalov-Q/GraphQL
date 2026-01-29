# GQL – Games & Achievements API

A GraphQL API built with **NestJS**, **Apollo**, and **MongoDB**. It manages games and their achievements with pagination and filtering.

## Tech stack

- **NestJS** – backend framework  
- **GraphQL** – Apollo Server with code-first schema  
- **Mongoose** – MongoDB ORM  
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

| Script             | Description                    |
|--------------------|--------------------------------|
| `npm run dev`      | Start in watch mode            |
| `npm run build`    | Build for production           |
| `npm run start`    | Start (no watch)               |
| `npm run schema:export` | Copy schema to `schema.graphql` (for frontend/codegen) |
| `npm run lint`     | Run ESLint                     |
| `npm run format`   | Format with Prettier           |
| `npm run test`     | Unit tests                     |

## Frontend integration (GraphQL Codegen)

The frontend can use the schema as **documentation** and generate **TypeScript types** and (optionally) **hooks** with [GraphQL Code Generator](https://the-guild.dev/graphql/codegen).

### 1. Where the schema comes from

- **Introspection** – API must be running. Point codegen at `http://localhost:3001/graphql`. No file needed.
- **Schema file** – Run `npm run schema:export` in this repo to write `schema.graphql` in the project root. You can copy that file into the frontend repo or reference it (e.g. in a monorepo).

### 2. Setup in the frontend project

Install Codegen and the TypeScript plugin:

```bash
npm install -D @graphql-codegen/cli @graphql-codegen/typescript @graphql-codegen/typescript-operations
```

Copy the example config from this repo:

```bash
cp path/to/gql/codegen.example.yml codegen.yml
```

Edit `codegen.yml`:

- **Using introspection:** set `schema: "http://localhost:3001/graphql"` (and start this API).
- **Using the schema file:** set `schema: "./schema.graphql"` (or the path where you put the file).

Point `documents` at your frontend GraphQL usage (e.g. `src/**/*.{graphql,gql,ts,tsx}`) and adjust `generates` to your desired output path.

### 3. Generate types

From the frontend project:

```bash
npx graphql-codegen
```

Or add a script in the frontend `package.json`:

```json
"codegen": "graphql-codegen"
```

Then run `npm run codegen`. This produces TypeScript types (and optionally hooks) from your `.graphql` / `.gql` files and the schema, so the schema effectively acts as the documentation for the generated API.

### 4. Optional: React Apollo / React Query hooks

To generate typed hooks (e.g. `useGetGamesQuery`), add:

```bash
npm install -D @graphql-codegen/typescript-react-apollo
```

In `codegen.yml`, add `typescript-react-apollo` to the `plugins` list for the same output file (see [Codegen docs](https://the-guild.dev/graphql/codegen/plugins/typescript/typescript-react-apollo)).

## License

UNLICENSED (private)

## Author
Kamalov Quvomiddin

https://t.me/kamalovq

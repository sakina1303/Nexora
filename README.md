# Nexora Setup Notes

## Requirements

1. Use SQLite for database storage
1. Use Prisma for ORM
1. Implement at least one full CRUD RESTful API
1. Deploy backend on Render and frontend on Vercel
1. Resolve CORS issues if needed after deployment

## Local Development

1. Create a server env file:

```bash
cd server
cp .env.example .env
```

2. Install dependencies and run migrations:

```bash
npm install
npm run migrate
```

3. Start the backend:

```bash
npm run dev
```

4. Start the frontend:

```bash
cd ../client
npm install
npm run dev
```

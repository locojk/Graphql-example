import express from 'express';
import { ruruHTML } from 'ruru/server';
import { createYoga } from 'graphql-yoga';
import { schema } from './src/graphql/index.js';
import { setupDatabase } from './src/sql/index.js';
import { graphql, getIntrospectionQuery } from 'graphql';

const app = express();

// Initialize SQLite Database
const db = await setupDatabase();

// Create GraphQL Yoga Server with SQLite Context
const yoga = createYoga({
  schema,
  context: async () => ({ db }),
});

app.use(express.json()); // Ensure JSON parsing for requests

// GraphQL API Endpoint
app.all('/graphql', yoga);

// Serve GraphiQL IDE
app.get('/', (_req, res) => {
  res.type('html');
  res.end(ruruHTML({ endpoint: '/graphql' }));
});

// ✅ Retrieve GraphQL Schema via POST (Fix for EvoMaster)
app.post('/schema', async (req, res) => {
  try {
    const result = await graphql({ schema, source: getIntrospectionQuery() });
    res.json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// ✅ Start Server
app.listen(4000, () => {
  console.log(`
  API running on: http://localhost:4000
  GraphQL Playground: http://localhost:4000/graphql
  Get Schema: http://localhost:4000/schema
  `);
});


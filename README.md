# GraphQL Example Project

This project is a GraphQL API built with Node.js and GraphQL Yoga, using SQLite as the database.

## Requirements

- Node.js (v16+ recommended)
- npm

## Installation

1. **Clone the Repository**

```bash
git clone <your-repo-url>
cd GraphQLExample
```

2. **Install Dependencies**

```bash
npm install
```

## Setting up the Database

The project uses SQLite and will automatically initialize the database (`database.sqlite`) and seed initial data.

- Database file: `database.sqlite`
- Database initialization happens automatically when starting the server.

## Running the API Server

Run the following command from the project root:

```bash
npm run start
```

The server will run at:

```
http://localhost:4000
```


## Running Tests Generated by EvoMaster

EvoMaster automatically generates tests. Ensure you have the Python dependencies:

```bash
pip install requests timeout-decorator
```

Then, you can execute tests.

Make sure your server (`npm run start`) is running during tests.

## Notes

- Ensure no other process is using port `4000`.
- Modify GraphQL schemas under `src/graphql/models/` for adding additional queries and mutations.

---
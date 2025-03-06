export const typeDef = /* GraphQL */ `
  type Query {
    users: [User!]!
    user(id: ID!): User
  }

  type Mutation {
    createUser(user: NewUserInput!): User
    deleteUser(id: ID!): Boolean
    updateUser(id: ID!, update: UpdateUserInput): User
  }

  input NewUserInput {
    name: String!
    email: String!
  }

  input UpdateUserInput {
    name: String!
  }

  type User {
    id: ID!
    name: String
    email: String

    comments: [Comment]
  }
`;

export const resolvers = {
  Query: {
    users: async (_, __, { db }) => {
      return db.prepare('SELECT * FROM users LIMIT 20').all();
    },

    user: async (_, { id }, { db }) => {
      return db.prepare('SELECT * FROM users WHERE id = ?').get(id);
    },
  },

  Mutation: {
    createUser: async (_, { user }, { db }) => {
      const { name, email } = user;
      const response = db
        .prepare('INSERT INTO users (name, email) VALUES (?, ?)')
        .run(name, email);

      return {
        id: response.lastInsertRowid,
        name,
        email,
      };
    },

    deleteUser: async (_, { id }, { db }) => {
      const response = db.prepare('DELETE FROM users WHERE id = ?').run(id);
      return response.changes > 0;
    },

    updateUser: async (_, { id, update }, { db }) => {
      if (!update) {
        throw new Error("Missing 'update' argument in 'updateUser' mutation.");
      }
    
      // 2) Destructure 'name'
      const { name } = update;
      if (!name) {
        throw new Error("Field 'name' is missing in 'update' input.");
      }
      db.prepare('UPDATE users SET name = ? WHERE id = ?').run(name, id);

      return db.prepare('SELECT * FROM users WHERE id = ?').get(id);
    },
  },

  User: {
    name: (obj) => obj.name.trim().toUpperCase(),
    comments: ({ email }, _, { db }) => {
      return db.prepare('SELECT * FROM comments WHERE email = ? LIMIT 20').all(email);
    },
  },
};
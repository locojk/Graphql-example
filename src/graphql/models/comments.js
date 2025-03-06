export const typeDef = /* GraphQL */ `
  type Query {
    comments: [Comment]
  }

  type Comment {
    id: ID
    text: String
    email: String

    user: User
  }
`;

export const resolvers = {
  Query: {
    comments: (_, __, { db }) => {
      return db.prepare('SELECT * FROM comments LIMIT 20').all();
    },
  },

  Comment: {
    user: ({ email }, _, { db }) => {
      return db.prepare('SELECT * FROM users WHERE email = ?').get(email);
    },
  },
};


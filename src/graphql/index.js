import { createSchema } from 'graphql-yoga';
import { typeDef as User, resolvers as userResolvers } from './models/user.js';
import { typeDef as Comment, resolvers as commentResolvers } from './models/comments.js';
import _ from 'lodash';

// ✅ Add User & Comment queries
const queries = /* GraphQL */ `
  type Query {
    hello: String
    users: [User!]!
    user(id: ID!): User
    comments: [Comment]
  }

  type Mutation {
    testMutation(input: String!): String
    createUser(user: NewUserInput!): User
    deleteUser(id: ID!): Boolean
    updateUser(id: ID!, update: UpdateUserInput): User
  }
`;

const resolvers = {
  Query: {
    hello: () => 'Hello from Yoga!',
  },
  Mutation: {
    testMutation: (_, { input }) => `Received: ${input}`,
  },
};

// ✅ Merge all resolvers properly
export const schema = createSchema({
  typeDefs: [queries, User, Comment],
  resolvers: _.merge(resolvers, userResolvers, commentResolvers),
});
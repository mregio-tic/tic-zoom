import {gql} from "apollo-server-express";

export const userDefinition = gql`
    type User {
        username: String!
    }

    type Query {
        getAllUsers: [User!]!,
        getOneUser(username: String!): User!
    }

    type Mutation {
        createUser(username: String!): User!
    }
`


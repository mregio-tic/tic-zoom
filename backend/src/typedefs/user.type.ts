import {gql} from "apollo-server-express";

export const userDefinition = gql`
    type User {
        id: Int
        username: String
        group: String
        audio: Boolean
        talking: Boolean
        active: Boolean
    }

    type Query {
        getAllUsers: [User!]!,
        getOneUser(username: String!): User!
    }

    type Mutation {
        createUser(username: String!, group: String!, audio: Boolean, talking: Boolean, active: Boolean): User!
        updateUser(username: String!, group: String!, audio: Boolean, talking: Boolean, active: Boolean): User!
    }
`


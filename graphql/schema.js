/**
 * Graphql Schema
 * 
 * @module graphql/schema
 */


const schema = `

type Tag {
    id: ID!
    latitude: Float!
    longitude: Float!
    type: String!
    data: String!
}

type Query {
    getTagById(id: ID!): Tag
    getAllTags: [Tag]
    getTagsByType(type: String!): [Tag]
    getImageTags: [Tag]
}

type Mutation {
    createImageTag(latitude: Float!, longitude: Float!, data: String!): Tag
}

schema {
    query: Query
    mutation: Mutation
}
`;

module.exports = schema;
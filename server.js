'use strict'

const Hapi = require('hapi');
const { graphqlHapi, graphiqlHapi } = require('apollo-server-hapi');
const {makeExecutableSchema} = require('graphql-tools');
const graphqlSchema = require('./graphql/schema');
const createResolvers = require('./graphql/resolvers');

const server = Hapi.server({
    host: 'localhost',
    port: 8080
});

const TagsRepository = require('./model/repository/TagsRepository');
const tagsRepository = new TagsRepository();
const TagsController = require('./controller/TagsController');
let tagsController = new TagsController(server);
const executableSchema = makeExecutableSchema({
    typeDefs: [graphqlSchema],
    resolvers: createResolvers({tagsRepository})
});

async function start() {
    await server.register({
        plugin: graphqlHapi,
        options: {
            path: '/graphql',
            graphqlOptions: {
                pretty: true,
                schema: executableSchema
            },
            route: {
                cors: true
            },
        }
    });

    await server.register({
        plugin:graphiqlHapi,
        options: {
            path: '/graphiql',
            graphiqlOptions: {
                endpointURL: '/graphql'
            }
        }
    });

    try {
        await server.start();
    }
    catch (err) {
        console.log(err);
        process.exit(1);
    }

    console.log('Server running at: ' + server.info.uri);
}

start();
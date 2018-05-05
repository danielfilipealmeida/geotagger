# GEO TAGGER API

A simple Hapi-API for storing information with geo tags.

2018 Daniel Almeida


## Endpoints

The server currently have two endpoints for fetching and inserting Tag information and an endpoint for the GraphiQL IDE.


### Searching

Currently only retrieves all tags, without any search capabilities.

* URL: http://localhost:8080/tags

* Method: GET


### Inserting a Tag:

* URL: http://localhost:8080/tags

* Method: POST

* Body param keys: latitude, longitude, type, data

### GraphiQL

* URL: http://localhost:8080/graphiql

## GraphQL

### Queries

#### Get a tag by Id


    {
        getTagById (id: "3zsIz9n5luTDapmx") {
            latitude, longitude, type
        }
    }

#### Get all tags by a given type

    {
        getTagsByType(type: "image") {
            latitude
            longitude
            type
        }
    }

#### Get all Image Tags

    {
        getImageTags {
            data
            latitude
            longitude
        }
    }


### Mutations

#### Add an image tag

    mutation ($latitude: Float!, $longitude: Float!, $data: String!) {
        createImageTag (latitude: $latitude, longitude: $longitude, data: $data) {
            latitude,
            longitude,
            data
        }
    }

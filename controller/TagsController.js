/**
 * TagController Module
 * 
 * Implements a controller for handling requests related to Tags. 
 * The following is done here:
 *  - GET and POST tags endpoint for search and insertions of tags
 * 
 * @module controller/TagsController
 */

const TagsRepository = require('../model/repository/TagsRepository');

module.exports = class TagsController {
    constructor(server)
    {
        this.server = server;
        this.root = '/tags'
        this.repository = new TagsRepository();
        
        this.createRoutes();
    }
    
    /**
     * Creates all routes for the Tags model
     */
    createRoutes()
    {
        this.server.route({
            method: 'GET',
            path: this.root,
            handler: this.handleGET.bind(this)
        });

        this.server.route({
            method: 'POST',
            path: this.root,
            handler: this.handlePOST.bind(this)
        })
    }

    /**
     * Handles GET's. prints out all tags for the corrent user
     * @param {} request 
     * @param {*} h 
     */
    async handleGET(request, h) 
    {
       let records = [];

       
        try {
            records = await this.repository.all();
        }
        catch (err) {
            return {
                'error': true,
                'message': err.message
            }
        }

        return records;
    }

    /**
     * Method that handles POST's. insert's a tag if all data is correct
     * @param {*} request 
     * @param {*} h 
     */
    async handlePOST(request, h)
    {
        let document = {
            latitude: request.payload.latitude,
            longitude:request.payload.longitude, 
            data: request.payload.data,
            type: request.payload.type
        };

        let newDocument;
        try {
            newDocument = await this.repository.insert(document);
        }
        catch (err) {
            return {
                error: true,
                message: err.message
            };
        }

        return {
            error: false, 
            message: 'Tag added',
            newDocument: newDocument
        };
    }

}
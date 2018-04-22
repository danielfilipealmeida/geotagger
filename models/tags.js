var Datastore = require('nedb');
const util = require('util');


module.exports = class Tag {
    constructor(server)
    {
        this.server = server;
        this.root = '/tags'
        this.db = new Datastore({filename: 'Tags'});
        this.db.loadDatabase();        

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
        //const find = util.promisify(this.db.find);
        
        let records = [];

        try {
            records = await this.findTags({});
        }
        catch (err) {
            console.log(err);
            return {
                'error': true,
                'message': error
            }
        }

        return records;
        
        /*
        return new Promise((resolve, reject) => {
            const find = util.promisify(this.db.find);

            find({}).then((records) => {
                resolve(records);
            })
            .catch((err) => {
                reject(err);   
            });
        });
        */
    }

    /**
     * Method that handles POST's. insert's a tag if all data is correct
     * @param {*} request 
     * @param {*} h 
     */
    async handlePOST(request, h)
    {
        console.log(request.payload);

        let document = {
            latitude: request.payload.latitude,
            longitude:request.payload.longitude, 
            data: request.payload.data,
            type: request.payload.type
        };

        let newDocument;
        try {
            newDocument = await this.insertTag(document);
        }
        catch (err) {
            return {
                error: true,
                message: err
            };
        }
        
        //this.db.insert(document);

        return {
            error: false, 
            message: 'Tag added',
            newDocument: newDocument
        };
    }

    /**
     * get Tags by search condition
     * @param {*} condition 
     */
    async findTags(condition)
    {
        let promise = new Promise(function(resolve, reject) {
                this.db.find(condition, function(err, records) {
                    if (err) {
                        reject(err);
                        return;
                    }
    
                    resolve(records);
                });
            }.bind(this));
    
        return await promise;
    }

    /**
     * Returns a promisified insert of a tag
     * @param {object} tag
     */
    async insertTag(tag)
    {
        return await new Promise((resolve) => {
            this.db.insert(tag, (err, newTag)=> {
                resolve(newTag)
            })
        });
    }

}
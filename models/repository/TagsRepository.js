var Datastore = require('nedb');

/**
 * Tags Repository class for storying/searching Tags
 */
module.exports = class TagsRepository {

    /**
     * Constructor.
     * Sets up the repository by connecting to the Tags Datasource
     */
    constructor()
    {
        this.db = new Datastore({filename: 'Tags'});
        this.db.loadDatabase();
    }

    /**
     * Insert a new Tag
     * @param {*} tag 
     */
    async insert(tag) {
        return await new Promise((resolve) => {
            this.db.insert(tag, (err, newTag)=> {
                resolve(newTag)
            })
        });
    }

    /**
     * Fetch all Tags with the given condition
     * @param {*} searchCondition 
     */
    async search(searchCondition) {
        return await new Promise((resolve) => {
            throw new Error('some shit!');
            this.db.find(searchCondition, function(err, records) {
                resolve(records);
            });
        });

    }
}
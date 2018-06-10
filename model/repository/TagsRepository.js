/**
 * Tags Repository
 * 
 * Handles data persistency and search.
 * 
 * @module model/repository/Tagsrepository
 */


const axios = require('axios');


/**
 * Tags Repository class for storying/searching Tags
 */
module.exports = class TagsRepository {

    /**
     * Constructor.
     * Sets up the repository by connecting to the Tags Datasource
     */
    constructor() {
        this.database = 'geotag';
        this.url = 'http://127.0.0.1';
        this.port = 5984;
    }


    /**
     * Return the url for inserting a new document. 
     * This also fetches a uuid
     */
    getInsertUrl() {
        let getUuidUrl = `${this.url}:${this.port}/_uuids`;

        return axios.get(getUuidUrl).then((response) => {
            let uuids = response.data.uuids[0];
            return `${this.url}:${this.port}/${this.database}/${uuids}`;
        });
    }

    /**
     * Insert a new Tag
     * @param {*} tag 
     */
    async insert(tag) {
        return this.getInsertUrl()
            .then((url) => {
                return axios.put(
                    url,
                    tag
                );
            })
            .then(result => {
                if (!result.data.ok) {
                    throw result.statusText;
                }
                return tag;
            });
    }

    /**
     * Fetch all Tags with the given condition.
     * TODO!!!
     * @param {*} searchCondition 
     */
    async search(searchCondition) {
        let url = `${this.url}:${this.port}/${this.database}/_all_docs`;
        return axios.get(
            url
        )
            .then(result => {
                return result.data.rows;
            });
    }

    /**
     * Fetch all Tags 
     * @param {*} searchCondition 
     */
    async all() {
        let url = `${this.url}:${this.port}/${this.database}/_design/views/_view/all`;
        return axios.get(
            url
        )
            .then(result => {
                return result.data.rows;
            });
    }
}
/**
 * Tag Entity class
 * not using this at the moment since I'm working directly with json data stored on a NeDB Datasource.
 * Probably this will be deleted.
 */
module.exports = class Tag {
    constructor(server)
    {
        this.latitude = null;
        this.longitude = null;
        this.type = null;
        this.data = null;
    }
}
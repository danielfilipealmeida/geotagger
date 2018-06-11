/**
 * Graphql Resolvers
 * 
 * @module graphql/resolvers
 */

const resolvers = (models) => ({
    Query: {
        /**
         * Search one tag by its Id
         * 
         * @param {any} root 
         * @param {any} {id} 
         * @returns 
         */
        getTagById(root, { id }) {
            return models.tagsRepository.search({ '_id': id }).then((response) => {
                return response[0];
            })
        },

        /**
         * Return all tags
         * 
         * @param {any} root 
         * @returns 
         */
        getAllTags(root) {
            return models.tagsRepository.all()
                .then((response) => {
                    return response.map(record => record.value)
                });
        },

        /**
         * Search a tag by it's type
         * 
         * @param {any} root 
         * @param {any} {type} 
         * @returns 
         */
        getTagsByType(root, { type }) {
            return models.tagsRepository.getByType(type)
                .then((response) => {
                    return response.map(record => record.value)
                });
        },

        /**
         * Return all image tags
         * 
         * @param {any} root 
         * @returns 
         */
        getImageTags(root) {
            return models.tagsRepository.getByType('image')
                .then((response) => {
                    return response.map(record => record.value)
                });
        },

        /**
         * Return all text
         * @param {*} root 
         */
        getTextTags(root) {
            return models.tagsRepository.getByType('text')
                .then((response) => {
                    return response.map(record => record.value)
                });
        }
    },


    /**
     * Set the Mutations
     */
    Mutation: {

        /**
         * Creates an image Tag
         * 
         * @param {any} root 
         * @param {any} args 
         * @returns 
         */
        createImageTag(root, args) {
            let data = {
                type: 'image',
                latitude: args.latitude,
                longitude: args.longitude,
                data: args.data
            };

            return models.tagsRepository.insert(data).then((newImageTag) => newImageTag)
        },

        /**
         * 
         * @param {*} root 
         * @param {*} args 
         */
        createTextTag(root, args) {
            let data = {
                type: 'text',
                latitude: args.latitude,
                longitude: args.longitude,
                data: args.data
            };

            return models.tagsRepository.insert(data).then((newImageTag) => newImageTag)
        },

        /**
         * 
         * @param {*} root 
         * @param {*} args 
         */
        createSoundTag(root, args) {
            let data = {
                type: 'sound',
                latitude: args.latitude,
                longitude: args.longitude,
                data: args.data
            };

            return models.tagsRepository.insert(data).then((newImageTag) => newImageTag)
        }
    }
});

module.exports = resolvers;
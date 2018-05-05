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
        getTagById(root, {id}) {
            return models.tagsRepository.search({'_id': id}).then((response) => {
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
            return models.tagsRepository.search({}).then((response) => response)
        },

        /**
         * Search a tag by it's type
         * 
         * @param {any} root 
         * @param {any} {type} 
         * @returns 
         */
        getTagsByType(root, {type}) {
            return models.tagsRepository.search({type: type})
                .then((response) => response)
        },

        /**
         * Return all image tags
         * 
         * @param {any} root 
         * @returns 
         */
        getImageTags(root) {
            return models.tagsRepository.search({type: 'image'})
                .then((response) => response)
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
        }
    }
});

module.exports = resolvers;
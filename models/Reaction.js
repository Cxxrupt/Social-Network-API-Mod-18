const { Schema } = require('mongoose');

// Define the reaction schema
const reactionSchema = new Schema(
    {
        // Set custom id to avoid confusion with parent comment _id
        reactionId: {
            type: Schema.Types.ObjectId,
            default: () => new Types.ObjectId()
        },
        reaction: {
            type: String,
            required: true,
            max_length: 280,
            min_length: 1
        },
        username: {
            type: String,
            required: true,
        },
        createdAt: {
            type: Date,
            default: Date.now,
            // Use moment in a getter method to format the timestamp on query
        }
    },
    {
        toJSON: {
            getters: true
        },
        id: false,
    }
);

// Export the reaction schema
module.exports = reactionSchema;
const { Schema, model } = require('mongoose');
const reactionSchema = require('./Reaction');

const thoughtSchema = new Schema(
    {
        thoughts: {
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
            // use moment in a getter method to format the timestamp on query
        },
        reactions: [reactionSchema]
    },
    {
        toJSON: {
            getters: true
        },
        id: false,
    }
);

const Thoughts = model('thoughts', thoughtsSchema);

module.exports = Thoughts;

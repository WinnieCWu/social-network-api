const { Schema, model } = require("mongoose");
const dateFormat = require("../utils/dateFormat");

const ReactionSchema = new Schema (
    {
        reactionId: { 
            type: Schema.Types.ObjectId,
            default: () => new Types.ObjectId()
        },
        reactionBody: { 
            type: String,
            required: true,
            //280 character minimum
            min: 280
        },
        username: {
            type: String, 
            required: true
        },
        createdAt: { 
            type: Date,
            default: Date.now,
            get: (createdAtVal) => dateFormat(createdAtVal)
        }
    })


const ThoughtSchema = new Schema(
    {
        thoughtText: {
            type: String, 
            required: true,
            //must be between 1-280 characters
            min: 1,
            max: 280
        },
        createdAt: { 
            type: Date,
            default: Date.now,
            get: (createdAtVal) => dateFormat(createdAtVal)
        },
        //the user that created this thought
        username: {
            type: String, 
            required: true
        },
        //use ReactionSchema to validate data for thought reactions, like replies
        reactions: [ReactionSchema]
    },
    {
        toJSON: {
            virtuals: true,
            getters: true
        }
    }
);

//Create a virtual called reactionCount that retrieves the length of the thought's reactions array field on query results
ThoughtSchema.virtual("reactionCount").get(function () {
    return this.reactions.length;
  });
  
  const Thought = model("Thought", ThoughtSchema);
  
  module.exports = Thought;
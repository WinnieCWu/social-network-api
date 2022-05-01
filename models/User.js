const { Schema, model } = require("mongoose");
const dateFormat = require("../utils/dateFormat");
import {isEmail} from 'validator';
//or import isEmail from 'validator/lib/isEmail';

const UserSchema = new Schema(
    {
        username: { 
            type: String, 
            unique: true, 
            required: true,
            trimmed: true
        },
        email: { 
            type: String, 
            unique: true, 
            required: true,
            validate: [isEmail, 'invalid email']  
            //must match valid email address using Mongoose matching validation
        },
        thoughts: { 
            //[ _id values referencing Thought model]
            _id: ObjectId(reactionId),
            ref: 'Thought'
        }, 
        friends: {
            //[ _id values referencing the User model (self-reference)]
            _id: ObjectId(User),
            ref: 'User'
        }
    },
    {
        toJSON: {
          virtuals: true,
          getters: true
        },
    }
);

//create a virtual called friendCount that retrieves the length of user's friends array field on query
UserSchema.virtual("friendCount").get(function () {
    return this.friends.length;
  });
  
const User = model("User", UserSchema);
  
module.exports = User;
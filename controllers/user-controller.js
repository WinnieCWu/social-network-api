const { User } = require("../models");

const userController = {
    //get all users
    getAllUsers(req, res) {
        User.find({})
        .then(dbUserData => res.json(dbUserData))
        .catch(err => {
            console.log(err);
            res.sendStatus(400);
        });
    },
    // get one user by id
    getUserById(req, res) {
        User.findOne({_id: params.id})
        .then(dbUserData => {
            //if no user is found, send 404
            if (!dbUserData) {
                res.status(404).json({message: 'No user found with this id!'});
                return;
            }
            res.json(dbUserData);
        })
        .catch(err => {
            console.log(err);
            res.sendStatus(400);
        });
        //also get populated thought and friend data
    },
    //create new user
    createUser({body}, res) {
        User.create(body)
        //{"username":"name", "email":"email@mail.com"}
        .then((dbUserData) => res.json(dbUserData))
        .catch((err) => res.json(err));
    },
    //update user from db
    updateUser({params, body}, res) {
        // ensure return of new document and validation of updated information
        User.findOneAndUpdate({ _id: params.id }, body, { new: true, runValidators: true })
        .then((dbUserData) => {
          if (!dbUserData) {
            res.status(404).json({ message: "No user found with this id!" });
            return;
          }
          res.json(dbUserData);
        })
        .catch((err) => res.json(err));
    },
    //delete user from db
    deleteUser({params}, res) {
        User.findOneAndDelete({ _id: params.id })
        .then((dbUserData) => res.json(dbUserData))
        .catch((err) => res.json(err));
    },
    //add new friend
    addFriend({params, body}, res) {
        User.findOneAndUpdate(
            { _id: params.friendId },
            { $push: { replies: body } },
            { new: true}
        )
        .then((dbUserData) => {
            if (!dbUserData) {
              res.status(404).json({ message: "No user found with this id!" });
              return;
            }
            res.json(dbUserData);
          })
          .catch((err) => res.json(err));
    },
    //remove friend 
    removeFriend({params}, res) {
        User.findOneAndUpdate(
            { _id: params.friendId },
            { $pull: { replies: {friendId: params.friendId} } },
            { new: true}
        )
        .then((dbPizzaData) => res.json(dbPizzaData))
        .catch((err) => res.json(err));
    }
};

module.exports = userController;
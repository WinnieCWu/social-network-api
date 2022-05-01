const router = require('express').Router();

//hook up functionality with the routes
const {
    getAllUsers,
    getUserById,
    createUser,
    updateUser,
    deleteUser,
    addFriend,
    removeFriend
} = require('../../controllers/user-controller');

// Set up GET all and POST at /api/users
router
    .route('/')
    .get(getAllUsers)
    .post(createUser);

// Set up GET one, PUT, and DELETE at /api/users/:id
router
    .route('/:id')
    .get(getUserById)
    .put(updateUser)
    .delete(deleteUser);

//Set up POST new friend and DELETE friend to/from user's friend list
router.route("/users/:userId/friends/:friendId")
    .post(addFriend)
    .delete(removeFriend)

module.exports = router;
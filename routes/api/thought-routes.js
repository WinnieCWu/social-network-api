const router = require('express').Router();

const { 
  getAllThoughts,
  getThoughtById,
  createThought,
  updateThought,
  deleteThought,
  createReaction,
  removeReaction  
} = require('../../controllers/thought-controller');

// Set up GET all and POST at /api/thoughts
router
    .route('/')
    .get(getAllThoughts)
    .post(createThought);

// Set up GET one, PUT, and DELETE at /api/thoughts/:id
router
    .route('/:id')
    .get(getThoughtById)
    .put(updateThought)
    .delete(deleteThought);

//Set up POST new reaction to thought's reaction array
router.route("/thoughts/:thoughtId/reactions")
    .post(createReaction)
    
//Set up DELETE reaction by reaction's reactionId value
router.route("/thoughts/:thoughtId/:reactionId")
    .delete(removeReaction)

module.exports = router;

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

// Set up GET one, PUT, and DELETE at /api/thoughts/:id
router
    .route('/:id')
    .get(getThoughtById)
    .post(createThought)
    .put(updateThought)
    .delete(deleteThought)

//Set up POST new reaction to thought's reaction array
router.route("/:thoughtId/reactions")
    .post(createReaction)
    
//Set up DELETE reaction by reaction's reactionId value
router.route("/:thoughtId/reactions/:reactionId")
    .delete(removeReaction)

module.exports = router;

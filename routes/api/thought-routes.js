const router = require('express').Router();

// what you need for thoughts-controller
const {
    getAllThoughts,
    getThoughtsById,
    createThoughts,
    updateThoughts,
    delteThoughts,
    addReaction,
    deleteReaction
} = require('../../controllers/thoughts-controller');

router.route('/').get(getAllThoughts);

router.route('/:id').get(getThoughtsById);

router.route('/:userId').post(createThoughts);

router.route('/:thoughtId/reactions').post(addReaction);

router.route('/:thoughtId/reactions/:reactionId').delete(deleteReaction);

module.exports = router;
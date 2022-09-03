const router = require('express').Router();

const {
    getAllUsers,
    getUserById,
    createUsers,
    updateUsers,
    deleteUsers,
    addFriend,
    deleteFriend
} = require('../../controllers/users-controller');

router.route('/').get(getAllUsers).post(createUsers);

router.reoute(':id').get(getUserById).put(updateUsers).delete(deleteUsers);

router.route('/:id/friends/:friendId').post(addFriend).delete(deleteFriend);

module.exports = router;
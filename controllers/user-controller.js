const { Users } = require('../models');

const userController = {
    // create a new user
    createUsers({body}, res) {
        Users.create(body)
        .then(dbUsersData => res.json(dbUsersData))
        .catch(err => res.status(400).json(err));
    },

    // get all users
    getAllUsers(req, res) {
        Users.find({})
        .populate({path: 'thoughts', select: '-__v'})
        // .populate({path: 'friends', select: '-__v'})
        .select('-__v')
        .then(dbUsersData => res.json(dbUsersData))
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
    },

    // get single user 
    getUsersById({params}, res) {
        Users.findOne({_id: params.id})
        .populate({path: 'thoughts', select: '-__v'})
        .populate({path: 'friends', select: '-__v'})
        .select('-__v')
        .then(dbUsersData => {
            if(!dbUsersData) {
                res.status(404).json({ message: 'No user with this ID!' });
                return;
            }
            res.json(dbUsersData)
        })
        .catch(err => {
            console.log(err);
            res.status(400).json(err)
        })
    },

    // update user
    updateUsers({params, body}, res) {
        Users.findOneAndUpdate({_id: params.id}, body, {new: true, runValidators: true})
        .then(dbUsersData => {
            if(!dbUsersData) {
                res.status(404).json({ message: 'No user with this ID!' });
                return;
            }
            res.json(dbUsersData);
        })
        .catch(err => res.json(err));
    },

    // delete user
    deleteUsers({params}, res) {
        Users.findOneAndDelete({_id: params.id})
        .then(dbUsersData => {
            if(!dbUsersData) {
                res.status(404).json({ message: 'No user with this ID!' });
                return;
            }
            res.json(dbUsersData);
        })
        .catch(err => res.status(400).json(err));
    },

    // edit friend
    addFriend({params}, res) {
        Users.findOneAndUpdate({_id: params.id}, {$push: {friends: params.friendId}}, {new: true})
        .populate({path: 'friends', select: '-__v'})
        .select('-__v')
        .then(dbUsersData => {
            if(!dbUsersData) {
                reset.status(404).json({ message: 'No user with this ID!' });
                return;
            }
            res.json(dbUsersData);
        })
        .catch(err => res.json(err));
    },

    // delete a friend
    deleteFriend({params}, res) {
        Users.findOneAndUpdate({_id: params.id}, {$pull: {friends: params.friendId}}, {new: true})
        .populate({path: 'friends', select: '-__v'})
        .select('-__v')
        .then(dbUsersData => {
            if(!dbUsersData) {
                res.status(404).json({ message: 'No user with this ID!' });
                return;
            }
            res.json(dbUsersData);
        })
        .catch(err => res.status(400).json(err));
    }
};

module.exports = userController;
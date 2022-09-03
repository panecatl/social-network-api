const router = require('express').Router();

// import the api routes
const apiRoutes = require('./api');

// prefix of /api
router.use('/api', apiRoutes);

router.use((req, res) => {
    res.status(404).send('<h1>404 Error...</h1>');
});

module.exports = router;
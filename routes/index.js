const router = require('express').Router();

router.use('/person', require('./api/person'));
router.use('/class', require('./api/class'));

module.exports = router;
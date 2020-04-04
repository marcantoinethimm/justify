const express = require('express');
const router = express.Router();
const justifyControler = require('../controlers/justify')
const auth = require('../middleware/auth')
const dateUpdt = require('../middleware/dateupdater')
//Routes accessibles
router.post('/', [auth, dateUpdt] ,justifyControler.justifyText);

module.exports = router;

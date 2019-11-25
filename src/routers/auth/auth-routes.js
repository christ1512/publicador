const {Router} = require('express')
const router =Router()

const authCtrl = require('../../controllers/auth-controller')

router.post('/login',authCtrl.login);

module.exports = router
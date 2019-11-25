const {Router} = require('express')
const router =Router()

const authCtrl = require('../../controllers/auth-controller')
const { AuthRequestRules, validateAuth } = require('../../utils/request/auth/auth-request')

router.post('/login', [AuthRequestRules(), validateAuth],authCtrl.login);

module.exports = router
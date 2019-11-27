const {Router} = require('express')
const router =Router()

const authCtrl = require('../../controllers/auth-controller')
const {destroyToken,getToken,compareToken}=require('../../utils/middelware/valid_user/valid-user-middleware')
const { AuthRequestRules, validateAuth } = require('../../utils/request/auth/auth-request')

router.post('/login', [AuthRequestRules(), validateAuth],authCtrl.login);
router.get('/logout',getToken,compareToken,destroyToken);

module.exports = router
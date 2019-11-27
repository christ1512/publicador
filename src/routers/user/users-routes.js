const {Router} = require('express')
const router =Router()

const routerCtrl = require('../../controllers/user-controller')
const {getToken,compareToken,destroyToken}= require('../../utils/middelware/valid_user/valid-user-middleware')
const { userRequestRules, validate } = require('../../utils/request/create-user-request')
const { userUpdateRequestRules, validateUpdate } = require('../../utils/request/update-user-request')

router.get( '/users/list', getToken,compareToken,routerCtrl.list)
router.get( '/users/', getToken, routerCtrl.show )
router.post('/users', userRequestRules(), validate, routerCtrl.create )
router.put( '/users', [getToken, userUpdateRequestRules(), validateUpdate], routerCtrl.updateUser )

module.exports=router
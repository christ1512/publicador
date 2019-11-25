const {Router} = require('express')
const router =Router()

const routerCtrl = require('../../controllers/user-controller')
const verify = require('../../utils/middelware/valid_user/valid-user-middleware')
const { userRequestRules, validate } = require('../../utils/request/create-user-request')
const { userUpdateRequestRules, validateUpdate } = require('../../utils/request/update-user-request')

router.get( '/users/list', routerCtrl.list )
router.get( '/users/', verify, routerCtrl.show )
router.post('/users', userRequestRules(), validate, routerCtrl.create )
router.put( '/users', [verify, userUpdateRequestRules(), validateUpdate], routerCtrl.updateUser )

module.exports=router
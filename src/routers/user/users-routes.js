const {Router} = require('express')
const router =Router()

const routerCtrl = require('../../controllers/user-controller')

/*const {
loginUser
}=require('../controllers/user-controller')


router.route('/login')
.get(loginUser)*/
router.get( '/users', routerCtrl.list )
router.get( '/users/:id', routerCtrl.show )
router.post('/users', routerCtrl.create )

module.exports=router
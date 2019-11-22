const {Router} = require('express')
const router =Router()
const {
loginUser
}=require('../controllers/user-controller')


router.route('/login')
.get(loginUser)

module.exports=router
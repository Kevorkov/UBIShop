const Router = require ('express')
const router = new Router()
const  typeController = require ('../controllers/typeController')
const checkRoleMiddlewear = require('../middlewear/checkRoleMiddlewear')

router.post('/',checkRoleMiddlewear('ADMIN'), typeController.create)
router.get('/',typeController.getAll)

module.exports = router
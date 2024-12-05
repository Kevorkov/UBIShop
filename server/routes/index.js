const Router = require ('express')
const router = new Router()
const userRouter = require('../routes/userRouter')
const typeRouter = require('../routes/typeRouter')
const brandRouter = require('../routes/brandRouter')
const deviceRouter = require('../routes/deviceRouter')

router.use('/user',userRouter)
router.use('/type', typeRouter)
router.use('/brand', brandRouter)
router.use('/device',deviceRouter)


module.exports = router
const router = require("express").Router()
const { verifyAccessToken, isAdmin } = require("../middlewares/verifyToken")
const ctrls = require("../controllers/order")

router.post("/", verifyAccessToken, ctrls.createOrder)
router.put("/status/:oid", verifyAccessToken, isAdmin, ctrls.updateStatus)
router.get("/admin", verifyAccessToken, isAdmin, ctrls.getOrders)
router.get("/", verifyAccessToken, ctrls.getUserOrders)
router.get("/getAllOrders", verifyAccessToken, ctrls.getAllUserOrders)
router.post("/momopayment",ctrls.momopayment)


module.exports = router

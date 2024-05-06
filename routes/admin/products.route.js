const express = require("express")
const router = express.Router()
const multer  = require('multer')
const uploadCloud = require("../../middlewares/admin/uploadCloud.middleware")
const controller = require("../../controller/admin/products.controller")
const storage= require("../../helpers/storgaeMulterHelper")
const validate = require("../../validates/admin/product.validate")
// const upload = multer({ storage: storage  })
const upload = multer()
router.get("/", controller.index)
router.patch("/change-status/:status/:id", controller.changeStatus)
router.patch("/change-multi", controller.changeMulti)
router.delete("/delete/:id", controller.deleteItem)
router.get("/create", controller.create)
router.get("/edit/:id", controller.edit)
router.post("/create",
    upload.single('thumbnail'),
    uploadCloud.uploadSingle
    ,validate.createPost, controller.createPost
)
router.patch("/edit/:id", upload.single('thumbnail'),validate.createPost, controller.editPatch)
router.get("/detail/:id", controller.detail)
module.exports = router
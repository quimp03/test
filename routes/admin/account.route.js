const express = require("express")
const multer = require('multer')
const router = express.Router()
const validate = require("../../validates/admin/account.validate")
const uploadCloud = require("../../middlewares/admin/uploadCloud.middleware")   
const controller = require("../../controller/admin/accounts.controller")
const upload = multer()
router.get("/", controller.index)
router.get("/create", controller.create)
router.post("/create",
    upload.single('avatar'),
    uploadCloud.uploadSingle,
    validate.createPost,
    controller.createPost
)
module.exports = router
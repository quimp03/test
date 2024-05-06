const express = require("express")
const multer  = require('multer')
const route = express.Router()
const uploadCloud = require("../../middlewares/admin/uploadCloud.middleware")

const upload = multer()
const controller = require("../../controller/admin/products-category.controller")

route.get("/", controller.index)
route.get("/create", controller.create)
route.post(
    "/create",
    upload.single('thumbnail'),
    uploadCloud.uploadSingle,
    controller.createPost)
route.get("/edit/:id", controller.edit)
route.patch(
    "/edit/:id",
    upload.single('thumbnail'),
    uploadCloud.uploadSingle,
    controller.editPatch)
route.get("/edit/:id", controller.edit  )
module.exports = route
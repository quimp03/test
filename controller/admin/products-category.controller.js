const ProductCategory = require("../../models/product-category.model")
const systemConfig = require("../../config/system")
const createTreehelper =require("../../helpers/createTree.helper")
const createTreeHelper = require("../../helpers/createTree.helper")
//[GET] admin/pages/products-category/index
module.exports.index = async(req, res) => {
    const records = await ProductCategory.find({
        deleted: false
    })
   res.render("admin/pages/products-category/index",{
        pageTitle: "Danh mục sản phẩm",
        records: records
   })
}
//[GET] admin/pages/products-category/create
module.exports.create = async(req, res) => {
    const records = await ProductCategory.find({
        deleted: false
    }); 
   
    const newRecords = createTreehelper(records)
    res.render("admin/pages/products-category/create", {
        pageTitle: "Thêm mới danh mục sản phẩm",
        records: newRecords
    })
}
//[POST] 
module.exports.createPost = async(req, res) => {
    if(req.body.position){
        req.body.position = parseInt(req.body.position)
    }else{
        const countProduct = await ProductCategory.countDocuments()
       req.body.position = countProduct + 1
    }
    const record = new ProductCategory(req.body)
    await record.save()
    res.redirect(`/${systemConfig.prefixAdmin}/products-category`)
}
//[GET]
module.exports.edit = async(req, res) => {
        
    try{
        let find = {
            _id: req.params.id,
            deleted: false
        }
        const data   = await ProductCategory.findOne(find);
        const records = await ProductCategory.find({
            deleted: false
        })
        const newRecords = createTreeHelper(records)
        res.render("admin/pages/products-category/edit", {
            pageTitle: "Chỉnh sửa danh mục sản phẩm",
            data: data,
            records: newRecords,
        })
    }catch(error){
        res.redirect(`/${systemConfig.prefixAdmin}/products-category`)
    }
}
 //[PATCH] amdmin/products-category/edit/:id
 module.exports.editPatch = async(req, res) => {
    const id = req.params.id
    req.body.position = parseInt(req.body.position);
    try{
        await ProductCategory.updateOne({_id: id}, req.body);
        req.flash("success", "Cập nhật danh mục thành công")
    }catch(error){
        req.flash("error", `Cập nhật danh mục không thành công!`)
    }
    req.redirect("back")
}
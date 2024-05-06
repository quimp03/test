const Role = require("../../models/role.model")
const systemConfig = require("../../config/system")
//[GET] "admin/pages/roles/index.pug"
module.exports.index = async(req, res) => {
    let find = {
        deleted: false
    }
    const records = await Role.find(find)
    res.render("admin/pages/roles/index.pug", {
        pageTitle: "Nhóm quyền",
        records: records
    })
}
//[GET] "admin/pages/roles/create.pug"
module.exports.create = async(req, res) => {
    res.render("admin/pages/roles/create.pug", {
        pageTitle: "Trang thêm mới nhóm quyền"
    })
}
//[POST] "admin/pages/roles/createPost.pug"
module.exports.createPost = async(req, res) => {
    const record = new Role(req.body);
    await record.save();
    req.flash('success', "Thêm nhóm quyền thành công!");
    res.redirect(`/${systemConfig.prefixAdmin}/roles`)
}
//[GET] "admin/pages/roles/edit.pug"
module.exports.edit = async(req, res) => {
    try{
        const data = await Role.findOne({
            _id: req.params.id,
            deleted: false,
        })
        res.render("admin/pages/roles/edit", {
            pageTitle: "Trang chỉnh sửa nhóm quyền",
            data: data
        })
    }
    catch(error) {
        res.redirect(`/${systemConfig.prefixAdmin}/roles`)
    }   
}
module.exports.delete = async(req, res) => {
    const id = req.params.id
    await Role.updateOne({
        _id: id,
    },{
        deleted: true,
    })
    req.flash('success', 'Xóa sản phẩm thành công!');
    res.redirect("back")
}
//[PATCH] 
module.exports.editPatch = async(req, res) => {
    try{
        const id = req.params.id;
        await Role.updateOne({ _id: id}, req.body)
        req.flash("success", "Cập nhật nhóm quyền thành công!")
    }catch(error){
        req.flash("error", "Cập nhật nhóm quyêng thất bại!")
    }
   res.redirect(`/${systemConfig.prefixAdmin}/roles`)
}
//[GET] admin/pages/roles/permissions
module.exports.permissions = async(req, res) => {
    let find = {
        deleted: false,
    }
    const records = await Role.find(find)
    res.render("admin/pages/roles/permissions", {
        pageTitle: "Phân quyền",
        records: records
    })
}
//[PATCH] admin/pages/roles/permissions
module.exports.permissionsPatch = async(req, res) => {
    const roles = JSON.parse(req.body.roles)
    for(const role of roles){
        await Role.updateOne({
            _id: role.id,
            deleted: false
        }, {
            permissions: role.permissions
        })
    }
    req.flash('success', "Cập nhật phân quyền thành công!")
    res.redirect("back")
}
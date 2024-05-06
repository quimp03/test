const Account = require("../../models/account.model")
const Role = require("../../models/role.model")
const systemConfig = require("../../config/system")
const md5 = require('md5');
const generateHelper  = require("../../helpers/generate.helper")
module.exports.index  = async(req, res) => {
    //find
    let find = {
        deleted: false
    }
    //end find
    const records = await Account.find(find)
    res.render("admin/pages/accounts/index", {
        pageTitle: "Danh sách tài khoản",
        records: records
    })
}
module.exports.create = async(req, res) => {
    let roles = await Role.find({
         deleted: false
    })
    res.render("admin/pages/accounts/create", {
        pageTitle: "Thêm mới tài khoản",
        roles: roles
    })
}
module.exports.createPost = async(req, res) => {
    req.body.password = md5(req.body.password)
    req.body.token = generateHelper.generateRandomString(30)
    const account = new Account(req.body);
    await account.save()
    res.redirect(`/${systemConfig.prefixAdmin}/accounts`)
}
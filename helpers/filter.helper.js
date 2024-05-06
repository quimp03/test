module.exports = (req) => {
    const filterStatus = [
        {
            name: "Tat ca",
            status : "",
            class : ""
        },
        {
            name : "Hoat dong", 
            status : "active",
            class : ""
        },
        {
            name : "Dung hoat dong",
            status: "inactive",
            class : ""
        }
    ]
    if(req.query.status){
        const index = filterStatus.findIndex((item) => 
            item.status == req.query.status
        )
        filterStatus[index].class = "active"
    }else{
        const index = filterStatus.findIndex((item) => 
            item.status == ""
        )
        filterStatus[index].class = "active"
    }
    return filterStatus
}
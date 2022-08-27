exports.refreshreact = (req , res) =>{
let adamindata = req.admindata;
res.json({
    status:"succesfully refreshed",
    auth:true,
    data:adamindata,
});

}
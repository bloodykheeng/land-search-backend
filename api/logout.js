exports.logout = (req,res)=>{
    res.cookie("cookie-token","none logged out",{
        maxAge:1000,
        httpOnly:true
    });
    res.status(200).json({
        status:"Succesfull",
        message:"logged out succesfully",
        auth:false    
    })
}
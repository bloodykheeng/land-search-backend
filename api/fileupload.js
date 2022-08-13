exports.fileupload = (req,res)=>{
    if(!req.files){
        return res.status(400).json({
            status:"FAILED",
            message : "Empty requst ! No file"
        })
    }else{
        const file = req.files.file;
        file.mv(`./uploads/${file.name}`, err=>{
            if(err){
                console.log(err);
                return res.status(400).json({
                    status:"failed",
                    message:`failed to move file: ${err}`
                })
            }else{
                res.json({
                    status:"SUCCESSFULL",
                    message:"uploaded succesfully",
                    filepath:`./uploads/${file.name}`
                });
            }
        })
    }
}
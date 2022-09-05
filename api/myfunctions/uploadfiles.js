
const uploadfiles = (req,res,next)=>{
    if(!req.files){
        return res.status(400).json({
            status:"FAILED",
            message : "Empty requst ! No file"
        })
    }else{
        const {excelfile,zipfile} = req.files;
        excelfile.mv(`./excel_files/${excelfile.name}`, err=>{
            if(err){
                console.log(err);
                return res.status(400).json({
                    status:"failed",
                    message:`failed to move excell file: ${err}`
                })
            }else{
                zipfile.mv(`./geodatabase_zipfiles/${zipfile.name}`,err=>{
                    if(err){
                        console.log(err);
                        return res.status(400).json({
                            status:"failed",
                            message:`failed to move excell file: ${err}`
                        })
                    }else{
                        let filepaths = [`./excel_files/${excelfile.name}`,`./geodatabase_zipfiles/${zipfile.name}`];
                        req.filepaths = filepaths;
                        console.log("file paths uploaded on request");
                        next();
                        // res.json({
                        //     status:"SUCCESSFULL",
                        //     message:"files uploaded succesfully",
                        //     filepath:[`./excel_files/${excelfile.name}`,`./geodatabase_zipfiles/${zipfile.name}`]
                            
                        // });
                    }
                })
            }
        })
    }
}

module.exports = uploadfiles;
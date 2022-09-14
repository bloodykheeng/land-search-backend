const datetime = require("node-datetime");
const dt = datetime.create();
const mydate = dt.format("d_m_y__H_M_S");

const uploadfiles = (req,res,next)=>{
    let currentdate = mydate;
    if(!req.files){
        return res.status(400).json({
            status:"FAILED",
            message : "Empty requst ! No file"
        })
    }else{
        const {excelfile,zipfile} = req.files;
        excelfile.mv(`./excel_files/${currentdate}_${excelfile.name}`, err=>{
            if(err){
                console.log(err);
                return res.status(400).json({
                    status:"failed",
                    err:`failed to move excell file: ${err}`
                })
            }else{
                zipfile.mv(`./geodatabase_zipfiles/${currentdate}_${zipfile.name}`,err=>{
                    if(err){
                        console.log(err);
                        return res.status(400).json({
                            status:"failed",
                            err:`failed to move excell file: ${err}`
                        })
                    }else{
                        let filepaths = [`./excel_files/${currentdate}_${excelfile.name}`,`./geodatabase_zipfiles/${currentdate}_${zipfile.name}`];

                        let filenames = [`${currentdate}_${excelfile.name}`,`${currentdate}_${zipfile.name}`]
                        
                        let filesdata = {
                        filepaths : filepaths,
                        filenames : filenames
                      }
                        req.filesdata = filesdata;
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
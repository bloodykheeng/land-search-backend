const xlsx = require("xlsx");
const path = require("path");
const dbcon = require("../connection");
const uuid = require("uuid");

const datetime = require("node-datetime");
const dt = datetime.create();
const mydate = dt.format("d/m/y H:M:S");

let gettableid = (tablename,idcolumn,namecolumn,name)=>{
    //table name is for the table we want to insert data
    //idcolumn is the name having our ids in that table
    //namecolumn is the name of the column having the names we want to check from
    //name is the name we want to check from the name column
    let id;
 return new Promise((resolve,reject)=>{
     let query = "select * from "+tablename+" where "+namecolumn+" = ?";
        dbcon.query(query,[name],(err,result)=>{
            if(err){
                res.json({
                    status:failed,
                    error:err
                })
                reject(err);
            }else if(result.length == 0){
                let query = "insert into "+tablename+" ("+namecolumn+",Date_Registered) values(?,Now())"
                dbcon.query(query,[name],(err,result)=>{
                    if(err){
                        res.json({
                            status:"failed",
                            error:err
                        });
                        reject(err);
                    }else{
                        let query = "select * from "+tablename+" where "+namecolumn+" = ?";
                        dbcon.query(query,[name],(err,result)=>{
                            if(err){
                                res.json({
                                    status:failed,
                                    error:err
                                });
                                reject(err); 
                            }else if(result.length == 1){
                                    id = result[0][idcolumn]
                                     resolve(id);
                                }else{
                                    reject(console.log("multiple columns found"));
                                }
                            })

                    }
                })
            }else if(result.length == 1){
                id = result[0][idcolumn]
               resolve(id);
            }else{
                reject(console.log("multiple columns of the same name in database"));
            }
        })
    });
}

const  myreadexcell = async ()=>{
    const workbook = await xlsx.readFile("../uploads/customary land data.xlsx",{dateNF : "dd/mm/yyyy"});
    const worksheetnames = workbook.SheetNames;
    for (const worksheetname of worksheetnames ){
    const worksheet = workbook.Sheets[worksheetname];
    const data = await xlsx.utils.sheet_to_json(worksheet,{raw:false})
    // console.log("worksheetname");
    // console.log(worksheetname);

    for(element of data){
        if(worksheetname == "Customary_Land_Dermacation__0"){
            let     OwnerShipType = element["Ownership Type"].toLowerCase();
            let     Region = element["Region"].toLowerCase();
            let     District = element["District"].toLowerCase();	
            let     County = element["County / Municipality"].toLowerCase();	
            let     SubCounty = element["Sub-county / Town"].toLowerCase();	
            let     Parish = element["Parish / Ward"].toLowerCase();	
            let     Village = element["Village / Zone"].toLowerCase();	
        

        let     Land_Search_Customary_Land_Demarcation_Id = uuid.v4(); 
        let     Land_Search_Editor = "bloody kheeng"; 
        let     Land_Search_RegDate = mydate;
        let     Minute_Number = element["Minute number"];
        let     Clin_Number = element["CLIN_number"];
        let     Object_Id = element["ObjectID"];	
        let     Global_Id = element["GlobalID"];		
        let     Cla_Name = element["CLA Name"];	
        let  Cla_Certificate_Of_Incorporation_Number = element["CLA Certificate of Incorporation Number"];
        let     Name_Of_The_Community = element["Name of the Community"];

        let Region_id , Disrtict_id, County_id, SubCounty_id, Parish_id,Village_id , OwnerShipType_id;

        let     Plot_Number = element["Plot No. / Portion No."];	
        let     Perimeter_Poly_Km = element["perimeter_poly_km"];	
        let     Area_Poly_Ha = element["area_poly_ha"];
        let     Land_Use = element["Land Use"];	
        let     Easements_Or_Other_Persons_Rights = element["Easements / Other Persons Rights"];	
        let     Value_Per_Acre = element["Value per Acre"];	
        let     Year_Of_Evaluation = element["Year of valuation"];
        let     Comments = element["Comments"]; 

        OwnerShipType_id = await gettableid("ownershiptype","OwnershipType_Id","OwnershipType_Name",OwnerShipType); 
       Region_id = await gettableid("regions","Region_Id","Region_Name",Region);
       Disrtict_id = await gettableid("districts","District_Id","District_Name",District);
       County_id = await gettableid("county_or_municipality","County_Id","County_Name",County);
       SubCounty_id = await gettableid("subcounty_or_town","SubCounty_Id","SubCounty_Name",SubCounty);
       Parish_id = await gettableid("parish_or_ward","Parish_Id","parish_Name",Parish);
       Village_id = await gettableid("village_or_zone","Village_Id","Village_Name",Village);

        const customaryDemacartionTable = ()=>{
            return  new Promise((resolve,reject)=>{
              let query = "select * from customary_land_demarcation where Global_Id = ?";
                dbcon.query(query, [Global_Id],(err,result)=>{
                    if(err){
                        reject(err);
                    }else if(result.length > 0){
                        resolve(console.log("record with clin number: "+ Clin_Number +" already exists "))
                    }else if(result.length == 0){
                        query = "insert into customary_land_demarcation (Land_Search_Customary_Land_Demarcation_Id, Land_Search_Editor, Land_Search_RegDate, Minute_Number, Clin_Number, Object_Id, Global_Id, OwnerShipType_Id, Cla_Name, Cla_Certificate_Of_Incorporation_Number, Name_Of_The_Community, Region_Id, District_Id, County_Id , SubCounty_Id, Parish_Id, Village_Id, Plot_Number, Perimeter_Poly_Km, Area_Poly_Ha, Land_Use, Easements_Or_Other_Persons_Rights, Value_Per_Acre, Year_Of_Evaluation, Comments) values(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)";
    
                        dbcon.query(query,[
                         Land_Search_Customary_Land_Demarcation_Id,
                         Land_Search_Editor,
                         Land_Search_RegDate,
                         Minute_Number,
                         Clin_Number,
                         Object_Id,
                         Global_Id,
                         OwnerShipType_id,
                         Cla_Name,
                         Cla_Certificate_Of_Incorporation_Number,
                         Name_Of_The_Community,
                         Region_id,
                         Disrtict_id,
                         County_id,
                         SubCounty_id,
                         Parish_id,
                         Village_id,
                         Plot_Number,
                         Perimeter_Poly_Km,
                         Area_Poly_Ha,
                         Land_Use,
                         Easements_Or_Other_Persons_Rights,
                         Value_Per_Acre,
                         Year_Of_Evaluation,
                         Comments],(err,result)=>{
                             if(err){
                                 // res.json({
                                 //     status:failed,
                                 //     error:err
                                 // })
                                 console.log("error inserting data ",err);
                                 reject(err)
                             }else{
                                 // res.json({
                                 //     status:"successfull",
                                 //     message:"data successfully uploaded"
                                 // })
                                 console.log("data successfully uploaded");
                                 resolve(console.log("customary_land_demarcation table updated succesfully"))
                             }
                         })

                    }
                })
             
            });

        } 
       await customaryDemacartionTable();
       

       
        
       }else if(worksheetname == "rptowner_1"){
            //colors = element["colors"]
       }else if(worksheetname == "rptneighbor_2"){
            //colors = element["colors"]
        }else if(worksheetname == "rptwitness_3"){
            //colors = element["colors"]
       }else if(worksheetname == "rptowner_1"){
         //colors = element["colors"]
        }
    }
    }
}

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
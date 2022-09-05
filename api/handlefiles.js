const xlsx = require("xlsx");
const path = require("path");
const dbcon = require("../connection");
const uuid = require("uuid");

const datetime = require("node-datetime");
const dt = datetime.create();
const mydate = dt.format("d/m/y H:M:S");

//const uploadfiles = require("./myfunctions/uploadfiles");
const customaryDemacartionTable = require("./myfunctions/insert_into_tables/customaryDemarcartionTable");

const getfilestableid = require("./myfunctions/getfilestableid");
const gettableid = require("./myfunctions/gettableid");

const rptownertable =  require("./myfunctions/insert_into_tables/rptownertable");
const rptneighbortable = require("./myfunctions/insert_into_tables/rptneighbortable");
const rptwitnesstable = require("./myfunctions/insert_into_tables/rptwitnesstable");

const rptinspectiontable = require("./myfunctions/insert_into_tables/rptinspectiontable");

const rptformtable = require("./myfunctions/insert_into_tables/rptformtable");


const  handlefiles = async (req,res)=>{
    let  CLD_response = [],rptowner_1 = [], rptneighbor_2 = [], rptwitness_3 = [], rptinspection_4 = [], rptform1_5 = [];

    console.log("reached handling files ");
    const excelfilepath = req.filepaths[0];
    const geodatabasezip_filepath = req.filepaths[1];
    const userId = req.admindata.id;

    const workbook = await xlsx.readFile(excelfilepath,{dateNF : "dd/mm/yyyy"});
    const worksheetnames = workbook.SheetNames;
   

    for (const worksheetname of worksheetnames ){

    const worksheet = workbook.Sheets[worksheetname];
    const data = await xlsx.utils.sheet_to_json(worksheet,{raw:false});
    
    console.log(" first loop the worksheetname ",worksheetname);
    console.log("first loop the data in worksheet ",data);
    // console.log("worksheetname");
    // console.log(worksheetname);

        if(worksheetname == "Customary_Land_Dermacation__0"){
            for(let element of data){
        console.log("started the looping the data");
        console.log("element ", element); 
            let     Global_Id = element["GlobalID"];
            let     Land_Search_Editor_Id = userId; 
            let     Land_Search_RegDate = mydate;
           
            let     ExcelFileId = await getfilestableid("excellfiles","ExcelFiles_Id","FilePathName",excelfilepath,uuid.v4());
           
            let     GeoShape_Zip_Id = await getfilestableid("geoshape_zip_files","GeoShape_Zip_Files_Id","FilePathName",geodatabasezip_filepath,uuid.v4()); 

            let     Minute_Number = element["Minute number"];
            let     Clin_Number = element["CLIN_number"];
            let     Object_Id = element["ObjectID"];	
            
            let     OwnerShipType = element["Ownership Type"].toLowerCase()
            let OwnerShipType_id = await gettableid(req,res,"ownershiptype","OwnershipType_Id","OwnershipType_Name",OwnerShipType);

            let     Cla_Name = element["CLA Name"];
            let  Cla_Certificate_Of_Incorporation_Number = element["CLA Certificate of Incorporation Number"];
            let     Name_Of_The_Community = element["Name of the Community"];

            let Region_id , District_Id, County_id, SubCounty_id, Parish_id,Village_id;
            let     Region = element["Region"].toLowerCase();
            let     District = element["District"].toLowerCase();	
            let     County = element["County / Municipality"].toLowerCase();	
            let     SubCounty = element["Sub-county / Town"].toLowerCase();	
            let     Parish = element["Parish / Ward"].toLowerCase();	
            let     Village = element["Village / Zone"].toLowerCase();	
            
            Region_id = await gettableid(req,res,"regions","Region_Id","Region_Name",Region);
            District_Id = await gettableid(req,res,"districts","District_Id","District_Name",District);
            County_id = await gettableid(req,res,"county_or_municipality","County_Id","County_Name",County);
            SubCounty_id = await gettableid(req,res,"subcounty_or_town","SubCounty_Id","SubCounty_Name",SubCounty);
            Parish_id = await gettableid(req,res,"parish_or_ward","Parish_Id","parish_Name",Parish);
            Village_id = await gettableid(req,res,"village_or_zone","Village_Id","Village_Name",Village);

            let     Plot_Number = element["Plot No. / Portion No."];	
            let     Perimeter_Poly_Km = element["perimeter_poly_km"];	
            let     Area_Poly_Ha = element["area_poly_ha"];
            let     Land_Use = element["Land Use"];	
            let     Easements_Or_Other_Persons_Rights = element["Easements / Other Persons Rights"];	
            let     Value_Per_Acre = element["Value per Acre"];	
            let     Year_Of_Evaluation = element["Year of valuation"];
            let     Comments = element["Comments"]; 
            
            let Status_Of_Survey, Creator, Editor, Surveyed_Parish;
            Status_Of_Survey = element["Status of the Survey"];
            Creator  = element["Creator"]
            Editor = element["Editor"];
            Surveyed_Parish = element["surveyed_parish"];
         
            let    Survey_Summary_Id = uuid.v4();
            console.log(Survey_Summary_Id)
            let    Parent_Global_Id = element["GlobalID"];
            let    Date_Of_The_Interview = element["Date of the Interview"];
            let    Interviewed_By = element["Interviewed by"];
            let    Status_Of_Survey_Id = await gettableid(req,res,"status_of_survey","Status_Of_Survey_Id","Status",Status_Of_Survey);

            let    Supervision_Notes = element["Supervision Notes"];
            let    Shape_Area = element["Shape__Area"];
            let    Shape_Length = element["Shape__Length"];
            let    CreationDate = element["CreationDate"];
            let    Creator_Id = await gettableid(req,res,"creator","Creator_Id","Creator_Name",Creator);

            let    EditDate = element["EditDate"];
            let    Editor_Id = await gettableid(req,res,"creator","Creator_Id","Creator_Name",Editor);
            let    Surveyed_Parish_Id =  await gettableid(req,res,"parish_or_ward","Parish_Id","parish_Name",Surveyed_Parish);
            let    Instrument_Number = element["Instrument number"];
            let    Recorders_Name = element["RecordersName"];
            let    regDateAndTime = element["regDateAndTime"];
            let    Land_Search_Registration = mydate;

           console.log(regDateAndTime);
              
            CLD_response.push( await customaryDemacartionTable(
                req,
                res,
                Global_Id,
                Land_Search_Editor_Id,
                Land_Search_RegDate,
                ExcelFileId,
                GeoShape_Zip_Id ,
                Minute_Number,
                Clin_Number,
                Object_Id,
                OwnerShipType_id,
                Cla_Name,
                Cla_Certificate_Of_Incorporation_Number,
                Name_Of_The_Community,
                Region_id,
                District_Id,
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
                Comments,

                Survey_Summary_Id,
                Parent_Global_Id,
                Date_Of_The_Interview,
                Interviewed_By,
                Status_Of_Survey_Id,
                Supervision_Notes,
                Shape_Area,
                Shape_Length,
                CreationDate,
                Creator_Id,
                EditDate,
                Editor_Id,
                Surveyed_Parish_Id,
                Instrument_Number,
                Recorders_Name,
                regDateAndTime,
                Land_Search_Registration
                   ));
       
    //    res.json({
    //         status:"SUCCESSFULL",
    //         message:"customaryDemacartionTable updated succesfully",
    //    })

       
    }

       }else if(worksheetname == "rptowner_1"){

            //colors = element["colors"]
            for(let element of data){
                console.log("started the looping the data into rpt owner");
                console.log("element ", element); 
                
                    let     Land_Search_RptOwner_Id = uuid.v4();
                    let     Parent_Global_Id = element["ParentGlobalID"]; 
                    let     Object_Id = element["ObjectID"];
                    let     Global_Id = element["GlobalID"]
                    let     Surname = element["Surname"]
                    let     GivenName = element["Given Name"]
                    let     OtherNames = element["Other Names"]

                    let Gender, Marital_Status, Creator ,  Editor;
                    Gender = element["Gender"];
                    Marital_Status = element["Marital Status"];
                    Creator = element["Creator"];
                    Editor = element["Editor"];

                    let     Gender_Id = await gettableid(req,res,"gender","Gender_Id","Gender_Type",Gender);

                    let     Date_Of_Birth = element["Date of Birth"]

                    let     Marital_Status_Id = await gettableid(req,res,"marital_status","MaritalStatus_Id","MaritalStatus_Type",Marital_Status);

                    let     Address = element["Address"]
                    let     TelNumber = element["Tel. No. (if any)"]
                    let     Email = element["email (if any)"]
                    let     Id_Nin_Number = element["ID number"]
                    let     CreationDate = element["CreationDate"]

                    let     Creator_Id = await gettableid(req,res,"creator","Creator_Id","Creator_Name",Creator);

                    let     EditDate = element["EditDate"]

                    let     Editor_Id = await gettableid(req,res,"creator","Creator_Id","Creator_Name",Editor);
                      
                    rptowner_1.push( await rptownertable(
                        Land_Search_RptOwner_Id,
                        Parent_Global_Id,
                        Object_Id,
                        Global_Id,
                        Surname,
                        GivenName,
                        OtherNames,	
                        Gender_Id,	
                        Date_Of_Birth,	
                        Marital_Status_Id,	
                        Address,	
                        TelNumber,	
                        Email,	
                        Id_Nin_Number,	
                        CreationDate,	
                        Creator_Id,	
                        EditDate,	
                        Editor_Id
                           ));
               
            //    res.json({
            //         status:"SUCCESSFULL",
            //         message:"customaryDemacartionTable updated succesfully",
            //    })
        
               
            }

            response = "rptowner_1 done";
       }else if(worksheetname == "rptneighbor_2"){

            //colors = element["colors"]

            for(let element of data){
                console.log("started the looping the data into rpt neighbour");
                console.log("element ", element); 
                
                    let     Land_Search_RptNeighbour_Id = uuid.v4();
                    let     Parent_Global_Id = element["ParentGlobalID"]; 
                    let     Object_Id = element["ObjectID"];
                    let     Global_Id = element["GlobalID"];
                    let     Name_Of_Adjacent_Owner = element["Name of the adjacent owners"];

                    let  Creator ,  Editor;
                    Creator = element["Creator"];
                    Editor = element["Editor"];

                    let     CreationDate = element["CreationDate"]

                    let     Creator_Id = await gettableid(req,res,"creator","Creator_Id","Creator_Name",Creator);

                    let     EditDate = element["EditDate"]

                    let     Editor_Id = await gettableid(req,res,"creator","Creator_Id","Creator_Name",Editor);
                      
                    rptneighbor_2.push( await rptneighbortable(
                        Land_Search_RptNeighbour_Id,
                        Parent_Global_Id,
                        Object_Id,
                        Global_Id,
                        Name_Of_Adjacent_Owner,
                        CreationDate,
                        Creator_Id,	
                        EditDate,
                        Editor_Id
                           ));
               
            //    res.json({
            //         status:"SUCCESSFULL",
            //         message:"customaryDemacartionTable updated succesfully",
            //    })
        
               
            }
            response = "rptneighbor_2";
        }else if(worksheetname == "rptwitness_3"){
            //colors = element["colors"]

            for(let element of data){
                console.log("started the looping the data into rptwitness_3");
                console.log("element ", element); 
                
                    let     Land_Search_Rptwitness_Id = uuid.v4();
                    let     Parent_Global_Id = element["ParentGlobalID"]; 
                    let     Object_Id = element["ObjectID"];
                    let     Global_Id = element["GlobalID"];
                    let     Name_Of_The_Witness = element["Name of the witness"];

                    let  Creator ,  Editor;
                    Creator = element["Creator"];
                    Editor = element["Editor"];

                    let     CreationDate = element["CreationDate"]

                    let     Creator_Id = await gettableid(req,res,"creator","Creator_Id","Creator_Name",Creator);

                    let     EditDate = element["EditDate"]

                    let     Editor_Id = await gettableid(req,res,"creator","Creator_Id","Creator_Name",Editor);
                      
                    rptwitness_3.push( await rptwitnesstable(
                        Land_Search_Rptwitness_Id,
                        Parent_Global_Id,	
                        Object_Id,	
                        Global_Id,	
                        Name_Of_The_Witness,	
                        CreationDate,	
                        Creator_Id,	
                        EditDate,	
                        Editor_Id
                           ));
               
            //    res.json({
            //         status:"SUCCESSFULL",
            //         message:"customaryDemacartionTable updated succesfully",
            //    })
        
               
            }

            response = "rptwitness_3";
       }else if(worksheetname == "rptinspection_4"){
         //colors = element["colors"]
         //rptform1_5
         for(let element of data){
            console.log("started the looping the data into rptinspection_4");
            console.log("element ", element); 
            
                let     Land_Search_Rptinspection_Id = uuid.v4();
                let     Parent_Global_Id = element["ParentGlobalID"]; 
                let     Object_Id = element["ObjectID"];
                let     Global_Id = element["GlobalID"];
                let     CreationDate = element["CreationDate"];

                let  Creator ,  Editor;
                Creator = element["Creator"];
                Editor = element["Editor"];

                let     Creator_Id = await gettableid(req,res,"creator","Creator_Id","Creator_Name",Creator);

                let     EditDate = element["EditDate"]

                let     Editor_Id = await gettableid(req,res,"creator","Creator_Id","Creator_Name",Editor);
                  
                rptinspection_4.push( await rptinspectiontable(
                    Land_Search_Rptinspection_Id,	
                    Parent_Global_Id,
                    Object_Id,
                    Global_Id,	
                    CreationDate,	
                    Creator_Id,	
                    EditDate,	
                    Editor_Id
                       ));
           
        //    res.json({
        //         status:"SUCCESSFULL",
        //         message:"customaryDemacartionTable updated succesfully",
        //    })
    
           
        }

         response = "rptinspection_4";

        }else if(worksheetname == "rptform1_5"){

            for(let element of data){
                console.log("started the looping the data into rptform table");
                console.log("element ", element); 
                
                    let     Land_Search_Rptform_Id = uuid.v4();
                    let     Parent_Global_Id = element["ParentGlobalID"]; 
                    let     Object_Id = element["ObjectID"];
                    let     Global_Id = element["GlobalID"];
                    let     CreationDate = element["CreationDate"];
    
                    let  Creator ,  Editor;
                    Creator = element["Creator"];
                    Editor = element["Editor"];
    
                    let     Creator_Id = await gettableid(req,res,"creator","Creator_Id","Creator_Name",Creator);
    
                    let     EditDate = element["EditDate"]
    
                    let     Editor_Id = await gettableid(req,res,"creator","Creator_Id","Creator_Name",Editor);
                      
                    rptform1_5.push( await rptformtable(
                        Land_Search_Rptform_Id,	
                        Parent_Global_Id,	
                        Object_Id,	
                        Global_Id,	
                        CreationDate,	
                        Creator_Id,	
                        EditDate,	
                        Editor_Id
                           ));
               
            //    res.json({
            //         status:"SUCCESSFULL",
            //         message:"customaryDemacartionTable updated succesfully",
            //    })
        
               
            }
    


            response = "rptform1_5";
        }else{
            response = "wrong sheet name";
        //     res.json({
        //         status:"failed",
        //         message:"wrong worksheet names",
        //    })
            //console.log("wrong work sheet");
           
        }

        console.log("heyoo i will come last after looping");
    }
 
    console.log("cld response is : ",CLD_response);
    console.log("rptowner_1 response is : ",rptowner_1);
    console.log("rptneighbor_2  response is : ",rptneighbor_2 );
    console.log("rptwitness_3 response is : ",rptwitness_3);
    console.log("rptinspection_4 response is : ",rptinspection_4);
    console.log("rptform1_5 response is : ",rptform1_5);
    
    
    //console.log("The response is ",response);
    console.log("ï come after all for loops a done");
    console.log("testing");
}

module.exports = handlefiles;


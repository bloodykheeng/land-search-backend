const dbcon = require("../connection");

const usersearch = (req,res)=>{
    const {clinnumber} = req.body;
    let cld, global_id , owner, neighbour, witness;

        let query = "SELECT * FROM customary_land_demarcation inner join ownershiptype on customary_land_demarcation.OwnerShipType_Id = ownershiptype.OwnershipType_Id inner join regions on customary_land_demarcation.Region_Id = regions.Region_Id inner join districts on customary_land_demarcation.District_Id = districts.District_Id inner join county_or_municipality on customary_land_demarcation.County_Id = county_or_municipality.County_Id inner join subcounty_or_town on customary_land_demarcation.SubCounty_Id = subcounty_or_town.SubCounty_Id inner join parish_or_ward on customary_land_demarcation.Parish_Id = parish_or_ward.Parish_Id inner join village_or_zone on customary_land_demarcation.Village_Id = village_or_zone.Village_Id where customary_land_demarcation.Clin_Number = ?";
        dbcon.query(query,[clinnumber],(err,result)=>{
            if(err){
                res.json({
                    status:"failed",
                    err:err
                });
            }else if(result.length > 0){
               cld = result;
               global_id =  result[0]["Global_Id"];
                
               let query = "SELECT * FROM rptowner inner join gender on rptowner.Gender_Id = gender.Gender_Id inner join address on rptowner.Address_Id = address.Address_Id where rptowner.Parent_Global_Id = ?"; 
               dbcon.query(query,[global_id],(err,result)=>{
                if(err){
                    res.json({
                        status:"failed",
                        err:err
                    }); 
                }else{
                    owner = result;
                    let query = "SELECT * FROM rptneighbour where Parent_Global_Id = ?"; 
               dbcon.query(query,[global_id],(err,result)=>{
                if(err){
                    res.json({
                        status:"failed",
                        err:err
                    });
                }else{
                    neighbour = result;
                    let query = "SELECT * FROM rptwitness where Parent_Global_Id = ?"; 
               dbcon.query(query,[global_id],(err,result)=>{
                if(err){
                    res.json({
                        status:"failed",
                        err:err
                    }); 
                }else{
                    witness = result;

                    let response = {
                        status:"successfull",
                        cld, 
                        owner, 
                        neighbour, 
                        witness
                    }
                    res.json(response);
    
                }
                    
            })
    
                }
                    
            })
    
                }
                    
            })

            }else{
                res.json({
                    status:"user not found",
                    err:"user doesnot exist"
                })
            }
                
        })
   
  
}
module.exports = usersearch;
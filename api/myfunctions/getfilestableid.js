const dbcon = require("../../connection");


let getfilestableid = (tablename,idcolumn,pathcolumn,namecolumn,datecolumn,registrarcolumn,idkey,pathname,filename,mydate,registrarid)=>{
    //table name is for the table we want to insert data
    //idcolumn is the name having our ids in that table
    //namecolumn is the name of the column having the names we want to check from
    //name is the name we want to check from the name column
    //idkey is the uuid we want to set as our primary key while inserting data
    let id;
 return new Promise((resolve,reject)=>{
     let query = "select * from "+tablename+" where "+namecolumn+" = ?";
        dbcon.query(query,[filename],(err,result)=>{
            console.log("database result", result);
            if(err){
                res.json({
                    status:failed,
                    err:err
                })
                reject(err);
            }else if(result.length == 0){
                let query = "insert into "+tablename+" ("+idcolumn+","+pathcolumn+","+namecolumn+","+datecolumn+","+registrarcolumn+") values(?,?,?,?,?)";
                dbcon.query(query,[idkey,pathname,filename,mydate,registrarid],(err,result)=>{
                    if(err){
                        
                        reject(err);
                    }else{
                        let query = "select * from "+tablename+" where "+namecolumn+" = ?";
                        dbcon.query(query,[filename],(err,result)=>{
                            if(err){
                              
                                reject(err); 
                            }else if(result.length == 1){
                                    id = result[0][idcolumn]
                                     resolve(id);
                                }else{
                                    let message = "multiple columns found";
                                    reject(message);
                                }
                            })

                    }
                })
            }else if(result.length == 1){
                id = result[0][idcolumn]
               resolve(id);
            }else{
                let message = "multiple columns of the same name in database getfiletableid.js response";
                reject(message);
            }
        })
    });
}

module.exports = getfilestableid;
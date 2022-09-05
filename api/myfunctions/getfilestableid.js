const dbcon = require("../../connection");


let getfilestableid = (tablename,idcolumn,namecolumn,name,idkey)=>{
    //table name is for the table we want to insert data
    //idcolumn is the name having our ids in that table
    //namecolumn is the name of the column having the names we want to check from
    //name is the name we want to check from the name column
    //idkey is the uuid we want to set as our primary key while inserting data
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
                let query = "insert into "+tablename+" ("+idcolumn+","+namecolumn+",Date_Registered) values(?,?,Now())"
                dbcon.query(query,[idkey,name],(err,result)=>{
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

module.exports = getfilestableid;
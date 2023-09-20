import express from "express";
import { Router } from "express";
import { mssqlquery } from "../../function/mssql";
import { mongodbinsertMany, mongodbfind, mongodbfindsome, mongodbupdate } from "../../function/mongodb";
const router: Router = express.Router();

router.post('/SAR/login', async (req, res) => {
  //-------------------------------------
  console.log(req.body);
  let input = req.body;
  //-------------------------------------
  let output:any = {"return":'NOK'}
  // let findDB = await mongodb.find(Auth,user,{"ID":input['ID']});
  var findDB:any = await mssqlquery(`SELECT  *  FROM [SAR].[dbo].[Master_User] WHERE [UserName] LIKE '${input['UserName']}'`);
try{
  if(findDB['recordsets'].length > 0){
      console.log(findDB['recordsets']);
      if(findDB['recordsets'][0][0]['Password'] === input['Password']){
          output = {
              "UserName":findDB['recordsets'][0][0]['UserName'],
              "NAME":findDB['recordsets'][0][0]['Name'],
              "Section":findDB['recordsets'][0][0]['Section'],
              "Roleid":findDB['recordsets'][0][0]['Roleid'] || '1',
              "Branch": findDB['recordsets'][0][0]['Branch'],
              "return":'OK'
          }
      }else{
          output = {"return":'PASSWORD INCORRECT'}
      }

  }
}catch{

}
  // console.log(input['PASS']);
 
  
  console.log(output)
  return res.json(output);
});


export default router;
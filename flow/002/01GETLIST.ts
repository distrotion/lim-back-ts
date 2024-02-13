import express from "express";
import { Router } from "express";
import { mssqlquery } from "../../function/mssql";
import { mongodbinsertMany, mongodbfind, mongodbfindsome, mongodbupdate } from "../../function/mongodb";

const router: Router = express.Router();

//`SELECT * FROM [SAR].[dbo].[Routine_RequestLab]  WHERE  ItemStatus='LIST NORMAL' and (InstrumentName ='F-F' or InstrumentName ='pH' or InstrumentName = 'Cl(AUTO)') order by ID desc`


router.post('/GETLIST/request_PH_ALL', async (req, res) => {
  //-------------------------------------
  console.log(req.body);
  let input = req.body
  //-------------------------------------
  let output: any = []
  if(input['name'] != undefined){

    // console.log(mssql.qurey())
    // let query = `SELECT * FROM [SAR].[dbo].[Routine_RequestLab]  WHERE  ItemStatus='LIST NORMAL' and (InstrumentName ='pH') order by ID desc`
    let query = `SELECT * FROM [SAR].[dbo].[Routine_RequestLab]  WHERE    (InstrumentName ='pH') order by ID desc`
    var findDB: any = await mssqlquery(query);
    let data: any = findDB['recordsets'][0];
    output = data;
  }



  //-------------------------------------
  return res.json(output);
});

router.post('/GETLIST/request_FF_ALL', async (req, res) => {
  //-------------------------------------
  console.log(req.body);
  let input = req.body
  //-------------------------------------
  let output: any = []
  if(input['name'] != undefined){

    // console.log(mssql.qurey())
    let query = `SELECT * FROM [SAR].[dbo].[Routine_RequestLab]  WHERE  ItemStatus='LIST NORMAL' and (InstrumentName ='F-F') and [UserListAnalysis]='${input['name']}'  order by ID desc`
    // let query = `SELECT * FROM [SAR].[dbo].[Routine_RequestLab]  WHERE    (InstrumentName ='F-F') order by ID desc`
    var findDB: any = await mssqlquery(query);
    let data: any = findDB['recordsets'][0];
    output = data;
  }



  //-------------------------------------
  return res.json(output);
});

router.post('/GETLIST/request_PH', async (req, res) => {
  //-------------------------------------
  console.log(req.body);
  let input = req.body
  //-------------------------------------
  let output: any = []
  if(input['name'] != undefined){

    // console.log(mssql.qurey())
    let query = `SELECT * FROM [SAR].[dbo].[Routine_RequestLab]  WHERE  ItemStatus='LIST NORMAL' and (InstrumentName ='pH') and [UserListAnalysis]='${input['name']}' order by ID desc`
    var findDB: any = await mssqlquery(query);
    let data: any = findDB['recordsets'][0];
    output = data;
  }

  res.json(output);



  //-------------------------------------
  res.json(output);
});


router.post('/GETLIST/request_CW3L_ALL', async (req, res) => {
  //-------------------------------------
  console.log(req.body);
  let input = req.body
  //-------------------------------------
  let output: any = []
  if(input['name'] != undefined){

    // console.log(mssql.qurey())
    let query = `SELECT TOP (100) * FROM [SAR].[dbo].[Routine_RequestLab]  WHERE InstrumentName = 'Cwt.3 layers' order by ReqDate desc`
    // let query = `SELECT * FROM [SAR].[dbo].[Routine_RequestLab]  WHERE    (InstrumentName ='F-F') order by ID desc`
    var findDB: any = await mssqlquery(query);
    let data: any = findDB['recordsets'][0];
    output = data;
  }



  //-------------------------------------
  return res.json(output);
});


export default router;
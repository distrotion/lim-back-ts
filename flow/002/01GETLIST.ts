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
    let query = `SELECT * FROM [SAR].[dbo].[Routine_RequestLab]  WHERE  (InstrumentName ='pH') order by ID desc`
    var findDB: any = await mssqlquery(query);
    let data: any = findDB['recordsets'][0];
    output = data;
  }



  //-------------------------------------
  return res.json(output);
});

router.post('/GETLIST/request_BALANCE_ALL', async (req, res) => {
  //-------------------------------------
  console.log(req.body);
  let input = req.body
  //-------------------------------------
  let output: any = []
  if(input['name'] != undefined){

    // console.log(mssql.qurey())
    // let query = `SELECT * FROM [SAR].[dbo].[Routine_RequestLab]  WHERE  ItemStatus='LIST NORMAL' and (InstrumentName ='pH') order by ID desc`
    // let query = `SELECT * FROM [SAR].[dbo].[Routine_RequestLab] WHERE ItemStatus IN ('LIST NORMAL','LIST RECHECK','LIST RECONFIRM')  AND InstrumentName IN ('ICP', 'Sludge', 'Acid Number(Nox Rust)', 'CO32-', 'Cwt', 'Cwt.3 layers', 'Cwt. PULS', 'Solid Content(Nox Rust)', 'SSM','%NV(WAX)','%NV(Nox Rust)','%NV') ORDER BY id DESC`
    let query = `SELECT * FROM [SAR].[dbo].[Routine_RequestLab] WHERE ItemStatus IN ('LIST NORMAL','LIST RECHECK','LIST RECONFIRM')  AND InstrumentName IN ('ICP', 'Sludge', 'Acid Number(Nox Rust)', 'CO32-', 'Cwt', 'Cwt. PULS', 'Solid Content(Nox Rust)', 'SSM','%NV(WAX)','%NV(Nox Rust)','%NV') OR ( InstrumentName = 'Cwt.3 layers' AND  ItemReportName = 'Non-metallic Soap Layer (g/m2)' AND ItemStatus IN ('LIST NORMAL','LIST RECHECK','LIST RECONFIRM')) ORDER BY id DESC`
    var findDB: any = await mssqlquery(query);
    let data: any = findDB['recordsets'][0];
    output = data;
  }



  //-------------------------------------
  return res.json(output);
});

router.post('/GETLIST/request_BALANCE_ACID', async (req, res) => {
  //-------------------------------------
  console.log(req.body);
  let input = req.body
  //-------------------------------------
  let output: any = []
  if(input['name'] != undefined){

    // console.log(mssql.qurey())
    // let query = `SELECT * FROM [SAR].[dbo].[Routine_RequestLab]  WHERE  ItemStatus='LIST NORMAL' and (InstrumentName ='pH') order by ID desc`
    // let query = `SELECT * FROM [SAR].[dbo].[Routine_RequestLab] WHERE ItemStatus IN ('LIST NORMAL','LIST RECHECK','LIST RECONFIRM')  AND InstrumentName IN ('ICP', 'Sludge', 'Acid Number(Nox Rust)', 'CO32-', 'Cwt', 'Cwt.3 layers', 'Cwt. PULS', 'Solid Content(Nox Rust)', 'SSM','%NV(WAX)','%NV(Nox Rust)','%NV') ORDER BY id DESC`
    let query = `SELECT * FROM [SAR].[dbo].[Routine_RequestLab] WHERE    InstrumentName IN ( 'Acid Number(Nox Rust)') ORDER BY id DESC`
    var findDB: any = await mssqlquery(query);
    let data: any = findDB['recordsets'][0];
    output = data;
  }



  //-------------------------------------
  return res.json(output);
});

router.post('/GETLIST/requestbalance', async (req, res) => {
  //-------------------------------------
  console.log(req.body);
  let input = req.body
  //-------------------------------------
  let output: any = []
  if(input['name'] != undefined){

    // console.log(mssql.qurey())
    // let query = `SELECT * FROM [SAR].[dbo].[Routine_RequestLab]  WHERE  ItemStatus='LIST NORMAL' and (InstrumentName ='pH') order by ID desc`
    let query = `SELECT * FROM [SAR].[dbo].[Routine_RequestLab] WHERE ItemStatus IN ('LIST NORMAL','LIST RECHECK','LIST RECONFIRM') AND UserListAnalysis = '${input['name']}' AND ItemStatus IN ('LIST NORMAL','LIST RECHECK','LIST RECONFIRM')  AND InstrumentName IN ('ICP', 'Sludge', 'Acid Number(Nox Rust)', 'CO32-', 'Cwt', 'Cwt. PULS', 'Solid Content(Nox Rust)', 'SSM','%NV(WAX)','%NV(Nox Rust)','%NV') OR (  InstrumentName IN ('Cwt.3 layers') AND  [Position] = 'Non-metallic Soap Layer' AND UserListAnalysis = '${input['name']}' AND ItemStatus IN ('LIST NORMAL','LIST RECHECK','LIST RECONFIRM') ) ORDER BY id DESC`
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

router.post('/GETLIST/request_NV_ALL', async (req, res) => {
  //-------------------------------------
  console.log(req.body);
  let input = req.body
  //-------------------------------------
  let output: any = []
  if(input['name'] != undefined){

    // console.log(mssql.qurey())
    let query = `SELECT TOP (100) * FROM [SAR].[dbo].[Routine_RequestLab]  WHERE InstrumentName = '%NV' or InstrumentName = '%NV(WAX)' or InstrumentName = '%NV(Nox Rust)' order by ReqDate desc`
    // let query = `SELECT * FROM [SAR].[dbo].[Routine_RequestLab]  WHERE    (InstrumentName ='F-F') order by ID desc`
    var findDB: any = await mssqlquery(query);
    let data: any = findDB['recordsets'][0];
    output = data;
  }



  //-------------------------------------
  return res.json(output);
});


router.post('/GETLIST/request_ICP_ALL', async (req, res) => {
  //-------------------------------------
  console.log(req.body);
  let input = req.body
  //-------------------------------------
  console.log(`-------request_ICP_ALL------`)
  let output: any = []
  if(input['name'] != undefined){

    // console.log(mssql.qurey())
    let query = `SELECT TOP (100) * FROM [SAR].[dbo].[Routine_RequestLab]  WHERE InstrumentName IN ('ICP') and Branch != 'RAYONG'   order by ReqDate desc`
    // let query = `SELECT * FROM [SAR].[dbo].[Routine_RequestLab]  WHERE    (InstrumentName ='F-F') order by ID desc`
    var findDB: any = await mssqlquery(query);
    let data: any = findDB['recordsets'][0];
    output = data;
  }



  //-------------------------------------
  return res.json(output);
});

router.post('/GETLIST/request_TOC_ALL', async (req, res) => {
  //-------------------------------------
  console.log(req.body);
  let input = req.body
  //-------------------------------------
  console.log(`-------request_TOC_ALL------`)
  let output: any = []
  if(input['name'] != undefined){

    // console.log(mssql.qurey())
    let query = `SELECT TOP (100) * FROM [SAR].[dbo].[Routine_RequestLab]  WHERE InstrumentName IN ('TOC') and Branch != 'RAYONG'    order by ReqDate desc`
    // let query = `SELECT TOP (100) * FROM [SAR].[dbo].[Routine_RequestLab]  WHERE InstrumentName IN ('TOC') and SampleCode = 'RTB-MKT-24-0763-3'  order by ReqDate desc`
    // let query = `SELECT * FROM [SAR].[dbo].[Routine_RequestLab]  WHERE    (InstrumentName ='F-F') order by ID desc` 
    var findDB: any = await mssqlquery(query);
    let data: any = findDB['recordsets'][0];
    output = data;
  }



  //-------------------------------------
  return res.json(output);
});

router.post('/GETLIST/request_ICP_USER', async (req, res) => {
  //-------------------------------------
  console.log(req.body);
  let input = req.body
  //-------------------------------------
  console.log(`-------request_ICP_USER------`)
  let output: any = []
  if(input['name'] != undefined){

    // console.log(mssql.qurey())
    let query = `SELECT  * FROM [SAR].[dbo].[Routine_RequestLab]  WHERE ItemStatus IN ('LIST NORMAL','LIST RECHECK','LIST RECONFIRM') AND UserListAnalysis = '${input['name']}' AND InstrumentName IN ('ICP')  order by ReqDate desc`
    // let query = `SELECT * FROM [SAR].[dbo].[Routine_RequestLab]  WHERE    (InstrumentName ='F-F') order by ID desc`
    var findDB: any = await mssqlquery(query);
    let data: any = findDB['recordsets'][0];
    output = data;
  }



  //-------------------------------------
  return res.json(output);
});

router.post('/GETLIST/request_TOC_USER', async (req, res) => {
  //-------------------------------------
  console.log(req.body);
  let input = req.body
  //-------------------------------------
  console.log(`-------request_TOC_USER------`)
  let output: any = []
  if(input['name'] != undefined){

    // console.log(mssql.qurey())
    let query = `SELECT TOP (100) * FROM [SAR].[dbo].[Routine_RequestLab]  WHERE ItemStatus IN ('LIST NORMAL','LIST RECHECK','LIST RECONFIRM') AND InstrumentName IN ('TOC') AND UserListAnalysis = '${input['name']}'   order by ReqDate desc`
    // let query = `SELECT * FROM [SAR].[dbo].[Routine_RequestLab]  WHERE    (InstrumentName ='F-F') order by ID desc`
    var findDB: any = await mssqlquery(query);
    let data: any = findDB['recordsets'][0];
    output = data;
  }



  //-------------------------------------
  return res.json(output);
});

router.post('/GETLIST/request_XRF_ALL', async (req, res) => {
  //-------------------------------------
  console.log(req.body);
  let input = req.body
  //-------------------------------------
  console.log(`-------request_XRF_ALL------`)
  let output: any = []
  if(input['name'] != undefined){

    // console.log(mssql.qurey())
    let query = `SELECT * FROM [SAR].[dbo].[Routine_RequestLab]  WHERE ItemStatus IN ('LIST NORMAL','LIST RECHECK','LIST RECONFIRM') AND InstrumentName = 'XRF'  order by ReqDate desc`
    // let query = `SELECT * FROM [SAR].[dbo].[Routine_RequestLab]  WHERE    (InstrumentName ='F-F') order by ID desc`
    var findDB: any = await mssqlquery(query);
    let data: any = findDB['recordsets'][0];
    output = data;
  }



  //-------------------------------------
  return res.json(output);
});

router.post('/GETLIST/request_XRF_USER', async (req, res) => {
  //-------------------------------------
  console.log(req.body);
  let input = req.body
  //-------------------------------------
  console.log(`-------request_XRF_USER------`)
  let output: any = []
  if(input['name'] != undefined){

    // console.log(mssql.qurey())
    let query = `SELECT * FROM [SAR].[dbo].[Routine_RequestLab]  WHERE ItemStatus IN ('LIST NORMAL','LIST RECHECK','LIST RECONFIRM') AND UserListAnalysis = '${input['name']}' AND InstrumentName = 'XRF'  order by ReqDate desc`
    // let query = `SELECT * FROM [SAR].[dbo].[Routine_RequestLab]  WHERE    (InstrumentName ='F-F') order by ID desc`
    var findDB: any = await mssqlquery(query);
    let data: any = findDB['recordsets'][0];
    output = data;
  }



  //-------------------------------------
  return res.json(output);
});


export default router;
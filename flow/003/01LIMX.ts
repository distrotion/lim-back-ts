import express from "express";
import { Router } from "express";
import { mssqlquery } from "../../function/mssql";

// import mssql from "../../function/mssql";
// import { mssqlquery } from "../../function/mssql";
// let mssql = require('../../function/mssql');
// import mongodb from "../../function/mongodb";
// import httpreq from "../../function/axios";
// import axios from "axios";

const router: Router = express.Router();

router.post('/LIMX/TOCSETDATA', async (req, res) => {
  //-------------------------------------
  console.log(req.body);
  let input = req.body
  //-------------------------------------
  if(input["DATA"]!=undefined){
    //
    for (let i = 0; i < input["DATA"].length; i++) {
      let query = `INSERT INTO  [LIM].[dbo].[LIMX] ([ReqNo],[ReqNoBARCODE],[InstrumentName],[R],[DILUTIONTIMES-M],[DILUTIONTIMES-TC],[DILUTIONTIMES-IC],[TC],[IC]) VALUES ('${input["DATA"][i]['REQ']}','${input["DATA"][i]['code']}','TOC','${input["DATA"][i]['R']}','${input["DATA"][i]['DIM']}','${input["DATA"][i]['DI1']}','${input["DATA"][i]['DI2']}','${input["DATA"][i]['TC']}','${input["DATA"][i]['IC']}')`
      var findDB: any = await mssqlquery(query);
    }
    
    
  }
  



  //-------------------------------------
  res.json(input);
});


router.post('/LIMX/XRFSETDATA', async (req, res) => {
  //-------------------------------------
  console.log(req.body);
  let input = req.body
  //-------------------------------------
  if(input["DATA"]!=undefined){
    
    
    //
    for (let i = 0; i < input["DATA"].length; i++) {
      
     let query =  `INSERT INTO  [LIM].[dbo].[LIMX] ([ReqNo],[ReqNoBARCODE],[InstrumentName],[R],[NO],[XRF],[type]) VALUES ('${input["DATA"][i]['REQ']}','${input["DATA"][i]['code']}','XRF','${input["DATA"][i]['R']}','${input["DATA"][i]['NO']}','${input["DATA"][i]['VALUE']}','${input["DATA"][i]['type']}')`
    //  console.log(query)
     var findDB: any = await mssqlquery(query);
    }
    
    
  }
  



  //-------------------------------------
  res.json(input);
});

router.post('/LIMX/ICPSETDATA', async (req, res) => {
  //-------------------------------------
  console.log(req.body);
  let input = req.body
  //-------------------------------------
  if(input["DATA"]!=undefined){
    
    
    //
    for (let i = 0; i < input["DATA"].length; i++) {
      let query =  `INSERT INTO  [LIM].[dbo].[LIMX] ([ReqNo],[ReqNoBARCODE],[InstrumentName],[R],[NO],[XRF],[type]) VALUES ('${input["DATA"][i]['REQ']}','${input["DATA"][i]['code']}','ICP','${input["DATA"][i]['R']}','','${input["DATA"][i]['VALUE']}','${input["DATA"][i]['type']}')`
      //  console.log(query)
       var findDB: any = await mssqlquery(query);
 
    }
    
    
  }
  



  //-------------------------------------
  res.json(input);
});

router.post('/LIMX/UVSETDATA', async (req, res) => {
  //-------------------------------------
  console.log(req.body);
  let input = req.body
  //-------------------------------------
  if(input["DATA"]!=undefined){
    //
    for (let i = 0; i < input["DATA"].length; i++) {
      let query = `INSERT INTO  [LIM].[dbo].[LIMX] ([ReqNo],[ReqNoBARCODE],[InstrumentName],[R],[DILUTIONTIMES-M],[DILUTIONTIMES-TC],[DILUTIONTIMES-IC],[TiUV],) VALUES ('${input["DATA"][i]['REQ']}','${input["DATA"][i]['code']}','Ti(UV)','${input["DATA"][i]['R']}','${input["DATA"][i]['DIM']}','${input["DATA"][i]['DI1']}','${input["DATA"][i]['DI2']}','${input["DATA"][i]['VALUE']}')`
      var findDB: any = await mssqlquery(query);
    }
    
    
  }
  



  //-------------------------------------
  res.json(input);
});

export default router;
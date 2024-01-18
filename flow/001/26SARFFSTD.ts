import express from "express";
import { Router } from "express";
import { mssqlquery } from "../../function/mssql";
import { mongodbinsertMany, mongodbfind, mongodbfindsome, mongodbupdate } from "../../function/mongodb";

const router: Router = express.Router();

let database = `LIMinstrument`;
// let collection = `BALANCEdata`;
let collection = `FFdataSTD`;


router.post('/26SARFFSTD/GENREQ', async (req, res) => {
  //-------------------------------------
  console.log("--26SARFFSTD/GENREQ--");
  console.log(req.body);
  let input:any = req.body;
  //-------------------------------------
  let output = 'nok';
  if (input['ReqNo'] != undefined && input['InstrumentName'] != undefined && input['ReqNo'] != ''&& input['INSNO'] != '') {

    let timestamp = Date.now();
    let neworder = input;
    neworder['GENREQtimestamp'] = timestamp;


    let check1 = await mongodbfind(database, collection, { "ReqNo": neworder['ReqNo'], "UID": neworder['UID'], "LIMstatus": "IP" });
    let check2 = await mongodbfind(database, collection, { "ReqNo": neworder['ReqNo'], "UID": neworder['UID'], "LIMstatus": "SEND" });


    if (check1.length === 0 && check2.length === 0) {
      neworder['LIMstatus'] = 'IP';
      neworder['LIMTYPE'] = '26SARFFSTD';
      neworder['INSNO'] = input['INSNO'];
      neworder['data01'] = {"W11": '', };
      neworder['data02'] = {"W11": '', };
      neworder['data01_volum'] = { "volum": '' };
      neworder['data02_volum'] = { "volum": '' };
      neworder['data01_ans'] = { "ans": '' };
      neworder['data02_ans'] = { "ans": '' };
      let ins1 = await mongodbinsertMany(database, collection, [neworder]);

      output = 'ok';
    } else {
    }
  }

  //-------------------------------------
  res.json(output);
});

router.post('/26SARFFSTD/UPDATEDATAPPM', async (req, res) => {
  //-------------------------------------
  console.log("--26SARFFSTD/UPDATEDATAPPM--");
  console.log(req.body);
  let input = req.body;
  //-------------------------------------
  let output = 'nok';
  if (input['ReqNo'] != undefined && input['DataPreview01'] != undefined && input['ReqNo'] != ''&& input['WX'] != undefined && input['DataPreview02'] != undefined) {

    let timestamp = Date.now();
    let neworder = input;

    let check1 = await mongodbfind(database, collection, { "ReqNo": neworder['ReqNo'], "UID": neworder['UID'], "LIMstatus": "IP" });

    console.log(check1);
    if (check1.length > 0) {
      // if (check1[0]['data']['W11'] == '') {
      //   let ins2 = await mongodb.update(database, collection, { "ReqNo": neworder['ReqNo'], "UID": neworder['UID'], "LIMstatus": "IP" }, { $set: { "data.W11": input['DataPreview'] } });
      //   output = 'ok';
      // } else if (check1[0]['data']['W12'] == '') {
      //   let ins2 = await mongodb.update(database, collection, { "ReqNo": neworder['ReqNo'], "UID": neworder['UID'], "LIMstatus": "IP" }, { $set: { "data.W12": input['DataPreview'] } });
      //   output = 'ok';
      // }

      // if(input['WX'] == 'D01W11'){
      //   let ins2 = await mongodbupdate(database, collection, { "ReqNo": neworder['ReqNo'], "UID": neworder['UID'], "LIMstatus": "IP" }, { $set: { "data01.W11": input['DataPreview'] } });
      // }
      // if(input['WX'] == 'D01W21'){
      //   let ins2 = await mongodbupdate(database, collection, { "ReqNo": neworder['ReqNo'], "UID": neworder['UID'], "LIMstatus": "IP" }, { $set: { "data01.W21": input['DataPreview'] } });
      // }
      // if(input['WX'] == 'D02W11'){
      //   let ins2 = await mongodbupdate(database, collection, { "ReqNo": neworder['ReqNo'], "UID": neworder['UID'], "LIMstatus": "IP" }, { $set: { "data02.W11": input['DataPreview'] } });
      // }
      // if(input['WX'] == 'D02W21'){
      //   let ins2 = await mongodbupdate(database, collection, { "ReqNo": neworder['ReqNo'], "UID": neworder['UID'], "LIMstatus": "IP" }, { $set: { "data02.W21": input['DataPreview'] } });
      // }
      let ins2 = await mongodbupdate(database, collection, { "ReqNo": neworder['ReqNo'], "UID": neworder['UID'], "LIMstatus": "IP" }, { $set: { "data01.W11": input['DataPreview01'] , "data02.W11": input['DataPreview02'] } });
     


      // else if (check1[0]['data']['W13'] == '') {
      //   let ins2 = await mongodb.update(database, collection, { "ReqNo": neworder['ReqNo'], "LIMstatus": "IP" }, { $set: { "data.W13": input['DataPreview'] } });
      //   output = 'ok';
      // }else if (check1[0]['data']['W14'] == '') {
      //   let ins2 = await mongodb.update(database, collection, { "ReqNo": neworder['ReqNo'], "LIMstatus": "IP" }, { $set: { "data.W14": input['DataPreview'] } });
      //   output = 'ok';
      // }

    }

  }

  //-------------------------------------
  res.json(output);
});


router.post('/26SARFFSTD/UPDATEDATAVOLUME', async (req, res) => {
  //-------------------------------------
  console.log("--26SARFFSTD/UPDATEDATAVOLUME--");
  console.log(req.body);
  let input = req.body;
  //-------------------------------------
  let output = 'nok';
  if (input['ReqNo'] != undefined && input['DataPreview'] != undefined && input['ReqNo'] != ''&& input['D01NOitem'] != undefined&& input['D02NOitem'] != undefined&& input['VOLUME01'] != undefined&& input['VOLUME02'] != undefined&& input['Result01'] != undefined&& input['D01W11_21'] != undefined&& input['D02W11_21'] != undefined) {

    let timestamp = Date.now();
    let neworder = input;

    let check1 = await mongodbfind(database, collection, { "ReqNo": neworder['ReqNo'], "UID": neworder['UID'], "LIMstatus": "IP" });

    console.log(check1);
    if (check1.length > 0) {
      // if (check1[0]['data']['W11'] == '') {
      //   let ins2 = await mongodb.update(database, collection, { "ReqNo": neworder['ReqNo'], "UID": neworder['UID'], "LIMstatus": "IP" }, { $set: { "data.W11": input['DataPreview'] } });
      //   output = 'ok';
      // } else if (check1[0]['data']['W12'] == '') {
      //   let ins2 = await mongodb.update(database, collection, { "ReqNo": neworder['ReqNo'], "UID": neworder['UID'], "LIMstatus": "IP" }, { $set: { "data.W12": input['DataPreview'] } }); //data01_ans
      //   output = 'ok';
      // }
      // let ins2 = await mongodbupdate(database, collection, { "ReqNo": neworder['ReqNo'], "UID": neworder['UID'], "LIMstatus": "IP" }, { $set: { "D01NOitem": input['D01NOitem'], "D02NOitem": input['D02NOitem'], "data01_volum.volum": input['VOLUME01'], "data02_volum.volum": input['VOLUME02'], "data01_ans.ans": input['Result01'], "data02_ans.ans": input['Result02'], "data01_volum.D01W11_21": input['D01W11_21'], "data02_volum.D02W11_21": input['D02W11_21'] } });
      output = 'ok';
      // else if (check1[0]['data']['W13'] == '') {
      //   let ins2 = await mongodb.update(database, collection, { "ReqNo": neworder['ReqNo'], "LIMstatus": "IP" }, { $set: { "data.W13": input['DataPreview'] } });
      //   output = 'ok';
      // }else if (check1[0]['data']['W14'] == '') {
      //   let ins2 = await mongodb.update(database, collection, { "ReqNo": neworder['ReqNo'], "LIMstatus": "IP" }, { $set: { "data.W14": input['DataPreview'] } });
      //   output = 'ok';
      // }

    }

  }

  //-------------------------------------
  res.json(output);
});

router.post('/26SARFFSTD/UPDATEDATAAREA', async (req, res) => {
  //-------------------------------------
  console.log("--26SARFFSTD/UPDATEDATAW11--");
  console.log(req.body);
  let input = req.body;
  //-------------------------------------
  let output = 'nok';
  if (input['ReqNo'] != undefined && input['DataPreview'] != undefined && input['ReqNo'] != '') {

    let timestamp = Date.now();
    let neworder = input;

    let check1 = await mongodbfind(database, collection, { "ReqNo": neworder['ReqNo'], "UID": neworder['UID'], "LIMstatus": "IP" });
    if (check1.length > 0) {
      if (check1[0]['data']['data_area'] == '') {
        let ins2 = await mongodbupdate(database, collection, { "ReqNo": neworder['ReqNo'], "UID": neworder['UID'], "LIMstatus": "IP" }, { $set: { "data_area.area": input['DataPreview'] } });
        output = 'ok';
      }

    }

  }

  //-------------------------------------
  res.json(output);
});

router.post('/26SARFFSTD/DELETEDATAW11', async (req, res) => {
  //-------------------------------------
  console.log("--26SARFFSTD/DELETEDATAW11--");
  console.log(req.body);
  let input = req.body;
  //-------------------------------------
  let output = 'nok';
  if (input['ReqNo'] != undefined && input['DataPreview'] != undefined && input['DX'] != undefined && input['ReqNo'] != '') {

    let timestamp = Date.now();
    let neworder = input;

    let check1 = await mongodbfind(database, collection, { "ReqNo": neworder['ReqNo'], "UID": neworder['UID'], "LIMstatus": "IP" });
    if (check1.length > 0) {

      // if (check1[0]['data']['W14'] != '') {
      //   let ins2 = await mongodb.update(database, collection, { "ReqNo": neworder['ReqNo'], "LIMstatus": "IP" }, { $set: { "data.W14": '' } });
      //   output = 'ok';
      // } else if (check1[0]['data']['W13'] != '') {
      //   let ins2 = await mongodb.update(database, collection, { "ReqNo": neworder['ReqNo'], "LIMstatus": "IP" }, { $set: { "data.W13": '' } });
      //   output = 'ok';
      // }else 
      if(input['DX'] == 'D01W11'){
        let ins2 = await mongodbupdate(database, collection, { "ReqNo": neworder['ReqNo'], "UID": neworder['UID'], "LIMstatus": "IP" }, { $set: { "data01.W11": "" } });
      }
      // if(input['DX'] == 'D01W21'){
      //   let ins2 = await mongodbupdate(database, collection, { "ReqNo": neworder['ReqNo'], "UID": neworder['UID'], "LIMstatus": "IP" }, { $set: { "data01.W21": "" } });
      // }
      if(input['DX'] == 'D02W11'){
        let ins2 = await mongodbupdate(database, collection, { "ReqNo": neworder['ReqNo'], "UID": neworder['UID'], "LIMstatus": "IP" }, { $set: { "data02.W11": "" } });
      }
      // if(input['DX'] == 'D02W21'){
      //   let ins2 = await mongodbupdate(database, collection, { "ReqNo": neworder['ReqNo'], "UID": neworder['UID'], "LIMstatus": "IP" }, { $set: { "data02.W21": "" } });
      // }
      

    }

  }

  //-------------------------------------
  res.json(output);
});

export default router;
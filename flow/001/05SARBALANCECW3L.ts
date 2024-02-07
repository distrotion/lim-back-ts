import express from "express";
import { Router } from "express";
import { mssqlquery } from "../../function/mssql";
import { mongodbinsertMany, mongodbfind, mongodbfindsome, mongodbupdate } from "../../function/mongodb";

const router: Router = express.Router();

let database = `LIMinstrument`;
// let collection = `BALANCEdata`;
let collection = `BALANCEdataCoatingweight3L`;


router.post('/05SARBALANCECW3L/GENREQ', async (req, res) => {
  //-------------------------------------
  console.log("--05SARBALANCECW3L/GENREQ--");
  console.log(req.body);
  let input: any = req.body;
  //-------------------------------------
  let output = 'nok';
  if (input['ReqNo'] != undefined && input['InstrumentName'] != undefined && input['ReqNo'] != '' && input['INSNO'] != '') {

    let timestamp = Date.now();
    let neworder = input;
    neworder['GENREQtimestamp'] = timestamp;


    // let check1 = await mongodbfind(database, collection, { "ReqNo": neworder['ReqNo'], "UID": neworder['UID'], "LIMstatus": "IP" });
    // let check2 = await mongodbfind(database, collection, { "ReqNo": neworder['ReqNo'], "UID": neworder['UID'], "LIMstatus": "SEND" });
    let check2 = await mongodbfind(database, collection, { "ReqNo": neworder['ReqNo'], "UID": neworder['UID'], "$or": [{ "LIMstatus": "SEND" }, { "LIMstatus": "IP" }] });

    //$and: [


    // if (check1.length === 0 && check2.length === 0) {
    if (check2.length === 0) {
      neworder['LIMstatus'] = 'IP';
      neworder['LIMTYPE'] = '05SARBALANCECW3L';
      neworder['INSNO'] = input['INSNO'];
      neworder['data01'] = { "W11": '', "W21": '', "W31": '', "W41": '', };

      neworder['data01_area'] = { "area": '' };

      neworder['data01_ans'] = { "ans1121": '', "ans2131": '', "ans3141": '' };

      let ins1 = await mongodbinsertMany(database, collection, [neworder]);

      output = 'ok';
    } else {
    }
  }

  //-------------------------------------
  res.json(output);
});

router.post('/05SARBALANCECW3L/UPDATEDATAWEIGHT', async (req, res) => {
  //-------------------------------------
  console.log("--05SARBALANCECW3L/UPDATEDATAWEIGHT--");
  console.log(req.body);
  let input = req.body;
  //-------------------------------------
  let output = 'nok';
  if (input['ReqNo'] != undefined && input['DataPreview'] != undefined && input['ReqNo'] != '' && input['WX'] != undefined) {

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
      if (input['WX'] == 'D01W11') {
        let ins2 = await mongodbupdate(database, collection, { "ReqNo": neworder['ReqNo'], "UID": neworder['UID'], "LIMstatus": "IP" }, { $set: { "data01.W11": input['DataPreview'] } });
      }
      if (input['WX'] == 'D01W21') {
        let ins2 = await mongodbupdate(database, collection, { "ReqNo": neworder['ReqNo'], "UID": neworder['UID'], "LIMstatus": "IP" }, { $set: { "data01.W21": input['DataPreview'] } });
      }
      if (input['WX'] == 'D01W31') {
        let ins2 = await mongodbupdate(database, collection, { "ReqNo": neworder['ReqNo'], "UID": neworder['UID'], "LIMstatus": "IP" }, { $set: { "data01.W31": input['DataPreview'] } });
      }
      if (input['WX'] == 'D01W41') {
        let ins2 = await mongodbupdate(database, collection, { "ReqNo": neworder['ReqNo'], "UID": neworder['UID'], "LIMstatus": "IP" }, { $set: { "data01.W41": input['DataPreview'] } });
      }
      // if (input['WX'] == 'D02W31') {
      //   let ins2 = await mongodbupdate(database, collection, { "ReqNo": neworder['ReqNo'], "UID": neworder['UID'], "LIMstatus": "IP" }, { $set: { "data02.W31": input['DataPreview'] } });
      // }
      // if (input['WX'] == 'D02W41') {
      //   let ins2 = await mongodbupdate(database, collection, { "ReqNo": neworder['ReqNo'], "UID": neworder['UID'], "LIMstatus": "IP" }, { $set: { "data02.W41": input['DataPreview'] } });
      // }




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


router.post('/05SARBALANCECW3L/UPDATEDATAAREA', async (req, res) => {
  //-------------------------------------
  console.log("--05SARBALANCECW3L/UPDATEDATAAREA--");
  console.log(req.body);
  let input = req.body;
  //-------------------------------------
  let output = 'nok';
  if (input['ReqNo'] != undefined && input['DataPreview'] != undefined && input['ReqNo'] != '' && input['D01NOitem'] != undefined && input['areaE01'] != undefined && input['Result01'] != undefined&& input['Result02'] != undefined&& input['Result03'] != undefined ) {
//&& input['D01W11_21'] != undefined
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

      // let ins2 = await mongodbupdate(database, collection, { "ReqNo": neworder['ReqNo'], "UID": neworder['UID'], "LIMstatus": "IP" }, { $set: { "D01NOitem": input['D01NOitem'], "data01_area.area": input['areaE01'], "data01_ans.ans1121": input['Result01'], "data01_area.D01W11_21": input['D01W11_21'] } });
      
      console.log(input['D01NOitem']);
      let ins2 = await mongodbupdate(database, collection, { "ReqNo": neworder['ReqNo'], "UID": neworder['UID'], "LIMstatus": "IP" }, { $set: { "D01NOitem": input['D01NOitem'], "data01_area.area": input['areaE01'], "data01_ans.ans1121": input['Result01'], "data01_ans.ans2131": input['Result02'], "data01_ans.ans3141": input['Result03'] } });


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

router.post('/05SARBALANCECW3L/UPDATEDATAAREA', async (req, res) => {
  //-------------------------------------
  console.log("--05SARBALANCECW3L/UPDATEDATAAREA--");
  console.log(req.body);
  let input = req.body;
  //-------------------------------------
  let output = 'nok';
  if (input['ReqNo'] != undefined && input['DataPreview'] != undefined && input['ReqNo'] != '') {

    let timestamp = Date.now();
    let neworder = input;

    let check1 = await mongodbfind(database, collection, { "ReqNo": neworder['ReqNo'], "UID": neworder['UID'], "LIMstatus": "IP" });
    if (check1.length > 0) {
      // if (check1[0]['data']['data_area'] == '') {
        let ins2 = await mongodbupdate(database, collection, { "ReqNo": neworder['ReqNo'], "UID": neworder['UID'], "LIMstatus": "IP" }, { $set: { "data_area.area": input['DataPreview'] } });
        output = 'ok';
      // }

    }

  }

  //-------------------------------------
  res.json(output);
});

router.post('/05SARBALANCECW3L/DELETEDATAW11', async (req, res) => {
  //-------------------------------------
  console.log("--05SARBALANCECW3L/DELETEDATAW11--");
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
      if (input['DX'] == 'D01W11') {
        let ins2 = await mongodbupdate(database, collection, { "ReqNo": neworder['ReqNo'], "UID": neworder['UID'], "LIMstatus": "IP" }, { $set: { "data01.W11": "" } });
      }
      if (input['DX'] == 'D01W21') {
        let ins2 = await mongodbupdate(database, collection, { "ReqNo": neworder['ReqNo'], "UID": neworder['UID'], "LIMstatus": "IP" }, { $set: { "data01.W21": "" } });
      }
      if (input['DX'] == 'D01W31') {
        let ins2 = await mongodbupdate(database, collection, { "ReqNo": neworder['ReqNo'], "UID": neworder['UID'], "LIMstatus": "IP" }, { $set: { "data01.W31": "" } });
      }
      if (input['DX'] == 'D01W41') {
        let ins2 = await mongodbupdate(database, collection, { "ReqNo": neworder['ReqNo'], "UID": neworder['UID'], "LIMstatus": "IP" }, { $set: { "data01.W41": "" } });
      }

    }

  }

  //-------------------------------------
  res.json(output);
});

export default router;
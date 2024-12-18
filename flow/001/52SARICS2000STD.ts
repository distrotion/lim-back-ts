import express from "express";
import { Router } from "express";
import { mssqlquery } from "../../function/mssql";
import { mongodbinsertMany, mongodbfind, mongodbfindsome, mongodbupdate } from "../../function/mongodb";

const router: Router = express.Router();

let database = `LIMinstrument`;
// let collection = `BALANCEdata`;
let collection = `ICS2000dataSTD`;


router.post('/52SARICS2000STD/GENREQ', async (req, res) => {
  //-------------------------------------
  console.log("--52SARICS2000STD/GENREQ--");
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
      neworder['LIMTYPE'] = '52SARICS2000STD';
      neworder['INSNO'] = input['INSNO'];
      neworder['data01'] = {"W11": '', "W12": '',"W13": '',};
      neworder['data02'] = {"W11": '', "W12": '',"W13": '',};
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

router.post('/52SARICS2000STD/UPDATEDATAPPM', async (req, res) => {
  //-------------------------------------
  console.log("--52SARICS2000STD/UPDATEDATAPPM--");
  console.log(req.body);
  let input = req.body;
  //-------------------------------------
  let output = 'nok';
  if (input['ReqNo'] != undefined && input['DataPreview11'] != undefined && input['ReqNo'] != ''&& input['DataPreview21'] != undefined) {
//&& input['WX'] != undefined 
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

      // console.log({ "data01.W11": input['DataPreview11'] , "data02.W11": input['DataPreview21'], "data01_volum.D01W11_21": input['D01NOitem'],"data02_volum.D01W11_21": input['D02NOitem'],} )
      let ins2 = await mongodbupdate(database, collection, { "ReqNo": neworder['ReqNo'], "UID": neworder['UID'], "LIMstatus": "IP" }, { $set: { "data01.W11": input['DataPreview11'] , "data02.W11": input['DataPreview21'], "data01_volum.volum": input['D01NOitem'],"data02_volum.volum": input['D02NOitem'],} });
     


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


router.post('/52SARICS2000STD/UPDATEDATAVOLUME', async (req, res) => {
  //-------------------------------------
  console.log("--52SARICS2000STD/UPDATEDATAVOLUME--");
  console.log(req.body);
  let input = req.body;
  //-------------------------------------
  let output = 'nok';
  // if (input['ReqNo'] != undefined && input['DataPreview'] != undefined && input['ReqNo'] != ''&& input['D01NOitem'] != undefined&& input['D02NOitem'] != undefined&& input['VOLUME01'] != undefined&& input['VOLUME02'] != undefined&& input['Result01'] != undefined&& input['D01W11_21'] != undefined&& input['D02W11_21'] != undefined) {
    if (input['ReqNo'] != undefined && input['DataPreview11'] != undefined && input['ReqNo'] != '' && input['DataPreview21'] != undefined) {
      //&& input['WX'] != undefined
    let timestamp = Date.now();
    let neworder = input;

    let check1 = await mongodbfind(database, collection, { "ReqNo": neworder['ReqNo'], "UID": neworder['UID'], "LIMstatus": "IP" });

    // console.log(check1);
    if (check1.length > 0) {
      // if (check1[0]['data']['W11'] == '') {
      //   let ins2 = await mongodb.update(database, collection, { "ReqNo": neworder['ReqNo'], "UID": neworder['UID'], "LIMstatus": "IP" }, { $set: { "data.W11": input['DataPreview'] } });
      //   output = 'ok';
      // } else if (check1[0]['data']['W12'] == '') {
      //   let ins2 = await mongodb.update(database, collection, { "ReqNo": neworder['ReqNo'], "UID": neworder['UID'], "LIMstatus": "IP" }, { $set: { "data.W12": input['DataPreview'] } }); //data01_ans
      //   output = 'ok';
      // }
      // let ins2 = await mongodbupdate(database, collection, { "ReqNo": neworder['ReqNo'], "UID": neworder['UID'], "LIMstatus": "IP" }, { $set: { "D01NOitem": input['D01NOitem'], "D02NOitem": input['D02NOitem'], "data01_volum.volum": input['VOLUME01'], "data02_volum.volum": input['VOLUME02'], "data01_ans.ans": input['Result01'], "data02_ans.ans": input['Result02'], "data01_volum.D01W11_21": input['D01W11_21'], "data02_volum.D02W11_21": input['D02W11_21'] } });
      console.log({ "data01.W11": input['DataPreview11'] , "data02.W11": input['DataPreview21'], "data01_volum.D01W11_21": input['D01NOitem'],"data02_volum.D01W11_21": input['D02NOitem'],} )
      let ins2 = await mongodbupdate(database, collection, { "ReqNo": neworder['ReqNo'], "UID": neworder['UID'], "LIMstatus": "IP" }, { $set: { "data01.W11": input['DataPreview11'] , "data02.W11": input['DataPreview21'], "data01_volum.volum": input['D01NOitem'],"data02_volum.volum": input['D02NOitem'],} });

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

router.post('/52SARICS2000STD/UPDATEDATAAREA', async (req, res) => {
  //-------------------------------------
  console.log("--52SARICS2000STD/UPDATEDATAW11--");
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
        // let ins2 = await mongodbupdate(database, collection, { "ReqNo": neworder['ReqNo'], "UID": neworder['UID'], "LIMstatus": "IP" }, { $set: { "data_area.area": input['DataPreview'] } });
        output = 'ok';
      }

    }

  }

  //-------------------------------------
  res.json(output);
});

router.post('/52SARICS2000STD/DELETEDATAW11', async (req, res) => {
  //-------------------------------------
  console.log("--52SARICS2000STD/DELETEDATAW11--");
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
        let ins2 = await mongodbupdate(database, collection, { "ReqNo": neworder['ReqNo'], "UID": neworder['UID'], "LIMstatus": "IP" }, { $set: { "data01.W11": "","data01.W12": "","data01.W13": "" } });
      }
      // if(input['DX'] == 'D01W21'){
      //   let ins2 = await mongodbupdate(database, collection, { "ReqNo": neworder['ReqNo'], "UID": neworder['UID'], "LIMstatus": "IP" }, { $set: { "data01.W21": "" } });
      // }
      if(input['DX'] == 'D02W11'){
        let ins2 = await mongodbupdate(database, collection, { "ReqNo": neworder['ReqNo'], "UID": neworder['UID'], "LIMstatus": "IP" }, { $set: { "data01.W11": "","data01.W12": "","data01.W13": "" }  });
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
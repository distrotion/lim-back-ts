import express from "express";
import { Router } from "express";
import { mssqlquery } from "../../function/mssql";
import { mongodbinsertMany, mongodbfind, mongodbfindsome, mongodbupdate } from "../../function/mongodb";

const router: Router = express.Router();


router.post('/GETBALANCEREQ', async (req, res) => {
  //-------------------------------------
  console.log(req.body);
  let input = req.body
  //-------------------------------------
  



  //-------------------------------------
  res.json(input);
});

export default router;
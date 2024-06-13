import express from "express";
import { Router } from "express";
// import flow00101TEST from "./flow/001/01TEST";
import login from "./flow/login/login";
import F01SARBALANCETABLE from "./flow/001/01SARBALANCETABLE";
import F02SARBALANCECW from "./flow/001/02SARBALANCECW";
import F03SARBALANCEICP from "./flow/001/03SARBALANCEICP";
import F04SARBALANCESLUDGE from "./flow/001/04SARBALANCESLUDGE";
import F05SARBALANCECW3L from "./flow/001/05SARBALANCECW3L";
import F06SARBALANCENVC from "./flow/001/06SARBALANCENVC";
import F07SARBALANCEACID from "./flow/001/07SARBALANCEACID";
import F08SARBALANCESSM from "./flow/001/08SARBALANCESSM";
import P1F04SARPHSTD from "./flow/001/20SARPHSTD";
import P1F04SARFFSTD from "./flow/001/26SARFFSTD";
import P2F01SARICPSTD from "./flow/001/36SARICPSTD";
import P2F01SARTOCSTD from "./flow/001/37SARTOCSTD";
import P3F01SARXRFSTD from "./flow/001/40SARXRFSTD";

import P2F01GETLIST from "./flow/002/01GETLIST";
import testflow from "./flow/testflow/testflow";

import P3F101LIMX from "./flow/003/01LIMX";


//05SARBALANCECW3L
//26SARFFSTD
// import flowloginlogin from "./flow/login/login";
// import flowtestflowtestflow from "./flow/testflow/testflow";

const router: Router = express.Router();
// router.use(flow00101TEST);
router.use(login);
router.use(F01SARBALANCETABLE);
router.use(F02SARBALANCECW);
router.use(F03SARBALANCEICP);
router.use(F04SARBALANCESLUDGE);
router.use(F05SARBALANCECW3L);
router.use(F06SARBALANCENVC);
router.use(P1F04SARPHSTD);
router.use(P2F01GETLIST);
router.use(P1F04SARFFSTD);
router.use(P2F01SARICPSTD);
router.use(testflow);

router.use(F07SARBALANCEACID);
router.use(F08SARBALANCESSM);
router.use(P2F01SARTOCSTD);
router.use(P3F01SARXRFSTD);

router.use(P3F101LIMX);
// router.use(flow004flow004);
// router.use(flow005flow005);
// router.use(flowloginlogin);
// router.use(flowtestflowtestflow);

export default router;
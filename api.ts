import express from "express";
import { Router } from "express";
// import flow00101TEST from "./flow/001/01TEST";
import login from "./flow/login/login";
import F01SARBALANCETABLE from "./flow/001/01SARBALANCETABLE";
import F02SARBALANCECW from "./flow/001/02SARBALANCECW";
// import F03SARBALANCEICP from "./flow/001/03SARBALANCEICP";
import F04SARBALANCESLUDGE from "./flow/001/04SARBALANCESLUDGE";
import testflow from "./flow/testflow/testflow";

// import flowloginlogin from "./flow/login/login";
// import flowtestflowtestflow from "./flow/testflow/testflow";

const router: Router = express.Router();
// router.use(flow00101TEST);
router.use(login);
router.use(F01SARBALANCETABLE);
router.use(F02SARBALANCECW);
// router.use(F03SARBALANCEICP);
router.use(F04SARBALANCESLUDGE);
router.use(testflow);
// router.use(flow004flow004);
// router.use(flow005flow005);
// router.use(flowloginlogin);
// router.use(flowtestflowtestflow);

export default router;
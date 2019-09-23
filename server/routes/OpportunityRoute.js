const express = require('express');
const router = express.Router();
const { listOpps, showOpp, createOpp, updateOpp, removeOpp } = require("../controllers/OpportunityController");

router.get("/api/opp", listOpps);
router.get("/api/opp/:id", showOpp);
router.post("/api/opp", createOpp);
router.put("/api/opp/:id", updateOpp);
router.delete("/api/opp/:id", removeOpp);

module.exports = router;
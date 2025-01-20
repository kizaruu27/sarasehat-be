const express = require("express");
const { getAllItems } = require("../controllers/itemsControllers");
const router = express.Router();

router.get("/", getAllItems);

module.exports = router;

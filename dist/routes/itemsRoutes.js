"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const itemsControllers_1 = require("../controllers/itemsControllers");
const router = (0, express_1.Router)();
router.get("/", itemsControllers_1.getAllItems);
exports.default = router;

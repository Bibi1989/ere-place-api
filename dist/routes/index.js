"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const router = express_1.Router();
/* GET home page. */
router.get("/", function (req, res) {
    res.send("yes");
});
exports.default = router;
//# sourceMappingURL=index.js.map
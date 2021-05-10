"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
const { calculateShapePost, fetchAll } = require("./controller");
/* GET users listing. */
router.get("/calculate", function (req, res, next) {
    fetchAll(req, res);
});
router.post("/calculate", (req, res, next) => {
    calculateShapePost(req, res);
});
exports.default = router;

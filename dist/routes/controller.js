"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.fetchAll = exports.calculateShapePost = void 0;
const express_1 = __importDefault(require("express"));
const fs_1 = __importDefault(require("fs"));
let database = require("../data/database.json");
const router = express_1.default.Router();
let lastId = database[database.length - 1].id + 1;
function writeFileToDatabase(filename, content) {
    fs_1.default.writeFileSync(filename, JSON.stringify(content, null, 2), "utf8");
}
async function fetchAll(req, res) {
    res.status(200).json({ database });
}
exports.fetchAll = fetchAll;
async function calculateShapePost(req, res) {
    try {
        let shape = req.body.shape.toLowerCase();
        let dimension = req.body.dimension;
        if (shape === "square") {
            const side = dimension;
            if (!isNaN(side)) {
                let result = {
                    id: lastId || 1,
                    shape: req.body.shape,
                    createdAt: new Date(),
                    dimension: req.body.dimension,
                    area: +(side * side).toFixed(2),
                };
                database.push(result);
                writeFileToDatabase("dist/data/database.json", database);
                res.status(200).json({ result });
            }
            else {
                res.status(400).json("invalid type of dimension for square");
            }
        }
        else if (shape === "rectangle" && Object.values(dimension).length === 2) {
            if (Object.values(dimension).every((el) => typeof el === "number")) {
                const { length, breath } = req.body.dimension;
                let result = {
                    id: lastId || 1,
                    shape: req.body.shape,
                    createdAt: new Date(),
                    dimension: req.body.dimension,
                    area: +(length * breath).toFixed(2),
                };
                database.push(result);
                writeFileToDatabase("dist/data/database.json", database);
                res.status(200).json({ result });
            }
            else {
                res.status(400).json("invalid dimension for rectangle");
            }
        }
        else if (shape === "triangle" && Object.values(dimension).length === 3) {
            if (Object.values(dimension).every((el) => typeof el === "number")) {
                const { length_a, length_b, length_c } = req.body.dimension;
                let s = (length_a + length_b + length_c) / 2;
                let area = Math.sqrt(s) * (s - length_a) * (s - length_b) * (s - length_c);
                let result = {
                    id: lastId || 1,
                    shape: req.body.shape,
                    createdAt: new Date(),
                    dimension: req.body.dimension,
                    area: +area.toFixed(2),
                };
                database.push(result);
                writeFileToDatabase("dist/data/database.json", database);
                res.status(200).json({ result });
            }
            else {
                res.status(400).json("invalid dimension for triangle");
            }
        }
        else if (shape === "circle") {
            const radius = req.body.dimension;
            if (!isNaN(radius)) {
                let result = {
                    id: lastId || 1,
                    shape: req.body.shape,
                    createdAt: new Date(),
                    dimension: req.body.dimension,
                    area: +(Math.PI * radius ** 2).toFixed(2),
                };
                database.push(result);
                writeFileToDatabase("dist/data/database.json", database);
                res.status(200).json({ result });
            }
            else {
                res.status(400).json("invalid type of dimension for circle");
            }
        }
        else {
            res.status(404).json("invalid shape");
        }
    }
    catch (error) {
        console.log(error.message);
    }
}
exports.calculateShapePost = calculateShapePost;

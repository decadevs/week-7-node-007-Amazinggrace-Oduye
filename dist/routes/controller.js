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
        let dimArrValues = Object.values(dimension);
        if (shape === "square") {
            const side = dimension;
            if (typeof side !== "number" || side < 1) {
                return res.status(400).json("invalid type of dimension for square");
            }
            else {
                let result = {
                    id: lastId || 1,
                    shape: req.body.shape,
                    createdAt: new Date(),
                    dimension: req.body.dimension,
                    area: +(side * side).toFixed(2),
                };
                database.push(result);
                writeFileToDatabase("dist/data/database.json", database);
                return res.status(201).json({ result });
            }
        }
        else if (shape === "rectangle") {
            if (dimArrValues.length !== 2) {
                return res.status(400).json("invalid dimension for rectangle");
            }
            else {
                if (dimArrValues.every((el) => typeof el === "number") &&
                    dimArrValues.length === 2) {
                    const { a, b } = dimension;
                    let area = a * b;
                    if (area < 1) {
                        return res.status(400).json("dimension can not form triangle");
                    }
                    let result = {
                        id: lastId || 1,
                        shape: req.body.shape,
                        createdAt: new Date(),
                        dimension: req.body.dimension,
                        area: +area.toFixed(2),
                    };
                    database.push(result);
                    writeFileToDatabase("dist/data/database.json", database);
                    return res.status(201).json({ result });
                }
                else {
                    return res.status(400).json("invalid dimension for rectangle");
                }
            }
        }
        else if (shape === "triangle") {
            if (dimArrValues.length !== 3) {
                return res.status(400).json("invalid dimension for triangle");
            }
            else {
                if (dimArrValues.every((el) => typeof el === "number") &&
                    dimArrValues.length === 3) {
                    const { a, b, c } = req.body.dimension;
                    let s = (a + b + c) / 2;
                    let area = Math.sqrt(s) * (s - a) * (s - b) * (s - c);
                    if (area < 1) {
                        return res.status(400).json("Dimension can not form triangle");
                    }
                    let result = {
                        id: lastId || 1,
                        shape: req.body.shape,
                        createdAt: new Date(),
                        dimension: req.body.dimension,
                        area: +area.toFixed(2),
                    };
                    database.push(result);
                    writeFileToDatabase("dist/data/database.json", database);
                    res.status(201).json({ result });
                }
                else {
                    return res.status(400).json("invalid dimension for triangle");
                }
            }
        }
        else if (shape === "circle") {
            const radius = req.body.dimension;
            if (typeof radius === "number" && radius > 0) {
                let result = {
                    id: lastId || 1,
                    shape: req.body.shape,
                    createdAt: new Date(),
                    dimension: req.body.dimension,
                    area: +(Math.PI * radius ** 2).toFixed(2),
                };
                database.push(result);
                writeFileToDatabase("dist/data/database.json", database);
                return res.status(201).json({ result });
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

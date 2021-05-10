import express, { Router, Request, Response, NextFunction } from "express";
import fs from "fs";
let database = require("../data/database.json");
const router = express.Router();
let lastId = database[database.length - 1].id + 1;
interface name {
  id?: number;
  shape: string;
  createdAt?: Date;
  dimension:
    | {
        a: number;
        b: number;
        c?: number;
      }
    | number;
  area?: number;
}
function writeFileToDatabase(filename: string, content: name) {
  fs.writeFileSync(filename, JSON.stringify(content, null, 2), "utf8");
}
async function fetchAll(req: Request, res: Response) {
  res.status(200).json({ database });
}
async function calculateShapePost(req: Request, res: Response) {
  try {
    let shape = req.body.shape.toLowerCase();
    let dimension = req.body.dimension;
      if (shape === "square") {
        const side = dimension
      if (!isNaN(side) ) {
        let result: name = {
          id: lastId || 1,
          shape: req.body.shape,
          createdAt: new Date(),
          dimension: req.body.dimension,
          area: +(side * side).toFixed(2),
        };
        database.push(result);
        writeFileToDatabase("dist/data/database.json", database);
        res.status(200).json({ result });
      } else {
        res.status(400).json("invalid type of dimension for square");
      }
    } else if (shape === "rectangle" && Object.values(dimension).length === 2) {
      if (Object.values(dimension).every((el) => typeof el === "number")) {
          const { length, breath } = req.body.dimension;
        let result: name = {
          id: lastId || 1,
          shape: req.body.shape,
          createdAt: new Date(),
          dimension: req.body.dimension,
          area: +(length * breath).toFixed(2),
        };
        database.push(result);
        writeFileToDatabase("dist/data/database.json", database);
        res.status(200).json({ result });
      } else {
        res.status(400).json("invalid dimension for rectangle");
      }
    } else if (shape === "triangle" && Object.values(dimension).length === 3) {
      if (Object.values(dimension).every((el) => typeof el === "number")) {
          const { length_a, length_b, length_c } = req.body.dimension;
        let s = (length_a + length_b + length_c) / 2;
        let area =
          Math.sqrt(s) * (s - length_a) * (s - length_b) * (s - length_c);
        let result: name = {
          id: lastId || 1,
          shape: req.body.shape,
          createdAt: new Date(),
          dimension: req.body.dimension,
          area: +area.toFixed(2),
        };
        database.push(result);
        writeFileToDatabase("dist/data/database.json", database);
        res.status(200).json({ result });
      } else {
        res.status(400).json("invalid dimension for triangle");
      }
    } else if (shape === "circle") {
        const radius  = req.body.dimension;
      if (!isNaN(radius)) {
        let result: name = {
          id: lastId || 1,
          shape: req.body.shape,
          createdAt: new Date(),
          dimension: req.body.dimension,
          area: +(Math.PI * radius** 2).toFixed(2),
        };
        database.push(result);
        writeFileToDatabase("dist/data/database.json", database);
        res.status(200).json({ result });
      } else {
        res.status(400).json("invalid type of dimension for circle");
      }
    } else {
      res.status(404).json("invalid shape");
    }
  } catch (error) {
    console.log(error.message);
  }
}
export { calculateShapePost, fetchAll };

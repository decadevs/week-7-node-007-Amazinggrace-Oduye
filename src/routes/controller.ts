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
    let dimArrValues = Object.values(dimension);
    if (shape === "square") {
      const side = dimension;
      if (typeof side !== "number" || side <1) {
        return res.status(400).json("invalid type of dimension for square");
      } else {
        let result: name = {
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
    } else if (shape === "rectangle") {
      if (dimArrValues.length !== 2) {
        return res.status(400).json("invalid dimension for rectangle");
      } else {
        if (
          dimArrValues.every((el) => typeof el === "number") &&
          dimArrValues.length === 2
        ) {
          const { a, b } = dimension;
          let area = a * b
          if (area < 1) {
            return res.status(400).json("dimension can not form triangle")
          }
          let result: name = {
            id: lastId || 1,
            shape: req.body.shape,
            createdAt: new Date(),
            dimension: req.body.dimension,
            area: +area.toFixed(2),
          };
          database.push(result);
          writeFileToDatabase("dist/data/database.json", database);
          return res.status(201).json({ result });
        } else {
          return res.status(400).json("invalid dimension for rectangle");
        }
      }
    } else if (shape === "triangle") {
      if (dimArrValues.length !== 3) {
        return res.status(400).json("invalid dimension for triangle");
      } else {
        if (
          dimArrValues.every((el) => typeof el === "number") &&
          dimArrValues.length === 3
        ) {
          const { a, b, c } = req.body.dimension;
          let s = (a + b + c) / 2;
          let area = Math.sqrt(s) * (s - a) * (s - b) * (s - c);
          if (area < 1) {
            return res.status(400).json("Dimension can not form triangle")
          }
          let result: name = {
            id: lastId || 1,
            shape: req.body.shape,
            createdAt: new Date(),
            dimension: req.body.dimension,
            area: +area.toFixed(2),
          };
          database.push(result);
          writeFileToDatabase("dist/data/database.json", database);
          res.status(201).json({ result });
        } else {
          return res.status(400).json("invalid dimension for triangle");
        }
      }
    } else if (shape === "circle") {
      const radius = req.body.dimension;
      if (typeof radius === "number" && radius > 0) {
        let result: name = {
          id: lastId || 1,
          shape: req.body.shape,
          createdAt: new Date(),
          dimension: req.body.dimension,
          area: +(Math.PI * radius ** 2).toFixed(2),
        };
        database.push(result);
        writeFileToDatabase("dist/data/database.json", database);
        return res.status(201).json({ result });
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

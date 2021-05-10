import express, { Request, Response, NextFunction } from "express";
const router = express.Router();

const { calculateShapePost, fetchAll } = require("./controller");

/* GET users listing. */
router.get("/calculate", function (
  req: Request,
  res: Response,
  next: NextFunction
) {
  fetchAll(req, res);
});
router.post("/calculate", (req: Request, res: Response, next: NextFunction) => {
  calculateShapePost(req, res);
});

export default router;

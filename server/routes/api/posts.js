import { Router } from "express";

const route = Router();

route.get("/test", (req, res) =>
  res.json({
    test: "post route",
  })
);

export default route;

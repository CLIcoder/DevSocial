import { Router } from "express";

const route = Router();

route.get("/test", (req, res) => res.json({ test: "profile route" }));

export default route;

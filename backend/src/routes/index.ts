import { Router } from "express";
import { createUrl, getUrl } from "../handler";

const router = Router();


router.post("/create-url",createUrl)
router.get("/:url",getUrl);

export default router;
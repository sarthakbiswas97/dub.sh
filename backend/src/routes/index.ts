import { Router } from "express";
import { createUrl, getUrl } from "../handler";

const router = Router();


router.post("/create-url",createUrl)

export default router;
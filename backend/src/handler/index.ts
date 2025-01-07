import { Request, Response } from "express";
import prisma from "../lib/prisma";
import { customAlphabet } from 'nanoid';

const nanoid = customAlphabet('ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789', 6);



export const createUrl = async (req:Request, res:Response) => {
    try {
        const {url} = req.body;
        
        if (!url) {
            res.status(400).json({ error: "URL is required" });
            return
        }

        const shortId = nanoid();
        const shortUrl = await prisma.url.create({
            data:{
                shortUrl: `${shortId}.com`,
                longUrl: url
            }
        });

        res.json({ shortUrl });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal server error" });
    }
}

export const getUrl = async(req:Request,res:Response)=>{
    try {
        const url = req.params.url;

        const response = await prisma.url.findUnique({
            where:{
                shortUrl: url
            }
        });

        if(!response){
            res.status(404).json({
                msg:"URL  not found"
            })
            return
        }

        const path = response.longUrl;

        if(!path){
            res.status(404).send("URL not found");
            return
        }

        res.redirect(301,path);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal server error" });
    }
}
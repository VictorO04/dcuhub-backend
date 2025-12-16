import * as productionsModel from "../models/productionsModel.js";
import { Request, Response } from "express";

const serverErrorMessage = (res: Response, error: unknown) => {
    console.error(error);

    return res.status(500).json({
        message: "Internal server error"
    });
}

export const getAllProductions = async (req: Request, res: Response) => {
    try {
        const productions = await productionsModel.findAllProductions();

        res.status(200).json({
            total: productions.length,
            message: productions.length === 0
                ? "No productions are currently registered"
                : "Productions retrieved successfully",
            productions
        });
    } catch (error) {
        return serverErrorMessage(res, error);
    }
}
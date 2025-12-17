import * as productionsModel from "../models/productionsModel.js";
import { Request, Response } from "express";

const serverErrorMessage = (res: Response, error: unknown) => {
    console.error(error);

    return res.status(500).json({
        message: "Internal server error"
    });
}

const validId = (id: number) => !Number.isNaN(id) && Number.isInteger(id) && id > 0;

export const getAllProductions = async (req: Request, res: Response) => {
    try {
        const productions = await productionsModel.findAllProductions();

        res.status(200).json({
            total: productions.length,
            message: productions.length === 0
                ? "No productions are currently registered"
                : "Productions retrieved successfully",
            data: productions
        });
    } catch (error) {
        return serverErrorMessage(res, error);
    }
}

export const getProductionById = async (req: Request, res: Response) => {
    try {
        const id = Number(req.params.id);

        if (!validId(id)) {
            return res.status(400).json({
                message: `Invalid ID parameter`
            });
        }

        const production = await productionsModel.findProductionById(id);

        if (!production) {
            return res.status(404).json({
                message: `Production with ID ${id} not found`
            });
        }

        res.status(200).json({
            message: `Production with ID ${id} found`,
            data: production
        });
    } catch (error) {
        return serverErrorMessage(res, error);
    }
}

export const postProduction = async (req: Request, res: Response) => {
    try {
        const data = req.body;

        if (!data || typeof data !== "object") {
            return res.status(400).json({
                message: "Invalid JSON request body"
            });
        }

        const requiredFields = ["title", "type", "year", "dcu_order", "photo_url"];
        const missingFields = requiredFields.filter((field) => {
            const value = data[field];
            return (
                value === undefined ||
                value === null ||
                (typeof value === "string" && value.trim() === "")
            );
        });

        if (missingFields.length > 0) {
            return res.status(400).json({
                message: `The following required fields are missing or empty: ${missingFields.join(", ")}`
            });
        }

        const newProduction = await productionsModel.createProduction(data);

        return res.status(201).json({
            message: "Production created successfully",
            data: newProduction
        });
    } catch (error) {
        return serverErrorMessage(res, error);
    }
}
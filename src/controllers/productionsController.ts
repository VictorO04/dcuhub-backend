import * as productionsModel from "../models/productionsModel.js";
import { Request, Response } from "express";
import { createProductiondto } from "../dtos/createProduction.dto.js";
import { patchProductiondto } from "../dtos/updateProduction.dto.js";

const serverErrorMessage = (res: Response, error: unknown) => {
    console.error(error);

    return res.status(500).json({
        message: "Internal server error"
    });
}

const validId = (id: number) => !Number.isNaN(id) && Number.isInteger(id) && id > 0;

interface productionFilters {
    title?: { contains: string; mode: "insensitive" }
    type?: { contains: string; mode: "insensitive" }
    year?: number;
}

export const getAllProductions = async (req: Request, res: Response) => {
    try {
        const { title, type, year } = req.query;

        const filters: productionFilters = {}

        if (title) {
            filters.title = {
                contains: String(title),
                mode: "insensitive"
            }
        }

        if (type) {
            filters.type = {
                contains: String(type),
                mode: "insensitive"
            }
        }

        if (year) {
            const yearNumber = Number(year);

            if (Number.isNaN(yearNumber)) {
                return res.status(400).json({
                    message: "Field year must be a number"
                });
            }

            filters.year = yearNumber
        }

        const productions = await productionsModel.findAllProductions(filters);

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
        const data: createProductiondto = req.body;

        if (!data || typeof data !== "object") {
            return res.status(400).json({
                message: "Invalid JSON request body"
            });
        }

        const requiredFields: (keyof createProductiondto)[] = ["title", "type", "year", "dcu_order", "photo_url"];
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

        if (typeof data.title !== "string" || typeof data.type !== "string" || typeof data.photo_url !== "string") {
            return res.status(400).json({
                message: "Fields title, type and photo_url must be a string"
            });
        }

        if (typeof data.year !== "number" || typeof data.dcu_order !== "number") {
            return res.status(400).json({
                message: "Fields year and dcu_order must be a number"
            });
        }

        const newProduction = await productionsModel.createProduction(data);

        res.status(201).json({
            message: "Production created successfully",
            data: newProduction
        });
    } catch (error) {
        return serverErrorMessage(res, error);
    }
}

export const deleteProduction = async (req: Request, res: Response) => {
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

        const deletedProduction = await productionsModel.deleteProduction(id);

        res.status(200).json({
            message: `Production with ID ${id} deleted successfully`,
            data: deletedProduction
        });
    } catch (error) {
        return serverErrorMessage(res, error);
    }
}

export const patchProduction = async (req:Request, res: Response) => {
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

        const data: patchProductiondto = req.body;

        if (!data || typeof data !== "object" || Object.keys(data).length === 0) {
            return res.status(400).json({
                message: "Request body must contain at least one field"
            });
        }

        if (data.title !== undefined && typeof data.title !== "string") {
            return res.status(400).json({ message: "Field title must be a string" });
        }

        if (data.type !== undefined && typeof data.type !== "string") {
            return res.status(400).json({ message: "Field type must be a string" });
        }

        if (data.photo_url !== undefined && typeof data.photo_url !== "string") {
            return res.status(400).json({ message: "Field photo_url must be a string" });
        }

        if (data.year !== undefined && typeof data.year !== "number") {
            return res.status(400).json({ message: "Field year must be a number" });
        }

        if (data.dcu_order !== undefined && typeof data.dcu_order !== "number") {
            return res.status(400).json({ message: "Field dcu_order must be a number" });
        }

        const updatedProduction = await productionsModel.updateProduction(id, data);

        res.status(200).json({
            message: `Production with ID ${id} updated successfully`,
            data: updatedProduction
        });

    } catch (error) {
        return serverErrorMessage(res, error);
    }
}
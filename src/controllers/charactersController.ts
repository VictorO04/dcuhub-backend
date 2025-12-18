import * as charactersModel from "../models/charactersModel.js";
import { Request, Response } from "express";

const serverErrorMessage = (res: Response, error: unknown) => {
    console.error(error);

    return res.status(500).json({
        message: "Internal server error"
    });
}

export const getAllCharacters = async (req: Request, res: Response) => {
    try {
        const { character, identity, first_appearance } = req.query;

        const filters: any = {}

        if (character) {
            filters.character = {
                contains: String(character),
                mode: "insensitive"
            }
        }

        if (identity) {
            filters.identity = {
                contains: String(identity),
                mode: "insensitive"
            }
        }

        if (first_appearance) {
            filters.first_appearance = {
                contains: String(first_appearance),
                mode: "insensitive"
            }
        }

        const characters = await charactersModel.findAllCharacters(filters);
        
            res.status(200).json({
                total: characters.length,
                message: characters.length === 0
                    ? "No characters are currently registered"
                    : "characters retrieved successfully",
                data: characters
                });
    } catch (error) {
        return serverErrorMessage(res, error);
    }
}
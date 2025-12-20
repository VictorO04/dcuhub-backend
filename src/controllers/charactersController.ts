import * as charactersModel from "../models/charactersModel.js";
import { Request, Response } from "express";
import { createCharacterdto } from "../dtos/createCharacter.dto.js";

const serverErrorMessage = (res: Response, error: unknown) => {
    console.error(error);

    return res.status(500).json({
        message: "Internal server error"
    });
}

const validId = (id: number) => !Number.isNaN(id) && Number.isInteger(id) && id > 0;

interface charactersFilters {
    character?: { contains: string; mode: "insensitive" }
    identity?: { contains: string; mode: "insensitive" }
    first_appearance?: { contains: string; mode: "insensitive" }
}

export const getAllCharacters = async (req: Request, res: Response) => {
    try {
        const { character, identity, first_appearance } = req.query;

        const filters: charactersFilters = {}

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
                    : "Characters retrieved successfully",
                data: characters
                });
    } catch (error) {
        return serverErrorMessage(res, error);
    }
}

export const getCharacterById = async (req: Request, res: Response) => {
    const id = Number(req.params.id);

    if (!validId(id)) {
        return res.status(400).json({
            message: `Invalid ID parameter`
        });
    }

    const character = await charactersModel.findCharacterById(id);

    if (!character) {
        return res.status(404).json({
            message: `Character with ID ${id} not found`
        });
    }

    res.status(200).json({
        message: `Character with ID ${id} found`,
        data: character
    });
}

export const postCharacter = async (req: Request, res: Response) => {
    try {
        const data: createCharacterdto = req.body;

        if (!data || typeof data !== "object") {
            return res.status(400).json({
                message: "Invalid JSON request body"
            });
        }

         const requiredFields: (keyof createCharacterdto)[] = ["character", "identity", "first_appearance_id", "abilities", "personality", "photo_url"];
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

        if (typeof data.character !== "string" || typeof data.identity !== "string" || typeof data.abilities !== "string" || typeof data.personality !== "string" || typeof data.photo_url !== "string") {
            return res.status(400).json({
                message: "Fields character, identity, abilities, personality and photo_url must be a string"
            });
        }

        if (typeof data.first_appearance_id !== "number") {
            return res.status(400).json({
                message: "Field first_appearance_id must be a number"
            });
        }

        const newCharacter = await charactersModel.createCharacter(data);

        res.status(201).json({
            message: "Character created successfully",
            data: newCharacter
        });
    } catch (error) {
        return serverErrorMessage(res, error);
    }
}
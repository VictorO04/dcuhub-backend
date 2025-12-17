import { prisma } from "../../.lib/prisma.js";
import { createProductiondto } from "../dtos/createProduction.dto.js";

export const findAllProductions = async () => {
    return await prisma.productions.findMany({
        orderBy: { dcu_order: "desc" }
    });
}

export const findProductionById = async (id: number) => {
    return await prisma.productions.findUnique({
        where: { production_id: id }
    });
}

export const createProduction = async (data: createProductiondto) => {
    return await prisma.productions.create({
        data
    });
}
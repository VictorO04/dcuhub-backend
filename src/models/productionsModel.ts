import { prisma } from "../../.lib/prisma.js";
import { createProductiondto } from "../dtos/createProduction.dto.js";
import { patchProductiondto } from "../dtos/updateProduction.dto.js";

export const findAllProductions = async (filters: any) => {
    return await prisma.productions.findMany({
        where: filters,
        orderBy: { dcu_order: "asc" }
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

export const deleteProduction = async (id: number) => {
    return await prisma.productions.delete({
        where: { production_id: id }
    });
}

export const updateProduction = async (id:number, data: patchProductiondto) => {
    return await prisma.productions.update({
        where: { production_id: id },
        data
    });
}
import { prisma } from "../../.lib/prisma.js";

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
import { prisma } from "../../.lib/prisma.js";

export const findAllProductions = async () => {
    return await prisma.productions.findMany({
        orderBy: { dcu_order: "desc" }
    });
}
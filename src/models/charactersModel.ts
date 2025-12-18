import { prisma } from "../../.lib/prisma.js";

export const findAllCharacters = async (filters: any) => {
    const characters = await prisma.characters.findMany({
        where: filters,
        orderBy: { character: "asc" },
        include: {
            productions: {
                select: {
                    title: true
                }
            }
        }
    });

    return characters.map(
    ({ productions, first_appearance_id, ...rest }) => ({
      ...rest,
      first_appearance: productions?.title ?? null
    })
  );
}
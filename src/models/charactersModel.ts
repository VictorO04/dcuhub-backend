import { prisma } from "../../.lib/prisma.js";

export const findAllCharacters = async () => {
    const characters = await prisma.characters.findMany({
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
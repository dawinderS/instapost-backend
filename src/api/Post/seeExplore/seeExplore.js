import { prisma } from "../../../../generated/prisma-client";

export default {
  Query: {
    seeExplore: async (_, __, { request, isAuthenticated }) => {
      isAuthenticated(request);
      const { user } = request;
      const following = await prisma.user({ id: user.id }).following();
      const begin = await prisma.posts({
        where: {
          user: {
            id_not_in: [...following.map((user) => user.id), user.id],
          },
        },
        orderBy: "createdAt_DESC",
      });
      const end = await prisma.posts({
        where: {
          AND: [
            {likes_none: {
              user: {
                id: user.id,
              }
            }},
            {user: {
              id_in: [...following.map((user) => user.id)],
              id_not: user.id
            }},
          ]
        },
        orderBy: "createdAt_DESC",
      });
      return begin.concat(end);
    },
  },
};


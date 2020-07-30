import { prisma } from "../../../../generated/prisma-client";

export default {
  Query: {
    suggested: async (_, __, { request, isAuthenticated }) => {
      isAuthenticated(request);
      const { user } = request;
      return prisma.users({
        where: {
          AND: [
            { followers_none: { username: user.username } },
            { username_not_contains: user.username },
          ]
        }
      })
    }
  }
};
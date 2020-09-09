import { prisma } from "../../../../generated/prisma-client";

export default {
  Mutation: {
    deleteRoom: async(_, args, { request, isAuthenticated }) => {
      isAuthenticated(request);
      const { id } = args;
      const room = await prisma.$exists.room({ id });
      if (room) {
        return prisma.deleteRoom({ id });
      } else {
        throw Error("Sorry, you cannot delete this chat")
      }
    }
  }
};
import { prisma } from "../../../../generated/prisma-client";

export default {
  Mutation: {
    editUser: async(_, args, { request, isAuthenticated }) => {
      isAuthenticated(request);
      const { username, email, bio, avatar, name, phone, gender, privateAcc } = args;
      const { user } = request;
      return prisma.updateUser({
        where: { id: user.id },
        data: { username, email, bio, avatar, name, phone, gender, privateAcc }
      });
    }
  }
};